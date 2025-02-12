---
sidebar_position: 11
description: Answers to some frequently asked questions about Yazi.
---

# Frequently Asked Questions

## Why is Yazi fast? {#why-yazi-fast}

See [Why is Yazi fast?](/blog/why-is-yazi-fast).

## Why can't I edit text files? {#why-cant-edit}

Yazi defaults to using `$EDITOR` as the text editor for Linux/macOS.
If you are unable to edit files, please check your Bash/Zsh/Fish configuration file for settings like `export EDITOR=vim`. You can also [change Yazi's text opener](/docs/configuration/yazi#opener) from `$EDITOR` to vim/nvim/nano.

For Windows, there is no concept of `$EDITOR`, so users need to modify the text opener as needed.

## Why can't I open/edit/preview files on Windows? {#why-cant-preview}

Please make sure you have set the `YAZI_FILE_ONE` environment variable as per the [Windows Requirements](/docs/installation#windows).

## Why is my text color not distinct? {#why-text-indistinct}

Yazi's default theme uses base16 colors to match the user's terminal theme as closely as possible.

Unfortunately, this cannot cater to all users, and even the colors needed by the same user in light/dark mode can vary, not to mention that some terminals have poor default color schemes, like this [#149 (comment)](https://github.com/sxyazi/yazi/issues/149#issuecomment-1798349727).

So, please [use a Yazi flavor](https://github.com/yazi-rs/flavors) that matches your terminal theme. Of course, if you find a color that better covers most terminals, feel free to create a PR!

## Why can't "Open" and "Enter" be a single command? {#why-separate-open-enter}

The decision to separate `enter` and `open` commands was intentional.

Yazi will be adding the ability to treat an archive as a directory in the future, allowing direct operations on the files inside.

An archive is a file, so it's "openable", but it's also "enterable" as a directory; so the user can choose the action they want to do.

This is true for a actual directory as well - a directory can be entered (in Yazi), or opened (in programs like VSCode or desktop file managers).

If you truly don't need to distinguish between them, use this [smart-enter tip](/docs/tips#smart-enter).

## Why do my icons shrink in [kitty](https://sw.kovidgoyal.net/kitty/), and enlarge when scrolling? {#why-icons-shrink}

TL;DR: Use a flavor for Yazi, https://github.com/yazi-rs/flavors

This might be a bug in kitty (or feature? I don't know). In kitty, you have to add a style to file list items (like foreground color) to make the icons match the text size. However, Yazi's default theme can't add that color, because it can't predict whether the user's terminal has a white background with black text, or a black background with white text.

So it inherits the default terminal font color. This causes the icon size issue, and I've only found this problem in kitty - other terminals don't have it. Therefore, please use a Yazi flavor for the kitty terminal.

## How to troubleshoot terminal response timeout errors? {#trt}

The error happens when running Yazi within tmux - tmux interferes with the communication between Yazi and the actual terminal in various ways.

To avoid any interference from tmux, Yazi has to implement a lot of hacks, most of which work fine in most cases. If it doesn't work for you, please check:

1. Is your tmux up to date?
2. Have you [enabled passthrough for tmux](/docs/image-preview#tmux)?
3. Have you bound `Alt+Shift+p` to tmux? [tmux currently doesn't support `DECRQSS`](https://github.com/tmux/tmux/issues/4034), and [its response](https://vt100.net/docs/vt510-rm/DECRQSS.html) overlaps partially with the `Alt+Shift+P` sequence, causing tmux mistakenly interpret it as a key event.
4. Comment out all custom configurations _except_ [passthrough](/docs/image-preview#tmux) to check if the issue is caused by your settings. If so, add them back piece by piece to identify the cause.

## Why is "orphan" set to false by default? {#why-orphan-false}

`orphan=true` is an emergency exit; once specified, your task will not be managed by Yazi.

For instance, if you realize that you've used `unzip` on the wrong files, and you need to cancel it, with `orphan=false`, you can easily do that by pressing `x` in Yazi's task manager.
However, with `orphan=true`, you can only return to the shell to terminate it.

On the other hand, tasks with `orphan=false` are scheduled through the Yazi task system. It can limit the number of concurrent tasks (configurable by the user), to prevent system resource depletion, such as when you're extracting 100 files.

## I don't like nerd‐fonts! {#dont-like-nerd-fonts}

Yazi has `nerd-fonts` enabled by default, it looks really cool!

If you don't want to use it and want things to be calm, sure, you can modify these icons as much as you want in [`theme.toml`](/docs/configuration/theme):

```toml
[status]
separator_open  = ""
separator_close = ""

[icon]
globs = []
dirs  = []
files = []
exts  = []
conds = []
```

The above code changed all icons to `""`, and the whole world went quiet, nice!

## Why doesn't the XXX feature exist? {#why-no-xxx}

Yazi is a new project, with less than 3 months (as of Sep 20, 2023) since its first commit, and some features are still heavily being developed.

If you find that the XXX feature is missing, please check if it has already been mentioned in the [Feature Requests](https://github.com/sxyazi/yazi/issues/51) and search for related issues. If not, you can create a new request.

Our time slices are limited, and they are allocated to what we consider critical issues, such as bug fixes and making Yazi stable, which includes addressing proposals that could potentially lead to broken changes in the future.

Most maintainers have their full-time jobs, so please understand if your request isn't implemented promptly. Of course, we welcome any constructive PR to help expedite the implementation of your desired feature!
