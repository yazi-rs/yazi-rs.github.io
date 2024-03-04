---
sidebar_position: 1
description: Learn how to configure Yazi's basic functionality.
---

# yazi.toml

:::note
If you haven't created and used your own configuration file yet, please see [Configuration](./overview.md).
:::

## [manager]

### `ratio`

Manager layout by ratio, 3-element array.

- `[1, 4, 3]`: 1/8 width for parent, 4/8 width for current, 3/8 width for preview

### `sort_by`

File sorting method.

- `"none"`: Don't sort.
- `"modified"`: Sort by last modified time.
- `"created"`: Sort by creation time. (Due to a Rust bug, this is not available at the moment, see [sxyazi/yazi#356](https://github.com/sxyazi/yazi/issues/356) and [rust-lang/rust#108277](https://github.com/rust-lang/rust/issues/108277))
- `"extension"`: Sort by file extension.
- `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
- `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
- `"size"`: Sort by file size.

### `sort_sensitive`

Sort case-sensitively.

- `true`: Case-sensitive
- `false`: Case-insensitive

### `sort_reverse`

Display files in reverse order.

- `true`: Reverse order
- `false`: Normal order

### `sort_dir_first`

Display directories first.

- `true`: Directories first
- `false`: Respects `sort_by` and `sort_reverse` only

### `linemode`

Line mode: display information associated with the file on the right side of the file list row.

- `"none"`: No line mode.
- `"size"`: Display the size of the file.
- `"permissions"`: Display the permissions of the file.
- `"mtime"`: Display the last modified time of the file.

In addition, you can also specify any 1 to 20 characters, and extend it within a UI plugin.
Which means you can implement your own linemode through the plugin by simply overriding the [`Folder:linemode` method](https://github.com/sxyazi/yazi/blob/latest/yazi-plugin/preset/components/folder.lua).

### `show_hidden`

Show hidden files.

- `true`: Show
- `false`: Do not show

### `show_symlink`

Show the path of the symlink file point to, after the filename.

- `true`: Show
- `false`: Do not show

### `scrolloff`

The number of files to keep above and below the cursor when moving through the file list.

If the value is larger than half the screen height (e.g. `200`), the cursor will be centered.

## [preview]

### `tab_size`

Tab width.

### `max_width`

Maximum preview width for images. Do a `yazi --clear-cache` to take effect after changing this.

### `max_height`

Maximum preview height for images. Do a `yazi --clear-cache` to take effect after changing this.

### `cache_dir`

The system cache directory is used by default, and the cached files will go away on a reboot automatically.

If you want to make it more persistent, you can specify the cache directory manually as an absolute path.

### `image_filter`

The filter used on image downscaling, available values:

- `"nearest"` - Nearest Neighbor
- `"triangle"` - Linear Triangle
- `"catmull-rom"` - Catmull-Rom
- `"lanczos3"` - Lanczos with window 3

They are arranged in order from fast to slow, and from poor to good quality - Lanczos3 provides the highest quality but is also the slowest.

See the example and benchmark here: https://docs.rs/image/0.24.8/image/imageops/enum.FilterType.html#examples

### `image_quality`

Quality on pre-caching images, range 50-90.

The larger value, the better image quality, but slower with more CPU consumption, and generates larger cache files that occupy more storage space.

### `sixel_fraction`

Sixel is a very old image format that only supports 256 colors. For better image preview, Yazi trains a neural network for each image to find the most representative colors.

This value determines the number of samples used during the training, range 10-20. A smaller value produces better results but is also slower.

### Ueberzug-specific

- ueberzug_scale (Float): Ueberzug image scaling ratio, `scale>1` for enlargement, `scale<1` for reduction. For example, `0.5` indicates a reduction to half.
- ueberzug_offset (`[x, y, width, height]`): Ueberzug image offset, in cell units. For example, `[0.5, 0.5, -0.5, -0.5]` indicates that the image is offset by half a cell in both directions, and the width and height are reduced by half a cell.

This is useful for solving [the bug of Ueberzug image size calculation](https://github.com/jstkdng/ueberzugpp/issues/122).

If your monitor has a `2.0` scale factor, and is running on Wayland under Hyprland, you may need to set `ueberzug_scale: 0.5`, and adjust the value of `ueberzug_offset` according to your case, to offset this issue.

## [opener]

Configure available openers, for example:

```toml
[opener]
archive = [
	{ exec = 'unar "$1"', desc = "Extract here" },
]
text = [
	{ exec = 'nvim "$@"', block = true },
]
# ...
```

Available parameters are as follows:

- exec: The command to open the selected files, with the following variables available:
  - `$n` (Unix) / `%n` (Windows): The N-th selected file, starting from `1`. e.g. `$2` represents the second selected file.
  - `$@` (Unix) / `%*` (Windows): All selected files.
- block (Boolean): Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs.
- orphan (Boolean): Keep the process running even if Yazi has exited.
- desc: Description of the opener, displayed in the selection menu.
- for: Optional. This opener is only available on this system; when not specified, it's available on all systems. Available values:
  - `unix`: Linux and macOS
  - `windows`: Windows
  - `linux`: Linux
  - `macos`: macOS

## [open]

Set rules for opening specific files, for example:

```toml
[open]
rules = [
	{ mime = "text/*", use = "text" },
	{ mime = "image/*", use = "image" },

	# { mime = "application/json", use = "text" },
	{ name = "*.json", use = "text" },

	# Multiple openers for a single rule
	{ name = "*.html", use = [ "browser", "text" ] },
]
```

Available rule parameters are as follows:

- name (String): Glob expression for matching the file name. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- mime (String): Glob expression for matching the mime-type. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- use (String): Opener name corresponding to the names in the [`[opener]` section](#opener).

## [tasks]

### `micro_workers`

Maximum number of concurrent micro-tasks.

### `macro_workers`

Maximum number of concurrent macro-tasks.

### `bizarre_retry`

Maximum number of retries when a bizarre failure occurs.

### `suppress_preload`

Exclude the preload tasks created by the system from the task list, do not report their progress, and do not consider them on app exit confirming.

### `image_alloc`

Maximum memory allocation limit in bytes for decoding a single image, `0` for unlimited.

### `image_bound`

An array of `[width, height]`, maximum image size (in pixels) for decoding a single image, and `0` for unlimited.

## [plugin]

### previewers

You can prepend or append new preview rules to the default `previewers` under `[plugin]` by `prepend_previewers` and `append_previewers`, see [Configuration mixing](/docs/configuration/overview#configuration-mixing) for details.
Here are the available options for a single rule:

- `name` (String): Glob expression for matching the file name. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- `mime` (String): Glob expression for matching the mime-type. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- `exec` (String): The name of the Lua plugin to be executed.
- `sync` (Boolean): Whether to execute in the sync context, default is `false`.

```toml
[plugin]
prepend_previewers = [
	# HEIC previewer
	{ mime = "image/heic", exec = "heic" },
]

append_previewers = [
	# My fallback previewer
	{ name = "*" , exec = "binary" },
]
```

If your `append_rules` contains wildcard `name` rules (`"*"` or `"*/"`), they will always take precedence over the default wildcard rules as the fallback.

Yazi comes with the these previewer plugins:

- folder: bridge between the Yazi file system and the preview
- code: bridge between built-in code highlighting and the preview, providing async concurrent rendering
- json: bridge between `jq` and the preview, providing async concurrent rendering
- noop: no operation
- image: presentation layer of built-in image preview, offering mixed preview capabilities
- video: bridge between `ffmpegthumbnailer` and the preview, offering mixed preview capabilities
- pdf: bridge between `pdftoppm` and the preview, offering mixed preview capabilities
- archive: bridge between `unar` and the preview, offering mixed preview and concurrent rendering capabilities

If you want to create your own previewer, see [Previewer API](../plugins/overview#previewer).

### preloaders

You can prepend or append new preview rules to the default `preloaders` under `[plugin]` by `prepend_preloaders` and `append_preloaders`, see [Configuration mixing](/docs/configuration/overview#configuration-mixing) for details.
Here are the available options for a single rule:

- `name` (String): Glob expression for matching the file name. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- `mime` (String): Glob expression for matching the mime-type. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- `cond` (String): Conditional expression – Only rules that meet this condition and satisfy either the `name` or `mime` will be applied. For example, `A & B` means A and B, and `A | !B` means A or not B. Here are the available factors:
  - `mime`: This file has a mime-type
- `exec` (String): The name of the Lua plugin to be executed
- `multi` (Boolean): Whether to preload multiple files at once
- `prio` (String): Preload priority, `low`, `normal` or `high`. The default is `normal` if not specified.

```toml
[plugin]
prepend_preloaders = [
	# HEIC preloader
	{ mime = "image/heic", exec = "heic" },
]
```

Yazi comes with the these preloader plugins:

- mime: preloads mime-type of files in chunks
- noop: no operation
- image: preloads and caches images
- video: preloads and caches videos
- pdf: preloads and caches PDFs.

If you want to create your own preloader, see [Preloader API](../plugins/overview#preloader).

## [input]

You can customize the title and position of each input. As for position, it consists of two parts: [Origin](#origin) and [Offset](#offset).

The origin is the top-left corner of the input, and the offset is the increment from this origin. Together, they determine the area of the input on the screen.

### Origin

For the origin, the following values are available:

- top-left
- top-center
- top-right
- bottom-left
- bottom-center
- bottom-right
- center
- hovered (the cursor position of hovered file)

### Offset

As for the offset, it's a 4-element tuple: `(x, y, width, height)`.

### Placeholder

Some inputs have special placeholders that will be replaced with actual content on display:

- trash_title: String

  - `{n}`: Number of files to be trashed
  - `{s}`: `"s"` if `n > 1`, otherwise `""`

- delete_title: String

  - `{n}`: Number of files to be deleted
  - `{s}`: `"s"` if `n > 1`, otherwise `""`

- find_title: [String, String]

  It's a tuple of 2-element: first for "Find next", second for "Find previous".

- search_title: String

  - `{n}`: Name of the current search engine

- shell_title: [String, String]

  It's a tuple of 2-element: first for "Non-blocking shell", second for "Blocking shell".

- quit_title: String
  - `{n}`: Number of tasks are running
  - `{s}`: `"s"` if `n > 1`, otherwise `""`

## [select]

Same as [the input](#input).

## [which]

### `sort_by`

Candidate sorting method.

- `"none"`: Don't sort.
- `"key"`: Sort by key.
- `"desc`: Sort by description.

### `sort_sensitive`

Sort case-sensitively.

- `true`: Case-sensitive
- `false`: Case-insensitive

### `sort_reverse`

Display candidates in reverse order.

- `true`: Reverse order
- `false`: Normal order
