// ---------------------------------------------------------------------------
// Pieces shared by the case study pages.
//
// Eight of the eleven Figma frames (Denvo Hotel, Denvo Travel, Part Pilot,
// Pro Budget Tracker, Locksmith, Metro HR, Casana AI, Smart Aqua Farm 360) are
// one template with different content: same sections, same positions, same
// process copy. `buildTemplateCaseStudy` turns a page's own content into the
// full block list, so each of those data files only holds what is different.
//
// All gaps and heights are the Figma values at 1920px (y positions taken from
// the frames, e.g. the overview picture always starts at y 2008).
// ---------------------------------------------------------------------------
import type {
  CaseStudy,
  CaseStudyBlock,
  CaseStudyImage,
  CaseStudyProcessStep,
  CaseStudySolutionCard,
} from "@/types/case-study";

/** A picture in public/images/case-studies/<folder>/<name>.webp. */
export function csImage(folder: string, name: string, alt: string, width = 1840, height = 1035): CaseStudyImage {
  return { src: `/images/case-studies/${folder}/${name}.webp`, alt, width, height };
}

/** The closing paragraph used by the template pages. */
export const TEMPLATE_CLOSING =
  "Bring your next product idea to life with a clear visual system, focused user flows and a thoughtful digital experience.";

/** Job Sea, AI Assistant and My Crew carry this paragraph in their closing band. */
export const PROCESS_CLOSING =
  "In the final phase, we validate the design through user testing, A/B tests, and feedback. These strategies help us refine the prototype to optimize usability and ensure a smooth & engaging user experience.";

export const STEP_COLORS = ["#eee0ff", "#f3ffe3", "#e3f6ff", "#fff8e3"] as const;

/** "Process" band of the template pages (identical on all eight). */
export const TEMPLATE_PROCESS: CaseStudyProcessStep[] = [
  {
    label: "Step 1",
    color: STEP_COLORS[0],
    title: "Structure & Context",
    description: "Organize the primary tasks, content and decision points.",
    items: ["Main tasks.", "Content hierarchy.", "Screen inventory.", "User context.", "Journey priorities."],
  },
  {
    label: "Step 2",
    color: STEP_COLORS[1],
    title: "Flows & Layout",
    description: "Connect the main pages through a clear, consistent journey.",
    items: ["Journey mapping.", "Screen relationships.", "Interaction states.", "Navigation clarity."],
  },
  {
    label: "Step 3",
    color: STEP_COLORS[2],
    title: "Visual System",
    description: "Carry the product’s typography, colors and UI patterns across the experience.",
    items: [
      "Brand integration.",
      "Typography and color selection.",
      "High-fidelity mockups.",
      "Design system creation.",
      "Visual consistency.",
    ],
  },
  {
    label: "Step 4",
    color: STEP_COLORS[3],
    title: "Review & Handoff",
    description: "Review screen states, content clarity and handoff requirements.",
    items: [
      "Interaction review.",
      "Responsive checks.",
      "Content clarity.",
      "Design refinement.",
      "Handoff preparation.",
    ],
  },
];

/** The six screens of a template page, in the order Figma stacks them. */
export interface TemplateScreen {
  name: string;
  /** Readable screen name for the alt text, e.g. "room listing". */
  label: string;
  width?: number;
  height?: number;
}

export interface TemplateInput {
  slug: string;
  name: string;
  tags: [string, string];
  /** Hero title; "\n" keeps Figma's line break. */
  title: string;
  industry: string;
  intro: string;
  challenge: string;
  solution: { body: string; cards: Omit<CaseStudySolutionCard, "image">[] };
  /** Light tint behind the collage, also used by the typography panel. */
  tint: string;
  brand: { color: string; statement: string };
  typography: {
    glyph: { width: number; height: number; x: number; y: number };
    fontFamily: string;
    fontWeight?: number;
    lines: string;
    swatches: [string, string, string, string];
  };
  screens: [TemplateScreen, TemplateScreen, TemplateScreen, TemplateScreen, TemplateScreen, TemplateScreen];
}

/** Standard typography specimen layout (Figma: 26/40, -2.5%, 420px wide at 53, 149 in the panel). */
export const SPECIMEN_LINES =
  "A B C D E F G H I J K L M\nN O P Q R S T U V W X Y Z\na b c d e f g h i j k l m\nn o p q r s t u v w x y z\n\nRegular · Medium · Bold";

export function buildTemplateCaseStudy(input: TemplateInput): CaseStudy {
  const { slug, name, screens } = input;
  const shot = (i: number) => {
    const s = screens[i];
    return csImage(slug, s.name, `${name} ${s.label} screen in a device mockup`, s.width ?? 1840, s.height ?? 1035);
  };
  // Figma reuses the screens around the page in the same pattern on every
  // template frame: screen 1 is the hero, overview, billboard and panel
  // picture; the collage and the solution cards use screens 1-4 and 6.
  const [s1, s2, s3, s4, , s6] = [0, 1, 2, 3, 4, 5].map((i) => shot(i));

  const blocks: CaseStudyBlock[] = [
    {
      type: "hero",
      tags: input.tags,
      title: input.title,
      cta: { label: "Let’s Talk", href: "/contact" },
      image: s1,
      imageRadius: 32,
      textOffset: 195,
    },
    {
      type: "facts",
      gap: 78,
      items: [
        { icon: "industry", title: "Industry", value: input.industry },
        { icon: "services", title: "Services", value: "UI/UX Case Study" },
        { icon: "timeline", title: "Scope", value: "6 core screens" },
      ],
    },
    { type: "intro", gap: 151, text: input.intro, minHeight: 408 },
    { type: "figure", gap: 78, image: s1, x: 40, width: 1840, height: 1024, radius: 24 },
    {
      type: "challenge",
      gap: 198,
      title: "The Challenge",
      body: input.challenge,
      x: 470,
      minHeight: 253,
    },
    {
      type: "solution",
      title: "The Solution",
      body: input.solution.body,
      x: 470,
      variant: "compact",
      minHeight: 686,
      cards: input.solution.cards.map((card, i) => ({ ...card, image: [s1, s3, s6][i] })),
    },
    {
      type: "collage",
      background: input.tint,
      left: [s1, s3],
      middle: {
        card: { kind: "brand", background: input.brand.color, name, statement: input.brand.statement },
        image: s4,
      },
      right: [s2, s1],
    },
    { type: "process", title: "Process", steps: TEMPLATE_PROCESS },
    { type: "figure", gap: 128, image: s1, x: 40, width: 1840, radius: 24 },
    {
      type: "typography",
      gap: 100,
      glyph: { src: `/images/case-studies/${slug}/glyph.svg`, ...input.typography.glyph },
      panel: { background: input.tint, image: s1 },
      specimen: {
        lines: input.typography.lines,
        fontFamily: input.typography.fontFamily,
        fontSize: 26,
        lineHeight: 40,
        letterSpacing: "-0.025em",
        fontWeight: input.typography.fontWeight ?? 400,
        width: 420,
        x: 53,
        y: 149,
      },
      swatches: input.typography.swatches,
    },
    // The six screens, 80px apart (Figma frames 4 and 5 are 1034px tall, the
    // rest 1035). Figma gives the third one square corners on every frame,
    // so it is kept that way.
    ...screens.map(
      (_, i): CaseStudyBlock => ({
        type: "figure",
        gap: i === 0 ? 25 : 80,
        image: shot(i),
        x: 40,
        width: 1840,
        height: i === 3 || i === 4 ? 1034 : 1035,
        radius: i === 2 ? 0 : 24,
      }),
    ),
  ];

  return {
    slug,
    name,
    description: input.intro,
    blocks,
    closing: TEMPLATE_CLOSING,
    closingGap: 265,
  };
}
