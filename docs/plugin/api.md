---
sidebar_position: 1
description: Learn how to use Yazi's Lua API.
---

# API (Work in progress)

## Layout

Paragraph, List, Bar, Border, and Gauge are renderable widgets; others need to be placed within any of them.

### `ui.Bar`

Create a bar:

```lua
ui.Bar(rect, direction)
```

The first attribute is a [Rect](#uirect), representing the position of this bar.
The second denotes the direction of the bar and accepts the following constants:

- `ui.Bar.NONE`
- `ui.Bar.TOP`
- `ui.Bar.RIGHT`
- `ui.Bar.BOTTOM`
- `ui.Bar.LEFT`
- `ui.Bar.ALL`

Methods (all methods return `self`):

- `ui.Bar:symbol(symbol)` - accepts a string, specifying the symbol for the bar
- `ui.Bar:style(style)` - accepts a [Style](#uistyle), specifying the style of the bar

### `ui.Border`

Create a border:

```lua
ui.Border(rect, position)
```

The first attribute is a [Rect](#uirect), representing the position of this border.
The second denotes the position of the border and accepts the following constants:

- `ui.Border.NONE`
- `ui.Border.TOP`
- `ui.Border.RIGHT`
- `ui.Border.BOTTOM`
- `ui.Border.LEFT`
- `ui.Border.ALL`

You can also use `ui.Border:type(type)` to specify different types for the border. It accepts the following type constants:

- `ui.Border.PLAIN`
- `ui.Border.ROUNDED`
- `ui.Border.DOUBLE`
- `ui.Border.THICK`
- `ui.Border.QUADRANT_INSIDE`
- `ui.Border.QUADRANT_OUTSIDE`

Methods (all methods return `self`):

- `ui.Border:style(style)` - accepts a [Style](#uistyle), specifying the style of the border

### `ui.Constraint`

Constraints are used to define the size of a layout.

They can be used to define a fixed size, a percentage of the available space, a ratio of the available space, or a minimum or maximum size:

```lua
ui.Constraint.Percentage(50) -- Apply a percentage to a given amount
ui.Constraint.Ratio(1, 3)    -- Apply a ratio
ui.Constraint.Length(10)     -- Apply no more than the given amount (currently roughly equal to `ui.Constraint.Max`)
ui.Constraint.Max(5)         -- Apply at most the given amount
ui.Constraint.Min(3)         -- Apply at least the given amount
```

### `ui.Gauge`

Create a gauge:

```lua
ui.Gauge(rect)
```

- `ui.Gauge:percent(percent)` - Set the percentage of the gauge
- `ui.Gauge:ratio(ratio)` - Set the ratio of the gauge
- `ui.Gauge:label(label)` - Set the label of the gauge
- `ui.Gauge:style(style)` - Set the style of everything except the bar itself, which accepts a [Style](#uistyle)
- `ui.Gauge:gauge_style(style)` - Set the style of the bar, which accepts a [Style](#uistyle)

### `ui.Layout`

Create a layout:

```lua
ui.Layout()
```

- `ui.Layout:direction(direction)` - Set the direction of the layout. It accepts the following constants:
  - `ui.Layout.HORIZONTAL`
  - `ui.Layout.VERTICAL`
- `ui.Layout:margin(margin)` - Set the margin of the layout
- `ui.Layout:margin_h(margin)` - Set the horizontal margin of the layout
- `ui.Layout:margin_v(margin)` - Set the vertical margin of the layout
- `ui.Layout:constraints({ constraint, ... })` - Set the constraints of the layout, which accepts a list of [Constraint](#uiconstraint)
- `ui.Layout:split(rect)` - Accepts a [Rect](#uirect) and split it into multiple [Rect](#uirect) according to the constraints

### `ui.Line`

Create a line, which accepts a list of [Span](#uispan) and [Line](#uiline):

```lua
ui.Line { span, line, span, ... }
```

- `ui.Line:width()` - Get the width of the line
- `ui.Line:style(style)` - Set the style of the line, which accepts a [Style](#uistyle)
- `ui.Line:align(alignment)` - Set the alignment of the line. It accepts the following constants:
  - `ui.Line.LEFT`
  - `ui.Line.CENTER`
  - `ui.Line.RIGHT`

### `ui.List`

Create a list:

```lua
ui.List(rect, items)
```

The first attribute is a [Rect](#uirect), representing the position of this list.
The second denotes the items of the list and accepts a list of [ListItem](#uilistitem).

### `ui.ListItem`

Create a list item:

```lua
ui.ListItem(line)
ui.ListItem(span)
ui.ListItem("string")
```

Methods (all methods return `self`):

- `ui.ListItem:style(style)` - Set the style of the list item, which accepts a [Style](#uistyle)

### `ui.Padding`

All parameters for padding are integers:

```lua
ui.Padding(left, right, top, bottom)
```

If you want to specify only one of them, you can:

- `ui.Padding.left(left)` equal to `ui.Padding(left, 0, 0, 0)`
- `ui.Padding.right(right)` equal to `ui.Padding(0, right, 0, 0)`
- `ui.Padding.top(top)` equal to `ui.Padding(0, 0, top, 0)`
- `ui.Padding.bottom(bottom)` equal to `ui.Padding(0, 0, 0, bottom)`

Or specify a particular direction for them:

- `ui.Padding.x(x)` equal to `ui.Padding(x, x, 0, 0)`
- `ui.Padding.y(y)` equal to `ui.Padding(0, 0, y, y)`
- `ui.Padding.xy(x, y)` equal to `ui.Padding(x, x, y, y)`

Properties:

- `left` - left padding
- `right` - right padding
- `top` - top padding
- `bottom` - bottom padding

### `ui.Paragraph`

Create a paragraph:

```lua
ui.Paragraph(rect, { line, line, ... })
```

The first attribute is a [Rect](#uirect), representing the position of this paragraph.
The second denotes the lines of the paragraph and accepts a list of [Line](#uiline).

You can also use `ui.Paragraph.parse(string)` to parse an [ANSI escape sequence](https://en.wikipedia.org/wiki/ANSI_escape_code) string into a paragraph.

Methods (all methods return `self`):

- `ui.Paragraph:style(style)` - Set the style of the paragraph, which accepts a [Style](#uistyle)
- `ui.Paragraph:align(alignment)` - Set the alignment of the paragraph. It accepts the following constants:
  - `ui.Paragraph.LEFT`
  - `ui.Paragraph.CENTER`
  - `ui.Paragraph.RIGHT`

### `ui.Rect`

A Rect is represented an area within the terminal by four attributes:

```lua
ui.Rect {
	x = 10, -- x position
	y = 10, -- y position
	w = 20, -- width
	h = 30, -- height
}

ui.Rect.default  -- Equal to `ui.Rect { x = 0, y = 0, w = 0, h = 0 }`
```

You can obtain a pre-computed `Rect` through [Yazi's layout system](#uilayout).

Note that if you intend to create it yourself, ensure these values are calculated accurately; otherwise, it may cause Yazi to crash!

Properties:

- `x` - x position
- `y` - y position
- `w` - width
- `h` - height
- `left` - left position
- `right` - right position
- `top` - top position
- `bottom` - bottom position

Methods (all methods return `self`):

- `ui.Rect:padding(padding)` - Set padding. It accepts a [Padding](#uipadding)

### `ui.Span`

Create a span:

```lua
ui.Span("string")
```

Methods (all methods return `self`):

- `ui.Span:fg(color)` - Set the foreground color of the span, which accepts a [Color](../configuration/theme.md#types)
- `ui.Span:bg(color)` - Set the background color of the span, which accepts a [Color](../configuration/theme.md#types)
- `ui.Span:bold()` - Set the span to bold
- `ui.Span:dim()` - Set the span to dim
- `ui.Span:italic()` - Set the span to italic
- `ui.Span:underline()` - Set the span to underline
- `ui.Span:blink()` - Set the span to blink
- `ui.Span:blink_rapid()` - Set the span to blink rapidly
- `ui.Span:hidden()` - Set the span to hidden
- `ui.Span:crossed()` - Set the span to crossed
- `ui.Span:reset()` - Reset the style of the span
- `ui.Span:style(style)` - Set the style of the span, which accepts a [Style](#uistyle)

### `ui.Style`

Create a style:

```lua
ui.Style()
```

- `ui.Style:fg(string)` - Set the foreground color of the style, which accepts a [Color](../configuration/theme.md#types)
- `ui.Style:bg(string)` - Set the background color of the style, which accepts a [Color](../configuration/theme.md#types)
- `ui.Style:bold()` - Set the style to bold
- `ui.Style:dim()` - Set the style to dim
- `ui.Style:italic()` - Set the style to italic
- `ui.Style:underline()` - Set the style to underline
- `ui.Style:blink()` - Set the style to blink
- `ui.Style:blink_rapid()` - Set the style to blink rapidly
- `ui.Style:hidden()` - Set the style to hidden
- `ui.Style:crossed()` - Set the style to crossed
- `ui.Style:reset()` - Reset the style

## Config

TODO

- BOOT
- MANAGER
- THEME
- PREVIEW

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

Pre-cache the image to a specified path based on user-configured [`max_width` and `max_height`](../configuration/yazi#preview):

- `src` - Required, the source path of the image
- `dist` - Required, the destination path of the image

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

## Common

### Cha

Cha means one file's characteristics with the following properties:

- `is_dir`: Whether this file is a directory
- `is_hidden`: Whether this file is hidden (starts with a dot)
- `is_link`: Whether this file is a symlink
- `is_bad_link`: Whether this file is a bad symlink, which points to a non-existent file
- `length`: The length of this file, returns a integer representing the size in bytes. Note that it can't reflect the size of a directory, use [`size()`](#folderfile) instead
- `created`: The created time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `modified`: The modified time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `accessed`: The accessed time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `permissions`: Unix permissions of this file in string, e.g. `drwxr-xr-x`. For Windows, it's always `nil`

And the Unix only properties:

- `is_block_device`: Whether this file is a block device
- `is_char_device`: Whether this file is a character device
- `is_fifo`: Whether this file is a fifo
- `is_socket`: Whether this file is a socket
- `uid`: The user id of this file
- `gid`: The group id of this file

### File

Properties:

- `url`: The [Url](#url) of this file
- `cha`: The [Cha](#cha) of this file
- `link_to`: The [Url](#url) of this file pointing to, if it's a symlink; otherwise, `nil`
- `name`: The name of this file

### Icon

Properties:

- `text`: The text of this icon
- `style`: The [Style](#uistyle) of this icon

### Range

TODO

### Url

Properties:

- `frag`: The fragment string of this url. Let's say the url is `archive:///root/my-archive.zip#1.jpg`, then the fragment is `1.jpg`
- `is_regular`: Whether the file represented by this url is a regular file
- `is_search`: Whether the file represented by this url from the search result
- `is_archive`: Whether the file represented by this url from an archive

Meta methods:

- `__eq(another_url)`
- `__tostring()`
- `__concat(string)`

### Window

Properties:

- `rows`: The number of rows of this window
- `cols`: The number of columns of this window
- `width`: The width of this window in pixels
- `height`: The height of this window in pixels

## Sync context

The sync context accompanies the entire app lifecycle, you can access all app data through the `cx` within it:

- `cx.active`: The active tab, which is a [tab::Tab](#tabtab)
- `cx.tabs`: All of tabs, which is a [manager::Tabs](#managertabs)
- `cx.tasks`: All of tasks, which is a [tasks::Tasks](#taskstasks)

which is active during UI rendering (UI plugins) and when executing sync functional plugins (`plugin --sync` command).

For better performance, the sync context is created only at the app's start and remains singular throughout. Thus, plugins running within this context share states,
prompting plugin developers to create separate namespaces for their plugins to prevent global space contamination.

### `tab::Mode`

Visual mode status.

Properties:

- `is_select`: Whether the mode is select
- `is_unset`: Whether the mode is unset
- `is_visual`: Whether the mode is select or unset

Methods:

- `pending(idx, state)`: TODO

Meta methods:

- `__tostring()`

### `tab::Config`

TODO

Properties:

- `sort_by`
- `sort_sensitive`
- `sort_reverse`
- `sort_dir_first`
- `linemode`
- `show_hidden`

### `tab::Preview`

TODO

Properties:

- `skip`
- `folder`

### `folder::Folder`

- cwd
- offset
- cursor
- window
- files
- hovered

### `folder::Files`

Meta methods:

- `__len()`
- `__pairs()`

### `folder::File`

Based on [File](#file), with the following additional methods:

- `size()` - The size of this file, returns a integer representing the size in bytes, or `nil` if its a directory and it has not been scanned
- `mime()` - The mime-type string of this file
- `prefix()` - The prefix of this file relative to `CWD`, which used in the flat view during search. For instance, if `CWD` is `/foo`, and the file is `/foo/bar/baz`, then the prefix is `bar/`
- `icon()` - The [Icon](#icon) of this file, [`[icon]`](../configuration/theme.md#icons) rules are applied
- `style()` - The [Style](#uistyle) of this file, [`[filetype]`](../configuration/theme.md#filetype) rules are applied
- `is_hovered()` - Whether this file is hovered
- `is_yanked()` - Whether this file is yanked
- `is_selected()` - Whether this file is selected
- `found()` - When users find a file using the `find` command, the status of the file - returns `nil` if it doesn't match the user's find keyword; otherwise, returns `{idx, all}`, where `idx` is the position of matched file, and `all` represents the number of all matched files.
- `highlights()` - TODO

### `manager::Tabs`

Properties:

- `idx`: The index of the active tab

Meta methods:

- `__len()`
- `__index(idx)`

### `tab::Tab`

Properties:

- `mode`: The [tab::Mode](#tabmode) of this tab
- `conf`: The [tab::Config](#tabconfig) of this tab
- `parent`: The parent folder within this tab, which is a [folder::Folder](#folderfolder)
- `current`: The current folder within this tab, which is a [folder::Folder](#folderfolder)
- `preview`: The [tab::Preview](#tabpreview) within this tab

Methods:

- `name()`: The name of this tab

### `tasks::Tasks`

Properties:

- `progress`: The progress of all tasks, which is a table:

  ```lua
  {
  	-- Number of tasks
  	total = 0,
  	succ  = 0,
  	fail  = 0,

  	-- Workload of tasks
  	found     = 0,
  	processed = 0,
  }
  ```

## Isolate context

### fs

TODO

Functions:

- `write(url, data)`
- `metadata(url)`
- `symlink_metadata(url)`

### Child

TODO

Methods:

- `read(len)`
- `read_line()`
- `read_line_with(opts)`
- `wait()`
- `start_kill()`

### Command

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
