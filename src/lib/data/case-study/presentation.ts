import content from "./presentation-data";
import type { CaseStudyPresentation } from "@/types/case-presentation";

// One presentation schema and renderer for every case study. Content mirrors
// the final Figma frames; local media preserves the original 8K exports.
const presentations: Record<string, CaseStudyPresentation> = content;

export function getCaseStudyPresentation(slug: string): CaseStudyPresentation | undefined {
  return presentations[slug];
}
