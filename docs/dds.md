---
sidebar_position: 7
description: Data Distribution Service
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DDS

:::warning
This is a new feature that will be released in Yazi 0.2.5 and currently requires the latest code.

Document is still being written...
:::

DDS (Data Distribution Service) is designed to achieve communication and state synchronization between multiple Yazi instances, as well as state persistence. It is built on a client-server architecture but does not require running additional server processes.

It deeply integrates with a publish-subscribe model based on the Lua API.

## Concept {#concept}

- Local: the current instance, that is, the current Yazi process.
- Remote: instances other than the current instance.

## Usage {#usage}

The DDS has three usage:

- [Plugin API](/docs/plugins/utils#ps): Using Lua-based publish-subscribe model as the carrier.
- [Command-line tool](#cli): Using `ya` command-line tool as the carrier.
- [Real-time `stdout` reporting](#stdout-reporting): Using `stdout` as the carrier.

### Command-line tool {#cli}

You can send a message to the remote instance(s) using `ya pub`, with the two required `receiver` and `kind` arguments consistent with [`ps.pub_to()`](/docs/plugins/utils#ps.pub_to):

```sh
ya pub <receiver> <kind> --str "string body"
ya pub <receiver> <kind> --json '{"key": "json body"}'

# If you're in a Yazi subshell,
# you can obtain the ID of the current instance through `$YAZI_ID`.
ya pub "$YAZI_ID" dds-cd --str "/root"
```

You can also send a static message to all remote instances using `ya pub-static`, with its `severity` and `kind` arguments consistent with [`ps.pub_static()`](/docs/plugins/utils#ps.pub_static):

```sh
ya pub-static <severity> <kind> --str "string body"
ya pub-static <severity> <kind> --json '{"key": "json body"}'
```

For greater convenience in integrating within the command-line environment, they support two body formats:

- String: a straightforward format, suitable for most scenarios, without the need for additional tools for encoding
- JSON: for advanced needs, support for types and more complex data can be represented through the JSON format

Note that `ya` is a standalone CLI program introduced since Yazi 0.2.5, it might conflict with the shell wrapper you setup before, see [Introduce a standalone CLI program](https://github.com/sxyazi/yazi/issues/914) for details.

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

| Field             | Description                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| kind              | The kind of this message                                                                                                                |
| receiver          | The remote instance ID that receives this message; if it's `0`, broadcasts to all remote instances                                      |
| sender / severity | The sender of this message if greater than `65535`; otherwise, the severity of this [static message](/docs/plugins/utils#ps.pub_static) |
| body              | The body of this message, which is a JSON string                                                                                        |

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

:::note
This kind currently requires the nightly version of Yazi.
:::

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

This plugin provides the `dds-cd` event kind, which accepts a string URL and changes the CWD to that URL when it is received.

This is useful for synchronizing the CWD of the current Yazi instance when exiting from a subshell:

<Tabs>
  <TabItem value="Zsh" label="Zsh" default>

```sh
# Change Yazi's CWD to PWD on subshell exit
if [[ -n YAZI_ID ]]; then
	function _yazi_cd() {
		ya pub "$YAZI_ID" dds-cd --str "$PWD"
	}
	add-zsh-hook zshexit _yazi_cd
fi
```

  </TabItem>
  <TabItem value="fish" label="Fish">

```sh
# Please raise a PR if you have a fish version
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

To enable it, add these lines to your `init.lua`:

```lua
require("session"):setup {
	sync_yanked = true,
}
```

Source code: https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/plugins/session.lua
