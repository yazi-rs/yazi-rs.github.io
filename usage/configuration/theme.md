---
sidebar_position: 3
description: Learn how to configure your Yazi theme.
---

# Theme

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

- Style: Appears in a format similar to `{ fg = "#e4e4e4", bg = "black", ... }`, and supports the following options:
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

// TODO

## Input

// TODO

## Select

// TODO

## Tasks

// TODO

## Which

// TODO

## Help

// TODO

## Filetype

// TODO

## Icons

// TODO
