---
sidebar_position: 4
description: Learn how to access Yazi's app data.
---

# App data

You can access all app data through the `cx` within the [sync context](/docs/plugins/overview#sync-context):

- `cx.active` - The active tab, which is a [tab::Tab](#tab-tab)
- `cx.tabs` - All of tabs, which is a [mgr::Tabs](#mgr-tabs)
- `cx.tasks` - All of tasks, which is a [tasks::Tasks](#tasks-tasks)
- `cx.yanked` - The yanked urls, which is a [mgr::Yanked](#mgr-yanked)

### `tab::Mode` {#tab-mode}

Visual mode status.

Properties:

- `is_select` - Whether the mode is select
- `is_unset` - Whether the mode is unset
- `is_visual` - Whether the mode is select or unset

Meta methods:

- `__tostring()`

### `tab::Preference` {#tab-preference}

Properties:

- `sort_by`
- `sort_sensitive`
- `sort_reverse`
- `sort_dir_first`
- `sort_translit`
- `linemode`
- `show_hidden`

These properties are consistent with those in [yazi.toml](/docs/configuration/yazi), and will not be detailed here.

### `tab::Selected` {#tab-selected}

Meta methods:

- `__len()`
- `__pairs()` - Iterate over the selected [Url](#url)s.

### `tab::Preview` {#tab-preview}

Properties:

- `skip` - The number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos.
- `folder` - The [tab::Folder](#tab-folder) being previewed, or `nil` if this preview is not for folders

### `tab::Folder` {#tab-folder}

Properties:

- `cwd` - The current working directory of this folder, which is a [Url](#url)
- `offset` - The offset of this folder, which is an integer
- `cursor` - The cursor position of this folder, which is an integer
- `window` - A table of [File](#file) in the visible area of this folder
- `files` - The [`fs::Files`](#fs-files) of this folder
- `hovered` - The hovered [File](#file) of this folder, or `nil` if there is no hovered file

### `fs::Files` {#fs-files}

Meta methods:

- `__len()`
- `__index(idx)` - Access the [fs::File](#fs-file) by index

### `fs::File` {#fs-file}

Based on [File](#file), with the following additional methods:

- `size()` - The size of this file, returns an integer representing the size in bytes, or `nil` if its a directory and it has not been evaluated
- `mime()` - The mime-type of this file, which is a string, or `nil` if it's a directory or hasn't been lazily calculated at all
- `prefix()` - The prefix of this file relative to `CWD`, which used in the flat view during search. For instance, if `CWD` is `/foo`, and the file is `/foo/bar/baz`, then the prefix is `bar/`
- `icon()` - The [Icon](#icon) of this file, [`[icon]`](/docs/configuration/theme#icon) rules are applied; if no rule matches, returns `nil`
- `style()` - The [Style](/docs/plugins/layout#style) of this file, [`[filetype]`](/docs/configuration/theme#filetype) rules are applied; if no rule matches, returns `nil`
- `is_yanked()` - Whether this file is yanked
- `is_selected()` - Whether this file is selected
- `found()` - When users find a file using the `find` command, the status of the file - returns `nil` if it doesn't match the user's find keyword; otherwise, returns `{idx, all}`, where `idx` is the position of matched file, and `all` represents the number of all matched files.

And properties:

- `is_hovered` - Whether this file is hovered

### `mgr::Tabs` {#mgr-tabs}

Properties:

- `idx` - The index of the active tab

Meta methods:

- `__len()`
- `__index(idx)` - Access the [tab::Tab](#tab-tab) by index

### `tab::Tab` {#tab-tab}

Properties:

- `name` - The name of the tab.
- `mode` - The [tab::Mode](#tab-mode) of the tab.
- `pref` - The [tab::Preference](#tab-preference) of the tab.
- `current` - The current folder within the tab, which is a [tab::Folder](#tab-folder).
- `parent` - The parent folder within the tab, which is a [tab::Folder](#tab-folder) if `current` has a parent; otherwise, `nil`.
- `selected` - The selected files within the tab, which is a [tab::Selected](#tab-selected).
- `preview` - The [tab::Preview](#tab-preview) within the tab.

### `tasks::Tasks` {#tasks-tasks}

Properties:

- `progress` - The progress of all tasks, which is a table:

  ```lua
  {
  	-- Number of tasks
  	total = 0,
  	succ  = 0,
  	fail  = 0,

  	-- Workload of tasks
  	found     = 0,
  	processed = 0,
  }
  ```

### `mgr::Yanked` {#mgr-yanked}

```lua
for idx, url in pairs(cx.yanked) do
	-- ...
end
```

Meta methods:

- `__len()`
- `__pairs()` - Iterate over the yanked [Url](#url)s.

Properties:

- `is_cut` - Whether the yanked urls are cut.
