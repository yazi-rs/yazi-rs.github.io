---
id: overview
sidebar_position: 0
sidebar_label: Flavors (BETA)
description: Learn how to use Yazi flavors.
---

# Flavors (BETA)

The "flavor" is a pre-made Yazi theme, while what we typically refer to as a "theme" is the user's own theme, i.e. `~/.config/yazi/theme.toml` file.

The purpose of separating them is to allow users to customize their preferences more conveniently on top of an existing flavor, without having to modify those flavor files.
This makes it easier to update, as there won't be conflicts when pulling from Git.

Behind the scenes, Yazi merges the user's `theme.toml` with the flavor's `flavor.toml` automatically, and the user's always takes precedence over the flavor.

## Directory structure {#structure}

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

Each flavor is a directory with a hyphen-separated name, ending in `.yazi`, and containing at least the following files:

```
bar.yazi/
├── flavor.toml
├── tmtheme.xml
├── README.md
├── preview.png
├── LICENSE
└── LICENSE-tmtheme
```

Where:

- `flavor.toml` is this flavor's configuration file, in the format consistent with the [user's `theme.toml`](/docs/configuration/theme).
- `tmtheme.xml` is a [tmTheme file](https://www.sublimetext.com/docs/color_schemes_tmtheme.html) that matches the colors of this flavor for code highlighting.
- `README.md` and `preview.png` are the description and the preview image of this flavor, respectively.
- `LICENSE` and `LICENSE-tmtheme` are the licenses for the flavor and the `tmtheme.xml` file, respectively.

## Usage {#usage}

For example, if you want to use the `bar.yazi` flavor, add these lines to your `theme.toml`:

```toml
[flavor]
use = "bar"
```

## Cooking a flavor {#cooking}

Please use our [flavor-template](https://github.com/yazi-rs/flavor-template) repository as a starting point to create your own flavor.
