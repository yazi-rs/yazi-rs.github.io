import { readFileSync } from "node:fs"

function matchHeaders2(s) {
	const re = /## ([A-Z][a-z]+) {#[a-z]+}$([\S\s]+?)(?=^##[^#]|$(?![\n\r]))/gm
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
	const re = /^### `([A-Z_a-z]+)(\([^()]+\))?` {#([A-Za-z]+)\.[A-Z\\_a-z-]+}$([\S\s]+?)(?=^#|$(?![\n\r]))/gm
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
	return s.split(",").map(s => s.trim().replace(/^\(/, "").replace(/\)$/, ""))
}

function matchTypes(s) {
	const result = []
	for (let type of s.split("\\|")) {
		type = type.replaceAll("`", "").trim()
		type = type.startsWith("[") ? type.slice(1, type.indexOf("]")) : type
		result.push(normalizeType(type))
	}
	return result
}

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
				s += `---@field ${child.name} fun(`
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
			s += `---@overload fun(`
			for (const param of constructor.params) {
				s += `${param}: `
				s += (constructor.args[param] || []).join("|")
				s += ", "
			}
			s = `${s.replace(/, $/, "")}): ${name}\n`
		}

		s += `\n`
	}
	console.log(s)
	// return result
}

function normalizeDesc(s) {
	return s.replaceAll(/[\n\r]+/g, "\n").replaceAll("\t", "    ").trim()
}

function normalizeType(s) {
	switch (s) {
	case "Rect":
	case "Pad":
	case "Style":
	case "Span":
	case "Line":
	case "Text":
	case "Layout":
	case "Constraint":
	case "List":
	case "Bar":
	case "Border":
	case "Gauge":
	case "Clear":
		return `ui.${s}`
	default:
		return s
	}
}

const types = matchHeaders2(readFileSync("../docs/plugins/types.md", { encoding: "utf8" }))
// const layout = matchHeaders2(readFileSync("../docs/plugins/layout.md", { encoding: "utf8" }))

gen(types)
