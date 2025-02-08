---
sidebar_position: 8
description: Data Distribution Service
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DDS

DDS (Data Distribution Service) is designed to achieve communication and state synchronization between multiple Yazi instances, as well as state persistence. It is built on a client-server architecture but does not require running additional server processes.

It deeply integrates with a publish-subscribe model based on the Lua API.

## Concept {#concept}

- Local: the current instance, that is, the current Yazi process.
- Remote: instances other than the current instance.
- Static message: A message with a kind that starts with `@` will be persistently stored and automatically restored when a new instance starts. To un-persist, send `nil` to that kind.

## Usage {#usage}

The DDS has three usage:

- [Plugin API](/docs/plugins/utils#ps): Using Lua-based publish-subscribe model as the message carrier.
- [`ya pub` and `ya pub-to`](#ya-pub): Using [`ya` CLI tool](/docs/cli) as the message carrier.
- [`ya emit` and `ya emit-to`](#ya-emit): Using [`ya` CLI tool](/docs/cli) as the command carrier.
- [Real-time `stdout` reporting](#stdout-reporting): Using `stdout` as the carrier.

### `ya pub` and `ya pub-to` {#ya-pub}

If you're in a Yazi subshell where the `$YAZI_ID` environment variable is set, you can send a message to the current instance using `ya pub`.
It requires a `kind` argument, which is consistent with [`ps.pub()`](/docs/plugins/utils#ps.pub):

```sh
ya pub <kind> --str "string body"
ya pub <kind> --list "a" "b" "c"
ya pub <kind> --json '{"key":"json body"}'

# For example, request the current instance to extract `a.zip` and `b.7z`
ya pub extract --list "/root/a.zip" "/root/b.7z"
```

You can also send a message to a specified remote instance(s) using `ya pub-to`, with the required `receiver` and `kind` arguments, consistent with [`ps.pub_to()`](/docs/plugins/utils#ps.pub_to):

```sh
ya pub-to <receiver> <kind> --str "string body"
ya pub-to <receiver> <kind> --list "a" "b" "c"
ya pub-to <receiver> <kind> --json '{"key":"json body"}'

# If you're in a Yazi subshell,
# you can obtain the ID of the current instance through `$YAZI_ID`.
ya pub-to "$YAZI_ID" my-event --str "Hello world!"
```

For greater convenience in integrating within the command-line environment, they support two body formats:

- String: a straightforward format, suitable for most scenarios, without the need for additional tools for encoding
- List: An array of strings, it is useful for carrying a file list to the message, through `$@` in your shell
- JSON: for advanced needs, support for types and more complex data can be represented through the JSON format

### `ya emit` and `ya emit-to` {#ya-emit}

If you're in a Yazi subshell where the `$YAZI_ID` environment variable is set, you can use `ya emit` to send a command to the current instance for execution.

The command format is the same as what you'd write in the [`keymap.toml`](/docs/configuration/keymap):

```sh
ya emit <command> <args>
```

For example:

```sh
ya emit cd /tmp
ya emit reveal /tmp/foo
```

You can also send commands to a specific remote instance using `ya emit-to`:

```sh
ya emit-to <receiver> <command> <args>
```

For example:

```sh
ya emit-to "$YAZI_ID" cd /tmp
```

### Real-time `stdout` reporting {#stdout-reporting}

You can specify the `--local-events` and `--remote-events` options when starting Yazi:

```sh
# Local events
yazi --local-events=kind1,kind2
# Remote events
yazi --remote-events=kind1,kind2
# Both local and remote events
yazi --local-events=kind1,kind2 --remote-events=kind1,kind2
```

When an event of the specified kind is received, it will be output to `stdout`:

```sh
hover,0,200,{"tab":0,"url":"/root/Downloads"}
cd,0,100,{"tab":0,"url":"/root/Downloads"}
```

One payload per line, each payload contains the following fields separated by commas:

| Field    | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| kind     | The kind of the message                                                                           |
| receiver | The remote instance ID that receives the message; if it's `0`, broadcasts to all remote instances |
| sender   | The sender of the message                                                                         |
| body     | The body of the message, which is a JSON string                                                   |

This provides the ability to report Yazi's internal events in real-time, which is useful for external tool integration (such as Neovim), as they will be able to subscribe to the events triggered by the user behavior.

## Builtin kinds {#kinds}

### `cd` - change directory {#cd}

`sub()` callback body:

```lua
{
	tab = 0
}
```

`sub_remote()` callback body:

```lua
{
	tab = 0,
	url = Url("/root/Downloads")
}
```

`--local-events` stdout payload:

```sh
cd,1711957542289249,1711957542289249,{"tab":0,"url":"/root/Downloads"}
```

`--remote-events` stdout payload:

```sh
cd,0,100,{"tab":0,"url":"/root/Downloads"}
```

### `hover` - hover on a file {#hover}

`sub()` callback body:

```lua
{
	tab = 0
}
```

`sub_remote()` callback body:

```lua
{
	tab = 0,
	url = Url("/root/foo.txt")
}
```

`--local-events` stdout payload:

```sh
hover,1711957283332834,1711957283332834,{"tab":0,"url":"/root/foo.txt"}
```

`--remote-events` stdout payload:

```sh
hover,0,200,{"tab":0,"url":"/root/foo.txt"}
```

### `rename` - rename a file {#rename}

`sub()` / `sub_remote()` callback body:

```lua
{
  tab = 0,
  from = Url("/root/foo.txt"),
  to = Url("/root/bar.txt"),
}
```

`--local-events` stdout payload:

```sh
rename,1711957878076791,1711957878076791,{"tab":0,"from":"/root/foo.txt","to":"/root/bar.txt"}
```

`--remote-events` stdout payload:

```sh
rename,0,1711957878076791,{"tab":0,"from":"/root/foo.txt","to":"/root/bar.txt"}
```

### `bulk` - bulk rename files {#bulk}

`sub()` / `sub_remote()` callback body:

```lua
-- Since `Iterator` implementing `__pairs()`,
-- you can iterate over all URL pairs using `pairs(body)`
Iterator {
	__len = function(self)
		-- Returns the number of files changed
	end,
	__pairs = function(self)
		-- Returns (Url("/path/from.txt"), Url("/path/to.txt"))
	end
}
```

`--local-events` stdout payload:

```sh
bulk,1711957542289249,1711957542289249,{"changes":{"/path/from.txt":"/path/to.txt"}}
```

`--remote-events` stdout payload:

```sh
bulk,0,1711957542289249,{"changes":{"/path/from.txt":"/path/to.txt"}}
```

### `yank` - yank files {#yank}

`sub()` callback body:

```lua
{}
```

`sub_remote()` callback body:

```lua
-- Since `Iterator` implementing `__index()`, you can access the yanked URLs by index,
-- such as `body[1]`, or iterate over all URLs using `ipairs(body)`
Iterator {
	cut = false,
	__len = function(self)
		-- Returns the number of URLs yanked
	end,
	__index = function(self, idx)
		-- Returns the URL at the given index
	end
}
```

`--local-events` stdout payload:

```sh
yank,1711960311454247,1711960311454247,{"cut":false,"urls":["/root/foo.txt","/root/bar.txt"]}
```

`--remote-events` stdout payload:

```sh
yank,0,300,{"cut":false,"urls":["/root/foo.txt","/root/bar.txt"]}
```

### `move` - move files {#move}

`sub()` callback body:

```lua
{
	items = {
		{ from = Url("/root/foo.txt"), to = Url("/root/bar.txt") },
		-- ...
	}
}
```

`sub_remote()` callback body:

```lua
{
	items = {
		{ from = Url("/root/foo.txt"), to = Url("/root/bar.txt") },
		-- ...
	}
}
```

`--local-events` stdout payload:

```sh
move,1711957542289249,1711957542289249,{"items":[{"from":"/root/foo.txt","to":"/root/bar.txt"}]}
```

`--remote-events` stdout payload:

```sh
move,0,1711957542289249,{"items":[{"from":"/root/foo.txt","to":"/root/bar.txt"}]}
```

### `trash` - trash files {#trash}

`sub()` callback body:

```lua
{
	urls = {
		Url("/root/foo.txt"),
		-- ...
	}
}
```

`sub_remote()` callback body:

```lua
{
	urls = {
		Url("/root/foo.txt"),
		-- ...
	}
}
```

`--local-events` stdout payload:

```sh
trash,1711957542289249,1711957542289249,{"urls":["/root/foo.txt"]}
```

`--remote-events` stdout payload:

```sh
trash,0,1711957542289249,{"urls":["/root/foo.txt"]}
```

### `delete` - delete files {#delete}

`sub()` callback body:

```lua
{
	urls = {
		Url("/root/foo.txt"),
		-- ...
	}
}
```

`sub_remote()` callback body:

```lua
{
	urls = {
		Url("/root/foo.txt"),
		-- ...
	}
}
```

`--local-events` stdout payload:

```sh
delete,1711957542289249,1711957542289249,{"urls":["/root/foo.txt"]}
```

`--remote-events` stdout payload:

```sh
delete,0,1711957542289249,{"urls":["/root/foo.txt"]}
```

### `hi` - client handshake {#hi}

System reserves kind.

### `hey` - server handshake {#hey}

System reserves kind.

### `bye`

System reserves kind.

## Builtin plugins {#plugins}

### `dds.lua` {#dds.lua}

This plugin provides a `dds-emit` event kind, which is used for the implementation of the `ya emit` subcommand — `ya emit` is a shorthand for `ya pub`, and the emitted command will be converted into an equivalent `ya pub` event message.

With `ya emit`, you can implement many interesting features, such as synchronizing the CWD of the current Yazi instance when exiting from a subshell:

<Tabs>
  <TabItem value="Zsh" label="Zsh" default>

```sh
# Change Yazi's CWD to PWD on subshell exit
if [[ -n "$YAZI_ID" ]]; then
	function _yazi_cd() {
		ya emit cd "$PWD"
	}
	add-zsh-hook zshexit _yazi_cd
fi
```

  </TabItem>
  <TabItem value="fish" label="Fish">

```sh
# Change Yazi's CWD to PWD on subshell exit
if [ -n "$YAZI_ID" ]
	trap 'ya emit cd "$PWD"' EXIT
end
```

  </TabItem>
  <TabItem value="nushell" label="Nushell">

```sh
# Please raise a PR if you have a nushell version
```

  </TabItem>
</Tabs>

Source code: https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/plugins/dds.lua

### `session.lua` {#session.lua}

This plugin provides cross-instance yank ability, which means you can yank files in one instance, and then paste them in another instance.

To enable it, add these lines to your `init.lua`, then restart _*all*_ Yazi instances to apply the changes:

```lua
require("session"):setup {
	sync_yanked = true,
}
```

Source code: https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/plugins/session.lua

### `extract.lua` {#extract.lua}

This plugin provides an `extract` event kind for archive extraction, which accepts an array of file URL. You can bind it as [the opener](/docs/configuration/yazi#opener) for archives:

```toml
# ~/.config/yazi/yazi.toml
[opener]
extract = [
	{ run = 'ya pub extract --list "$@"', desc = "Extract here", for = "unix" },
	{ run = 'ya pub extract --list %*',   desc = "Extract here", for = "windows" },
]
```

Source code: https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/plugins/extract.lua
