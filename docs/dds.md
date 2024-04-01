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

## Builtin messages

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

TODO

### `hi`

System reserves kind.

### `hey`

System reserves kind.

## Custom messages
