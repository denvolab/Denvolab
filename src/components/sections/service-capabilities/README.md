# `service-capabilities/`

The "what we do" section of a service detail page (Figma "Capabilities / <service>"). Every page lays it out differently, so the block's `layout` picks one of six components. They share the white section frame (96px top/bottom, 40px sides, max 1920).

| File | Layout | Page | Figma |
|---|---|---|---|
| `editorial-list.tsx` | Title + Brand/50 principles card on the left, six icon rows spread over 900px on the right, a hairline under each | Branding | `701:14176` |
| `card-grid.tsx` | Rows of three grey cards (component "Service / Capability / 588"). UI/UX: fixed 588px cards, rows 32px apart. SaaS: cards share the row (592px), rows 64px apart | UI/UX, SaaS | `701:14342`, `701:14672` |
| `anatomy.tsx` | Centered title, then "before" column / picture with lime note / "after" column | Mobile app | `701:14485` |
| `indexed-grid.tsx` | Centered title, 3-column grid with big grey index numbers | Web | `701:14868` |
| `wide-cards.tsx` | Eyebrow + title, rows of two 896px tinted cards with white icon tiles (component "Service / Capability / 896") | MVP | `701:15108` |
| `list-feature.tsx` | Title + six icon rows on the left, grey picture card on the right | AI agent | `701:15331` |
| `service-capabilities.tsx` | `ServiceCapabilities`: the section frame + the switch on `layout` | | |
| `index.ts` | Barrel export | | |

Icons are `ui/service-icon` tiles: 56px Brand/100 tiles in lists, 72px Secondary/50 tiles in the 588 cards (32px glyph), 72px white tiles with a 48px glyph in the MVP cards.

Two details kept exactly as designed: the MVP "Feature prioritization" card uses the 56px tile and is 16px shorter than its neighbour (`iconSize` in the data), and the AI agent title box is wider than its column in Figma, so its two lines never wrap.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

- `editorial-list`: icon rows stack (icon, title, text) on phones; one row from `md`.
- `card-grid`: one column on phones, two from `md`, Figma's rows of three from `xl` (the row wrappers use `display: contents` below `xl`). Card padding 24px on phones.
- `anatomy`: the before / after columns are three across above and below the picture on tablets, one column on phones.
- `indexed-grid`: the index column narrows to 64px on phones.
- `wide-cards`: two cards per row from `md`, stacked on phones.
- `list-feature`: card padding 24px on phones.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The heading of every layout (`card-grid`, `indexed-grid`, `editorial-list`, `list-feature`, `anatomy`, `wide-cards`) now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the `editorial-list` card, the `list-feature` card and the `anatomy` picture. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
