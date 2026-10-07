# `industries-served/` — "Industries We Serve"

Figma: node `483:1256` on the Services page, y 7463-8153. A heading + subtext + outline button row, then six industry cards (image placeholder, name, description) in a horizontally-scrolling strip.

- `industries-served.tsx` — the component (Server Component; content from `lib/data/services.ts`)
- `index.ts` — barrel export

## Placeholder content — read before editing copy here

Figma's own subtext on this section reads (verbatim): *"A snapshot of the sectors we design and build for, adapted from a reference site for layout only — swap in DenvoLab's real industries and case studies before this ships."* That second clause is a **build note left in the design file for whoever implements it, not copy meant for site visitors**, so it is **not** reproduced on the live page — only the genuinely-usable first clause ("A snapshot of the sectors we design and build for.") is kept, in `lib/data/services.ts`'s `INDUSTRIES_SERVED.description`.

The six industry cards (Hospitality & Travel, Healthcare, Fintech, SaaS & Tech, E-commerce, AI & Machine Learning) **are** reproduced verbatim from Figma — real, specific, well-written copy, not a note-to-self — but they carry the same "reference site, layout only" caveat from that same sentence, so they are **not confirmed as Denvo Lab's actual served industries or past case studies**. Replace both the description and the six cards with real content before this section ships to production; see the root `README.md`'s "Known TODOs".

## Typography

Every role here matches an existing token exactly, confirmed via `get_design_context`'s "styles contained in the design" metadata:

| Role | Figma style | Token used |
|---|---|---|
| Section heading | Heading/H2 (32/40/600) | `font-sans text-heading-2` |
| Subtext | Body/LG (18/28/400) | `font-sans text-body-lg` |
| Button label | Label/MD (14/20/2%/500), DM Mono | `Button`'s `outline` variant (carries its own `font-mono` override) |
| Card name | Heading/H5 (20/28/600) | `font-sans text-heading-5` |
| Card description | Body/MD (16/24/400) | `font-sans text-body-md` |
| "Photo placeholder" label | Label/SM (12/16/2%/500), DM Mono | `font-mono text-label-sm` |

## The outline button

"View All Case Studies" uses a new `Button` variant, `outline`, added to `ui/button/button.tsx` for this section — see that file's own comments for why it's a deliberate deviation from `component-tokens.css`'s pre-existing (but differently-colored, dark-styled) `--button-outline-*` tokens, and why its padding/font don't fit the shared `SIZE_STYLES` table.

## Card photo placeholders

Each card's 280x200 "Industry Image Placeholder" box (`bg-surface-secondary` / `border-border-primary` / `rounded-lg`) shows a centered "Photo placeholder" label when `imageSrc` is `null` — that label is itself part of the Figma design, not something invented here. `IndustryItem.imageSrc: string | null` follows the same pattern as `services-list/`'s Supporting Visual and `about-values/`'s illustrations; set it in `lib/data/services.ts` once real photos are supplied, and it swaps in as a `next/image` `fill` `object-cover` crop. Healthcare, Software & Apps and AI Tools have theirs (`public/images/services/current/industry-1/2/3.png`), shown at every screen size; Hotels & Travel, Money & Finance and Online Stores still show the empty box until their photos are added.

## Card width normalization

Figma's six "Reel Card" wrappers are 300px / 280px (x4) / 307px — each card's own image placeholder box inside is a consistent 280px regardless. That reads as the same kind of per-card drift this project normalizes elsewhere (see `about-values/README.md`), so every card here uses the majority 280px width, not the two outliers.

## Layout: horizontal scroll, not a wrapping grid

"Reel Card Row" is built as a horizontally-scrolling strip (`overflow-x-auto`), not a wrapping grid — the six fixed-width cards don't fit any viewport narrower than roughly 1880px side by side, and "Reel" in the Figma layer name reads as a scrolling filmstrip, not a design asking to reflow into columns. No scroll-snap or autoplay is added since Figma doesn't specify a motion behavior here, unlike `about-values/`'s explicitly-marqueed row.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

The pictures have no entrance animation: the site-wide corner reveal (`data-image-reveal`, see `components/motion/image-reveal/`) was taken off this section at the user's request (Oct 7, 2026), so they are simply shown.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
