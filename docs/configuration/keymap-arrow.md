| Argument/Option | Description                                      |
| --------------- | ------------------------------------------------ |
| `[steps]`       | The number of steps the cursor moves up or down. |

`[steps]` can be one of the following values:

| Value    | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| `n`      | Move the cursor `n` lines up or down, negative for up, positive for down.                 |
| `n%`     | Move the cursor `n%` of the screen height up or down, negative for up, positive for down. |
| `"top"`  | Move the cursor to the top (first file).                                                  |
| `"bot"`  | Move the cursor to the bottom (last file).                                                |
| `"prev"` | Go to the previous file, or the bottom if the cursor is at the top.                       |
| `"next"` | Go to the next file, or the top if the cursor is at the bottom.                           |

The `arrow prev`/`arrow next` commands are similar to `arrow -1`/`arrow 1`, except that the former supports wraparound scrolling.
