import { readFileSync } from "node:fs"

const STUBS = `
-- luacheck: globals Command Url cx fs ps rt th ui ya

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
	const result = []
	for (const m of s.matchAll(re)) {
		const beforeH3 = m[2].match(/[\S\s]+?(?=^#+ |$(?![\n\r]))/m)[0]
		const tbl = matchTable(beforeH3)
		tbl.name = normalizeType(m[1])
		tbl.children = matchHeaders3(m[2])
		tbl.desc = normalizeDesc(beforeH3)
		result.push(tbl)
	}
	return result
}

function matchHeaders3(s) {
	const re = /^### `([A-Z_a-z]+)(\([^()]*\))?` {#([A-Za-z-]+)\.[A-Z\\_a-z]+}$([\S\s]+?)(?=^#|$(?![\n\r]))/gm
	const result = []
	for (const m of s.matchAll(re)) {
		const tbl = matchTable(m[4])
		tbl.name = m[1]
		tbl.params = matchParams(m[2] || "")
		tbl.desc = normalizeDesc(m[4])
		result.push(tbl)
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
		case "Alias":
			result.alias = matchTypes(columns[1])
			break
		case "Inherit":
			result.inherit = matchTypes(columns[1])
			break
		case "Private":
			result.private = true
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

function linkExternal(headers) {
	for (const header of headers) {
		for (const name of header.inherit || []) {
			const children = headers.find(h => h.name === name)?.children || []
			header.children.push(...children.filter(c => !c.private))
		}
	}
}

function stubUi(headers) {
	const children = []
	for (const header of headers) {
		if (!header.name.startsWith("ui.")) {
			continue
		}

		const shortName = header.name.replace(/^ui\./, "")
		const constructor = header.children.find(c => c.name === "__new")
		if (constructor) {
			children.push({
				...constructor,
				args  : bindSelf(constructor.args, header.name),
				name  : shortName,
				desc  : header.desc,
				return: bindSelf(constructor.return, header.name),
			})
		} else {
			children.push({
				name: shortName,
				type: [header.name],
				desc: header.desc,
			})
		}
	}
	return [{ name: "ui", children, desc: "" }]
}

// TODO
function stubRt(headers) {}

// TODO
function stubTh(headers) {}

function gen(headers) {
	let s = ""
	for (const header of headers) {
		s += header.desc.split("\n").map(s => `-- ${s}`).join("\n")

		if (header.alias) {
			s += `\n---@alias ${header.name} ${header.alias.join("|")}\n`
			continue
		} else {
			s += `\n---@class (exact) ${header.name}\n`
		}

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
			s = `${s.replace(/, $/, "")}): ${header.name}\n`
		}

		s += `\n`
	}
	return s
}

function normalizeDesc(s) {
	return s.replaceAll(/[\n\r]+/g, "\n").replaceAll("\t", "  ").trim()
}

function normalizeType(s) {
	const re = /\b(?<!ui\.)(Align|Bar|Border|Clear|Constraint|Edge|Gauge|Layout|Line|List|Pad|Pos|Rect|Span|Style|Text|Wrap)\b/g
	return s.replaceAll("::", "__").replaceAll("Self", "self").replaceAll(re, m => `ui.${m}`)
}

function bindSelf(v, to) {
	if (typeof v === "string") {
		v = v.replaceAll(/\bself\b/g, to)
	} else if (v) {
		for (const k in v) {
			v[k] = bindSelf(v[k], to)
		}
	}
	return v
}

const aliases = matchHeaders2(readFileSync("../docs/plugins/aliases.md", { encoding: "utf8" }))
const types = matchHeaders2(readFileSync("../docs/plugins/types.md", { encoding: "utf8" }))
const layout = matchHeaders2(readFileSync("../docs/plugins/layout.md", { encoding: "utf8" }))
const context = matchHeaders2(readFileSync("../docs/plugins/context.md", { encoding: "utf8" }))
const runtime = matchHeaders2(readFileSync("../docs/plugins/runtime.md", { encoding: "utf8" }))
const utils = matchHeaders2(readFileSync("../docs/plugins/utils.md", { encoding: "utf8" }))
linkExternal([...types, ...layout, ...context, ...runtime, ...utils])

const combined = [
	STUBS,
	gen(aliases),
	gen(types),
	gen(layout),
	gen(context),
	gen(runtime),
	gen(utils),
	gen(stubUi(layout)),
]

console.log(combined.join("\n").trim())
