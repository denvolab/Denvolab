// ---------------------------------------------------------------------------
// AI Agent & Custom CMS service page (/services/ai-agent-custom-cms).
// Figma: "Service Detail / 07" frame, node 701:15241.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const aiAgentCustomCms: ServiceDetailPage = {
  slug: "ai-agent-custom-cms",
  name: "AI Agent & Custom CMS",
  description: "Your first release does not need every feature. It needs a complete, useful journey that helps you learn whether the idea deserves the next investment. We help decide what to build, what to leave out and what to measure.",
  blocks: [
    {
      type: "hero",
      headline: "Less manual work.\nMore human control.",
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
        kind: "workflow",
        alt: "AI tools such as Claude, Gemini, Figma and Notion flowing into one Denvo Lab hub",
      },
    },
    {
      type: "capabilities",
      layout: "list-feature",
      title: "Your workflows.\nYour content. Your system.",
      items: [
        {
          icon: "research",
          title: "Workflow discovery",
          description: "Map contributors, approvals, handoffs, repetitive tasks, and exceptions.",
        },
        {
          icon: "layers",
          title: "Content modeling",
          description: "Create flexible structures that support channels, markets, and future needs.",
        },
        {
          icon: "code",
          title: "Admin experience",
          description: "Design clear dashboards, editors, queues, and operational feedback.",
        },
        {
          icon: "spark",
          title: "AI agent workflows",
          description: "Automate drafting, enrichment, classification, routing, and quality checks.",
        },
        {
          icon: "shield",
          title: "Roles & permissions",
          description: "Define safe access, review states, auditability, and governance.",
        },
        {
          icon: "globe",
          title: "API integrations",
          description: "Connect the CMS with products, data sources, and business tools.",
        },
      ],
      feature: {
        image: {
          src: "/images/service-detail/cms-workflow.webp",
          alt: "CMS dashboard with a review queue, on a tablet resting on a desk",
        },
        icon: "shield",
        title: "Automation with\na human checkpoint.",
        description: "Review queues, permissions and clear status keep every publishing decision accountable.",
      },
    },
    {
      type: "process-steps",
      variant: "sequence",
      title: "Clear steps.\nNo black-box automation.",
      numberTone: "tertiary",
      items: [
        {
          index: "01",
          title: "Map",
          body: "Understand content, roles, systems, bottlenecks, and governance requirements.",
        },
        {
          index: "02",
          title: "Architect",
          body: "Define models, permissions, integrations, and AI-assisted workflows.",
        },
        {
          index: "03",
          title: "Design",
          body: "Create the admin experience, states, controls, and reusable UI patterns.",
        },
        {
          index: "04",
          title: "Integrate",
          body: "Support build, test automation, document operations, and refine safely.",
        },
      ],
    },
    {
      type: "checklist",
      tone: "plain",
      eyebrow: "WHAT YOU TAKE FORWARD",
      title: "Ready for your\nreal operation.",
      rowAlign: "start",
      items: [
        {
          format: "ARCHITECTURE",
          deliverable: "Content models & relationships",
        },
        {
          format: "GOVERNANCE",
          deliverable: "Roles & permission matrix",
        },
        {
          format: "AUTOMATION",
          deliverable: "AI workflows & review controls",
        },
        {
          format: "DESIGN",
          deliverable: "Admin screens & UI system",
        },
        {
          format: "INTEGRATION",
          deliverable: "API & system integration specs",
        },
        {
          format: "OPERATIONS",
          deliverable: "Guides, logs & QA checklist",
        },
      ],
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHERE DOES TIME DISAPPEAR?",
          title: "Map the real operation",
          body: "We follow the current content or operational workflow, identify repeated actions and document the permissions and systems involved.",
        },
        {
          number: "02",
          question: "WHICH DECISIONS STAY WITH PEOPLE?",
          title: "Design the control points",
          body: "We define content models, roles, review stages and allowed agent actions. Error handling and escalation are designed with the happy path.",
        },
        {
          number: "03",
          question: "DOES THE SYSTEM WORK WITH REAL EXAMPLES?",
          title: "Connect and evaluate",
          body: "We implement the CMS and scoped integrations. AI steps are evaluated against representative inputs, including ambiguous and failure cases.",
        },
        {
          number: "04",
          question: "CAN SOMEONE OPERATE AND RECOVER IT?",
          title: "Put the team in control",
          body: "We provide operating guidance, review screens and an audit trail. Publishing, rollback and support responsibilities are agreed before release.",
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
      listGap: 24,
      openBorder: "primary",
      items: [
        {
          question: "Why choose a custom CMS?",
          answer: "A custom system makes sense when generic platforms cannot support your workflows, permissions, integrations, or scale cleanly.",
        },
        {
          question: "What can AI agents automate?",
          answer: "Common opportunities include drafting, tagging, enrichment, moderation, routing, summaries, validation, and repetitive updates.",
        },
        {
          question: "How do you keep automation safe?",
          answer: "We design permissions, review steps, confidence cues, logs, fallbacks, and human approval around high-impact actions.",
        },
        {
          question: "Can you integrate with our existing stack?",
          answer: "Yes. The experience and architecture are planned around the tools, APIs, data sources, and publishing channels you already use.",
        },
      ],
    },
    {
      type: "conversation",
      title: "Make your content operations work better.",
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
