# `tokens/` — Color Library, Font Library & Component Tokens

Every file here is pulled **directly from the Figma file's variable collections** (`I1pKT66lH6Iiv70gGqh6bH`, via the Plugin API — `figma.variables.getLocalVariableCollectionsAsync()`), not approximated from a documentation frame. If a color exists as a variable in Figma, it exists here — primitives, both Light and Dark semantic modes, and the Button/Input component tokens.

## The four layers

```
Primitives (colors.css, foundations.css)
    ↓
Semantic (colors.css — Figma's exact "02 · Color Semantic" names, Light + Dark)
    ↓
App aliases (colors.css — short names components use: bg-primary, text-foreground)
    ↓
Component tokens (component-tokens.css — Button/Input's own values, from Figma's "06 · Component Tokens")
```

Each layer only ever points at the layer above it — never skips one. This is what "component based" means here: **every color is traceable to exactly one primitive**, through as many named hops as make it meaningful, and changing any one hop cascades to everything below it.

| File | Mirrors Figma collection | Holds |
|---|---|---|
| `colors.css` | `01 · Color Primitives`, `02 · Color Semantic` | Every primitive ramp + the full semantic layer (Light default, Dark under `[data-theme="dark"]`) + the short app-alias names |
| `foundations.css` | `03 · Spacing`, `04 · Radius`, `05 · Border Width` | Just enough of these three scales to back the component tokens below — **not** wired into Tailwind's theme (see the note in that file) |
| `component-tokens.css` | `06 · Component Tokens` | The 41 Button/Input variables, aliasing `colors.css` + `foundations.css` |
| `typography.css` | — (not a Figma variable collection; Figma text styles) | Font families + the 15 fluid/fixed text styles |

`app/globals.css` imports all four and wires the color/font ones into Tailwind's `@theme` (component-token spacing/radius/height values stay plain CSS vars — see `foundations.css`).

---

## 1. Primitives (`colors.css`) — 63 variables

Raw ramps. **Never reference these directly in a component** — go through semantic or an app alias.

| Ramp | Steps | Tailwind classes |
|---|---|---|
| `--brand-*` | 25/50/100/200/300/400/500/**600**/700/800/900/950 (600 = `#DFE94C`, the lime accent) | `bg-brand-25` … `bg-brand-950` |
| `--secondary-*` | same 12 steps (900 = `#142030`, the deep navy) | `bg-secondary-25` … `bg-secondary-950` |
| `--gray-*` | same 12 steps, blue-tinted "slate" | `bg-gray-25` … `bg-gray-950` |
| `--success-*` / `--warning-*` / `--error-*` / `--info-*` | 50/100/300/500/700/900 each | `bg-success-50` … `bg-success-900`, etc. |
| `--base-white` / `--base-black` / `--base-transparent` | — | not exposed to Tailwind — use its built-in `bg-white`/`bg-black`/`bg-transparent`, same values |

## 2. Semantic (`colors.css`) — 46 variables × Light/Dark

Figma's exact `02 · Color Semantic` names, kebab-cased. Light is the default (`:root`); Dark lives under `:root[data-theme="dark"]`. **The app doesn't switch themes today** — the homepage has one fixed dark-leaning look, not a toggle — but the plumbing is complete: set `data-theme="dark"` on `<html>` and every one of these repaints.

| Group | Tokens | Tailwind classes |
|---|---|---|
| Background | `background-primary`, `background-secondary`, `background-inverse` | `bg-background-primary`, etc. |
| Surface | `surface-primary`, `surface-secondary`, `surface-brand`, `surface-brand-2`, `surface-success/warning/error/info`, `surface-pressed` | `bg-surface-primary`, etc. |
| Text | `text-primary`, `text-secondary`, `text-tertiary`, `text-disabled`, `text-inverse`, `text-on-brand`, `text-on-secondary`, `text-success/warning/error/info` | `text-text-primary`, etc. |
| Border | `border-primary`, `border-secondary`, `border-focus`, `border-success/warning/error/info` | `border-border-primary`, etc. |
| Icon | `icon-primary`, `icon-brand`, `icon-secondary`, `icon-disabled` | `text-icon-primary` / `bg-icon-primary` (icons take fill via `text-*` or `bg-*` depending on how they're drawn) |
| Brand/Secondary/Status defaults | `brand-default`, `brand-hover`, `brand-pressed`, `brand-subtle`, `secondary-default`, `secondary-hover`, `secondary-pressed`, `secondary-subtle`, `success-default`, `warning-default`, `error-default`, `info-default` | `bg-brand-default`, etc. |

## 3. App aliases (`colors.css`) — the names components actually use

Short, ergonomic names, each pointing at a semantic token above (so they follow Light/Dark automatically) — except the two page-specific dark section backgrounds, which point straight at a primitive because this homepage's section colors are a fixed design choice, not theme-dependent.

| Token | Utility classes | Points at | Meaning |
|---|---|---|---|
| `--color-primary` | `bg-primary` `text-primary` `border-primary` | `brand-default` (`brand-600` `#DFE94C`) | **"The primary color."** CTAs, links, highlights. |
| `--color-primary-hover` / `-pressed` | `bg-primary-hover` etc. | `brand-hover` / `brand-pressed` | Primary hover/pressed states. |
| `--color-brand` | `bg-brand` `text-brand` | = `--color-primary` | Alias — Figma's own "Brand" naming. |
| `--color-brand-ink` | `text-brand-ink` | `text-on-brand` (`secondary-950`) | Text/icons on top of the primary/brand fill. |
| `--color-secondary` | `bg-secondary` `text-secondary` | `secondary-default` (`secondary-700`) | The navy action color (buttons). |
| `--color-secondary-hover` / `-pressed` | | `secondary-hover` / `secondary-pressed` | Secondary hover/pressed states. |
| `--color-on-secondary` | `text-on-secondary` | white | Text/icons on a secondary (navy) fill. |
| `--color-foreground` | `text-foreground` | `text-primary` (`gray-950`) | **"The text color."** Main body/heading text. |
| `--color-foreground-muted` / `-subtle` / `-disabled` | | `text-secondary` / `text-tertiary` / `text-disabled` | Lower-emphasis text. |
| `--color-foreground-inverse` | `text-foreground-inverse` | `text-inverse` (white) | Text on dark sections (header/hero/footer). |
| `--color-background` / `-subtle` | `bg-background` etc. | `background-primary` / `background-secondary` | Base light-section canvas. |
| `--color-surface` | `bg-surface` | `surface-secondary` (`gray-100`) | Light gray section bg (portfolio, "what we create"). |
| `--color-surface-dark` | `bg-surface-dark` | `gray-900` directly | Dark section bg (header, hero, footer) — page-specific. |
| `--color-surface-dark-deep` | `bg-surface-dark-deep` | `secondary-900` directly | Alternate dark section (AI-orbit, partner logos) — page-specific. |
| `--color-surface-accent` | `bg-surface-accent` | `surface-brand-2` (`brand-950`) | Olive contact-CTA section bg. |
| `--color-border` / `-subtle` | `border-border` etc. | `border-primary` / `border-secondary` | Default/faint dividers. |
| `--color-border-focus` | `border-border-focus` `ring-border-focus` | `border-focus` | Focus rings/outlines. |
| `--color-success/warning/error/info` (+ `-bg` / `-text`) | | `*-default` / `surface-*` / `text-*` | Status colors for forms, badges. |

## 4. Component tokens (`component-tokens.css`) — 41 variables

Figma's exact `06 · Component Tokens` collection — what the Button (36 variants) and Input (5 states) components are actually built from. `Button` (`src/components/ui/button/`) already consumes these directly (`bg-button-primary-bg`, `text-button-primary-text`, …) rather than a generic alias — this is the pattern for any future component with its own Figma token set (an Input component would consume `--input-*` the same way).

| Token | Value | Used for |
|---|---|---|
| `button-primary-bg` / `-bg-hover` / `-bg-pressed` | `brand-600` / `brand-700` / `brand-800` | Primary button background states |
| `button-primary-text` | `secondary-950` | Primary button text |
| `button-secondary-bg` / `-bg-hover` / `-bg-pressed` | `secondary-700` / `-600` / `-500` | Secondary button background states |
| `button-secondary-text` | white | Secondary button text |
| `button-outline-border` / `-text` | `gray-700` / white | Outline button (no fill by default) |
| `button-outline-bg-hover` / `-bg-pressed` | `gray-800` / `gray-700` | Outline button hover/press tint |
| `button-ghost-text` | white | Ghost button text (no fill by default) |
| `button-ghost-bg-hover` / `-bg-pressed` | `gray-800` / `gray-700` | Ghost button hover/press tint |
| `button-radius` / `-gap` | `radius-md` (8px) / `space-sm` (8px) | Shared button geometry |
| `button-size-{sm,md,lg}-padding-x` | `space-lg/xl/2xl` (16/20/24px) | Per-size horizontal padding |
| `button-size-{sm,md,lg}-height` | 36 / 44 / 52px | Per-size height |
| `input-bg` / `-bg-disabled` | `gray-900` / `gray-800` | Input fill (always dark, regardless of section) |
| `input-border` / `-border-focus` / `-border-error` / `-border-disabled` | `gray-700` / `brand-500` / `error-700` / `gray-800` | Input border per state |
| `input-text` / `-text-placeholder` / `-text-disabled` | white / `gray-500` / `gray-600` | Input text per state |
| `input-label` / `-helper-text` / `-helper-text-error` | `gray-300` / `gray-500` / `error-300` | Supporting input text |
| `input-radius` / `-padding-x` / `-gap` | `radius-md` / `space-lg` / `space-sm` | Input geometry |
| `input-border-width` / `-border-width-focus` | `border-width-default` (1px) / `-thick` (2px) | Input border weight |
| `input-height` | 44px | Input height |

Only the **color** component tokens are exposed as Tailwind classes (`bg-button-primary-bg`, `border-input-border`, etc.) — the geometry ones (`radius`, `gap`, `padding-x`, `height`, `border-width`) stay plain CSS variables, consumed via Tailwind's arbitrary-value syntax if a component needs them (e.g. `rounded-[var(--button-radius)]`), so they don't redefine Tailwind's own default spacing/radius scale site-wide. See the note at the top of `foundations.css`.

---

## How to change something

- **A primitive color** (shift a whole ramp): edit the hex in `colors.css`'s primitives section.
- **What a semantic token means** (e.g. redefine what "surface/secondary" points to): edit its line in the semantic section.
- **The app's primary/text/etc. color**: edit the app-alias line — this is the one most day-to-day changes touch.
- **A Button or Input color**: edit its line in `component-tokens.css` — this changes that component only, without touching the generic brand/secondary colors used elsewhere.
- **Enable dark mode**: no code change needed — set `data-theme="dark"` on `<html>` wherever a theme switcher decides to.

---

## `typography.css` — the Font library

### Font families (`--font-heading` / `--font-sans` / `--font-mono`)

Self-hosted via Fontsource, imported in `app/layout.tsx`. See the root `README.md`'s "Known TODOs" for the Mona Sans → Sora stand-in note.

### The 15 text styles — fluid, not breakpoint-based

Each named style (`Display/2XL`, `Heading/H1`, `Body/MD`, ...) becomes **one Tailwind class** bundling font-size + line-height + letter-spacing + font-weight together — e.g. `text-display-2xl`. Pair it with the matching `font-*` family class (see table).

**11 of the 15 are fluid**: their font-size is a CSS `clamp()` that scales continuously between a minimum (small phones) and the exact Figma desktop value (maximum) — literally a different size at every viewport width in between, never a jump at a breakpoint. The other 4 (Label/Caption/Code — small mono UI text) are fixed-size on purpose: shrinking small UI text below its designed size hurts legibility more than fluid scaling helps.

| Style | Class | Family | Weight | Min → Max (fluid) or fixed | Line-height |
|---|---|---|---|---|---|
| Display/2XL | `text-display-2xl` | `font-heading` | 600 | 40px → 72px | 1.111 |
| Display/XL | `text-display-xl` | `font-heading` | 600 | 36px → 60px | 1.133 |
| Display/LG | `text-display-lg` | `font-heading` | 600 | 32px → 48px | 1.167 |
| Heading/H1 | `text-heading-1` | `font-heading` | 600 | 28px → 40px | 1.2 |
| Heading/H2 | `text-heading-2` | `font-sans` | 600 | 24px → 32px | 1.25 |
| Heading/H3 | `text-heading-3` | `font-sans` | 600 | 22px → 28px | 1.286 |
| Heading/H4 | `text-heading-4` | `font-sans` | 600 | 20px → 24px | 1.333 |
| Heading/H5 | `text-heading-5` | `font-sans` | 600 | 18px → 20px | 1.4 |
| Body/LG | `text-body-lg` | `font-sans` | 400 | 16px → 18px | 1.556 |
| Body/MD | `text-body-md` | `font-sans` | 400 | 15px → 16px | 1.5 |
| Body/SM | `text-body-sm` | `font-sans` | 400 | 13px → 14px | 1.429 |
| Label/MD | `text-label-md` | `font-mono` | 500 | 14px fixed | 20px |
| Label/SM | `text-label-sm` | `font-mono` | 500 | 12px fixed | 16px |
| Caption/MD | `text-caption-md` | `font-mono` | 400 | 12px fixed | 16px |
| Code/MD | `text-code-md` | `font-mono` | 400 | 14px fixed | 20px |

Note: Heading/H1 uses the **display** font (Mona Sans/Sora), while Heading/H2–H5 use the **body** font (DM Sans) at semibold — this matches the Figma spec exactly, it's not a typo.

### Min/max sizing: where the numbers came from

Figma only defines one (desktop/max) size per style. The **max** in the table above is that exact Figma value; the **min** is a reasoned mobile-scale companion chosen to keep proportions and hierarchy sensible at small viewports — not itself specified in Figma. If a specific min size looks off on a real device, adjust it (see below) rather than treating it as fixed.

### How to change the scale

1. Edit the `SCALE` table in `scripts/generate-fluid-type.mjs` (min/max px per style).
2. Run `node scripts/generate-fluid-type.mjs`.
3. Paste the printed `clamp()` values into the matching `--text-style-*-size` lines in `typography.css`.

Don't hand-edit a `clamp()` value directly — it won't match what the generator would produce from the min/max pair, and the next person to touch it won't know where the numbers came from.

### Interpolation range

The fluid scale interpolates between a **390px** viewport (mobile reference) and a **1920px** viewport (desktop reference) — the actual mobile/desktop frame widths in the Figma file. Change `MIN_VIEWPORT` / `MAX_VIEWPORT` in the generator script if that range should shift.
