---
id: overview
sidebar_position: 0
sidebar_label: Configuration
description: Learn how to configure Yazi.
---

# Configuration

There are three configuration files for Yazi:

- [`yazi.toml`](./yazi.md) - General configuration.
- [`keymap.toml`](./keymap.md) - Keybindings configuration.
- [`theme.toml`](./theme.md) - Color scheme configuration.

You can find the default configuration files at https://github.com/sxyazi/yazi/tree/latest/yazi-config/preset.

To override any of the defaults, begin by creating the corresponding file (from the directory linked above) to:

- `~/.config/yazi/` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\` on Windows.

For example, to change the sorting method, start by creating a `yazi.toml` file to:

- `~/.config/yazi/yazi.toml` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\yazi.toml` on Windows.

Then [copy the required part](https://github.com/sxyazi/yazi/blob/latest/yazi-config/preset/yazi.toml) into it; here is `sort_dir_first`:

```toml
# yazi.toml
[manager]
sort_dir_first = true
```

## Configuration mixing

The options from your configuration file will be used to override the default. However, for key bindings, if you don't want to override the default directly:

```toml
# keymap.toml
[manager]
keymap = [
	# ...
]
```

And instead want to customize your keys upon the default, you can use `prepend_*` or `append_*` directories to prepend or append them to the default:

```toml
# keymap.toml
[manager]
prepend_keymap = [
	# ...
]
append_keymap = [
	# ...
]
```

They are also available for open, icon, previewer, and preloader rules. See [keymap.toml](/docs/configuration/keymap) for more details.

## Custom config directory

You can change the Yazi configuration directory by exporting the `YAZI_CONFIG_HOME` environment variable.
