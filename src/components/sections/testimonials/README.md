# Client testimonials

The original three-row desktop marquee is preserved: 5 / 4 / 5 card positions, the middle row moving in reverse, 611px cards, original padding, rounded corners and edge fades. All twelve unique entries appear across the three rows. The last row uses two existing entries to complete its five positions; duplicated marquee copies are animation repeats, not additional reviews.

Mobile/tablet keep the original single/two-column grid and now expose all twelve entries. Stars remain removed as requested.

The owner requested temporary chosen names and generated portraits. Twelve fictional profiles and sample feedback are clearly labelled `Sample testimonial · Fictional profile`. Replace them with verified real client quotes and matching actual photos before publication. Data lives in `TESTIMONIALS` in `src/lib/data/homepage.ts`.

Each generated image is a separate original square portrait in `public/images/testimonials/demo-<name>.png`. Prompts and tool provenance for the nine added portraits are recorded in `portrait-prompts.json` in this folder. Built-in image generation was used.
