---
sidebar_position: 2
---

# Quick Start

After [installation](./installation.md), use the following command to run it:

```bash
yazi
```

There is a wrapper of yazi, that provides the ability to change the current working directory when yazi exiting, feel free to use it:

```bash
function ya() {
	tmp="$(mktemp -t "yazi-cwd.XXXXX")"
	yazi --cwd-file="$tmp"
	if cwd="$(cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
		cd -- "$cwd"
	fi
	rm -f -- "$tmp"
}
```
