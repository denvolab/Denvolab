# `service-conversation/`

The lime closing band of every service page (Figma "Conversation / Start something meaningful", e.g. `701:14241`).

| File | What it is |
|---|---|
| `service-conversation.tsx` | `ServiceConversation` (Server Component). Wraps its content in `ui/lens-distortion`. |
| `index.ts` | Barrel export. |

## Layout

brand/default, 96px top/bottom. Title (Display/XL, Gray/900) in an 857px box on the branding page and 1320px on the others, then 80px, then a 440px column: the description and a Gray/900 "Let's talk" button (135 x 60).

## The effect

In Figma the frame carries the "Lens distortion" shader effect (Distortion 0, Aberration 0.02 on pages 01-02 and 0.03 on 03-07, centre 50/50, Lateral, High quality). It smears the text near the left and right edges into red/blue fringes and puts a bright rim on the edges. That is part of the design, so it is reproduced with the same shader maths in WebGL: see `ui/lens-distortion/README.md`. The text and the button stay real HTML. Checked against Figma's export at 1920: the smeared headline matches it almost pixel for pixel.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

The lens shader runs from `xl` (1280px) up only. On tablets and phones the plain lime band is shown, because the edge smear made the paragraph and button hard to read at those sizes.
