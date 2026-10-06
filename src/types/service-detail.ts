// ---------------------------------------------------------------------------
// Service detail pages (/services/[slug]): one page per service, built from
// the Figma "Service Detail / 01-07" frames (section 701:16436).
//
// A page is a list of blocks. Each block is one Figma section, and its
// `type` picks the component that draws it (see
// components/sections/service-detail/README.md for the full map). The pages
// reuse the same section designs with different content, so the data is
// what changes from page to page, not the components.
//
// TEXT: line breaks inside a string ("\n") are the hard line breaks typed in
// the Figma text layer. The components render them with `whitespace-pre-line`.
//
// WIDTHS: a few blocks carry a `...Width` number. That is the Figma text box
// width in px at the 1920 desktop frame. The headline/intro copy was written
// for that box, so the same width gives the same line breaks.
// ---------------------------------------------------------------------------

/** The Streamline glyphs used on these pages (see ui/service-icon). */
export type ServiceIconName =
  | "strategy"
  | "type"
  | "layers"
  | "shield"
  | "globe"
  | "spark"
  | "research"
  | "flow"
  | "mobile"
  | "code"
  | "check"
  | "chart";

export interface ServiceLink {
  label: string;
  href: string;
}

export interface ServiceImage {
  src: string;
  alt: string;
}

// --- Hero ------------------------------------------------------------------

export type ServiceHeroVisual =
  | ({ kind: "image"; radius: 12 | 24; bordered: boolean } & ServiceImage)
  /** The AI agent page's static workflow funnel (one exported SVG). */
  | { kind: "workflow"; alt: string };

export interface ServiceHeroBlock {
  type: "hero";
  headline: string;
  headlineWidth: number;
  problemLabel: string;
  scrollLabel: string;
  /** Pages 01-02 pin the scroll cue to the top of its row, 03-07 center it. */
  cueAlign: "start" | "center";
  intro: string;
  introWidth: number;
  cta: ServiceLink;
  visual: ServiceHeroVisual;
}

// --- Capabilities (six layouts, one per design) ------------------------------

export interface ServiceCapability {
  icon: ServiceIconName;
  iconAsset?: string;
  tile?: number;
  title: string;
  description: string;
}

export interface CapabilitiesEditorialList {
  type: "capabilities";
  layout: "editorial-list";
  title: string;
  feature: { image: ServiceImage; statement: string; description: string };
  items: ServiceCapability[];
}

export interface CapabilitiesCardGrid {
  type: "capabilities";
  layout: "card-grid";
  title: string;
  /** true: the 3 cards in a row share the full width; false: fixed 588px cards. */
  stretch: boolean;
  /** Space between the rows of cards, px (32 on UI/UX, 64 on SaaS). */
  rowGap: number;
  items: ServiceCapability[];
}

export interface CapabilitiesAnatomy {
  type: "capabilities";
  layout: "anatomy";
  title: string;
  titleWidth: number;
  before: ServiceCapability[];
  after: ServiceCapability[];
  showcase: { image: ServiceImage; title: string; body: string };
}

export interface CapabilitiesIndexedGrid {
  type: "capabilities";
  layout: "indexed-grid";
  title: string;
  items: (ServiceCapability & { index: string })[];
}

export interface CapabilitiesWideCards {
  type: "capabilities";
  layout: "wide-cards";
  eyebrow: string;
  title: string;
  items: (ServiceCapability & { tone: "brand" | "neutral"; iconSize: 56 | 72 })[];
}

export interface CapabilitiesListFeature {
  type: "capabilities";
  layout: "list-feature";
  title: string;
  items: ServiceCapability[];
  feature: { image: ServiceImage; icon: ServiceIconName; title: string; description: string };
}

export type ServiceCapabilitiesBlock =
  | CapabilitiesEditorialList
  | CapabilitiesCardGrid
  | CapabilitiesAnatomy
  | CapabilitiesIndexedGrid
  | CapabilitiesWideCards
  | CapabilitiesListFeature;

// --- Other sections ----------------------------------------------------------

/** Branding page: three overlapping "study" cards (Figma "3.1 / Study / Brand identity"). */
export interface ServiceBrandStudyBlock {
  type: "brand-study";
  specimen: { label: string; wordmark: string; body: string; footnote: string };
  typography: { label: string; specimen: string; title: string; body: string; footnote: string };
  application: { title: string; label: string };
}

/** Dark "You should know what happens next." block: pinned title + numbered steps. */
export interface ServiceProcessNarrativeBlock {
  type: "process-narrative";
  label?: string;
  title: string;
  body?: string;
  footnote?: string;
  steps: { number: string; question: string; title: string; body: string; output?: string }[];
}

/** Full-width image ("Craft / Service concept showcase"). */
export interface ServiceShowcaseBlock {
  type: "showcase";
  image: ServiceImage;
  height: number;
}

/** SaaS page: dark text column + large image. */
export interface ServiceCraftSplitBlock {
  type: "craft-split";
  title: string;
  description: string;
  image: ServiceImage;
}

export interface ServiceFaqBlock {
  type: "faq";
  eyebrow?: string;
  title: string;
  description: string;
  descriptionWidth: number;
  cta: ServiceLink;
  /** "brand": lime button (pages 01-02), "dark": Gray/900 button (03-07). */
  ctaTone: "brand" | "dark";
  /** Space between the question cards, in px. */
  listGap: number;
  /** Border of the open card: lime focus border (01-02) or the normal one. */
  openBorder: "focus" | "primary";
  items: { question: string; answer: string }[];
}

/** Lime closing band with Figma's "Lens distortion" shader on top. */
export interface ServiceConversationBlock {
  type: "conversation";
  title: string;
  titleWidth: number;
  description: string;
  cta: ServiceLink;
  /** The shader's "Aberration" setting (0.02 on pages 01-02, 0.03 on the rest). */
  aberration: number;
}

/** UI/UX page: "Every request. A clear next step." device story. */
export interface ServicePracticeBlock {
  type: "practice";
  title: string;
  intro: string;
  decisions: { index: string; title: string; benefit: string }[];
  image: ServiceImage;
}

/** "The handover is part of the product." table of deliverables. */
export interface ServiceHandoverBlock {
  type: "handover";
  label?: string;
  title: string;
  body: string;
  rows: { index: string; title: string; body: string }[];
}

/** Light grey process strip: numbered columns. */
export interface ServiceProcessStepsBlock {
  type: "process-steps";
  /** "friction": mobile page's 3 wide columns; "sequence": 4 columns with big step numbers. */
  variant: "friction" | "sequence";
  eyebrow?: string;
  title: string;
  /** Only the "friction" layout has a narrow title box. */
  titleWidth?: number;
  numberTone?: "primary" | "tertiary";
  items: { index: string; title: string; body: string }[];
}

/** "Everything your team needs next." check list. */
export interface ServiceChecklistBlock {
  type: "checklist";
  tone: "plain" | "brand";
  eyebrow?: string;
  title: string;
  body?: string;
  rowAlign: "center" | "start";
  items: { format: string; deliverable: string }[];
}

/** MVP page: "The right first version." statement. */
export interface ServicePerspectiveBlock {
  type: "perspective";
  marker: string;
  title: string;
  body: string;
}

export type ServiceDetailBlock =
  | ServiceHeroBlock
  | ServiceCapabilitiesBlock
  | ServiceBrandStudyBlock
  | ServiceProcessNarrativeBlock
  | ServiceShowcaseBlock
  | ServiceCraftSplitBlock
  | ServiceFaqBlock
  | ServiceConversationBlock
  | ServicePracticeBlock
  | ServiceHandoverBlock
  | ServiceProcessStepsBlock
  | ServiceChecklistBlock
  | ServicePerspectiveBlock;

export interface ServiceDetailPage {
  slug: string;
  /** Page <title> and the Services list entry this page belongs to. */
  name: string;
  description: string;
  blocks: ServiceDetailBlock[];
}
