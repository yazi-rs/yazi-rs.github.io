---
sidebar_position: 3
description: Learn how to access Yazi's sync context.
---

# Context

## cx {#cx}

You can access all states within [sync context](/docs/plugins/overview#sync-context) through `cx`.

### `active` {#cx.active}

The active tab.

|      |                        |
| ---- | ---------------------- |
| Type | [`tab::Tab`](#tab-tab) |

### `tabs` {#cx.tabs}

All of tabs.

|      |                          |
| ---- | ------------------------ |
| Type | [`mgr::Tabs`](#mgr-tabs) |

### `tasks` {#cx.tasks}

All of tasks.

|      |                                |
| ---- | ------------------------------ |
| Type | [`tasks::Tasks`](#tasks-tasks) |

### `yanked` {#cx.yanked}

Yanked files.

|      |                              |
| ---- | ---------------------------- |
| Type | [`mgr::Yanked`](#mgr-yanked) |

## tab::Mode {#tab-mode}

Visual mode status.

### `is_select` {#tab-mode.is_select}

Whether in select mode.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_unset` {#tab-mode.is_unset}

Whether in unset mode.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_visual` {#tab-mode.is_visual}

Whether in select mode, or unset mode.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `__tostring(self)` {#tab-mode.\_\_tostring}

Converts the mode to string.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `string` |

## tab::Pref {#tab-pref}

Tab-specific user preferences.

### `sort_by` {#tab-pref.sort_by}

File sorting method. See [`sort_by`](/docs/configuration/yazi#mgr.sort_by) for details.

|      |                                                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------------------------- |
| Type | `"none"` \| `"mtime"` \| `"btime"` \| `"extension"` \| `"alphabetical"` \| `"natural"` \| `"size"` \| `"random"` |

### `sort_sensitive` {#tab-pref.sort_sensitive}

Sort case-sensitively. See [`sort_sensitive`](/docs/configuration/yazi#mgr.sort_sensitive) for details.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `sort_reverse` {#tab-pref.sort_reverse}

Display files in reverse order. See [`sort_reverse`](/docs/configuration/yazi#mgr.sort_reverse) for details.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `sort_dir_first` {#tab-pref.sort_dir_first}

Display directories first. See [`sort_dir_first`](/docs/configuration/yazi#mgr.sort_dir_first) for details.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `sort_translit` {#tab-pref.sort_translit}

Transliterate filenames for sorting. See [`sort_translit`](/docs/configuration/yazi#mgr.sort_translit) for details.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `linemode` {#tab-pref.linemode}

Line mode. See [`linemode`](/docs/configuration/yazi#mgr.linemode) for details.

|      |                                                                                            |
| ---- | ------------------------------------------------------------------------------------------ |
| Type | `string` \| `"none"` \| `"size"` \| `"btime"` \| `"mtime"` \| `"permissions"` \| `"owner"` |

### `show_hidden` {#tab-pref.show_hidden}

Show hidden files. See [`show_hidden`](/docs/configuration/yazi#mgr.show_hidden) for details.

|      |           |
| ---- | --------- |
| Type | `boolean` |

## tab::Selected {#tab-selected}

[Url](#url)s of the selected files.

### `__len(self)` {#tab-selected.\_\_len}

Returns the number of selected [Url](#url)s.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `integer` |

### `__pairs(self)` {#tab-selected.\_\_pairs}

Iterate over the selected [Url](#url)s.

| In/Out | Type                                 |
| ------ | ------------------------------------ |
| `self` | `Self`                               |
| Return | `fun(t: self, k: any): integer, Url` |

## tab::Preview {#tab-preview}

State of the preview pane.

### `skip` {#tab-preview.skip}

Number of units to skip. The units largely depend on your previewer, such as lines for code and percentages for videos.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `folder` {#tab-preview.folder}

The folder being previewed, or `nil` if this preview is not for a folder.

|      |                               |
| ---- | ----------------------------- |
| Type | [`tab::Folder?`](#tab-folder) |

## tab::Folder {#tab-folder}

A folder.

### `cwd` {#tab-folder.cwd}

Current working directory.

|      |               |
| ---- | ------------- |
| Type | [`Url`](#url) |

### `offset` {#tab-folder.offset}

Offset of the folder.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `cursor` {#tab-folder.cursor}

Cursor position.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `window` {#tab-folder.window}

Files within the visible area.

|      |                          |
| ---- | ------------------------ |
| Type | [`fs::Files`](#fs-files) |

### `files` {#tab-folder.files}

All of the files in the folder.

|      |                          |
| ---- | ------------------------ |
| Type | [`fs::Files`](#fs-files) |

### `hovered` {#tab-folder.hovered}

Hovered file, or `nil` if no file is hovered.

|      |                         |
| ---- | ----------------------- |
| Type | [`fs::File?`](#fs-file) |

## fs::Files {#fs-files}

Files in a [`tab::Folder`](#tab-folder).

### `__len(self)` {#fs-files.\_\_len}

Returns the number of files in this folder.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `integer` |

### `__index(self, idx)` {#fs-files.\_\_index}

Access each file by index.

| In/Out | Type                    |
| ------ | ----------------------- |
| `self` | `Self`                  |
| `idx`  | `integer`               |
| Return | [`fs::File?`](#fs-file) |

## fs::File {#fs-file}

A file lives in the current context, which inherits from [`File`](/docs/plugins/types#file) but has many more context-specific properties and methods.

|         |                                    |                                  |
| ------- | ---------------------------------- | -------------------------------- |
| Inherit | [`File`](/docs/plugins/types#file) | To access basic file attributes. |

### `is_hovered` {#fs-file.is_hovered}

Whether the file is hovered.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `size(self)` {#fs-file.size}

Size of the file in bytes, or `nil` if it's a directory yet not been evaluated.

| In/Out | Type       |
| ------ | ---------- |
| `self` | `Self`     |
| Return | `integer?` |

### `mime(self)` {#fs-file.mime}

Mimetype of the file, or `nil` if it's a directory or hasn't been lazily calculated.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `string?` |

### `prefix(self)` {#fs-file.prefix}

Prefix of the file relative to `CWD`, which used in the flat view during search.

For instance, if `CWD` is `/foo`, and the file is `/foo/bar/baz`, then the prefix is `bar/`.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `string?` |

### `icon(self)` {#fs-file.icon}

Icon of the file, or `nil` if no [`[icon]`](/docs/configuration/theme#icon) rules match.

| In/Out | Type    |
| ------ | ------- |
| `self` | `Self`  |
| Return | `Icon?` |

### `style(self)` {#fs-file.style}

Style of the file, or `nil` if no [`[filetype]`](/docs/configuration/theme#filetype) rules match.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `Style?` |

### `is_yanked(self)` {#fs-file.is_yanked}

Whether the file is yanked.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `boolean` |

### `is_selected(self)` {#fs-file.is_selected}

Whether the file is selected.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `boolean` |

### `found(self)` {#fs-file.found}

File find status:

- `nil` if if the user not in [`find`](/docs/configuration/keymap#mgr.find) mode.
- `nil` if current file is not related to the keyword entered by the user.
- `integer, integer` if current file is one of the files found, where first is its index among the results and second is the total count of files found.

| In/Out | Type                 |
| ------ | -------------------- |
| `self` | `Self`               |
| Return | `integer?, integer?` |

## mgr::Tabs {#mgr-tabs}

All of tabs.

### `idx` {#mgr-tabs.idx}

Index of the active tab.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `__len(self)` {#mgr-tabs.\_\_len}

Returns the number of tabs.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `integer` |

### `__index(self, idx)` {#mgr-tabs.\_\_index}

Access each tab by index.

| In/Out | Type                    |
| ------ | ----------------------- |
| `self` | `Self`                  |
| `idx`  | `integer`               |
| Return | [`tab::Tab?`](#tab-tab) |

## tab::Tab {#tab-tab}

A tab.

### `name` {#tab-tab.name}

Name of the tab.

|      |          |
| ---- | -------- |
| Type | `string` |

### `mode` {#tab-tab.mode}

Mode of the tab.

|      |                          |
| ---- | ------------------------ |
| Type | [`tab::Mode`](#tab-mode) |

### `pref` {#tab-tab.pref}

Preference of the tab.

|      |                          |
| ---- | ------------------------ |
| Type | [`tab::Pref`](#tab-pref) |

### `current` {#tab-tab.current}

Current working folder.

|      |                              |
| ---- | ---------------------------- |
| Type | [`tab::Folder`](#tab-folder) |

### `parent` {#tab-tab.parent}

Parent folder of the `CWD`, or `nil` if no parent folder exists.

|      |                               |
| ---- | ----------------------------- |
| Type | [`tab::Folder?`](#tab-folder) |

### `selected` {#tab-tab.selected}

Selected files within the tab.

|      |                                  |
| ---- | -------------------------------- |
| Type | [`tab::Selected`](#tab-selected) |

### `preview` {#tab-tab.preview}

Preview of the tab.

|      |                                |
| ---- | ------------------------------ |
| Type | [`tab::Preview`](#tab-preview) |

## tasks::Tasks {#tasks-tasks}

### `progress` {#tasks-tasks.progress}

Progress of all tasks:

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

|      |                                                                                        |
| ---- | -------------------------------------------------------------------------------------- |
| Type | `{ total: integer, succ: integer, fail: integer, found: integer, processed: integer }` |

## mgr::Yanked {#mgr-yanked}

Yanked files.

### `is_cut` {#mgr-yanked.is_cut}

Whether in cut mode.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `__len(self)` {#mgr-yanked.\_\_len}

Returns the number of yanked files.

| In/Out | Type      |
| ------ | --------- |
| `self` | `Self`    |
| Return | `integer` |

### `__pairs(self)` {#mgr-yanked.\_\_pairs}

Iterate over the url of yanked files.

| In/Out | Type                                 |
| ------ | ------------------------------------ |
| `self` | `Self`                               |
| Return | `fun(t: self, k: any): integer, Url` |
