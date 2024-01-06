---
id: overview
sidebar_position: 0
sidebar_label: Configuration
description: Learn how to configure Yazi.
---

# Configuration

There are three configuration files for Yazi:

- [`yazi.toml`](./yazi.md) - General configuration
- [`keymap.toml`](./keymap.md) - Keybinds configuration
- [`theme.toml`](./theme.md) - Color scheme configuration

You can find the default configurations at: https://github.com/sxyazi/yazi/tree/main/yazi-config/preset.

To override any of the defaults, begin by copying the appropriate file to following location:

- Unix: `~/.config/yazi/`
- Windows: `C:\Users\USERNAME\AppData\Roaming\yazi\config\`

For example, to edit the keymaps, start by copying `keymap.toml` file (found [here](https://github.com/sxyazi/yazi/tree/main/yazi-config/preset)) to:

- Unix: `~/.config/yazi/keymap.toml`
- Windows: `C:\Users\USERNAME\AppData\Roaming\yazi\config\keymap.toml`

## Custom config directory

You can change the Yazi configuration directory by exporting the `YAZI_CONFIG_HOME` environment variable.
