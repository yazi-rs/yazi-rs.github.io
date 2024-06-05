---
id: overview
sidebar_position: 0
sidebar_label: Configuration
description: Learn how to configure Yazi.
---

# Configuration

There are three configuration files for Yazi:

- [`yazi.toml`](/docs/configuration/yazi) - General configuration.
- [`keymap.toml`](/docs/configuration/keymap) - Keybindings configuration.
- [`theme.toml`](/docs/configuration/theme) - Color scheme configuration.

You can find the default configuration files on the **_`latest`_** tag [https://github.com/sxyazi/yazi/tree/**_latest_**/yazi-config/preset](https://github.com/sxyazi/yazi/tree/latest/yazi-config/preset).

To override any of the defaults, begin by creating the corresponding file (from the directory linked above) to:

- `~/.config/yazi/` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\` on Windows.

For example, to change the visible status of hidden files, start by creating a `yazi.toml` file to:

- `~/.config/yazi/yazi.toml` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\yazi.toml` on Windows.

Then [copy the required part](https://github.com/sxyazi/yazi/blob/latest/yazi-config/preset/yazi.toml) into it, here is `show_hidden`:

```toml
# yazi.toml
[manager]
show_hidden = true
```

## Configuration mixing {#mixing}

The options from your configuration file will be used to override the default. However, for key bindings, if you don't want to override the default directly:

```toml
# keymap.toml
[manager]
keymap = [
	# ...
]
```

And instead want to customize your keys upon the default, you can use `prepend_*` or `append_*` directories to prepend or append them to the default (See [keymap.toml](/docs/configuration/keymap) for details):

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

They are also available for open, icon, previewer, and preloader rules.

## Custom config directory {#custom-directory}

You can change the Yazi configuration directory by exporting the `YAZI_CONFIG_HOME` environment variable.
