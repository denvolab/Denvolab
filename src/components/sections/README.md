# `sections/` — Big, Page-Specific Blocks

This folder holds the large, one-off blocks that make up the homepage and the About, Case Studies, Services and Contact pages (and later, other pages) — the kind of thing that only ever appears in one place, unlike the small reusable pieces in `ui/`. Each is its own folder, following the same pattern as `components/layout/header/`.

## Contents (homepage)

| Folder | Status |
|---|---|
| `hero/` | ✅ built — headline, "Say Hello" CTA, service list (links to the service pages), wordmark, cursor-following showreel card (click to play with sound). Fills the first screen together with the header |
| `marquee-tagline/` | ✅ built — the scrolling tagline strip |
| `portfolio-grid/` | ✅ built — project showcase grid (also used on `/case-studies`) |
| `what-we-create/` | ✅ built — services showcase (each title and "SEE MORE" opens its service page) |
| `ai-orbit/` | ✅ built — "Smarter Design, Supercharged by AI": Figma frame `572:1572` 1:1 (masked funnel, fade overlay, hub, brand badge), animated |
| `partner-logos/` | ✅ built — client/partner logo strip (also used on `/case-studies`) |
| `process-steps/` | ✅ built — the "60 Days Process" timeline |
| `comparison/` | ✅ built — "What Do You Get By Choosing Denvo Lab?" comparison table (not a Figma section — see its own README) |
| `testimonials/` | ✅ built — client quote card marquee |
| `contact-cta/` | ✅ built — "Let's Contact" closing section (also used on `/about` and `/case-studies`) |

## Contents (About page, `/about`)

Built from the Figma "About us" frame (node `431:6130`). The page is assembled in `app/about/page.tsx`; its marquee and closing contact section are the homepage's own `marquee-tagline/` and `contact-cta/`.

| Folder | Status |
|---|---|
| `about-hero/` | ✅ built — headline, paragraph, CTA and the five-photo row (rise-in then bob motion) |
| `about-story/` | ✅ built — the statement, team photo and the 40+ / 24% numbers |
| `about-difference/` | ✅ built — "What makes us different from others", six cards |
| `about-values/` | ✅ built — "Our values shape the work we do", scrolling cream cards |
| `about-benefits/` | ✅ built — "Benefits of working with us", four rows with spinning icons |
| `about-team/` | ✅ built — eight people, hover-to-swap portrait (all 8 have real photos) |

The About page's photos and value illustrations are image fills that could not be downloaded, so those spots show plain placeholders. Each section's README lists the exact file names to export into `public/images/about/`.

## Contents (Case Studies page, `/case-studies`)

Built from the Figma "Work" frame (node `431:6534`). The page is assembled in `app/case-studies/page.tsx`. Of the four sections in that Figma frame, three are pixel-for-pixel the same content already built for the homepage (same six projects, same partner logos, same closing CTA), so the page reuses `portfolio-grid/`, `partner-logos/`, and `contact-cta/` directly — only the opening band is new:

| Folder | Status |
|---|---|
| `case-studies-hero/` | ✅ built — "Designed by Denvo Lab", headline + paragraph |

See `case-studies-hero/README.md` and the `case-studies-page` project doc for the full section-by-section mapping (which Figma node became which piece of existing code).

The grid on this page shows the homepage's six projects plus the seven other case studies (`getCaseStudyGridProjects()` in `lib/data/case-study/`). Cards with a case study page say "View project" on hover and link to it; Quotable and Sanime have no page yet and say "Coming soon".

## Contents (case study pages, `/case-studies/<slug>`)

Built from the eleven frames in the Figma section "Case studiues" (`716:18649`). One route, `app/case-studies/[slug]/page.tsx`, draws each page from its data file in `lib/data/case-study/`. Eight frames (Denvo Hotel, Denvo Travel, Part Pilot, Pro Budget Tracker, Locksmith, Metro HR, Casana AI, Smart Aqua Farm 360) share one template; Job Sea is the template with its own pictures and copy; AI Assistant and My Crew add their own sections.

| Folder | What it draws |
|---|---|
| `case-study-hero/` | Dark opening band: tags, title, "Let’s Talk", hero picture. Also My Crew's full-bleed cover |
| `case-study-facts/` | Industry / Services / Scope (or Timeline) cards |
| `case-study-intro/` | The big centred statement |
| `case-study-figure/` | Any single picture band (overview, billboard, the six screens, showcase shots) |
| `case-study-challenge/` | "The Challenge" |
| `case-study-solution/` | "The Solution" with picture cards (Host Grotesk) |
| `case-study-collage/` | Tinted band of six tiles with the brand (or quote) card |
| `case-study-process/` | Four step cards on Gray/50 |
| `case-study-typography/` | Giant "A", font specimen panel, colour swatches |
| `case-study-goal/` | AI Assistant's "// Project Goal" block |
| `case-study-visual/` | Diagram bands (process wheel, research rings, type specimens, timeline): Figma artwork from xl, real text below |
| `case-study-competitors/` | My Crew's competitor analysis |

Checked at 1920 against Figma: every section starts at the Figma y position on all eleven pages, and the section-by-section pixel difference is anti-aliasing level. Fully responsive (no Figma tablet or mobile frames exist, so the smaller layouts follow the site breakpoints); no sideways scroll at 360, 390, 768, 1024, 1280, 1440 or 1920.

## Contents (Services page, `/services`)

Built from the Figma "Service page" frame (node `437:8298`). The page is assembled in `app/services/page.tsx`. Of its five sections, two (Benefits and Testimonials) are pixel-for-pixel the same content already built for the About and Home pages, so the page reuses `about-benefits/` and `testimonials/` directly — three are new:

| Folder | Status |
|---|---|
| `services-hero/` | ✅ built — the staggered "Services & Solutions" heading |
| `services-list/` | ✅ built — the 7 numbered service entries (title, description, bullets, image) |
| `industries-served/` | ✅ built — "Industries We Serve", 6 cards in a horizontally-scrolling row |

All seven Service List entries have their real images (Sept 28, 2026, `public/images/services/`, see `services-list/README.md`). Every Industries We Serve card's photo is still an `imageSrc: null` placeholder; see `industries-served/README.md` and `lib/data/services.ts`'s TODO(assets) note. Industries We Serve's content is also flagged as reference-site placeholder copy in Figma itself; see `industries-served/README.md`.

## Contents (Contact page, `/contact`)

Built from the Figma "Contact" frame (node `584:2194`), designed for this page on Sept 28, 2026 with the Design System components. The page is assembled in `app/contact/page.tsx`. It has no `contact-cta/` at the end, because that section's button leads here.

| Folder | Status |
|---|---|
| `contact-hero/` | Built: eyebrow, "Tell us what you're building." and the intro |
| `contact-form/` | Built: the "Start a project" form (emails through the site's SMTP setup, `lib/email/`) and the founder, email and studio cards, with a live Rangpur clock |

The form uses the new `ui/text-field/`, `ui/textarea-field/` and `ui/choice-chip/`. Inquiries are only delivered once the SMTP variables are set; see `lib/email/README.md`.

## Contents (service detail pages, `/services/<slug>`)

Built from the seven Figma "Service Detail / 01-07" frames (section `701:16436`), desktop (1920) first. One route, `app/services/[slug]/page.tsx`, draws each page from its data file in `lib/data/service-detail/`. The pages reuse the same section designs with different content and small settings, so each section is one component that takes a data block:

| Folder | Used on |
|---|---|
| `service-hero/` | All seven: editorial headline, scroll cue, intro + button, big picture (AI agent page: the workflow funnel) |
| `service-capabilities/` | All seven, in six layouts (editorial list, card grid, anatomy, indexed grid, wide cards, list + feature) |
| `service-brand-study/` | Branding: the three overlapping identity cards |
| `service-practice/` | UI/UX: "Every request. A clear next step." device story |
| `service-handover/` | UI/UX, mobile, MVP: "The handover is part of the product." table |
| `service-process-steps/` | Mobile, SaaS, web, AI agent: light grey numbered columns |
| `service-craft-split/` | SaaS: dark text column + picture |
| `service-checklist/` | SaaS, web, AI agent: "Everything your team needs next." check list |
| `service-perspective/` | MVP: "The right first version." statement |
| `service-showcase/` | Branding, web, MVP: one full-width picture |
| `service-process-narrative/` | All seven: dark "You should know what happens next.", left column sticky |
| `service-faq/` | All seven: accordion, one card open at a time |
| `service-conversation/` | All seven: lime closing band with Figma's lens distortion shader (`ui/lens-distortion/`) |

After the blocks every page ends with `contact-cta/` ("Let's work. Together", with the Streamline icon credit) and the footer. These pages use Design System v3.1 details through the `.ds-v31` wrapper (optical-size DM Sans, negative heading tracking, DM Mono labels, lighter surface/secondary), see `styles/tokens/typography.css`. Checked against Figma's own export at 1920, section by section: every section height matches, and the pixel difference is anti-aliasing level (the closing heading differs only because the site sets it in DM Sans, not Mona Sans). Since Oct 2026 every service section also has a proper phone and tablet layout (each section README has a "Responsive" note); the 1920 layout did not change.

The static, pixel-perfect layout for each is being built directly from the Figma source (see the `part-pilot-project`/homepage project docs for the current build plan). The full exotic motion/interaction treatment (cursor tracking, custom transitions — see the `motion-interaction-references` project doc) stays gated on the user's inspect-code specs; a section landing here today gets standard, obviously-implied motion only (e.g. `marquee-tagline`'s scroll loop, which is structural to the design, not a reference-site effect).

## Scroll motion (Oct 4, 2026)

Three effects from juice.agency and zypsy.com were added across the site. Section headings rise in line by line (`ui/animated-text/`, zypsy.com's heading animation since Oct 5), pictures rise into place when they scroll into view (`data-image-reveal`, see `motion/image-reveal/`), and the whole page takes the background colour of the section you are in, switching the moment the section before has fully left the screen (`motion/color-wash/`). Each affected section's README has a "Scroll motion" note. Existing animations were not changed.

When adding a section: wrap its `h2` text in `AnimatedText`, put `data-image-reveal` on its picture frames, and write one-off hex text colours as `wash-ink [--ink:#hex]` instead of `text-[#hex]`.

## Responsive status

All 9 homepage/About sections above, plus the global `layout/header/` and `layout/footer/`, have mobile (390px) and tablet (768px) variants built alongside the original desktop (1920px, `lg:` and up) layout, per the `homepage-responsive-tablet-mobile` project doc. Screenshot-verified at all three widths (390px, 768px, 1920px) with no regressions to the desktop build. See each section's own README for its specific responsive treatment and any judgment calls made. The general pattern: `lg` (1024px) is the single dividing line between flow layout (mobile/tablet) and fixed-aspect absolute-positioned layout (desktop); `md` (768px) is used within the flow layout only where the Figma tablet frame shows an explicit structural change (2-column grids for `portfolio-grid/`, `testimonials/`, and the footer). One exception: `contact-cta/` and the footer switch to their desktop layout at `xl` (1280px), not `lg`, because the footer's logo + four columns row needs about 1200px and the two share one olive block. `case-studies-hero/` follows the same `xl` switch (see its own README) since it shares `about-hero/`'s two-column pattern; Case Studies has no dedicated Figma mobile/tablet frame, so — same as the About page — the smaller layouts are sensible stacks that keep the same type and spacing rhythm rather than a 1:1 Figma match.

## One-off values vs. tokens

Every section here should reach for an existing token (`styles/tokens/`) first. Where the Figma design uses a value that appears **exactly once in the whole page** — a bespoke font-size, an odd one-off gap — and adding a global token for it would be pure token-file sprawl, it's used as a plain arbitrary Tailwind value with a comment linking the Figma node id instead. A value that repeats (even across two sections) gets a real token. See `hero/`'s wordmark treatment (`tokens/typography.css`'s "Display/Wordmark" entry) for an example of a value that, despite appearing once, still earned a token because it's a genuine text style, not an incidental layout number.

## Known asset gap (applies to every section with images/icons)

This project was built in a sandbox whose network blocks `www.figma.com`, so none of the design's exported image/icon assets (`https://www.figma.com/api/mcp/asset/...` URLs) could be downloaded and committed — every section with an image or custom icon ships a documented placeholder instead (see that section's own README for specifics) until someone exports the real asset from Figma and drops it in `public/`.

**Best workaround (Sept 27, 2026): read the file with the Figma plugin API in the browser.** With the user signed in to Figma in the desktop app's built-in browser, a design file page exposes the `figma` global, so `figma.getNodeById(id)` and `node.exportAsync({ format: "SVG_STRING" | "PNG" })` return exact layer data, vector paths and exported assets as text/bytes, and a large result is saved to a file on the agent side, so nothing is retyped. `ai-orbit/` was rebuilt this way (its 12 icons in `public/images/ai-orbit/tools/` are the frame's own exports, and `funnel-art.ts` / `workflow-tools.ts` were generated from the layers). Read-only use only.

**Older workaround for well-known brand logos:** the round-1 `ai-orbit/` marquee (`ai-orbit-marquee.tsx`, no longer live) sidesteps this for 17 of its 20 tool icons by pulling exact path/hex data from the `simple-icons` npm package (installed as a real dependency) instead of exporting from Figma — the npm registry isn't blocked, only `www.figma.com`'s asset-export endpoint is. See `ai-orbit/icons.tsx`'s header comment for the exact technique. This only helps for recognizable third-party brand marks (product logos, not custom illustration), but it's a real fix rather than a placeholder, so it's worth reaching for first any time a section needs a well-known brand's logo.

## Why sections are separate from `ui/`

A `ui/` component (like `Button`) could be dropped into any project. A `sections/` component (like `hero/`) is specific to the Denvo Lab homepage's content and copy — it will never be reused elsewhere, so it doesn't belong in the generic folder.
