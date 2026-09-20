# `button/`

| File | What it is |
|---|---|
| `button.tsx` | The `Button` component. Renders a Next.js `<Link>` for internal pages, or a plain `<a target="_blank">` for external links (socials, WhatsApp) when `external` is passed. |
| `index.ts` | Re-exports `Button` so other files can `import { Button } from "@/components/ui/button"`. |

## Variants

| `variant` | Looks like | Used for |
|---|---|---|
| `primary` (default) | Solid lime background, dark text | "Become a Client" CTAs |
| `ghost` | Plain text, brightens on hover | Nav links, footer links |
