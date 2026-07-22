import { writeFile } from "fs/promises";
import versions from "../versions.json" with {type: "json"};
import {join} from "path";

const stable = versions[0];
const URL_BASE = `https://raw.githubusercontent.com/sxyazi/yazi/refs/tags/v${stable}/yazi-config/preset/`;

for (const file of [
	"yazi-default.toml",
	"theme-light.toml",
	"theme-dark.toml",
	"keymap-default.toml"
]) {
	const target = join(import.meta.dirname, "../src/components/Default/", file);
	const contents = await (await fetch(URL_BASE + file)).text();
	writeFile(target, contents, {encoding: "utf-8"})
}

