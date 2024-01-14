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

To override any of the defaults, begin by copying the appropriate file (from the directory linked above) to:

- `~/.config/yazi/` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\` on Windows.

For example, to edit your keybindings, start by copying the [`keymap.toml` file](https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/keymap.toml) to:

- `~/.config/yazi/keymap.toml` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\keymap.toml` on Windows.

## Custom config directory

You can change the Yazi configuration directory by exporting the `YAZI_CONFIG_HOME` environment variable.
