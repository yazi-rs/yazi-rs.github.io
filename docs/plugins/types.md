---
sidebar_position: 1
description: Learn how to use Yazi's Lua API.
---

# Types

## Shared {#shared}

### Url {#shared.url}

Create a Url:

```lua
-- regular file
local url = Url("/root/Downloads/logo.png")

-- `bgm.mp3` from the archive `ost.zip`
local url = Url("archive:///root/ost.zip#bgm.mp3")
```

Properties:

- `name` - The filename in string if any, otherwise `nil`
- `stem` - The filename without the extension in string if any, otherwise `nil`
- `frag` - The fragment string of the url. Let's say the url `archive:///root/my-archive.zip#1.jpg`, the fragment `1.jpg`
- `parent` - The parent directory `Url` if any, otherwise `nil`
- `is_regular` - Whether the file represented by the url is a regular file
- `is_search` - Whether the file represented by the url from the search result
- `is_archive` - Whether the file represented by the url from an archive
- `is_absolute` - Whether the path represented by the url is absolute
- `has_root` - Whether the path represented by the url has a root

Methods:

- `join(url)` - Joins with another `Url` or a string of url, returns a new `Url`
- `starts_with(url)` - Whether the url starts with another `Url` or a string of url
- `ends_with(url)` - Whether the url ends with another `Url` or a string of url
- `strip_prefix(url)` - Strips the prefix of another `Url` or a string of url, returns a new `Url`

Meta methods:

- `__eq(another_url)`
- `__tostring()`
- `__concat(string)`

### Cha {#shared.cha}

Cha means one file's characteristics with the following properties:

- `is_dir` - Whether this file is a directory
- `is_hidden` - Whether this file is hidden (starts with a dot)
- `is_link` - Whether this file is a symlink
- `is_orphan` - Whether this file is a bad symlink, which points to a non-existent file
- `is_dummy` - Whether the file is dummy, which fails to load complete metadata, possibly the filesystem doesn't support it, such as FUSE.
- `is_block` - Whether this file is a block device
- `is_char` - Whether this file is a character device
- `is_fifo` - Whether this file is a fifo
- `is_sock` - Whether this file is a socket
- `is_exec` - Whether this file is executable
- `is_sticky` - Whether this file has the sticky bit set
- `len` - The length of this file, returns an integer representing the size in bytes. Note that it can't reflect the size of a directory, use [`size()`](#app-data.fs-file) instead
- `atime` - The accessed time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `btime` - The birth time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `mtime` - The modified time of this file in Unix timestamp, or `nil` if it doesn't have a valid time

And methods:

- `perm()` - Unix permissions of this file in string, e.g. `drwxr-xr-x`. For Windows, it's always `nil`

And the Unix only properties:

- `uid` - The user id of this file
- `gid` - The group id of this file
- `nlink` - The number of hard links to this file

### File {#shared.file}

Properties:

- `url` - The [Url](#shared.url) of this file
- `cha` - The [Cha](#shared.cha) of this file
- `link_to` - The [Url](#shared.url) of this file pointing to, if it's a symlink; otherwise, `nil`
- `name` - The name of this file

### Icon {#shared.icon}

Properties:

- `text` - The text of this icon
- `style` - The [Style](/docs/plugins/layout#style) of this icon

### Error {#shared.error}

Properties:

- `code`: The raw error code if any, otherwise `nil`, which is an integer.

Meta methods:

- `__tostring()`
- `__concat(string)`

### Window {#shared.window}

Properties:

- `rows` - The number of rows of this window
- `cols` - The number of columns of this window
- `width` - The width of this window in pixels
- `height` - The height of this window in pixels

## App data {#app-data}

You can access all app data through the `cx` within [Sync context](/docs/plugins/overview#sync-context):

- `cx.active` - The active tab, which is a [tab::Tab](#app-data.tab-tab)
- `cx.tabs` - All of tabs, which is a [mgr::Tabs](#app-data.mgr-tabs)
- `cx.tasks` - All of tasks, which is a [tasks::Tasks](#app-data.tasks-tasks)
- `cx.yanked` - The yanked urls, which is a [mgr::Yanked](#app-data.mgr-yanked)

### `tab::Mode` {#app-data.tab-mode}

Visual mode status.

Properties:

- `is_select` - Whether the mode is select
- `is_unset` - Whether the mode is unset
- `is_visual` - Whether the mode is select or unset

Meta methods:

- `__tostring()`

### `tab::Preference` {#app-data.tab-preference}

Properties:

- `sort_by`
- `sort_sensitive`
- `sort_reverse`
- `sort_dir_first`
- `sort_translit`
- `linemode`
- `show_hidden`

These properties are consistent with those in [yazi.toml](/docs/configuration/yazi), and will not be detailed here.

### `tab::Selected` {#app-data.tab-selected}

Meta methods:

- `__len()`
- `__pairs()` - Iterate over the selected [Url](#shared.url)s.

### `tab::Preview` {#app-data.tab-preview}

Properties:

- `skip` - The number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos.
- `folder` - The [tab::Folder](#app-data.tab-folder) being previewed, or `nil` if this preview is not for folders

### `tab::Folder` {#app-data.tab-folder}

Properties:

- `cwd` - The current working directory of this folder, which is a [Url](#shared.url)
- `offset` - The offset of this folder, which is an integer
- `cursor` - The cursor position of this folder, which is an integer
- `window` - A table of [File](#shared.file) in the visible area of this folder
- `files` - The [`fs::Files`](#app-data.fs-files) of this folder
- `hovered` - The hovered [File](#shared.file) of this folder, or `nil` if there is no hovered file

### `fs::Files` {#app-data.fs-files}

Meta methods:

- `__len()`
- `__index(idx)` - Access the [fs::File](#app-data.fs-file) by index

### `fs::File` {#app-data.fs-file}

Based on [File](#shared.file), with the following additional methods:

- `size()` - The size of this file, returns an integer representing the size in bytes, or `nil` if its a directory and it has not been evaluated
- `mime()` - The mime-type of this file, which is a string, or `nil` if it's a directory or hasn't been lazily calculated at all
- `prefix()` - The prefix of this file relative to `CWD`, which used in the flat view during search. For instance, if `CWD` is `/foo`, and the file is `/foo/bar/baz`, then the prefix is `bar/`
- `icon()` - The [Icon](#shared.icon) of this file, [`[icon]`](/docs/configuration/theme#icon) rules are applied; if no rule matches, returns `nil`
- `style()` - The [Style](/docs/plugins/layout#style) of this file, [`[filetype]`](/docs/configuration/theme#filetype) rules are applied; if no rule matches, returns `nil`
- `is_yanked()` - Whether this file is yanked
- `is_selected()` - Whether this file is selected
- `found()` - When users find a file using the `find` command, the status of the file - returns `nil` if it doesn't match the user's find keyword; otherwise, returns `{idx, all}`, where `idx` is the position of matched file, and `all` represents the number of all matched files.

And properties:

- `is_hovered` - Whether this file is hovered

### `mgr::Tabs` {#app-data.mgr-tabs}

Properties:

- `idx` - The index of the active tab

Meta methods:

- `__len()`
- `__index(idx)` - Access the [tab::Tab](#app-data.tab-tab) by index

### `tab::Tab` {#app-data.tab-tab}

Properties:

- `name` - The name of the tab.
- `mode` - The [tab::Mode](#app-data.tab-mode) of the tab.
- `pref` - The [tab::Preference](#app-data.tab-preference) of the tab.
- `current` - The current folder within the tab, which is a [tab::Folder](#app-data.tab-folder).
- `parent` - The parent folder within the tab, which is a [tab::Folder](#app-data.tab-folder) if `current` has a parent; otherwise, `nil`.
- `selected` - The selected files within the tab, which is a [tab::Selected](#app-data.tab-selected).
- `preview` - The [tab::Preview](#app-data.tab-preview) within the tab.

### `tasks::Tasks` {#app-data.tasks-tasks}

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

### `mgr::Yanked` {#app-data.mgr-yanked}

```lua
for idx, url in pairs(cx.yanked) do
	-- ...
end
```

Meta methods:

- `__len()`
- `__pairs()` - Iterate over the yanked [Url](#shared.url)s.

Properties:

- `is_cut` - Whether the yanked urls are cut.
