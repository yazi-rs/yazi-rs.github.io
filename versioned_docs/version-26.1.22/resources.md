---
sidebar_position: 10
description: Some awesome plugins for Yazi.
---

# Resources

:::warning
The plugin system is still in the early stage, and most of the plugins below only guarantee compatibility with the latest code of Yazi!

Please make sure that both your Yazi and plugins are on the `HEAD` to ensure proper functionality!
:::

## 🖼️ Previewers {#previewers}

General:

- [piper.yazi](https://github.com/yazi-rs/plugins/tree/main/piper.yazi) - Pipe any shell command as a previewer.
- [mux.yazi](https://github.com/peterfication/mux.yazi) - Plugin multiplexer. Define and cycle through previewers for the same file.

Media:

- [exifaudio.yazi](https://github.com/Sonico98/exifaudio.yazi) - Preview audio metadata and cover using [exiftool](https://exiftool.org/).
- [mediainfo.yazi](https://github.com/boydaihungst/mediainfo.yazi) - Preview image, audio, video, subtitle and many media files using `ffmpeg` and `mediainfo`.

Archives:

- [ouch.yazi](https://github.com/ndtoan96/ouch.yazi) - An [ouch](https://github.com/ouch-org/ouch) plugin for Yazi, supporting preview and compression.
- [zless-preview.yazi](https://github.com/vmikk/zless-preview.yazi) - Preview compressed text files using `zless`.
- [comicthumb.yazi](https://github.com/navysky12/comicthumb.yazi) - Preview for comicbook archive files using p7zip on Linux.

Documents:

- [djvu-view.yazi](https://github.com/Shallow-Seek/djvu-view.yazi) - Preview Djvu using `ddjvu` from [djvulibre](https://github.com/DjvuNet/DjVuLibre)

Data Files:

- [duckdb.yazi](https://github.com/wylie102/duckdb.yazi) - Preview CSV/TSV, JSON, and Parquet files using [duckdb](https://github.com/duckdb/duckdb). View the raw data, or a summarized view with data-types, min, max, avg etc. for all columns.

BitTorrent:

- [torrent-preview.yazi](https://github.com/kirasok/torrent-preview.yazi) - Preview "\*.torrent" files using [transmission-cli](https://github.com/transmission/transmission).

Jupyter notebooks:

- [nbpreview.yazi](https://github.com/AnirudhG07/nbpreview.yazi) - Preview jupyter notebooks(\*.ipynb) files using [nbpreview](https://github.com/paw-lu/nbpreview).

Misc:

- [rich-preview.yazi](https://github.com/AnirudhG07/rich-preview.yazi) - Preview Markdown, JSON, CSV, etc. using [rich-cli](https://github.com/textualize/rich-cli)

## 🧩 Functional plugins {#functional}

Jumping:

- [relative-motions.yazi](https://github.com/dedukun/relative-motions.yazi) - A Yazi plugin based about vim motions.
- [jump-to-char.yazi](https://github.com/yazi-rs/plugins/tree/main/jump-to-char.yazi) - Vim-like `f<char>`, jump to the next file whose name starts with `<char>`.
- [time-travel.yazi](https://github.com/iynaix/time-travel.yazi) - Browse forwards and backwards in time via BTRFS / ZFS snapshots.
- [cdhist.yazi](https://github.com/bulletmark/cdhist.yazi) - Use cdhist to fuzzy select and navigate within Yazi from your directory history.
- [cd-git-root.yazi](https://github.com/ciarandg/cd-git-root.yazi) - Changes directory to the root of the git repository you are currently in.
- [fazif.yazi](https://github.com/Shallow-Seek/fazif.yazi) - Search over selected item with `fd`, `rg` `rga` and spawn any FZF configurations in Yazi.
- [yafg.yazi](https://github.com/XYenon/yafg.yazi) - Fuzzy find and grep in Yazi with ripgrep and fzf, opening selected matches in your editor at the matched line.

Bookmarks:

- [bookmarks.yazi](https://github.com/dedukun/bookmarks.yazi) - A Yazi plugin that adds the basic functionality of Vi-like marks.
- [mactag.yazi](https://github.com/yazi-rs/plugins/tree/main/mactag.yazi) - Bring macOS's awesome tagging feature to Yazi! The plugin is only available for macOS just like the name says.
- [simple-tag.yazi](https://github.com/boydaihungst/simple-tag.yazi) - Tagging feature for Linux, macOS and Windows!
- [yamb.yazi](https://github.com/h-hg/yamb.yazi) - Yet another bookmarks plugins. It supports persistence, jumping by a key, jumping by [fzf](https://github.com/junegunn/fzf).
- [bunny.yazi](https://github.com/stelcodes/bunny.yazi) - Bookmarks menu with both persistent and ephemeral bookmarks, fuzzy searching, going back to previous directory, and changing to a directory open in another tab.
- [whoosh.yazi](https://gitlab.com/WhoSowSee/whoosh.yazi) - Advanced bookmark manager with persistent/temporary bookmarks, directory history, fzf integration, path truncation, and cross-platform support. Jump between locations instantly with keys or fuzzy search.

Tabs:

- [projects.yazi](https://github.com/MasouShizuka/projects.yazi) - Save all tabs and their states as a project, and restore them at any time.
- [close-and-restore-tab.yazi](https://github.com/MasouShizuka/close-and-restore-tab.yazi) - Restore closed tabs.
- [autosession.yazi](https://github.com/barbanevosa/autosession.yazi) - Automatic session persistence that saves the current state on exit and restores the last saved state on startup.

File actions:

- [chmod.yazi](https://github.com/yazi-rs/plugins/tree/main/chmod.yazi) - Execute `chmod` on the selected files to change their mode.
- [diff.yazi](https://github.com/yazi-rs/plugins/tree/main/diff.yazi) - Diff the selected file with the hovered file, create a living patch, and copy it to the clipboard.
- [compress.yazi](https://github.com/KKV9/compress.yazi) - A Yazi plugin that compresses selected files to an archive.
- [lin-decompress.yazi](https://github.com/ZimCodes/lin-decompress.yazi) - **(Linux-only)** Extract each archive using a specified tool
- [ouch.yazi](https://github.com/ndtoan96/ouch.yazi) - An [ouch](https://github.com/ouch-org/ouch) plugin for Yazi, supporting preview and compression.
- [archivemount.yazi](https://github.com/AnirudhG07/archivemount.yazi) - Mounting and unmounting archives in yazi using [archivemount](https://github.com/cybernoid/archivemount).
- [reflink.yazi](https://github.com/Ape/reflink.yazi) - Create reflinks to files.
- [rsync.yazi](https://github.com/GianniBYoung/rsync.yazi) - Simple rsync copying locally and to remote servers.
- [sshfs.yazi](https://github.com/uhs-robert/sshfs.yazi) - Mount and manage remote directories over SSH using SSHFS. Supports hosts from `~/.ssh/config` or custom-defined connections. Includes key/password auth.
- [what-size.yazi](https://github.com/pirafrank/what-size.yazi) - Calculate total size of current selection or of current working directory.
- [lazygit.yazi](https://github.com/Lil-Dank/lazygit.yazi) - Manage Git directories with [lazygit](https://github.com/jesseduffield/lazygit) with a quick shortcut.
- [open-git-remote.yazi](https://github.com/larry-oates/open-git-remote.yazi) - Shortcut to open a git remote's webpage for the current yazi directory
- [sudo.yazi](https://github.com/TD-Sky/sudo.yazi) - Execute specific file operations with `sudo` privileges.
- [restore.yazi](https://github.com/boydaihungst/restore.yazi) - Restore/recover latest deleted files/folders using `trash-cli`.
- [recycle-bin.yazi](https://github.com/uhs-robert/recycle-bin.yazi) - Manage your Trash from Yazi: browse contents, restore or delete selected items, empty by age, or empty completely using `trash-cli`.
- [gvfs.yazi](https://github.com/boydaihungst/gvfs.yazi) - Mount and manage MTP, GPhoto2 (PTP) devices (Android, Cameras, etc), SMB, SFTP, NFS, FTP, Google Drive, DNS-SD, DAV (WebDAV), AFP, AFC (Linux only). List of [supported protocals](<https://wiki.gnome.org/Projects(2f)gvfs(2f)schemes.html>).
- [kdeconnect-send.yazi](https://github.com/Deepak22903/kdeconnect-send.yazi) - Send selected files to your smartphone or other devices using KDE Connect.
- [zoom.yazi](https://github.com/yazi-rs/plugins/tree/main/zoom.yazi) - Zoom in or out of the preview image.
- [pandoc.yazi](https://github.com/lmnek/pandoc.yazi) - Convert markup files to different formats via Pandoc.

Clipboard:

- [clipboard.yazi](https://github.com/XYenon/clipboard.yazi) - Yank selected files to the system clipboard, with cross-platform support.
- [copy-file-contents.yazi](https://github.com/AnirudhG07/plugins-yazi/tree/main/copy-file-contents.yazi) - A simple plugin to copy file contents just from Yazi without going into editor.
- [system-clipboard.yazi](https://github.com/orhnk/system-clipboard.yazi) - Cross platform implementation of a simple system clipboard.
- [wl-clipboard.yazi](https://github.com/grappas/wl-clipboard.yazi) - Wayland implementation of a simple system clipboard.
- [path-from-root.yazi](https://github.com/aresler/path-from-root.yazi) - Copy file path relative to git root
- [clippy.yazi](https://github.com/gallardo994/clippy.yazi) - Copy files to clipboard with Clippy on macOS

`filter` enhancements:

- [smart-filter.yazi](https://github.com/yazi-rs/plugins/tree/main/smart-filter.yazi) - Makes filters smarter: continuous filtering, automatically enter unique directory, open file on submitting.

`enter` enhancements:

- [smart-enter.yazi](https://github.com/yazi-rs/plugins/tree/main/smart-enter.yazi) - `Open` files or `enter` directories all in one key!
- [bypass.yazi](https://github.com/Rolv-Apneseth/bypass.yazi) - Yazi plugin for skipping directories with only a single sub-directory.
- [fast-enter.yazi](https://github.com/ourongxing/fast-enter.yazi) - Auto-decompress archives and enter them, or enter the deepest directory until it's not the only subdirectory.

`shell` enhancements:

- [open-with-cmd.yazi](https://github.com/Ape/open-with-cmd.yazi) - Open files using a prompted command.

`search` enhancements:

- [vcs-files.yazi](https://github.com/yazi-rs/plugins/tree/main/vcs-files.yazi) - Show Git file changes.
- [git-files.yazi](https://github.com/ktunprasert/git-files.yazi) - Show Git file changes (with untracked, via `git status --porcelain`)
- [modif.yazi](https://github.com/Shallow-Seek/modif.yazi) - Show recently modified.

`paste` enhancements:

- [smart-paste.yazi](https://github.com/yazi-rs/plugins/tree/main/smart-paste.yazi) - Paste files into the hovered directory or to the CWD if hovering over a file.

General action enhancements:

- [augment-command.yazi](https://github.com/hankertrix/augment-command.yazi) - Enhances a few Yazi actions with better handling of the choice between selected items and the hovered item.

UI enhancements:

- [full-border.yazi](https://github.com/yazi-rs/plugins/tree/main/full-border.yazi) - Add a full border to Yazi to make it look fancier.
- [toggle-pane.yazi](https://github.com/yazi-rs/plugins/tree/main/toggle-pane.yazi) - Toggle the show, hide, and maximize states for different panes: parent, current, and preview.
- [git.yazi](https://github.com/yazi-rs/plugins/tree/main/git.yazi) - Show the status of Git file changes as linemode in the file list.
- [mount.yazi](https://github.com/yazi-rs/plugins/tree/main/mount.yazi) - A mount manager for Yazi, providing disk mount, unmount, and eject functionality.
- [starship.yazi](https://github.com/Rolv-Apneseth/starship.yazi) - Starship prompt plugin for Yazi.
- [omp.yazi](https://github.com/saumyajyoti/omp.yazi) - oh-my-posh prompt plugin for Yazi.
- [yatline.yazi](https://github.com/imsi32/yatline.yazi) - Customize header-line and status-line with an easy configuration.
- [simple-status.yazi](https://github.com/Ape/simple-status.yazi) - Minimalistic status line with useful file attribute information.
- [no-status.yazi](https://github.com/yazi-rs/plugins/tree/main/no-status.yazi) - Remove the status bar.
- [pref-by-location.yazi](https://github.com/boydaihungst/pref-by-location.yazi) - Save and restore linemode/sorting/hidden preferences based on directory location.
- [linemode-plus.yazi](https://github.com/barbanevosa/linemode-plus.yazi) - Advanced linemode customization with configurable date format and combined size+mtime view.

## 🚀 Preloaders {#preloaders}

Images:

- [allmytoes.yazi](https://github.com/Sonico98/allmytoes.yazi) - Preview freedesktop-compatible thumbnails using [allmytoes](https://gitlab.com/allmytoes/allmytoes).

## 🔍Fetchers {#fetchers}

Mime-type:

- [`mime-ext.yazi`](https://github.com/yazi-rs/plugins/tree/main/mime-ext.yazi) - A mime-type provider based on a file extension database, replacing the builtin `file(1)` to speed up mime-type retrieval at the expense of accuracy.

## 🧑‍💻 Devtools {#devtools}

[types.yazi](https://github.com/yazi-rs/plugins/tree/main/types.yazi) - Type definitions for Yazi's Lua API, empowering an efficient plugin development experience.

## 📝 (Neo)vim plugins {#vim}

Neovim:

- [yazi.nvim](https://github.com/mikavilpas/yazi.nvim) - A Neovim plugin for the yazi terminal file manager.
- [tfm.nvim](https://github.com/Rolv-Apneseth/tfm.nvim) - Neovim plugin for terminal file manager integration.
- [fm-nvim](https://github.com/Eric-Song-Nop/fm-nvim) - Neovim plugin that lets you use your favorite terminal file managers.

Vim:

- [vim-yazi](https://github.com/yukimura1227/vim-yazi) - Vim plugin integrating Yazi for seamless in-editor file browsing and navigation.
- [yazi.vim](https://github.com/chriszarate/yazi.vim) - Vim plugin for Yazi.

## 📝 Helix {#helix}

- [Yazelix](https://github.com/luccahuguet/yazelix) - Adding a file tree to Helix & helix-friendly keybindings for Zellij

## 🐚 Shell plugins {#shell}

- [yazi-prompt.sh](https://github.com/Sonico98/yazi-prompt.sh) - Display an indicator in your prompt when running inside a yazi subshell.
- [custom-shell.yazi](https://github.com/AnirudhG07/custom-shell.yazi) - Run any commands through your default system shell.
- [command.yazi](https://github.com/KKV9/command.yazi) - Display a prompt for executing yazi actions.

## 🛠️ Utilities {#utilities}

- [icons-brew.yazi](https://github.com/lpnh/icons-brew.yazi) - Make a hot `theme.toml` for your Yazi icons with your favorite color palette.
- [lsColorsToToml](https://github.com/Mellbourn/lsColorsToToml) - Generate the color rules for the `[filetype]` section in `theme.toml` based on your `$LS_COLORS`.

## 💖 Add yours {#add-yours}

We are so happy to add your plugin to this page!

If your plugin meets the following requirements, please click "Edit this page" below to add it:

- **Functional** - we will install and test to make sure all links included on this page are valid. If it's available only on a specific platform, a note should be added in the README.
- **Follow conventions** - it should be a directory/repository ending with `.yazi`, and include the files listed in the [plugin documentation](/docs/plugins/overview).
- **i18n** - the README should be in English, or at least include an English README if there are multiple languages available.

If it's a Neovim or shell plugin, appending `.nvim` or `.sh` to the name to make it distinguishable is a best practice, but it's not required.
