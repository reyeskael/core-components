# Design Tokens

This directory holds the **design tokens** for `core-components` and the build
pipeline that turns them into the Material-UI theme.

Design tokens are the single source of truth for visual decisions — colors,
and (as the system grows) spacing, typography, radii, shadows, etc. Instead of
hardcoding `#128C7E` in twenty components, you reference one token. Change the
token once and every consumer updates.

We follow two industry standards:

- **[W3C Design Tokens (DTCG) format](https://tr.designtokens.org/format/)** —
  how tokens are authored (`$value` / `$type`).
- **[Style Dictionary](https://styledictionary.com/)** — how tokens are
  resolved and transformed into code.

---

## Table of contents

- [Architecture at a glance](#architecture-at-a-glance)
- [The three tiers](#the-three-tiers)
- [DTCG file format](#dtcg-file-format)
- [The build pipeline](#the-build-pipeline)
- [The generated output](#the-generated-output)
- [How tokens reach the theme](#how-tokens-reach-the-theme)
- [Common tasks](#common-tasks)
- [Naming conventions](#naming-conventions)
- [FAQ & troubleshooting](#faq--troubleshooting)

---

## Architecture at a glance

```
 ┌─────────────────────────────────────────────┐
 │  AUTHORED (you edit these)                    │
 │                                               │
 │  primitive/   →   semantic/   →   component/  │   DTCG JSON
 │  raw values       meaning         per-widget   │   ($value/$type)
 └───────────────────────┬───────────────────────┘
                         │  yarn build:tokens
                         ▼
 ┌─────────────────────────────────────────────┐
 │  scripts/build-tokens.mjs (Style Dictionary)  │   resolves {references},
 │                                               │   emits a typed object
 └───────────────────────┬───────────────────────┘
                         ▼
 ┌─────────────────────────────────────────────┐
 │  generated/tokens.ts  (committed, do NOT edit)│
 └───────────────────────┬───────────────────────┘
                         ▼
 ┌─────────────────────────────────────────────┐
 │  src/theme/styleCreator.ts → MUI createTheme   │
 └─────────────────────────────────────────────┘
```

Directory layout:

```
src/tokens/
├── primitive/
│   └── color.json        Tier 1 — raw values
├── semantic/
│   └── color.json        Tier 2 — meaning (references primitives)
├── component/
│   └── button.json       Tier 3 — per-component (references semantics)
├── generated/
│   └── tokens.ts         OUTPUT — built, fully resolved, committed
└── README.md             this file
```

---

## The three tiers

Tokens are layered so that **each tier only references the tier below it**. This
indirection is what makes the system scalable and themeable: a single primitive
change ripples up through semantics and components automatically.

### Tier 1 — Primitive (`primitive/`)

Raw, context-free values. A primitive says *what a value is*, never *what it is
for*. Names describe the value itself (`green.500`), not its usage.

```jsonc
// primitive/color.json
{
  "color": {
    "green": {
      "400": { "$type": "color", "$value": "#17B3A1" },
      "500": { "$type": "color", "$value": "#128C7E" },
      "600": { "$type": "color", "$value": "#0E6E63" }
    },
    "white":       { "$type": "color", "$value": "#FFFFFF" },
    "transparent": { "$type": "color", "$value": "transparent" }
  }
}
```

> Rule of thumb: a primitive **never** contains a `{reference}` — it is always a
> literal value.

### Tier 2 — Semantic / alias (`semantic/`)

Assigns *meaning* by pointing at primitives. A semantic token says *what a value
is for* (`action.primary`, `text.onPrimary`), decoupling intent from the
concrete hex. This is the layer you re-map when building a new brand or theme.

```jsonc
// semantic/color.json
{
  "color": {
    "action": {
      "primary": {
        "default": { "$type": "color", "$value": "{color.green.500}" },
        "hover":   { "$type": "color", "$value": "{color.green.400}" },
        "pressed": { "$type": "color", "$value": "{color.green.600}" }
      }
    },
    "text": {
      "onPrimary": { "$type": "color", "$value": "{color.white}" }
    }
  }
}
```

### Tier 3 — Component (`component/`)

The most specific layer: tokens scoped to a single component, referencing
semantics. A component token says *which semantic role this UI part plays*
(`button.contained.primary.background`).

```jsonc
// component/button.json
{
  "button": {
    "contained": {
      "primary": {
        "background": {
          "default": { "$type": "color", "$value": "{color.action.primary.default}" },
          "hover":   { "$type": "color", "$value": "{color.action.primary.hover}" },
          "pressed": { "$type": "color", "$value": "{color.action.primary.pressed}" }
        },
        "text": {
          "default": { "$type": "color", "$value": "{color.text.onPrimary}" }
        }
      }
    }
  }
}
```

**Why three tiers?** A concrete example — rebranding from green to teal:

- *Without tiers:* find-and-replace `#128C7E` across dozens of files and hope you
  caught them all.
- *With tiers:* change `primitive/color.green.500` once (or re-point
  `semantic/color.action.primary` at a different primitive). Every button,
  every state, every component updates on the next build.

The reference chain for one button color:

```
button.contained.primary.background.hover   (component)
  └─▶ color.action.primary.hover            (semantic)
        └─▶ color.green.400                  (primitive)
              └─▶ #17B3A1                     (literal)
```

---

## DTCG file format

Every token is an object with two reserved keys:

| Key      | Meaning                                                              |
| -------- | ------------------------------------------------------------------- |
| `$value` | The value — either a literal (`"#128C7E"`) or a reference (`"{...}"`). |
| `$type`  | The token type. We use `"color"` today; DTCG also defines `dimension`, `fontFamily`, `shadow`, etc. |

References use **dot-path syntax** wrapped in braces: `{color.green.500}`. The
path is the full location of the target token across **all** source files (the
tier the token lives in is irrelevant to the path — only its nesting matters).

Nesting is arbitrary — group tokens however reads best. Any object that contains
a `$value` is treated as a token; everything else is a group.

```jsonc
{
  "color": {                    // group
    "green": {                  // group
      "500": {                  // token  → path is "color.green.500"
        "$type": "color",
        "$value": "#128C7E"
      }
    }
  }
}
```

> The `color` namespace is intentionally reused across `primitive/color.json`
> and `semantic/color.json`. Style Dictionary **deep-merges** all source files,
> so `color.green.*` (primitive) and `color.action.*` (semantic) end up in one
> combined `color` tree. Keep leaf paths unique across files to avoid collisions.

---

## The build pipeline

The build lives in [`scripts/build-tokens.mjs`](../../scripts/build-tokens.mjs)
and runs via:

```bash
yarn build:tokens
```

What it does, step by step:

1. **Globs the source files** — `src/tokens/{primitive,semantic,component}/**/*.json`.
2. **Merges & resolves** — Style Dictionary deep-merges every file into one tree
   and resolves all `{references}` down to literal values. `usesDtcg: true` tells
   it to read the `$value` / `$type` keys.
3. **Transforms names only** — we run a single transform, `name/camel`. It gives
   every token a unique, collision-free name **without touching the value**, so
   raw CSS strings like `#128C7E` and `transparent` pass through verbatim.
   (Notably we do *not* run `color/hex`, which would mangle `transparent` into
   `#000000`.)
4. **Emits a typed object** — a custom format, `typescript/nested-object`,
   rebuilds the nested tree from each token's `path` and writes it as a
   `const ... as const` to `generated/tokens.ts`.

### Why a custom format?

Style Dictionary's built-in JS/TS formats emit *flat* constants
(`ColorGreen500 = "#128C7E"`). We want the **nested shape preserved** so the
theme code can write `tokens.color.action.primary.default` and so the `as const`
gives precise literal types. The custom format (≈20 lines) does exactly that.

---

## The generated output

`generated/tokens.ts` is **machine-generated — never edit it by hand.** Re-run
`yarn build:tokens` to regenerate. It is committed to the repo so that consumers
(and CI) don't need to run the build to use the theme.

It exports a single deeply-nested, fully-resolved, readonly object:

```ts
// Do not edit directly — generated by Style Dictionary (`yarn build:tokens`).
export const tokens = {
  button: {
    contained: {
      primary: {
        background: { default: "#128C7E", hover: "#17B3A1", pressed: "#0E6E63" },
        text:       { default: "#FFFFFF", hover: "#FFFFFF", pressed: "#FFFFFF" }
      },
      // ...
    },
    // ...
  },
  color: {
    green:  { "400": "#17B3A1", "500": "#128C7E", "600": "#0E6E63" },
    action: { primary: { default: "#128C7E", hover: "#17B3A1", pressed: "#0E6E63" } },
    // ...
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
```

Because of `as const`, `Tokens` is a precise type — autocomplete and the type
checker know every path and that `tokens.color.green[500]` is exactly
`"#128C7E"`.

---

## How tokens reach the theme

[`src/theme/styleCreator.ts`](../theme/styleCreator.ts) imports the generated
object and maps it onto Material-UI's theme shape. Two things happen there:

**1. The MUI palette** is wired from semantic tokens:

```ts
palette: {
  primary: {
    main:         color.action.primary.default,
    light:        color.action.primary.hover,
    dark:         color.action.primary.pressed,
    contrastText: color.text.onPrimary,
  },
  // ...
}
```

**2. Button variant overrides** are generated from component tokens. For each
`variant × concept` (e.g. `contained × primary`) it produces the MUI slot key
(`containedPrimary`) under `MuiButton.styleOverrides`, with `default` / `hover` /
`pressed` mapped to the base style, `&:hover`, and `&:active`:

```ts
styleOverrides: {
  root: { textTransform: 'none', borderRadius: '4px', /* ... */ },
  containedPrimary: {
    backgroundColor: button.contained.primary.background.default,  // #128C7E
    color:           button.contained.primary.text.default,        // #FFFFFF
    '&:hover':  { backgroundColor: '#17B3A1', /* ... */ },
    '&:active': { backgroundColor: '#0E6E63', /* ... */ },
  },
  // outlinedPrimary, textSecondary, ...
}
```

`src/theme/index.ts` then feeds this into `createTheme()`, and
`.storybook/preview.tsx` wraps every story in the resulting `<ThemeProvider>`.

---

## Common tasks

### Change an existing color

1. Edit the literal in `primitive/color.json` (e.g. bump `green.500`).
2. Run `yarn build:tokens`.
3. Done — every semantic, component, and theme value that chains to it updates.

### Add a new color scale

1. Add it under `color` in `primitive/color.json` with `$type`/`$value`.
2. (Usually) add a semantic alias in `semantic/color.json` that gives it meaning.
3. Reference the semantic token from a component file.
4. `yarn build:tokens`.

### Add tokens for a new component

1. Create `component/<name>.json` (it's picked up automatically by the glob).
2. Define tokens that reference **semantic** tokens, not primitives directly.
3. `yarn build:tokens`.
4. Map the new tokens onto MUI in `src/theme/styleCreator.ts`.

### Re-theme / re-brand

Re-point the **semantic** layer at different primitives (or swap the primitive
palette wholesale). Component tokens and the theme need no changes.

---

## Naming conventions

- **Primitives** describe the value: `color.green.500`, `color.white`.
- **Semantics** describe intent: `color.action.primary.default`,
  `color.text.onPrimary`.
- **Components** describe the part: `button.contained.primary.background.hover`.
- **States** are consistent leaf names: `default`, `hover`, `pressed`.
- **Keys are camelCase** where multi-word (`onPrimary`), so they're clean to
  access in TypeScript without bracket notation.
- Component token structure mirrors how it's consumed:
  `<component>.<variant>.<concept>.<property>.<state>`.

---

## FAQ & troubleshooting

**Do I commit `generated/tokens.ts`?**
Yes. It's tracked so consumers and CI don't have to run the build. Just remember
to re-run `yarn build:tokens` and commit the result whenever you change a source
token.

**I changed a token but nothing updated.**
You almost certainly forgot to run `yarn build:tokens`. The app reads
`generated/tokens.ts`, not the JSON source directly.

**Build warns about "token collisions."**
Two tokens resolved to the same name. Check for duplicate leaf paths across the
merged `color` tree (primitive vs semantic files share the `color` namespace).

**A reference isn't resolving (`{color.x.y}` shows up literally).**
The path is wrong or the target token doesn't exist. The reference must match the
target's full dot-path exactly, and the target must have a `$value`.

**Why is `transparent` stored as a color token?**
So outlined/text button variants can reference a token for "no fill" instead of
hardcoding a string. The build deliberately skips value transforms so
`transparent` survives intact (a color transform would turn it into `#000000`).

**Can I add non-color tokens (spacing, radius, typography)?**
Yes — that's the intended growth path. Add new files (e.g.
`primitive/dimension.json`) with the appropriate `$type`, follow the same
three-tier flow, and map them onto the theme in `styleCreator.ts`.
