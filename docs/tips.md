---
sidebar_position: 7
description: A few helpful tips for using Yazi.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Tips

These tips require prior knowledge of the Yazi configuration file.

If you are using Yazi for the first time, please read our [configuration](/docs/configuration/overview) and [plugins](/docs/plugins/overview) documentation first.

## Full border

You can implement a full border for Yazi via the UI plugin.

<img src={useBaseUrl("/img/full-border.png")} width="600" />

Copy the [`Manager:render` method](https://github.com/sxyazi/yazi/blob/latest/yazi-plugin/preset/components/manager.lua) _*only*_ to your `~/.config/yazi/init.lua`, then apply the following patch:

```diff
@@ -18,16 +18,28 @@
function Manager:render(area)
	local chunks = self:layout(area)

+	local bar = function(c, x, y)
+		x, y = math.max(0, x), math.max(0, y)
+		return ui.Bar(ui.Rect { x = x, y = y, w = ya.clamp(0, area.w - x, 1), h = math.min(1, area.h) }, ui.Bar.TOP)
+			:symbol(c)
+	end
+
 	return ya.flat {
 		-- Borders
-		ui.Bar(chunks[1], ui.Bar.RIGHT):symbol(THEME.manager.border_symbol):style(THEME.manager.border_style),
-		ui.Bar(chunks[3], ui.Bar.LEFT):symbol(THEME.manager.border_symbol):style(THEME.manager.border_style),
+		ui.Border(area, ui.Border.ALL):type(ui.Border.ROUNDED),
+		ui.Bar(chunks[1], ui.Bar.RIGHT),
+		ui.Bar(chunks[3], ui.Bar.LEFT),

+		bar("┬", chunks[1].right - 1, chunks[1].y),
+		bar("┴", chunks[1].right - 1, chunks[1].bottom - 1),
+		bar("┬", chunks[2].right, chunks[2].y),
+		bar("┴", chunks[2].right, chunks[1].bottom - 1),
+
 		-- Parent
-		Parent:render(chunks[1]:padding(ui.Padding.x(1))),
+		Parent:render(chunks[1]:padding(ui.Padding.xy(1))),
 		-- Current
-		Current:render(chunks[2]),
+		Current:render(chunks[2]:padding(ui.Padding.y(1))),
 		-- Preview
-		Preview:render(chunks[3]:padding(ui.Padding.x(1))),
+		Preview:render(chunks[3]:padding(ui.Padding.xy(1))),
 	}
 end
```

If you prefer sharp corners for the border, you can remove `:type(ui.Border.ROUNDED)`.

## Dropping to the shell

Add this keybinding to your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = [ "<C-s>" ]
run  = 'shell "$SHELL" --block --confirm'
desc = "Open shell here"
```

## Close input by once `<Esc>` press

You can change the `<Esc>` of input component from the default `escape` to `close` command, in your `keymap.toml`:

```toml
[[input.prepend_keymap]]
on   = [ "<Esc>" ]
run  = "close"
desc = "Cancel input"
```

to exiting input directly, without entering Vi mode, making it behave like a regular input box.

## Smart enter: `enter` for directory, `open` for file

Save these lines as `~/.config/yazi/plugins/smart-enter.yazi/init.lua`:

```lua
return {
	entry = function()
		local h = cx.active.current.hovered
		ya.manager_emit(h and h.cha.is_dir and "enter" or "open", { hovered = true })
	end,
}
```

Then bind it for `l` key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = [ "l" ]
run  = "plugin --sync smart-enter"
desc = "Enter the child directory, or open the file"
```

## Drag and drop via [`dragon`](https://github.com/mwh/dragon)

Original post: https://github.com/sxyazi/yazi/discussions/327

```toml
[[manager.prepend_keymap]]
on  = [ "<C-n>" ]
run = '''
	shell 'dragon -x -i -T "$1"' --confirm
'''
```

## Copy selected files to the system clipboard while yanking

Yazi allows multiple commands to be bound to a single key, so you can set `y` to not only do the `yank` but also run a shell script:

```toml
[[manager.prepend_keymap]]
on  = [ "y" ]
run = [ "yank", '''
	shell --confirm 'echo "$@" | xclip -i -selection clipboard -t text/uri-list'
''' ]
```

The above is available on X11, there is also a Wayland version (Thanks [@hurutparittya for sharing this](https://discord.com/channels/1136203602898194542/1136203604076802092/1188498323867455619) in Yazi's discord server):

```toml
[[manager.prepend_keymap]]
on  = [ "y" ]
run = [ "yank", '''
	shell --confirm 'for path in "$@"; do echo "file://$path"; done | wl-copy -t text/uri-list'
''' ]
```

## File navigation wraparound

Save these lines as `~/.config/yazi/plugins/arrow.yazi/init.lua`:

```lua
return {
	entry = function(_, args)
		local current = cx.active.current
		local new = (current.cursor + args[1]) % #current.files
		ya.manager_emit("arrow", { new - current.cursor })
	end,
}
```

Then bind it for `k` and `j` key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = [ "k" ]
run = "plugin --sync arrow --args=-1"

[[manager.prepend_keymap]]
on  = [ "j" ]
run = "plugin --sync arrow --args=1"
```

## Navigation in the parent directory without leaving the CWD

Save these lines as `~/.config/yazi/plugins/parent-arrow.yazi/init.lua`:

```lua
local function entry(_, args)
	local parent = cx.active.parent
	if not parent then
		return
	end

	local target = parent.files[parent.cursor + 1 + args[1]]
	if target and target.cha.is_dir then
		ya.manager_emit("cd", { tostring(target.url) })
	end
end

return { entry = entry }
```

Then bind it for `K` and `J` key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = [ "K" ]
run = "plugin --sync parent-arrow --args=-1"

[[manager.prepend_keymap]]
on  = [ "J" ]
run = "plugin --sync parent-arrow --args=1"
```

## No status bar

<img src={useBaseUrl("/img/no-status-bar.jpg")} width="600" />

Add these lines to your `~/.config/yazi/init.lua`:

```lua
function Status:render() return {} end

local old_manager_render = Manager.render
function Manager:render(area)
	return old_manager_render(self, ui.Rect { x = area.x, y = area.y, w = area.w, h = area.h + 1 })
end
```

## Show symlink in status bar

<img src={useBaseUrl("/img/symlink-in-status.png")} width="600" />

Copy the [`Status:name()` method](https://github.com/sxyazi/yazi/blob/latest/yazi-plugin/preset/components/status.lua) _*only*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

```diff
@@ -42,7 +42,11 @@ function Status:name()
 		return ui.Span("")
 	end

-	return ui.Span(" " .. h.name)
+	local linked = ""
+	if h.link_to ~= nil then
+		linked = " -> " .. tostring(h.link_to)
+	end
+	return ui.Span(" " .. h.name .. linked)
 end
```

## Show user/group of files in status bar

<img src={useBaseUrl("/img/owner.png")} width="600" />

Copy the [`Status:render()` method](https://github.com/sxyazi/yazi/blob/latest/yazi-plugin/preset/components/status.lua) _*only*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

```diff
@@ -1,8 +1,22 @@
+function Status:owner()
+	local h = cx.active.current.hovered
+	if h == nil or ya.target_family() ~= "unix" then
+		return ui.Line {}
+	end
+
+	return ui.Line {
+		ui.Span(ya.user_name(h.cha.uid) or tostring(h.cha.uid)):fg("magenta"),
+		ui.Span(":"),
+		ui.Span(ya.group_name(h.cha.gid) or tostring(h.cha.gid)):fg("magenta"),
+		ui.Span(" "),
+	}
+end
+
 function Status:render(area)
 	self.area = area

 	local left = ui.Line { self:mode(), self:size(), self:name() }
-	local right = ui.Line { self:permissions(), self:percentage(), self:position() }
+	local right = ui.Line { self:owner(), self:permissions(), self:percentage(), self:position() }
 	return {
 		ui.Paragraph(area, { left }),
```

## Show username and hostname in header

<img src={useBaseUrl("/img/hostname-in-header.png")} width="600" />

Copy the [`Header:render()` method](https://github.com/sxyazi/yazi/blob/latest/yazi-plugin/preset/components/header.lua) _*only*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

```diff
@@ -76,11 +76,18 @@
 		:split(area)
 end

+function Header:host()
+	if ya.target_family() ~= "unix" then
+		return ui.Line {}
+	end
+	return ui.Span(ya.user_name() .. "@" .. ya.host_name() .. ":"):fg("blue")
+end
+
 function Header:render(area)
 	self.area = area

 	local right = ui.Line { self:count(), self:tabs() }
-	local left = ui.Line { self:cwd(math.max(0, area.w - right:width())) }
+	local left = ui.Line { self:host(), self:cwd(math.max(0, area.w - right:width())) }
 	return {
 		ui.Paragraph(area, { left }),
 		ui.Paragraph(area, { right }):align(ui.Paragraph.RIGHT),
```

## Make Yazi even faster than fast

While Yazi is already fast, there is still plenty of room for optimization for specific users or under certain conditions:

- For users who don't need image previews at all, disabling the default `image` previewer and preloader will make Yazi faster by reducing the I/O read file and CPU decode image consumption.
- For users managing network files, it's recommended to disable all previewers and preloaders since previewing and preloading these files means they need to be downloaded locally.
- For low-spec devices like Raspberry Pi, [reducing the concurrency](/docs/configuration/yazi#tasks) will make Yazi faster since the default configuration is optimized for PCs, and high concurrency on these low-spec devices may have the opposite effect.
- For users who don't need accurate mime-type, [`mime.yazi`](https://github.com/DreamMaoMao/mime.yazi) may be useful, as it simply returns mime-type based on file extensions, while Yazi defaults to obtaining mime-type based on file content for accuracy. Mime-type is used for matching opening, previewing, rendering rules. Encourage users to choose the appropriate `mime` plugin based on their needs, which is why we decided to open it up to plugin developers.
