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
- `%AppData%\yazi\config\flavors\` on Windows.

```
~/.config/yazi/
├── flavors/
│   ├── foo.yazi/
│   └── bar.yazi/
└── theme.toml
```

Each flavor is a directory with a [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) name, ending in `.yazi`, and containing at least the following files:

```
~/.config/yazi/flavors/bar.yazi/
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

For example, if you want to use the `bar.yazi` flavor in _dark_ mode, set the content of your `theme.toml` to:

```toml
[flavor]
dark = "bar"
```

or use it in _light_ mode:

```toml
[flavor]
light = "bar"
```

If you want to use the `bar.yazi` flavor in both _dark_ and _light_ modes:

```toml
[flavor]
dark  = "bar"
light = "bar"
```

Make sure your `theme.toml` doesn't contain anything other than `[flavor]`, unless you want to override certain styles of the `bar.yazi` flavor.

## Why flavors over themes? {#why-flavor}

We recommend using the new flavor format instead of the old theme, because flavors:

- More powerful - auto dark/light mode switching with the terminal
- Easier to update - can be managed with the [`ya pkg` package manager](/docs/cli#pm)
- Offers configuration merging - override some styles from `flavor.toml` in your own `theme.toml`

## Why is my flavor/theme not working? {#why-not-working}

This is usually because the flavor or theme contains outdated color configurations. Please ensure that your flavor or theme is compatible with your Yazi version:

1. **No invalid fields**

   You can use a TOML linter like [taplo](https://taplo.tamasfe.dev) to check if your `theme.toml` or `flavor.toml` contains any invalid fields:

   ```sh
   taplo check --schema https://yazi-rs.github.io/schemas/theme.json flavor.toml
   ```

2. **Includes fields for components you want to stylize**

   A Yazi theme or flavor can optionally stylize only certain components, i.e., it doesn't necessarily style everything. For components without a specified style, the [preset configuration](https://github.com/sxyazi/yazi/tree/shipped/yazi-config/preset) will be applied.

   See [theme.toml](/docs/configuration/theme) for a complete list of available fields, and make sure your `theme.toml` or `flavor.toml` includes them.

## Cooking a flavor {#cooking}

Please use our [flavor-template](https://github.com/yazi-rs/flavor-template) repository as a starting point to create your own flavor.
