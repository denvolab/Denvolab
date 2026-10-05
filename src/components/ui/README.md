# `ui/` — Generic, Reusable Pieces

Small building blocks with no page-specific meaning. Nothing in here should know or care what page it's used on.

| Folder | Contains |
|---|---|
| [`button/`](./button/) | The one `Button` used everywhere — nav links, footer links, CTAs — with four visual styles ("primary" solid lime, "secondary" dark filled, "ghost" text link, "outline" bordered/transparent). |
| [`ripple-image/`](./ripple-image/) | A picture that ripples like water when the cursor moves over it (edge wobble + water bend, three.js). Drop it in wherever you would use an `<Image>`: portfolio grid, about page, blog covers. |
| [`reveal/`](./reveal/) | Wraps anything so it fades in and rises the first time it scrolls into view. Plays once; off for reduced motion and without JavaScript. |
| [`project-card/`](./project-card/) | One portfolio project: picture + "Name -- Category" label. Hover gives the picture an edge wobble and water ripple (three.js), and the label a stretching dash (CSS). |
| [`text-field/`](./text-field/) | The Figma Input: a label, a 44px field and a helper or error line. Shares its look with `textarea-field/`. First used by the Contact form. |
| [`textarea-field/`](./textarea-field/) | The Figma Textarea: the same field with a 160px multi-line box. |
| [`choice-chip/`](./choice-chip/) | The Figma Chip (MD) as a pill you switch on and off. A real checkbox or radio inside, so it works with forms, the keyboard and screen readers. |
| [`scroll-text-reveal/`](./scroll-text-reveal/) | Wraps a sentence and lights its words up one by one (dim to full opacity) as the page scrolls past it. Used by the About page statement heading. |
| [`animated-text/`](./animated-text/) | Wraps a heading's text so it rises in line by line, each line out of its own clipping box, once the heading is on screen (zypsy.com's heading animation; desktop only). Used by the section headings on every page. |
| [`service-icon/`](./service-icon/) | The Streamline icons of the service pages: a bare 32px glyph (`ServiceGlyph`) or the glyph in a rounded tile (`ServiceIconTile`). Paths generated from the Figma file. |
| [`lens-distortion/`](./lens-distortion/) | Figma's "Lens distortion" shader effect (chromatic aberration) on any HTML block, in WebGL. The HTML stays real; without WebGL it is simply not applied. Used by the service pages' closing band. |

More will land here as the site grows (cards, badges, etc.) — each gets its own folder the same way `button/` does.
