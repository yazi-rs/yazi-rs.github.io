---
sidebar_position: 3
description: Learn how to configure your Yazi theme.
---

# Theme

:::tip
If you're looking for ready-made themes and don't want to create one yourself, check out [yazi-rs/themes](https://github.com/yazi-rs/themes) repo.
:::

## Types

- Color: A color. It can be in Hex format with RGB values, such as `#484D66`. Or can be one of the following 17 values:

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

- Style: Appears in a format similar to `{ fg = "#e4e4e4", bg = "black", ... }`, and supports the following properties:
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

## Manager

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
- tab_width (Style): Tab maximum width. When set to a value greater than 2, the remaining space will be filled with the tab name, which is current directory name.

Border:

- border_symbol (String): Border symbol. e.g. `"│"`.
- border_style (Style): Border style.

Offset:

- folder_offset (`[top, right, bottom, left]`): Folder layout offset. e.g. `[ 1, 0, 1, 0 ]`.
- preview_offset (`[top, right, bottom, left]`): Preview layout offset. e.g. `[ 1, 1, 1, 1 ]`.

Highlighting: The built-in syntax highlighting feature

- syntect_theme (String): Theme file path. Since Yazi and `bat` use the same highlighter, so you can directly use bat's theme files, such as `~/.config/bat/themes/Catppuccino-mocha.tmTheme`.

## Status

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

## Select

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

## Input

- border (Style): Border style.
- title (Style): Title style.
- value (Style): Value style.
- selected (Style): Selected value style.

## Completion

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

Icons

- icon_file (String): File icon.
- icon_folder (String): Folder icon.
- icon_command (String): Command icon.

## Tasks

- border (Style): Border style.
- title (Style): Title style.
- hovered (Style): Hovered item style.

## Which

- mask (Style): Mask style.
- cand (Style): Candidate key style.
- rest (Style): Rest key style.
- desc (Style): Description style.
- separator (String): Separator symbol. e.g. `" -> "`.
- separator_style (Style): Separator style.

## Help

- on (Style): Key column style.
- exec (Style): Command column style.
- desc (Style): Description column style.
- hovered (Style): Hovered item style.
- footer (Style): Footer style.

## Filetype

Set file list item display styles for specific file types, supporting matching by name and mime-type:

```toml
[filetype]
rules = [
	# Images
	{ mime = "image/*", fg = "cyan" },

	# Videos
	{ mime = "video/*", fg = "yellow" },
	{ mime = "audio/*", fg = "yellow" },

	# ...

	# Fallback
	# { name = "*", fg = "white" },
	{ name = "*/", fg = "blue" }
]
```

Each rule supports complete [Style properties](#Types). There are two special rule:

- `name = "*"` matches all files.
- `name = "*/"` matches all directories.

## Icons

Display different icons based on file name rules, noting that the `/` after the name signifies that it must be a directory.

```toml
[icons]
"Desktop/" = ""
"*.rs"     = ""
# ...

# Default
"*"  = ""
"*/" = ""
```

Similarly, `*` and `*/` can be used for fallback matching all files and all directories.

The above rules use icons from [Nerd Fonts](https://www.nerdfonts.com), and they will not display properly if you don't have a Nerd Font installed.
