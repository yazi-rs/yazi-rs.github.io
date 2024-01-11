---
sidebar_position: 4
description: Learn how to use Yazi's Lua API.
---

# Utils (Work in progress)

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

Append messages to Yazi's log file at the debug level:

- `msg` - Required, the message to be logged, which is a string

Note that if you build in release mode, the log level for Yazi is "error" instead of "debug", so you'll need to use [`ya.err`](#errmsg).

### `err(msg)`

Append messages to Yazi's log file at the error level:

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
- `max` - Required, the maximum length of the text, which is a integer

### `mime_valid(mime)`

Check whether the mime-type is valid:

- `mime` - Required, the mime-type to be checked, which is a string

### `time()`

Returns the current timestamp, which is a float, the integer part represents the seconds, and the decimal part represents the milliseconds.

### `uid()`

Returns the user id of the current user, which is a integer.

### `gid()`

Returns the group id of the current user, which is a integer.

### `user_name()`

Returns the name of the current user, which is a string.

### `group_name()`

Returns the name of the current group, which is a string.

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
- `err` - The error code if the operation is failed, which is a integer if any

### `cha(url)`

```lua
local cha, err = fs.cha(url)
```

Get the [Cha](./common.md#cha) of the specified file, which is faster than [`cha_follow`](#chafollowurl) since it never follows the symbolic link:

- `url` - Required, the [Url](./common.md#url) of the file

Returns `(cha, err)`:

- `cha` - The [Cha](./common.md#cha) of the file, which is a table
- `err` - The error code if the operation is failed, which is a integer if any

### `cha_follow(url)`

```lua
local cha, err = fs.cha_follow(url)
```

Get the [Cha](./common.md#cha) of the specified file, and follow the symbolic link:

- `url` - Required, the [Url](./common.md#url) of the file

Returns `(cha, err)`:

- `cha` - The [Cha](./common.md#cha) of the file, which is a table
- `err` - The error code if the operation is failed, which is a integer if any

## Command

TODO

Methods:

- `arg(arg)`
- `args(args)`
- `env(key, value)`
- `stdin(cfg)`
- `stdout(cfg)`
- `stderr(cfg)`
- `spawn()`
- `output()`

### Child

TODO

Methods:

- `read(len)`
- `read_line()`
- `read_line_with(opts)`
- `wait()`
- `start_kill()`

### Output

TODO

Properties:

- `status`
- `stdout`
- `stderr`

### Status

Methods:

- `success()`
- `code()`

TODO
