---
sidebar_position: 5
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Tips

## Full border

You can implement a full border for Yazi via the UI plugin.

<img src={useBaseUrl("/img/full-border.png")} width="600" />

Copy the preset [`manager` component](https://github.com/sxyazi/yazi/blob/main/plugin/preset/components/manager.lua), then apply the following patch:

```diff
@@ -10,16 +10,26 @@ function Manager:render(area)
 		})
 		:split(area)

+	local bar = function(c, x, y)
+		return ui.Bar(ui.Rect { x = math.max(0, x), y = math.max(0, y), w = 1, h = 1 }, ui.Position.TOP):symbol(c)
+	end
+
 	return utils.flat {
-		-- Borders
-		ui.Bar(chunks[1], ui.Position.RIGHT):symbol(THEME.manager.border_symbol):style(THEME.manager.border_style),
-		ui.Bar(chunks[3], ui.Position.LEFT):symbol(THEME.manager.border_symbol):style(THEME.manager.border_style),
+		ui.Border(area, ui.Position.ALL),
+		ui.Bar(chunks[1], ui.Position.RIGHT),
+		ui.Bar(chunks[3], ui.Position.LEFT),
+
+		bar("┬", chunks[1].right - 1, chunks[1].y),
+		bar("┴", chunks[1].right - 1, chunks[1].bottom - 1),
+		bar("┬", chunks[2].right, chunks[2].y),
+		bar("┴", chunks[2].right, chunks[1].bottom - 1),

 		-- Parent
-		Folder:render(chunks[1]:padding(ui.Padding.x(1)), { kind = Folder.PARENT }),
+		Folder:render(chunks[1]:padding(ui.Padding.xy(1)), { kind = Folder.PARENT }),
 		-- Current
-		Folder:render(chunks[2], { kind = Folder.CURRENT }),
+		Folder:render(chunks[2]:padding(ui.Padding.y(1)), { kind = Folder.CURRENT }),
 		-- Preview
-		ui.Base(chunks[3]:padding(ui.Padding.x(1)), ui.Base.PREVIEW),
+		ui.Base(chunks[3]:padding(ui.Padding.xy(1)), ui.Base.PREVIEW),
 	}
 end
```

Then include it and adjust the manager layout offset:

```toml
# yazi.toml
[plugins]
preload = [
	"/path/to/your/manager.lua"
]

# theme.toml
[manager]
folder_offset  = [ 2, 0, 2, 0 ]
preview_offset = [ 2, 1, 2, 1 ]
```
