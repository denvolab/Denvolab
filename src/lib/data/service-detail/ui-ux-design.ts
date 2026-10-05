// ---------------------------------------------------------------------------
// AI-Enhanced UI/UX Design service page (/services/ui-ux-design).
// Figma: "Service Detail / 02" frame, node 701:14325.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const uiUxDesign: ServiceDetailPage = {
  slug: "ui-ux-design",
  name: "AI-Enhanced UI/UX Design",
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
      introWidth: 686,
      cta: {
        label: "Talk about your project",
        href: "/contact",
      },
      visual: {
        kind: "image",
        src: "/images/service-detail/ui-ux-design-hero.webp",
        alt: "Workspace booking product shown on a desktop, laptop and two phones",
        radius: 24,
        bordered: false,
      },
    },
    {
      type: "capabilities",
      layout: "card-grid",
      title: "Every layer of your\nproduct experience, connected.",
      stretch: false,
      rowGap: 32,
      items: [
        {
          icon: "research",
          title: "UX research",
          description: "Interviews, audits, competitive review, and behavior-focused insights.",
        },
        {
          icon: "layers",
          title: "Information architecture",
          description: "Clear structures that make features and content easier to find.",
        },
        {
          icon: "flow",
          title: "User flows",
          description: "Purposeful journeys for core tasks, edge cases, and handoffs.",
        },
        {
          icon: "layers",
          title: "UI design",
          description: "Accessible, responsive interfaces with strong visual hierarchy.",
        },
        {
          icon: "mobile",
          title: "Prototyping & testing",
          description: "Interactive prototypes for early validation and confident iteration.",
        },
        {
          icon: "code",
          title: "Design systems",
          description: "Reusable components, tokens, and documentation for product teams.",
        },
      ],
    },
    {
      type: "practice",
      title: "Every request.\nA clear next step.",
      intro: "Submitting a request should not start a guessing game. This concept makes progress visible and shows people what happens next—on desktop and mobile.",
      decisions: [
        {
          index: "01",
          title: "Make progress visible",
          benefit: "A clear status and timeline show what is complete, what is in review, and what comes next.",
        },
        {
          index: "02",
          title: "Keep the journey connected",
          benefit: "The same request, language, and next action stay familiar as people move between screens.",
        },
      ],
      image: {
        src: "/images/service-detail/ui-ux-device-story.webp",
        alt: "Request management dashboard on a tablet held in two hands",
      },
    },
    {
      type: "handover",
      title: "The handover\nis part of\nthe product.",
      body: "These are the building blocks of the scope—not a promise that every project includes everything. Your proposal defines the exact outputs, formats and responsibilities.",
      rows: [
        {
          index: "01",
          title: "Evidence",
          body: "Research notes, audit findings and the assumptions still to validate.",
        },
        {
          index: "02",
          title: "Structure",
          body: "Navigation model, information architecture and primary task flows.",
        },
        {
          index: "03",
          title: "Prototype",
          body: "Clickable critical journeys for review and scoped usability testing.",
        },
        {
          index: "04",
          title: "UI design",
          body: "Agreed screens and responsive layouts with edge and system states.",
        },
        {
          index: "05",
          title: "System",
          body: "Reusable components, variables and interaction specifications.",
        },
        {
          index: "06",
          title: "Build support",
          body: "Handover walkthrough and an agreed design QA review.",
        },
      ],
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHAT IS HAPPENING, AND TO WHOM?",
          title: "Understand the friction",
          body: "We review the product, available analytics and support themes. Interviews or usability sessions are scoped where direct user input is needed.",
        },
        {
          number: "02",
          question: "WHAT IS THE SHORTEST UNDERSTANDABLE PATH?",
          title: "Make the journey explicit",
          body: "We map information architecture, key flows and dependencies. Wireframes focus on choices, sequence and hierarchy before visual polish.",
        },
        {
          number: "03",
          question: "CAN SOMEONE COMPLETE THE TASK UNAIDED?",
          title: "Design and test the experience",
          body: "Detailed interfaces include empty, loading, error and permission states. We test critical journeys, record the findings and refine the design.",
        },
        {
          number: "04",
          question: "WILL THE IMPLEMENTATION KEEP THE INTENT?",
          title: "Bring the build into the loop",
          body: "Engineers review feasibility early. The handover includes component behavior, responsive rules and a design QA checklist for the built product.",
        },
      ],
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
      title: "Let’s make your product\neasier to love.",
      titleWidth: 1320,
      description: "Tell us where you are today. Let’s shape what comes next.",
      cta: {
        label: "Let’s talk",
        href: "/contact",
      },
      aberration: 0.02,
    },
  ],
};
