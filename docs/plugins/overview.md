---
id: overview
sidebar_position: 0
sidebar_label: Plugins (BETA)
description: Learn how to extend Yazi with Lua plugins.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Plugins (BETA)

You can extend Yazi's functionality through Lua plugins, which need to be placed in the `plugins` subdirectory of Yazi's configuration directory, so either:

- `~/.config/yazi/plugins/` on Unix-like systems.
- `%AppData%\yazi\config\plugins\` on Windows.

```
~/.config/yazi/
├── init.lua
├── plugins/
│   ├── foo.yazi/
│   └── bar.yazi/
└── yazi.toml
```

Each plugin is a directory with a [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) name, ending in `.yazi`, and containing at least the following files:

```
~/.config/yazi/plugins/bar.yazi/
├── main.lua
├── README.md
└── LICENSE
```

Where:

- `main.lua` is the entry point of this plugin.
- `README.md` is the documentation of this plugin.
- `LICENSE` is the license file for this plugin.

## Usage {#usage}

A plugin has two usages:

- [Functional plugin](#functional-plugin): Bind the `plugin` command to a key in `keymap.toml`, and activate it by pressing the key.
- [Custom previewers, preloaders](/docs/configuration/yazi#plugin): Configure them as previewers or preloaders under `[plugin]` of your `yazi.toml`.

### Functional plugin {#functional-plugin}

You can bind a `plugin` command to a specific key in your `keymap.toml` with:

| Argument/Option | Description                                           |
| --------------- | ----------------------------------------------------- |
| `[name]`        | Required, the name of the plugin to run.              |
| `[args]`        | Optional, shell-style arguments passed to the plugin. |

For example, `plugin test -- foo --bar --baz=qux` will run the `test` plugin with the arguments `foo --bar --baz=qux` in a sync context.

To access the arguments in the plugin, use `job.args`:

```lua
-- ~/.config/yazi/plugins/test.yazi/main.lua
return {
	entry = function(self, job)
		ya.dbg(job.args[1])  -- "foo"
		ya.dbg(job.args.bar) -- true
		ya.dbg(job.args.baz) -- "qux"
	end,
}
```

Note that currently Yazi only supports positional arguments (`foo`) and named arguments (`--bar`), it does not support shorthand arguments like `-a`.

Shorthands will be treated as positional arguments at the moment, but as Yazi adds support for it in the future, their behavior will change. So please avoid using them to prevent any potential conflicts.

## Sync vs Async {#sync-vs-async}

The plugin system is designed with an async-first philosophy. Therefore, unless specifically specified, such as the [`@sync` annotation](/docs/plugins/overview#@sync), all plugins run in an async context.

There is one exception: the user's `init.lua` is synchronous, since `init.lua` is often used to initialize plugin configurations:

```lua
-- ~/.config/yazi/init.lua
require("my-plugin"):setup {
	key1 = "value1",
	key2 = "value2",
	-- ...
}
```

```lua
-- ~/.config/yazi/plugins/my-plugin.yazi/main.lua
return {
	setup = function(state, opts)
		-- Save the user configuration to the plugin's state
		state.key1 = opts.key1
		state.key2 = opts.key2
	end,
}
```

### Sync context {#sync-context}

The sync context accompanies the entire app lifecycle, which is active during UI rendering (UI plugins), and on executing [sync functional plugins](/docs/plugins/overview#@sync).

For better performance, the sync context is created only at the app's start and remains singular throughout. Thus, plugins running within this context share states,
prompting plugin developers to use plugin-specific state persistence for their plugins to prevent global space contamination:

```lua
--- @sync entry
-- ~/.config/yazi/test.yazi/main.lua
return {
  entry = function(state)
    state.i = state.i or 0
    ya.dbg("i = " .. state.i)

    state.i = state.i + 1
  end,
}
```

Yazi initializes the `state` for each _sync_ plugin before running, and it exists independently for them throughout the entire lifecycle.
Do the `plugin test` three times, and you will see the log output:

```sh
i = 0
i = 1
i = 2
```

### Async context {#async-context}

When a plugin is executed asynchronously, an isolated async context is created for it automatically.

In this context, you can use all the async functions supported by Yazi, and it operates concurrently with the main thread, ensuring that the main thread is not blocked.

You can also obtain [a small amount](#sendable) of app data from the sync context by calling a "sync function":

```lua
-- ~/.config/yazi/plugins/my-async-plugin.yazi/main.lua
local set_state = ya.sync(function(state, a)
	-- You can get/set the state of the plugin through `state` parameter
	-- in the `sync()` block
	state.a = a
end)

local get_state = ya.sync(function(state, b)
	-- You can access all app data through the `cx`,
	-- within the `sync()` block, in an async plugin
	local h = cx.active.current.hovered
	return h and state.a .. tostring(h.url) or b
end)

return {
	entry = function()
		set_state("hello from a")
		local h = get_state("hello from b")
		-- Do some time-consuming work, such as reading file, network request, etc.
		-- It will execute concurrently with the main thread
	end,
}
```

Note that `ya.sync()` call must be at the top level:

```lua
-- Wrong !!!
local get_state
if some_condition then
	get_state = ya.sync(function(state)
		-- ...
	end)
end
```

## Annotations {#annotations}

Each plugin can contain zero or more annotations that specify the behavior of the plugin during runtime.

Each annotation starts with `---`, followed by `@` and the annotation name, and ends with the annotation's value.

These annotations _must_ be at the very top of the file, with no content before them, and no non-annotation content should appear between annotations.

### `@sync` {#@sync}

Specifies that a method in the plugin runs in a sync context instead of the default async context. Available values:

- `entry`: Run the `entry` method in a sync context.

For example:

```lua
--- @sync entry
return {
	entry = function() end
}
```

### `@since` {#@since}

Specifies the minimum Yazi version that the plugin supports.

If specified, and the user's Yazi version is lower than the specified one, an error will be triggered to prompt the user to upgrade their Yazi version, preventing the plugin from being executed accidentally:

```lua
--- @since 25.2.13
return {
	--- ...
}
```

## Interface {#interface}

### Previewer {#previewer}

A previewer needs to return a table that implements the `peek` and `seek` methods. Both methods take a table parameter `job` and do not return any values:

```lua
local M = {}

function M:peek(job)
	-- ...
end

function M:seek(job)
	-- ...
end

return M
```

When the user presses <kbd>j</kbd> or <kbd>k</kbd> to switch between hovering files, `peek` is called, with:

| Key    | Description                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| `area` | [Rect](/docs/plugins/layout#rect) of the available preview area.                                                |
| `args` | Arguments passed to the previewer.                                                                              |
| `file` | [File](/docs/plugins/types#shared.file) to be previewed.                                                        |
| `skip` | Number of units to skip. The units depend on your previewer, such as lines for code and percentages for videos. |

When the user presses <kbd>J</kbd> or <kbd>K</kbd> to scroll the preview of the file, `seek` is called, with:

| Key     | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| `file`  | [File](/docs/plugins/types#shared.file) being scrolled.          |
| `area`  | [Rect](/docs/plugins/layout#rect) of the available preview area. |
| `units` | Number of units to scroll.                                       |

The task of `peek` is to draw in the preview area based on the values of `file` and `skip`. This process is asynchronous.

The task of `seek` is to change the value of `skip` based on user behavior and trigger `peek` again. It is synchronous, meaning you can access [app data](/docs/plugins/types#app-data) through `cx`.

There are some preset previewers and preloaders you can refer to: [Yazi Preset Plugins](https://github.com/sxyazi/yazi/tree/shipped/yazi-plugin/preset/plugins)

### Preloader {#preloader}

You need to return a table that implements the `preload` method:

```lua
local M = {}

function M:preload(job)
	-- ...
	return false, Err("some error")
end

return M
```

It receives a `job` parameter, which is a table:

| Key    | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| `area` | [Rect](/docs/plugins/layout#rect) of the available preview area. |
| `args` | Arguments passed to the preloader.                               |
| `file` | [File](/docs/plugins/types#shared.file) to be preloaded.         |
| `skip` | Always `0`                                                       |

And returns a `(complete, err)`:

- `complete`: Required, Whether the preloading is complete, which is a boolean.
  - `true`: Marks the task as complete, and the task will not be called again.
  - `false`: Marks the task as incomplete, and the task will be retried until it's complete (returns `true`).
- `err`: Optional, the error to be logged.

When `complete = false`, the preloader will be re-triggered at the next time point, such as when the user scrolls leading to a page switch. This is usually done for either:

- Retrying in case of file loading failure
- Refreshing the file status upon successful loading

Yazi will automatically invoke the `preload` concurrently for each file that matches the preload rules on the page.

## Sendable value {#sendable}

Yazi's plugin can run concurrently on multiple threads. For better performance, only the following types of combinations can be used for inter-thread data exchange:

- Nil
- Boolean
- Number
- String
- [Url](/docs/plugins/types#shared.url)
- Table and nested tables, with the above types as values

## Debugging {#debugging}

Please ensure that your `~/.config/yazi/init.lua` includes valid Lua code with the correct syntax, otherwise will result in Yazi being unable to parse and execute your `init.lua` to initialize.

We recommend installing a Lua plugin in your editor for syntax checking to avoid any syntax errors.
For example, install the [Lua plugin](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) for VSCode, and for Neovim, use [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) to configure your Lua LSP.

If you have no experience with Lua, you can quickly get started through https://learnxinyminutes.com/docs/lua/

### Logging {#logging}

If you want to debug some runtime data, use [`ya.dbg()`](/docs/plugins/utils#ya.dbg) and [`ya.err()`](/docs/plugins/utils#ya.err) to print what you want to debug to either:

- `~/.local/state/yazi/yazi.log` on Unix-like systems.
- `%AppData%\yazi\state\yazi.log` on Windows.

Make sure to set the `YAZI_LOG` environment variable before starting Yazi:

<Tabs>
  <TabItem value="unix" label="Unix-like" default>

```sh
YAZI_LOG=debug yazi
```

  </TabItem>

  <TabItem value="powershell" label="PowerShell">

```powershell
$env:YAZI_LOG = "debug"; yazi
```

  </TabItem>
</Tabs>

otherwise, no logs will be recorded. Its value can be (in descending order of verbosity):

- `debug`
- `info`
- `warn`
- `error`
