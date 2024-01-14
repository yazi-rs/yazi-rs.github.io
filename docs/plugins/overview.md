---
id: overview
sidebar_position: 0
sidebar_label: Plugin
description: Learn how to extend Yazi with Lua plugins.
---

# Plugins (BETA)

You can extend Yazi's functionality through Lua plugins, which need to be placed in the `plugins` subdirectory of Yazi's configuration directory, so either:

- `~/.config/yazi/plugins/` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\plugins\` on Windows.

```
~/.config/yazi/
├── init.lua
├── plugins/
│   ├── fzf.yazi/
│   └── zoxide.yazi/
└── yazi.toml
```

Each plugin is a directory ending with `.yazi`, containing an `init.lua` file for the plugin's initialization.
For instance, the structure of the `zoxide.yazi` plugin is as:

```
zoxide.yazi/
└── init.lua
```

You can use a plugin in two ways:

- Functional plugin: Bind the `plugin` command to a key in `keymap.toml`, and activate it by pressing the key.
- Custom previewers, preloaders: Configure them as `previewers` or `preloaders` in your `[plugin]` of `yazi.toml`.

## Sync vs Async

The plugin system is designed with an async-first philosophy. Therefore, unless specifically specified, such as the `--sync` for the `plugin` command, all plugins run in an async context.

There is one exception - all `init.lua` are synchronous, which includes:

- The `init.lua` for Yazi itself, i.e. `~/.config/yazi/init.lua`.
- The `init.lua` for each plugin, e.g. `~/.config/yazi/plugins/zoxide.yazi/init.lua`.

This is because `init.lua` is commonly used to initialize plugin configurations, and this process is synchronous:

```lua
-- ~/.config/yazi/init.lua

-- Initialize the zoxide plugin
-- Which needs `~/.config/yazi/plugins/zoxide.yazi/init.lua` to export a `setup` function
require("zoxide").setup {
	foo = "hello",
	bar = "world",
	-- ...
}
```

### Sync context

The sync context accompanies the entire app lifecycle, which is active during UI rendering (UI plugins), and on executing sync functional plugins (`plugin` command with `--sync`).

For better performance, the sync context is created only at the app's start and remains singular throughout. Thus, plugins running within this context share states,
prompting plugin developers to create separate namespaces for their plugins to prevent global space contamination.

### Async context

When a plugin is executed asynchronously, an isolated async context is created for it automatically.

In this context, you can use all the async functions supported by Yazi, and it operates concurrently with the main thread, ensuring that the main thread is not blocked.

You can also obtain a small amount of app data from the sync context by calling a "sync function" (will supported in the next target, v0.2.1):

```lua
-- ~/.config/yazi/plugins/my-async-plugin.yazi/init.lua

local get_hovered_url = sync(function()
	-- You can access all app data through the `cx`,
	-- within the `sync()` block, in a async plugin
	local h = cx.active.current.hovered
	return h and tostring(h.url) or ""
end)

return {
	entry = function()
		local h = get_hovered_url()
		-- Do some time-consuming work, such as reading file, network request, etc.
		-- It will execute concurrently with the main thread
	end,
}
```

## Interface

### Previewer

```lua
return {
	peek = function(self) return end,
	seek = function(self) return end,
}
```

A previewer needs to return an table that implements the `peek` and `seek` functions. Both functions take a table parameter `self` and do not return any values.

When the user presses `j` or `k` to switch between hovering files, `peek` is called, with:

- `file`: The file to be previewed.
- `skip`: The number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos.
- `area`: The Rect of the available preview area.
- `window`: The Rect of the entire terminal window.

When the user presses `Alt-j` or `Alt-k` to scroll the preview of this file, `seek` is called, with:

- `file`: The file being scrolled.
- `area`: The Rect of the available preview area.

The task of `peek` is to draw in the preview area based on the values of `file` and `skip`. This process is asynchronous.

The task of `seek` is to change the value of `skip` based on user behavior and trigger `peek` again. It is synchronous, meaning you can access app data through `cx`.

Here are some preset previewers and preloaders you can refer to: [Yazi Preset Plugins](https://github.com/sxyazi/yazi/tree/main/yazi-plugin/preset/plugins)

### Preloader

```lua
return {
	preload = function(self)
		return 1
	end,
}
```

You need to return an table that implements the `preload` function, it receives a `self` parameter, which is a table with the same fields as [`peek`](#previewer). It has the following return values:

| Binary | Decimal |                         |
| ------ | ------- | ----------------------- |
| `0 0`  | 0       | Failure, don't continue |
| `0 1`  | 1       | Success, don't continue |
| `1 0`  | 2       | Failure, continue       |
| `1 1`  | 3       | Success, continue       |

When "continue" is set, the preloader can reload the files that have already been loaded at the next time point, such as when the user scrolls, leading to a page switch. This is usually done for the either:

- Retrying in case of file loading failure
- Refreshing the file status upon successful loading

Yazi will automatically invoke the `preload` concurrently for each file that matches the preload rules on the page.

When the user specifies `multi = true` for it, the plugin allows preloading multiple files at once. In this case, `self.file` will be replaced by `self.files`.

Typically, a preloader only needs to implement one of them - either single or multiple. This depends on the specific task and the magnitude of the workload.
If it truly requires loading multiple files at once, the user needs to be prompted to enable the `multi` option for it.
