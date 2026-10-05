// ---------------------------------------------------------------------------
// Branding & Visual Identity service page (/services/branding-visual-identity).
// Figma: "Service Detail / 01" frame, node 701:14159.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const brandingVisualIdentity: ServiceDetailPage = {
  slug: "branding-visual-identity",
  name: "Branding & Visual Identity",
  description: "When your product has moved forward but your brand has not, every introduction takes too much explaining. We help turn what makes you different into an identity people can recognize—and a system your team can actually use.",
  blocks: [
    {
      type: "hero",
      headline: "Make your name\nmean something.",
      headlineWidth: 1840,
      problemLabel: "THE PROBLEM. THE WORK. WHAT YOU TAKE FORWARD.",
      scrollLabel: "SCROLL TO EXPLORE ↓",
      cueAlign: "start",
      intro: "When your product has moved forward but your brand has not, every introduction takes too much explaining. We help turn what makes you different into an identity people can recognize—and a system your team can actually use.",
      introWidth: 717,
      cta: {
        label: "Talk about your project",
        href: "/contact",
      },
      visual: {
        kind: "image",
        src: "/images/services/branding.png",
        alt: "Red Glade brand guidelines box and business card",
        radius: 24,
        bordered: false,
      },
    },
    {
      type: "capabilities",
      layout: "editorial-list",
      title: "A complete identity.\nEvery expression considered.",
      feature: {
        image: {
          src: "/images/service-detail/branding-principles.webp",
          alt: "Logo mark and type specimen cards with a lime color swatch",
        },
        statement: "Distinctive by design.\nConsistent by system.",
        description: "From your core positioning to the smallest brand application, every choice should feel connected.",
      },
      items: [
        {
          icon: "strategy",
          title: "Brand strategy",
          description: "Positioning, audience, differentiation, and a focused creative direction.",
        },
        {
          icon: "type",
          title: "Naming & messaging",
          description: "A verbal foundation that keeps your story clear and memorable.",
        },
        {
          icon: "layers",
          title: "Visual identity",
          description: "Logo, color, typography, imagery, and a cohesive art direction.",
        },
        {
          icon: "shield",
          title: "Brand guidelines",
          description: "Rules, examples, and templates that make consistency easy.",
        },
        {
          icon: "globe",
          title: "Campaign toolkit",
          description: "Flexible assets for launch, social, sales, and marketing.",
        },
        {
          icon: "spark",
          title: "Motion & rollout",
          description: "Expressive motion principles and support across key touchpoints.",
        },
      ],
    },
    {
      type: "brand-study",
      specimen: {
        label: "IDENTITY STUDY / FORM",
        wordmark: "form.",
        body: "A clear point of view.\nA recognizable way to show up.",
        footnote: "01 / STRATEGY → IDENTITY → APPLICATION",
      },
      typography: {
        label: "A SYSTEM, NOT JUST A SYMBOL.",
        specimen: "Aa",
        title: "Built to\nbelong.",
        body: "A flexible identity starts with a single, useful idea.",
        footnote: "FORM / BRAND DIRECTION",
      },
      application: {
        title: "Clear by design.",
        label: "CONSISTENT / NEVER IDENTICAL",
      },
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHAT SHOULD PEOPLE REMEMBER?",
          title: "Find the point of difference",
          body: "Audience context, competitor patterns and stakeholder input become a concise positioning brief. We agree on the promise before choosing how it looks.",
        },
        {
          number: "02",
          question: "WHY DOES THIS EXPRESSION FIT?",
          title: "Explore a direction",
          body: "We show distinct creative territories with a rationale, not a wall of unexplained logos. The chosen direction is judged against the brief.",
        },
        {
          number: "03",
          question: "DOES IT WORK BEYOND THE PRESENTATION?",
          title: "Test it in the real world",
          body: "We develop the mark, typography and color system, then apply them to the touchpoints your team uses most. Small-size and one-color tests expose weak spots.",
        },
        {
          number: "04",
          question: "CAN YOUR TEAM KEEP IT CONSISTENT?",
          title: "Make it usable",
          body: "We package editable assets, usage rules and practical examples. A handover walks your team through how to choose, combine and export them.",
        },
      ],
    },
    {
      type: "showcase",
      image: {
        src: "/images/service-detail/branding-showcase.webp",
        alt: "Branded tote bag, notebook and paper set on stone",
      },
      height: 850,
    },
    {
      type: "faq",
      title: "Good questions.\nClear answers.",
      description: "Have a different question? Tell us what you’re working on and we’ll talk through the right next step.",
      descriptionWidth: 524,
      cta: {
        label: "Let’s talk",
        href: "/contact",
      },
      ctaTone: "brand",
      listGap: 32,
      openBorder: "focus",
      items: [
        {
          question: "Can you refresh an existing brand?",
          answer: "Yes. We can retain valuable recognition while resolving inconsistencies and creating a stronger, more flexible system.",
        },
        {
          question: "What will our team receive?",
          answer: "A complete, editable identity toolkit with guidelines, core assets, templates, and usage examples.",
        },
        {
          question: "How do you use AI in branding?",
          answer: "AI helps us explore territory and accelerate production; strategy, originality, refinement, and final craft remain designer-led.",
        },
        {
          question: "Will the identity work across product and marketing?",
          answer: "We test the system across digital products, websites, campaigns, presentations, and social content.",
        },
      ],
    },
    {
      type: "conversation",
      title: "Ready to make your brand unmistakable?",
      titleWidth: 857,
      description: "Tell us where you are today. Let’s shape what comes next.",
      cta: {
        label: "Let’s talk",
        href: "/contact",
      },
      aberration: 0.02,
    },
  ],
};
