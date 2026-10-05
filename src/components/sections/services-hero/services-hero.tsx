// ---------------------------------------------------------------------------
// ServicesHero — the Services page's opening band: the dark background rect
// (node 437:8299) and the staggered heading (node 437:8705) sitting on top
// of it, both direct children of the page frame (437:8298), y 0-1031. Server
// Component: content from lib/data/services.ts.
//
// LAYOUT: the heading is a precise 2D overlap composition, not something
// normal line-breaks can reproduce — "Services" sits top-left, "Solutions"
// is staggered down and to the right by a fixed offset, and a small "&"
// glyph tucks into the gap between them. Positioned the same way hero/'s
// many overlapping elements are: the whole section is one fixed-aspect box
// (`aspect-[1920/1031]`) and every child is a % of that box, converted 1:1
// from the Figma frame's pixel coordinates — see hero/README.md's "Layout
// approach" for the full rationale.
//
// Unlike hero/, there's no separate mobile/tablet frame for this section in
// Figma, and none is needed: there's no content to drop at narrow widths (no
// wordmark, no mockup, no service list here), so the single fixed-aspect box
// — with the fluid `text-display-services-hero` token doing the size
// scaling — holds up at every viewport width on its own.
//
// ACCESSIBILITY: "Services" and "Solutions" are two separately-positioned
// text nodes with a decorative "&" between them, not one sentence a screen
// reader could piece together correctly on its own. An `sr-only` <h1> carries
// the real heading text ("Services & Solutions"); the positioned/staggered
// treatment below it is `aria-hidden`.
//
// TYPOGRAPHY: "Services"/"Solutions" use a new one-off token,
// `display-services-hero` (see tokens/typography.css), since 220px/weight
// 600/-0.04em tracking doesn't match any of the site's existing named
// styles. The "&" reuses that same token's fluid scaling by taking a fixed
// fraction of it (59/220 of the main size, per Figma) rather than getting
// its own token, since it's a single decorative glyph used nowhere else; its
// tracking is the same -0.04em ratio (expressed in `em`, so it scales
// automatically with the smaller font size).
// ---------------------------------------------------------------------------
import { getServicesHero } from "@/lib/data/services";

export async function ServicesHero() {
  const hero = await getServicesHero();

  return (
    <section className="relative w-full bg-surface-dark" data-figma-node="437:8299">
      <h1 className="sr-only">
        {hero.lineOne} {hero.connector} {hero.lineTwo}
      </h1>

      <div
        className="relative mx-auto aspect-[1920/1031] w-full max-w-[1920px] overflow-hidden"
        aria-hidden="true"
        data-figma-node="437:8705"
      >
        <p className="absolute left-[15.21%] top-[36.86%] whitespace-nowrap font-sans text-display-services-hero text-foreground-inverse">
          {hero.lineOne}
        </p>
        <p className="absolute left-[37.19%] top-[57.42%] whitespace-nowrap font-sans text-display-services-hero text-foreground-inverse">
          {hero.lineTwo}
        </p>
        <span className="absolute left-[59.48%] top-[47.82%] whitespace-nowrap text-[calc(var(--text-display-services-hero)*0.2682)] font-sans leading-none tracking-[-0.04em] text-icon-disabled">
          {hero.connector}
        </span>
      </div>
    </section>
  );
}
