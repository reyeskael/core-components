---
name: add-mui-component
description: >
  Scaffolds a complete new MUI-based component for core-components following the
  established codebase pattern. Use this whenever adding any new component to this
  repo — it handles all 9 artefacts in one shot: design token files (all 3 tiers),
  token rebuild, theme module, styleCreator wiring, React component, index.ts,
  Storybook stories, MDX docs, and Jest tests. Trigger on any request like "add a
  [Name] component", "create a [Name] component", "new component called [Name]",
  or "build a [Name] component using MUI".
---

# add-mui-component

Scaffold a complete new MUI-based component for this repo. Every component requires
9 artefacts — produce all of them, in order, before reporting done.

## Required information

Before writing any files, confirm you have:
- **Component name** — PascalCase (e.g. `Chip`, `Alert`, `TextField`)
- **MUI base component** — the MUI component being wrapped (e.g. `Chip` from `@mui/material`)
- **Purpose** — one sentence describing what it does and what props/variants are relevant

If the user hasn't provided these, ask before proceeding.

---

## Step 1 — Design token files (3 tiers)

All token files use the **DTCG format** (`$type` / `$value` keys). References use
`{dotted.path.syntax}`. Never put resolved values in semantic or component files —
always reference the tier above.

### 1a. Primitive — `src/tokens/primitive/<name>.json`

Raw, brandless values. Use `<name>` = lowercase component name (e.g. `chip`).

Common `$type` values:
- `"color"` → hex or rgba string
- `"dimension"` → value with `px` unit
- `"number"` → unitless number (JSON number, not string — `400` not `"400"`)
- `"string"` → everything else (font families, etc.)

Model after `src/tokens/primitive/color.json` and `src/tokens/primitive/dimension.json`.

### 1b. Semantic — `src/tokens/semantic/<name>.json`

Group primitives into meaningful concepts (e.g. `default`, `hover`, `pressed`;
or `heading`, `body`). Every value must be a `{reference}` — never a raw value.

**Namespace isolation is critical.** Style Dictionary loads all three tier files
into the same flat namespace. If your semantic file declares `chip.color.*`, it
will collide with the primitive's `chip.color.*` and cause circular reference
errors. Introduce a sub-namespace that doesn't exist in the primitive tier — for
example use `chip.semantic.filled.*` instead of `chip.filled.*` if the primitive
already uses `chip.color.*`.

Model after `src/tokens/semantic/color.json`.

### 1c. Component — `src/tokens/component/<name>.json`

Map semantic tokens to the exact MUI variant/state shape the theme module will
consume. Key names should match MUI's naming where possible (e.g. `contained`,
`outlined`, `primary`, `secondary`). Every value must be a `{reference}`.

Same namespace isolation rule applies — component paths must not duplicate any
paths already declared in the primitive or semantic files.

Model after `src/tokens/component/button.json`.

---

## Step 2 — Rebuild tokens

```bash
source ~/.nvm/nvm.sh && nvm use 24.16.0 --silent && yarn build:tokens
```

This regenerates `src/tokens/generated/tokens.ts`. Run it and confirm it exits 0
before touching any TypeScript files — the theme module depends on the generated
`Tokens` type.

---

## Step 3 — Theme module — `src/theme/components/<name>.ts`

Export a single named function `muiXxx(tokens: Tokens)` (PascalCase the component
name in the function name, e.g. `muiChip`).

**For component-level overrides** (most components):
Return type is `Components<Theme>['MuiXxx']`. Import from `@mui/material/styles`.

```ts
import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

export const muiChip = (tokens: Tokens): Components<Theme>['MuiChip'] => {
  const { chip } = tokens;
  return {
    styleOverrides: {
      root: { /* base styles */ },
      // variant slots use token values
    },
  };
};
export default muiChip;
```

**For the typography scale** (only for Typography-like components):
Return type is `TypographyVariantsOptions` imported from `@mui/material/styles`.
Do NOT use `TypographyOptions` — that path doesn't exist in MUI v9.

Derive styles from the token tree programmatically where the structure is regular
(see `src/theme/components/button.ts` for the reduce-over-variants pattern). This
means adding a new concept to the tokens requires zero changes to this file.

**Asymmetric variant structures** (e.g. `outlined` has a `border` key but
`filled` does not) require a runtime narrowing check before accessing the
optional property:

```ts
const border = 'border' in t ? t.border : undefined;
// then: ...(border && { border: `1px solid ${border.default}` })
```

When dynamically indexing a token object with a string key, TypeScript may need
an explicit cast: `tokens.chip[variant as Variant]`.

---

## Step 4 — Wire into styleCreator — `src/theme/styleCreator.ts`

Add two lines and no more:

```ts
// 1. Import at top with the other component imports
import { muiChip } from './components/chip';

// 2. Register inside createThemeFromTokens — inside `components: { ... }`
MuiChip: muiChip(tokens),
```

For typography-scale modules, add as `typography: muiTypography(tokens)` at the
top level of the returned object (not inside `components`).

---

## Step 5 — React component — `src/components/<Name>/<Name>.tsx`

Thin MUI wrapper. No logic, no local state.

```tsx
import { Chip as MuiChip } from '@mui/material';
import type { ChipProps as MuiChipProps } from '@mui/material';

export interface ChipProps extends MuiChipProps {}

export const Chip = (props: ChipProps) => (
  <MuiChip {...props} />
);
```

If the MUI component uses `children`, spread and pass them:
```tsx
export const Chip = (props: ChipProps) => (
  <MuiChip {...props}>{props.children}</MuiChip>
);
```

---

## Step 6 — Barrel export — `src/components/<Name>/index.ts`

```ts
export { Chip } from './Chip';
export type { ChipProps } from './Chip';
```

---

## Step 7 — Storybook stories — `src/components/<Name>/<Name>.stories.tsx`

Follow `src/components/Button/Button.stories.tsx` exactly:

- `title: 'Stories/<Name>'`
- `tags: ['autodocs']`
- `satisfies Meta<typeof Xxx>`
- `export const Controls: Story = {}` — always include this as the first story
- Add 2–4 additional named stories that showcase the component's variants/states
- Use `<Stack>` or `<div className="storybook-container">` for multi-variant layouts
- `argTypes` should cover the key props with appropriate controls (`radio`, `boolean`, `select`)
- Hide `children` and callback props from the controls table with `{ table: { disable: true } }`

---

## Step 8 — MDX docs — `src/components/<Name>/<Name>.mdx`

Follow `src/components/Button/Button.mdx` exactly. Critical rule: **always use
HTML `<table>` tags** — never markdown pipe tables (`| col |`), which Storybook
does not render as tables.

Structure:
```
## <Name> Component
<one-paragraph description>

## Overview
<usage context, when to use it>

[📖 View <Name> Storybook](?path=/docs/stories-<name>--docs)

## Props
<HTML table: Prop | Type | Default | Description>
(cover all meaningful props, not just the ones you added)

## Design tokens
<intro sentence about token structure>

### <Variant or group name>
<HTML table: Token | Description>
(one subsection per logical group — contained/outlined/text, or primitive/semantic/component)
```

Use `<code>token.path.here</code>` for token paths inside `<td>` cells.

---

## Step 9 — Jest tests — `src/components/<Name>/<Name>.test.tsx`

Follow `src/components/Button/Button.test.tsx` exactly:

- Import from `@testing-library/react`
- Top-level `describe('<Name>', ...)` block
- Always test: renders with default props, each variant applies the right MUI class,
  children render correctly
- Check MUI classes with `.toHaveClass('MuiChip-root')`, `'MuiChip-colorPrimary'`, etc.
- Do NOT test visual styles (colours, font sizes) — test structure and MUI class application

---

## Final checks

After all 9 artefacts are written:

1. Run `yarn tsc --noEmit` and fix any type errors before reporting done.
   - If `TypographyOptions` import fails, use `TypographyVariantsOptions` from `@mui/material/styles` instead.
   - For `Components<Theme>['MuiXxx']` slots, derive the key with `Object.keys(tokens.<name>)` rather than hardcoding strings.
2. Run `yarn test --testPathPatterns="<Name>" --watchAll=false` and confirm all tests pass.
3. Report: list each file created/modified with its path, and confirm tsc + tests passed.

---

## Common pitfalls

| Pitfall | Fix |
|---|---|
| Markdown pipe tables in MDX | Always use HTML `<table>` tags |
| `number` token values as strings | Use JSON numbers: `400` not `"400"` |
| Editing `tokens.ts` directly | It's generated — edit the JSON source files and rebuild |
| Wrong `TypographyOptions` import path | Use `TypographyVariantsOptions` from `@mui/material/styles` |
| `yarn build:tokens` failing on Node 20 | Switch to Node 24.16.0 via nvm first |
| Forgetting to wire into `styleCreator.ts` | Always add import + registration — theme won't apply otherwise |
| Token namespace collision across tiers | Semantic/component paths must not duplicate any path in the primitive file — use a unique sub-namespace |
| TypeScript error indexing token object dynamically | Cast with `as Variant` or use `'border' in t` narrowing for asymmetric variant shapes |
