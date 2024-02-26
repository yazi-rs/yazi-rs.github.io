---
sidebar_position: 8
description: Some awesome plugins for Yazi.
---

# Resources

:::warning
The plugin system is still in the early stage, and most of the plugins below only guarantee compatibility with the latest main branch of Yazi!

Please make sure that both your Yazi and plugins are on the latest main branch to ensure proper functionality!
:::

## Previewers

Markdown:

- [glow.yazi](https://github.com/Reledia/glow.yazi) - Preview markdown files using [glow](https://github.com/charmbracelet/glow).

CSV:

- [miller.yazi](https://github.com/Reledia/miller.yazi) - Preview CSV files (and other supported formats) using [miller](https://github.com/johnkerl/miller).

Binary:

- [hexyl.yazi](https://github.com/Reledia/hexyl.yazi) - Using [hexyl](https://github.com/sharkdp/hexyl) as the fallback previewer for files.

Audio:

- [exifaudio.yazi](https://github.com/Sonico98/exifaudio.yazi) - Preview audio metadata and cover using [exiftool](https://exiftool.org/).

## Preloaders

- [mime.yazi](https://github.com/DreamMaoMao/mime.yazi) - Replace the builtin `mime` plugin to speed up the identification of large files by using file extensions instead of file content to obtain the mime-types.

## Functional plugins

- [keyjump.yazi](https://github.com/DreamMaoMao/keyjump.yazi) - A Yazi plugin like flash.nvim, allows precise navigation using single (or double) characters.
- [bookmarks.yazi](https://github.com/dedukun/bookmarks.yazi) - A Yazi plugin that adds the basic functionality of Vi-like marks.
- [relative-motions.yazi](https://github.com/dedukun/relative-motions.yazi) - A Yazi plugin based about vim motions.

## Neovim plugins

- [tfm.nvim](https://github.com/Rolv-Apneseth/tfm.nvim) - Neovim plugin for terminal file manager integration.
- [yazi.nvim](https://github.com/DreamMaoMao/yazi.nvim) - A Neovim Plugin for yazi terminal file browser.
- [fm-nvim](https://github.com/Eric-Song-Nop/fm-nvim) - Neovim plugin that lets you use your favorite terminal file managers.

## Shell plugins

- [yazi-prompt.sh](https://github.com/Sonico98/yazi-prompt.sh) - Display an indicator in your prompt when running inside a yazi subshell.

## Add yours

We are so happy to add your plugin/flavor to this page!

If your plugin/flavor meets the following requirements, please click `Edit this page` below to add it:

- **Functional** - we will install and test it, since we want all links included on this page to be valid. If it's available only on a specific platform, a note should be added in the README.
- **Follow conventions** - it should be a directory/repository ending with `.yazi`, and include the files listed in the [plugin documentation](/docs/plugins/overview) or [flavor documentation](/docs/flavors/overview).
