# `what-we-create/` — Services Showcase

Figma: heading at node `230:4063` (y 4501-4689), 6-card grid below it (y 4844-6332), all inside the light-gray section background `Rectangle 40` (y 4240-6423 — confirmed via the node's actual fill, `--color-surface` / gray-100).

- `what-we-create.tsx` — the component (content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

Unlike `portfolio-grid/`, every card here already uses the design system's real tokens consistently in the Figma source (Heading/H2, Body/MD, `text/primary`, `text/secondary`, `secondary/default` button) — no normalization judgment call was needed.

## The "SEE MORE" button

This introduced a new `Button` variant (`variant="secondary" size="sm"`, see `components/ui/button/button.tsx`). Its text color came from reading the button instance's bound variables directly (`get_variable_defs`), not just the codegen's fallback hex — it's genuinely bound to `brand/subtle`, not the `button-secondary-text` component token (which aliases plain white). See the comment in `button.tsx` for why that token wasn't changed to match.

## Responsive

Single column through **both** mobile and tablet (`grid-cols-1`, stepping to `lg:grid-cols-3` only at desktop) — per the homepage-responsive-tablet-mobile project doc, a 2-column tablet layout forces the description text onto more lines than the fixed-aspect background image can accommodate before the product-mockup artwork begins, causing text/image overlap. Card height uses `aspect-[350/429]` below `lg` (matching the near-identical aspect ratio of both the mobile 350×429 and tablet 688×844 Figma cards) instead of a fixed pixel height, switching to the desktop's fixed `h-[720px]` at `lg:`.

## Background images (added Sept 22, 2026)

Figma's own 6 image fills (nodes `237:5232`, `238:5338`, `238:5330`, `238:5346`, `238:5322`, `238:5354`) could never be exported into this codebase — same sandbox network limitation noted throughout `components/sections/README.md`. Instead, the user supplied 7 real product-mockup photos (device/website/dashboard shots, one branding shot), which were matched by content to each card's topic and saved at `public/images/what-we-create/<slug>.png`, with `imageSrc` set per item in `lib/data/homepage.ts` (`WHAT_WE_CREATE_ITEMS`):

| File | Card |
|---|---|
| `ui-ux-design.png` | AI-Enhanced UI/UX Design |
| `mobile-app.png` | AI Driven Mobile App Design & Development |
| `saas-design.png` | AI Integrated SaaS Design & Development |
| `cms-design.png` | AI Agent Custom CMS Design & Development |
| `web-design.png` | AI Powered Web Design & Development |
| `branding-design.png` | Branding Design & Brand Guideline |

A 7th uploaded file was left unused: near-identical to what's now `web-design.png` (same dashboard-plus-code-editor-plus-tablet composition, different file size so not a byte-identical duplicate, but visually indistinguishable and not needed since there's only one "Web Design" card). It's still sitting in `public/images/services/` (the folder the user originally uploaded everything into, renamed to lowercase on Sept 28, 2026 when the Services page images moved in) under its original name, `Image 2.png`, in case it's wanted for something else later.

Card text sits **on top of** its image (not below it, like `portfolio-grid`) — the design overlays the title/description/button directly on the photo, top-left, padded 32px. All 6 supplied photos are the same style of product-mockup shot: plain background at the top of the frame, devices/artwork lower down. `object-cover` alone (the CSS default `object-position: 50% 50%`) center-crops each image, and on the mobile/tablet card's much shorter aspect ratio (`aspect-[350/429]` vs desktop's fixed `h-[720px]`) that pulled the busy device content up into the text-overlay zone, right behind the description — confirmed by screenshotting at 390px width, where the dashboard/phone-screen text visually collided with the card's own copy. Fixed by adding `object-top` alongside `object-cover` on the `<img>`, which keeps each photo's plain top region behind the text at every breakpoint instead of the scrim/contrast fallback this section anticipated needing.

## Ripple hover (added Sept 23, 2026, fixed same day)

Card pictures now use `RippleImage` (`components/ui/ripple-image/`) instead of a plain `<img>`, so hovering a card gives the same water-ripple bend as `portfolio-grid`'s ("Our Work") project pictures — the user specifically asked for that section's hover feel here. This also resolves the old "swap for next/image once assets are finalized" TODO on the `<img>`, since the real card photos were wired in Sept 22; `RippleImage` renders through `next/image` internally.

One deliberate difference from `portfolio-grid`: the outer card `div` keeps `overflow-hidden` (it did already, for the rounded corners and border). `portfolio-grid`'s pictures are standalone elements with open space around them, so the effect's edge-wobble bulge (up to 60px) is free to extend past the picture. Here the picture fills the entire bordered card edge-to-edge with text overlaid on it, inside a dense 3-column grid — letting the wobble escape the card would cross the card's own border and reach toward the neighboring card. Keeping `overflow-hidden` clips that outward bulge at the card boundary while leaving the water-ripple bend (the part of the effect that happens *within* the picture) fully intact.

**Two bugs shipped in the first pass, both reported by the user right after ("the content gone... it seems jarging while hovering") and both fixed the same day in the shared `RippleImage` component, not here:**

1. **The title, description and button visually disappeared while hovering.** The hover canvas has an inline `z-index: 2`; with nothing containing it, that beat the card's overlaid text and button (`z-index: auto`) regardless of DOM order. Fixed by giving `RippleImage`'s own frame `isolate` (CSS `isolation: isolate`), which contains the canvas's `z-index` inside the frame's own stacking context so the card's text and button reliably render on top — see `ripple-image/README.md`.
2. **The picture visibly jumped the moment a hover started.** The card used `object-top` on `imageClassName` to crop the resting picture, but the hover canvas's crop was hardcoded to always center — so the visible part of the picture snapped from "top" to "center" on every hover and back on every leave. Fixed by switching to `RippleImage`'s new `objectPosition="top"` prop, which drives the resting crop and the hover crop from the same source so they can't disagree — see `ripple-image/README.md`.

Verified in headless Chromium after the fix: the WebGL canvas is created on hover (confirmed via `querySelector('canvas')`) and keeps its `z-index: 2`, but `document.elementFromPoint()` at the title's and the button's on-screen position returns the title/button element, not the canvas, confirming they render on top throughout the hover; the title's computed `opacity` stays `1` and `visibility` stays `visible` the whole time. Computed `overflow: hidden` and `border-radius: 24px` are unchanged on the card during hover, and `document.documentElement.scrollWidth` never exceeds `clientWidth` before, during, or after hovering. Screenshots taken at rest and mid-hover show the same picture framing (no visible jump). `portfolio-grid`'s own hover was re-checked after these shared-component changes and still creates its canvas and ripples normally — no regression.

## Links to the service pages (Oct 2026)

The user asked for the homepage's service section to connect to the service pages. Each card's title is now a link too (underlined on hover), and the "SEE MORE" button already was, so both go to the same page. The links live with the cards in `lib/data/homepage.ts` (`WHAT_WE_CREATE_ITEMS[].cta.href`). Four of them used to point to slugs that don't exist (404s); they now match the real pages in `lib/data/service-detail/`:

| Card | Page |
|---|---|
| AI-Enhanced UI/UX Design | `/services/ui-ux-design` |
| AI Driven Mobile App Design & Development | `/services/mobile-app-development` |
| AI Integrated SaaS Design & Development | `/services/saas-development` |
| AI Agent Custom CMS Design & Development | `/services/ai-agent-custom-cms` |
| AI Powered Web Design & Development | `/services/web-development` |
| Branding Design & Brand Guideline | `/services/branding-visual-identity` |

Checked with Playwright: every link on the homepage returns 200.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on each card (the ripple hover is unchanged). See `components/motion/image-reveal/`.

Its one-off Figma text colours are written as `wash-ink [--ink:#hex]` instead of `text-[#hex]`, so they stay readable when the page colour wash turns the screen the other way. In the section's own colour they are exactly the same hex. See `components/motion/color-wash/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
