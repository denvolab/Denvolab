# `color-wash/`: Black-to-White Section Transitions

On Oct 4, 2026 the user asked for the section background change of juice.agency and zypsy.com: as you scroll from a black section into a white one, the **whole screen** fades from black to white (and back on the way up), instead of a hard edge between two coloured blocks. `ColorWashController` does that on every page.

## What the reference sites do

| Site | Code | Taken from it |
|---|---|---|
| zypsy.com | "Variables Color Scroll" (flowtricks 1.0.2): a section with `animate-body-to` reaching 50% of the screen tweens the body's colour variables to that section's theme, `speed="0.7" ease="power2.inOut"`, and back when scrolling up. Uses `clamp()` so the first and last sections still win at the top and bottom of the page. | the 0.7s / `power2.inOut` tween of CSS variables, the clamp at the page end |
| juice.agency | Each section has `data-bg-color`; a ScrollTrigger from `top center` to `bottom center` sets the body background on enter and enter-back. | reading the colour from the section itself |

## How it works

1. **Find the sections.** Every top-level `<section>` inside `<main>`, plus the footer. Nested sections belong to their outer one.
2. **Read each section's real colour** (its own background, or the first solid one above it for see-through sections) and call it dark or light by its brightness. The section gets `data-wash-kind="dark"` or `"light"`.
3. **Sort the boxes with their own background.** A plain near-gray box of the section's own family (a white or light chip, icon tile, card or divider in a light section; a dark one in a dark section) with no picture in it: `data-wash-tint`, follows the mode one shade off what it sits on (see "Tints" below). Otherwise the section's own colour (a frame behind a picture, and the wrappers between the section and the page): `data-wash-surface`, paints the wash too. Anything else (brand-colour buttons and badges, a dark box in a light section, boxes with pictures, colours set inline from data, a picture with text on it): `data-wash-island`, keeps its own colours. Edge fades marked `data-wash-fade` are left alone (see below).
4. **Set the page colour** for the active section (see "When it switches"): `<html class="wash-ready">` with two variables, `--wash-bg` (the colour) and `--wash-p` (100% when that section is dark, 0% when light).
5. **On scroll**, when another section takes over, GSAP tweens both variables to it over 0.7s with `power2.inOut`.

`color-wash.css` does the rest. The body, every section and every surface paint `var(--wash-bg)`. Text follows: inside each section, the colour variables its text, lines and icons use (`--color-text-*`, `--color-foreground-*`, `--color-border-*`, `--color-icon-*`, the gray ramp, the ghost and outline button tokens, the brand lime used as text) are mixed between their own value and a "flipped" value by `--wash-p`. When a section is in its own colour every mix is 100% its own value, so **in its own colour each section looks exactly as designed**. Islands reset every variable to the real value (snapshots kept at `:root` as `--wn-*`), so cards never change.

## When it switches

The user's rule, which replaced the reference sites' "middle of the screen" after the first version felt too early: **the colour stays until the section before has left the screen completely, and switches the moment it has** (Oct 5, 2026: "dark section 100% scrolled holei light section chole asbe"). So coming out of a dark section, the light section comes in on the dark colour, and when the dark section's last pixel leaves the top of the screen (the light section's top reaches the top), the page fades to light (0.7s). Scrolling back up switches back at exactly the same spot. (From Oct 4 to Oct 5 it waited until 20% of the next section had gone past the top as well.)

In numbers: a section takes over at the scroll position `section top + TAKEOVER x its height`, with `TAKEOVER = 0` in `color-wash-controller.tsx` (one number to tune: 0.2 would wait for 20% of the section again). The first section is active until the second takes over. A section near the end of the page whose top can never reach the top of the screen (the footer) takes over at the very bottom instead, like Zypsy's `clamp()`. Between sections that aren't next to each other (case study pictures sit between sections), the previous colour simply stays until the next section takes over.

## Files

| File | Job |
|---|---|
| `color-wash-controller.tsx` | Steps 1 to 5. Measures again when the window width changes (colours and cards can change at a breakpoint) and after every page change. |
| `color-wash.css` | The painting and the variable flips described above, plus `.wash-ink` (below). Imported from `app/globals.css`. |
| `index.ts` | `export { ColorWashController }` |

## Options for a section

| Attribute | Effect |
|---|---|
| (none) | Takes part: sets the page colour when it is the active section, and flips its text when another colour is active. |
| `data-wash="anchor"` | Sets the page colour when it is the active section but never changes itself. For artwork drawn for one background. Used by the AI section (`ai-orbit/`). |
| `data-wash="off"` | Ignored completely. |
| `data-wash="keep"` (on any box inside a section) | That box and everything in it keep their own colours, never tinted. For artwork and indicators drawn for one background: the brand study panel in `service-brand-study/`, and the homepage process rail track (`process-steps/process-rail.tsx`), whose olive fill would vanish on a dark track. |
| `data-wash-fade` (on an edge-fade gradient) | The fade starts from the wash colour instead of the section's colour token, so it matches the page in either mode. Used by the marquee fades in `partner-logos/` and `testimonials/`. |

A section filled edge to edge by one photo or video is skipped automatically (it shows the photo, not a colour).

## Tints: chips, icon tiles and cards in the other mode

The user's rule (Oct 4, 2026), after seeing light-gray chips and icon tiles stay light on the dark page: **in dark mode a chip or icon background is one shade lighter than the card it sits on; in light mode it stays exactly as designed.** The controller applies that to every plain near-gray box of the section's own family (a white or light-gray box in a light section, a dark one in a dark section; chroma at most 32, so the light lime and lavender tiles count too; no picture inside; no colour set inline) and gives it a level:

| Level (`data-wash-tint`) | Which boxes | In the other mode |
|---|---|---|
| `"0"` | a card the same colour as its section (the homepage process cards, FAQ items) | the page colour itself |
| `"1"` | a box on the page or on a level-0 card (the process cards' Week chip, task chips and icon tile; the service capability cards) | the page colour one shade lighter (dark page) or darker (light page) |
| `"2"`, `"3"` | a box on a level-1 or level-2 box (the capability cards' icon tiles, form fields in the contact card) | one more shade each |

One shade is 8% white over a dark page colour (gray-900 becomes about gray-800) or 3% black over a light one (white becomes about gray-50). The controller works these out as plain `rgb()` colours for the active section (`--wash-on-dark-0..3` when it is dark, `--wash-on-light-0..3` when it is light, on `<html>`) and tweens them together with the page colour. A tint's colour is mixed between its own colour (`--wash-tint-own`, read by the controller) and that tint colour by `--wash-p`, the same variable that fades the page and the text, so **a tint changes in step with the page colour** (the user, Oct 5, 2026: "the card color must chnage instant with the dark color while change"). The mix only applies while that kind of section is held (`wash-hold-light` / `wash-hold-dark` on `<html>`, from the start of a fade until it is back in its own mode). In a section's own mode nothing applies, so every box shows exactly its own background, hover and open states included (an FAQ item still turns lime when opened, and a hold starting later reads the opened colour). An earlier version faded tints with their own CSS transition instead; the About "difference" cards then flashed light before going dark, because their `bg-gray-800` follows the page's gray ramp flip, which the transition chased.

**A set colour instead:** a component can give a tint a fixed colour for the other mode with `--wash-tint-alt` on the box. The About "difference" cards (dark section) use `[--wash-tint-alt:var(--color-surface-secondary)]`, so on the light page they are surface/secondary (gray-100), as the user asked on Oct 5, 2026; their titles turn text primary and their descriptions text secondary through the normal flips, and their icons (drawn as masks) turn text primary (see `sections/about-difference/`).

**Why plain colours:** the first version drew the tint as an overlay, a nested `color-mix()` inside a `linear-gradient`, faded by `--wash-p`. It worked in Chrome but the user still saw light chips on the dark page in their browser, so the tint CSS now uses only one level of `color-mix()` between two `var()` colours, the same kind of expression as the text flips that work there.

Text inside a tint follows the section like everything else. Cards with a picture inside stay as they are (a card with an icon image, like the case study fact cards, is an island), because an icon drawn for a light card would disappear on a dark one.

## Edge fades: `data-wash-fade`

The marquee rows on the homepage (partner logos, testimonials) fade out at both ends with a gradient from the section colour to transparent. Marked `data-wash-fade`, their colour token points at `--wash-bg`, so the fade is white on the white page and dark on the dark page instead of a white block on a dark page.

## Light shadows: `data-wash-shadow`

A pale shadow drawn for a white page (the homepage process cards' `rgba(201,201,201,0.17)` glow) looks like a white glow on the dark page. The user's rule (Oct 4, 2026): **in dark mode the shadow is black.** The controller marks any box in a light section whose box-shadow colour is light (`data-wash-shadow`, keeping that colour in `--wash-shadow-own`), and `color-wash.css` sets Tailwind's `--tw-shadow-color` on it: the own colour in the section's own colour, black at 45% when the page is dark, mixed in between during the fade. Only Tailwind `shadow-*` classes read `--tw-shadow-color`; a shadow written another way would need the same treatment by hand. Dark shadows (the other cards' black ones) already work on both backgrounds and are left alone.

## Form fields and info text

Component tokens such as `--input-label` are aliases declared at `:root`, so they keep the `:root` value of the colour they point to. `color-wash.css` re-declares the form field aliases inside every section (and island), so labels, placeholders, field text and borders flip with the section. `--color-text-info` (links in the contact sidebar) flips between info-700 and info-300.

## Text in a hard-coded colour: `wash-ink`

A token flips by itself; a one-off Figma hex (mostly on the case study pages) can't. Write it as `wash-ink [--ink:#342f3d]` instead of `text-[#342f3d]`. In its own section colour it is exactly that hex; on the other kind of background it keeps its hue with the lightness turned over (oklch relative colour), never lighter than 0.4 on light and never darker than 0.8 on dark, so a mid purple stays readable. Browsers without relative colours keep the hex as it is. Used in `about-benefits`, `case-study-process`, `case-study-competitors`, `case-study-facts`, `case-study-challenge`, `case-study-visual`, `case-study-solution` and `what-we-create`.

## Adding a colour token

If a new section uses a token that isn't flipped yet (its text stays dark on the black wash), add the token to `color-wash.css` in four places (a component alias like `--input-*` instead goes in the alias block): its `--wn-` snapshot in `:root`, a line in the light block, a line in the dark block, and the reset in the island block. Copy an existing line with the same role.

## Three things to keep when editing `color-wash.css`

- **List the section's own colour first in every `color-mix()`.** The build adds a fallback for browsers without `color-mix()` that keeps only the first colour, so with the own colour first that fallback is the designed colour. The light block therefore writes `color-mix(in srgb, var(--wn-x) calc(100% - var(--wash-p)), <flipped>)`.
- **Keep transitions off while measuring** (`html.wash-measuring *`). The controller reads every box's real colour with the wash switched off; a box with its own colour transition (FAQ items, form chips) would otherwise report the start of a transition back from its other-mode colour, and be sorted wrong. That happened in development, where React runs the controller's effect twice.
- **Keep the `wash-ink` flips inside their `@supports`.** A relative colour with `var()` inside doesn't fall back to the plain rule above it in a browser that can't read it; it falls back to the inherited colour.

## Not applied

With "Reduce motion" turned on, or without JavaScript, the controller never adds `wash-ready`, and every section keeps its own colours exactly as designed.

## Checked (Oct 4, 2026)

On all 23 pages at 1440px and 390px (Playwright): for every section, when it is the active one, every element's text, background, border and icon colour is the same as with the wash off (0 differences). In the opposite state no text drops below 3:1 contrast, apart from Job Sea's intro paragraph (light gray in the design itself) and two gradient headings the audit can't measure. Tints, edge fades, form fields and light shadows were added after the first round and the same two checks re-run (0 differences in the own colour; the contrast audit sets the tint mode too). An FAQ item opened in its own mode keeps its lime background, and a chip fades from the dark tint back to its own colour over the 0.7s. The switch points were checked section by section: 40px before each takeover the old colour is still on, 40px after it the new one, and at that moment the previous section is already off screen. Screenshots of the boundaries on the homepage, a service page and a case study page show the whole screen changing together. Measured cost: one colour change re-styles the page in about 7 to 13ms in headless Chromium without a GPU; the tween held 60fps on a service page and dropped some frames to 30fps on the homepage there (a real GPU does better).
