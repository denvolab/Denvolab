// ---------------------------------------------------------------------------
// Shared shapes for the homepage's section content (hero, marquee, and the
// rest as they're built). Same rationale as types/navigation.ts: this is the
// shape the future admin-panel API returns, so lib/data/homepage.ts can swap
// its local constants for a `fetch()` later with no change here or in the
// section components.
// ---------------------------------------------------------------------------

export interface HeroContent {
  /** Giant background wordmark. Always "DENVOLAB" today, but content-managed
   *  like everything else rather than hardcoded in the component. */
  wordmark: string;
  headline: string;
  cta: { label: string; href: string };
  /** Left-side vertical list of services, each linking to its service
   *  detail page (/services/<slug>). */
  services: { label: string; href: string }[];
}

/** One repeating unit of the marquee strip: a phrase, paired with the icon
 *  that follows it. Figma reuses the exact same icon for every unit today,
 *  but the shape allows a per-phrase icon once real per-phrase assets land. */
export interface MarqueeItem {
  phrase: string;
  iconSrc: string | null;
}

export interface PortfolioProject {
  title: string;
  description: string;
  tags: string[];
  /** null until a real project screenshot is exported from Figma — see
   *  portfolio-grid/README.md. */
  imageSrc: string | null;
  /** The project's case study page (/case-studies/<slug>), or null while it
   *  has none yet: the card then says "Coming soon" on hover and is not a link. */
  href: string | null;
}

export interface WhatWeCreateContent {
  eyebrow: string;
  heading: string;
}

export interface WhatWeCreateItem {
  title: string;
  description: string;
  cta: { label: string; href: string };
  /** null until a real image is exported from Figma — see
   *  what-we-create/README.md. */
  imageSrc: string | null;
}

export interface AiOrbitContent {
  /** Small mono label above the heading (Figma node 572:1574, "Eyebrow"). */
  eyebrow: string;
  /** Rendered with a line break preserved between the two lines. */
  heading: string;
}

export interface ProcessContent {
  eyebrow: string;
  /** Rendered with a line break preserved between the two lines. */
  heading: string;
}

export interface ProcessStep {
  week: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface PartnerLogo {
  name: string;
  /** null until a real client logo is exported/provided — see
   *  partner-logos/README.md for why this ships with generic placeholders
   *  rather than the Figma source's literal (unaffiliated) logo assets. */
  logoSrc: string | null;
  /** Figma alternates two fixed logo-slot widths across the strip. */
  size: "wide" | "narrow";
}

export interface TestimonialsContent {
  eyebrow: string;
  heading: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  /** Actual client photo, supplied by the client or linked to a verified source. */
  imageSrc?: string;
  /** Optional public source for the quote. */
  sourceHref?: string;
  /** Explicitly labels fictional profiles and sample copy in the visible card. */
  isSample?: boolean;
}

/** "What Do You Get By Choosing Denvo Lab?" comparison table, between the
 *  process timeline and testimonials. Not part of the original Figma source
 *  (see comparison/README.md) — modeled the same content-driven way as every
 *  other section regardless. */
export interface ComparisonContent {
  /** Rendered with a line break preserved between the two lines, same as
   *  ProcessContent/AiOrbitContent above. */
  heading: string;
  /** Column header for Denvo Lab's own side of the table. */
  denvoLabLabel: string;
  /** Column header for the "everyone else" side of the table. */
  othersLabel: string;
  cta: { label: string; href: string };
}

/** One row of the comparison table: a feature/claim, and whether each side
 *  has it. */
export interface ComparisonRow {
  feature: string;
  denvoLab: boolean;
  others: boolean;
}

export interface ContactCtaContent {
  /** The giant "Let's Contact" heading. */
  heading: string;
  description: string;
  cta: { label: string; href: string };
}
