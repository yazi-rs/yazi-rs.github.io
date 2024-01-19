---
sidebar_position: 2
description: A quick guide on the basic usage of Yazi.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

Once you've [installed Yazi](./installation.md), start the program with:

```sh
yazi
```

Press `q` to quit and `~` to open the help menu.

## Shell wrapper

We suggest using this `ya` shell wrapper that provides the ability to change the current working directory when exiting Yazi.

<Tabs>
  <TabItem value="bash-zsh" label="Bash / Zsh" default>

```bash
function ya() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXX")"
	yazi "$@" --cwd-file="$tmp"
	if cwd="$(cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
		cd -- "$cwd"
	fi
	rm -f -- "$tmp"
}
```

  </TabItem>
  <TabItem value="fish" label="Fish">

```sh
function ya
	set tmp (mktemp -t "yazi-cwd.XXXXX")
	yazi $argv --cwd-file="$tmp"
	if set cwd (cat -- "$tmp"); and [ -n "$cwd" ]; and [ "$cwd" != "$PWD" ]
		cd -- "$cwd"
	end
	rm -f -- "$tmp"
end
```

  </TabItem>
  <TabItem value="nushell" label="Nushell">

```sh
def --env ya [...args] {
	let tmp = (mktemp -t "yazi-cwd.XXXXX")
	yazi ...$args --cwd-file $tmp
	let cwd = (open $tmp)
	if $cwd != "" and $cwd != $env.PWD {
		cd $cwd
	}
	rm -fp $tmp
}
```

  </TabItem>
  <TabItem value="powershell" label="PowerShell">

```powershell
function ya {
    $tmp = [System.IO.Path]::GetTempFileName()
    yazi $args --cwd-file="$tmp"
    $cwd = Get-Content -Path $tmp
    if (-not [String]::IsNullOrEmpty($cwd) -and $cwd -ne $PWD.Path) {
        Set-Location -Path $cwd
    }
    Remove-Item -Path $tmp
}
```

  </TabItem>
</Tabs>

To use it, copy the function into the configuration file of your respective shell.

## Keybindings

:::tip
For all key bindings, see the [default `keymap.toml` file](https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/keymap.toml).
:::

### Navigation

To navigate between files and directories you can use the arrow keys `←`, `↑`, `↓` and `→` or Vim-like commands such as `h`, `j`, `k`, `l`:

| Key binding | Alternate key | Action                                          |
| ----------- | ------------- | ----------------------------------------------- |
| k           | ↑             | Move the cursor up                              |
| j           | ↓             | Move the cursor down                            |
| l           | →             | Enter hovered directory                         |
| h           | ←             | Leave the current directory and into its parent |

Further navigation commands can be found in the table below.

| Key binding | Action                       |
| ----------- | ---------------------------- |
| K           | Move the cursor up 5 lines   |
| J           | Move the cursor down 5 lines |
| g ⇒ g       | Move cursor to the top       |
| G           | Move cursor to the bottom    |

### Selection

To select files and directories, the following commands are available.

| Key binding | Action                                     |
| ----------- | ------------------------------------------ |
| \<Space>    | Toggle selection of hovered file/directory |
| v           | Enter visual mode (selection mode)         |
| V           | Enter visual mode (unset mode)             |
| \<Ctrl-a>   | Select all files                           |
| \<Ctrl-r>   | Inverse selection of all files             |
| \<Esc>      | Cancel selection                           |

### File/directory operations

To interact with selected files/directories use any of the commands below.

| Key binding   | Action                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| o             | Open the selected files                                                     |
| O             | Open the selected files interactively                                       |
| \<Enter>      | Open the selected files                                                     |
| \<Ctrl-Enter> | Open the selected files interactively (some terminals don't support it yet) |
| y             | Yank the selected files (copy)                                              |
| x             | Yank the selected files (cut)                                               |
| p             | Paste the yanked files                                                      |
| P             | Paste the yanked files (overwrite if the destination exists)                |
| -             | Create a symbolic link to the yanked files (absolute path)                  |
| \_            | Create a symbolic link to the yanked files (relative path)                  |
| d             | Move the files to the trash                                                 |
| D             | Permanently delete the files                                                |
| a             | Create a file or directory (ends with "/" for directories)                  |
| r             | Rename a file or directory                                                  |
| ;             | Run a shell command                                                         |
| :             | Run a shell command (block the UI until the command finishes)               |
| .             | Toggle the visibility of hidden files                                       |
| \<Ctrl-s>     | Cancel the ongoing search                                                   |
| z             | Jump to a directory using zoxide                                            |
| Z             | Jump to a directory, or reveal a file using fzf                             |

### Copying paths

To copy paths, use any of the following commands below.

_Observation: `c ⇒ d` indicates pressing the `c` key followed by pressing the `d` key._

| Key binding | Action                                          |
| ----------- | ----------------------------------------------- |
| c ⇒ c       | Copy absolute path                              |
| c ⇒ d       | Copy the path of the parent directory           |
| c ⇒ f       | Copy the name of the file                       |
| c ⇒ n       | Copy the name of the file without the extension |

### Filtering files/directories

| Key binding | Action                              |
| ----------- | ----------------------------------- |
| f           | Filter the files/directories in CWD |

### Finding files/directories

| Key binding | Action                              |
| ----------- | ----------------------------------- |
| /           | Forward find file/directory in CWD  |
| ?           | Backward find file/directory in CWD |
| n           | Jump to next occurrence             |
| N           | Jump to previous occurrence         |

### Searching files/directories

| Key binding | Action                                                                         |
| ----------- | ------------------------------------------------------------------------------ |
| s           | Search files by name using [fd](https://github.com/sharkdp/fd)                 |
| S           | Search files by content using [ripgrep](https://github.com/BurntSushi/ripgrep) |

### Sorting

To sort files/directories use the following commands.

_Observation: `, ⇒ a` indicates pressing the `,` key followed by pressing the `a` key._

| Key binding | Action                           |
| ----------- | -------------------------------- |
| , ⇒ m       | Sort by modified time            |
| , ⇒ M       | Sort by modified time (reverse)  |
| , ⇒ c       | Sort by creation time            |
| , ⇒ C       | Sort by creation time (reverse)  |
| , ⇒ e       | Sort by file extension           |
| , ⇒ E       | Sort by file extension (reverse) |
| , ⇒ a       | Sort alphabetically              |
| , ⇒ A       | Sort alphabetically (reverse)    |
| , ⇒ n       | Sort naturally                   |
| , ⇒ N       | Sort naturally (reverse)         |
| , ⇒ s       | Sort by size                     |
| , ⇒ S       | Sort by size (reverse)           |

## Themes

Check out our [themes repository](https://github.com/yazi-rs/themes), [suggest a new one](https://github.com/yazi-rs/themes/issues/new), or [make your own](./configuration/theme.md)!
