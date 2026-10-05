# `motion/`: Site-Wide Scroll Motion

These are not pieces you place on a page. Each one is a small "controller" that is mounted **once**, in `app/layout.tsx`, renders nothing, and then animates whatever it finds on every page (and again after each client-side page change). Sections opt in with a data attribute, so a section never has to import anything to get the effect.

They were added on Oct 4, 2026, when the user asked for the scroll feel of two reference sites, juice.agency and zypsy.com: the page colour changing from black to white (and back) as you scroll from one section into the next, and pictures rising into place as you scroll. The third part, the heading animation, is a normal component (`ui/animated-text/`) because it wraps text: since Oct 5, 2026 it is zypsy.com's line-by-line rise (it was the juice.agency word fade before).

| Folder | What it does | How a section opts in |
|---|---|---|
| [`color-wash/`](./color-wash/README.md) | The whole page takes the background colour of the section you are in, fading over 0.7s, and text flips so it stays readable. It switches the moment the section before has fully left the screen. | Automatic for every `<section>` in `<main>` and the footer. `data-wash="off"` to leave a section out, `data-wash="anchor"` for a section that sets the colour but never changes itself. |
| [`image-reveal/`](./image-reveal/README.md) | A picture's frame starts 5em lower and invisible, and rises into place (0.8s) the first time its top reaches 70% of the screen. | `data-image-reveal` on the box that holds the picture. |

Both do nothing with "Reduce motion" turned on or without JavaScript: the page then looks exactly as designed, with every picture visible.

**Existing animations were left alone.** The hero's moving showreel card, the About hero photos, the marquees, the logo and testimonial rows, the AI section, the About statement (`scroll-text-reveal`) and the `reveal` wrapper all keep their own motion; neither controller touches them.
