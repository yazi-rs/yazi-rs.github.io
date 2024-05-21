---
sidebar_position: 4
description: How to preview images in Yazi.
---

# Image Preview

Yazi has done a lot of work to adapt to different terminals and multiplexers, trying their best to make it out-of-the-box for users.

This is by no means a simple task, to reduce maintenance costs, we only guarantee it is available in the **latest version** of terminals and multiplexers (tmux, Zellij):

| Platform          | Protocol                                                                                              | Support                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| kitty             | [Kitty unicode placeholders](https://sw.kovidgoyal.net/kitty/graphics-protocol/#unicode-placeholders) | ✅ Built-in                                                    |
| Konsole           | [Kitty old protocol](https://github.com/sxyazi/yazi/blob/main/yazi-adaptor/src/kitty_old.rs)          | ✅ Built-in                                                    |
| iTerm2            | [Inline images protocol](https://iterm2.com/documentation-images.html)                                | ✅ Built-in                                                    |
| WezTerm           | [Inline images protocol](https://iterm2.com/documentation-images.html)                                | ✅ Built-in                                                    |
| Mintty (Git Bash) | [Inline images protocol](https://iterm2.com/documentation-images.html)                                | ✅ Built-in                                                    |
| foot              | [Sixel graphics format](https://www.vt100.net/docs/vt3xx-gp/chapter14.html)                           | ✅ Built-in                                                    |
| Ghostty           | [Kitty old protocol](https://github.com/sxyazi/yazi/blob/main/yazi-adaptor/src/kitty_old.rs)          | ✅ Built-in                                                    |
| Black Box         | [Sixel graphics format](https://www.vt100.net/docs/vt3xx-gp/chapter14.html)                           | ✅ Built-in                                                    |
| VSCode            | [Inline images protocol](https://iterm2.com/documentation-images.html)                                | ✅ Built-in                                                    |
| Tabby             | [Inline images protocol](https://iterm2.com/documentation-images.html)                                | ✅ Built-in                                                    |
| Hyper             | [Inline images protocol](https://iterm2.com/documentation-images.html)                                | ✅ Built-in                                                    |
| X11 / Wayland     | Window system protocol                                                                                | ☑️ [Überzug++](https://github.com/jstkdng/ueberzugpp) required |
| Fallback          | [ASCII art (Unicode block)](https://en.wikipedia.org/wiki/ASCII_art)                                  | ☑️ [Chafa](https://hpjansson.org/chafa/) required              |

Yazi automatically selects the appropriate preview method for you, based on the priority from top to bottom.
That's relying on the `$TERM`, `$TERM_PROGRAM`, and `$XDG_SESSION_TYPE` variables, make sure you don't overwrite them by mistake!

For instance, if your terminal is Alacritty, which doesn't support displaying images itself, but you are running on an X11/Wayland environment,
it will automatically use the "Window system protocol" to display images - this requires you to have Überzug++ installed.

## tmux users {#tmux}

To enable Yazi's image preview to work correctly in tmux, add the following 3 options to your `tmux.conf`:

```sh
set -g allow-passthrough on

set -ga update-environment TERM
set -ga update-environment TERM_PROGRAM
```

Then restart tmux (important):

```sh
tmux kill-server && tmux || tmux
```

Now you should be able to enjoy with the image preview.

## Zellij users {#zellij}

Zellij currently only supports the Sixel graphics format, so you will need a terminal that also supports Sixel.

Note that, the image rendering in Zellij has some performance issues, causing noticeable lagginess when quickly switching between images,
and sometimes even [image tearing](https://github.com/zellij-org/zellij/issues/2576#issuecomment-1707107473).

These issues won't be improved until Zellij enhances it's Sixel implementation or [provides a passthrough mode](https://github.com/zellij-org/zellij/issues/775), if the image is a stronger need to you, consider running Yazi outside of Zellij or using Überzug++.

## Windows users {#windows}

Currently, only the following two terminals support displaying images on Windows:

- WezTerm
- Mintty (Git Bash, which comes with Git for Windows)

## Windows with WSL users {#wsl}

Limited by ConPTY, the Windows edition has had to implement many workarounds, which are not perfect.

However, if you run Yazi in WSL, you can experience perfect image previews using `wezterm ssh`.<br/>
[WezTerm](https://wezfurlong.org/wezterm/) is an excellent terminal that can bypass the limitations of ConPTY through its SSH feature, and it's currently the only terminal that allows this approach.

You need to install `sshd` in WSL and start it:

```sh
sudo apt install openssh-server
sudo service ssh restart
```

Then, on the host machine, connect to WSL over SSH:

```sh
wezterm ssh 127.0.0.1
```

That's it! you can now get Yazi's image preview working properly.

## Neovim users {#neovim}

The builtin terminal emulator (`:term`) in Neovim [doesn't support any graphic protocols](https://github.com/neovim/neovim/issues/4349), so Yazi will try to fallback to X11/Wayland/Chafa in sequence.

Note that Überzug++ might display images in the wrong position; in that case, please adjust it manually using [`ueberzug_offset`](/docs/configuration/yazi/#preview.ueberzug_scale).

## Why can't I preview images via Überzug++? {#debug-ueberzug}

This may be an issue with Überzug++, please try running `ueberzugpp layer` directly in the terminal without Yazi, and paste:

```sh
{"action":"add","identifier":"preview","max_height":0,"max_width":0,"path":"/your/image-path.jpg","x":0,"y":0}
```

into it, then press `Enter`, and to see if any image is shown, without exiting the Überzug++. Note that you need to replace `/your/image-path.jpg` with the actual path of an image.

If the image shows properly when using Überzug++ independently, but not when used with Yazi, please create a bug report.

## Why won't my images adapt to terminal size? {#size}

The size of the image depends on two factors:

1. The [max_width](/docs/configuration/yazi#preview.max_width) and [max_height](/docs/configuration/yazi#preview.max_height) config options, which need to be adjusted by the user as needed.
2. The pixel size of the terminal.

Yazi will use the smaller of these two factors as the image preview size.

However, some terminals (such as VSCode, Tabby, and all Windows terminals) don't implement the `ioctl` system call, before [Add `CSI 14 t` sequence support](https://github.com/crossterm-rs/crossterm/pull/810) is merged, it's not possible to obtain the actual pixel width and height of the terminal.

Hence, only `max_width` and `max_height` will be used in this case.
