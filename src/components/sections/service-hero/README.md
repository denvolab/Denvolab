# `service-hero/`

The dark opening section of every service detail page (`/services/<slug>`). Figma: "Hero / Editorial identity" in each "Service Detail / 01-07" frame (e.g. node `701:14161`).

| File | What it is |
|---|---|
| `service-hero.tsx` | `ServiceHero` (Server Component). Reads one `hero` block from the page data (`lib/data/service-detail/<slug>.ts`). |
| `index.ts` | Barrel export. |

## Layout (1920 frame)

- Gray/900, padding 180 / 40 / 96, 48px between the three parts. The site Header (77px) sits above the page, so the top padding in code is 103px and the headline lands on the same pixel as in Figma.
- **Headline:** "V3.1 / Editorial hero" (DM Sans SemiBold 128/132, -5%), the `text-editorial-hero` token. Its box width comes from the data (`headlineWidth`: 1840, 1320, 1292 or 1100), so the hand-set line breaks stay where the designer put them.
- **Row below it:** two equal halves, 80px apart. Left: the two DM Mono labels ("THE PROBLEM..." in Gray/300, "SCROLL TO EXPLORE" in lime). Right: the intro (Body/LG, Gray/300, `introWidth` 717 or 699) and the 248 x 52 "Talk about your project" button. Pages 01-02 align the halves to the top, 03-07 center them (`cueAlign`).
- **Visual:** a 1840 x 850 picture, radius 24 (12 on the MVP page), with a 1px border/primary border drawn over it on the mobile, SaaS and MVP pages (`radius` and `bordered` in the data). On the AI agent page it is the 1840 x 680 workflow funnel instead, `public/images/service-detail/ai-workflow-canvas.svg` (Figma "Workflow Canvas" `701:15254`, exported as one SVG).

Pages 01 and 02 in Figma also have an "Introduction and action" block parked off-canvas at x 1920. It is outside the frame, so it is not drawn.

Below `xl` the halves stack.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Phones and tablets: the scroll cues, intro and button stack under the headline, and the picture keeps its 1840 x 850 shape.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the hero picture frame, or the AI workflow drawing on the AI agent page; both are on screen when the page opens, so they play straight away. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
