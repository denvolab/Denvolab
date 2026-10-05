# `contact-hero/`

The dark opening block of the Contact page (`/contact`). Figma: node `584:2195` in the "Contact" frame `584:2194`.

| File | What it is |
|---|---|
| `contact-hero.tsx` | `ContactHero` (Server Component). Eyebrow "CONTACT", the headline and the intro, from `lib/data/contact.ts`. |
| `index.ts` | Barrel export. |

## Layout

- **xl+ (1280px):** eyebrow + headline on the left (760px wide), intro on the right (483px wide, 32px in from the side padding), both on the same bottom line. The eyebrow starts 215px under the site header and the block ends 144px under the headline, so at 1920 the header + hero is 640px tall, exactly like the frame.
- **Below xl:** eyebrow + headline, then the intro, stacked. Same padding and rhythm as the About hero (`about-hero/`), since Figma has no smaller version of this page.

The frame's own nav bar is not repeated: the global Header is already above every page (same as the About hero).

## Type and color (Figma styles)

| Element | Figma | Code |
|---|---|---|
| Eyebrow | Label/MD, `brand/default` | `font-mono text-label-md text-brand-default` |
| Headline | Display/2XL, `text/inverse` | `font-heading text-display-2xl text-foreground-inverse` |
| Intro | Body/LG, Gray/300 | `font-sans text-body-lg text-gray-300` |

Checked against Figma's own export at 1920: every box lands on the same pixel (eyebrow y 292, headline 760 x 160 at y 336), text differs only by anti-aliasing.
