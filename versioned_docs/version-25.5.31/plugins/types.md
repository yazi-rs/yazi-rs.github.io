---
sidebar_position: 1
description: Learn how to use Yazi's Lua API.
---

# Types

## Url {#url}

Create a Url:

```lua
-- regular file
local url = Url("/root/Downloads/logo.png")

-- `bgm.mp3` from the archive `ost.zip`
local url = Url("archive:///root/ost.zip#bgm.mp3")
```

### `name` {#url.name}

Filename of the url.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `stem` {#url.stem}

Filename without the extension.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `frag` {#url.frag}

Url fragment.

Let's say the url `archive:///root/my-archive.zip#1.jpg`, the fragment `1.jpg`.

|      |           |
| ---- | --------- |
| Type | `string?` |

### `parent` {#url.parent}

Parent directory.

|      |         |
| ---- | ------- |
| Type | `Self?` |

### `is_regular` {#url.is_regular}

Whether the file represented by the url is a regular file.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_search`

Whether the file represented by the url is from a search result.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_archive` {#url.is_archive}

Whether the file represented by the url is from an archive.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `is_absolute`

Whether the path represented by the url is absolute.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `has_root` {#url.has_root}

Whether the path represented by the url has a root.

|      |           |
| ---- | --------- |
| Type | `boolean` |

### `join(self, another)` {#url.join}

Join with `another` to create a new url.

| In/Out    | Type               |
| --------- | ------------------ |
| `self`    | `Self`             |
| `another` | `Self` \| `string` |
| Return    | `Self`             |

### `starts_with(self, another)` {#url.starts_with}

Whether the url starts with `another`.

| In/Out    | Type               |
| --------- | ------------------ |
| `self`    | `Self`             |
| `another` | `Self` \| `string` |
| Return    | `boolean`          |

### `ends_with(self, another)` {#url.ends_with}

Whether the url ends with `another`.

| In/Out    | Type               |
| --------- | ------------------ |
| `self`    | `Self`             |
| `another` | `Self` \| `string` |
| Return    | `boolean`          |

### `strip_prefix(self, another)` {#url.strip_prefix}

Strips the prefix of `another`.

| In/Out    | Type               |
| --------- | ------------------ |
| `self`    | `Self`             |
| `another` | `Self` \| `string` |
| Return    | `Self`             |

### `__eq(self, another)` {#url.\_\_eq}

Whether the url is equal to `another`.

| In/Out    | Type      |
| --------- | --------- |
| `self`    | `Self`    |
| `another` | `Self`    |
| Return    | `boolean` |

### `__tostring(self)` {#url.\_\_tostring}

Convert the url to string.

| In/Out | Type     |
| ------ | -------- |
| `self` | `Self`   |
| Return | `string` |

### `__concat(self, another)` {#url.\_\_concat}

Concatenate the url with `another`.

| In/Out    | Type     |
| --------- | -------- |
| `self`    | `Self`   |
| `another` | `string` |
| Return    | `Self`   |

### `__new(value)` {#url.\_\_new}

Make a new url.

| In/Out  | Type               |
| ------- | ------------------ |
| `value` | `string` \| `Self` |
| Return  | `Self`             |

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

Whether the file is dummy, which fails to load complete metadata, possibly the filesystem doesn't support it, such as FUSE.

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

Url of the file.

|      |       |
| ---- | ----- |
| Type | `Url` |

### `cha` {#file.cha}

Cha of the file.

|      |       |
| ---- | ----- |
| Type | `Cha` |

### `link_to` {#file.link_to}

Url of the file points to, if it's a symlink.

|      |        |
| ---- | ------ |
| Type | `Url?` |

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

### `__concat(self, another)` {#error.\_\_concat}

Concatenate the error with `another`.

| In/Out    | Type     |
| --------- | -------- |
| `self`    | `Self`   |
| `another` | `string` |
| Return    | `Error`  |

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
