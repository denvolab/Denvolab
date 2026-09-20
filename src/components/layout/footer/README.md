# `footer/` — Site Footer

| File | What it is |
|---|---|
| `footer.tsx` | The footer: logo, four link columns (Shop / Services / Expert Domain / Contact), and the giant DENVOLAB wordmark. Fetches its own column data. |
| `index.ts` | Re-exports `Footer` so other files can `import { Footer } from "@/components/layout/footer"`. |

## To change the footer links

Don't edit this folder — edit `src/lib/data/footer.ts`. This folder only decides *how columns are displayed*, not *which links exist*.

## Known TODO

The logo currently loads from a temporary Figma export link (see the comment inside `footer.tsx`). Export the real logo SVG from Figma and save it as `public/denvolab-logo.svg`, then update the `src` in `footer.tsx` to `/denvolab-logo.svg`.
