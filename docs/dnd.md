---
sidebar_position: 5
description: How to use Drag and Drop in Yazi
---

# Drag and Drop

:::note
This feature currently requires a [nightly build](https://github.com/sxyazi/yazi/releases/tag/nightly).
:::

Yazi has built-in Drag and Drop support, which means you can drag files from Yazi to other apps, or drop files from other apps into Yazi.

For this feature to work, your terminal needs to support [The Drag and Drop protocol](https://sw.kovidgoyal.net/kitty/dnd-protocol/). It's a pretty new protocol, and right now only the following terminals support it:

| Terminal                                                  | Support                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [kitty](https://github.com/kovidgoyal/kitty) (>= v0.47.1) | ✅ Supported                                                                    |
| Ghostty                                                   | [Accepted to support](https://github.com/ghostty-org/ghostty/discussions/12851) |

I'm excited to see more terminals supporting it in the future!

## Demo

<video src="https://github.com/user-attachments/assets/b886f673-ef83-423f-919a-66dfe2779ba4" width="80%" controls muted></video>

## Workaround

If your terminal doesn't support the DnD protocol, you might want to try [this workaround](/docs/tips#drag-and-drop).
