---
sidebar_position: 1
description: Learn how to use Yazi's Lua API.
---

# Types

## Url {#url}

Create a URL:

```lua
-- regular file
local url = Url("/root/Downloads/logo.png")

-- `/root/dog.jpg` on `my-server` via SFTP
local url = Url("sftp://my-server//root/dog.jpg")
```

### `path` {#url.path}

[`Path`](#path) portion of the URL.

For the URL `sftp://my-server//path/to/file`, the path is `/path/to/file`.

|      |        |
| ---- | ------ |
| Type | `Path` |

### `name` {#url.name}

Filename of the URL.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `stem` {#url.stem}

Filename without the extension.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `ext` {#url.ext}

The extension of the file.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `parent` {#url.parent}

Parent directory.

|      |         |
| ---- | ------- |
| Type | `Self?` |

### `base` {#url.base}

The base directory of the URL.

|      |         |
| ---- | ------- |
| Type | `Self?` |

### `domain` {#url.domain}

The domain of the URL, most relevant for remote and virtual file systems.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `is_regular` {#url.is_regular}

Whether the file represented by the URL is a regular file.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_search`

Whether the file represented by the URL is from a search result.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_archive` {#url.is_archive}

Whether the file represented by the URL is from an archive.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_absolute`

Whether the path represented by the URL is absolute.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `has_root` {#url.has_root}

Whether the path represented by the URL has a root.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `join(self, other)` {#url.join}

Join with `other` to create a new URL.

| In/Out  | Type               |
| ------- | ------------------ |
| `self`  | `Self`             |
| `other` | `Self` \| `string` |
| Return  | `Self`             |

### `starts_with(self, base)` {#url.starts_with}

Whether the URL starts with `base`.

| In/Out | Type               |
| ------ | ------------------ |
| `self` | `Self`             |
| `base` | `Self` \| `string` |
| Return | `boolean`          |

### `ends_with(self, base)` {#url.ends_with}

Whether the URL ends with `base`.

| In/Out | Type               |
| ------ | ------------------ |
| `self` | `Self`             |
| `base` | `Self` \| `string` |
| Return | `boolean`          |

### `strip_prefix(self, base)` {#url.strip_prefix}

Strips the prefix of `base`.

| In/Out | Type               |
| ------ | ------------------ |
| `self` | `Self`             |
| `base` | `Self` \| `string` |
| Return | `Path`             |

### `__eq(self, other)` {#url.\_\_eq}

Whether the URL is equal to `other`.

| In/Out  | Type      |
| ------- | --------- |
| `self`  | `Self`    |
| `other` | `Self`    |
| Return  | `boolean` |

### `__tostring(self)` {#url.\_\_tostring}

Convert the URL to string.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `string` |

### `__concat(self, other)` {#url.\_\_concat}

Concatenate the URL with `other`.

| In/Out  | Type     |
| ------- | -------- |
| `self`  | `Self`   |
| `other` | `string` |
| Return  | `Self`   |

### `__new(value)` {#url.\_\_new}

Make a new URL.

| In/Out  | Type               |
| ------- | ------------------ |
| `value` | `string` \| `Self` |
| Return  | `Self`             |

## Path {#path}

`Path` is the path portion of a [`Url`](#url).

For the URL `sftp://my-server//path/to/file`, the path is `/path/to/file`.

### `name` {#path.name}

Filename of the path.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `stem` {#path.stem}

Filename without the extension.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `parent` {#path.parent}

Parent directory.

|      |         |
| ---- | ------- |
| Type | `Self?` |

### `is_absolute`

Whether the path is absolute.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `has_root` {#path.has_root}

Whether the path has a root.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `join(self, other)` {#path.join}

Join with `other` to create a new path.

| In/Out  | Type               |
| ------- | ------------------ |
| `self`  | `Self`             |
| `other` | `Self` \| `string` |
| Return  | `Self`             |

### `starts_with(self, base)` {#path.starts_with}

Whether the path starts with `base`.

| In/Out | Type               |
| ------ | ------------------ |
| `self` | `Self`             |
| `base` | `Self` \| `string` |
| Return | `boolean`          |

### `ends_with(self, base)` {#path.ends_with}

Whether the path ends with `base`.

| In/Out | Type               |
| ------ | ------------------ |
| `self` | `Self`             |
| `base` | `Self` \| `string` |
| Return | `boolean`          |

### `strip_prefix(self, base)` {#path.strip_prefix}

Strips the prefix of `base`.

| In/Out | Type               |
| ------ | ------------------ |
| `self` | `Self`             |
| `base` | `Self` \| `string` |
| Return | `Self`             |

### `__eq(self, other)` {#path.\_\_eq}

Whether the path is equal to `other`.

| In/Out  | Type      |
| ------- | --------- |
| `self`  | `Self`    |
| `other` | `Self`    |
| Return  | `boolean` |

### `__tostring(self)` {#path.\_\_tostring}

Convert the path to string.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `string` |

### `__concat(self, other)` {#path.\_\_concat}

Concatenate the path with `other`.

| In/Out  | Type     |
| ------- | -------- |
| `self`  | `Self`   |
| `other` | `string` |
| Return  | `Self`   |

## Cha {#cha}

One file's characteristics.

### `is_dir` {#cha.is_dir}

Whether the file is a directory.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_hidden` {#cha.is_hidden}

Whether the file is hidden.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_link` {#cha.is_link}

Whether the file is a symlink.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_orphan` {#cha.is_orphan}

Whether the file is a bad symlink, which points to a non-existent file.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_dummy` {#cha.is_dummy}

Whether the file is dummy, which fails to load complete metadata. It could be due to the file system not supporting it, such as FUSE.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_block` {#cha.is_block}

Whether the file is a block device.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_char` {#cha.is_char}

Whether the file is a character device.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_fifo` {#cha.is_fifo}

Whether the file is a FIFO.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_sock` {#cha.is_sock}

Whether the file is a socket.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_exec` {#cha.is_exec}

Whether the file is executable.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_sticky` {#cha.is_sticky}

Whether the file has the sticky bit set.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `len` {#cha.len}

Length of the file in bytes.

If you want to get the size of a directory, use [`size()`](/docs/plugins/context#fs-file.size) instead.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `atime` {#cha.atime}

Accessed time of the file in Unix timestamp.

|      |            |
| ---- | ---------- |
| Type | `integer?` |

### `btime` {#cha.btime}

Birth time of the file in Unix timestamp.

|      |            |
| ---- | ---------- |
| Type | `integer?` |

### `mtime` {#cha.mtime}

Modified time of the file in Unix timestamp.

|      |            |
| ---- | ---------- |
| Type | `integer?` |

### `uid` {#cha.uid}

User id of the file.

|           |                        |
| --------- | ---------------------- |
| Type      | `integer?`             |
| Available | Unix-like systems only |

### `gid` {#cha.gid}

Group id of the file.

|           |                        |
| --------- | ---------------------- |
| Type      | `integer?`             |
| Available | Unix-like systems only |

### `nlink` {#cha.nlink}

Number of hard links to the file.

|           |                        |
| --------- | ---------------------- |
| Type      | `integer?`             |
| Available | Unix-like systems only |

### `perm(self)` {#cha.perm}

Unix permission representation, such as `drwxr-xr-x`.

|           |                        |
| --------- | ---------------------- |
| Type      | `string?`              |
| Available | Unix-like systems only |

## File {#file}

A bare file without any context information. See also [`fs::File`](/docs/plugins/context#fs-file).

### `url` {#file.url}

URL of the file.

|      |       |
| ---- | ----- |
| Type | `Url` |

### `cha` {#file.cha}

Cha of the file.

|      |       |
| ---- | ----- |
| Type | `Cha` |

### `link_to` {#file.link_to}

Path of the file points to, if it's a symlink.

|      |         |
| ---- | ------- |
| Type | `Path?` |

### `name` {#file.name}

Name of the file.

|      |          |
| ---- | -------- |
| Type | `string` |

## Icon {#icon}

An icon.

### `text` {#icon.text}

Text of the icon.

|      |          |
| ---- | -------- |
| Type | `string` |

### `style` {#icon.style}

[Style](/docs/plugins/layout#style) of the icon.

|      |         |
| ---- | ------- |
| Type | `Style` |

## Error {#error}

An error.

### `code` {#error.code}

Raw error code.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `__tostring(self)` {#error.\_\_tostring}

Convert the error to string.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `string` |

### `__concat(self, other)` {#error.\_\_concat}

Concatenate the error with `other`.

| In/Out  | Type     |
| ------- | -------- |
| `self`  | `Self`   |
| `other` | `string` |
| Return  | `Error`  |

## Window {#window}

### `rows` {#window.rows}

Number of rows.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `cols` {#window.cols}

Number of columns.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `width` {#window.width}

Width in pixels.

|      |           |
| ---- | --------- |
| Type | `integer` |

### `height` {#window.height}

Height in pixels.

|      |           |
| ---- | --------- |
| Type | `integer` |
