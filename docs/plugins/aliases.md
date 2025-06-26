---
sidebar_position: 7
description: Learn how to use Yazi's Lua API.
---

# Aliases

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

## Origin {#origin}

Origin is a set of constants representing the origin of a position.

|       |                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Alias | `"top-left"` \| `"top-center"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-center"` \| `"bottom-right"` \| `"center"` \| `"hovered"` |
