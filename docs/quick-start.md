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

Press <kbd>q</kbd> to quit and <kbd>~</kbd> to open the help menu.

## Shell wrapper

We suggest using this `yy` shell wrapper that provides the ability to change the current working directory when exiting Yazi.

<Tabs>
  <TabItem value="bash-zsh" label="Bash / Zsh" default>

```bash
function yy() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
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
function yy
	set tmp (mktemp -t "yazi-cwd.XXXXXX")
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
def --env yy [...args] {
	let tmp = (mktemp -t "yazi-cwd.XXXXXX")
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
function yy {
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

To use it, copy the function into the configuration file of your respective shell. Then use `yy` instead of `yazi` to start.

## Keybindings

:::tip
For all keybindings, see the [default `keymap.toml` file](https://github.com/sxyazi/yazi/blob/latest/yazi-config/preset/keymap.toml).
:::

### Navigation

To navigate between files and directories you can use the arrow keys <kbd>←</kbd>, <kbd>↓</kbd>, <kbd>↑</kbd> and <kbd>→</kbd>
or Vim-like keys such as <kbd>h</kbd>, <kbd>j</kbd>, <kbd>k</kbd>, <kbd>l</kbd>:

| Key binding  | Alternate key | Action                                          |
| ------------ | ------------- | ----------------------------------------------- |
| <kbd>k</kbd> | <kbd>↑</kbd>  | Move the cursor up                              |
| <kbd>j</kbd> | <kbd>↓</kbd>  | Move the cursor down                            |
| <kbd>l</kbd> | <kbd>→</kbd>  | Enter hovered directory                         |
| <kbd>h</kbd> | <kbd>←</kbd>  | Leave the current directory and into its parent |

Further navigation commands can be found in the table below.

| Key binding                 | Action                       |
| --------------------------- | ---------------------------- |
| <kbd>K</kbd>                | Move the cursor up 5 lines   |
| <kbd>J</kbd>                | Move the cursor down 5 lines |
| <kbd>g</kbd> ⇒ <kbd>g</kbd> | Move cursor to the top       |
| <kbd>G</kbd>                | Move cursor to the bottom    |

### Selection

To select files and directories, the following commands are available.

| Key binding                    | Action                                     |
| ------------------------------ | ------------------------------------------ |
| <kbd>Space</kbd>               | Toggle selection of hovered file/directory |
| <kbd>v</kbd>                   | Enter visual mode (selection mode)         |
| <kbd>V</kbd>                   | Enter visual mode (unset mode)             |
| <kbd>Ctrl</kbd> + <kbd>a</kbd> | Select all files                           |
| <kbd>Ctrl</kbd> + <kbd>r</kbd> | Inverse selection of all files             |
| <kbd>Esc</kbd>                 | Cancel selection                           |

### File/directory operations

To interact with selected files/directories use any of the commands below.

| Key binding                        | Action                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------- |
| <kbd>o</kbd>                       | Open the selected files                                                     |
| <kbd>O</kbd>                       | Open the selected files interactively                                       |
| <kbd>Enter</kbd>                   | Open the selected files                                                     |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | Open the selected files interactively (some terminals don't support it yet) |
| <kbd>y</kbd>                       | Yank the selected files (copy)                                              |
| <kbd>x</kbd>                       | Yank the selected files (cut)                                               |
| <kbd>p</kbd>                       | Paste the yanked files                                                      |
| <kbd>P</kbd>                       | Paste the yanked files (overwrite if the destination exists)                |
| <kbd>Y</kbd> or <kbd>X</kbd>       | Cancel the yank state (unyank)                                              |
| <kbd>-</kbd>                       | Create a symbolic link to the yanked files (absolute path)                  |
| <kbd>\_</kbd>                      | Create a symbolic link to the yanked files (relative path)                  |
| <kbd>d</kbd>                       | Move the files to the trash                                                 |
| <kbd>D</kbd>                       | Permanently delete the files                                                |
| <kbd>a</kbd>                       | Create a file or directory (ends with "/" for directories)                  |
| <kbd>r</kbd>                       | Rename a file or directory                                                  |
| <kbd>;</kbd>                       | Run a shell command                                                         |
| <kbd>:</kbd>                       | Run a shell command (block the UI until the command finishes)               |
| <kbd>.</kbd>                       | Toggle the visibility of hidden files                                       |
| <kbd>Ctrl</kbd> + <kbd>s</kbd>     | Cancel the ongoing search                                                   |
| <kbd>z</kbd>                       | Jump to a directory using zoxide                                            |
| <kbd>Z</kbd>                       | Jump to a directory, or reveal a file using fzf                             |

### Copying paths

To copy paths, use any of the following commands below.

_Observation: <kbd>c</kbd> ⇒ <kbd>d</kbd> indicates pressing the <kbd>c</kbd> key followed by pressing the <kbd>d</kbd> key._

| Key binding                 | Action                                          |
| --------------------------- | ----------------------------------------------- |
| <kbd>c</kbd> ⇒ <kbd>c</kbd> | Copy absolute path                              |
| <kbd>c</kbd> ⇒ <kbd>d</kbd> | Copy the path of the parent directory           |
| <kbd>c</kbd> ⇒ <kbd>f</kbd> | Copy the name of the file                       |
| <kbd>c</kbd> ⇒ <kbd>n</kbd> | Copy the name of the file without the extension |

### Filtering files/directories

| Key binding  | Action                              |
| ------------ | ----------------------------------- |
| <kbd>f</kbd> | Filter the files/directories in CWD |

### Finding files/directories

| Key binding  | Action                              |
| ------------ | ----------------------------------- |
| <kbd>/</kbd> | Forward find file/directory in CWD  |
| <kbd>?</kbd> | Backward find file/directory in CWD |
| <kbd>n</kbd> | Jump to next occurrence             |
| <kbd>N</kbd> | Jump to previous occurrence         |

### Searching files/directories

| Key binding  | Action                                                                         |
| ------------ | ------------------------------------------------------------------------------ |
| <kbd>s</kbd> | Search files by name using [fd](https://github.com/sharkdp/fd)                 |
| <kbd>S</kbd> | Search files by content using [ripgrep](https://github.com/BurntSushi/ripgrep) |

### Sorting

To sort files/directories use the following commands.

_Observation: <kbd>,</kbd> ⇒ <kbd>a</kbd> indicates pressing the <kbd>,</kbd> key followed by pressing the <kbd>a</kbd> key._

| Key binding                 | Action                           |
| --------------------------- | -------------------------------- |
| <kbd>,</kbd> ⇒ <kbd>m</kbd> | Sort by modified time            |
| <kbd>,</kbd> ⇒ <kbd>M</kbd> | Sort by modified time (reverse)  |
| <kbd>,</kbd> ⇒ <kbd>c</kbd> | Sort by creation time            |
| <kbd>,</kbd> ⇒ <kbd>C</kbd> | Sort by creation time (reverse)  |
| <kbd>,</kbd> ⇒ <kbd>e</kbd> | Sort by file extension           |
| <kbd>,</kbd> ⇒ <kbd>E</kbd> | Sort by file extension (reverse) |
| <kbd>,</kbd> ⇒ <kbd>a</kbd> | Sort alphabetically              |
| <kbd>,</kbd> ⇒ <kbd>A</kbd> | Sort alphabetically (reverse)    |
| <kbd>,</kbd> ⇒ <kbd>n</kbd> | Sort naturally                   |
| <kbd>,</kbd> ⇒ <kbd>N</kbd> | Sort naturally (reverse)         |
| <kbd>,</kbd> ⇒ <kbd>s</kbd> | Sort by size                     |
| <kbd>,</kbd> ⇒ <kbd>S</kbd> | Sort by size (reverse)           |

## Flavors

Check out our [flavors repository](https://github.com/yazi-rs/flavors), or [cooking a flavor](/docs/flavors/overview#cooking)!
