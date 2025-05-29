import { readFileSync } from "node:fs"

const STUBS = `
-- luacheck: globals Command Url cx fs ps rt th ui ya

---@alias Color string
---@alias Stdio integer

---@alias Sendable nil|boolean|number|string|Url|{ [Sendable]: Sendable }
---@alias Renderable ui.Bar|ui.Border|ui.Clear|ui.Gauge|ui.Line|ui.List|ui.Text

---@class (exact) Pos
---@field [1] "top-left"|"top-center"|"top-right"|"bottom-left"|"bottom-center"|"bottom-right"|"center"|"hovered"
---@field x integer
---@field y integer
---@field w integer
---@field h integer
---@overload fun(value: {
---  [1]: "top-left"|"top-center"|"top-right"|"bottom-left"|"bottom-center"|"bottom-right"|"center"|"hovered",
---  x: integer?, y: integer?, w: integer?, h: integer?,
---}): self

---@class (exact) Recv
---@field recv fun(self: self): string

---@type Command
Command = Command
---@type Url
Url = Url
---@type cx
cx = cx
---@type fs
fs = fs
---@type ps
ps = ps
---@type rt
rt = rt
---@type th
th = th
---@type ui
ui = ui
---@type ya
ya = ya
`

function matchHeaders2(s) {
	const re = /## ([:A-Za-z]+) {#[a-z-]+}$([\S\s]+?)(?=^##[^#]|$(?![\n\r]))/gm
	const result = {}
	for (const m of s.matchAll(re)) {
		result[normalizeType(m[1])] = {
			children: matchHeaders3(m[2]),
			desc    : normalizeDesc(m[2].match(/[\S\s]+?(?=^#+ |$(?![\n\r]))/m)[0]),
		}
	}
	return result
}

function matchHeaders3(s) {
	const re = /^### `([A-Z_a-z]+)(\([^()]*\))?` {#([A-Za-z-]+)\.[A-Z\\_a-z]+}$([\S\s]+?)(?=^#|$(?![\n\r]))/gm
	const result = []
	for (const m of s.matchAll(re)) {
		const table = matchTable(m[4])
		table.name = m[1]
		table.params = matchParams(m[2] || "")
		table.desc = normalizeDesc(m[4])
		result.push(table)
	}
	return result
}

function matchTable(s) {
	let occur = false
	const result = {}
	for (const line of s.split("\n")) {
		const b = line.startsWith("|")

		occur ||= b
		if (!b && occur) {
			break
		} else if (!b) {
			continue
		}

		const columns = matchColumns(line)
		if (columns.length < 2) {
			continue
		}

		switch (columns[0]) {
		case "Type":
			result.type = matchTypes(columns[1])
			break
		case "Return":
			result.return = matchTypes(columns[1])
			break
		default:
			if (columns[0].startsWith("`") && columns[0].endsWith("`")) {
				result.args ||= {}
				result.args[columns[0].slice(1, -1)] = matchTypes(columns[1])
			}
		}
	}
	return result
}

function matchColumns(s) {
	const result = []
	let buf = ""
	for (const c of s) {
		if (c !== "|" || buf.endsWith("\\")) {
			buf += c
		} else if (buf !== "") {
			result.push(buf.trim())
			buf = ""
		}
	}
	return result
}

function matchParams(s) {
	return s.split(",").map(s => s.trim().replace(/^\(/, "").replace(/\)$/, "")).filter(s => s !== "")
}

function matchTypes(s) {
	const result = []
	for (const m of s.matchAll(/`([^`]+)`/g)) {
		result.push(normalizeType(m[1].replaceAll("\\|", "|")))
	}
	return result
}

function stubUi(headers) {
	const children = []
	for (const [type, header] of Object.entries(headers)) {
		if (!type.startsWith("ui.")) {
			continue
		}

		const name = type.replace(/^ui\./, "")
		const constructor = header.children.find(c => c.name === "__new")
		if (constructor) {
			children.push({
				...constructor,
				name,
				desc  : header.desc,
				return: constructor.return.map(t => t === "self" ? type : t),
			})
		} else {
			children.push({
				name,
				type: [type],
				desc: header.desc,
			})
		}
	}
	return { ui: { children, desc: "" } }
}

// TODO
function stubRt(headers) {}

// TODO
function stubTh(headers) {}

function gen(headers) {
	let s = ""
	for (const [name, header] of Object.entries(headers)) {
		s += header.desc.split("\n").map(s => `-- ${s}`).join("\n")
		s += `\n---@class (exact) ${name}\n`

		// Properties
		for (const child of header.children) {
			if (child.type) {
				s += child.desc.split("\n").map(s => `-- ${s}`).join("\n")
				s += `\n---@field ${child.name} ${child.type.join("|")}\n`
			}
		}

		// Methods
		for (const child of header.children) {
			if (child.return && child.name !== "__new") {
				s += child.desc.split("\n").map(s => `-- ${s}`).join("\n")
				s += `\n---@field ${child.name} fun(`
				for (const param of child.params) {
					s += `${param}: `
					s += (child.args[param] || []).join("|")
					s += ", "
				}
				s = `${s.replace(/, $/, "")}): ${child.return.join("|")}\n`
			}
		}

		// Constructor
		const constructor = header.children.find(c => c.return && c.name === "__new")
		if (constructor) {
			s += constructor.desc.split("\n").map(s => `-- ${s}`).join("\n")
			s += `\n---@overload fun(`
			for (const param of constructor.params) {
				s += `${param}: `
				s += (constructor.args[param] || []).join("|")
				s += ", "
			}
			s = `${s.replace(/, $/, "")}): ${name}\n`
		}

		s += `\n`
	}
	return s
}

function normalizeDesc(s) {
	return s.replaceAll(/[\n\r]+/g, "\n").replaceAll("\t", "  ").trim()
}

function normalizeType(s) {
	const re = /(?<!ui\.)(Align|Bar|Border|Clear|Constraint|Edge|Gauge|Layout|Line|List|Pad|Rect|Span|Style|Text|Wrap)/g
	return s.replaceAll("::", "__").replaceAll("Self", "self").replaceAll(re, m => `ui.${m}`)
}

const types = matchHeaders2(readFileSync("../docs/plugins/types.md", { encoding: "utf8" }))
const layout = matchHeaders2(readFileSync("../docs/plugins/layout.md", { encoding: "utf8" }))
const context = matchHeaders2(readFileSync("../docs/plugins/context.md", { encoding: "utf8" }))
const runtime = matchHeaders2(readFileSync("../docs/plugins/runtime.md", { encoding: "utf8" }))
const utils = matchHeaders2(readFileSync("../docs/plugins/utils.md", { encoding: "utf8" }))

const combined = [
	STUBS,
	gen(types),
	gen(layout),
	gen(context),
	gen(runtime),
	gen(utils),
	gen(stubUi(layout)),
]

console.log(combined.join("\n").trim())
