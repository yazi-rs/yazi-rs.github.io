---
sidebar_position: 2
description: Learn how to use Yazi's Lua API.
---

# Layout (Work in progress)

Paragraph, List, Bar, Border, and Gauge are renderable widgets; others need to be placed within any of them.

## Bar

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

Methods (all methods return `self`):

- `ui.Bar:symbol(symbol)` - accepts a string, specifying the symbol for the bar
- `ui.Bar:style(style)` - accepts a [Style](#uistyle), specifying the style of the bar

## Border

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

Methods (all methods return `self`):

- `ui.Border:style(style)` - accepts a [Style](#uistyle), specifying the style of the border

## Constraint

Constraints are used to define the size of a layout.

They can be used to define a fixed size, a percentage of the available space, a ratio of the available space, or a minimum or maximum size:

```lua
ui.Constraint.Percentage(50) -- Apply a percentage to a given amount
ui.Constraint.Ratio(1, 3)    -- Apply a ratio
ui.Constraint.Length(10)     -- Apply no more than the given amount (currently roughly equal to `ui.Constraint.Max`)
ui.Constraint.Max(5)         -- Apply at most the given amount
ui.Constraint.Min(3)         -- Apply at least the given amount
```

## Gauge

Create a gauge:

```lua
ui.Gauge(rect)
```

- `ui.Gauge:percent(percent)` - Set the percentage of the gauge
- `ui.Gauge:ratio(ratio)` - Set the ratio of the gauge
- `ui.Gauge:label(label)` - Set the label of the gauge
- `ui.Gauge:style(style)` - Set the style of everything except the bar itself, which accepts a [Style](#uistyle)
- `ui.Gauge:gauge_style(style)` - Set the style of the bar, which accepts a [Style](#uistyle)

## Layout

Create a layout:

```lua
ui.Layout()
```

- `ui.Layout:direction(direction)` - Set the direction of the layout. It accepts the following constants:
  - `ui.Layout.HORIZONTAL`
  - `ui.Layout.VERTICAL`
- `ui.Layout:margin(margin)` - Set the margin of the layout
- `ui.Layout:margin_h(margin)` - Set the horizontal margin of the layout
- `ui.Layout:margin_v(margin)` - Set the vertical margin of the layout
- `ui.Layout:constraints({ constraint, ... })` - Set the constraints of the layout, which accepts a list of [Constraint](#uiconstraint)
- `ui.Layout:split(rect)` - Accepts a [Rect](#uirect) and split it into multiple [Rect](#uirect) according to the constraints

## Line

Create a line, which accepts a list of [Span](#uispan) and [Line](#uiline):

```lua
ui.Line { span, line, span, ... }
```

- `ui.Line:width()` - Get the width of the line
- `ui.Line:style(style)` - Set the style of the line, which accepts a [Style](#uistyle)
- `ui.Line:align(alignment)` - Set the alignment of the line. It accepts the following constants:
  - `ui.Line.LEFT`
  - `ui.Line.CENTER`
  - `ui.Line.RIGHT`

## List

Create a list:

```lua
ui.List(rect, items)
```

The first attribute is a [Rect](#uirect), representing the position of this list.
The second denotes the items of the list and accepts a list of [ListItem](#uilistitem).

## ListItem

Create a list item:

```lua
ui.ListItem(line)
ui.ListItem(span)
ui.ListItem("string")
```

Methods (all methods return `self`):

- `ui.ListItem:style(style)` - Set the style of the list item, which accepts a [Style](#uistyle)

## Padding

All parameters for padding are integers:

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

## Paragraph

Create a paragraph:

```lua
ui.Paragraph(rect, { line, line, ... })
```

The first attribute is a [Rect](#uirect), representing the position of this paragraph.
The second denotes the lines of the paragraph and accepts a list of [Line](#uiline).

You can also use `ui.Paragraph.parse(string)` to parse an [ANSI escape sequence](https://en.wikipedia.org/wiki/ANSI_escape_code) string into a paragraph.

Methods (all methods return `self`):

- `ui.Paragraph:style(style)` - Set the style of the paragraph, which accepts a [Style](#uistyle)
- `ui.Paragraph:align(alignment)` - Set the alignment of the paragraph. It accepts the following constants:
  - `ui.Paragraph.LEFT`
  - `ui.Paragraph.CENTER`
  - `ui.Paragraph.RIGHT`

## Rect

A Rect is represented an area within the terminal by four attributes:

```lua
ui.Rect {
	x = 10, -- x position
	y = 10, -- y position
	w = 20, -- width
	h = 30, -- height
}

ui.Rect.default  -- Equal to `ui.Rect { x = 0, y = 0, w = 0, h = 0 }`
```

You can obtain a pre-computed `Rect` through [Yazi's layout system](#uilayout).

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

Methods (all methods return `self`):

- `ui.Rect:padding(padding)` - Set padding. It accepts a [Padding](#uipadding)

## Span

Create a span:

```lua
ui.Span("string")
```

Methods (all methods return `self`):

- `ui.Span:fg(color)` - Set the foreground color of the span, which accepts a [Color](../configuration/theme.md#types)
- `ui.Span:bg(color)` - Set the background color of the span, which accepts a [Color](../configuration/theme.md#types)
- `ui.Span:bold()` - Set the span to bold
- `ui.Span:dim()` - Set the span to dim
- `ui.Span:italic()` - Set the span to italic
- `ui.Span:underline()` - Set the span to underline
- `ui.Span:blink()` - Set the span to blink
- `ui.Span:blink_rapid()` - Set the span to blink rapidly
- `ui.Span:hidden()` - Set the span to hidden
- `ui.Span:crossed()` - Set the span to crossed
- `ui.Span:reset()` - Reset the style of the span
- `ui.Span:style(style)` - Set the style of the span, which accepts a [Style](#uistyle)

## Style

Create a style:

```lua
ui.Style()
```

- `ui.Style:fg(string)` - Set the foreground color of the style, which accepts a [Color](../configuration/theme.md#types)
- `ui.Style:bg(string)` - Set the background color of the style, which accepts a [Color](../configuration/theme.md#types)
- `ui.Style:bold()` - Set the style to bold
- `ui.Style:dim()` - Set the style to dim
- `ui.Style:italic()` - Set the style to italic
- `ui.Style:underline()` - Set the style to underline
- `ui.Style:blink()` - Set the style to blink
- `ui.Style:blink_rapid()` - Set the style to blink rapidly
- `ui.Style:hidden()` - Set the style to hidden
- `ui.Style:crossed()` - Set the style to crossed
- `ui.Style:reset()` - Reset the style
