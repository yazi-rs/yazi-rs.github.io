---
sidebar_position: 3
description: Learn how to configure your Yazi theme.
---

# theme.toml

:::tip
If you're looking for ready-made themes and don't want to create one yourself, check out the [yazi-rs/flavors](https://github.com/yazi-rs/flavors) repository.
:::

## Types {#types}

### Color {#types.color}

A color. It can be in Hex format with RGB values, such as `#484D66`. Or can be one of the following 17 values:

- reset
- black
- white
- red
- lightred
- green
- lightgreen
- yellow
- lightyellow
- blue
- lightblue
- magenta
- lightmagenta
- cyan
- lightcyan
- gray
- darkgray

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

- use (String): Flavor name, e.g. `"Dracula"`. See [flavor documentation](/docs/flavors/overview) for more details.

## [manager] {#manager}

- cwd (Style): CWD text style.

Hovered:

- hovered (Style): Hovered file style.
- preview_hovered (Style): Hovered file style, in the preview pane.

Find: The `find` feature

- find_keyword (Style): Style of the highlighted portion in the filename.
- find_position (Style): Style of current file location in all found files to the right of the filename.

Marker: Color block on the left side separator line in the filename.

- marker_selected (Style): Selected file marker style.
- marker_copied (Style): Copied file marker style.
- marker_cut (Style): Cut file marker style.

Tab: Tab bar

- tab_active (Style): Active tab style.
- tab_inactive (Style): Inactive tab style.
- tab_width (Number): Tab maximum width. When set to a value greater than 2, the remaining space will be filled with the tab name, which is current directory name.

Border:

- border_symbol (String): Border symbol. e.g. `"│"`.
- border_style (Style): Border style.

Highlighting: The built-in syntax highlighting feature

- syntect_theme (String): For example, `"~/Downloads/Dracula.tmTheme"`. Only available in the user's `theme.toml` and cannot be used in [`flavor.toml`](/docs/flavors/overview).

  Yazi's builtin code highlighting themes, which are paths to `.tmTheme` files. You can find them on GitHub [using "tmTheme" as a keyword](https://github.com/search?q=tmTheme&type=repositories)

## [status] {#status}

- separator_open (String): Opening separator symbol. e.g. `"["`.
- separator_close (String): Closing separator symbol. e.g. `"]"`.
- separator_style (Style): Separator style.

Mode

- mode_normal (Style): Normal mode style.
- mode_select (Style): Select mode style.
- mode_unset (Style): Unset mode style.

Progress

- progress_label (Style): Progress label style.
- progress_normal (Style): Style of the progress bar when it is not in an error state.
- progress_error (Style): Style of the progress bar when an error occurs.

Permissions

- permissions_t (Style): File type.
- permissions_r (Style): Read permission.
- permissions_w (Style): Write permission.
- permissions_x (Style): Execute permission.
- permissions_s (Style): `-` separator.

## [select] {#select}

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

## [input] {#input}

- border (Style): Border style.
- title (Style): Title style.
- value (Style): Value style.
- selected (Style): Selected value style.

## [completion] {#completion}

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

Icons

- icon_file (String): File icon.
- icon_folder (String): Folder icon.
- icon_command (String): Command icon.

## [tasks] {#tasks}

- border (Style): Border style.
- title (Style): Title style.
- hovered (Style): Hovered item style.

## [which] {#which}

- cols (Number): Number of columns. The value can be `1`, `2`, `3`.
- mask (Style): Mask style.
- cand (Style): Candidate key style.
- rest (Style): Rest key style.
- desc (Style): Description style.
- separator (String): Separator symbol. e.g. `" -> "`.
- separator_style (Style): Separator style.

## [help] {#help}

- on (Style): Key column style.
- run (Style): Command column style.
- desc (Style): Description column style.
- hovered (Style): Hovered item style.
- footer (Style): Footer style.

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
	{ mime = "inode/x-empty", fg = "cyan" },

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

Display icon based on the first matched rule.

You can prepend or append rules to the default through `prepend_rules` and `append_rules`, see [Configuration mixing](/docs/configuration/overview#mixing) for details.

```toml
[icon]
prepend_rules = [
	{ name = "*.rs"    , text = "" },
	{ name = "Desktop/", text = "" },
	# ...

	# Icon with a color
	{ name = "*.lua", text = "", fg = "#51a0cf" },

	# You can also use `is` rule, just like `[filetype]` section
	# Orphan symbolic links
	{ name = "*", is = "orphan", text = "" },
]

append_rules = [
	# My fallback icons
	{ name = "*" , text = "" },
	{ name = "*/", text = "" },
]
```

Or, use `rules` to rewrite the entire default rules:

```toml
[icon]
rules = [
	# ...Some rules
]
```

End with `/` for directories, so wildcard rule (`*` or `*/`) can be used for fallback matching all files or directories.

If your `append_rules` contains wildcard rules, they will always take precedence over the default wildcard rules as the fallback.
