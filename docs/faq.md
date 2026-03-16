---
sidebar_position: 12
description: Answers to some frequently asked questions about Yazi.
---

# Frequently Asked Questions

## Why is Yazi fast? {#why-yazi-fast}

See [Why is Yazi fast?](/blog/why-is-yazi-fast).

## Why can't I edit text files? {#why-cant-edit}

Yazi defaults to using `$EDITOR` as the text editor for Linux/macOS.
If you are unable to edit files, please check your Bash/Zsh/Fish configuration file for settings like `export EDITOR=vim`. You can also [change Yazi's text opener](/docs/configuration/yazi#opener) from `$EDITOR` to vim/nvim/nano, etc.

For Windows, there is no concept of `$EDITOR`, so users need to modify the text opener as needed.

## Why can't I open/edit/preview files? {#why-cant-preview}

Yazi relies on `file(1)` to obtain the file mimetype to run the corresponding opener and previewer rules, please check whether your system has it pre-installed.

For Windows, please make sure you have set the `YAZI_FILE_ONE` environment variable as per the [Windows Requirements](/docs/installation#windows).

## Why are the icons not displayed properly? {#icons-incorrect-display}

If your terminal doesn't have Nerd Font support built in, it will render the icons as placeholder characters like squares or question marks, in that case you'll need to manually set your terminal up:

1. Download a Nerd Font from https://www.nerdfonts.com/font-downloads
   - If your terminal lets you specify a fallback font in addition to the main font, download the `Symbols Nerd Font` and set that as the fallback.
   - If your terminal only lets you use a single font, choose any patched Nerd Font you like, e.g. `JetBrainsMono Nerd Font`, and set your terminal font to that.
2. Restart your terminal.

## Why is my text color not distinct? {#why-text-indistinct}

Yazi's default theme uses base16 colors to match the user's terminal theme as closely as possible.

Unfortunately, this cannot cater to all users, and even the colors needed by the same user in light/dark mode can vary, not to mention that some terminals have poor default color schemes, like this [#149 (comment)](https://github.com/sxyazi/yazi/issues/149#issuecomment-1798349727).

So, please [use a Yazi flavor](https://github.com/yazi-rs/flavors) that matches your terminal theme. Of course, if you find a color that better covers most terminals, feel free to create a PR!

## Why can't "Open" and "Enter" be a single action? {#why-separate-open-enter}

The decision to separate `enter` and `open` actions was intentional.

In the future, Yazi will support "archives as directories", allowing direct operations on the files inside.

An archive is a file, so it's "openable", but it's also "enterable" as a directory, allowing users to choose the action they want to take.

This is also true for an actual directory: it can be entered in Yazi or opened in programs like VS Code or desktop file managers.

If you truly don't need to distinguish between them, use this [smart-enter tip](/docs/tips#smart-enter).

## Why do my icons shrink in [kitty](https://sw.kovidgoyal.net/kitty/), and enlarge when scrolling? {#why-icons-shrink}

TL;DR: Use a flavor for Yazi, https://github.com/yazi-rs/flavors

This might be a bug in kitty (or feature? I don't know). In kitty, you have to add a style to file list items (such as a foreground color) to make the icons match the text size. However, Yazi's default theme can't add that color, because it can't predict whether the user's terminal has a white background with black text or a black background with white text.

So it inherits the default terminal font color. This causes the icon size issue, and this problem has only been observed in kitty. Therefore, please use a Yazi flavor with kitty.

## How to troubleshoot terminal response timeout errors? {#trt}

Yazi sends [`DA1`](https://vt100.net/docs/vt510-rm/DA1.html) and [`DSR`](https://vt100.net/docs/vt510-rm/DSR.html)-based requests at startup to detect and enable some modern terminal features. This error means the terminal didn't respond within the timeout, which can happen because:

1. Your terminal is having performance issues and can't reply fast enough. You may check if it happens on other terminals to rule out a terminal-specific problem.
2. You're using an older version of `st` that doesn't support DSR. Make sure your `st` or its fork has incorporated [this fix](https://git.suckless.org/st/commit/f17abd25b376c292f783062ecf821453eaa9cc4c.html).
3. You're on a high-latency / slow SSH connection and the request timed out.

If you don't see any weird behavior besides this error being printed, just ignore it.

If you use tmux: tmux tends to interfere with communication between CLI apps and the terminal, to avoid the interference, Yazi has to implement a bunch of hacks, most of which work fine in most cases, if it doesn't work for you, please check:

1. Is your tmux up-to-date?
2. Have you [enabled passthrough for tmux](/docs/image-preview#tmux)?
3. Have you bound `M-[` to tmux? `Alt+[` is `ESC [` which is the [CSI introducer](https://en.wikipedia.org/wiki/ANSI_escape_code#Control_Sequence_Introducer_commands), tmux might interpret terminal responses that include it as key events.
4. Comment out all custom configurations _except_ [passthrough](/docs/image-preview#tmux) to see if your settings are causing the issue. If so, add them back piece by piece to find the culprit.

## Why is "orphan" set to false by default? {#why-orphan-false}

`orphan=true` is an emergency exit; once specified, your task will not be managed by Yazi.

For instance, if you realize that you've used `unzip` on the wrong files, and you need to cancel it, with `orphan=false`, you can easily do that by pressing `x` in Yazi's task manager.
However, with `orphan=true`, you can only return to the shell to terminate it.

On the other hand, tasks with `orphan=false` are scheduled through the Yazi task system. It can limit the number of concurrent tasks (configurable by the user), to prevent system resource depletion, such as when you're extracting 100 files.

## I don't like nerd‐fonts! {#dont-like-nerd-fonts}

Yazi has `nerd-fonts` icons enabled by default, it looks really cool!

If you don't want to use it and want things to be calm, sure, you can modify these icons as much as you want in [`theme.toml`](/docs/configuration/theme):

```toml
[status]
sep_left = { open = "", close = "" }
sep_right = { open = "", close = "" }

[icon]
globs = []
dirs  = []
files = []
exts  = []
conds = []
```

The code above hides all icons, and the entire world goes quiet. Nice!
