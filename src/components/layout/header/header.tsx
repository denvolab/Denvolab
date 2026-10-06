// ---------------------------------------------------------------------------
// Header — global nav, rendered on every page via the root layout.
// Server Component: it `await`s its content so the swap to a real admin-panel
// API later (see lib/data/navigation.ts) needs no change here.
//
// Folder contents:
//   header.tsx      <- this file, the Server Component shell (desktop nav + CTA)
//   mobile-nav.tsx  <- Client Component, hamburger + GSAP-animated panel
//   index.ts        <- barrel export, so other files import from
//                      "@/components/layout/header" instead of this filename
// ---------------------------------------------------------------------------
import Link from "@/components/ui/animated-link/animated-link";
import { getHeaderCta, getPrimaryNavigation } from "@/lib/data/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo/site-config";
import { MobileNav } from "./mobile-nav";

export async function Header() {
  const [links, cta] = await Promise.all([getPrimaryNavigation(), getHeaderCta()]);

  return (
    <header data-site-header="" className="relative z-50 border-b border-foreground-inverse/10 bg-surface-dark">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-5 py-4 lg:px-16">
        {/* Wordmark — desktop (lg+) carries the DENVOLAB wordmark elsewhere
            (hero's giant background text, footer) rather than in the nav bar
            itself, so it's hidden there ("Home" doubles as the brand anchor
            via the hamburger below it instead). Mobile/tablet drop the
            hero's giant wordmark treatment entirely (it doesn't fit a narrow
            viewport), so the Figma mobile/tablet top-bar carries a small
            compact wordmark here instead — shown only below `lg`. */}
        <Link
          href="/"
          className="font-sans text-heading-5 font-medium uppercase tracking-tight text-foreground-inverse lg:hidden"
        >
          {siteConfig.name.replace(/\s/g, "")}
        </Link>

        {/* Breakpoint is `lg` (1024px), not `md` (768px): per the
            homepage-responsive-tablet-mobile project doc, BOTH the 390px
            mobile and 768px tablet Figma frames use the hamburger nav — only
            the true desktop layout (1920px reference, built from `lg` up)
            shows the full inline nav + CTA. */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Button key={link.href} href={link.href} variant="ghost">
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
        </div>

        <MobileNav links={links} cta={cta} />
      </div>
    </header>
  );
}
