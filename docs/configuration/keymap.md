---
sidebar_position: 2
description: Learn how to configure keyboard shortcuts with Yazi.
---

# Keymap

:::tip
If you haven't created and used your own configuration file yet, please see [Configuration](./overview.mdx).
:::

## manager

- escape: Cancel find, exit visual mode, clear selected, or cancel search.

  - `--all`: Do all of the above.
  - `--find`: Cancel find.
  - `--visual`: Exit visual mode.
  - `--select`: Clear selected.
  - `--search`: Cancel search.

  Automatically determine the operation by default, and it will only execute the selected operation after specifying the option; multiple options can be stacked.

- quit: Exit the process.

  - `--no-cwd-file`: Don't write the current directory to the `cwd-file`.

- close: Close the current tab; if it is the last tab, then exit the process.

### Navigation

- arrow

  - `n` / `n%`: Move the cursor up or down by `n` or `n%` lines. Use negative values to move up and positive values to move down.

- leave: Go back to the parent directory.
- enter: Enter the child directory.
- back: Go back to the previous directory.
- forward: Go forward to the next directory.
- peek

  - `n`: Peek up or down at file contents in the preview. Use negative values to peek up and positive values to peek down.

- cd: Change the current directory.

  - `path`: the path to change to.
  - `--interactive`: Use an interactive UI to input the path.

- reveal: Change the current directory to the parent of specified file, and hover on it.

  - `path`: the path to reveal.

### Selection

- select

  - `--state=true`: Select the current file.
  - `--state=false`: Deselect the current file.
  - `--state=none`: Default, toggle the selection state of the current file.

- select_all

  - `--state=true`: Select all files.
  - `--state=false`: Deselect all files.
  - `--state=none`: Default, toggle the selection state of all files.

- visual_mode: Enter visual mode (selection mode).

  - `--unset`: Enter visual mode (unset mode).

### Operation

- open: Open the selected files.

  - `--interactive`: Open the selected files with an interactive UI to choose the opening method.

- yank: Yank the selected files.

  - `--cut`: Cut the selected files.

- paste: Paste the yanked files.

  - `--force`: Overwrite the destination file if it exists.

- link: Create a symbolic link to the yanked files. (This is a privileged action in Windows and must be run as an administrator.)

  - `--relative`: Use a relative path for the symbolic link.
  - `--force`: Overwrite the destination file if it exists.

- remove: Move the files to the trash/recycle bin.

  - `--force`: Don't show the confirmation dialog, and trash/delete files directly.
  - `--permanently`: Permanently delete the files.

- create: Create a file or directory. Ends with `/` (Unix) or `\` (Windows) for directories.

  - `--force`: Overwrite the destination file directly if it exists, without showing the confirmation dialog.

- rename: Rename a file or directory.

  - `--force`: Overwrite the destination file directly if it exists, without showing the confirmation dialog.

- copy: Copy the path of files or directories that are selected or hovered on.

  - `path`: Copy the absolute path.
  - `dirname`: Copy the path of the parent directory.
  - `filename`: Copy the name of the file.
  - `name_without_ext`: Copy the name of the file without the extension.

- shell: Run a shell command.

  - `exec`: Optional, command template to be run.
  - `--block`: Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs.
  - `--confirm`: When the template is provided, run it directly, no input UI was shown.

- hidden: Set the visibility of hidden files.

  - `show`: Show hidden files.
  - `hide`: Hide hidden files.
  - `toggle`: Default, toggle the hidden state.

- linemode: Set the line mode.

  - `none`: No line mode.
  - `size`: Display the size of the file.
  - `permissions`: Display the permissions of the file.
  - `mtime`: Display the last modified time of the file.

  In addition, you can also specify any 1 to 20 characters, and extend it within a UI plugin.
  Which means you can implement your own linemode through the plugin by simply overriding the [`Folder:linemode` method](https://github.com/sxyazi/yazi/blob/main/plugin/preset/components/folder.lua).

- search

  - `rg`: Search files by content using ripgrep.
  - `fd`: Search files by name using fd.
  - `none`: Default, cancel the ongoing search.

- jump

  - `fzf`: Jump to a directory, or reveal a file using fzf.
  - `zoxide`: Jump to a directory using zoxide.

- find

  - `query`: Optional, the query to find for. If not provided, a interactive UI will be used to input with.
  - `--previous`: Find for the previous occurrence.
  - `--smart`: Use smart-case when finding, i.e. case-sensitive if the query contains uppercase characters, otherwise case-insensitive.
  - `--insensitive`: Use case-insensitive find.

- find_arrow: Move the cursor to the next or previous occurrence.

  - `--previous`: Move to the previous occurrence.

- sort

  - `by`: Optional, if not provided, the sort method will be kept unchanged.
    - `"none"`: Don't sort.
    - `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
    - `"created"`: Sort by creation time.
    - `"modified"`: Sort by last modified time.
    - `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
    - `"size"`: Sort by file size.
  - `--reverse`: Display files in reverse order.
  - `--dir_first`: Display directories first.

### Tabs

- tab_create

  - `path`: Create a new tab using the specified path.
  - `--current`: Create a new tab using the current path.

- tab_close

  - `n`: Close the tab at position n, starting from 0.

- tab_switch

  - `n`: Switch to the tab at position n, starting from 0.
  - `--relative`: Switch to the tab at a position relative to the current tab. The value of n can be negative when using this parameter.

- tab_swap

  - `n`: Swap the current tab with the tab at position n, where negative values move the tab forward, and positive values move it backward.

### Tasks

- tasks_show: Show the task manager.

### Help

- help: Open the help menu.

## tasks

- close: Hide the task manager.
- arrow:
  - `-1`: Move the cursor up 1 line.
  - `1`: Move the cursor down 1 line.
- inspect: Inspect the task (press `q` to exit the inspect view).
- cancel: Cancel the task.
- help: Open the help menu.

## select

- close: Cancel selection.
  - `--submit`: Submit the selection.
- arrow
  - `n`: Move the cursor up or down n lines. Negative value for up, positive value for down.
- help: Open the help menu.

## input

- close: Cancel input.

  - `--submit`: Submit the input.

- escape: Go back the normal mode, or cancel input.
- move: Move the cursor left or right.

  - `n`: Move the cursor n characters left or right. Negative value for left, positive value for right.
  - `--in-operating`: Move the cursor only if its currently waiting for an operation.

### Normal mode

- insert: Enter insert mode.

  - `--append`: Insert after the cursor.

- visual: Enter visual mode.
- backward: Move to the beginning of the previous word.
- forward: Move to the beginning of the next word.

  - `--end-of-word`: Move to the end of the next word.

- delete: Delete the selected characters.

  - `--cut`: Cut the selected characters into clipboard, instead of only deleting them.
  - `--insert`: Delete and enter insert mode.

- yank: Copy the selected characters.
- paste: Paste the copied characters after the cursor.

  - `--before`: Paste the copied characters before the cursor.

- undo: Undo the last operation.
- redo: Redo the last operation.

- help: Open the help menu.

### Insert mode

- close: Cancel input.

  - `--submit`: Submit the input.

- escape: Cancel insert mode and enter normal mode.

## Help

- close: Hide the help menu.
- escape: Clear the filter, or hide the help menu.
- arrow
  - `n`: Move the cursor up or down n lines. Negative value for up, positive value for down.
- filter: Apply a filter for the help items.

## Completion

- close: Hide the completion menu.

  - `--submit`: Submit the completion.

- arrow

  - `n`: Move the cursor up or down n lines. Negative value for up, positive value for down.

- help: Open the help menu.
