---
sidebar_position: 7
description: Learn how to use Yazi's Lua API.
---

# Aliases

## Origin {#origin}

A set of constants representing the origin of a position.

|       |                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Alias | `"top-left"` \| `"top-center"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-center"` \| `"bottom-right"` \| `"center"` \| `"hovered"` |

## Sendable {#sendable}

A value that can be sent across threads. See [Sendable value](/docs/plugins/overview#sendable) for more details.

|       |                                                                                   |
| ----- | --------------------------------------------------------------------------------- |
| Alias | `nil` \| `boolean` \| `number` \| `string` \| `Url` \| `{ [Sendable]: Sendable }` |

## Renderable {#renderable}

An element that can be rendered.

|       |                                                                       |
| ----- | --------------------------------------------------------------------- |
| Alias | `Bar` \| `Border` \| `Clear` \| `Gauge` \| `Line` \| `List` \| `Text` |

## AsPos {#as-pos}

A value that can be covariantly treated as a [`Pos`](/docs/plugins/layout#pos).

|       |                                                                                |
| ----- | ------------------------------------------------------------------------------ |
| Alias | `Pos` \| `{ [1]: Origin, x: integer?, y: integer?, w: integer?, h: integer? }` |

## AsSpan {#as-span}

A value that can be covariantly treated as a [`Span`](/docs/plugins/layout#span).

|       |                    |
| ----- | ------------------ |
| Alias | `string` \| `Span` |

## AsLine {#as-line}

A value that can be covariantly treated as a [`Line`](/docs/plugins/layout#line).

|       |                                                          |
| ----- | -------------------------------------------------------- |
| Alias | `string` \| `Span` \| `Line` \| `(string\|Span\|Line)[]` |

## AsText {#as-text}

A value that can be covariantly treated as a [`Text`](/docs/plugins/layout#text).

|       |                                                          |
| ----- | -------------------------------------------------------- |
| Alias | `string` \| `Span` \| `Line` \| `(string\|Span\|Line)[]` |

## AsColor {#as-color}

A set of constants representing colors.

|       |                                                                                                                                                                                                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alias | `"black"` \| `"white"` \| `"red"` \| `"lightred"` \| `"green"` \| `"lightgreen"` \| `"yellow"` \| `"lightyellow"` \| `"blue"` \| `"lightblue"` \| `"magenta"` \| `"lightmagenta"` \| `"cyan"` \| `"lightcyan"` \| `"gray"` \| `"darkgray"` \| `"reset"` \| `string` |
