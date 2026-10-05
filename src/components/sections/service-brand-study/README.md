# `service-brand-study/`

The branding page's identity study (Figma component "3.1 / Study / Brand identity", instance `701:14218`, named "Parallax hero" in the file).

| File | What it is |
|---|---|
| `service-brand-study.tsx` | `ServiceBrandStudy` (Server Component). Three overlapping cards on a Brand/100 panel. |
| `index.ts` | Barrel export. |

The panel is 1840 x 860, radius 12. The cards sit at fixed Figma positions:

1. dark "form." specimen, 960 x 698 at (96, 72), with the four-colour strip
2. white typography card, 580 x 600 at (1140, 40)
3. lime application card, 710 x 152 at (1020, 658), drawn last so it overlaps card 1

**Scaling:** the panel keeps its proportions at every width. Every size inside is "Figma px x `--k`", where `--k` is 1px when the panel is 1840px wide (`100cqw / 1840` on an `@container`). At 1920 it is pixel for pixel the Figma frame; on a narrower desktop the composition shrinks as one piece. Same idea as `ai-orbit/frame.ts`.

The Figma layer name suggests a parallax effect, but the file has no motion spec, so the cards are static for now.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

From `xl` (1280px) the panel is the scaled Figma composition. Below that the three cards are stacked at normal reading sizes: the dark specimen first, then the typography card and the lime application card (side by side from `md`). Only one version is displayed at a time, so screen readers read the content once.

## Page colour wash: fades, chips and tints (Oct 4, 2026)

The brand study panel carries `data-wash="keep"`: it is artwork with its own colours, so the page colour wash never recolours it or anything in it (its light-lime background would otherwise count as a tint). See `components/motion/color-wash/README.md`.
