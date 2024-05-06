---
sidebar_position: 9
description: Some awesome plugins for Yazi.
---

# Resources

:::warning
The plugin system is still in the early stage, and most of the plugins below only guarantee compatibility with the latest code of Yazi!

Please make sure that both your Yazi and plugins are on the `HEAD` to ensure proper functionality!
:::

## 🖼️ Previewers

Markdown:

- [glow.yazi](https://github.com/Reledia/glow.yazi) - Preview markdown files using [glow](https://github.com/charmbracelet/glow).

CSV:

- [miller.yazi](https://github.com/Reledia/miller.yazi) - Preview CSV files (and other supported formats) using [miller](https://github.com/johnkerl/miller).

Binary:

- [hexyl.yazi](https://github.com/Reledia/hexyl.yazi) - Using [hexyl](https://github.com/sharkdp/hexyl) as the fallback previewer for files.

Audio:

- [exifaudio.yazi](https://github.com/Sonico98/exifaudio.yazi) - Preview audio metadata and cover using [exiftool](https://exiftool.org/).

Images:

- [allmytoes.yazi](https://github.com/Sonico98/allmytoes.yazi) - Preview freedesktop-compatible thumbnails using [allmytoes](https://gitlab.com/allmytoes/allmytoes).

Archives:

- [ouch.yazi](https://github.com/ndtoan96/ouch.yazi) - An archive previewer plugin for Yazi, using [ouch](https://github.com/ouch-org/ouch).

BitTorrent:

- [torrent-preview.yazi](https://github.com/kirasok/torrent-preview.yazi) - Preview "\*.torrent" files using [transmission-cli](https://github.com/transmission/transmission)

## 🚀 Preloaders

- [mime.yazi](https://github.com/DreamMaoMao/mime.yazi) - Replace the builtin `mime` plugin to speed up the identification of large files by using file extensions instead of file content to obtain the mime-types.

## 🧩 Functional plugins

- [keyjump.yazi](https://github.com/DreamMaoMao/keyjump.yazi) - A Yazi plugin like flash.nvim, allows precise navigation using single (or double) characters.
- [bookmarks.yazi](https://github.com/dedukun/bookmarks.yazi) - A Yazi plugin that adds the basic functionality of Vi-like marks.
- [relative-motions.yazi](https://github.com/dedukun/relative-motions.yazi) - A Yazi plugin based about vim motions.
- [starship.yazi](https://github.com/Rolv-Apneseth/starship.yazi) - Starship prompt plugin for yazi.
- [fg.yazi](https://github.com/DreamMaoMao/fg.yazi) - A Yazi plugin that supports file searching with an fzf preview.
- [bookmarks-persistence.yazi](https://github.com/DreamMaoMao/bookmarks-persistence.yazi) - A Yazi plugin that supports persistent bookmark management.No bookmarks are lost after you close yazi.
- [bypass.yazi](https://github.com/Rolv-Apneseth/bypass.yazi) - Yazi plugin for skipping directories with only a single sub-directory.

## 📝 Neovim plugins

- [tfm.nvim](https://github.com/Rolv-Apneseth/tfm.nvim) - Neovim plugin for terminal file manager integration.
- [DreamMaoMao/yazi.nvim](https://github.com/DreamMaoMao/yazi.nvim) - A Neovim Plugin for yazi terminal file browser.
- [mikavilpas/yazi.nvim](https://github.com/mikavilpas/yazi.nvim) - A fork of DreamMaoMao/yazi.nvim with a bunch of additional features.
- [fm-nvim](https://github.com/Eric-Song-Nop/fm-nvim) - Neovim plugin that lets you use your favorite terminal file managers.

## 🐚 Shell plugins

- [yazi-prompt.sh](https://github.com/Sonico98/yazi-prompt.sh) - Display an indicator in your prompt when running inside a yazi subshell.

## 💖 Add yours

We are so happy to add your plugin/flavor to this page!

If your plugin/flavor meets the following requirements, please click `Edit this page` below to add it:

- **Functional** - we will install and test it, since we want all links included on this page to be valid. If it's available only on a specific platform, a note should be added in the README.
- **Follow conventions** - it should be a directory/repository ending with `.yazi`, and include the files listed in the [plugin documentation](/docs/plugins/overview) or [flavor documentation](/docs/flavors/overview).

If it's a Neovim or Shell plugin, appending `.nvim` or `.sh` to the name to make it distinguishable is a best practice, but it's not required.
