---
sidebar_position: 2
description: Learn how to configure keyboard shortcuts with Yazi.
---

# keymap.toml

:::note
If you haven't created and used your own configuration file yet, please see [Configuration](./overview.md).
:::

## `[manager]`

### `escape`

Cancel find, exit visual mode, clear selected, cancel filter, or cancel search.

| Options/Arguments | Description          |
| ----------------- | -------------------- |
| `--all`           | Do all of the above. |
| `--all`           | Do all of the above. |
| `--find`          | Cancel find.         |
| `--visual`        | Exit visual mode.    |
| `--select`        | Clear selected.      |
| `--filter`        | Cancel filter.       |
| `--search`        | Cancel search.       |

Automatically determine the operation by default, and it will only execute the selected operation after specifying the option; multiple options can be stacked.

### `quit`

Exit the process.

| Options/Arguments | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `--no-cwd-file`   | Don't write the current directory to the `cwd-file`. |

### `close`

Close the current tab; if it's the last tab, exit the process instead.

### `arrow`

| Options/Arguments | Description                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `[n]` / `[n%]`    | Move the cursor up or down by `n` or `n%` lines. Use negative values to move up and positive values to move down. |

### `leave`

Go back to the parent directory.

### `enter`

Enter the child directory.

### `back`

Go back to the previous directory.

### `forward`

Go forward to the next directory.

### `seek`

| Options/Arguments | Description                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `[n]`             | Seek up or down at file contents in the preview. Use negative values to peek up and positive values to peek down. |

### `cd`

Change the current directory.

| Options/Arguments | Description                              |
| ----------------- | ---------------------------------------- |
| `[path]`            | The path to change to.                   |
| `--interactive`   | Use an interactive UI to input the path. |

### `reveal`

Change the current directory to the parent of specified file, and hover on it.

| Options/Arguments | Description         |
| ----------------- | ------------------- |
| `[path]`            | The path to reveal. |

### `select`

| Options/Arguments | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `--state=true`    | Select the current file.                                 |
| `--state=false`   | Deselect the current file.                               |
| `--state=none`    | Default, toggle the selection state of the current file. |

### `select_all`

| Options/Arguments | Description                                      |
| ----------------- | ------------------------------------------------ |
| `--state=true`    | Select all files                                 |
| `--state=false`   | Deselect all files                               |
| `--state=none`    | Default, toggle the selection state of all files |

### `visual_mode`

Enter visual mode (selection mode).

| Options/Arguments | Description                     |
| ----------------- | ------------------------------- |
| `--unset`         | Enter visual mode (unset mode). |

### `open`

Open the selected files.

| Options/Arguments | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `--interactive`   | Open the selected files with an interactive UI to choose the opening method. |

### `yank`

Yank the selected files.

| Options/Arguments | Description             |
| ----------------- | ----------------------- |
| `--cut`           | Cut the selected files. |

### `paste`

Paste the yanked files.

| Options/Arguments | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `--force`         | Overwrite the destination file if it exists.                                                               |
| `--follow`        | Copy the file pointed to by a symbolic link, rather than the link itself. Only can be used during copying. |

### `link`

Create a symbolic link to the yanked files. (This is a privileged action in Windows and must be run as an administrator.)

| Options/Arguments | Description                                  |
| ----------------- | -------------------------------------------- |
| `--relative`      | Use a relative path for the symbolic link.   |
| `--force`         | Overwrite the destination file if it exists. |

### `remove`

Move the files to the trash/recycle bin on macOS/Windows. For Linux, it will follow [The FreeDesktop.org Trash specification](https://specifications.freedesktop.org/trash-spec/trashspec-1.0.html).

| Options/Arguments | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `--force`         | Don't show the confirmation dialog, and trash/delete files directly. |
| `--permanently`   | Permanently delete the files.                                        |

### `create`

Create a file or directory. Ends with `/` (Unix) or `\` (Windows) for directories.

| Options/Arguments | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `--force`         | Overwrite the destination file directly if it exists, without showing the confirmation dialog. |

### `rename`

Rename a file or directory; Or batch rename if multiple files are selected (`$EDITOR` is used to edit the filenames by default).

- `--force`: Overwrite the destination file directly if it exists, without showing the confirmation dialog.
- `--cursor`: Specify the cursor position of the renaming input box.
  - `"end"`: The end of the filename.
  - `"start"`: The start of the filename. (Due to [a bug](https://github.com/sxyazi/yazi/issues/573), this option only available in the latest main branch at the moment.)
  - `"before_ext"`: Before the extension of the filename.
- `--empty`: Empty a part of the filename.
  - `"stem"`: Empty the stem. e.g. `"foo.jpg"` -> `".jpg"`.
  - `"ext"`: Empty the extension. e.g. `"foo.jpg"` -> `"foo."`.
  - `"dot_ext"`: Empty the dot and extension. e.g. `"foo.jpg"` -> `"foo"`.
  - `"all"`: Empty the whole filename. e.g. `"foo.jpg"` -> `""`.

You can also use `--cursor` with `--empty`, for example, `rename --empty=stem --cursor=start` will empty the file's stem, and move the cursor to the start.

Which causes the input box content for the filename `foo.jpg` to be `|.jpg`, where "|" represents the cursor position.

### `copy`

Copy the path of files or directories that are selected or hovered on.

| Options/Arguments  | Description                                      |
| ------------------ | ------------------------------------------------ |
| `path`             | Copy the absolute path.                          |
| `dirname`          | Copy the path of the parent directory.           |
| `filename`         | Copy the name of the file.                       |
| `name_without_ext` | Copy the name of the file without the extension. |

### `shell`

Run a shell command.

| Options/Arguments | Description                                                                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[exec]`            | Optional, command template to be run.                                                                                                                                                                                                    |
| `--block`         | Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs. |
| `--confirm`       | When the template is provided, run it directly, no input UI was shown.                                                                                                                                                                   |

### `hidden`

Set the visibility of hidden files.

| Options/Arguments | Description                       |
| ----------------- | --------------------------------- |
| `show`            | Show hidden files.                |
| `hide`            | Hide hidden files.                |
| `toggle`          | Default, toggle the hidden state. |

### `linemode`

Set the line mode.

| Options/Arguments | Description                                 |
| ----------------- | ------------------------------------------- |
| `none`            | No line mode.                               |
| `size`            | Display the size of the file.               |
| `permissions`     | Display the permissions of the file.        |
| `mtime`           | Display the last modified time of the file. |

In addition, you can also specify any 1 to 20 characters, and extend it within a UI plugin.
Which means you can implement your own linemode through the plugin by simply overriding the [`Folder:linemode` method](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/folder.lua).

### `search`

| Options/Arguments | Description                            |
| ----------------- | -------------------------------------- |
| `rg`              | Search files by content using ripgrep. |
| `fd`              | Search files by name using fd.         |
| `none`            | Default, cancel the ongoing search.    |

### `jump`

| Options/Arguments | Description                                      |
| ----------------- | ------------------------------------------------ |
| `fzf`             | Jump to a directory, or reveal a file using fzf. |
| `zoxide`          | Jump to a directory using zoxide.                |

### `find`

| Options/Arguments | Description                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[query]`           | Optional, the query to find for. If not provided, an interactive UI will be used to input with.                          |
| `--previous`      | Find for the previous occurrence.                                                                                        |
| `--smart`         | Use smart-case when finding, i.e. case-sensitive if the query contains uppercase characters, otherwise case-insensitive. |
| `--insensitive`   | Use case-insensitive find.                                                                                               |

### `find_arrow`

Move the cursor to the next or previous occurrence.

| Options/Arguments | Description                      |
| ----------------- | -------------------------------- |
| `--previous`      | Move to the previous occurrence. |

### `filter`

| Options/Arguments | Description                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `[query]`           | Optional, the query to filter for. If not provided, an interactive UI will be used to input with.                          |
| `--smart`         | Use smart-case when filtering, i.e. case-sensitive if the query contains uppercase characters, otherwise case-insensitive. |
| `--insensitive`   | Use case-insensitive filter.                                                                                               |

### `sort`

- `by`: Optional, if not provided, the sort method will be kept unchanged.
  - `"none"`: Don't sort.
  - `"modified"`: Sort by last modified time.
  - `"created"`: Sort by creation time.
  - `"extension"`: Sort by file extension.
  - `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
  - `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
  - `"size"`: Sort by file size.
- `--reverse`: Display files in reverse order.
- `--dir-first`: Display directories first.

### `tab_create`

| Options/Arguments | Description                                |
| ----------------- | ------------------------------------------ |
| `path`            | Create a new tab using the specified path. |
| `--current`       | Create a new tab using the current path.   |

### `tab_close`

| Options/Arguments | Description                                     |
| ----------------- | ----------------------------------------------- |
| `[n]`             | Close the tab at position `n`, starting from 0. |

### `tab_switch`

| Options/Arguments | Description                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[n]`             | Switch to the tab at position `n`, starting from 0.                                                                      |
| `--relative`      | Switch to the tab at a position relative to the current tab. The value of `n` can be negative when using this parameter. |

### `tab_swap`

| Options/Arguments | Description                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `[n]`             | Swap the current tab with the tab at position `n`, where negative values move the tab forward, and positive values move it backward. |

### `tasks_show`

Show the task manager.

### `help`

Open the help menu.

## `[tasks]`

### `close`

Hide the task manager.

### `arrow`

| Options/Arguments | Description                  |
| ----------------- | ---------------------------- |
| `-1`              | Move the cursor up 1 line.   |
| `1`               | Move the cursor down 1 line. |

### `inspect`

Inspect the task (press `q` to exit the inspect view).

### `cancel`

Cancel the task.

### `help`

Open the help menu.

## `[select]`

### `close`

Cancel selection.

| Options/Arguments | Description           |
| ----------------- | --------------------- |
| `--submit`        | Submit the selection. |

### `arrow`

| Options/Arguments | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `[n]`             | Move the cursor up or down `n` lines. Negative value for up, positive value for down. |

### `help`

Open the help menu.

## `[input]`

### `close`

Cancel input.

| Options/Arguments | Description       |
| ----------------- | ----------------- |
| `--submit`        | Submit the input. |

### `escape`

Go back the normal mode, or cancel input.

### `move`

Move the cursor left or right.

| Options/Arguments | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `[n]`             | Move the cursor `n` characters left or right. Negative value for left, positive value for right. |
| `--in-operating`  | Move the cursor only if its currently waiting for an operation.                                  |

### `backward`

Move back to the start of the current or previous word.

### `forward`

Move forward to the start of the next word.

| Options/Arguments | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `--end-of-word`   | Move forward to the end of the current or next word. |

### `insert`

Enter insert mode.

| Options/Arguments | Description              |
| ----------------- | ------------------------ |
| `--append`        | Insert after the cursor. |

### `visual`

Enter visual mode.

### `delete`

Delete the selected characters.

| Options/Arguments | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `--cut`           | Cut the selected characters into clipboard, instead of only deleting them. |
| `--insert`        | Delete and enter insert mode.                                              |

### `yank`

Copy the selected characters.

### `paste`

Paste the copied characters after the cursor.

| Options/Arguments | Description                                    |
| ----------------- | ---------------------------------------------- |
| `--before`        | Paste the copied characters before the cursor. |

### `undo`

Undo the last operation.

### `redo`

Redo the last operation.

### `help`

Open the help menu.

### `backspace`

Delete the character before the cursor.

| Options/Arguments | Description                            |
| ----------------- | -------------------------------------- |
| `--under`         | Delete the character under the cursor. |

### `kill`

Kill the specified range of characters.

| Options/Arguments | Description                                      |
| ----------------- | ------------------------------------------------ |
| `bol`             | Kill backwards to the BOL.                       |
| `eol`             | Kill forwards to the EOL.                        |
| `backward`        | Kill backwards to the start of the current word. |
| `forward`         | Kill forwards to the end of the current word.    |

## `[completion]`

### `close`

Hide the completion menu.

| Options/Arguments | Description            |
| ----------------- | ---------------------- |
| `--submit`        | Submit the completion. |

### `arrow`

| Options/Arguments | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `[n]`             | Move the cursor up or down `n` lines. Negative value for up, positive value for down. |

### `help`

Open the help menu.

## `[help]`

### `close`

Hide the help menu.

### `escape`

Clear the filter, or hide the help menu.

### `arrow`

| Options/Arguments | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `[n]`             | Move the cursor up or down `n` lines. Negative value for up, positive value for down. |

### `filter`

Apply a filter for the help items.
