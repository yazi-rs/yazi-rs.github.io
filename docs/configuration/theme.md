---
sidebar_position: 3
description: Learn how to configure your Yazi theme.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# theme.toml

:::tip
If you're looking for ready-made themes and don't want to create one yourself, check out the [yazi-rs/flavors](https://github.com/yazi-rs/flavors) repository.
:::

## Types {#types}

### Color {#types.color}

A color. It can be in Hex format with RGB values, such as `"#484D66"`. Or can be one of the following 17 values:

- `"reset"`
- `"black"`
- `"white"`
- `"red"`
- `"lightred"`
- `"green"`
- `"lightgreen"`
- `"yellow"`
- `"lightyellow"`
- `"blue"`
- `"lightblue"`
- `"magenta"`
- `"lightmagenta"`
- `"cyan"`
- `"lightcyan"`
- `"gray"`
- `"darkgray"`

### Style {#types.style}

Appears in a format similar to `{ fg = "#e4e4e4", bg = "black", ... }`, and supports the following properties:

- fg (Color): Foreground color
- bg (Color): Background color
- bold (Boolean): Bold
- dim (Boolean): Dim (not supported by all terminals)
- italic (Boolean): Italic
- underline (Boolean): Underline
- blink (Boolean): Blink
- blink_rapid (Boolean): Rapid blink
- reversed (Boolean): Reversed foreground and background colors
- hidden (Boolean): Hidden
- crossed (Boolean): Crossed out

## [flavor] {#flavor}

See [flavor documentation](/docs/flavors/overview) for more details.

### `dark` {#flavor.dark}

Flavor name used in dark mode, e.g. `"dracula"`.

|      |          |
| ---- | -------- |
| Type | `string` |

### `light` {#flavor.light}

Flavor name used in light mode, e.g. `"gruvbox"`.

|      |          |
| ---- | -------- |
| Type | `string` |

## [mgr] {#mgr}

### `cwd` {#mgr.cwd}

CWD text style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `hovered` {#mgr.hovered}

Hovered file style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `preview_hovered` {#mgr.preview_hovered}

Hovered file style, in the preview pane.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `find_keyword` {#mgr.find_keyword}

Style of the highlighted portion in the filename.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `find_position` {#mgr.find_position}

Style of current file location in all found files to the right of the filename.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `marker_copied` {#mgr.marker_copied}

Copied file marker style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `marker_cut` {#mgr.marker_cut}

Cut file marker style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `marker_marked` {#mgr.marker_marked}

Marker style of pre-selected file in visual mode.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `marker_selected` {#mgr.marker_selected}

Selected file marker style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `count_copied` {#mgr.count_copied}

Style of copied file number.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `count_cut` {#mgr.count_cut}

Style of cut file number.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `count_selected` {#mgr.count_selected}

Style of selected file number.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `border_symbol` {#mgr.border_symbol}

Border symbol, e.g. `"│"`.

|      |          |
| ---- | -------- |
| Type | `string` |

### `border_style` {#mgr.border_style}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `syntect_theme` {#mgr.syntect_theme}

Code preview highlighting themes, which are paths to `.tmTheme` files. You can find them on GitHub [using "tmTheme" as a keyword](https://github.com/search?q=tmTheme&type=repositories)

For example, `"~/Downloads/Dracula.tmTheme"`, not available after using a flavor, as flavors always use their own tmTheme files `tmtheme.xml`.

|      |          |
| ---- | -------- |
| Type | `string` |

## [tabs] {#tabs}

<details>
	<summary>Explanation of `active` and `inactive`</summary>
	<img src="/webp/tabs-active-explain.webp" loading="lazy" />
</details>

### `active` {#tabs.active}

Active tab style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `inactive` {#tabs.inactive}

Inactive tab style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `sep_inner` {#tabs.sep_inner}

Inner separator symbol, e.g. `{ open = "[", close = "]" }`.

|      |                                   |
| ---- | --------------------------------- |
| Type | `{ open: string, close: string }` |

### `sep_outer` {#tabs.sep_outer}

Outer separator symbol, e.g. `{ open = "", close = "" }`.

|      |                                   |
| ---- | --------------------------------- |
| Type | `{ open: string, close: string }` |

## [mode] {#mode}

### `normal_main` {#mode.normal_main}

Normal mode main style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `normal_alt` {#mode.normal_alt}

Normal mode alternative style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `select_main` {#mode.select_main}

Select mode main style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `select_alt` {#mode.select_alt}

Select mode alternative style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `unset_main` {#mode.unset_main}

Unset mode main style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `unset_alt` {#mode.unset_alt}

Unset mode alternative style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [status] {#status}

<details>
	<summary>Explanation of `sep_left` and `sep_right`</summary>
	<img src="/webp/status-sep-explain.webp" loading="lazy" />
</details>

### `overall` {#status.overall}

Overall status bar style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `sep_left` {#status.sep_left}

Left separator symbol, e.g. `{ open = "", close = "]" }`.

|      |                                   |
| ---- | --------------------------------- |
| Type | `{ open: string, close: string }` |

### `sep_right` {#status.sep_right}

Right separator symbol, e.g. `{ open = "[", close = "" }`.

|      |                                   |
| ---- | --------------------------------- |
| Type | `{ open: string, close: string }` |

### `perm_type` {#status.perm_type}

Style of the file type symbol, such as `d` for directory, `-` for file, `l` for symlink, etc.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `perm_read` {#status.perm_read}

Style of the read permission symbol (`r`).

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `perm_write` {#status.perm_write}

Style of the write permission symbol (`w`).

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `perm_exec` {#status.perm_exec}

Style of the execute permission symbol (`x`).

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `perm_sep` {#status.perm_sep}

Style of the permission separator symbol (`-`).

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `progress_label` {#status.progress_label}

Progress label style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `progress_normal` {#status.progress_normal}

Style of the progress bar when it is not in an error state.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `progress_error` {#status.progress_error}

Style of the progress bar when an error occurs.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [which] {#which}

### `cols` {#which.cols}

Number of columns.

|      |                   |
| ---- | ----------------- |
| Type | `1` \| `2` \| `3` |

### `mask` {#which.mask}

Mask style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `cand` {#which.cand}

Candidate key style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `rest` {#which.rest}

Rest key style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `desc` {#which.desc}

Description style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `separator` {#which.separator}

Separator symbol, e.g. `" -> "`.

|      |          |
| ---- | -------- |
| Type | `string` |

### `separator_style` {#which.separator_style}

Separator style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [confirm] {#confirm}

### `border` {#confirm.border}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `title` {#confirm.title}

Title style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `content` {#confirm.content}

Content style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `list` {#confirm.list}

List style, which is the style of the list of items below the content.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `btn_yes` {#confirm.btn_yes}

The style of the yes button.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `btn_no` {#confirm.btn_no}

The style of the no button.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `btn_labels` {#confirm.btn_labels}

Labels for the yes and no buttons.

The first string is the label for the yes button and the second is the label for the no button.

|      |                    |
| ---- | ------------------ |
| Type | `[string, string]` |

## [spot] {#spot}

<details>
	<summary>Explanation of `tbl_col` and `tbl_cell`</summary>
	<img src="/webp/spot-tbl-explain.webp" loading="lazy" />
</details>

### `border` {#spot.border}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `title` {#spot.title}

Title style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `tbl_col` {#spot.tbl_col}

The style of the selected column in the table.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `tbl_cell` {#spot.tbl_cell}

The style of the selected cell in the table.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [notify] {#notify}

### `title_info` {#notify.title_info}

Style of the info title.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `title_warn` {#notify.title_warn}

Style of the warning title.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `title_error` {#notify.title_error}

Style of the error title.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [pick] {#pick}

### `border` {#pick.border}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `active` {#pick.active}

Selected item style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `inactive` {#pick.inactive}

Unselected item style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [input] {#input}

### `border` {#input.border}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `title` {#input.title}

Title style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `value` {#input.value}

Value style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `selected` {#input.selected}

Selected value style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [cmp] {#cmp}

### `border` {#cmp.border}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `active` {#cmp.active}

Selected item style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `inactive` {#cmp.inactive}

Unselected item style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `icon_file` {#cmp.icon_file}

File icon.

|      |          |
| ---- | -------- |
| Type | `string` |

### `icon_folder` {#cmp.icon_folder}

Folder icon.

|      |          |
| ---- | -------- |
| Type | `string` |

### `icon_command` {#cmp.icon_command}

Command icon.

|      |          |
| ---- | -------- |
| Type | `string` |

## [tasks] {#tasks}

### `border` {#tasks.border}

Border style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `title` {#tasks.title}

Title style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `hovered` {#tasks.hovered}

Hovered item style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

## [help] {#help}

### `on` {#help.on}

Key column style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `run` {#help.run}

Command column style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `desc` {#help.desc}

Description column style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `hovered` {#help.hovered}

Hovered item style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `footer` {#help.footer}

Footer style.

|      |                         |
| ---- | ----------------------- |
| Type | [`Style`](#types.style) |

### `icon_info` {#help.icon_info}

Info icon.

|      |          |
| ---- | -------- |
| Type | `string` |

### `icon_warn` {#help.icon_warn}

Warning icon.

|      |          |
| ---- | -------- |
| Type | `string` |

### `icon_error` {#help.icon_error}

Error icon.

|      |          |
| ---- | -------- |
| Type | `string` |

## [filetype] {#filetype}

Set file list item display styles for specific file types, supporting matching by name and mime-type:

```toml
[filetype]
rules = [
	# Images
	{ mime = "image/*", fg = "yellow" },

	# Videos
	{ mime = "video/*", fg = "magenta" },
	{ mime = "audio/*", fg = "magenta" },

	# Empty files
	{ mime = "inode/empty", fg = "cyan" },

	# Orphan symbolic links
	{ name = "*", is = "orphan", fg = "red" },

	# ...

	# Fallback
	# { name = "*", fg = "white" },
	{ name = "*/", fg = "blue" }
]
```

Each rule supports complete [Style properties](#types.style). There are two special rule:

- `name = "*"` matches all files.
- `name = "*/"` matches all directories.

You can restrict the specific type of files through `is`, noting that it must be used with either `name` or `mime`. It accepts the following values:

- `block`: Block device
- `char`: Char device
- `exec`: Executable
- `fifo`: FIFO
- `link`: Symbolic link
- `orphan`: Orphan symbolic link
- `sock`: Socket
- `sticky`: File with sticky bit set

## [icon] {#icon}

Yazi has builtin support for [nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons), a rich set of icons ready to use.
If you want to add your own rules to this set, you can use `prepend_*` and `append_*` to prepend or append rules to the default ones (see [Configuration Mixing](/docs/configuration/overview#mixing) for details):

```toml
[icon]
prepend_dirs = [
	{ name = "desktop", text = "", fg = "#563d7c" },
	# ...
]
append_exts = [
	{ name = "mp3", text = "", fg = "#00afff" },
	# ...
]
# ...
```

If you want to completely override the default rules, you can do so with:

```toml
[icon]
dirs = [
	{ name = "desktop", text = "", fg = "#563d7c" },
	# ...
]
exts = [
	{ name = "mp3", text = "", fg = "#00afff" },
	# ...
]
# ...
```

Each icon rule contains the following properties:

- `name` (globs, dirs, files, exts), or `if` (conds): the rule itself, which is a string
- `text`: icon text, which is a string
- `fg`: icon color, which is a [Color](/docs/configuration/theme#types.color)

Icons are matched according to the following priority:

1. globs: glob expressions, e.g., `{ name = "**/Downloads/*.zip", ... }`
2. dirs: directory names, e.g., `{ name = "Desktop", ... }`
3. files: file names, e.g., `{ name = ".bashrc", ... }`
4. exts: extensions, e.g., `{ name = "mp3", ... }`
5. conds: conditions, e.g., `{ if = "!dir", ... }`

`dirs`, `files`, and `exts` are compiled into a HashMap at startup, offering O(1) time complexity for very fast lookups, which should meet most needs.

For more complex and precise rules, such as matching a specific file in a specific directory, use `globs` - these are always executed first to check if any rules in the glob set are met.
However, they are much slower than `dirs`, `files`, and `exts`, so it's not recommended to use them excessively.

If none of the above rules match, it will fall back to `conds` to check if any specific conditions are met. `conds` are mostly used for rules related to file metadata, which includes the following conditional factors:

- `dir`: The file is a directory
- `hidden`: The file is hidden
- `link`: The file is a symbolic link
- `orphan`: The file is an orphan (broken symbolic link)
- `dummy`: The file is dummy (failed to load complete metadata, possibly the filesystem doesn't support it, such as FUSE)
- `block`: The file is a block device
- `char`: The file is a char device
- `fifo`: The file is a FIFO
- `sock`: The file is a socket
- `exec`: The file is executable
- `sticky`: The file has the sticky bit set

These conditions support basic `|` (or), `&` (and), `!` (not), and `()` for priority, so you can combine them as needed, for example:

```toml
[icon]
prepend_conds = [
	{ if = "hidden & dir",  text = "👻" },  # Hidden directories
	{ if = "dir",           text = "📁" },  # Directories
	{ if = "!(dir | link)", text = "📄" },  # Normal files (not directories or symlinks)
]
```
