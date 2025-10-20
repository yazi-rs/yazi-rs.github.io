---
sidebar_class_name: "hidden"
---

| Argument/Option | Description                                      |
| --------------- | ------------------------------------------------ |
| `[steps]`       | The number of steps the cursor moves up or down. |

`[steps]` can be one of the following values:

| Value    | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| `n`      | Move the cursor `n` lines up or down, negative for up, positive for down.                 |
| `n%`     | Move the cursor `n%` of the screen height up or down, negative for up, positive for down. |
| `"top"`  | Move the cursor to the top (first item).                                                  |
| `"bot"`  | Move the cursor to the bottom (last item).                                                |
| `"prev"` | Go to the previous item, or the bottom if the cursor is at the top.                       |
| `"next"` | Go to the next item, or the top if the cursor is at the bottom.                           |

The `arrow prev`/`arrow next` commands are similar to `arrow -1`/`arrow 1`, except that the former supports wraparound scrolling.
