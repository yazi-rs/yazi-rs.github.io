---
sidebar_position: 9
description: A few helpful tips for using Yazi.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Tips

These tips require prior knowledge of the Yazi configuration file.

If you are using Yazi for the first time, please read our [configuration](/docs/configuration/overview) and [plugins](/docs/plugins/overview) documentation first.

## Full border {#full-border}

<img src={useBaseUrl("/img/full-border.png")} width="600" />

Moved to https://github.com/yazi-rs/plugins/tree/main/full-border.yazi

## Dropping to the shell {#dropping-to-shell}

Add this keybinding to your `keymap.toml`:

<Tabs>
  <TabItem value="unix" label="Unix" default>

```toml
[[manager.prepend_keymap]]
on   = "!"
run  = 'shell "$SHELL" --block --confirm'
desc = "Open shell here"
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```toml
[[manager.prepend_keymap]]
on   = "<C-s>"
run  = 'shell "powershell.exe" --block --confirm'
desc = "Open PowerShell here"
```

  </TabItem>
</Tabs>

## Close input by once <kbd>Esc</kbd> press {#close-input-by-esc}

You can change the <kbd>Esc</kbd> of input component from the default `escape` to `close` command, in your `keymap.toml`:

```toml
[[input.prepend_keymap]]
on   = "<Esc>"
run  = "close"
desc = "Cancel input"
```

to exiting input directly, without entering Vi mode, making it behave like a regular input box.

## Smart enter: `enter` for directory, `open` for file {#smart-enter}

Save these lines as `~/.config/yazi/plugins/smart-enter.yazi/init.lua`:

```lua
return {
	entry = function()
		local h = cx.active.current.hovered
		ya.manager_emit(h and h.cha.is_dir and "enter" or "open", { hovered = true })
	end,
}
```

Then bind it for <kbd>l</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = "l"
run  = "plugin --sync smart-enter"
desc = "Enter the child directory, or open the file"
```

This plugin adds `hovered = true` to make the behavior of [open](/docs/configuration/keymap#manager.open) consistent with [enter](/docs/configuration/keymap#manager.enter) avoiding accidental triggers,
which means both will only target the currently hovered file. If you still want `open` to target multiple selected files, set it to `false`.

## Smart paste: `paste` files without entering the directory {#smart-paste}

Save these lines as `~/.config/yazi/plugins/smart-paste.yazi/init.lua`:

```lua
return {
	entry = function()
		local h = cx.active.current.hovered
		if h and h.cha.is_dir then
			ya.manager_emit("enter", {})
			ya.manager_emit("paste", {})
			ya.manager_emit("leave", {})
		else
			ya.manager_emit("paste", {})
		end
	end,
}
```

Then bind it for <kbd>p</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = "p"
run  = "plugin --sync smart-paste"
desc = "Paste into the hovered directory or CWD"
```

<details>
  <summary>Demonstrate smart paste</summary>
	<p>Original post: https://github.com/sxyazi/yazi/discussions/957#discussioncomment-9239519</p>
	<video src="https://github.com/sxyazi/yazi/assets/17523360/080212b5-43e7-4c36-83e8-312495d50383" width="100%" controls muted></video>
</details>

## Drag and drop via [`dragon`](https://github.com/mwh/dragon) {#drag-and-drop}

Original post: https://github.com/sxyazi/yazi/discussions/327

```toml
[[manager.prepend_keymap]]
on  = "<C-n>"
run = '''
	shell 'dragon -x -i -T "$1"' --confirm
'''
```

## Copy selected files to the system clipboard while yanking {#selected-files-to-clipboard}

Yazi allows multiple commands to be bound to a single key, so you can set <kbd>y</kbd> to not only do the `yank` but also run a shell script:

```toml
[[manager.prepend_keymap]]
on  = "y"
run = [ '''
	shell 'echo "$@" | xclip -i -selection clipboard -t text/uri-list' --confirm
''', "yank" ]
```

The above is available on X11, there is also a Wayland version (Thanks [@hurutparittya for sharing this](https://discord.com/channels/1136203602898194542/1136203604076802092/1188498323867455619) in Yazi's discord server):

```toml
[[manager.prepend_keymap]]
on  = "y"
run = [ '''
	shell 'for path in "$@"; do echo "file://$path"; done | wl-copy -t text/uri-list' --confirm
''', "yank" ]
```

## `cd` back to the root of the current Git repository {#cd-to-git-root}

```toml
[[manager.prepend_keymap]]
on = [ "g", "r" ]
run = '''
	shell 'ya pub dds-cd --str "$(git rev-parse --show-toplevel)"' --confirm
'''
```

Credits to [@aidanzhai for sharing it](https://t.me/yazi_rs/3325/15373) in Yazi's telegram group.

## Maximize preview pane {#max-preview}

Moved to https://github.com/yazi-rs/plugins/tree/main/max-preview.yazi

## Hide preview pane {#hide-preview}

Moved to https://github.com/yazi-rs/plugins/tree/main/hide-preview.yazi

## File navigation wraparound {#navigation-wraparound}

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

Then bind it for <kbd>k</kbd> and <kbd>j</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = "k"
run = "plugin --sync arrow --args=-1"

[[manager.prepend_keymap]]
on  = "j"
run = "plugin --sync arrow --args=1"
```

## Navigation in the parent directory without leaving the CWD {#parent-arrow}

Save these lines as `~/.config/yazi/plugins/parent-arrow.yazi/init.lua`:

<Tabs>
  <TabItem value="classic" label="Classic" default>

```lua
local function entry(_, args)
	local parent = cx.active.parent
	if not parent then return end

	local target = parent.files[parent.cursor + 1 + args[1]]
	if target and target.cha.is_dir then
		ya.manager_emit("cd", { target.url })
	end
end

return { entry = entry }
```

  </TabItem>
  <TabItem value="skip-files" label="Skip files">

```lua
local function entry(_, args)
	local parent = cx.active.parent
	if not parent then return end

	local offset = tonumber(args[1])
	if not offset then return ya.err(args[1], 'is not a number') end

	local start = parent.cursor + 1 + offset
	local end_ = offset < 0 and 1 or #parent.files
	local step = offset < 0 and -1 or 1
	for i = start, end_, step do
		local target = parent.files[i]
		if target and target.cha.is_dir then
			return ya.manager_emit("cd", { target.url })
		end
	end
end

return { entry = entry }
```

  </TabItem>
</Tabs>

Then bind it for <kbd>K</kbd> and <kbd>J</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = "K"
run = "plugin --sync parent-arrow --args=-1"

[[manager.prepend_keymap]]
on  = "J"
run = "plugin --sync parent-arrow --args=1"
```

## No status bar {#no-status-bar}

<img src={useBaseUrl("/img/no-status-bar.jpg")} width="600" />

Moved to https://github.com/yazi-rs/plugins/tree/main/no-status.yazi

## Show symlink in status bar {#symlink-in-status}

<img src={useBaseUrl("/img/symlink-in-status.png")} width="600" />

Copy the [`Status:name()` method](https://github.com/sxyazi/yazi/blob/shipped/yazi-plugin/preset/components/status.lua) _*only*_ to your `~/.config/yazi/init.lua`, and apply the following patch:

```diff
@@ -65,7 +65,11 @@ function Status:name()
 		return ui.Line {}
 	end

-	return ui.Line(" " .. h.name)
+	local linked = ""
+	if h.link_to ~= nil then
+		linked = " -> " .. tostring(h.link_to)
+	end
+	return ui.Line(" " .. h.name .. linked)
 end
```

## Show user/group of files in status bar {#user-group-in-status}

<img src={useBaseUrl("/img/owner.png")} width="600" />

Add the following code to your `~/.config/yazi/init.lua`:

```lua
Status:children_add(function()
	local h = cx.active.current.hovered
	if h == nil or ya.target_family() ~= "unix" then
		return ui.Line {}
	end

	return ui.Line {
		ui.Span(ya.user_name(h.cha.uid) or tostring(h.cha.uid)):fg("magenta"),
		ui.Span(":"),
		ui.Span(ya.group_name(h.cha.gid) or tostring(h.cha.gid)):fg("magenta"),
		ui.Span(" "),
	}
end, 500, Status.RIGHT)
```

## Show username and hostname in header {#username-hostname-in-header}

<img src={useBaseUrl("/img/hostname-in-header.png")} width="600" />

Add the following code to your `~/.config/yazi/init.lua`:

```lua
Header:children_add(function()
	if ya.target_family() ~= "unix" then
		return ui.Line {}
	end
	return ui.Span(ya.user_name() .. "@" .. ya.host_name() .. ":"):fg("blue")
end, 500, Header.LEFT)
```

## File tree picker in Helix with Zellij {#helix-with-zellij}

Yazi can be used as a file picker to browse and open file(s) in your current Helix instance (running in a Zellij session).

Add a keymap to your Helix config, for example <kbd>Ctrl</kbd> + <kbd>y</kbd>:

```toml
# ~/.config/helix/config.toml
[keys.normal]
C-y = ":sh zellij run -f -x 10% -y 10% --width 80% --height 80% -- bash ~/.config/helix/yazi-picker.sh"
```

Then save the following script as `~/.config/helix/yazi-picker.sh`:

```sh
#!/usr/bin/env bash

paths=$(yazi --chooser-file=/dev/stdout | while read -r; do printf "%q " "$REPLY"; done)

if [[ -n "$paths" ]]; then
	zellij action toggle-floating-panes
	zellij action write 27 # send <Escape> key
	zellij action write-chars ":open $paths"
	zellij action write 13 # send <Enter> key
	zellij action toggle-floating-panes
fi

zellij action close-pane
```

Note: this uses a floating window, but you should also be able to open a new pane to the side, or in place. Review the Zellij documentation for more info.

Original post: https://github.com/zellij-org/zellij/issues/3018#issuecomment-2086166900, credits to [@rockboynton](https://github.com/rockboynton) and [@postsolar](https://github.com/postsolar) for sharing and polishing it!

<details>
  <summary>Demonstrate Helix+Zellij+Yazi workflow</summary>
	<video src="https://github.com/helix-editor/helix/assets/17523360/a4dde9e0-96bf-42a4-b946-40cbee984e69" width="100%" controls muted></video>
</details>

## Make Yazi even faster than fast {#make-yazi-even-faster}

While Yazi is already fast, there is still plenty of room for optimization for specific users or under certain conditions:

- For users who don't need image previews at all, disabling the default `image` previewer and preloader will make Yazi faster by reducing the I/O read file and CPU decode image consumption.
- For users managing network files, it's recommended to disable all previewers and preloaders since previewing and preloading these files means they need to be downloaded locally.
- For low-spec devices like Raspberry Pi, [reducing the concurrency](/docs/configuration/yazi#tasks) will make Yazi faster since the default configuration is optimized for PCs, and high concurrency on these low-spec devices may have the opposite effect.
- For users who don't need accurate mime-type, [`mime-ext.yazi`](https://github.com/yazi-rs/plugins/tree/main/mime-ext.yazi) may be useful, as it simply returns mime-type based on file extensions, while Yazi defaults to obtaining mime-type based on file content for accuracy. Mime-type is used for matching opening, previewing, rendering rules. Encourage users to choose an appropriate `mime` plugin based on their needs, which is why we decided to open it up to plugin developers.
- For high-performance terminal emulators, lowering the [`image_delay` option](/docs/configuration/yazi/#preview.image_delay) or setting it to 0 can reduce image preview latency.
