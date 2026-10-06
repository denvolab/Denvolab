# `app/` — Pages & Routes

This folder is read directly by Next.js. **Every folder inside `app/` becomes a URL**, and specific filenames inside each folder have special meaning. This is the only folder in the project where file *names* and *locations* matter this much — everywhere else, organize freely.

| File | What it does |
|---|---|
| `layout.tsx` | The site shell. Wraps **every page**: loads fonts, sets site-wide SEO defaults, and renders the Header + Footer around whatever page is showing. It also mounts the two site-wide scroll motion controllers, `ColorWashController` and `ImageRevealController` (see `components/motion/README.md`). |
| `page.tsx` | The homepage (`denvolab.com/`). |
| `about/` | The About page (`denvolab.com/about`), built from `components/sections/about-*` plus the shared marquee and contact sections. |
| `case-studies/` | The Case Studies page (`denvolab.com/case-studies`), built from `components/sections/case-studies-hero` plus the homepage's `portfolio-grid`, `partner-logos`, and `contact-cta` sections, reused as-is. |
| `case-studies/[slug]/` | The eleven case study pages (`/case-studies/job-sea`, `/ai-assistant`, `/my-crew`, `/denvo-hotel`, `/denvo-travel`, `/part-pilot`, `/pro-budget-tracker`, `/locksmith`, `/metro-hr`, `/casana-ai`, `/smart-aqua-farm-360`). One dynamic route, all prerendered, any other slug is a 404. Draws the blocks from `lib/data/case-study/` with the `components/sections/case-study-*` sections, then `contact-cta` with the frame's own closing paragraph. Imports the extra fonts these pages use (Host Grotesk, Inter, Roboto, Frank Ruhl Libre), so no other page downloads them. The slugs are in `sitemap.ts`. |
| `contact/` | The Contact page (`denvolab.com/contact`), built from `components/sections/contact-hero` and `contact-form`. The form emails each inquiry through the site's SMTP setup (a Server Action, see `contact-form/README.md` and `lib/email/README.md`). The homepage's `contact-cta` is left out here, since its button leads to this page. |
| `services/` | The Services page (`denvolab.com/services`), built from `components/sections/services-hero` and `services-list` plus the About page's `about-benefits`, the new `industries-served` section, and the homepage's `testimonials`, reused as-is. |
| `services/[slug]/` | The seven service detail pages (`denvolab.com/services/branding-visual-identity`, `/ui-ux-design`, `/mobile-app-development`, `/saas-development`, `/web-development`, `/mvp-development`, `/ai-agent-custom-cms`). One dynamic route: `generateStaticParams` prerenders all seven at build time, any other slug is a 404 (`dynamicParams = false`). Each page draws the blocks from its `lib/data/service-detail/` file with the `components/sections/service-*` sections, then `contact-cta`. The slugs are also in `sitemap.ts`. |
| `globals.css` | Wires the Color library and Font library (`src/styles/tokens/`) into Tailwind, so their tokens become real utility classes like `bg-primary` or `text-heading-2`. The actual color/type values live in `src/styles/tokens/`, not here — see `src/styles/README.md`. It also holds the site-wide **no sideways scroll** rule (`overflow-x: clip` on `html` and `body`): anything that sticks out past the right edge is cut off instead of showing a horizontal scroll bar along the bottom. It is a safety net, so if a section is cut off at the edge, fix that section's width. It also imports the start states and colour rules of the scroll motion (`ui/animated-text/`, `motion/image-reveal/`, `motion/color-wash/`). |
| `sitemap.ts` | Auto-generates `/sitemap.xml` for search engines. Add a URL here as soon as a new page ships. |
| `robots.ts` | Auto-generates `/robots.txt` for search engines. |
| `favicon.ico` | The browser-tab icon. |
| `project-card-preview/` | TEMPORARY. A page for trying the ProjectCard hover effects at `/project-card-preview`. Not linked anywhere and hidden from search engines. Delete it (and `public/images/demo/`) when you no longer need it. |

## Adding a new page

To add e.g. a "Blog" page at `denvolab.com/blog`:

1. Create a folder: `app/blog/`
2. Add `app/blog/page.tsx` inside it, with a default-exported component. Give it a `metadata` export with a short `title` ("Blog"); the site template turns it into "Blog | Denvo Lab".
3. Add `/blog` to the list in `sitemap.ts`.

`app/services/page.tsx` is a recent example of this: a `metadata` export plus a handful of imported sections listed in Figma order, no page-specific logic.

`app/about/page.tsx` is a good example to copy: it only lists sections in order and leaves the real content to `lib/data/about.ts`.

That's it — no routing config to touch anywhere else.
