---
sidebar_position: 6
description: Learn how to configure Yazi's built-in plugins.
---

# Builtins

Yazi comes with useful built-in plugins to help enhance your workflow without extra setup. This page introduces these built-in plugins and their available configuration options.

## `fzf.lua` {#fzf}

Integrate the power of [`fzf`](https://github.com/junegunn/fzf) into Yazi, allowing you to swiftly search and navigate through files and directories with fuzzy matching.

Source code: https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/plugins/fzf.lua

### Usage

How to invoke fzf:

- Press <kbd>z</kbd> for quick file subtree navigation within CWD.
- Or, press <kbd>z</kbd> for quick navigation among selected items, if you are in selection mode.

If you exit fzf with a single-selected file:

- [`reveal`](/docs/configuration/keymap#mgr.reveal) the file.
- Or, [`cd`](/docs/configuration/keymap#mgr.cd) to it if it's a directory.

If you exit fzf with multiple-selected files:

- Select the files chosen by fzf in Yazi.
- Or, deselect the files chosen by fzf in Yazi, if you are in selection mode.

## `zoxide.lua` {#zoxide}

Enhance your experience of historical directories navigation with external shell, through [`zoxide`](https://github.com/ajeetdsouza/zoxide), a smarter `cd`.

Source code: https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/plugins/zoxide.lua

### Usage

Click <kbd>Z</kbd> to launch the interactive zoxide UI. Please ensure that:

1. You have installed the latest version of zoxide.
2. You have installed the latest version of [fzf](https://github.com/junegunn/fzf), which is a dependency of zoxide.
3. You have correctly configured zoxide for your shell according to [its documentation](https://github.com/ajeetdsouza/zoxide?tab=readme-ov-file#installation).

### Options

| Option             | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `update_db` (bool) | Add the path to zoxide database whenever you switches CWD. |

You can _optionally_ change certain options in your `init.lua` like this:

```lua
-- ~/.config/yazi/init.lua
require("zoxide"):setup {
	update_db = true,
}
```
