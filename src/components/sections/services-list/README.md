# `services-list/` — The 7 Numbered Service Entries

Figma: "Services List Section", node `468:1128` on the Services page, y 1031-6077. Seven entries (`01` "Branding & Visual Identity" through `07` "AI Agent Custom CMS Design & Development"), each with a number, title, description, a two-column bullet list, and a right-side image slot, separated by 1px dividers.

- `services-list.tsx` — the component (Server Component; content from `lib/data/services.ts`)
- `index.ts` — barrel export

## Typography

Every text role here already matches an existing token exactly — confirmed via `get_design_context`'s "styles contained in the design" metadata, not just eyeballing pixel values, so no new tokens were needed for this section:

| Role | Figma style | Token used |
|---|---|---|
| Number | Heading/H1 (40px / 48px leading / 600) | `font-heading text-heading-1` |
| Title | Display/LG (48px / 56px leading / 600) | `font-heading text-display-lg` |
| Description | Body/LG (18px / 28px leading / 400) | `font-sans text-body-lg` |
| Bullets | Label/MD (14px / 20px leading / 2% tracking / 500) | `font-mono text-label-md` |

Bullets are the one deviation worth flagging: they're set in **DM Mono** in Figma, not DM Sans like every other Label/MD use on the site. Rather than add a new token, they reuse `text-label-md` (which already bundles the correct size/leading/tracking/weight) with a `font-mono` override — the same "reuse the token, override only what differs" approach `ui/button`'s `outline` variant uses for its own DM Mono label.

## Bullets: rows, not a grid

Bullets are rendered as rows of (up to) two, not a CSS grid. Figma's own source groups bullets into "Row" flex containers of two `flex-1` items; when a list has an odd count (5 of the 7 entries do), the trailing bullet sits alone in its own row and — because it's still `flex-1` inside a `w-full` row with no sibling — stretches across the **full** row width rather than sitting in a left column with an empty cell beside it. A `grid-cols-2` would get that last case wrong (it would leave an empty cell, not a full-width item), so `chunkBullets()` in `services-list.tsx` reproduces Figma's row grouping directly instead.

## Supporting Visual (the right-side image placeholder)

881x480 in Figma, `bg-surface-secondary` / `border-border-primary` / `rounded-lg`. **The user confirmed (Sept 23, 2026) this box is a placeholder for a real per-service image, not a decorative shape** — see `types/services.ts`'s `ServiceListItem.imageSrc: string | null` and `lib/data/services.ts`'s `TODO(assets)` note, same pattern as `about-values/`'s illustrations and `what-we-create/`'s card photos. While `imageSrc` is `null`, the box renders pixel-for-pixel what Figma itself shows today (there's nothing to "fall back" to — this IS the current design, with no placeholder label inside it, unlike `industries-served/`'s cards which do show a "Photo placeholder" label). Once a photo is set, it swaps in as a normal `next/image` `fill` crop (`object-cover`).

To wire up a real photo for an entry: export/receive the image, drop it in `public/images/services/`, and set `imageSrc` on that entry in `SERVICE_LIST_ITEMS` in `lib/data/services.ts`.

### The images (Sept 28, 2026)

All seven entries now have the user's images. They were uploaded to `public/images/Service image/`, then moved and renamed (lowercase, no spaces, so the URLs work on any server):

| Entry | File | Uploaded as |
|---|---|---|
| 01 Branding & Visual Identity | `services/branding.png` | `Branding.png` |
| 02 AI-Enhanced UI/UX Design | `services/ui-ux-design.png` | `UI UX design.png` |
| 03 AI Integrated SaaS Design & Development | `services/saas.png` | `SaaS.png` |
| 04 AI Powered Web Design & Development | `services/web-design.png` | `Web design.png` (the user's pick) |
| 05 AI Driven Mobile App Design & Development | `services/mobile-app.png` | `Mobile App design.png` |
| 06 MVP Development | `services/mvp.png` | `MVP.png` |
| 07 AI Agent Custom CMS Design & Development | `services/custom-cms.png` | `CMS.png` |

Six are 1672 x 941 (about 16:9), so they fill the 881 x 480 box with almost no cropping. `ui-ux-design.png` is 1448 x 1086 (4:3), so about a quarter of its height is cropped (a little of the tablet's top and the phone's bottom). Between `lg` and about 1600px the box keeps its 480px height and gets narrower, so the sides of every picture are cropped more there; at 1920 it is Figma's 881 x 480.

Not used: `Webdesign and develipment.png` (a fintech dashboard on a laptop and phone) is still in `public/images/Service image/`. The folder also holds `Image 2.png` from Sept 21 (see `what-we-create/README.md`).

## Responsive

Figma has no separate mobile/tablet frame for this section. Each entry stacks (image below text) below `lg` and goes side-by-side at `lg`+, matching `what-we-create/`'s single-column-then-grid approach. The 120px inter-entry gap and 80px Header-vs-Visual gap step down at smaller breakpoints rather than staying fixed, following the same graduated pattern as `about-values/`'s section padding (`py-16 md:py-24 xl:py-[120px]`-style scales) — those exact intermediate numbers aren't from a Figma mobile frame, they're a reasonable judgment call, same as elsewhere on this site when no mobile frame exists.

## Links to the detail pages (Oct 2026)

Each entry's title links to its service detail page (`href` in `lib/data/services.ts`, for example `/services/saas-development`). The link looks exactly like the plain title did (Figma shows no link styling) and only gets an underline on hover.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the Supporting Visual frame of each service. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
