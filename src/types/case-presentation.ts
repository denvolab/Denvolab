import type { CaseStudyFactIcon, CaseStudyImage, CaseStudySolutionCard } from "./case-study";

/** Every project uses the updated Job Sea layout; only this content varies. */
export interface CaseStudyPresentation {
  designVariant?: "travel";
  title: string;
  summary: string;
  facts: { icon: CaseStudyFactIcon; title: string; value: string }[];
  intro: { lead?: string; text: string };
  hero: CaseStudyImage;
  overview: CaseStudyImage;
  /** Optional real project walkthrough. Without a source, render the poster. */
  video?: { src: string; type?: string; captions?: string };
  banner: CaseStudyImage;
  challenge: string;
  solution: { body: string; cards: CaseStudySolutionCard[] };
  collage: CaseStudyImage[];
  quote?: { text: string; phone: CaseStudyImage; screen: CaseStudyImage };
  brand: {
    glyph?: CaseStudyImage;
    logo?: CaseStudyImage;
    gridBackground?: string;
    fontName: string;
    fontFamily: string;
    primary: string;
    surface: string;
    background: string;
    grid: CaseStudyImage;
    swatches: { name: string; hex: string; sampleColor?: string }[];
  };
  gallery: (CaseStudyImage & { caption?: string })[];
}
