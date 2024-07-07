---
sidebar_position: 9
description: Some awesome plugins for Yazi.
---

# Resources

:::warning
The plugin system is still in the early stage, and most of the plugins below only guarantee compatibility with the latest code of Yazi!

Please make sure that both your Yazi and plugins are on the `HEAD` to ensure proper functionality!
:::

## 🖼️ Previewers {#previewers}

Markdown:

- [glow.yazi](https://github.com/Reledia/glow.yazi) - Preview markdown files using [glow](https://github.com/charmbracelet/glow).

CSV:

- [miller.yazi](https://github.com/Reledia/miller.yazi) - Preview CSV files (and other supported formats) using [miller](https://github.com/johnkerl/miller).

Binary:

- [hexyl.yazi](https://github.com/Reledia/hexyl.yazi) - Using [hexyl](https://github.com/sharkdp/hexyl) as the fallback previewer for files.

Audio:

- [exifaudio.yazi](https://github.com/Sonico98/exifaudio.yazi) - Preview audio metadata and cover using [exiftool](https://exiftool.org/).

Archives:

- [ouch.yazi](https://github.com/ndtoan96/ouch.yazi) - An archive previewer plugin for Yazi, using [ouch](https://github.com/ouch-org/ouch).

BitTorrent:

- [torrent-preview.yazi](https://github.com/kirasok/torrent-preview.yazi) - Preview "\*.torrent" files using [transmission-cli](https://github.com/transmission/transmission)

Jupyter Notebooks:
- [nbpreview.yazi](https://github.com/AnirudhG07/nbpreview.yazi) - Preview jupyter notebooks(*.ipynb) files using [nbpreview](https://github.com/paw-lu/nbpreview)

## 🧩 Functional plugins {#functional}

Jumping:

- [relative-motions.yazi](https://github.com/dedukun/relative-motions.yazi) - A Yazi plugin based about vim motions.
- [keyjump.yazi](https://github.com/DreamMaoMao/keyjump.yazi) - A Yazi plugin that jumps to a file by typing a hint character, much like hop.nvim.
- [searchjump.yazi](https://github.com/DreamMaoMao/searchjump.yazi) - Yazi plugin that navigates your file with search labels, consistent with flash.nvim.
- [jump-to-char.yazi](https://github.com/yazi-rs/plugins/tree/main/jump-to-char.yazi) - Vim-like `f<char>`, jump to the next file whose name starts with `<char>`.

Searching:

- [fg.yazi](https://github.com/DreamMaoMao/fg.yazi) - A Yazi plugin that supports file searching with an fzf preview.

Bookmarks:

- [bookmarks.yazi](https://github.com/dedukun/bookmarks.yazi) - A Yazi plugin that adds the basic functionality of Vi-like marks.
- [bookmarks-persistence.yazi](https://github.com/DreamMaoMao/bookmarks-persistence.yazi) - A Yazi plugin that supports persistent bookmark management.No bookmarks are lost after you close yazi.
- [yamb.yazi](https://github.com/h-hg/yamb.yazi) - Yet another bookmarks plugins. It supports persistence, jumping by a key, jumping by [fzf](https://github.com/junegunn/fzf).

File actions:

- [chmod.yazi](https://github.com/yazi-rs/plugins/tree/main/chmod.yazi) - Execute `chmod` on the selected files to change their mode.
- [diff.yazi](https://github.com/yazi-rs/plugins/tree/main/diff.yazi) - Diff the selected file with the hovered file, create a living patch, and copy it to the clipboard.
- [archive.yazi](https://github.com/KKV9/archive.yazi) - Compress selected or hovered files and directories to an archive. It currently supports various archive formats.

`filter` enhancements:

- [smart-filter.yazi](https://github.com/yazi-rs/plugins/tree/main/smart-filter.yazi) - Makes filters smarter: continuous filtering, automatically enter unique directory, open file on submitting.

`enter` enhancements:

- [bypass.yazi](https://github.com/Rolv-Apneseth/bypass.yazi) - Yazi plugin for skipping directories with only a single sub-directory.
- [fast-enter.yazi](https://github.com/ourongxing/fast-enter.yazi) - Auto-decompress archives and enter them, or enter the deepest directory until it's not the only subdirectory.

General command enhancements:

- [augment-command.yazi](https://github.com/hankertrix/augment-command.yazi) - Enhances a few Yazi commands with better handling of the choice between selected items and the hovered item. It also auto-extracts archives and has bidirectional skipping of directories with a single sub-directory, while also including quite a few of the plugins on the [tips page](/docs/tips) like `smart-enter`, `smart-paste`, `parent-arrow` and more.

UI enhancements:

- [full-border.yazi](https://github.com/yazi-rs/plugins/tree/main/full-border.yazi) - Add a full border to Yazi to make it look fancier.
- [max-preview.yazi](https://github.com/yazi-rs/plugins/tree/main/max-preview.yazi) - Maximize or restore the preview pane.
- [hide-preview.yazi](https://github.com/yazi-rs/plugins/tree/main/hide-preview.yazi) - Switch the preview pane between hidden and shown.
- [starship.yazi](https://github.com/Rolv-Apneseth/starship.yazi) - Starship prompt plugin for Yazi.
- [omp.yazi](https://github.com/saumyajyoti/omp.yazi) - oh-my-posh prompt plugin for Yazi.
- [git-status.yazi](https://github.com/DreamMaoMao/git-status.yazi) - git prompt plugin for Yazi.
- [yatline.yazi](https://github.com/imsi32/yatline.yazi) - Customize header-line and status-line with an easy configuration.

## 🚀 Preloaders {#preloaders}

Images:

- [allmytoes.yazi](https://github.com/Sonico98/allmytoes.yazi) - Preview freedesktop-compatible thumbnails using [allmytoes](https://gitlab.com/allmytoes/allmytoes).

## 🔍Fetchers {#fetchers}

- [mime.yazi](https://github.com/DreamMaoMao/mime.yazi) - Replace the builtin `mime` plugin to speed up the identification of large files by using file extensions instead of file content to obtain the mime-types.

## 📝 (Neo)vim plugins {#vim}

Neovim:

- [tfm.nvim](https://github.com/Rolv-Apneseth/tfm.nvim) - Neovim plugin for terminal file manager integration.
- [DreamMaoMao/yazi.nvim](https://github.com/DreamMaoMao/yazi.nvim) - A Neovim Plugin for yazi terminal file browser.
- [mikavilpas/yazi.nvim](https://github.com/mikavilpas/yazi.nvim) - A fork of DreamMaoMao/yazi.nvim with a bunch of additional features.
- [fm-nvim](https://github.com/Eric-Song-Nop/fm-nvim) - Neovim plugin that lets you use your favorite terminal file managers.

Vim:

- [yazi.vim](https://github.com/chriszarate/yazi.vim) - Vim plugin for Yazi.

## 🐚 Shell plugins {#shell}

- [yazi-prompt.sh](https://github.com/Sonico98/yazi-prompt.sh) - Display an indicator in your prompt when running inside a yazi subshell.
- [custom-shell.yazi](https://github.com/AnirudhG07/custom-shell.yazi) - Set your custom-shell as your default yazi Shell.
- [command.yazi](https://github.com/KKV9/command.yazi) - Display a prompt for executing yazi commands.

## 🛠️ Utilities {#utilities}

- [icons-brew.yazi](https://github.com/lpnh/icons-brew.yazi) - Make a hot `theme.toml` for your Yazi icons with your favorite color palette.
- [lsColorsToToml](https://github.com/Mellbourn/lsColorsToToml) - Generate the color rules for the `[filetype]` section in `theme.toml` based on your `$LS_COLORS`.

## 💖 Add yours {#add-yours}

We are so happy to add your plugin to this page!

If your plugin meets the following requirements, please click "Edit this page" below to add it:

- **Functional** - we will install and test it, since we want all links included on this page to be valid. If it's available only on a specific platform, a note should be added in the README.
- **Follow conventions** - it should be a directory/repository ending with `.yazi`, and include the files listed in the [plugin documentation](/docs/plugins/overview).

If it's a Neovim or Shell plugin, appending `.nvim` or `.sh` to the name to make it distinguishable is a best practice, but it's not required.
