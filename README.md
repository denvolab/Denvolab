# Denvo Lab — Website

The Denvo Lab agency site. Next.js (App Router) + TypeScript + Tailwind CSS, with GSAP and Three.js for the interactive/motion work.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Contact form sends email through Resend. To turn it on, copy `.env.example` to `.env.local` and add a Resend API key (details in `src/components/sections/contact-form/README.md`).

Other commands: `npm run build` (production build), `npm run start` (run a production build), `npm run lint` (ESLint).

## Folder structure — where everything lives

Every folder below has its **own `README.md`** explaining what belongs there and why. Start at the top and drill in — you never need to guess.

```
src/
├── app/                    Routes — see app/README.md
│   ├── layout.tsx            The site shell: fonts, SEO defaults, wraps every page in Header + Footer
│   ├── page.tsx               The homepage
│   ├── about/                 The About page (/about), assembled from components/sections/about-*
│   ├── case-studies/          The Case Studies page (/case-studies), assembled from case-studies-hero + the homepage's portfolio-grid/partner-logos/contact-cta
│   │   └── [slug]/               The eleven case study pages (/case-studies/<slug>), prerendered from lib/data/case-study
│   ├── services/              The Services page (/services), assembled from services-hero + services-list + the About page's about-benefits + industries-served + the homepage's testimonials
│   │   └── [slug]/               The seven service detail pages (/services/<slug>), prerendered from lib/data/service-detail
│   ├── contact/               The Contact page (/contact), assembled from contact-hero + contact-form (the form emails through Resend)
│   ├── globals.css            Wires the Color/Font library (below) into Tailwind, plus the site-wide no-sideways-scroll rule
│   ├── sitemap.ts / robots.ts SEO files, auto-generated
│   └── project-card-preview/  TEMPORARY page to try the ProjectCard hover (delete when done)
│
├── styles/                 Design tokens — see styles/README.md
│   └── tokens/                The Color/Font library + component tokens — see styles/tokens/README.md
│       ├── colors.css            Figma's Color Primitives + Color Semantic (Light/Dark), 1:1
│       ├── foundations.css       Spacing/Radius/Border-Width primitives (backs component-tokens.css)
│       ├── component-tokens.css  Figma's Button/Input component tokens, 1:1
│       └── typography.css        Every font/text style, fluid (min/max) sizing, no breakpoints
│
├── components/             Everything visual — see components/README.md
│   ├── layout/                Site-wide chrome (every page) — see components/layout/README.md
│   │   ├── header/               Top nav — header.tsx (server) + mobile-nav.tsx (client, GSAP)
│   │   └── footer/               Bottom of every page: logo, link columns, giant wordmark (logo SVGs are in public/)
│   ├── ui/                    Small reusable pieces — see components/ui/README.md
│   │   ├── button/                The one Button used everywhere (primary / secondary / ghost / outline)
│   │   ├── ripple-image/          Reusable picture with the water-ripple hover (three.js) — use anywhere
│   │   ├── reveal/                Fade-in-when-scrolled-to wrapper (plays once; safe for reduced motion / no JS)
│   │   ├── project-card/          14islands-style card: RippleImage + dash/category label hover (CSS)
│   │   ├── scroll-text-reveal/    Lights a sentence's words up one by one as the page scrolls past it (GSAP ScrollTrigger)
│   │   ├── text-field/            Figma Input: label, 44px field, helper or error line
│   │   ├── textarea-field/        Figma Textarea: same look, 160px multi-line field
│   │   ├── choice-chip/           Figma Chip (MD) as an on/off pill: a real checkbox or radio inside
│   │   ├── service-icon/          The service pages' Streamline icons (glyph or glyph in a tile), paths from Figma
│   │   ├── lens-distortion/       Figma's "Lens distortion" shader on any HTML block (WebGL, falls back to plain HTML)
│   │   └── animated-text/         Headings that rise in line by line on scroll (zypsy.com, GSAP ScrollTrigger)
│   ├── motion/                Site-wide scroll motion, mounted once in app/layout.tsx; see components/motion/README.md
│   │   ├── color-wash/            The whole page takes the colour of the section you are in (switches when the section before has fully left the screen)
│   │   └── image-reveal/          Pictures rise into place the first time they scroll into view (data-image-reveal)
│   ├── sections/               Page-specific blocks (homepage + about-* + case-studies-hero + case-study-* + services-* + service-* + contact-*) — see components/sections/README.md
│   └── seo/                    Invisible, search-engine-only components
│       └── organization-jsonld/  Structured data script tag
│
├── lib/                     Logic & data, no visuals — see lib/README.md
│   ├── data/                  The actual nav/footer content + fetch functions — see lib/data/README.md
│   │   ├── navigation.ts
│   │   ├── footer.ts
│   │   ├── homepage.ts
│   │   ├── about.ts
│   │   ├── case-studies.ts
│   │   ├── services.ts
│   │   ├── service-detail/        One data file per service detail page + index.ts
│   │   ├── case-study/            One data file per case study page + shared template + index.ts
│   │   └── contact.ts
│   ├── seo/                   site-config.ts — single source of truth for name/url/socials
│   └── utils/                  cn.ts (Tailwind class helper), fluid.ts (1920-frame sizing helpers)
│
└── types/                   Shared TypeScript shapes — see types/README.md
    ├── navigation.ts           NavLink, FooterColumn
    ├── homepage.ts             Homepage section content shapes
    ├── about.ts                About page content shapes
    ├── case-studies.ts         Case Studies page content shapes
    ├── services.ts             Services page content shapes
    ├── service-detail.ts       Service detail page blocks (one type per section design)
    ├── case-study.ts           Case study page blocks (one type per section design)
    └── contact.ts              Contact page content shapes + the form's result state
```

## The rules that tie it all together

**Content and layout are separate.** The header and footer *components* only decide how links look; the actual link text/URLs live in `lib/data/`. This is what makes the "admin panel later" plan work — see `src/lib/data/README.md` for exactly how that swap will happen.

**Colors and fonts are never hardcoded in a component.** Every color and text size a component uses is a Tailwind class (`bg-primary`, `text-heading-2`, ...) sourced from `src/styles/tokens/`. Change the primary color, a text color, or a font size once there and it updates everywhere that class is used — see `src/styles/README.md`.

## Known TODOs

- **Heading font**: the Figma design uses "Mona Sans" for the big headings, but the site uses DM Sans for all text except captions (decision of Sept 21, 2026). The `--font-heading` token in `styles/tokens/typography.css` points at DM Sans, so switching to another heading font later is a one-line change there plus the font files. DM Mono is only used for captions (`font-mono text-caption-md`).
- **About page images**: the hero photos, the story photo, the six value-card illustrations, and all 8 team headshots are all real, supplied by the user and wired in (see `sections/about-hero/README.md`, `sections/about-story/README.md`, `sections/about-values/README.md`, and `sections/about-team/README.md`). The team section swaps its portrait to whichever person's row is hovered — every row now has a real photo behind it.
- **About page copy**: the hero paragraph ends mid-sentence in Figma, and the six value descriptions don't match their labels. Both are kept as in Figma; fix them in `lib/data/about.ts`.
- **Services page images**: the seven Service List images are in (`public/images/services/`, see `sections/services-list/README.md`). Every Industries We Serve card's photo (`sections/industries-served/README.md`) is still a placeholder, since Figma only shows an empty box there. Set `imageSrc` in `lib/data/services.ts` once real photos are supplied.
- **Industries We Serve copy**: Figma's own subtext here says the section is "adapted from a reference site for layout only" and should be swapped for Denvo Lab's real industries/case studies before shipping — see `lib/data/services.ts` and `sections/industries-served/README.md`.
- **Homepage hero**: fills the first screen together with the header (`100svh`, header height in `app/globals.css`). Its service names link to the service pages, and clicking the moving video card opens the showreel with sound. The card's lime "PLAY REEL" label isn't in Figma (it tells people the card can be clicked); delete that `<span>` in `sections/hero/moving-visual.tsx` to match Figma exactly. See `sections/hero/README.md`.
- **Service detail pages** (`/services/<slug>`): desktop (1920) is built to the Figma frames; tablet and phone layouts were added in Oct 2026 (no Figma frames exist for them). Two copy issues are kept as designed and should be fixed in `lib/data/service-detail/`: the UI/UX page reuses the branding page's hero headline/intro and FAQ, and the AI agent page's hero intro is the MVP page's text.
- **Case study pages** (`/case-studies/<slug>`): all eleven Figma frames are built and responsive. Kept as designed, to fix in `lib/data/case-study/`: AI Assistant and My Crew reuse Job Sea's overview picture; their facts cards say "Local Job Portal"; My Crew's solution paragraph is Job Sea's text; the AI page's title says "Manager everything". Quotable and Sanime have no case study yet, so their cards say "Coming soon".
- **Design System v3.1**: the service pages use newer Figma styles than the rest of the site (optical-size DM Sans, negative heading tracking, DM Mono labels, surface/secondary = Gray/50). They apply inside `.ds-v31` only; see `styles/tokens/typography.css` to move the whole site over.
- **Contact page**: inquiries are only delivered once Resend is set up (API key, and a sending domain verified in Resend). "Book a call" opens an email until there's a booking page; set `BOOKING_HREF` in `lib/data/contact.ts`. See `sections/contact-form/README.md`.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · GSAP + `@gsap/react` · Three.js + `react-three-fiber` + `drei` · Fonts self-hosted via Fontsource (no runtime dependency on Google's font CDN).
