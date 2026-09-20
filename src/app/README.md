# `app/` — Pages & Routes

This folder is read directly by Next.js. **Every folder inside `app/` becomes a URL**, and specific filenames inside each folder have special meaning. This is the only folder in the project where file *names* and *locations* matter this much — everywhere else, organize freely.

| File | What it does |
|---|---|
| `layout.tsx` | The site shell. Wraps **every page**: loads fonts, sets site-wide SEO defaults, and renders the Header + Footer around whatever page is showing. |
| `page.tsx` | The homepage (`denvolab.com/`). |
| `globals.css` | Wires the Color library and Font library (`src/styles/tokens/`) into Tailwind, so their tokens become real utility classes like `bg-primary` or `text-heading-2`. The actual color/type values live in `src/styles/tokens/`, not here — see `src/styles/README.md`. |
| `sitemap.ts` | Auto-generates `/sitemap.xml` for search engines. Add a URL here as soon as a new page ships. |
| `robots.ts` | Auto-generates `/robots.txt` for search engines. |
| `favicon.ico` | The browser-tab icon. |

## Adding a new page

To add e.g. an "About" page at `denvolab.com/about`:

1. Create a folder: `app/about/`
2. Add `app/about/page.tsx` inside it, with a default-exported component.
3. Add `/about` to the list in `sitemap.ts`.

That's it — no routing config to touch anywhere else.
