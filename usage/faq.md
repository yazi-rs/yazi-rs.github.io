---
sidebar_position: 4
---

# Frequently Asked Questions

## Why is Yazi Fast?

See https://github.com/sxyazi/yazi/issues/143

## Why I can't open file / stuck at 99%?

See https://github.com/sxyazi/yazi/issues/110#issuecomment-1706538851

## I don't like nerd‐fonts!

Yazi has `nerd-fonts` enabled by default, it looks really cool!

If you don't want to use it and want things to be calm, sure, you can modify these icons as much as you want in [`theme.toml`](./configuration/theme.md):

```toml
[status]
separator = { opening = "", closing = "" }
```

and

```toml
[icons]
"Desktop/"   = ""
"Documents/" = ""
"Downloads/" = ""
# ...
```

The above code changed all icons to `""`, and the whole world went quiet, nice!

## Why doesn't the XXX feature exist?

Yazi is a new project, with less than 3 months (as of Sep 20, 2023) since its first commit, and some features are still heavily being developed.

If you find that the XXX feature is missing, please check if it has already been mentioned in the [Feature Requests](https://github.com/sxyazi/yazi/issues/51) and search for related issues. If not, you can create a new request.

Our time slices are limited, and they are allocated to what we consider critical issues, such as bug fixes and making Yazi stable, which includes addressing proposals that could potentially lead to broken changes in the future.

Most maintainers have their full-time jobs, so please understand if your request isn't implemented promptly. Of course, we welcome any constructive PR to help expedite the implementation of your desired feature!

## Why do I need to copy the entire keybindings?

Quoted from https://github.com/sxyazi/yazi/issues/158#issuecomment-1722130381:

> Since Yazi is still in the alpha stage and is not yet stable, default keybindings may undergo adjustments, potentially disrupting user expectations.
>
> Therefore, I encourage users to copy the complete keybinding list, which will not be affected by default configurations. Considering a merge after Yazi stabilizes seems to make more sense.
