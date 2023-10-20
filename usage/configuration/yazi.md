---
sidebar_position: 1
description: Learn how to configure Yazi's basic functionality.
---

# Yazi

:::tip
If you haven't created and used your own configuration file yet, please see [Configuration](./overview.mdx).
:::

## manager

- layout: Manager layout by ratio, 3-element array

  - `[1, 4, 3]`: 1/8 width for parent, 4/8 width for current, 3/8 width for preview

- sort_by: File sorting method

  - `"none"`: Don't sort
  - `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
  - `"created"`: Sort by creation time
  - `"modified"`: Sort by last modified time
  - `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
  - `"size"`: Sort by file size

- sort_sensitive: Sort case-sensitively

  - `true`: Case-sensitive
  - `false`: Case-insensitive

- sort_reverse: Display files in reverse order

  - `true`: Reverse order
  - `false`: Normal order

- sort_dir_first: Display directories first

  - `true`: Directories first
  - `false`: Respects `sort_by` and `sort_reverse` only

- linemode: Line mode

  - `none`: No line mode.
  - `size`: Display the size of the file.
  - `permissions`: Display the permissions of the file.
  - `mtime`: Display the last modified time of the file.

- show_hidden: Show hidden files

  - `true`: Show
  - `false`: Do not show

- show_symlink: Show the path of the symlink file point to, after the filename

  - `true`: Show
  - `false`: Do not show

## preview

- tab_size: Tab width
- max_width: Maximum preview width for images. Do a `yazi --clear-cache` to take effect after changing this.
- max_height: Maximum preview height for images. Do a `yazi --clear-cache` to take effect after changing this.
- cache_dir: The system cache directory is used by default, and the cached files will go away on a reboot automatically. If you want to make it more persistent, you can specify the cache directory manually as an absolute path.

## opener

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
  - `$n` (Unix) / `%n` (Windows): The N-th selected file, starting from 1
  - `$@` (Unix) / `%*` (Windows): All selected files
  - `foo`: Literal string to be passed
- block (Boolean): Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs.
- orphan (Boolean): Keep the process running even if Yazi has exited.
- desc: Description of the opener, displayed in the selection menu.
- for: Optional. This opener is only available on this system; when not specified, it's available on all systems. Available values:
  - `unix`: Linux and macOS
  - `windows`: Windows
  - `linux`: Linux
  - `macos`: macOS

## open

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
- mime (String): Glob expression for matching the MIME type. Case insensitive by default, add `\s` to the beginning to make it sensitive.
- use (String): Opener name corresponding to the names in the opener section.

## tasks

- micro_workers: Maximum number of concurrent micro-tasks
- macro_workers: Maximum number of concurrent macro-tasks
- bizarre_retry: Maximum number of retries when a bizarre failure occurs
