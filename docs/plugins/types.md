---
sidebar_position: 1
description: Learn how to use Yazi's Lua API.
---

# Types

## Shared

### Cha

Cha means one file's characteristics with the following properties:

- `is_dir`: Whether this file is a directory
- `is_hidden`: Whether this file is hidden (starts with a dot)
- `is_link`: Whether this file is a symlink
- `is_orphan`: Whether this file is a bad symlink, which points to a non-existent file
- `is_block_device`: Whether this file is a block device
- `is_char_device`: Whether this file is a character device
- `is_fifo`: Whether this file is a fifo
- `is_socket`: Whether this file is a socket
- `length`: The length of this file, returns an integer representing the size in bytes. Note that it can't reflect the size of a directory, use [`size()`](#folderfile) instead
- `created`: The created time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `modified`: The modified time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `accessed`: The accessed time of this file in Unix timestamp, or `nil` if it doesn't have a valid time
- `permissions`: Unix permissions of this file in string, e.g. `drwxr-xr-x`. For Windows, it's always `nil`

And the Unix only properties:

- `uid`: The user id of this file
- `gid`: The group id of this file

### File

Properties:

- `url`: The [Url](#url) of this file
- `cha`: The [Cha](#cha) of this file
- `link_to`: The [Url](#url) of this file pointing to, if it's a symlink; otherwise, `nil`
- `name`: The name of this file

### Icon

Properties:

- `text`: The text of this icon
- `style`: The [Style](#uistyle) of this icon

### Range

TODO

### Url

Create a Url:

```lua
-- regular file
local url = Url("/root/Downloads/logo.png")

-- `bgm.mp3` from the archive `ost.zip`
local url = Url("archive:///root/ost.zip#bgm.mp3")
```

Properties:

- `frag`: The fragment string of this url. Let's say the url `archive:///root/my-archive.zip#1.jpg`, the fragment `1.jpg`
- `is_regular`: Whether the file represented by this url is a regular file
- `is_search`: Whether the file represented by this url from the search result
- `is_archive`: Whether the file represented by this url from an archive

Meta methods:

- `__eq(another_url)`
- `__tostring()`
- `__concat(string)`

### Window

Properties:

- `rows`: The number of rows of this window
- `cols`: The number of columns of this window
- `width`: The width of this window in pixels
- `height`: The height of this window in pixels

## App data

You can access all app data through the `cx` within [Sync context](./overview#sync-context):

- `cx.active`: The active tab, which is a [tab::Tab](#tabtab)
- `cx.tabs`: All of tabs, which is a [manager::Tabs](#managertabs)
- `cx.tasks`: All of tasks, which is a [tasks::Tasks](#taskstasks)
- `cx.yanked`: The yanked urls, which is a [manager::Yanked](#manageryanked)

### `tab::Mode`

Visual mode status.

Properties:

- `is_select`: Whether the mode is select
- `is_unset`: Whether the mode is unset
- `is_visual`: Whether the mode is select or unset

Meta methods:

- `__tostring()`

### `tab::Config`

Properties:

- `sort_by`
- `sort_sensitive`
- `sort_reverse`
- `sort_dir_first`
- `linemode`
- `show_hidden`

These properties are consistent with those in [yazi.toml](../configuration/yazi.md), and will not be detailed here.

### `tab::Preview`

Properties:

- `skip` - The number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos.
- `folder` - The [folder::Folder](#folderfolder) being previewed, or `nil` if this preview is not for folders

### `folder::Folder`

Properties:

- `cwd` - The current working directory of this folder, which is a [Url](#url)
- `offset` - The offset of this folder, which is an integer
- `cursor` - The cursor position of this folder, which is an integer
- `window` - A table of [File](#file) in the visible area of this folder
- `files` - The [`folder::Files`](#folderfiles) of this folder
- `hovered` - The hovered [File](#file) of this folder, or `nil` if there is no hovered file

### `folder::Files`

Meta methods:

- `__len()`
- `__pairs()`

### `folder::File`

Based on [File](#file), with the following additional methods:

- `size()` - The size of this file, returns an integer representing the size in bytes, or `nil` if its a directory and it has not been scanned
- `mime()` - The mime-type string of this file
- `prefix()` - The prefix of this file relative to `CWD`, which used in the flat view during search. For instance, if `CWD` is `/foo`, and the file is `/foo/bar/baz`, then the prefix is `bar/`
- `icon()` - The [Icon](#icon) of this file, [`[icon]`](../configuration/theme#icons) rules are applied; if no rule matches, returns `nil`
- `style()` - The [Style](#uistyle) of this file, [`[filetype]`](../configuration/theme#filetype) rules are applied; if no rule matches, returns `nil`
- `is_hovered()` - Whether this file is hovered
- `is_yanked()` - Whether this file is yanked
- `is_selected()` - Whether this file is selected
- `found()` - When users find a file using the `find` command, the status of the file - returns `nil` if it doesn't match the user's find keyword; otherwise, returns `{idx, all}`, where `idx` is the position of matched file, and `all` represents the number of all matched files.
- `highlights()` - TODO

### `manager::Tabs`

Properties:

- `idx`: The index of the active tab

Meta methods:

- `__len()`
- `__index(idx)`

### `tab::Tab`

Properties:

- `mode`: The [tab::Mode](#tabmode) of this tab
- `conf`: The [tab::Config](#tabconfig) of this tab
- `parent`: The parent folder within this tab, which is a [folder::Folder](#folderfolder)
- `current`: The current folder within this tab, which is a [folder::Folder](#folderfolder)
- `preview`: The [tab::Preview](#tabpreview) within this tab

Methods:

- `name()`: The name of this tab

### `tasks::Tasks`

Properties:

- `progress`: The progress of all tasks, which is a table:

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

### `manager::Yanked`

```lua
for idx, url in pairs(cx.yanked) do
	-- ...
end
```

Meta methods:

- `__len()`
- `__pairs()`: Iterate over the yanked [Url](#url)s

Properties:

- `is_cut`: Whether the yanked urls are cut.
