// ---------------------------------------------------------------------------
// Mobile App Design & Development service page (/services/mobile-app-development).
// Figma: "Service Detail / 03" frame, node 701:14471.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const mobileAppDevelopment: ServiceDetailPage = {
  slug: "mobile-app-development",
  name: "Mobile App Design & Development",
  description: "A good mobile app works in short, interrupted moments—not just in a perfect demo. We design and build the core journey, the awkward edge cases and the feedback that helps people trust every tap.",
  blocks: [
    {
      type: "hero",
      headline: "An app people open.\nAn experience they keep.",
      headlineWidth: 1292,
      problemLabel: "THE PROBLEM. THE WORK. WHAT YOU TAKE FORWARD.",
      scrollLabel: "SCROLL TO EXPLORE ↓",
      cueAlign: "center",
      intro: "A good mobile app works in short, interrupted moments—not just in a perfect demo. We design and build the core journey, the awkward edge cases and the feedback that helps people trust every tap.",
      introWidth: 699,
      cta: {
        label: "Talk about your project",
        href: "/contact",
      },
      visual: {
        kind: "image",
        src: "/images/services/mobile-app.png",
        alt: "Five phone screens from different mobile apps against a blue sky",
        radius: 24,
        bordered: true,
      },
    },
    {
      type: "capabilities",
      layout: "anatomy",
      title: "From the first tap to a lasting habit.",
      titleWidth: 566,
      before: [
        {
          icon: "strategy",
          title: "Product strategy",
          description: "Define the audience, core value, feature priorities, and release path.",
        },
        {
          icon: "mobile",
          title: "iOS & Android UX",
          description: "Platform-aware flows that still feel consistent with your brand.",
        },
        {
          icon: "flow",
          title: "Interactive prototype",
          description: "Validate navigation, interactions, and key moments before build.",
        },
      ],
      after: [
        {
          icon: "layers",
          title: "Mobile UI system",
          description: "Reusable components, states, accessibility, and responsive behavior.",
        },
        {
          icon: "code",
          title: "Development handoff",
          description: "Detailed specs, edge cases, and collaboration through implementation.",
        },
        {
          icon: "check",
          title: "Launch refinement",
          description: "QA support, usability feedback, and focused post-launch improvements.",
        },
      ],
      showcase: {
        image: {
          src: "/images/service-detail/mobile-interaction.webp",
          alt: "Hand holding a phone with a car parts shopping app",
        },
        title: "Designed for the moments\nbetween screens.",
        body: "Feedback, transitions and states make an interface feel complete.",
      },
    },
    {
      type: "process-steps",
      variant: "friction",
      title: "A clear process.\nRoom for the right questions.",
      titleWidth: 528,
      items: [
        {
          index: "01",
          title: "Interrupted journeys",
          body: "Progress disappears when people switch apps or lose connectivity.",
        },
        {
          index: "02",
          title: "Permission fatigue",
          body: "The app asks for access before explaining why it is useful.",
        },
        {
          index: "03",
          title: "Unfinished states",
          body: "Loading, failure and recovery feel like a different product from the happy path.",
        },
      ],
    },
    {
      type: "handover",
      title: "The handover\nis part of\nthe product.",
      body: "These are the building blocks of the scope—not a promise that every project includes everything. Your proposal defines the exact outputs, formats and responsibilities.",
      rows: [
        {
          index: "01",
          title: "Product scope",
          body: "Core journeys, release boundaries and platform decisions.",
        },
        {
          index: "02",
          title: "Experience",
          body: "Screen designs, navigation and motion/feedback specifications.",
        },
        {
          index: "03",
          title: "UI kit",
          body: "Mobile components, type scales and platform-specific behavior.",
        },
        {
          index: "04",
          title: "App build",
          body: "Agreed frontend, integrations and authentication flows.",
        },
        {
          index: "05",
          title: "Quality checks",
          body: "Device test coverage, failure states and release issue list.",
        },
        {
          index: "06",
          title: "Release package",
          body: "Store submission assets and a documented handover, as scoped.",
        },
      ],
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHY WOULD SOMEONE KEEP THIS APP?",
          title: "Define the core use case",
          body: "We map the audience, daily context and primary action. Platform choice, device capabilities and integration needs shape the release scope.",
        },
        {
          number: "02",
          question: "DOES THE INTERACTION FEEL NATURAL?",
          title: "Prototype the key moments",
          body: "We test navigation, touch targets, permission prompts and feedback. Platform conventions are adapted thoughtfully rather than copied blindly.",
        },
        {
          number: "03",
          question: "WHAT HAPPENS WHEN CONDITIONS CHANGE?",
          title: "Build the complete journey",
          body: "Implementation connects the interface to services, authentication and device features. Loading, offline behavior and recovery are specified where relevant.",
        },
        {
          number: "04",
          question: "CAN THE TEAM SHIP AND SUPPORT IT?",
          title: "Prepare for release",
          body: "We plan device testing, store assets, release checks and issue tracking. Store review and approval remain subject to platform requirements.",
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
      listGap: 32,
      openBorder: "primary",
      items: [
        {
          question: "Can you start from an existing app?",
          answer: "Yes. We can improve a live product, rebuild priority flows, or create a complete redesign roadmap.",
        },
        {
          question: "Do you design for both iOS and Android?",
          answer: "Yes. We account for platform expectations while maintaining one coherent brand and product experience.",
        },
        {
          question: "Will we receive a prototype?",
          answer: "Yes. Key flows can be delivered as an interactive prototype for testing, stakeholder review, and development alignment.",
        },
        {
          question: "Can the app scale after launch?",
          answer: "We plan component patterns, states, and product structure so new features can be added without redesigning everything.",
        },
      ],
    },
    {
      type: "conversation",
      title: "Have an app idea worth bringing to life?",
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
