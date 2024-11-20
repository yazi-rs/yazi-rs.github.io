---
sidebar_position: 2
description: Learn how to use Yazi's Lua API.
---

:::warning
The content of this document has been updated to align with the upcoming major release of Yazi 0.4.

Please make sure you are using the latest nightly version of Yazi to access these APIs.
:::

# Layout

Text, List, Bar, Border, and Gauge are renderable elements; others need to be placed within any of them.

## Rect {#rect}

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

Properties:

- `x` - x position
- `y` - y position
- `w` - width
- `h` - height
- `left` - left position
- `right` - right position
- `top` - top position
- `bottom` - bottom position

Methods (return `self` if not specified):

- `pad(pad)` - Apply a [Pad](#pad)

You can get a pre-computed `Rect` through [`ui.Layout()`](#layout).
Note that if you intend to create a `Rect` yourself, ensure these values are calculated accurately; otherwise, it may cause Yazi to crash!

## Pad {#pad}

`Pad` represents a padding, and all of its parameters are integers:

```lua
ui.Pad(top, right, bottom, left)
```

Properties:

- `left` - left padding
- `right` - right padding
- `top` - top padding
- `bottom` - bottom padding

If you want to specify only one of them:

- `ui.Pad.left(left)` equal to `ui.Pad(left, 0, 0, 0)`
- `ui.Pad.right(right)` equal to `ui.Pad(0, right, 0, 0)`
- `ui.Pad.top(top)` equal to `ui.Pad(0, 0, top, 0)`
- `ui.Pad.bottom(bottom)` equal to `ui.Pad(0, 0, 0, bottom)`

Or specify a particular direction for them:

- `ui.Pad.x(x)` equal to `ui.Pad(x, x, 0, 0)`
- `ui.Pad.y(y)` equal to `ui.Pad(0, 0, y, y)`
- `ui.Pad.xy(x, y)` equal to `ui.Pad(x, x, y, y)`

## Style {#style}

Create a style:

```lua
ui.Style()
```

Methods (return `self` if not specified):

- `fg(color)` - Set the foreground color of the style, which accepts a [Color](/docs/configuration/theme#types.color)
- `bg(color)` - Set the background color of the style, which accepts a [Color](/docs/configuration/theme#types.color)
- `bold()` - Set the style to bold
- `dim()` - Set the style to dim
- `italic()` - Set the style to italic
- `underline()` - Set the style to underline
- `blink()` - Set the style to blink
- `blink_rapid()` - Set the style to blink rapidly
- `reverse()` - Set the style to reverse
- `hidden()` - Set the style to hidden
- `crossed()` - Set the style to crossed
- `reset()` - Reset the style
- `patch(style)` - Patch the style with another `Style`

## Span {#span}

`ui.Span` is the smallest unit of text, yet a component of `ui.Line`. Create a span:

```lua
ui.Span("foo")
```

For convenience, `ui.Span` can also accept itself as a argument:

```lua
ui.Span(ui.Span("bar"))
```

Methods (return `self` if not specified):

- `visible()` - Whether the span is visible (includes any printable characters), which returns a boolean.
- `style(style)` - Set the style of the span, which accepts a [Style](#style)

Besides applying the whole [`Style`](#style), you can also call those methods of `Style` directly on it, which means:

```lua
local style = ui.Style():fg("white"):bg("black"):bold()
ui.Span("Hello world"):style(style)
```

can be also written as:

```lua
ui.Span("Hello world"):fg("white"):bg("black"):bold()
```

## Line {#line}

`ui.Line` represents a line, consisting of multiple `ui.Span`s, and it accepts a table of them:

```lua
ui.Line { ui.Span("foo"), ui.Span("bar") }
```

For convenience, the following types are also supported:

```lua
-- string
ui.Line("foo")

-- ui.Span
ui.Line(ui.Span("bar"))

-- ui.Line itself
ui.Line(ui.Line("baz"))

-- Mixed table of string, ui.Span, ui.Line
ui.Line { "foo", ui.Span("bar"), ui.Line("baz") }
```

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the line. If not specified, returns the current area.
- `width()` - Get the width of the line, which returns an integer.
- `align(alignment)` - Set the alignment of the line. It accepts the following constants:
  - `ui.Line.LEFT`
  - `ui.Line.CENTER`
  - `ui.Line.RIGHT`
- `visible()` - Whether the line is visible (includes any printable characters), which returns a boolean.
- `style(style)` - Set the style of the line, which accepts a [Style](#style).

Like with [`Span`](#span), you can directly call [`Style`](#style) methods on it

```lua
ui.Line("Hello world"):fg("white"):bg("black"):bold()
```

## Text {#text}

`ui.Text` is used to represent multi-line text, it takes a table of `ui.Line`:

```lua
ui.Text { ui.Line("foo"), ui.Line("bar") }
```

For convenience, the following types are also supported:

```lua
-- string
ui.Text("foo\nbar")

-- ui.Line
ui.Text(ui.Line("foo"))

-- ui.Span
ui.Text(ui.Span("bar"))

-- Mixed table of string, ui.Line, ui.Span
ui.Text { "foo", ui.Line("bar"), ui.Span("baz") }
```

You can also use `ui.Text.parse(code)` to parse an [ANSI escape sequence](https://en.wikipedia.org/wiki/ANSI_escape_code) string into a text.

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the text. If not specified, returns the current area.
- `align(alignment)` - Set the alignment of the text, accepts the following constants:
  - `ui.Text.LEFT`
  - `ui.Text.CENTER`
  - `ui.Text.RIGHT`
- `wrap(wrap)` - Set the wrap of the text, which accepts the following constants:
  - `ui.Text.WRAP_NO` - No wrap
  - `ui.Text.WRAP` - Wrap at the end of the line
  - `ui.Text.WRAP_TRIM` - Wrap at the end of the line, and trim the leading whitespace
- `max_width()` - Get the maximum width of the text, which returns an integer
- `style(style)` - Set the style of the text, which accepts a [Style](#style)

Like with [`Span`](#span), you can directly call [`Style`](#style) methods on it:

```lua
ui.Text("Hello world"):fg("white"):bg("black"):bold()
```

## Layout {#layout}

Create a layout:

```lua
local areas = ui.Layout()
	:direction(ui.Layout.HORIZONTAL)
	:constraints({ ui.Constraint.Percentage(50), ui.Constraint.Percentage(50) })
	:split(area)

local left = areas[1] -- The first rect
local right = areas[2] -- The second rect
```

Methods (return `self` if not specified):

- `direction(direction)` - Set the direction of the layout, which accepts the following constants:
  - `ui.Layout.HORIZONTAL`
  - `ui.Layout.VERTICAL`
- `margin(margin)` - Set the margin of the layout, which accepts an positive integer.
- `margin_h(margin)` - Set the horizontal margin of the layout, which accepts an positive integer.
- `margin_v(margin)` - Set the vertical margin of the layout, which accepts an positive integer.
- `constraints({ constraint, ... })` - Set the constraints of the layout, which accepts a list of [Constraint](#constraint).
- `split(rect)` - Accepts a [Rect](#rect) and split it into multiple [Rect](#rect) according to the constraints.

## Constraint {#constraint}

A constraint that defines the size of a layout element.

Constraints can be used to specify a fixed size, a percentage of the available space, a ratio of
the available space, a minimum or maximum size or a fill proportional value for a layout
element.

Relative constraints (percentage, ratio) are calculated relative to the entire space being
divided, rather than the space available after applying more fixed constraints (min, max,
length).

Constraints are prioritized in the following order:

1. `ui.Constraint.Min(min)`
2. `ui.Constraint.Max(max)`
3. `ui.Constraint.Length(len)`
4. `ui.Constraint.Percentage(p)`
5. `ui.Constraint.Ratio(num, den)`
6. `ui.Constraint.Fill(scale)`

### `Min(min)` {#constraint.min}

Applies a minimum size constraint to the element

The element size is set to at least the specified amount.

```lua
-- { Percentage(100), Min(20) }
-- ┌────────────────────────────┐┌──────────────────┐
-- │            30 px           ││       20 px      │
-- └────────────────────────────┘└──────────────────┘

-- { Percentage(100), Min(10) }
-- ┌──────────────────────────────────────┐┌────────┐
-- │                 40 px                ││  10 px │
-- └──────────────────────────────────────┘└────────┘
```

### `Max(max)` {#constraint.max}

Applies a maximum size constraint to the element

The element size is set to at most the specified amount.

```lua
-- { Percentage(0), Max(20) }
-- ┌────────────────────────────┐┌──────────────────┐
-- │            30 px           ││       20 px      │
-- └────────────────────────────┘└──────────────────┘

-- { Percentage(0), Max(10) }
-- ┌──────────────────────────────────────┐┌────────┐
-- │                 40 px                ││  10 px │
-- └──────────────────────────────────────┘└────────┘

```

### `Length(len)` {#constraint.length}

Applies a length constraint to the element

The element size is set to the specified amount.

```lua
-- { Length(20), Length(20) }
-- ┌──────────────────┐┌──────────────────┐
-- │       20 px      ││       20 px      │
-- └──────────────────┘└──────────────────┘

-- { Length(20), Length(30) }
-- ┌──────────────────┐┌────────────────────────────┐
-- │       20 px      ││            30 px           │
-- └──────────────────┘└────────────────────────────┘
```

### `Percentage(p)` {#constraint.percentage}

Applies a percentage of the available space to the element

Converts the given percentage to a floating-point value and multiplies that with area.
This value is rounded back to a integer as part of the layout split calculation.

```lua
-- { Percentage(75), Fill(1) }
-- ┌────────────────────────────────────┐┌──────────┐
-- │                38 px               ││   12 px  │
-- └────────────────────────────────────┘└──────────┘

-- { Percentage(50), Fill(1) }
-- ┌───────────────────────┐┌───────────────────────┐
-- │         25 px         ││         25 px         │
-- └───────────────────────┘└───────────────────────┘
```

### `Ratio(num, den)` {#constraint.ratio}

Applies a ratio of the available space to the element

Converts the given ratio to a floating-point value and multiplies that with area.
This value is rounded back to a integer as part of the layout split calculation.

```lua
-- { Ratio(1, 2), Ratio(1, 2) }
-- ┌───────────────────────┐┌───────────────────────┐
-- │         25 px         ││         25 px         │
-- └───────────────────────┘└───────────────────────┘

-- { Ratio(1, 4), Ratio(1, 4), Ratio(1, 4), Ratio(1, 4) }
-- ┌───────────┐┌──────────┐┌───────────┐┌──────────┐
-- │   13 px   ││   12 px  ││   13 px   ││   12 px  │
-- └───────────┘└──────────┘└───────────┘└──────────┘
```

### `Fill(scale)` {#constraint.fill}

Applies the scaling factor proportional to all other `Fill` elements
to fill excess space

The element will only expand or fill into excess available space, proportionally matching
other `Fill` elements while satisfying all other constraints.

```lua
-- { Fill(1), Fill(2), Fill(3) }
-- ┌──────┐┌───────────────┐┌───────────────────────┐
-- │ 8 px ││     17 px     ││         25 px         │
-- └──────┘└───────────────┘└───────────────────────┘

-- { Fill(1), Percentage(50), Fill(1) }
-- ┌───────────┐┌───────────────────────┐┌──────────┐
-- │   13 px   ││         25 px         ││   12 px  │
-- └───────────┘└───────────────────────┘└──────────┘
```

See https://docs.rs/ratatui/latest/ratatui/layout/enum.Constraint.html for more information.

## List {#list}

Create a `List` that takes a table of `ui.Text`:

```lua
ui.List { ui.Text("foo"), ui.Text("bar") }
```

For convenience, the following types are also supported:

```lua
-- Table of string
ui.List { "foo", "bar" }

-- Table of ui.Line
ui.List { ui.Line("foo"), ui.Line("bar") }

-- Table of ui.Span
ui.List { ui.Span("foo"), ui.Span("bar") }

-- Mixed table of string, ui.Line, ui.Span
ui.List { "foo", ui.Line("bar"), ui.Span("baz") }
```

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the text. If not specified, returns the current area.
- `style(style)` - Set the style of the list, which accepts a [Style](#style)

## Bar {#bar}

Create a bar:

```lua
ui.Bar(direction)
```

The first attribute denotes the direction of the bar and accepts the following constants:

- `ui.Bar.NONE`
- `ui.Bar.TOP`
- `ui.Bar.RIGHT`
- `ui.Bar.BOTTOM`
- `ui.Bar.LEFT`
- `ui.Bar.ALL`

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the bar. If not specified, returns the current area.
- `symbol(symbol)` - accepts a string, specifying the symbol for the bar
- `style(style)` - accepts a [Style](#style), specifying the style of the bar

## Border {#border}

Create a border:

```lua
ui.Border(position)
```

The first attribute denotes the position of the border and accepts the following constants:

- `ui.Border.NONE`
- `ui.Border.TOP`
- `ui.Border.RIGHT`
- `ui.Border.BOTTOM`
- `ui.Border.LEFT`
- `ui.Border.ALL`

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the border. If not specified, returns the current area.
- `type(type)` - accepts a type, specifying the type of the border:
  - `ui.Border.PLAIN`
  - `ui.Border.ROUNDED`
  - `ui.Border.DOUBLE`
  - `ui.Border.THICK`
  - `ui.Border.QUADRANT_INSIDE`
  - `ui.Border.QUADRANT_OUTSIDE`
- `style(style)` - accepts a [Style](#style), specifying the style of the border

## Gauge {#gauge}

Create a gauge:

```lua
ui.Gauge()
```

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the gauge. If not specified, returns the current area.
- `percent(percent)` - Set the percentage of the gauge
- `ratio(ratio)` - Set the ratio of the gauge
- `label(label)` - Set the label of the gauge
- `style(style)` - Set the style of everything except the bar itself, which accepts a [Style](#style)
- `gauge_style(style)` - Set the style of the bar, which accepts a [Style](#style)

## Clear {#clear}

Clear the content of a specific area, which is a [Rect](#rect). Place it followed by the component that you want to clear:

```lua
local components = {
	ui.Text("..."):area(rect),
	-- ...

	ui.Clear(rect),
}
```

Methods (return `self` if not specified):

- `area(rect)` - accepts a [Rect](#rect), changing the area of the clear. If not specified, returns the current area.
