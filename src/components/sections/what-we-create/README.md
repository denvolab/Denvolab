# `what-we-create/` — Services Showcase

Figma: heading at node `230:4063` (y 4501-4689), 6-card grid below it (y 4844-6332), all inside the light-gray section background `Rectangle 40` (y 4240-6423 — confirmed via the node's actual fill, `--color-surface` / gray-100).

- `what-we-create.tsx` — the component (content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

Unlike `portfolio-grid/`, every card here already uses the design system's real tokens consistently in the Figma source (Heading/H2, Body/MD, `text/primary`, `text/secondary`, `secondary/default` button) — no normalization judgment call was needed.

## The "SEE MORE" button

This introduced a new `Button` variant (`variant="secondary" size="sm"`, see `components/ui/button/button.tsx`). Its text color came from reading the button instance's bound variables directly (`get_variable_defs`), not just the codegen's fallback hex — it's genuinely bound to `brand/subtle`, not the `button-secondary-text` component token (which aliases plain white). See the comment in `button.tsx` for why that token wasn't changed to match.

## Responsive

Single column through **both** mobile and tablet (`grid-cols-1`, stepping to `lg:grid-cols-3` only at desktop) — per the homepage-responsive-tablet-mobile project doc, a 2-column tablet layout forces the description text onto more lines than the fixed-aspect background image can accommodate before the product-mockup artwork begins, causing text/image overlap. Card height uses `aspect-[350/429]` below `lg` (matching the near-identical aspect ratio of both the mobile 350×429 and tablet 688×844 Figma cards) instead of a fixed pixel height, switching to the desktop's fixed `h-[720px]` at `lg:`.

## Known gap

None of the 6 background images (Figma nodes `237:5232`, `238:5338`, `238:5330`, `238:5346`, `238:5322`, `238:5354`) could be exported into this codebase — same sandbox network limitation noted throughout `components/sections/README.md`. Each card falls back to a plain white fill behind its text (so the title/description stay legible) until real images are exported and dropped at `public/images/what-we-create/<slug>.png`, with `imageSrc` set per item in `lib/data/homepage.ts` (`WHAT_WE_CREATE_ITEMS`).

Card text sits **on top of** its image (not below it, like `portfolio-grid`) — the design overlays the title/description/button directly on the photo, top-left, padded 32px. Whatever real images land here need enough contrast in that top-left region for dark text to stay legible, or the design will need a scrim added behind the text.
