---
sidebar_position: 5
description: Learn how to use Yazi's Lua API.
---

# Utils

## ya {#ya}

### `hide()` {#ya.hide}

Hide Yazi to the secondary screen by returning to the terminal, completely controlled by the requested plugin.

```lua
local permit = ya.hide()
```

This method returns a `permit` for this resource. When it's necessary to restore the TUI display, call its `drop()` method:

```lua
permit:drop()
```

Note that since there's always only one available terminal control resource, `ya.hide()` cannot be called again before the previous `permit` is dropped, otherwise an error will be thrown, effectively avoiding deadlocks.

| In/Out    | Type               |
| --------- | ------------------ |
| Return    | `Permit`           |
| Available | Async context only |

### `file_cache(opts)` {#ya.file_cache}

Calculate the cached [Url](/docs/plugins/types#url) corresponding to the given file.

```lua
ya.file_cache {
	-- File to be cached.
	file = file,
	-- Number of units to skip. It's units largely depend on your previewer,
	-- such as lines for code, and percentages for videos.
	skip = 1,
}
```

If the file is not allowed to be cached, such as it's ignored in the user config, or the file itself is a cache, returns `nil`.

| In/Out | Type                            |
| ------ | ------------------------------- |
| `opts` | `{ file: File, skip: integer }` |
| Return | `Url?`                          |

### `render()` {#ya.render}

Re-render the UI:

```lua
local update_state = ya.sync(function(self, new_state)
	self.state = new_state
	ya.render()
end)
```

| In/Out    | Type              |
| --------- | ----------------- |
| Return    | `unknown`         |
| Available | Sync context only |

### `emit(cmd, args)` {#ya.emit}

Send a command to the [`[mgr]`](/docs/configuration/keymap#mgr) without waiting for the executor to execute:

```lua
ya.emit("my-cmd", { "hello", 123, foo = true, bar_baz = "world" })

-- Equivalent to:
-- my-cmd "hello" "123" --foo --bar-baz="world"
```

| In/Out | Type                              | Note                                                                                    |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------- |
| `cmd`  | `string`                          | -                                                                                       |
| `args` | `{ [integer\|string]: Sendable }` | Table values are [Sendable][sendable] that follow [Ownership transfer rules][ownership] |
| Return | `unknown`                         | -                                                                                       |

### `image_show(url, rect)` {#ya.image_show}

Display the image of `url` within the `rect`, and the image will downscale to fit the area automatically:

| In/Out    | Type               |
| --------- | ------------------ |
| `url`     | `Url`              |
| `rect`    | `Rect`             |
| Return    | `unknown`          |
| Available | Async context only |

### `image_precache(src, dist)` {#ya.image_precache}

Pre-cache the image of `src` as `dist` based on user-configured [`max_width` and `max_height`](/docs/configuration/yazi#preview).

| In/Out    | Type               |
| --------- | ------------------ |
| `src`     | `Url`              |
| `dist`    | `Url`              |
| Return    | `unknown`          |
| Available | Async context only |

### `which(opts)` {#ya.which}

Prompt users with a set of available keys:

```lua
local cand = ya.which {
	-- Key candidates, contains the following fields:
	--   `on`: Key to be prompted, which is a string or a table of strings if multiple.
	--   `desc`: Description of the key.
	cands = {
		{ on = "a" },
		{ on = "b", desc = "optional description" },
		{ on = "<C-c>", desc = "key combination" },
		{ on = { "d", "e" }, desc = "multiple keys" },
	},
	-- Whether to show the UI of key indicator
	silent = false,
}
```

When the user clicks a valid candidate, `ya.which` returns the 1-based index of that `cand`;
otherwise, it returns `nil`, indicating that the user has canceled the key operation.

| In/Out    | Type                                                                     |
| --------- | ------------------------------------------------------------------------ |
| `opts`    | `{ cands: { on: string\|string[], desc: string? }[], silent: boolean? }` |
| Return    | `number?`                                                                |
| Available | Async context only                                                       |

### `input(opts)` {#ya.input}

Request user input:

```lua
local value, event = ya.input {
	-- Title
	title = "Archive name:",
	-- Default value
	value = "",
	-- Whether to obscure the input.
	obscure = false,
	-- Position
	position = { "top-center", y = 3, w = 40 },
	-- Whether to report user input in real time.
	realtime = false,
	-- Number of seconds to wait for the user to stop typing, available if `realtime = true`.
	debounce = 0.3,
}
```

Returns `(value, event)`:

- `value`: The user input value carried by this event, which is a string if the `event` is non-zero; otherwise, `nil`.
- `event`: The event type, which is an integer:
  - 0: Unknown error.
  - 1: The user has confirmed the input.
  - 2: The user has canceled the input.
  - 3: The user has changed the input (only if `realtime` is true).

When `realtime = true` specified, `ya.input()` returns a receiver, which has a `recv()` method that can be called multiple times to receive events:

```lua
local input = ya.input {
	title = "Input in realtime:",
	position = { "center", w = 50 },
	realtime = true,
}

while true do
	local value, event = input:recv()
	if not value then
		break
	end

	ya.dbg(value)
end
```

| In/Out    | Type                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `opts`    | `{ title: string, value: string?, obscure: boolean?, position: AsPos, realtime: boolean?, debounce: number? }` |
| Return    | `(string?, integer)` \| `Recv`                                                                                 |
| Available | Async context only                                                                                             |

### `notify(opts)` {#ya.notify}

Send a foreground notification to the user:

```lua
ya.notify {
	-- Title.
	title = "Hello, World!",
	-- Content.
	content = "This is a notification from Lua!",
	-- Timeout.
	timeout = 6.5,
	-- Level, available values: "info", "warn", and "error", default is "info".
	level = "info",
}
```

| In/Out | Type                                                                                       |
| ------ | ------------------------------------------------------------------------------------------ |
| `opts` | `{ title: string, content: string, timeout: number, level: "info"\|"warn"\|"error"\|nil }` |
| Return | `unknown`                                                                                  |

### `confirm(opts)` {#ya.confirm}

Request user confirmation:

```lua
local answer = ya.confirm {
	-- Position
  pos = { "center", w = 40, h = 10 },
	-- Title
  title = "Test",
	-- Body
  body = "Hello, World!",
}
```

| In/Out    | Type                                          |
| --------- | --------------------------------------------- |
| `opts`    | `{ pos: AsPos, title: AsLine, body: AsText }` |
| Return    | `boolean`                                     |
| Available | Async context only                            |

### `dbg(msg, ...)` {#ya.dbg}

Append messages to [the log file](/docs/plugins/overview#logging) at the debug level:

```lua
ya.dbg("Hello", "World!")                       -- Multiple arguments are supported
ya.dbg({ foo = "bar", baz = 123, qux = true })  -- Any type of data is supported
```

| In/Out | Type      |
| ------ | --------- |
| `msg`  | `any`     |
| `...`  | `any`     |
| Return | `unknown` |

### `err(msg, ...)` {#ya.err}

Append messages to [the log file](/docs/plugins/overview#logging) at the error level:

```lua
ya.err("Hello", "World!")                       -- Multiple arguments are supported
ya.err({ foo = "bar", baz = 123, qux = true })  -- Any type of data is supported
```

| In/Out | Type      |
| ------ | --------- |
| `msg`  | `any`     |
| `...`  | `any`     |
| Return | `unknown` |

### `preview_code(opts)` {#ya.preview_code}

Preview the file as code into the specified area:

```lua
ya.preview_code {
	-- Available preview area
  area = area,
	-- File to be previewed.
  file = file,
	-- Mimetype of the file.
  mime = "text/plain",
	-- Number of units to skip. The units depend on your previewer,
	-- such as lines for code and percentages for videos.
  skip = 1,
}
```

Returns `(err, upper_bound)`:

- `err`: Error string if the preview fails; otherwise, `nil`.
- `upper_bound`: If the preview fails and it's because exceeds the maximum upper bound, return this bound; otherwise, `nil`.

| In/Out    | Type                                                      |
| --------- | --------------------------------------------------------- |
| `opts`    | `{ area: Rect, file: File, mime: string, skip: integer }` |
| Return    | `Error?, integer?`                                        |
| Available | Async context only                                        |

### `preview_widget(opts, widget)` {#ya.preview_widget}

```lua
local opts = {
	-- Available preview area.
	area = area,
	-- File to be previewed.
	file = file,
	-- Mimetype of the file.
	mime = "text/plain",
	-- Number of units to skip. The units depend on your previewer,
	-- such as lines for code and percentages for videos.
	skip = 1,
}

-- Preview a widget in the specified area.
ya.preview_widget(opts, ui.Line("Hello world"):area(area))

-- Preview multiple widgets in the specified area.
ya.preview_widget(opts, {
	ui.Line("Hello"):area(area1),
	ui.Line("world"):area(area2),
})
```

| In/Out    | Type                                                      |
| --------- | --------------------------------------------------------- |
| `opts`    | `{ area: Rect, file: File, mime: string, skip: integer }` |
| `widget`  | `Renderable` \| `Renderable[]`                            |
| Return    | `unknown`                                                 |
| Available | Async context only                                        |

### `sync(fn)` {#ya.sync}

See [Async context](/docs/plugins/overview#async-context).

| In/Out | Type                 |
| ------ | -------------------- |
| `fn`   | `fun(...: any): any` |
| Return | `fun(...: any): any` |

### `target_os()` {#ya.target_os}

Returns a string describing the specific operating system in use.

| In/Out | Type                                                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Return | `string` \| `"linux"` \| `"macos"` \| `"ios"` \| `"freebsd"` \| `"dragonfly"` \| `"netbsd"` \| `"openbsd"` \| `"solaris"` \| `"android"` \| `"windows"` |

### `target_family()` {#ya.target_family}

Returns the family of the operating system.

| In/Out | Type                                            |
| ------ | ----------------------------------------------- |
| Return | `string` \| `"unix"` \| `"windows"` \| `"wasm"` |

### `hash(str)` {#ya.hash}

Returns the hash of `str`:

```lua
ya.hash("Hello, World!")
```

It is designed to work with algorithm-independent tasks, such as generating file cache names.

The current implementation uses MD5, but it will be replaced with a faster hash algorithm, like [xxHash](https://github.com/Cyan4973/xxHash), in the future. So, don't rely on this implementation detail.

| In/Out    | Type               |
| --------- | ------------------ |
| `str`     | `string`           |
| Return    | `string`           |
| Available | Async context only |

### `quote(str)` {#ya.quote}

Quote characters in `str` that may have special meaning in a shell:

```lua
local handle = io.popen("ls " .. ya.quote(filename))
```

| In/Out | Type     |
| ------ | -------- |
| `str`  | `string` |
| Return | `string` |

### `truncate(text, opts)` {#ya.truncate}

Truncate the `text` to the specified width and return the truncated result:

```lua
ya.truncate("Hello, World!", {
	-- Maximum width of the text.
	max = 5,
	-- Whether to truncate the text from right-to-left.
	rtl = false
})
```

| In/Out | Type                              |
| ------ | --------------------------------- |
| `text` | `string`                          |
| `opts` | `{ max: integer, rtl: boolean? }` |
| Return | `string`                          |

### `clipboard(text)` {#ya.clipboard}

Get or set the content of the system clipboard:

```lua
-- Get contents from the clipboard if no argument is provided
local content = ya.clipboard()

-- Set contents to the clipboard
ya.clipboard("new content")
```

| In/Out    | Type               |
| --------- | ------------------ |
| `text`    | `string?`          |
| Return    | `string?`          |
| Available | Async context only |

### `time()` {#ya.time}

Returns the current timestamp, which is a float, the integer part represents the seconds, and the decimal part represents the milliseconds.

| In/Out | Type     |
| ------ | -------- |
| Return | `number` |

### `sleep(secs)` {#ya.sleep}

Waits until `secs` has elapsed:

```lua
ya.sleep(0.5)  -- Sleep for 500 milliseconds
```

| In/Out    | Type               |
| --------- | ------------------ |
| `secs`    | `number`           |
| Return    | `unknown`          |
| Available | Async context only |

### `uid()` {#ya.uid}

Returns the id of the current user.

| In/Out    | Type                   |
| --------- | ---------------------- |
| Return    | `integer`              |
| Available | Unix-like systems only |

### `gid()` {#ya.gid}

Returns the group id of the current user.

| In/Out    | Type                   |
| --------- | ---------------------- |
| Return    | `integer`              |
| Available | Unix-like systems only |

### `user_name(uid)` {#ya.user_name}

Get the username by `uid`:

```lua
-- Get the current user's name if no argument is provided
ya.user_name()

-- Get the name of user with id 1000
ya.user_name(1000)
```

| In/Out    | Type                   |
| --------- | ---------------------- |
| `uid`     | `integer?`             |
| Return    | `string?`              |
| Available | Unix-like systems only |

### `group_name(gid)` {#ya.group_name}

Get the group name by `gid`:

```lua
-- Get the current user's group name if no argument is provided
ya.group_name()

-- Get the name of group with id 1000
ya.group_name(1000)
```

| In/Out    | Type                   |
| --------- | ---------------------- |
| `gid`     | `integer?`             |
| Return    | `string?`              |
| Available | Unix-like systems only |

### `host_name()` {#ya.host_name}

Returns the hostname of the current machine.

| In/Out    | Type                   |
| --------- | ---------------------- |
| Return    | `string?`              |
| Available | Unix-like systems only |

## ps {#ps}

Yazi's DDS (Data Distribution Service) uses a Lua-based publish-subscribe model as its carrier. That is, you can achieve cross-instance communication and state persistence through the `ps` API. See [DDS](/docs/dds) for details.

The following functions can only be used within a sync context.

### `pub(kind, value)` {#ps.pub}

Publish a message to the current instance, and all plugins subscribed through `sub()` for this `kind` will receive it, achieving internal communication within the instance:

```lua
ps.pub("greeting", "Hello, World!")
```

Since the `kind` is used globally, to add the plugin name as the prefix is a best practice.
For example, the combination of the plugin `my-plugin` and the kind `event1` would be `my-plugin-event1`.

| In/Out  | Type       | Note                                                                            |
| ------- | ---------- | ------------------------------------------------------------------------------- |
| `kind`  | `string`   | Alphanumeric with dashes, cannot be [built-in kinds](/docs/dds#kinds)           |
| `value` | `Sendable` | A [Sendable value][sendable] that follows [Ownership transfer rules][ownership] |
| Return  | `unknown`  | -                                                                               |

### `pub_to(receiver, kind, value)` {#ps.pub_to}

Publish a message to a specific instance with `receiver` as the ID:

```lua
ps.pub_to(1711957283332834, "greeting", "Hello, World!")
```

Where:

- Local - `receiver` is the current instance, and is subscribed to this `kind` via `sub()`, it will receive the message.
- Remote - `receiver` isn't the current instance, and is subscribed to this `kind` via `sub_remote()`, it will receive the message.
- Broadcast - `receiver` is `0`, all remote instances subscribed to this `kind` via `sub_remote()` will receive the message.

| In/Out     | Type       | Note                                                                            |
| ---------- | ---------- | ------------------------------------------------------------------------------- |
| `receiver` | `integer`  | -                                                                               |
| `kind`     | `string`   | Alphanumeric with dashes, cannot be [built-in kinds](/docs/dds#kinds)           |
| `value`    | `Sendable` | A [Sendable value][sendable] that follows [Ownership transfer rules][ownership] |
| Return     | `unknown`  | -                                                                               |

### `sub(kind, callback)` {#ps.sub}

Subscribe to local messages of `kind` and call the `callback` handler for it:

```lua
-- The same `kind` from the same plugin can only be subscribed once,
-- re-subscribing (`sub()`) before unsubscribing (`unsub()`) will throw an error.
ps.sub("cd", function(body)
	ya.dbg("New cwd", cx.active.current.cwd)
end)
```

It runs in a sync context, so you can access all states via `cx` for the data of interest.

| In/Out     | Type                  | Note                                                                  |
| ---------- | --------------------- | --------------------------------------------------------------------- |
| `kind`     | `string`              | Alphanumeric with dashes, cannot be [built-in kinds](/docs/dds#kinds) |
| `callback` | `fun(body: Sendable)` | No time-consuming work should be done in the callback                 |
| Return     | `unknown`             | -                                                                     |

### `sub_remote(kind, callback)` {#ps.sub_remote}

Same as `sub()`, except it subscribes to remote messages of this `kind` instead of local.

| In/Out     | Type                  | Note            |
| ---------- | --------------------- | --------------- |
| `kind`     | `string`              | Same as `sub()` |
| `callback` | `fun(body: Sendable)` | Same as `sub()` |
| Return     | `unknown`             | -               |

### `unsub(kind)` {#ps.unsub}

Unsubscribe from local messages of this `kind`:

```lua
ps.unsub("my-message")
```

| In/Out | Type      | Note                                                                  |
| ------ | --------- | --------------------------------------------------------------------- |
| `kind` | `string`  | Alphanumeric with dashes, cannot be [built-in kinds](/docs/dds#kinds) |
| Return | `unknown` | -                                                                     |

### `unsub_remote(kind)` {#ps.unsub_remote}

Unsubscribe from remote messages of this `kind`:

```lua
ps.unsub_remote("my-message")
```

| In/Out | Type      | Note              |
| ------ | --------- | ----------------- |
| `kind` | `string`  | Same as `unsub()` |
| Return | `unknown` | -                 |

## fs {#fs}

The following functions can only be used within an async context.

### `cwd()` {#fs.cwd}

Get the current working directory (CWD) of the process.

This API was added to compensate for the lack of a [`getcwd`][getcwd] in Lua; it is used to retrieve the directory of the last [`chdir`][chdir] call:

```lua
local url, err = fs.cwd()
```

You probably will never need it, and more likely, you'll need [`cx.active.current.cwd`][folder-cwd], which is the current directory where the user is working.

Specifically, when the user changes the directory, `cx.active.current.cwd` gets updated immediately, while synchronizing this update with the filesystem via `chdir` involves I/O operations, such as checking if the directory is valid.

So, there may be some delay, which is particularly noticeable on slow devices. For example, when an HDD wakes up from sleep, it typically takes 3~4 seconds.

It is useful if you just need a valid directory as the CWD of a process to start some work that doesn't depend on the CWD.

| In/Out    | Type               |
| --------- | ------------------ |
| Return    | `Url?, Error?`     |
| Available | Async context only |

[getcwd]: https://man7.org/linux/man-pages/man3/getcwd.3.html
[chdir]: https://man7.org/linux/man-pages/man2/chdir.2.html
[folder-cwd]: /docs/plugins/context#tab-folder.cwd

### `cha(url, follow)` {#fs.cha}

Get the [Cha](/docs/plugins/types#cha) of the specified `url`:

```lua
-- Not following symbolic links
local cha, err = fs.cha(url)

-- Follow symbolic links
local cha, err = fs.cha(url, true)
```

| In/Out    | Type               |
| --------- | ------------------ |
| `url`     | `Url`              |
| `follow`  | `boolean?`         |
| Return    | `Cha?, Error?`     |
| Available | Async context only |

### `write(url, data)` {#fs.write}

Write `data` to the specified `url`:

```lua
local ok, err = fs.write(url, "hello world")
```

| In/Out    | Type               |
| --------- | ------------------ |
| `url`     | `Url`              |
| `data`    | `string`           |
| Return    | `boolean, Error?`  |
| Available | Async context only |

### `create(type, url)` {#fs.create}

Create file(s) at the `url` of the file system:

```lua
local ok, err = fs.create("dir_all", Url("/tmp/test/nest/nested"))
```

Where `type` can be one of the following:

- `"dir"`: Creates a new, empty directory.
- `"dir_all"`: Recursively create a directory and all of its parents if they are missing.

| In/Out    | Type                               |
| --------- | ---------------------------------- |
| `type`    | `string` \| `"dir"` \| `"dir_all"` |
| `url`     | `Url`                              |
| Return    | `boolean, Error?`                  |
| Available | Async context only                 |

### `remove(type, url)` {#fs.remove}

Remove file(s) at the `url` of the file system:

```lua
local ok, err = fs.remove("file", Url("/tmp/test.txt"))
```

Where `type` can be one of the following:

- `"file"`: Removes a file from the filesystem.
- `"dir"`: Removes an existing, empty directory.
- `"dir_all"`: Removes a directory at this url, after removing all its contents. Use carefully!
- `"dir_clean"`: Remove all empty directories under it, and if the directory itself is empty afterward, remove it as well.

| In/Out    | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `type`    | `string` \| `"file"` \| `"dir"` \| `"dir_all"` \| `"dir_clean"` |
| `url`     | `Url`                                                           |
| Return    | `boolean, Error?`                                               |
| Available | Async context only                                              |

### `read_dir(url, options)` {#fs.read_dir}

Reads the directory contents of `url`:

```lua
local files, err = fs.read_dir(url, {
	-- Glob pattern to filter files out if provided.
	glob = nil,
	-- Maximum number of files to read, defaults to unlimited.
	limit = 10,
	-- Whether to resolve symbolic links, defaults to `false`.
	resolve = false,
})
```

| In/Out    | Type                                                    |
| --------- | ------------------------------------------------------- |
| `url`     | `Url`                                                   |
| `options` | `{ glob: string?, limit: integer?, resolve: boolean? }` |
| Return    | `File[]?, Error?`                                       |
| Available | Async context only                                      |

### `unique_name(url)` {#fs.unique_name}

Get a unique name from the given `url` to ensure it's unique in the filesystem:

```lua
local url, err = fs.unique_name(Url("/tmp/test.txt"))
```

If the file already exists, it will append `_n` to the filename, where `n` is a number, and keep incrementing until the first available name is found.

| In/Out    | Type               |
| --------- | ------------------ |
| `url`     | `Url`              |
| Return    | `Url?, Error?`     |
| Available | Async context only |

## Command {#command}

You can invoke external programs through:

```lua
local child, err = Command("ls")
	:args({ "-a", "-l" })
	:stdout(Command.PIPED)
	:spawn()
```

Compared to Lua's `os.execute`, it provides many comprehensive and convenient methods, and the entire process is async.

It takes better advantage of the benefits of concurrent scheduling. However, it can only be used in async contexts, such as preloaders, previewers, and async functional plugins.

### `arg(self, arg)` {#Command.arg}

Append one or more arguments to the command:

```lua
local cmd = Command("ls"):arg("-a"):arg("-l")
-- Equivalent to:
local cmd = Command("ls"):arg { "-a", "-l" }
```

| In/Out | Type                   |
| ------ | ---------------------- |
| `self` | `Self`                 |
| `arg`  | `string` \| `string[]` |
| Return | `self`                 |

### `cwd(self, dir)` {#Command.cwd}

Set the current working directory of the command:

```lua
local cmd = Command("ls"):cwd("/root")
```

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| `dir`  | `string` |
| Return | `self`   |

### `env(self, key, value)` {#Command.env}

Append an environment variable to the command:

```lua
local cmd = Command("ls"):env("PATH", "/bin"):env("HOME", "/home")
```

| In/Out  | Type     |
| ------- | -------- |
| `self`  | `Self`   |
| `key`   | `string` |
| `value` | `string` |
| Return  | `self`   |

### `stdin(self, stdio)` {#Command.stdin}

Set the stdin of the command:

```lua
local cmd = Command("ls"):stdin(Command.PIPED)
```

Where `stdio` can be one of the following:

- `Command.PIPED`: Pipe the stdin.
- `Command.NULL`: Discard the stdin (default).
- `Command.INHERIT`: Inherit the stdin.

| In/Out  | Type    |
| ------- | ------- |
| `self`  | `Self`  |
| `stdio` | `Stdio` |
| Return  | `self`  |

### `stdout(self, stdio)` {#Command.stdout}

Set the stdout of the command:

```lua
local cmd = Command("ls"):stdout(Command.PIPED)
```

Where `stdio` can be one of the following:

- `Command.PIPED`: Pipe the stdout.
- `Command.NULL`: Discard the stdout (default).
- `Command.INHERIT`: Inherit the stdout.

| In/Out  | Type    |
| ------- | ------- |
| `self`  | `Self`  |
| `stdio` | `Stdio` |
| Return  | `self`  |

### `stderr(self, stdio)` {#Command.stderr}

Set the stderr of the command:

```lua
local cmd = Command("ls"):stderr(Command.PIPED)
```

Where `stdio` can be one of the following:

- `Command.PIPED`: Pipe the stderr.
- `Command.NULL`: Discard the stderr (default).
- `Command.INHERIT`: Inherit the stderr.

| In/Out  | Type    |
| ------- | ------- |
| `self`  | `Self`  |
| `stdio` | `Stdio` |
| Return  | `self`  |

### `spawn(self)` {#Command.spawn}

Spawn the command:

```lua
local child, err = Command("ls"):spawn()
```

| In/Out | Type             |
| ------ | ---------------- |
| `self` | `Self`           |
| Return | `Child?, Error?` |

### `output(self)` {#Command.output}

Spawn the command and wait for it to finish:

```lua
local output, err = Command("ls"):output()
```

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| Return | `Output?, Error?` |

### `status(self)` {#Command.status}

Executes the command as a child process, waiting for it to finish and collecting its exit status:

```lua
local status, err = Command("ls"):status()
```

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| Return | `Status?, Error?` |

### `__new(value)` {#command.\_\_new}

Make a new command.

| In/Out  | Type     |
| ------- | -------- |
| `value` | `string` |
| Return  | `Self`   |

## Child {#child}

This object is created by [`Command:spawn()`](#Command.spawn) and represents a running child process.

You can access the runtime data of this process through its proprietary methods.

### `read(self, len)` {#Child.read}

Reads data from the available data source alternately:

```lua
local data, event = child:read(1024)
```

"available data source" refers to `stdout` or `stderr` that has `Command.PIPED` set, or them both, the `event` indicates where the data comes from:

- Data comes from stdout, if event is 0.
- Data comes from stderr, if event is 1.
- No data to read from both stdout and stderr, if event is 2.

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| `len`  | `integer`         |
| Return | `string, integer` |

### `read_line(self)` {#Child.read_line}

Same as [`read()`](#Child.read), except it reads data line by line:

```lua
local line, event = child:read_line()
```

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| Return | `string, integer` |

### `read_line_with(self, opts)` {#Child.read_line_with}

Same as [`read_line()`](#Child.read_line), except it accepts a table of options:

```lua
local line, event = child:read_line_with {
	-- Timeout to read
	timeout = 500,
}
```

It has a extra event:

- Timeout, if event is 3.

| In/Out | Type                   |
| ------ | ---------------------- |
| `self` | `Self`                 |
| `opts` | `{ timeout: integer }` |
| Return | `string, integer`      |

### `write_all(self, src)` {#Child.write_all}

Writes all `src` to the stdin of the child process:

```lua
local ok, err = child:write_all(src)
```

Ensure that the child's stdin is available when calling this method, specifically:

1. [`stdin(Command.PIPED)`](/docs/plugins/utils#Command.stdin) is set.
2. [`take_stdin()`](/docs/plugins/utils#Child.take_stdin) has never been called.

Otherwise, an error will be thrown.

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| `src`  | `string`          |
| Return | `boolean, Error?` |

### `flush(self)` {#Child.flush}

Flushes any buffered data to the stdin of the child process:

```lua
local ok, err = child:flush()
```

Ensure that the child's stdin is available when calling this method, specifically:

1. [`stdin(Command.PIPED)`](/docs/plugins/utils#Command.stdin) is set.
2. [`take_stdin()`](/docs/plugins/utils#Child.take_stdin) has never been called.

Otherwise, an error will be thrown.

| In/Out   | Type              |
| -------- | ----------------- |
| `self`   | `Self`            |
| `Return` | `boolean, Error?` |

### `wait(self)` {#Child.wait}

Wait for the child process to finish:

```lua
local status, err = child:wait()
```

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| Return | `Status?, Error?` |

### `wait_with_output(self)` {#Child.wait_with_output}

Wait for the child process to finish and get the output:

```lua
local output, err = child:wait_with_output()
```

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| Return | `Output?, Error?` |

### `start_kill(self)` {#Child.start_kill}

Send a SIGTERM signal to the child process:

```lua
local ok, err = child:start_kill()
```

| In/Out | Type              |
| ------ | ----------------- |
| `self` | `Self`            |
| Return | `boolean, Error?` |

### `take_stdin(self)` {#Child.take_stdin}

Take and return the stdin stream of the child process:

```lua
local stdin = child:take_stdin()
```

This method can only be called once and is only applicable to processes with [`stdin(Command.PIPED)`](/docs/plugins/utils#Command.stdin) set;
otherwise, it returns `nil`.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `Stdio?` |

### `take_stdout(self)` {#Child.take_stdout}

Take and return the stdout stream of the child process:

```lua
local stderr = child:take_stdout()
```

which is useful when redirecting stdout to another process's stdin:

```lua
local echo = Command("echo"):arg("Hello"):stdout(Command.PIPED):spawn()

local rev = Command("rev"):stdin(echo:take_stdout()):stdout(Command.PIPED):output()

ya.dbg(rev.stdout) -- "olleH\n"
```

This method can only be called once and is only applicable to processes with [`stdout(Command.PIPED)`](/docs/plugins/utils#Command.stdin) set;
otherwise, it returns `nil`.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `Stdio?` |

### `take_stderr(self)` {#Child.take_stderr}

Take and return the stderr stream of the child process:

```lua
local stderr = child:take_stderr()
```

See [`take_stdout()`](/docs/plugins/utils#Child.take_stdout) for an example.

This method can only be called once and is only applicable to processes with [`stderr(Command.PIPED)`](/docs/plugins/utils#Command.stdin) set;
otherwise, it returns `nil`.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `Stdio?` |

## Output {#output}

### `status` {#output.status}

Status of the child process.

|      |                     |
| ---- | ------------------- |
| Type | [`Status`](#status) |

### `stdout` {#output.stdout}

Stdout of the child process.

|      |          |
| ---- | -------- |
| Type | `string` |

### `stderr` {#output.stderr}

Stderr of the child process.

|      |          |
| ---- | -------- |
| Type | `string` |

## Status {#status}

This object represents the exit status of a child process, and it is created by [`wait()`](#Child.wait), or [`output()`](#Command.output).

### `success` {#status.success}

Whether the child process exited successfully.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `code` {#status.code}

Exit code of the child process.

|      |            |
| ---- | ---------- |
| Type | `integer?` |

<!-- Links -->

[sendable]: /docs/plugins/overview#sendable
[ownership]: /docs/plugins/overview#ownership
