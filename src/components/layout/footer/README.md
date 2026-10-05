# Site footer

Source: Figma Closing Section `860:5668` (1920px desktop).

`ContactCta` renders the closing message; `Footer` renders the navigation and signature. Both use `footer.module.css` to keep the background, six-column grid and responsive geometry continuous. Desktop starts at 1280px; smaller screens stack the message and use a two-column (mobile) or four-column (tablet) navigation grid.

Content: `src/lib/data/footer.ts`; CTA defaults: `src/lib/data/homepage.ts`. Service/case-study descriptions and icon attribution remain page-specific.

Assets: exact Figma export `public/denvolab-footer-logo.svg` (330.309 × 120), official OFL Mona Sans Regular in `public/fonts/mona-sans/`, and the installed DM Mono Medium Italic font. Fonts and styles are scoped to the closing/footer section. Color-wash is disabled here so the design retains its original background and contrast.
