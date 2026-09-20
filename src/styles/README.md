# `styles/` — Design Tokens

This folder holds the site's two foundational, "change-it-once" libraries:

| File | What it is |
|---|---|
| `tokens/colors.css` | The **Color library** — a 1:1 mirror of Figma's Color Primitives + Color Semantic (Light/Dark) variable collections. See `tokens/README.md`. |
| `tokens/foundations.css` | Spacing/Radius/Border-Width primitives, scoped to backing the component tokens below (not a general Tailwind spacing override). |
| `tokens/component-tokens.css` | The **Button/Input component tokens** — a 1:1 mirror of Figma's Component Tokens variable collection. |
| `tokens/typography.css` | The **Font library** — every typeface and text style, in one file, using fluid (min/max scaling) sizes instead of breakpoints. See `tokens/README.md`. |

## Why this exists separately from `app/globals.css`

`app/globals.css` still exists, but its job changed: it no longer **holds** any color or font values — it only **wires** the tokens from this folder into Tailwind (via `@theme inline`), so a class like `bg-primary` or `text-heading-2` works in JSX.

Splitting it this way means:

- **The values live in one obvious place.** Want to change the primary color or a font size? Open `tokens/colors.css` or `tokens/typography.css` — never hunt through `globals.css` or component files.
- **Every component is automatically "wired in."** Because every component reads color/type via a Tailwind class (`bg-primary`, `text-heading-2`, ...) rather than a hardcoded hex or px value, changing the token here changes it *everywhere that class is used* — no find-and-replace across the codebase.

## The one rule

**Never hardcode a color or font-size in a component.** If the value you need isn't a token yet, add it to `tokens/colors.css` / `tokens/typography.css` first (as a new semantic token, referencing a primitive), then use the Tailwind class it creates. This is what "component based" means for this project: the design system is the single source of truth, components only ever reference it by name.
