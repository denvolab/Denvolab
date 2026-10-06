# `service-conversation/`

The lime closing band of every service page (Figma "Conversation / Start something meaningful", e.g. `701:14241`).

| File | What it is |
|---|---|
| `service-conversation.tsx` | `ServiceConversation` (Server Component). Wraps its content in `ui/lens-distortion`. |
| `index.ts` | Barrel export. |

## Layout

The same lime banner the other pages use (`.home-conversation*` in `app/home.css`, the markup of `SiteConversation` / `HomeConversation`): title and description side by side (880px each on the 1920 frame), stacked on phone, same title size and button. Only the copy comes from the page's data: title, description, button label/link and the shader's aberration. The old `titleWidth` field in `types/service-detail.ts` is no longer read.

The service pages have their own spacing in Figma, set in `service-detail.css`: 120px top/bottom on desktop (a 386px frame; the homepage banner is 96px / 338px), 64px / 24px sides on tablet, 48px / 16px on phone. `data-homepage` is set on the section because `home.css` scopes the banner's button and heading styles to it. A second rule in `service-detail.css` stops the generic service-section padding from stacking on the banner's own (before this, the band measured about 810px at 1920 instead of 386px).

## The effect

In Figma the frame carries the "Lens distortion" shader effect (Distortion 0, Aberration 0.02 on pages 01-02 and 0.03 on 03-07, centre 50/50, Lateral, High quality). It smears the text near the left and right edges into red/blue fringes and puts a bright rim on the edges. That is part of the design, so it is reproduced with the same shader maths in WebGL: see `ui/lens-distortion/README.md`. The text and the button stay real HTML. Checked against Figma's export at 1920: the smeared headline matches it almost pixel for pixel.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

The lens shader runs from `xl` (1280px) up only. On tablets and phones the plain lime band is shown, because the edge smear made the paragraph and button hard to read at those sizes.
