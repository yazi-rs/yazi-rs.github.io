---
sidebar_position: 2
description: Learn how to configure keyboard shortcuts with Yazi.
---

import Default, {Defaults, DefaultWithProp} from "@site/src/components/Default";
import KeymapArrow from './keymap-arrow.md'

# keymap.toml

:::info
If you want to fine-tune the default settings, the first step is to [create your own configuration file](/docs/configuration/overview).
:::

You can change Yazi's keybindings in your `keymap.toml` file, which consists of the following 8 layers:

- [\[mgr\]](#mgr) - File list.
- [\[tasks\]](#tasks) - Task manager.
- [\[spot\]](#spot) - File information spotter.
- [\[pick\]](#pick) - Pick component. e.g. "open with" for files.
- [\[input\]](#input) - Input component. e.g. create, rename, etc.
- [\[confirm\]](#confirm) - Confirmation dialog. e.g. remove, overwrite, etc.
- [\[cmp\]](#cmp) - Completion component. e.g. "cd" URL completion.
- [\[help\]](#help) - Help menu.

In each layer, there are two attributes: `prepend_keymap` and `append_keymap`.
Prepend inserts before [the default keybindings](https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap-default.toml), while append inserts after them.

Since Yazi selects the first matching key to run, prepend always has a higher priority than default, and append always has a lower priority than default:

```toml
[mgr]
prepend_keymap = [
	{ on = "<C-a>", run = "act1", desc = "Single action with `Ctrl + a`" },
]
append_keymap = [
	{ on = [ "g", "b" ], run = "act2",             desc = "Single action with `g ⇒ b`" },
	{ on = "c",          run = [ "act1", "act2" ], desc = "Multiple actions with `c`" }
]
```

Or in another different style:

```toml
[[mgr.prepend_keymap]]
on   = "<C-a>"
run  = "act1"
desc = "Single action with `Ctrl + a`"

[[mgr.append_keymap]]
on  = [ "g", "b" ]
run = "act2"
desc = "Single action with `g ⇒ b`"

[[mgr.append_keymap]]
on  = "c"
run = [ "act1", "act2" ]
desc = "Multiple actions with `c`"
```

But keep in mind that you can only choose one of them, and it cannot be a combination of the two, as TOML language does not allow this:

```toml
[mgr]
prepend_keymap = [
	{ on = "<C-a>", run = "act1" },
]

[[mgr.append_keymap]]
on  = [ "g", "b" ]
run = "act2"
```

When you don't need any default and want to fully customize your keybindings, use `keymap`, for example:

```toml
[mgr]
keymap = [
	# This will override all default keybindings, and just keep the two below.
	{ on = "<C-a>",      run = "act1" },
	{ on = [ "g", "b" ], run = "act2" },
]
```

## Key notation {#notation}

You can specify one or more keys in the `on` of each keybinding rule, and each key can be represented with the following notations:

| Notation         | Description       | Notation      | Description       |
| ---------------- | ----------------- | ------------- | ----------------- |
| `a` - `z`        | Lowercase letters | `A` - `Z`     | Uppercase letters |
| `<Space>`        | Space key         | `<Backspace>` | Backspace key     |
| `<Enter>`        | Enter key         | -             | -                 |
| `<Left>`         | Left arrow key    | `<Right>`     | Right arrow key   |
| `<Up>`           | Up arrow key      | `<Down>`      | Down arrow key    |
| `<Home>`         | Home key          | `<End>`       | End key           |
| `<PageUp>`       | PageUp key        | `<PageDown>`  | PageDown key      |
| `<Tab>`          | Tab key           | `<BackTab>`   | Shift + Tab key   |
| `<Delete>`       | Delete key        | `<Insert>`    | Insert key        |
| `<F1>` - `<F19>` | Function keys     | `<Esc>`       | Escape key        |

You can combine the following modifiers for the keys above:

| Modifier | Description                |
| -------- | -------------------------- |
| `<S-…>`  | Shift key.                 |
| `<C-…>`  | Ctrl key.                  |
| `<A-…>`  | Alt/Meta key.              |
| `<D-…>`  | Command/Windows/Super key. |

For example:

- `<C-a>` for <kbd>Ctrl</kbd> + <kbd>a</kbd>.
- `<C-S-b>` or `<C-B>` for <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>b</kbd>.

Note that:

1. Not all terminals support `<D-...>` - make sure your terminal supports and has [CSI u][CSI u] enabled if you want to use it.
2. macOS doesn't have an <kbd>Alt</kbd> key, so `<A-...>` won't work. Some terminals offer a setting to map the <kbd>Option</kbd> as the <kbd>Alt</kbd> key, make sure you have it enabled.
3. The [legacy terminal keyboard protocol][Control character] treats `<Tab>` and `<C-i>`, `<Enter>` and `<C-m>`, etc. as the same key. If you want to distinguish between them, make sure your terminal supports and has [CSI u][CSI u] enabled.

[CSI u]: https://sw.kovidgoyal.net/kitty/keyboard-protocol/
[Control character]: https://en.wikipedia.org/wiki/Control_character

## Per-OS keybindings {#per-os}

You can use `for` to limit a keybinding to a specific OS; if not specified, the keybinding is available on all systems. Available values:

- `"linux"`: Linux
- `"macos"`: macOS
- `"windows"`: Windows
- `"android"`: Android (Termux)
- `"unix"`: Linux, macOS, and Android

For example:

```toml
[mgr]
prepend_keymap = [
	{ on = [ "g", "d" ], run = "cd ~/dev",  desc = "Go dev",    for = "unix" },
	{ on = [ "g", "d" ], run = 'cd C:\dev', desc = 'Go C:\dev', for = "windows" },
]
```

## [mgr] {#mgr}

### `escape` {#mgr.escape}

Cancel find, exit visual mode, clear selected, cancel filter, or cancel search.

| Argument/Option | Description       |
| --------------- | ----------------- |
| `--all`         | Do all the below. |
| `--find`        | Cancel find.      |
| `--visual`      | Exit visual mode. |
| `--select`      | Clear selected.   |
| `--filter`      | Cancel filter.    |
| `--search`      | Cancel search.    |

Automatically determine the operation by default, and it will only execute the selected operation after specifying the option; multiple options can be stacked.

<DefaultWithProp id="mgr.keymap" prop="run" value="escape"/>

### `quit` {#mgr.quit}

Exit the process.

| Argument/Option | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| `--code=[n]`    | Exit code.                                                                     |
| `--no-cwd-file` | Don't output the current directory to the file specified by `yazi --cwd-file`. |

<DefaultWithProp id="mgr.keymap" prop="run" value="quit"/>

### `close` {#mgr.close}

Close the current tab; if it's the last tab, exit the process instead.

| Argument/Option | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| `--code=[n]`    | Exit code used when exiting.                                                           |
| `--no-cwd-file` | Don't output the current directory to the file specified by `yazi --cwd-file` on exit. |

<DefaultWithProp id="mgr.keymap" prop="run" value="close"/>

### `suspend` {#mgr.suspend}

Pauses Yazi and returns to the parent shell to continue with other tasks.

Once those tasks are done, use the `fg` command of the shell to send a resume signal and return back to Yazi.

<DefaultWithProp id="mgr.keymap" prop="run" value="suspend"/>

### `arrow` {#mgr.arrow}

<KeymapArrow />

<DefaultWithProp id="mgr.keymap" prop="run" value="arrow"/>

### `leave` {#mgr.leave}

Go back to the parent directory of the hovered file, or the parent of the current working directory if no file is hovered on.

<DefaultWithProp id="mgr.keymap" prop="run" value="leave"/>

### `enter` {#mgr.enter}

Enter the child directory.

<DefaultWithProp id="mgr.keymap" prop="run" value="enter"/>

### `back` {#mgr.back}

Go back to the previous directory.

<DefaultWithProp id="mgr.keymap" prop="run" value="back"/>

### `forward` {#mgr.forward}

Go forward to the next directory.

<DefaultWithProp id="mgr.keymap" prop="run" value="forward"/>

### `seek` {#mgr.seek}

Scroll the contents in the preview panel.

| Argument/Option | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `[n]`           | Use negative values to seek up and positive values to seek down. |

<DefaultWithProp id="mgr.keymap" prop="run" value="seek"/>

### `spot` {#mgr.spot}

Display file information with the preset or user-customized spotter.

<DefaultWithProp id="mgr.keymap" prop="run" value="spot"/>

### `cd` {#mgr.cd}

Change the current directory.

| Argument/Option | Description                             |
| --------------- | --------------------------------------- |
| `[url]`         | The URL to change to.                   |
| `--interactive` | Use an interactive UI to input the URL. |

You can add your own `g` series keys to achieve a simple bookmark feature:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "d" ]
run  = "cd ~/Downloads"
desc = "Cd to ~/Downloads"

[[mgr.prepend_keymap]]
on   = [ "g", "p" ]
run  = "cd ~/Pictures"
desc = "Cd to ~/Pictures"
```

For Windows users, you can also switch drives using the `cd` action:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "d" ]
run  = "cd D:"
desc = "Switch to D drive"

[[mgr.prepend_keymap]]
on   = [ "g", "p" ]
run  = 'cd "E:\\Pictures"'  # We need to escape the backslash
desc = 'Cd to E:\Pictures'
```

Check out the [resources page](/docs/resources) for a more comprehensive bookmark plugin.

<DefaultWithProp id="mgr.keymap" prop="run" value="cd"/>

### `follow` {#mgr.follow}

Follow the hovered file if it's a symbolic link.

<DefaultWithProp id="mgr.keymap" prop="run" value="follow"/>

### `reveal` {#mgr.reveal}

Hover over the specified file.

If the file is not in the current directory, it will change the current directory to the file's parent.

| Argument/Option | Description        |
| --------------- | ------------------ |
| `[url]`         | The URL to reveal. |

<DefaultWithProp id="mgr.keymap" prop="run" value="reveal"/>

### `toggle` {#mgr.toggle}

Toggle the selection state of the hovered file.

| Argument/Option | Description            |
| --------------- | ---------------------- |
| N/A             | Reverse the selection. |
| `--state=on`    | Select the file.       |
| `--state=off`   | Deselect the file.     |

<DefaultWithProp id="mgr.keymap" prop="run" regex="^toggle[^_]"/>

### `toggle_all` {#mgr.toggle_all}

Toggle the selection state of all files in the current working directory.

| Argument/Option | Description             |
| --------------- | ----------------------- |
| N/A             | Reverse the selections. |
| `--state=on`    | Select the files.       |
| `--state=off`   | Deselect the files.     |

Note that `toggle_all --state=off` only deselect the files in CWD, if you have selected files across multiple directories, and want to deselect all of them, use [`escape --select`](#mgr.escape).

<DefaultWithProp id="mgr.keymap" prop="run" value="toggle_all"/>

### `visual_mode` {#mgr.visual_mode}

Enter visual mode.

| Argument/Option | Description     |
| --------------- | --------------- |
| N/A             | Selection mode. |
| `--unset`       | Unset mode.     |

<DefaultWithProp id="mgr.keymap" prop="run" value="visual_mode"/>

### `open` {#mgr.open}

Open the selected files using [the rules in `[open]`](/docs/configuration/yazi#open).

| Argument/Option | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| `--interactive` | Open the hovered/selected file(s) with an interactive UI to choose the opening method. |
| `--hovered`     | Always open the hovered file regardless of the selection state.                        |

<DefaultWithProp id="mgr.keymap" prop="run" value="open"/>

### `yank` {#mgr.yank}

Yank the selected files.

| Argument/Option | Description |
| --------------- | ----------- |
| N/A             | Copy mode.  |
| `--cut`         | Cut mode.   |

<DefaultWithProp id="mgr.keymap" prop="run" regex="^yank"/>

### `unyank` {#mgr.unyank}

Cancel the yank status of files.

<DefaultWithProp id="mgr.keymap" prop="run" value="^unyank"/>

### `paste` {#mgr.paste}

Paste the yanked files.

| Argument/Option | Description                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `--force`       | Overwrite the destination file if it exists.                                                                 |
| `--follow`      | Copy the file pointed to by the symbolic link, rather than the link itself. Only can be used during copying. |

<DefaultWithProp id="mgr.keymap" prop="run" value="paste"/>

### `link` {#mgr.link}

Create a symbolic link to the yanked files. (This is a privileged action on Windows and must be run as an administrator.)

| Argument/Option | Description                                  |
| --------------- | -------------------------------------------- |
| `--relative`    | Use a relative path for the symbolic link.   |
| `--force`       | Overwrite the destination file if it exists. |

<DefaultWithProp id="mgr.keymap" prop="run" regex="^link"/>

### `hardlink` {#mgr.hardlink}

Hardlink the yanked files.

| Argument/Option | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `--force`       | Overwrite the destination file if it exists.                             |
| `--follow`      | Hardlink the file pointed to by a symbolic link, not the symlink itself. |

<DefaultWithProp id="mgr.keymap" prop="run" value="hardlink"/>

### `remove` {#mgr.remove}

Move the files to the trash/recycle bin on macOS/Windows. For Linux, it follows the [FreeDesktop.org Trash Specification](https://specifications.freedesktop.org/trash/latest/).

In the Android platform, you can only use it with the `--permanently` option, since there lacks the concept of a trash bin.

| Argument/Option | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `--force`       | Don't show the confirmation dialog, and trash/delete files directly. |
| `--permanently` | Permanently delete the files.                                        |
| `--hovered`     | Always remove the hovered file regardless of the selection state.    |

<DefaultWithProp id="mgr.keymap" prop="run" value="remove"/>

### `create` {#mgr.create}

Create a file or directory. Ends with `/` (Unix) or `\` (Windows) for directories.

| Argument/Option | Description                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `--dir`         | Always create directories, regardless of whether end with `/` or `\`.                          |
| `--force`       | Overwrite the destination file directly if it exists, without showing the confirmation dialog. |

<DefaultWithProp id="mgr.keymap" prop="run" regex="^create"/>

### `rename` {#mgr.rename}

Rename a file or directory, or bulk rename if multiple files are selected (`$EDITOR` is used to edit the filenames by default, see [Specify a different editor for bulk renaming](/docs/tips#bulk-editor) for details).

- `--hovered`: Always rename the hovered file regardless of the selection state.
- `--force`: Overwrite the destination file directly if it exists, without showing the confirmation dialog.
- `--empty`: Empty a part of the filename.
  - `"stem"`: Empty the stem. e.g. `"foo.jpg"` -> `".jpg"`.
  - `"ext"`: Empty the extension. e.g. `"foo.jpg"` -> `"foo."`.
  - `"dot_ext"`: Empty the dot and extension. e.g. `"foo.jpg"` -> `"foo"`.
  - `"all"`: Empty the whole filename. e.g. `"foo.jpg"` -> `""`.
- `--cursor`: Specify the cursor position of the renaming input box.
  - `"end"`: The end of the filename.
  - `"start"`: The start of the filename.
  - `"before_ext"`: Before the extension of the filename.

You can also use `--cursor` with `--empty`, for example, `rename --empty=stem --cursor=start` will empty the file's stem, and move the cursor to the start.

Which causes the input box content for the filename `foo.jpg` to be `|.jpg`, where "|" represents the cursor position.

<DefaultWithProp id="mgr.keymap" prop="run" regex="^rename"/>

### `copy` {#mgr.copy}

Copy the URL of files or directories that are selected or hovered on.

| Argument/Option | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `[what]`        | What to copy, see the table below.                              |
| `--separator`   | Path separator, see the table below.                            |
| `--hovered`     | Always copy the hovered file regardless of the selection state. |

`[what]` can be one of the following values:

| Value                | Description                             |
| -------------------- | --------------------------------------- |
| `"path"`             | URL of the file.                        |
| `"dirname"`          | URL of the parent directory.            |
| `"filename"`         | Name of the file.                       |
| `"name_without_ext"` | Name of the file without the extension. |

`--separator` can be one of the following values:

| Value    | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| N/A      | Platform-specific separator, e.g. `\` for Windows and `/` for Unix. |
| `"unix"` | Use `/` for all platforms.                                          |

<DefaultWithProp id="mgr.keymap" prop="run" value="copy"/>

### `shell` {#mgr.shell}

Run a shell command.

| Argument/Option | Description                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[template]`    | Optional, command template to be run.                                                                                                                                                                                                    |
| `--block`       | Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs. |
| `--orphan`      | Keep the process running even if Yazi has exited, once specified, the process will be detached from the task scheduling system.                                                                                                          |
| `--interactive` | Request the user to input the command to be run interactively                                                                                                                                                                            |
| `--cursor`      | Set the initial position of the cursor in the interactive command input box. For example, `shell 'zip -r .zip %h' --cursor=7 --interactive` places the cursor before `.zip`.                                                             |

You can use the following formatting parameters in `[template]`:

- `%h`: Path of hovered file, or empty if under an empty directory where no file is hovered on
- `%s`: Paths of all selected files
- `%sN`: Path of the N-th selected file, e.g. `%s1`, `%s2`, etc.
- `%d`: Dirnames of all selected files
- `%dN`: Dirname of the N-th selected file, e.g. `%d1`, `%d2`, etc.
- `%%`: Escape form of the `%` character itself

And their URL versions:

- `%H`: URL of hovered file, or empty if under an empty directory where no file is hovered on
- `%S`: URLs of all selected files
- `%SN`: URL of the N-th selected file, e.g. `%S1`, `%S2`, etc.
- `%D`: Dirnames of all selected files, as URLs
- `%DN`: Dirname of the N-th selected file as URL, e.g. `%D1`, `%D2`, etc.

You can use an end-of-options marker (`--`) to avoid any escaping - everything following the `--` will be treated as a raw string:

```diff
[[mgr.prepend_keymap]]
on = "d"
- run = "shell \"trash-put %s\""
+ run = "shell -- trash-put %s"
desc = "Trash selected files"
```

For complex shell scripts, you can use TOML's basic strings (`'''` or `"""`) to write them in multiple lines, as demonstrated in [this tip](/docs/tips#email-selected-files).

<DefaultWithProp id="mgr.keymap" prop="run" value="shell"/>

### `hidden` {#mgr.hidden}

Set the visibility of hidden files.

| Argument/Option | Description              |
| --------------- | ------------------------ |
| `"show"`        | Show hidden files.       |
| `"hide"`        | Hide hidden files.       |
| `"toggle"`      | Toggle the hidden state. |

<DefaultWithProp id="mgr.keymap" prop="run" value="hidden"/>

### `linemode` {#mgr.linemode}

Set the [line mode](/docs/configuration/yazi#mgr.linemode).

| Argument/Option | Description                                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"none"`        | No line mode.                                                                                                                                                                                       |
| `"size"`        | Display the size in bytes of the file. Note that currently directory sizes are only evaluated when [`sort_by = "size"`](/docs/configuration/yazi#mgr.sort_by), and this might change in the future. |
| `"btime"`       | Display the birth time of the file.                                                                                                                                                                 |
| `"mtime"`       | Display the last modified time of the file.                                                                                                                                                         |
| `"permissions"` | Display the permissions of the file, only available on Unix-like systems.                                                                                                                           |
| `"owner"`       | Display the owner of the file, only available on Unix-like systems.                                                                                                                                 |

<DefaultWithProp id="mgr.keymap" prop="run" value="linemode"/>

### `search` {#mgr.search}

| Argument/Option | Description                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `--via`         | Search engine, available values: [`fd`][fd], [`rg`][rg], and [`rga`][rga]                         |
| `--args`        | Additional arguments passed to the specified engine, for example `search --via=fd --args='-e -H'` |

You can search with an empty keyword (`""`) via `fd` to achieve flat view.

<details>
  <summary>Demonstrate flat view</summary>
	<p>Original post: https://github.com/sxyazi/yazi/issues/676#issuecomment-1943494129</p>
	<video src="https://github.com/sxyazi/yazi/assets/17523360/d2c9df9b-b7ef-41ec-889f-26b2f1117cd0" width="100%" controls muted></video>
</details>

Or bind a key to the `search_do` action to quickly switch to the flat view:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "f" ]
run  = 'search_do --via=fd --args="-d 3"'
desc = "Switch to the flat view with a max depth of 3"
```

[fd]: https://github.com/sharkdp/fd
[rg]: https://github.com/BurntSushi/ripgrep
[rga]: https://github.com/phiresky/ripgrep-all

<DefaultWithProp id="mgr.keymap" prop="run" regex="^search"/>

### `find` {#mgr.find}

Find files in the current working directory interactively and incrementally.

| Argument/Option | Description                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `--previous`    | Find for the previous occurrence.                                                                                        |
| `--smart`       | Use smart-case when finding, i.e. case-sensitive if the query contains uppercase characters, otherwise case-insensitive. |
| `--insensitive` | Use case-insensitive find.                                                                                               |

<DefaultWithProp id="mgr.keymap" prop="run" regex="find[^_]"/>

### `find_arrow` {#mgr.find_arrow}

Move the cursor to the next or previous occurrence.

| Argument/Option | Description                      |
| --------------- | -------------------------------- |
| `--previous`    | Move to the previous occurrence. |

<DefaultWithProp id="mgr.keymap" prop="run" value="find_arrow"/>

### `filter` {#mgr.filter}

| Argument/Option | Description                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `--smart`       | Filter with smart-case, i.e. case-sensitive if the keyword contains uppercase characters, otherwise case-insensitive. |
| `--insensitive` | Use case-insensitive filter.                                                                                          |

<DefaultWithProp id="mgr.keymap" prop="run" value="filter"/>

### `sort` {#mgr.sort}

- `[by]`: Optional, if not provided, the sort method will be kept unchanged.
  - `"none"`: Don't sort.
  - `"mtime"`: Sort by last modified time.
  - `"btime"`: Sort by birth time.
  - `"extension"`: Sort by file extension.
  - `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
  - `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
  - `"size"`: Sort by file size.
  - `"random"`: Sort randomly.
- `--reverse`: Display files in reverse order. `--reverse` or `--reverse=yes` to enable, `--reverse=no` to disable.
- `--dir-first`: Display directories first. `--dir-first` or `--dir-first=yes` to enable, `--dir-first=no` to disable.
- `--translit`: Transliterate filenames for sorting, see [sort_translit](/docs/configuration/yazi#mgr.sort_translit) for details. `--translit` or `--translit=yes` to enable, `--translit=no` to disable.

<DefaultWithProp id="mgr.keymap" prop="run" value="sort"/>

### `tab_create` {#mgr.tab_create}

| Argument/Option | Description                                         |
| --------------- | --------------------------------------------------- |
| `[url]`         | Optional, create a new tab using the specified URL. |
| `--current`     | Optional, create a new tab using the current URL.   |

If neither `[url]` nor `--current` is specified, will use the startup directory to create the tab.

<DefaultWithProp id="mgr.keymap" prop="run" value="tab_create"/>

### `tab_close` {#mgr.tab_close}

| Argument/Option | Description                                     |
| --------------- | ----------------------------------------------- |
| `[n]`           | Close the tab at position `n`, starting from 0. |

If you want to close the current tab, use the [`close`](/docs/configuration/keymap/#mgr.close) action instead.

<DefaultWithProp id="mgr.keymap" prop="run" value="tab_close"/>

### `tab_switch` {#mgr.tab_switch}

| Argument/Option | Description                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[n]`           | Switch to the tab at position `n`, starting from 0.                                                                      |
| `--relative`    | Switch to the tab at a position relative to the current tab. The value of `n` can be negative when using this parameter. |

<DefaultWithProp id="mgr.keymap" prop="run" value="tab_switch"/>

### `tab_swap` {#mgr.tab_swap}

| Argument/Option | Description                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `[n]`           | Swap the current tab with the tab at position `n`, where negative values move the tab forward, and positive values move it backward. |

<DefaultWithProp id="mgr.keymap" prop="run" value="tab_swap"/>

### `help` {#mgr.help}

Open the help menu.

<DefaultWithProp id="mgr.keymap" prop="run" value="help"/>

### `plugin` {#mgr.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

<DefaultWithProp id="mgr.keymap" prop="run" value="plugin"/>

### `noop` {#mgr.noop}

If you want to disable certain preset keybindings without rewriting the entire `keymap`, you can use the virtual `noop` action.

For example, to disable the default keybinding of <kbd>g</kbd> ⇒ <kbd>c</kbd>, use:

```toml
[[mgr.prepend_keymap]]
on  = [ "g", "c" ]
run = "noop"
```

Or, if you prefer an array style:

```toml
[[mgr.prepend_keymap]]
on  = [ "g", "c" ]
run = [ "noop" ]  # The array can only have one element and must be "noop"
```

The disabled keys won't trigger any actions when pressed and won't show up in the `which` component.

<DefaultWithProp id="mgr.keymap" prop="run" value="noop"/>

## [tasks] {#tasks}

### `show` {#tasks.show}

Show the task manager.

<DefaultWithProp id="mgr.keymap" prop="run" value="tasks:show"/>

### `close` {#tasks.close}

Hide the task manager.

<DefaultWithProp id="tasks.keymap" prop="run" value="close"/>

### `arrow` {#tasks.arrow}

<KeymapArrow />

<DefaultWithProp id="tasks.keymap" prop="run" value="arrow"/>

### `inspect` {#tasks.inspect}

Inspect the task log:

- I/O error for failed file operations
- Lua error for failed async plugin tasks
- Real-time stdout/stderr for background running or failed shell tasks

press `q` to exit the inspect view.

<DefaultWithProp id="tasks.keymap" prop="run" value="inspect"/>

### `cancel` {#tasks.cancel}

Cancel the task.

<DefaultWithProp id="tasks.keymap" prop="run" value="cancel"/>

### `help` {#tasks.help}

Open the help menu.

<DefaultWithProp id="tasks.keymap" prop="run" value="help"/>

### `plugin` {#tasks.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

<DefaultWithProp id="tasks.keymap" prop="run" value="plugin"/>

### `noop` {#tasks.noop}

See [`noop` action](#mgr.noop).

<DefaultWithProp id="tasks.keymap" prop="run" value="noop"/>

## [spot] {#spot}


### `close` {#spot.close}

Hide the spotter.

<DefaultWithProp id="spot.keymap" prop="run" value="close"/>

### `arrow` {#spot.arrow}

<KeymapArrow />

<DefaultWithProp id="spot.keymap" prop="run" value="arrow"/>

### `swipe` {#spot.swipe}

| Argument/Option | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| `[n]`           | Swipe `n` files up or down in the file list. Negative value for up, positive value for down. |

<DefaultWithProp id="spot.keymap" prop="run" value="swipe"/>

### `copy` {#spot.copy}

Copy the content from the spotter.

| Argument/Option | Description                  |
| --------------- | ---------------------------- |
| `"cell"`        | Copy the selected table cell |

<DefaultWithProp id="spot.keymap" prop="run" value="copy"/>

### `plugin` {#spot.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

<DefaultWithProp id="spot.keymap" prop="run" value="plugin"/>

### `noop` {#spot.noop}

See [`noop` action](#mgr.noop).

<DefaultWithProp id="spot.keymap" prop="run" value="noop"/>

### `help` {#spot.help}

Open the help menu.

<DefaultWithProp id="spot.keymap" prop="run" value="help"/>

## [pick] {#pick}

### `close` {#pick.close}

Cancel the picker.

| Argument/Option | Description        |
| --------------- | ------------------ |
| `--submit`      | Submit the picker. |

<DefaultWithProp id="pick.keymap" prop="run" value="close"/>

### `arrow` {#pick.arrow}

<KeymapArrow />

<DefaultWithProp id="pick.keymap" prop="run" value="arrow"/>

### `help` {#pick.help}

Open the help menu.

<DefaultWithProp id="pick.keymap" prop="run" value="help"/>

### `plugin` {#pick.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

<DefaultWithProp id="pick.keymap" prop="run" value="plugin"/>

### `noop` {#pick.noop}

See [`noop` action](#mgr.noop).

<DefaultWithProp id="pick.keymap" prop="run" value="noop"/>

## [input] {#input}

### `close` {#input.close}

Cancel input.

| Argument/Option | Description       |
| --------------- | ----------------- |
| `--submit`      | Submit the input. |

<DefaultWithProp id="input.keymap" prop="run" value="close"/>

### `escape` {#input.escape}

Go back the normal mode, or cancel input.

<DefaultWithProp id="input.keymap" prop="run" value="escape"/>

### `move` {#input.move}

Move the cursor left or right.

| Argument/Option  | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `[n]`            | Move the cursor `n` characters left or right. Negative value for left, positive value for right. |
| `--in-operating` | Move the cursor only if it's currently waiting for an operation.                                 |

<DefaultWithProp id="input.keymap" prop="run" value="move" remove="delete"/>

### `backward` {#input.backward}

Move back to the start of the current or previous word.

<DefaultWithProp id="input.keymap" prop="run" regex="^backward"/>

### `forward` {#input.forward}

Move forward to the start of the next word.

| Argument/Option | Description                                          |
| --------------- | ---------------------------------------------------- |
| `--end-of-word` | Move forward to the end of the current or next word. |

<DefaultWithProp id="input.keymap" prop="run" regex="^forward"/>

### `insert` {#input.insert}

Enter insert mode. This action is only available in normal mode.

| Argument/Option | Description              |
| --------------- | ------------------------ |
| `--append`      | Insert after the cursor. |

<DefaultWithProp id="input.keymap" prop="run" value="insert" remove="delete"/>

### `visual` {#input.visual}

Enter visual mode. This action is only available in normal mode.

<DefaultWithProp id="input.keymap" prop="run" value="visual"/>

### `delete` {#input.delete}

Delete the selected characters. This action is only available in normal mode.

| Argument/Option | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `--cut`         | Cut the selected characters into clipboard, instead of only deleting them. |
| `--insert`      | Delete and enter insert mode.                                              |

<DefaultWithProp id="input.keymap" prop="run" value="delete"/>

### `yank` {#input.yank}

Copy the selected characters. This action is only available in normal mode.

<DefaultWithProp id="input.keymap" prop="run" value="yank"/>

### `paste` {#input.paste}

Paste the copied characters after the cursor. This action is only available in normal mode.

| Argument/Option | Description                                    |
| --------------- | ---------------------------------------------- |
| `--before`      | Paste the copied characters before the cursor. |

<DefaultWithProp id="input.keymap" prop="run" value="paste"/>

### `undo` {#input.undo}

Undo the last operation. This action is only available in normal mode.

<DefaultWithProp id="input.keymap" prop="run" value="undo"/>

### `redo` {#input.redo}

Redo the last operation. This action is only available in normal mode.

<DefaultWithProp id="input.keymap" prop="run" value="redo"/>

### `help` {#input.help}

Open the help menu. This action is only available in normal mode.

<DefaultWithProp id="input.keymap" prop="run" value="help"/>

### `backspace` {#input.backspace}

Delete the character before the cursor. This action is only available in insert mode.

| Argument/Option | Description                            |
| --------------- | -------------------------------------- |
| `--under`       | Delete the character under the cursor. |

<DefaultWithProp id="input.keymap" prop="run" value="backspace"/>

### `kill` {#input.kill}

Kill the specified range of characters. This action is only available in insert mode.

| Argument/Option | Description                                      |
| --------------- | ------------------------------------------------ |
| `"bol"`         | Kill backwards to the BOL.                       |
| `"eol"`         | Kill forwards to the EOL.                        |
| `"backward"`    | Kill backwards to the start of the current word. |
| `"forward"`     | Kill forwards to the end of the current word.    |

<DefaultWithProp id="input.keymap" prop="run" value="kill"/>

### `plugin` {#input.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin). This action is only available in normal mode.

<DefaultWithProp id="input.keymap" prop="run" value="plugin"/>

### `noop` {#input.noop}

See [`noop` action](#mgr.noop).

<DefaultWithProp id="input.keymap" prop="run" value="noop"/>

## [confirm] {#confirm}

### `close` {#confirm.close}

Cancel and close the confirmation dialog.

| Argument/Option | Description              |
| --------------- | ------------------------ |
| `--submit`      | Submit the confirmation. |

<DefaultWithProp id="confirm.keymap" prop="run" value="close"/>

### `arrow` {#confirm.arrow}

<KeymapArrow />

<DefaultWithProp id="confirm.keymap" prop="run" value="arrow"/>

### `help` {#confirm.help}

Open the help menu.

<DefaultWithProp id="confirm.keymap" prop="run" value="help"/>

## [cmp] {#cmp}

### `close` {#cmp.close}

Hide the completion menu.

| Argument/Option | Description            |
| --------------- | ---------------------- |
| `--submit`      | Submit the completion. |

<DefaultWithProp id="cmp.keymap" prop="run" value="close"/>

### `arrow` {#cmp.arrow}

<KeymapArrow />

<DefaultWithProp id="cmp.keymap" prop="run" value="arrow"/>

### `help` {#cmp.help}

Open the help menu.

<DefaultWithProp id="cmp.keymap" prop="run" value="help"/>

### `plugin` {#cmp.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

<DefaultWithProp id="cmp.keymap" prop="run" value=""/>

### `noop` {#cmp.noop}

See [`noop` action](#mgr.noop).

## [help] {#help}

### `close` {#help.close}

Hide the help menu.

<DefaultWithProp id="help.keymap" prop="run" value="close"/>

### `escape` {#help.escape}

Clear the filter, or hide the help menu.

<DefaultWithProp id="help.keymap" prop="run" value="escape"/>

### `arrow` {#help.arrow}

<KeymapArrow />

<DefaultWithProp id="help.keymap" prop="run" value="rrow"/>

### `filter` {#help.filter}

Apply a filter for the help items.

<DefaultWithProp id="help.keymap" prop="run" value="filter"/>

### `plugin` {#help.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

<DefaultWithProp id="help.keymap" prop="run" value="plugin"/>

### `noop` {#help.noop}

See [`noop` action](#mgr.noop).

<DefaultWithProp id="help.keymap" prop="run" value="noop"/>

