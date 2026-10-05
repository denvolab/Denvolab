// ---------------------------------------------------------------------------
// Case Studies page content, mirrored from the Figma "Work" frame (node
// 431:6534). Same API-readiness note as lib/data/about and lib/data/homepage:
// swap the function body for a `fetch()` once the admin panel can manage this
// content. The rest of the page (the project grid, the partner logos, the
// closing contact section) reuses the homepage's own content and components
// unchanged — see case-studies-hero/README.md and app/case-studies/page.tsx.
// ---------------------------------------------------------------------------
import type { CaseStudiesHeroContent } from "@/types/case-studies";

const HERO_CONTENT: CaseStudiesHeroContent = {
  heading: "Designed by Denvo Lab",
  // Same passion paragraph as the About page's hero (lib/data/about.ts),
  // reproduced here rather than imported: it's the Figma source repeating its
  // own boilerplate copy across frames, not a shared piece of content, and
  // each page's data file owns its own content per this project's
  // convention. The em dash after "passion" is written as a comma (house
  // rule: no em dashes), matching the fix already applied in lib/data/about.ts.
  description:
    "At Denvo Lab, our journey is fired by passion, our core spark. The secret to our innovation and success? It's the fusion of relentless dedication, a heart that beats for design, and a drive to innovate! With years of experience in the field, we have honed our skills to become At our agency",
};

export async function getCaseStudiesHero(): Promise<CaseStudiesHeroContent> {
  return HERO_CONTENT;
}
