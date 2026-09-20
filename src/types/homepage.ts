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
  /** Left-side vertical list of service names. */
  services: string[];
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
  href: string;
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
  /** Always 5 in the Figma source — kept as a count rather than hardcoding
   *  5 icons in the component, in case a real rating field lands later. */
  rating: number;
  quote: string;
}

export interface ContactCtaContent {
  /** The giant "Let's Contact" heading. */
  heading: string;
  description: string;
  cta: { label: string; href: string };
}
