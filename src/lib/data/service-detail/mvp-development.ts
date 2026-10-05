// ---------------------------------------------------------------------------
// MVP Development service page (/services/mvp-development).
// Figma: "Service Detail / 06" frame, node 701:15076.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const mvpDevelopment: ServiceDetailPage = {
  slug: "mvp-development",
  name: "MVP Development",
  description: "Your first release does not need every feature. It needs a complete, useful journey that helps you learn whether the idea deserves the next investment. We help decide what to build, what to leave out and what to measure.",
  blocks: [
    {
      type: "hero",
      headline: "Build the part\nthat proves the point.",
      headlineWidth: 1100,
      problemLabel: "THE PROBLEM. THE WORK. WHAT YOU TAKE FORWARD.",
      scrollLabel: "SCROLL TO EXPLORE ↓",
      cueAlign: "center",
      intro: "Your first release does not need every feature. It needs a complete, useful journey that helps you learn whether the idea deserves the next investment. We help decide what to build, what to leave out and what to measure.",
      introWidth: 699,
      cta: {
        label: "Talk about your project",
        href: "/contact",
      },
      visual: {
        kind: "image",
        src: "/images/services/mvp.png",
        alt: "Product development dashboard shown on a laptop, tablet and phone",
        radius: 12,
        bordered: true,
      },
    },
    {
      type: "perspective",
      marker: "01 / THE OPPORTUNITY",
      title: "The right first version.\nNot every possible feature.",
      body: "An MVP is a way to learn. We help you focus on one meaningful problem, build a complete core experience and decide what deserves investment next.",
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      label: "03 / HOW THE WORK MOVES",
      body: "Each phase ends with a concrete artifact and a decision to review. The scope, responsibilities and review rounds are agreed before kickoff.",
      footnote: "FOUR PHASES / SHARED DECISIONS",
      steps: [
        {
          number: "01",
          question: "WHAT ARE WE TRYING TO LEARN?",
          title: "Choose the question",
          body: "We identify the audience, core problem and riskiest assumption. Success signals are defined before the feature list grows.",
          output: "YOU REVIEW / Hypothesis + validation criteria",
        },
        {
          number: "02",
          question: "WHAT CAN WAIT WITHOUT BREAKING THE VALUE?",
          title: "Draw the release boundary",
          body: "We map the end-to-end journey and separate essential capabilities from later ideas. A prototype tests the logic before engineering begins.",
          output: "YOU REVIEW / Now / later scope + prototype",
        },
        {
          number: "03",
          question: "CAN SOMEONE COMPLETE THE CORE JOB?",
          title: "Build the useful version",
          body: "We implement the agreed flow with essential reliability, access controls and measurement. Short reviews keep tradeoffs visible.",
          output: "YOU REVIEW / Working release + event instrumentation",
        },
        {
          number: "04",
          question: "WHAT DESERVES THE NEXT INVESTMENT?",
          title: "Read the signal",
          body: "We review usage and feedback against the original question. The next step may be refinement, a changed assumption or a carefully scoped expansion.",
          output: "YOU REVIEW / Learning review + prioritized next steps",
        },
      ],
    },
    {
      type: "capabilities",
      layout: "wide-cards",
      eyebrow: "WHAT WE CAN HELP WITH",
      title: "From first hypothesis\nto a product worth testing.",
      items: [
        {
          icon: "strategy",
          title: "Product framing",
          description: "Clarify the problem, audience, value proposition, and validation goal.",
          tone: "brand",
          iconSize: 72,
        },
        {
          icon: "layers",
          title: "Feature prioritization",
          description: "Separate must-have learning from features that can wait.",
          tone: "neutral",
          iconSize: 56,
        },
        {
          icon: "flow",
          title: "UX flows",
          description: "Design the shortest coherent journey from entry to core value.",
          tone: "neutral",
          iconSize: 72,
        },
        {
          icon: "mobile",
          title: "Prototype",
          description: "Create a realistic interactive experience for testing and alignment.",
          tone: "brand",
          iconSize: 72,
        },
        {
          icon: "code",
          title: "MVP interface",
          description: "Build a reusable UI foundation for the first release.",
          tone: "neutral",
          iconSize: 72,
        },
        {
          icon: "chart",
          title: "Validation roadmap",
          description: "Define what to measure, learn, improve, and build next.",
          tone: "neutral",
          iconSize: 72,
        },
      ],
    },
    {
      type: "handover",
      label: "04 / WHAT YOU TAKE FORWARD",
      title: "The handover\nis part of\nthe product.",
      body: "These are the building blocks of the scope—not a promise that every project includes everything. Your proposal defines the exact outputs, formats and responsibilities.",
      rows: [
        {
          index: "01",
          title: "Product brief",
          body: "Audience, core problem, assumptions and intended learning.",
        },
        {
          index: "02",
          title: "Release scope",
          body: "Explicit in-scope and later lists with acceptance criteria.",
        },
        {
          index: "03",
          title: "Prototype",
          body: "The complete primary journey before the build begins.",
        },
        {
          index: "04",
          title: "Working MVP",
          body: "Agreed application, integrations and essential operational setup.",
        },
        {
          index: "05",
          title: "Measurement",
          body: "Events and feedback collection tied to the learning question.",
        },
        {
          index: "06",
          title: "Handover",
          body: "Source access, documentation and a post-release decision review.",
        },
      ],
    },
    {
      type: "showcase",
      image: {
        src: "/images/service-detail/mvp-showcase.webp",
        alt: "Tablet with an early product screen next to paper wireframes",
      },
      height: 800,
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHAT ARE WE TRYING TO LEARN?",
          title: "Choose the question",
          body: "We identify the audience, core problem and riskiest assumption. Success signals are defined before the feature list grows.",
        },
        {
          number: "02",
          question: "WHAT CAN WAIT WITHOUT BREAKING THE VALUE?",
          title: "Draw the release boundary",
          body: "We map the end-to-end journey and separate essential capabilities from later ideas. A prototype tests the logic before engineering begins.",
        },
        {
          number: "03",
          question: "CAN SOMEONE COMPLETE THE CORE JOB?",
          title: "Build the useful version",
          body: "We implement the agreed flow with essential reliability, access controls and measurement. Short reviews keep tradeoffs visible.",
        },
        {
          number: "04",
          question: "WHAT DESERVES THE NEXT INVESTMENT?",
          title: "Read the signal",
          body: "We review usage and feedback against the original question. The next step may be refinement, a changed assumption or a carefully scoped expansion.",
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Good questions.\nClear answers.",
      description: "Have a different question? Tell us what you’re working on and we’ll talk through the right next step.",
      descriptionWidth: 680,
      cta: {
        label: "Let’s talk",
        href: "/contact",
      },
      ctaTone: "dark",
      listGap: 16,
      openBorder: "primary",
      items: [
        {
          question: "How small should an MVP be?",
          answer: "Small enough to test the central value, but complete enough that a real user can understand and use it.",
        },
        {
          question: "Can you work from just an idea?",
          answer: "Yes. We can help define the audience, problem, product promise, scope, and validation approach before design starts.",
        },
        {
          question: "Will the MVP be scalable?",
          answer: "We avoid unnecessary architecture while establishing patterns that support the next stage of product growth.",
        },
        {
          question: "What happens after launch?",
          answer: "We review evidence, prioritize improvements, and help shape the next version based on real behavior rather than assumptions.",
        },
      ],
    },
    {
      type: "conversation",
      title: "Your big idea deserves a focused first step.",
      titleWidth: 1320,
      description: "Tell us where you are today. Let’s shape what comes next.",
      cta: {
        label: "Let’s talk",
        href: "/contact",
      },
      aberration: 0.03,
    },
  ],
};
