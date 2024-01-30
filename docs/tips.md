---
sidebar_position: 5
description: A few helpful tips for using Yazi.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Tips

## Full border

You can implement a full border for Yazi via the UI plugin.

<img src={useBaseUrl("/img/full-border.png")} width="600" />

Copy the preset [`Manager:render` function](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/manager.lua) to your `~/.config/yazi/init.lua`, then apply the following patch:

```diff
@@ -10,16 +10,28 @@
 		})
 		:split(area)

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

Add the keybindings to your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = [ "<C-s>" ]
exec = 'shell "$SHELL" --block --confirm'
desc = "Open shell here"
```

## Close input by once `<Esc>` press

You can change the `<Esc>` of input component from the default `escape` to `close` command, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = [ "<Esc>" ]
exec = "close"
desc = "Cancel input"
```

to exiting input directly, without entering Vi mode, making it behave like a regular input box.

## Smart enter: `enter` for directory, `open` for file

Save these lines as `~/.config/yazi/plugins/smart-enter.yazi/init.lua`:

```lua
return {
	entry = function()
		local h = cx.active.current.hovered
		ya.manager_emit(h and h.cha.is_dir and "enter" or "open", {})
	end,
}
```

Then bind it for `l` key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = [ "l" ]
exec = "plugin --sync smart-enter"
desc = "Enter the child directory, or open the file"
```

## Drag and drop via [`dragon`](https://github.com/mwh/dragon)

Original post: https://github.com/sxyazi/yazi/discussions/327

```toml
[[manager.prepend_keymap]]
on   = [ "<C-n>" ]
exec = '''
	shell 'dragon -x -i -T "$1"' --confirm
'''
```

## Copy selected files to the system clipboard while yanking

Yazi allows multiple commands to be bound to a single key, so you can set `y` to not only do the `yank` but also execute a shell script:

```toml
[[manager.prepend_keymap]]
on   = [ "y" ]
exec = [ "yank", '''
	shell --confirm 'echo "$@" | xclip -i -selection clipboard -t text/uri-list'
''' ]
```

The above is available on X11, there is also a Wayland version (Thanks [@hurutparittya for sharing this](https://discord.com/channels/1136203602898194542/1136203604076802092/1188498323867455619) in Yazi's discord server):

```toml
[[manager.prepend_keymap]]
on   = [ "y" ]
exec = [ "yank", '''
	shell --confirm 'for path in "$@"; do echo "file://$path"; done | wl-copy -t text/uri-list'
''' ]
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

You can rewrite the [`Status:name()` method](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/status.lua) to achieve this feature,
copy _*only this method*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

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

You can rewrite the [`Status:render()` method](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/status.lua) to achieve this feature,
copy _*only this method*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

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
 	local progress = self:progress(area, right:width())
 	return {
 		ui.Paragraph(area, { left }),
```

## Show username and hostname in header

<img src={useBaseUrl("/img/hostname-in-header.png")} width="600" />

You can rewrite the [`Header:render()` method](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/header.lua) to achieve this feature,
copy _*only this method*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

```diff
@@ -1,3 +1,10 @@
+function Header:host()
+	if ya.target_family() ~= "unix" then
+		return ui.Line {}
+	end
+	return ui.Span(ya.user_name() .. "@" .. ya.host_name() .. ":"):fg("blue")
+end
+
 function Header:render(area)
 	self.area = area

@@ -6,7 +13,7 @@
 		:constraints({ ui.Constraint.Percentage(50), ui.Constraint.Percentage(50) })
 		:split(area)

-	local left = ui.Line { self:cwd() }
+	local left = ui.Line { self:host(), self:cwd() }
 	local right = ui.Line { self:tabs() }
 	return {
 		ui.Paragraph(chunks[1], { left }),
```
