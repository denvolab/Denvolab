// ---------------------------------------------------------------------------
// Shared shapes for the Services page's section content. Same rationale as
// types/about.ts, types/homepage.ts, types/case-studies.ts: this is the
// shape the future admin-panel API returns, so lib/data/services.ts can swap
// its local constants for a `fetch()` later with no change here or in the
// section components.
// ---------------------------------------------------------------------------

/** The hero's staggered two-line heading (Figma node 437:8705). Split into
 *  three pieces because the visual treatment isn't a normal heading — see
 *  services-hero/README.md. */
export interface ServicesHeroContent {
  /** First line, top-left ("Services"). */
  lineOne: string;
  /** Second line, staggered down and to the right of the first ("Solutions"). */
  lineTwo: string;
  /** The small decorative glyph tucked into the gap between the two lines
   *  ("&") — visual only, not read by screen readers. */
  connector: string;
}

export interface ServiceListItem {
  /** "01".."07", rendered as-is (already zero-padded in Figma). */
  number: string;
  title: string;
  description: string;
  /** Rendered two-per-row with a trailing single item spanning full width
   *  when the count is odd, matching the Figma source's own row grouping
   *  (see services-list/README.md) rather than a CSS grid. */
  bullets: string[];
  /** The right-side "Supporting Visual" box: a service image in
   *  public/images/services/ (all seven are set as of Sept 28, 2026). null
   *  shows Figma's plain gray box (same `imageSrc: string | null` pattern as
   *  about-values and what-we-create; see services-list/README.md). */
  imageSrc: string | null;
  /** The service's own detail page (/services/<slug>, see
   *  lib/data/service-detail). The entry's title links to it. */
  href: string;
}

export interface ServicesListContent {
  items: ServiceListItem[];
}

export interface IndustryItem {
  name: string;
  description: string;
  /** null until a real photo is exported — Figma itself only shows a "Photo
   *  placeholder" box here (see industries-served/README.md). */
  imageSrc: string | null;
}

export interface IndustriesServedContent {
  heading: string;
  description: string;
  cta: { label: string; href: string };
  items: IndustryItem[];
}
