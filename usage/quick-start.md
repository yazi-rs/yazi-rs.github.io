---
sidebar_position: 2
---

# Quick Start

After [installation](./installation.md), use the following command to run it:

```bash
yazi
```

Press `q` to quit and `~` to open the help menu.

## Keybindings

:::tip
To see all key bindings, check the [config/preset/keymap.toml](https://github.com/sxyazi/yazi/blob/main/config/preset/keymap.toml) file.
:::

### Navigation

To navigate between files and directories you can use the arrow keys `←`, `↑`, `↓` and `→` or vi(m)-like commands such as `h`, `j`, `k`, `l`:

| Key binding | Alternate key | Action                                          |
| ----------- | ------------- | ----------------------------------------------- |
| ↑           | j             | Move the cursor up                              |
| ↓           | k             | Move the cursor down                            |
| →           | l             | Enter highlighted directory                     |
| ←           | h             | Leave the current directory and into its parent |

Further navigation commands can be found in the table below.

| Key binding | Action                       |
| ----------- | ---------------------------- |
| K           | Move the cursor up 5 lines   |
| J           | Move the cursor down 5 lines |
| g           | Move cursor to the top       |
| G           | Move cursor to the bottom    |

### Selection

To select files and directories, the following commands are available.

| Key binding | Action                                         |
| ----------- | ---------------------------------------------- |
| <Space\>    | Toggle selection of highlighted file/directory |
| v           | Enter visual mode (selection mode)             |
| V           | Enter visual mode (unset mode)                 |
| <Ctrl+a\>   | Select all files                               |
| <Ctrl+r\>   | Inverse selection of all files                 |
| <Esc\>      | Cancel selection                               |

### File/directory operations

To interact with selected files/directories use any of the commands below.

| Key binding   | Action                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| o             | Open the selected files                                                 |
| O             | Open the selected files interactively                                   |
| <Enter\>      | Open the selected files                                                 |
| <Ctrl+Enter\> | Open the selected files interactively (Some terminals don't support it) |
| y             | Copy the selected files                                                 |
| x             | Cut the selected files                                                  |
| p             | Paste the files                                                         |
| P             | Paste the files (overwrite if the destination exists)                   |
| k             | Paste the files (follow the symlinks)                                   |
| K             | Paste the files (overwrite + follow)                                    |
| d             | Move the files to the trash                                             |
| D             | Permanently delete the files                                            |
| a             | Create a file or directory (end with "/" for directories)               |
| r             | Rename a file or directory                                              |
| ;             | Run a shell command                                                     |
| :             | Run a shell command (block the UI until the command finishes)           |
| .             | Toggle the visibility of hidden files                                   |
| s             | Search files by name using fd                                           |
| S             | Search files by content using ripgrep                                   |
| <Ctrl+s\>     | Cancel the ongoing search                                               |
| z             | Jump to a directory using zoxide                                        |
| Z             | Jump to a directory, or reveal a file using fzf                         |

### Copying paths

To copy paths, use any of the following commands below.

_Observation: `c ⇒ d` indicates pressing the `c` key followed by pressing the `d` key._

| Key binding | Action                                          |
| ----------- | ----------------------------------------------- |
| c ⇒ c       | Copy absolute path                              |
| c ⇒ d       | Copy the path of the parent directory           |
| c ⇒ f       | Copy the name of the file                       |
| c ⇒ n       | Copy the name of the file without the extension |

### Finding files/directories

| Key binding | Action                                       |
| ----------- | -------------------------------------------- |
| /           | Forward search file/dir in current directory |
| ?           | Backward search file/dir in current director |
| -           | Jump to next occurrence                      |
| =           | Jump to previous occurrence                  |

### Sorting

To sort files/directories use the following commands.

_Observation: `, ⇒ a` indicates pressing the `,` key followed by pressing the `a` key._

| Key binding | Action                                             |
| ----------- | -------------------------------------------------- |
| , ⇒ a       | Sort alphabetically, directories first             |
| , ⇒ A       | Sort alphabetically, directories first (reverse)   |
| , ⇒ c       | Sort by creation time, directories first           |
| , ⇒ C       | Sort by creation time, directories first (reverse) |
| , ⇒ m       | Sort by modified time, directories first           |
| , ⇒ M       | Sort by modified time, directories first (reverse) |
| , ⇒ n       | Sort naturally, directories first                  |
| , ⇒ N       | Sort naturally, directories first (reverse)        |
| , ⇒ s       | Sort by size, directories first                    |
| , ⇒ S       | Sort by size, directories first (reverse)          |

## Changing working directory when exiting Yazi

There is a wrapper of Yazi, that provides the ability to change the current working directory when exiting Yazi, feel free to use it:

```bash
function ya() {
	tmp="$(mktemp -t "yazi-cwd.XXXXX")"
	yazi --cwd-file="$tmp"
	if cwd="$(cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
		cd -- "$cwd"
	fi
	rm -f -- "$tmp"
}
```
