---
sidebar_position: 7
description: Data Distribution Service
---

# DDS

:::warning
This is a new feature that will be released in Yazi 0.2.5 and currently requires the latest main branch.

Document is still being written...
:::

DDS (Data Distribution Service) is designed to achieve communication and state synchronization between multiple Yazi instances, as well as state persistence. It is built on a client-server architecture but does not require running additional server processes.

It deeply integrates with a publish-subscribe model based on the Lua API.

## Concept

- Local: the current instance, that is, the current Yazi process.
- Remote: instances other than the current instance.

## Usage

The DDS has two usage:

- [Plugin API](/docs/plugins/utils#ps): Using Lua-based publish-subscribe model as the carrier for DDS.
- [Real-time `stdout` reporting](#stdout-reporting): Using `stdout` as the carrier for DDS.

### Real-time `stdout` reporting {#stdout-reporting}

You can specify the `--local-events` and `--remote-events` options when starting Yazi. When an event of the specified kind is triggered, it will be output to `stdout`:

```sh
# Local events
yazi --local-events=kind1,kind2
# Remote events
yazi --remote-events=kind1,kind2
# Both local and remote events
yazi --local-events=kind1,kind2 --remote-events=kind1,kind2
```

This provides the ability to report Yazi's internal events in real-time, which is useful for external tool integration (such as Neovim), as they will be able to subscribe to the events triggered by the user behavior.

## Builtin kinds

### `tabs`

TODO

### `cd`

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
cd,1711957542289249,20,1711957542289249,{"tab":0,"url":"/root/Downloads"}
```

`--remote-events` stdout payload:

```sh
cd,0,20,1711957542289249,{"tab":0,"url":"/root/Downloads"}
```

### `hover`

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
hover,1711957283332834,30,1711957283332834,{"tab":0,"url":"/root/foo.txt"}
```

`--remote-events` stdout payload:

```sh
hover,0,30,1711957283332834,{"tab":0,"url":"/root/foo.txt"}
```

### `rename`

`sub()` callback body:

```lua
{
  tab = 0,
  from = Url("/root/foo.txt"),
  to = Url("/root/bar.txt"),
}
```

`sub_remote()` callback body:

```lua
{
  tab = 0,
  from = Url("/root/foo.txt"),
  to = Url("/root/bar.txt"),
}
```

`--local-events` stdout payload:

```sh
rename,1711957878076791,0,1711957878076791,{"tab":0,"from":"/root/foo.txt","to":"/root/bar.txt"}
```

`--remote-events` stdout payload:

```sh
rename,0,0,1711957878076791,{"tab":0,"from":"/root/foo.txt","to":"/root/bar.txt"}
```

### `bulk`

TODO

### `yank`

`sub()` callback body:

```lua
{
  cut = false,
}
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
yank,1711960311454247,40,1711960311454247,{"cut":false,"urls":["/root/foo.txt","/root/bar.txt"]}
```

`--remote-events` stdout payload:

```sh
yank,0,40,1711960311454247,{"cut":false,"urls":["/root/foo.txt","/root/bar.txt"]}
```

### `hi`

System reserves kind.

### `hey`

System reserves kind.

## Custom messages
