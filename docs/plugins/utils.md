---
sidebar_position: 4
description: Learn how to use Yazi's Lua API.
---

# Utils

## ya

### `file_cache(opts)`

Calculate the cached [Url](#url) corresponding to the given file:

- `opts` - Required, the options of the cache, which is a table:

  - `file` - The [File](#file) to be cached
  - `skip` - The number of units to skip. It's units largely depend on your previewer, such as lines for code, and percentages for videos

If the file is not allowed to be cached, such as it's ignored in the user config, or the file itself is a cache, returns `nil`.

### `manager_emit(cmd, args, data)`

Send a command to the manager without waiting for the executor to execute:

- `cmd` - Required, the command name, which is a string
- `args` - Required, the arguments of the command, which is a table of strings
- `data` - Optional, additional data passed to the command

```lua
ya.manager_emit("my-cmd", { "hello", foo = "", bar_baz = "world" })

-- Equivalent to:
-- my-cmd "hello" --foo --bar-baz="world"
```

### `image_show(url, rect)`

Display the given image within the specified area, and the image will downscale to fit that area automatically:

- `url` - Required, the [Url](#url) of the image
- `rect` - Required, the [Rect](#uirect) of the area

### `image_precache(src, dist)`

Pre-cache the image to a specified url based on user-configured [`max_width` and `max_height`](../configuration/yazi#preview):

- `src` - Required, the source [Url](#url) of the image
- `dist` - Required, the destination [Url](#url) of the image

### `dbg(msg)`

Append messages to [the log file](./overview.md#logging) at the debug level:

- `msg` - Required, the message to be logged, which is a string

Note that if you use a release build of Yazi, the log level is "error" instead of "debug", so you'll need to use [`ya.err`](#errmsg).

### `err(msg)`

Append messages to [the log file](./overview.md#logging) at the error level:

- `msg` - Required, the message to be logged, which is a string

### `plugin_retrieve`

TODO

### `preview_code(opts)`

Preview the file as code into the specified area:

- `opts` - Required, the options of the preview, which is a table:
  - `file` - The previewed [File](#file)
  - `area` - The area of the preview, which is a [Rect](#uirect)
  - `skip` - The number of units to skip. It's units largely depend on your previewer, such as lines for code, and percentages for videos
  - `window` - The [Window](#window) of the preview

### `preview_archive(opts)`

Preview the file as an archive into the specified area:

- `opts` - Required, the options of the preview. It's the same as [`preview_code`](#previewcodeopts)

### `preview_widgets(opts, widgets)`

- `opts` - Required, the options of the preview, which is a table:
  - `file` - The previewed [File](#file)
  - `skip` - The number of units to skip. It's units largely depend on your previewer, such as lines for code, and percentages for videos
  - `window` - The [Window](#window) of the preview
- `widgets` - List of renderable widgets, such as `{ ui.Paragraph {...}, ui.List {...}, ... }`

### `target_family()`

Returns the target family of the current platform, `"windows"`, `"unix"`, or `"wasm"`.

### `truncate(text, max)`

Truncate the text to the specified length and return it:

- `text` - Required, the text to be truncated, which is a string
- `max` - Required, the maximum length of the text, which is an integer

### `mime_valid(mime)`

Check whether the mime-type is valid:

- `mime` - Required, the mime-type to be checked, which is a string

### `time()`

Returns the current timestamp, which is a float, the integer part represents the seconds, and the decimal part represents the milliseconds.

### `uid()`

Only available on Unix-like systems. Returns the user id of the current user, which is an integer.

### `gid()`

Only available on Unix-like systems. Returns the group id of the current user, which is an integer.

### `user_name()`

Only available on Unix-like systems. Returns the name of the current user, which is a string if successful; otherwise, `nil`.

### `group_name()`

Only available on Unix-like systems. Returns the name of the current group, which is a string if successful; otherwise, `nil`.

### `host_name()`

Only available on Unix-like systems. Returns the hostname of the current machine, which is a string if successful; otherwise, `nil`.

## fs

### `write(url, data)`

```lua
local ok, err = fs.write(url, "hello world")
```

Write data to the specified file:

- `url` - Required, the [Url](./common.md#url) of the file
- `data` - Required, the data to be written, which is a string

Returns `(ok, err)`:

- `ok` - Whether the operation is successful, which is a boolean
- `err` - The error code if the operation is failed, which is an integer if any

### `cha(url)`

```lua
local cha, err = fs.cha(url)
```

Get the [Cha](./common.md#cha) of the specified file, which is faster than [`cha_follow`](#chafollowurl) since it never follows the symbolic link:

- `url` - Required, the [Url](./common.md#url) of the file

Returns `(cha, err)`:

- `cha` - The [Cha](./common.md#cha) of the file if successful; otherwise, `nil`
- `err` - The error code if the operation is failed, which is an integer if any

### `cha_follow(url)`

```lua
local cha, err = fs.cha_follow(url)
```

Get the [Cha](./common.md#cha) of the specified file, and follow the symbolic link:

- `url` - Required, the [Url](./common.md#url) of the file

Returns `(cha, err)`:

- `cha` - The [Cha](./common.md#cha) of the file if successful; otherwise, `nil`
- `err` - The error code if the operation is failed, which is an integer if any

## Command

You can invoke external programs through:

```lua
local child = Command("ls")
	:args({ "-a", "-l" })
	:stdout(Command.PIPED)
	:spawn()
```

Compared to Lua's `os.execute`, it provides many comprehensive and convenient methods, and the entire process is async.

It takes better advantage of the benefits of concurrent scheduling. However, it can only be used in async contexts, such as preloaders, previewers, and async functional plugins.

### `arg(arg)`

```lua
local cmd = Command("ls"):arg("-a"):arg("-l")
```

Append an argument to the command:

- `arg` - Required, the argument to be appended, which is a string

Returns `self`.

### `args(args)`

```lua
local cmd = Command("ls"):args({ "-a", "-l" }):args({ "-h" })
```

Append multiple arguments to the command:

- `args` - Required, the arguments to be appended, which is a table of strings

Returns `self`.

### `env(key, value)`

```lua
local cmd = Command("ls"):env("PATH", "/bin"):env("HOME", "/home")
```

Append an environment variable to the command:

- `key` - Required, the key of the environment variable, which is a string
- `value` - Required, the value of the environment variable, which is a string

Returns `self`.

### `stdin(cfg)`

```lua
local cmd = Command("ls"):stdin(Command.PIPED)
```

Set the stdin of the command:

- `cfg` - Required, the configuration of the stdin, accepts the following values:
  - `Command.PIPED` - Pipe the stdin
  - `Command.NULL` - Discard the stdin
  - `Command.INHERIT` - Inherit the stdin

If not set, the stdin will be null. Returns `self`.

### `stdout(cfg)`

```lua
local cmd = Command("ls"):stdout(Command.PIPED)
```

Set the stdout of the command:

- `cfg` - Required, the configuration of the stdout, accepts the following values:
  - `Command.PIPED` - Pipe the stdout
  - `Command.NULL` - Discard the stdout
  - `Command.INHERIT` - Inherit the stdout

If not set, the stdout will be null. Returns `self`.

### `stderr(cfg)`

```lua
local cmd = Command("ls"):stderr(Command.PIPED)
```

Set the stderr of the command:

- `cfg` - Required, the configuration of the stderr, accepts the following values:
  - `Command.PIPED` - Pipe the stderr
  - `Command.NULL` - Discard the stderr
  - `Command.INHERIT` - Inherit the stderr

If not set, the stderr will be null. Returns `self`.

### `spawn()`

```lua
local child, err = Command("ls"):spawn()
```

Spawn the command, returns `(child, err)`:

- `child` - The [Child](#child) of the command if successful; otherwise, `nil`
- `err` - The error code if the operation is failed, which is an integer if any

### `output()`

```lua
local output, err = Command("ls"):output()
```

Spawn the command and wait for it to finish, returns `(output, err)`:

- `output` - The [Output](#output-1) of the command if successful; otherwise, `nil`
- `err` - The error code if the operation is failed, which is an integer if any

## Child

This object is created by [`Command:spawn`](#spawn) and represents a running child process.

You can access the runtime data of this process through its proprietary methods.

### `read(len)`

```lua
local data, event = child:read(1024)
```

Let's say "available data source" refers to `stdout` or `stderr` that has been set with `Command.PIPED`, or them both.

`read()` reads data from the available data source alternately, and the `event` indicates the source of the data:

- The data comes from stdout if event is 0
- The data comes from stderr if event is 1
- There's no data to read from both stdout and stderr, if event is 2

### `read_line()`

```lua
local line, event = child:read_line()
```

Similar to [`read()`](#readlen), but it reads data line by line.

### `read_line_with(opts)`

```lua
local line, event = child:wait_line_with { timeout = 500 }
```

Similar to [`read_line()`](#read_line), but it accepts a table of options:

- `timeout` - Required, timeout in milliseconds, which is an integer

And includes the following additional events:

- Timeout if event is 3

### `wait()`

```lua
local status, err = child:wait()
```

Wait for the child process to finish, returns `(status, err)`:

- `status` - The [Status](#status) of the child process if successful; otherwise, `nil`
- `err` - The error code if the operation is failed, which is an integer if any

### `start_kill()`

```lua
local ok, err = child:start_kill()
```

Send a SIGTERM signal to the child process, returns `(ok, err)`:

- `ok` - Whether the operation is successful, which is a boolean
- `err` - The error code if the operation is failed, which is an integer if any

## Output

Properties:

- `status`: The [Status](#status) of the child process
- `stdout`: The stdout of the child process, which is a string
- `stderr`: The stderr of the child process, which is a string

## Status

This object represents the exit status of a child process, and it is created by [`wait()`](#wait), or [`output()`](#output-1).

### `success()`

```lua
local ok = status:success()
```

Returns whether the child process exited successfully, which is a boolean.

### `code()`

```lua
local code = status:code()
```

Returns the exit code of the child process, which is an integer if any.
