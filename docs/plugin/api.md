---
sidebar_position: 1
description: Learn how to use Yazi's Lua API.
---

# API (Work in progress)

## Layout

### `ui.Bar`

Create a bar:

```lua
ui.Bar(rect, direction)
```

The first attribute is a [Rect](#uirect), representing the position of this bar.
The second denotes the direction of the bar and accepts the following constants:

- `ui.Bar.NONE`
- `ui.Bar.TOP`
- `ui.Bar.RIGHT`
- `ui.Bar.BOTTOM`
- `ui.Bar.LEFT`
- `ui.Bar.ALL`

Methods:

- `ui.Bar:symbol(symbol)` - accepts a string, specifying the symbol for the bar
- `ui.Bar:style(style)` - accepts a [Style](#uistyle), specifying the style of the bar

### `ui.Border`

Create a border:

```lua
ui.Border(rect, position)
```

The first attribute is a [Rect](#uirect), representing the position of this border.
The second denotes the position of the border and accepts the following constants:

- `ui.Border.NONE`
- `ui.Border.TOP`
- `ui.Border.RIGHT`
- `ui.Border.BOTTOM`
- `ui.Border.LEFT`
- `ui.Border.ALL`

You can also use `ui.Border:type(type)` to specify different types for the border. It accepts the following type constants:

- `ui.Border.PLAIN`
- `ui.Border.ROUNDED`
- `ui.Border.DOUBLE`
- `ui.Border.THICK`
- `ui.Border.QUADRANT_INSIDE`
- `ui.Border.QUADRANT_OUTSIDE`

Methods:

- `ui.Border:style(style)` - accepts a [Style](#uistyle), specifying the style of the border

### `ui.Constraint`

Constraints are used to define the size of a layout. They can be used to define a fixed size, a
percentage of the available space, a ratio of the available space, or a minimum or maximum size.

```lua
ui.Constraint.Percentage(50) -- Apply a percentage to a given amount
ui.Constraint.Ratio(1, 3)    -- Apply a ratio
ui.Constraint.Length(10)     -- Apply no more than the given amount (currently roughly equal to `ui.Constraint.Max`)
ui.Constraint.Max(5)         -- Apply at most the given amount
ui.Constraint.Min(3)         -- Apply at least the given amount
```

### `ui.Gauge`

TODO

```lua
ui.Gauge()
```

- `ui.Constraint:percent(percent)`
- `ui.Constraint:ratio(ratio)`
- `ui.Constraint:label(label)`
- `ui.Constraint:style(style)`
- `ui.Constraint:gauge_style(style)`

### `ui.Layout`

TODO

- direction
- margin
- margin_h
- margin_v
- constraints
- split

- ("HORIZONTAL", HORIZONTAL.into_lua(lua)?),
- ("VERTICAL", VERTICAL.into_lua(lua)?),

### `ui.Line`

TODO

// Alignment

- ("LEFT", LEFT.into_lua(lua)?),
- ("CENTER", CENTER.into_lua(lua)?),
- ("RIGHT", RIGHT.into_lua(lua)?),

- width
- style
- align

### `ui.List`

TODO

### `ui.ListItem`

TODO

- style

### `ui.Padding`

All parameters for padding are integers, and you can create it by:

```lua
ui.Padding(left, right, top, bottom)
```

If you want to specify only one of them, you can:

- `ui.Padding.left(left)` equal to `ui.Padding(left, 0, 0, 0)`
- `ui.Padding.right(right)` equal to `ui.Padding(0, right, 0, 0)`
- `ui.Padding.top(top)` equal to `ui.Padding(0, 0, top, 0)`
- `ui.Padding.bottom(bottom)` equal to `ui.Padding(0, 0, 0, bottom)`

Or specify a particular direction for them:

- `ui.Padding.x(x)` equal to `ui.Padding(x, x, 0, 0)`
- `ui.Padding.y(y)` equal to `ui.Padding(0, 0, y, y)`
- `ui.Padding.xy(x, y)` equal to `ui.Padding(x, x, y, y)`

Properties:

- `left` - left padding
- `right` - right padding
- `top` - top padding
- `bottom` - bottom padding

### `ui.Paragraph`

TODO

- ("parse", parse.into_lua(lua)?),
- // Alignment
- ("LEFT", LEFT.into_lua(lua)?),
- ("CENTER", CENTER.into_lua(lua)?),
- ("RIGHT", RIGHT.into_lua(lua)?),

- style
- align

### `ui.Rect`

A Rect is represented an area within the terminal by four attributes:

```lua
ui.Rect {
	x = 10, -- x position
	y = 10, -- y position
	w = 20,  -- width
	h = 30, -- height
}

ui.Rect.default  -- Equal to `ui.Rect { x = 0, y = 0, w = 0, h = 0 }`
```

You can obtain a pre-computed `Rect` through Yazi's layout system.

Note that if you intend to create it yourself, ensure these values are calculated accurately; otherwise, it may cause Yazi to crash!

Properties:

- `x` - x position
- `y` - y position
- `w` - width
- `h` - height
- `left` - left position
- `right` - right position
- `top` - top position
- `bottom` - bottom position

Methods:

- `padding(padding)` - Set padding. It accepts a [Padding](#uipadding)

### `ui.Span`

TODO

- fg
- bg
- bold
- dim
- italic
- underline
- blink
- blink_rapid
- hidden
- crossed
- reset
- style

### `ui.Style`

TODO

- fg
- bg
- bold
- dim
- italic
- underline
- blink
- blink_rapid
- hidden
- crossed
- reset

## Sync context

## Isolate context
