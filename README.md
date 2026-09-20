# Denvo Lab — Website

The Denvo Lab agency site. Next.js (App Router) + TypeScript + Tailwind CSS, with GSAP and Three.js for the interactive/motion work.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands: `npm run build` (production build), `npm run start` (run a production build), `npm run lint` (ESLint).

## Folder structure — where everything lives

Every folder below has its **own `README.md`** explaining what belongs there and why. Start at the top and drill in — you never need to guess.

```
src/
├── app/                    Routes — see app/README.md
│   ├── layout.tsx            The site shell: fonts, SEO defaults, wraps every page in Header + Footer
│   ├── page.tsx               The homepage
│   ├── globals.css            Wires the Color/Font library (below) into Tailwind
│   ├── sitemap.ts / robots.ts SEO files, auto-generated
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
│   │   └── footer/               Bottom of every page — footer.tsx
│   ├── ui/                    Small reusable pieces — see components/ui/README.md
│   │   └── button/                The one Button used everywhere (primary / ghost)
│   ├── sections/               Homepage-specific blocks — NOT BUILT YET, see components/sections/README.md
│   └── seo/                    Invisible, search-engine-only components
│       └── organization-jsonld/  Structured data script tag
│
├── lib/                     Logic & data, no visuals — see lib/README.md
│   ├── data/                  The actual nav/footer content + fetch functions — see lib/data/README.md
│   │   ├── navigation.ts
│   │   └── footer.ts
│   ├── seo/                   site-config.ts — single source of truth for name/url/socials
│   └── utils/                  cn.ts — Tailwind class helper
│
└── types/                   Shared TypeScript shapes — see types/README.md
    └── navigation.ts           NavLink, FooterColumn
```

## The rules that tie it all together

**Content and layout are separate.** The header and footer *components* only decide how links look; the actual link text/URLs live in `lib/data/`. This is what makes the "admin panel later" plan work — see `src/lib/data/README.md` for exactly how that swap will happen.

**Colors and fonts are never hardcoded in a component.** Every color and text size a component uses is a Tailwind class (`bg-primary`, `text-heading-2`, ...) sourced from `src/styles/tokens/`. Change the primary color, a text color, or a font size once there and it updates everywhere that class is used — see `src/styles/README.md`.

## Known TODOs

- **Logo**: `components/layout/footer/footer.tsx` currently points at a temporary Figma export URL (expires after about a week). Export the real logo SVG from Figma and save it as `public/denvolab-logo.svg`, then update the `src` in that file.
- **Heading font**: the Figma design uses "Mona Sans," which has no safe npm/Google Fonts distribution. "Sora" is standing in for it via the `--font-heading` token in `app/globals.css` / `app/layout.tsx`. Drop in the real Mona Sans variable font file whenever it's available — see the comment at the top of `app/layout.tsx` for the exact swap.
- **Homepage sections** (hero, portfolio grid, etc.) aren't built yet — waiting on the animation/interaction specs. See `components/sections/README.md`.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · GSAP + `@gsap/react` · Three.js + `react-three-fiber` + `drei` · Fonts self-hosted via Fontsource (no runtime dependency on Google's font CDN).
