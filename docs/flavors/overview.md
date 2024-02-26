---
id: overview
sidebar_position: 0
sidebar_label: Flavors (WIP)
description: Learn how to use Yazi flavors.
---

# Flavors (WIP)

The "flavor" is a pre-made Yazi theme, while what we typically refer to as a "theme" is the user's own theme, i.e. `~/.config/yazi/theme.toml` file.

The purpose of separating them is to allow users to customize their preferences more conveniently on top of an existing flavor, without having to modify those flavor files.
This makes it easier to update, as there won't be conflicts when pulling from Git.

Behind the scenes, Yazi merges the user's `theme.toml` with the flavor's `theme.toml` automatically, and the user's always takes precedence over the flavor.

## Directory structure

These flavors are placed in the `flavors` subdirectory of the Yazi configuration directory, so either:

- `~/.config/yazi/flavors/` on Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\flavors\` on Windows.

```
~/.config/yazi/
├── flavors/
│   ├── foo.yazi/
│   └── bar.yazi/
└── theme.toml
```

Each flavor is a directory ending with `.yazi`, containing `theme.toml` and `tmtheme.xml` files. For instance, the structure of the `bar` flavor is as:

```
bar.yazi/
├── LICENSE
├── LICENSE-tmtheme
├── README.md
├── screenshot.png
├── theme.toml
└── tmtheme.xml
```

Where:

- `LICENSE` and `LICENSE-tmtheme` are the licenses of the flavor and the `tmtheme.xml` file, respectively.
- `README.md` and `screenshot.png` are the description and the screenshot of the flavor, respectively.
- `theme.toml` is the flavor's configuration file in the format consistent with the [user's `theme.toml`](/docs/configuration/theme).
- `tmtheme.xml` is a thTheme file that matches the colors of this flavor for code highlighting.

## Cooking a flavor

Please use our [flavor-template](https://github.com/yazi-rs/flavor-template) repository as a starting point to create your own flavor.
