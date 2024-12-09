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
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\plugins\` on Windows.

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
├── init.lua
├── README.md
└── LICENSE
```

Where:

- `init.lua` is the entry point of this plugin.
- `README.md` is the documentation of this plugin.
- `LICENSE` is the license file for this plugin.

## Usage {#usage}

A plugin has two usages:

- [Functional plugin](#functional-plugin): Bind the `plugin` command to a key in `keymap.toml`, and activate it by pressing the key.
- [Custom previewers, preloaders](/docs/configuration/yazi#plugin): Configure them as `previewers` or `preloaders` in your `[plugin]` of `yazi.toml` file.

### Functional plugin {#functional-plugin}

You can bind a `plugin` command to a specific key in your `keymap.toml` with:

| Argument/Option | Description                                 |
| --------------- | ------------------------------------------- |
| `[name]`        | The name of the plugin to run.              |
| `--args=[args]` | Shell-style arguments passed to the plugin. |

For example, `plugin test --args='hello --foo --bar=baz'` will run the `test` plugin with the arguments `hello --foo --bar=baz` in a sync context.

To access the arguments in the plugin, use `job.args`:

TODO: add doc about `@sync` (`--sync`)

```lua
--- @sync entry
-- ~/.config/yazi/plugins/test.yazi/init.lua
return {
	entry = function(self, job)
		ya.err(job.args[1])  -- "hello"
		ya.err(job.args.foo) -- true
		ya.err(job.args.bar) -- "baz"
	end,
}
```

Note that currently Yazi only supports positional arguments (`hello`) and named arguments (`--foo`, `--bar`), it does not support shorthand arguments like `-f` or `-b`.

These will be treated as positional arguments, but as Yazi adds support for shorthands in the future, their behavior will change. So please avoid using them to prevent any potential conflicts.

## Sync vs Async {#sync-vs-async}

The plugin system is designed with an async-first philosophy. Therefore, unless specifically specified, such as the `--sync` for the `plugin` command, all plugins run in an async context.

There is one exception - all `init.lua` are synchronous, which includes:

- The `init.lua` for Yazi itself, i.e. `~/.config/yazi/init.lua`.
- The `init.lua` for each plugin, e.g. `~/.config/yazi/plugins/bar.yazi/init.lua`.

This is because `init.lua` is commonly used to initialize plugin configurations, and this process is synchronous:

```lua
-- ~/.config/yazi/init.lua
require("bar"):setup {
	key1 = "value1",
	key2 = "value2",
	-- ...
}
```

```lua
-- ~/.config/yazi/plugins/bar.yazi/init.lua
return {
	setup = function(state, opts)
		-- Save the user configuration to the plugin's state
		state.key1 = opts.key1
		state.key2 = opts.key2
	end,
}
```

### Sync context {#sync-context}

The sync context accompanies the entire app lifecycle, which is active during UI rendering (UI plugins), and on executing sync functional plugins (`plugin` command with `--sync`).

For better performance, the sync context is created only at the app's start and remains singular throughout. Thus, plugins running within this context share states,
prompting plugin developers to use plugin-specific state persistence for their plugins to prevent global space contamination:

```lua
-- ~/.config/yazi/test.yazi/init.lua
return {
  entry = function(state)
    state.i = state.i or 0
    ya.err("i = " .. state.i)

    state.i = state.i + 1
  end,
}
```

Yazi initializes the `state` for each _sync_ plugin before running, and it exists independently for them throughout the entire lifecycle.
Do the `plugin --sync test` three times, and you will see the log output:

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
-- ~/.config/yazi/plugins/my-async-plugin.yazi/init.lua
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
		set_state("this is a")
		local h = get_state("this is b")
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

## Interface {#interface}

### Previewer {#previewer}

A previewer needs to return a table that implements the `peek` and `seek` functions. Both functions take a table parameter `self` and do not return any values:

```lua
return {
	peek = function(self) return end,
	seek = function(self) return end,
}
```

When the user presses <kbd>j</kbd> or <kbd>k</kbd> to switch between hovering files, `peek` is called, with:

| Key      | Description                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `file`   | The [File](/docs/plugins/types#shared.file) to be previewed.                                                                |
| `skip`   | The number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos. |
| `area`   | The [Rect](/docs/plugins/layout#rect) of the available preview area.                                                        |
| `window` | The [Rect](/docs/plugins/layout#rect) of the entire terminal window.                                                        |

When the user presses <kbd>Alt-j</kbd> or <kbd>Alt-k</kbd> to scroll the preview of this file, `seek` is called, with:

| Key    | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| `file` | The [File](/docs/plugins/types#shared.file) being scrolled.          |
| `area` | The [Rect](/docs/plugins/layout#rect) of the available preview area. |

The task of `peek` is to draw in the preview area based on the values of `file` and `skip`. This process is asynchronous.

The task of `seek` is to change the value of `skip` based on user behavior and trigger `peek` again. It is synchronous, meaning you can access [app data](/docs/plugins/types#app-data) through `cx`.

Here are some preset previewers and preloaders you can refer to: [Yazi Preset Plugins](https://github.com/sxyazi/yazi/tree/shipped/yazi-plugin/preset/plugins)

### Preloader {#preloader}

You need to return a table that implements the `preload` function, it receives a `self` parameter, which is a table with the same fields as [`peek()`](#previewer):

```lua
return {
	preload = function(self)
		return 1
	end,
}
```

And has the following return values:

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

When the user specifies [`multi = true`](/docs/configuration/yazi#plugin.preloaders) for it, the plugin allows preloading multiple files at once. In this case, `self.file` will be replaced by `self.files`.

Typically, a preloader only needs to implement one of them - either single or multiple. This depends on the specific task and the magnitude of the workload.
If it truly requires loading multiple files at once, the user needs to be prompted to enable the `multi` option for it.

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
- `C:\Users\USERNAME\AppData\Roaming\yazi\state\yazi.log` on Windows.

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
