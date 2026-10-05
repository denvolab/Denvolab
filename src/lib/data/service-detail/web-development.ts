// ---------------------------------------------------------------------------
// Web Design & Development service page (/services/web-development).
// Figma: "Service Detail / 05" frame, node 701:14854.
//
// GENERATED from the Figma file by script (layer text and settings copied
// as-is), then kept here as plain data. Edit the copy freely; the section
// components only read these fields. Alt text was written by hand.
// ---------------------------------------------------------------------------
import type { ServiceDetailPage } from "@/types/service-detail";

export const webDevelopment: ServiceDetailPage = {
  slug: "web-development",
  name: "Web Design & Development",
  description: "Your website should help the right people understand the offer, trust the business and take a useful next step. We bring the message, visual experience and build together so the site works beyond launch day.",
  blocks: [
    {
      type: "hero",
      headline: "A better first\nconversation.",
      headlineWidth: 1100,
      problemLabel: "THE PROBLEM. THE WORK. WHAT YOU TAKE FORWARD.",
      scrollLabel: "SCROLL TO EXPLORE ↓",
      cueAlign: "center",
      intro: "Your website should help the right people understand the offer, trust the business and take a useful next step. We bring the message, visual experience and build together so the site works beyond launch day.",
      introWidth: 699,
      cta: {
        label: "Talk about your project",
        href: "/contact",
      },
      visual: {
        kind: "image",
        src: "/images/services/web-design.png",
        alt: "A collage of website designs for different businesses",
        radius: 24,
        bordered: false,
      },
    },
    {
      type: "capabilities",
      layout: "indexed-grid",
      title: "Strategy to launch.\nOne cohesive web experience.",
      items: [
        {
          index: "01",
          icon: "strategy",
          title: "Web strategy",
          description: "Clarify audiences, goals, conversion paths, and the role of each page.",
        },
        {
          index: "02",
          icon: "layers",
          title: "Information architecture",
          description: "Organize content so visitors find answers quickly and naturally.",
        },
        {
          index: "03",
          icon: "type",
          title: "UX & content flow",
          description: "Shape page narratives, calls to action, and proof around user intent.",
        },
        {
          index: "04",
          icon: "globe",
          title: "Responsive UI design",
          description: "Create a distinctive system that works across desktop, tablet, and mobile.",
        },
        {
          index: "05",
          icon: "spark",
          title: "Interaction design",
          description: "Use motion and feedback to guide attention without slowing the experience.",
        },
        {
          index: "06",
          icon: "code",
          title: "Build-ready system",
          description: "Reusable sections, components, specifications, and implementation support.",
        },
      ],
    },
    {
      type: "showcase",
      image: {
        src: "/images/service-detail/web-showcase.webp",
        alt: "Workspace website shown on a laptop and a phone",
      },
      height: 850,
    },
    {
      type: "process-steps",
      variant: "sequence",
      eyebrow: "HOW WE WORK",
      title: "A clear process.\nRoom for the right questions.",
      numberTone: "primary",
      items: [
        {
          index: "01",
          title: "Discover",
          body: "Align on goals, audiences, competitors, content, and technical constraints.",
        },
        {
          index: "02",
          title: "Structure",
          body: "Create the sitemap, page strategy, wireframes, and conversion paths.",
        },
        {
          index: "03",
          title: "Design",
          body: "Build the visual system and responsive high-fidelity experience.",
        },
        {
          index: "04",
          title: "Deliver",
          body: "Support implementation, quality review, launch, and measured iteration.",
        },
      ],
    },
    {
      type: "checklist",
      tone: "brand",
      eyebrow: "WHAT YOU TAKE FORWARD",
      title: "Everything your\nteam needs next.",
      rowAlign: "start",
      items: [
        {
          format: "PLANNING",
          deliverable: "Sitemap & page strategy",
        },
        {
          format: "CONTENT",
          deliverable: "Messaging & content hierarchy",
        },
        {
          format: "DESIGN",
          deliverable: "Responsive page designs",
        },
        {
          format: "SYSTEM",
          deliverable: "Reusable website sections",
        },
        {
          format: "BUILD",
          deliverable: "Implementation-ready specs",
        },
        {
          format: "LAUNCH",
          deliverable: "Quality & launch checklist",
        },
      ],
    },
    {
      type: "process-narrative",
      title: "You should know\nwhat happens\nnext.",
      steps: [
        {
          number: "01",
          question: "WHAT DOES THE VISITOR NEED TO BELIEVE?",
          title: "Find the story",
          body: "We align the audience, offer and conversion paths. A content audit and sitemap expose missing proof and unnecessary pages.",
        },
        {
          number: "02",
          question: "WHAT EARNS THE NEXT SCROLL?",
          title: "Shape the experience",
          body: "Wireframes set the narrative. Art direction, responsive layouts and intentional motion create the visual system around the content.",
        },
        {
          number: "03",
          question: "CAN THE SITE SURVIVE THE NEXT UPDATE?",
          title: "Build for real content",
          body: "We develop reusable sections and structured content fields. Responsive behavior, image handling, accessibility and performance are considered in the build.",
        },
        {
          number: "04",
          question: "WHAT HAS ACTUALLY BEEN CHECKED?",
          title: "Launch with a checklist",
          body: "We review forms, links, breakpoints, metadata and agreed analytics events. Redirect planning and editor training are included when relevant.",
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
          question: "Can you redesign our current website?",
          answer: "Yes. We can preserve valuable content and brand equity while improving structure, clarity, visual impact, and conversion.",
        },
        {
          question: "Do you help with website content?",
          answer: "We shape content hierarchy, page flow, messaging direction, and UX writing so the design communicates clearly.",
        },
        {
          question: "Is responsive design included?",
          answer: "Yes. Core layouts and behaviors are designed for desktop, tablet, and mobile—not adapted as an afterthought.",
        },
        {
          question: "How is AI used in the process?",
          answer: "AI accelerates research, content exploration, and repetitive production; design direction and final quality remain human-led.",
        },
      ],
    },
    {
      type: "conversation",
      title: "Let’s build your next great first impression.",
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
