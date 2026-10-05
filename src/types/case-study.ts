// ---------------------------------------------------------------------------
// Case study pages (/case-studies/<slug>), built from the Figma section
// "Case studiues" (node 716:18649).
//
// A page is a list of blocks. Each block is one band of the Figma frame and
// its `type` picks the component that draws it (components/sections/
// case-study-*). Numbers that describe the layout (offsets, widths, gaps) are
// the Figma values at the 1920px frame; the components scale them down
// smoothly on smaller screens and switch to stacked layouts on tablet and
// mobile.
// ---------------------------------------------------------------------------

export interface CaseStudyImage {
  src: string;
  alt: string;
  /** Intrinsic size of the exported file (also its aspect ratio). */
  width: number;
  height: number;
}

/** Text with optional emphasis runs, e.g. a sentence where one phrase is darker. */
export interface CaseStudyTextRun {
  text: string;
  /** "strong" = full-strength colour, "muted" = the lighter colour of the line. */
  tone?: "strong" | "muted" | "gradient";
}

interface BlockBase {
  /** Space above the block at 1920px, from the Figma frame (shrinks on smaller screens). */
  gap?: number;
}

// --- Template blocks (used by most pages) -----------------------------------

export interface CaseStudyHeroBlock extends BlockBase {
  type: "hero";
  tags: string[];
  title: string;
  cta: { label: string; href: string };
  image: CaseStudyImage;
  imageRadius: 24 | 32;
  /** Distance from the top of the picture to the top of the text block in Figma. */
  textOffset: number;
}

/** My Crew opens with a full-bleed picture instead of the text + picture hero. */
export interface CaseStudyCoverHeroBlock extends BlockBase {
  type: "cover-hero";
  /** The page title, read by screen readers (the picture carries the visible wordmark). */
  title: string;
  image: CaseStudyImage;
}

export type CaseStudyFactIcon = "industry" | "services" | "timeline";

export interface CaseStudyFactsBlock extends BlockBase {
  type: "facts";
  items: { icon: CaseStudyFactIcon; title: string; value: string }[];
}

export interface CaseStudyIntroBlock extends BlockBase {
  type: "intro";
  /** Dark lead-in (Job Sea only). The rest of the sentence is then muted. */
  lead?: string;
  text: string;
  /** Height the paragraph occupies in Figma, so the next block lands where it should. */
  minHeight: number;
}

export interface CaseStudyFigureBlock extends BlockBase {
  type: "figure";
  image: CaseStudyImage;
  /** Left edge and width in the 1920 frame. A width of 1920 makes it full-bleed. */
  x: number;
  width: number;
  /** Height of the frame in Figma when it crops the picture (e.g. 1024 for a 1035px shot). */
  height?: number;
  radius: number;
}

export interface CaseStudyChallengeBlock extends BlockBase {
  type: "challenge";
  title: string;
  body: string;
  /** Left edge of the text column in the 1920 frame (470 on most pages). */
  x: number;
  bodyColor?: "secondary" | "dark";
  /** Height of the slot the block sits in, so the next block lands where it should. */
  minHeight: number;
}

export interface CaseStudySolutionCard {
  title: string;
  description: string;
  image: CaseStudyImage;
}

export interface CaseStudySolutionBlock extends BlockBase {
  type: "solution";
  title: string;
  body: string;
  x: number;
  cards: CaseStudySolutionCard[];
  /** "compact" = three 302px cards (most pages), "wide" = two 489px cards (My Crew). */
  variant: "compact" | "wide";
  minHeight: number;
}

export type CaseStudyCollageCard =
  | { kind: "brand"; background: string; name: string; statement: string }
  | {
      kind: "quote";
      background: string;
      quote: string;
      /** The phone picture on the right of the card. */
      image: CaseStudyImage;
    };

export interface CaseStudyCollageBlock extends BlockBase {
  type: "collage";
  background: string;
  /** Left column: 651px + 572px pictures. */
  left: [CaseStudyImage, CaseStudyImage];
  /** Middle column: a 393px card over an 830px picture. */
  middle: { card: CaseStudyCollageCard; image: CaseStudyImage };
  /** Right column: 794px + 429px pictures. */
  right: [CaseStudyImage, CaseStudyImage];
}

export interface CaseStudyProcessStep {
  label: string;
  /** Pill colour behind "Step N". */
  color: string;
  title: string;
  description: string;
  items: string[];
}

export interface CaseStudyProcessBlock extends BlockBase {
  type: "process";
  title: string;
  steps: CaseStudyProcessStep[];
}

export interface CaseStudyTypographyBlock extends BlockBase {
  type: "typography";
  /** The big letter, exported from Figma as an SVG (clipped by its 567 x 702 box as in Figma). */
  glyph: { src: string; width: number; height: number; x: number; y: number };
  panel: {
    background: string;
    /** Right-hand picture of the panel (692 x 697 in Figma). */
    image: CaseStudyImage;
  };
  specimen: {
    lines: string;
    /** CSS font-family list for the specimen text. */
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    letterSpacing: string;
    fontWeight: number;
    width: number;
    x: number;
    y: number;
  };
  swatches: string[];
}

// --- Blocks for the two custom pages (AI Assistant, My Crew) ----------------

export interface CaseStudyGoalBlock extends BlockBase {
  type: "goal";
  label: string;
  statement: CaseStudyTextRun[];
  meta: { label: string; value: string }[];
  chips: string[];
}

/** One column of a phase list (design process wheel, project timeline). */
export interface CaseStudyPhase {
  /** "1st week" etc. */
  badge: string;
  /** Extra badge text, e.g. "Day 1 - 7". */
  detail?: string;
  title: string;
  items: string[];
}

export type CaseStudyVisualContent =
  | { kind: "phases"; phases: CaseStudyPhase[] }
  | { kind: "stats"; centre: string; stats: { value: string; label: string }[] }
  | {
      kind: "specimen";
      fontName: string;
      /** CSS font-family list used to show the font name on small screens. */
      fontFamily: string;
      notes: string[];
      weights: string[];
      colors: { name: string; hex: string }[];
    };

export interface CaseStudyVisualBlock extends BlockBase {
  type: "visual";
  eyebrow?: string;
  title: CaseStudyTextRun[];
  subtitle?: CaseStudyTextRun[];
  content: CaseStudyVisualContent;
  image: CaseStudyImage;
}

export interface CaseStudyCompetitorsBlock extends BlockBase {
  type: "competitors";
  eyebrow: string;
  title: CaseStudyTextRun[];
  columns: { name: string; logo: CaseStudyImage; rows: { title: string; text: string }[] }[];
}

export type CaseStudyBlock =
  | CaseStudyHeroBlock
  | CaseStudyCoverHeroBlock
  | CaseStudyFactsBlock
  | CaseStudyIntroBlock
  | CaseStudyFigureBlock
  | CaseStudyChallengeBlock
  | CaseStudySolutionBlock
  | CaseStudyCollageBlock
  | CaseStudyProcessBlock
  | CaseStudyTypographyBlock
  | CaseStudyGoalBlock
  | CaseStudyVisualBlock
  | CaseStudyCompetitorsBlock;

export interface CaseStudy {
  slug: string;
  /** Project name, used for the browser title and the case studies grid. */
  name: string;
  /** Meta description (the Figma intro paragraph). */
  description: string;
  blocks: CaseStudyBlock[];
  /** Paragraph of the closing "Let’s work. Together" band. */
  closing: string;
  /** Space between the last block and the closing band at 1920px. */
  closingGap: number;
}
