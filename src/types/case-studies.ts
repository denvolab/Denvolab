// ---------------------------------------------------------------------------
// Shared shapes for the Case Studies page's section content. Same rationale
// as types/about.ts and types/homepage.ts: this is the shape the future
// admin-panel API returns, so lib/data/case-studies.ts can swap its local
// constants for a `fetch()` later with no change here or in the section
// components.
// ---------------------------------------------------------------------------

export interface CaseStudiesHeroContent {
  heading: string;
  description: string;
}
