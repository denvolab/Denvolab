// ---------------------------------------------------------------------------
// Hero — the homepage's opening section (Figma node 230:4043, y 0-1080).
// Server Component: content comes from lib/data/homepage.ts so the eventual
// admin panel can edit the headline/CTA/service list without touching this
// file (see components/layout/header/header.tsx for the same pattern).
//
// LAYOUT NOTE — this section is built at the exact 1920x1080 desktop frame
// and scales as one fixed-aspect unit (`aspect-[1920/1080]`) rather than
// reflowing at each breakpoint: every child below is positioned as a % of
// that 1920x1080 box, so it scales down smoothly with the viewport instead of
// jumping. Per the "content max width for a 27in display" instruction, the
// scaling box itself is capped at max-w-[1920px] and centered — an ultrawide
// monitor gets more dark background on either side, never a stretched hero.
// A dedicated tablet/mobile Hero (see project doc
// `homepage-responsive-tablet-mobile`) replaces this one below the `lg`
// breakpoint once that's built; this file is the desktop (lg+) version.
//
// The one un-tokenized value here is the wordmark's font-size treatment —
// see tokens/typography.css's "Display/Wordmark" entry for why a token was
// added for it instead of leaving it as a bare number.
// ---------------------------------------------------------------------------
import { getHeroContent } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";

// 14 fixed-width decorative bars (72px at the 1920px reference = 3.75%),
// spaced with `justify-between` exactly like the Figma source (node
// 269:1158) rather than pre-computing gap math by hand.
const DECORATIVE_BAR_COUNT = 14;

export async function Hero() {
  const hero = await getHeroContent();

  return (
    <section className="relative w-full bg-surface-dark" data-figma-node="230:4043">
      {/* Mobile/tablet (<lg) — Figma nodes 249:981 (mobile) / 253:1054
          (tablet). A plain top-to-bottom flow, not the fixed-aspect box
          below: the giant background wordmark and the mockup image are both
          dropped entirely at these widths (neither Figma frame includes
          them — the wordmark doesn't fit a narrow viewport, and there's no
          room left for a mockup once the headline wraps to 3-4 lines), and
          the top-bar (logo + hamburger) is the global Header, not repeated
          here even though Figma draws it inside this frame. */}
      <div className="flex flex-col gap-8 px-5 py-16 md:px-10 lg:hidden">
        <h1 className="font-heading text-heading-1 text-foreground-inverse">
          {hero.headline}
        </h1>
        <Button href={hero.cta.href} variant="primary" size="lg" className="w-fit">
          {hero.cta.label}
        </Button>
        <ul className="flex flex-col gap-4 font-sans text-body-lg text-foreground-inverse">
          {hero.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Desktop (lg+) — the original fixed-aspect, percentage-positioned
          box (see the layout note at the top of this file). */}
      <div className="relative mx-auto hidden aspect-[1920/1080] w-full max-w-[1920px] overflow-hidden lg:block">
        {/* Decorative vertical bars — node 269:1158 / 267:1126 */}
        <div className="absolute inset-0 flex justify-between" aria-hidden="true">
          {Array.from({ length: DECORATIVE_BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              className="h-full w-[3.75%] border-x border-brand opacity-[0.04]"
            />
          ))}
        </div>

        {/* Giant background wordmark — node 230:4047 */}
        <p
          aria-hidden="true"
          className="absolute left-[2.66%] top-[17.31%] w-[93.39%] whitespace-nowrap text-center font-sans text-display-wordmark text-brand"
        >
          {hero.wordmark}
        </p>

        {/* Hero mockup image — node 230:4166. No asset could be exported into
            the codebase (the sandbox this was built in can't reach Figma's
            asset host — see hero/README.md); drop the real export at
            public/images/hero-mockup.png and swap this placeholder for an
            <Image> once it exists. */}
        <div
          className="absolute left-[44.38%] top-[46.48%] h-[38.89%] w-[18.33%] overflow-hidden rounded-2xl border border-foreground-inverse/10 bg-surface-dark-deep"
          data-figma-node="230:4166"
        />

        {/* Left-side service list — node 230:4057 */}
        <ul className="absolute left-[2.08%] top-[63.33%] flex flex-col gap-6 font-sans text-body-lg text-foreground-inverse">
          {hero.services.map((service) => (
            <li key={service} className="whitespace-nowrap">
              {service}
            </li>
          ))}
        </ul>

        {/* Headline + CTA — node 230:4054 */}
        <div className="absolute right-[2.76%] top-[67.22%] flex w-[25.16%] flex-col items-start gap-[30px]">
          <h1 className="font-heading text-heading-1 text-foreground-inverse">
            {hero.headline}
          </h1>
          <Button href={hero.cta.href} variant="primary" size="lg">
            {hero.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
