---
id: overview
sidebar_position: 0
sidebar_label: Configuration
description: Learn how to configure Yazi.
---

# Configuration

There are three configuration files for Yazi:

- [`yazi.toml`](./yazi.md) - General configuration.
- [`keymap.toml`](./keymap.md) - Keybinds configuration.
- [`theme.toml`](./theme.md) - Color scheme configuration.

You can find the default configuration files at https://github.com/sxyazi/yazi/tree/main/yazi-config/preset.

To override any of the defaults, begin by copying the appropriate file from the directory linked above to the Yazi configuration directory. On Unix/Unix-like systems, the configuration directory is `~/.config/yazi/`, and on Windows, the configuration directory is `C:\Users\USERNAME\AppData\Roaming\yazi\config\` (replacing `USERNAME` with your username).

For example, to edit keybindings, start by copying the [`keymap.toml` file](https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/keymap.toml) to `~/.config/yazi/keymap.toml` (Unix/Unix-like) or `C:\Users\USERNAME\AppData\Roaming\yazi\config\keymap.toml` (Windows).

## Custom config directory

You can change the Yazi configuration directory by exporting the `YAZI_CONFIG_HOME` environment variable.
