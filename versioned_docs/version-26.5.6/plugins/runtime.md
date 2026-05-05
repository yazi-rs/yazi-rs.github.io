---
sidebar_position: 4
description: Learn how to use Yazi's Lua API.
---

# Runtime

## rt {#rt}

You can access Yazi's runtime through `rt` to obtain startup parameters, terminal properties, [user preferences](/docs/configuration/yazi), etc.

### `args` {#rt.args}

Command-line arguments passed by the user when launching Yazi.

|      |                        |
| ---- | ---------------------- |
| Type | [`rt::Args`](#rt-args) |

### `term` {#rt.term}

User's terminal emulator properties.

|      |                        |
| ---- | ---------------------- |
| Type | [`rt::Term`](#rt-term) |

### `mgr` {#rt.mgr}

User preferences under [\[mgr\]](/docs/configuration/yazi#mgr).

|      |         |
| ---- | ------- |
| Type | `table` |

### `plugin` {#rt.plugin}

User preferences under [\[plugin\]](/docs/configuration/yazi#plugin).

|      |                            |
| ---- | -------------------------- |
| Type | [`rt::Plugin`](#rt-plugin) |

### `preview` {#rt.preview}

User preferences under [\[preview\]](/docs/configuration/yazi#preview).

|      |         |
| ---- | ------- |
| Type | `table` |

### `tasks` {#rt.tasks}

User preferences under [\[tasks\]](/docs/configuration/yazi#tasks).

|      |         |
| ---- | ------- |
| Type | `table` |

## th {#th}

You can access the user's theme and flavor configuration through `th`.

### `mgr` {#th.mgr}

See [\[mgr\]](/docs/configuration/theme#mgr).

|      |         |
| ---- | ------- |
| Type | `table` |

### `tabs` {#th.tabs}

See [\[tabs\]](/docs/configuration/theme#tabs).

|      |         |
| ---- | ------- |
| Type | `table` |

### `mode` {#th.mode}

See [\[mode\]](/docs/configuration/theme#mode).

|      |         |
| ---- | ------- |
| Type | `table` |

### `status` {#th.status}

See [\[status\]](/docs/configuration/theme#status).

|      |         |
| ---- | ------- |
| Type | `table` |

### `which` {#th.which}

See [\[which\]](/docs/configuration/theme#which).

|      |         |
| ---- | ------- |
| Type | `table` |

### `confirm` {#th.confirm}

See [\[confirm\]](/docs/configuration/theme#confirm).

|      |         |
| ---- | ------- |
| Type | `table` |

### `spot` {#th.spot}

See [\[spot\]](/docs/configuration/theme#spot).

|      |         |
| ---- | ------- |
| Type | `table` |

### `notify` {#th.notify}

See [\[notify\]](/docs/configuration/theme#notify).

|      |         |
| ---- | ------- |
| Type | `table` |

### `pick` {#th.pick}

See [\[pick\]](/docs/configuration/theme#pick).

|      |         |
| ---- | ------- |
| Type | `table` |

### `input` {#th.input}

See [\[input\]](/docs/configuration/theme#input).

|      |         |
| ---- | ------- |
| Type | `table` |

### `cmp` {#th.cmp}

See [\[cmp\]](/docs/configuration/theme#cmp).

|      |         |
| ---- | ------- |
| Type | `table` |

### `tasks` {#th.tasks}

See [\[tasks\]](/docs/configuration/theme#tasks).

|      |         |
| ---- | ------- |
| Type | `table` |

### `help` {#th.help}

See [\[help\]](/docs/configuration/theme#help).

|      |         |
| ---- | ------- |
| Type | `table` |

## rt::Args {#rt-args}

### `entries` {#rt-args.entries}

TODO

### `cwd_file` {#rt-args.cwd_file}

TODO

### `chooser_file` {#rt-args.chooser_file}

TODO

## rt::Term {#rt-term}

User's terminal emulator properties.

### `light` {#rt-term.light}

Whether the terminal is in light mode.

|      |           |
| ---- | --------- |
| Type | `boolean` |

## rt::Plugin {#rt-plugin}

TODO
