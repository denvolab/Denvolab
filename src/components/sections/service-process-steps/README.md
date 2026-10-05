# `service-process-steps/`

The light grey process strip (Figma "Process / ..."), on the mobile, SaaS, web and AI agent pages.

| File | What it is |
|---|---|
| `service-process-steps.tsx` | `ServiceProcessSteps` (Server Component), two variants. |
| `index.ts` | Barrel export. |

surface/secondary, 96px top/bottom, the columns 64px below the title.

- **`friction`** (mobile, `701:14521`): 528px title, three 581px columns 48px apart. Column: grey index (Display/XL), Gray/200 rule, title (H2), body (540px), 24px apart.
- **`sequence`** (SaaS, web, AI agent): optional eyebrow, full-width title, four 436px columns 32px apart. Column: step number (Display/2XL, dark on SaaS and web, grey on AI agent), border/primary rule, title (H2), body (400px), 32px apart.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Columns: one on phones, two from `md`, Figma's three or four from `xl`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
