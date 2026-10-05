// ---------------------------------------------------------------------------
// SaaS Design & Development service page (/services/saas-development).
// Figma: "Service Detail / 04" frame, node 701:14658.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const saasDevelopment: ServiceDetailPage = {
  slug: "saas-development",
  name: "SaaS Design & Development",
  description: "More roles, more data and more features should not mean more effort for your users. We connect product design and engineering around the workflows that make your software worth returning to.",
  blocks: [
    {
      type: "hero",
      headline: "Powerful software.\nSimple to use.",
      headlineWidth: 1320,
      problemLabel: "THE PROBLEM. THE WORK. WHAT YOU TAKE FORWARD.",
      scrollLabel: "SCROLL TO EXPLORE ↓",
      cueAlign: "center",
      intro: "More roles, more data and more features should not mean more effort for your users. We connect product design and engineering around the workflows that make your software worth returning to.",
      introWidth: 699,
      cta: {
        label: "Talk about your project",
        href: "/contact",
      },
      visual: {
        kind: "image",
        src: "/images/service-detail/saas-hero.webp",
        alt: "Three tablets showing SaaS dashboards in a meadow",
        radius: 24,
        bordered: true,
      },
    },
    {
      type: "capabilities",
      layout: "card-grid",
      title: "Complex software,\ncarefully simplified.",
      stretch: true,
      rowGap: 64,
      items: [
        {
          icon: "strategy",
          title: "Product strategy",
          description: "Align business model, user roles, jobs-to-be-done, and roadmap priorities.",
        },
        {
          icon: "flow",
          title: "SaaS onboarding",
          description: "Guide new users to value with progressive, role-aware experiences.",
        },
        {
          icon: "chart",
          title: "Dashboards & data",
          description: "Turn complex information into clear views and meaningful actions.",
        },
        {
          icon: "spark",
          title: "AI feature UX",
          description: "Design transparent, controllable AI experiences users can trust.",
        },
        {
          icon: "layers",
          title: "Design system",
          description: "Reusable patterns for dense workflows, tables, forms, and states.",
        },
        {
          icon: "code",
          title: "Developer collaboration",
          description: "Practical specs, responsive behavior, and ongoing design QA.",
        },
      ],
    },
    {
      type: "craft-split",
      title: "Every role. Every state.\nOne coherent experience.",
      description: "Tables, dashboards, permission states and AI feedback are treated as one connected product—not isolated screens.",
      image: {
        src: "/images/service-detail/saas-craft.webp",
        alt: "SaaS analytics dashboard on a tablet standing in a meadow",
      },
    },
    {
      type: "process-steps",
      variant: "sequence",
      title: "A clear process.\nRoom for the right questions.",
      numberTone: "primary",
      items: [
        {
          index: "01",
          title: "Model",
          body: "Understand roles, workflows, data, permissions, and product constraints.",
        },
        {
          index: "02",
          title: "Prioritize",
          body: "Define the critical paths and simplify the information architecture.",
        },
        {
          index: "03",
          title: "Systemize",
          body: "Design reusable patterns for core features and future expansion.",
        },
        {
          index: "04",
          title: "Ship",
          body: "Prototype, validate, support implementation, and refine with feedback.",
        },
      ],
    },
    {
      type: "checklist",
      tone: "plain",
      title: "Everything your\nteam needs next.",
      rowAlign: "center",
      items: [
        {
          format: "STRATEGY",
          deliverable: "Product roadmap & role mapping",
        },
        {
          format: "ARCHITECTURE",
          deliverable: "Workflow & permission models",
        },
        {
          format: "PROTOTYPE",
          deliverable: "Validated core-flow prototype",
        },
        {
          format: "DESIGN",
          deliverable: "Dashboards, tables & data states",
        },
        {
          format: "SYSTEM",
          deliverable: "Scalable component library",
        },
        {
          format: "HANDOFF",
          deliverable: "Interaction specs & design QA",
        },
      ],
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHO NEEDS TO DO WHAT?",
          title: "Map the product logic",
          body: "We document roles, entities, permissions and critical workflows. Product priorities and technical constraints become one shared scope.",
        },
        {
          number: "02",
          question: "WHAT SHOULD EACH VIEW HELP SOMEONE DECIDE?",
          title: "Design for real data",
          body: "We explore realistic data density, empty workspaces, bulk actions and exception handling. Flows connect onboarding to recurring tasks.",
        },
        {
          number: "03",
          question: "CAN NEW FEATURES USE THE SAME FOUNDATIONS?",
          title: "Build a connected system",
          body: "Reusable UI, data contracts and application structure are developed together. Integrations and AI features are scoped around useful tasks.",
        },
        {
          number: "04",
          question: "IS THE EXPERIENCE RELIABLE BEYOND THE DEMO?",
          title: "Validate the release",
          body: "We review access boundaries, key workflows and implementation quality. Measurement events and operating documentation prepare the next iteration.",
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
          question: "Can you handle complex enterprise workflows?",
          answer: "Yes. We map roles, permissions, dependencies, exceptions, and data states before simplifying the interface.",
        },
        {
          question: "How do you design trustworthy AI features?",
          answer: "We make inputs, outputs, confidence, controls, and fallback behavior understandable so users stay in charge.",
        },
        {
          question: "Can you improve an existing SaaS product?",
          answer: "Yes. We can audit onboarding, dashboards, navigation, feature discoverability, and system consistency.",
        },
        {
          question: "Will the design be implementation-ready?",
          answer: "Yes. We document responsive behavior, interaction states, components, edge cases, and handoff details.",
        },
      ],
    },
    {
      type: "conversation",
      title: "Bring clarity to your next stage of growth.",
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
