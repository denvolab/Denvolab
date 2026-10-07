// ---------------------------------------------------------------------------
// Homepage section content, mirrored from the Figma source. Same API-readiness
// note as lib/data/navigation and lib/data/footer: swap each function body for
// a `fetch()` once the admin panel can manage this content — the section
// components never change.
// ---------------------------------------------------------------------------
import type {
  AiOrbitContent,
  ComparisonContent,
  ComparisonRow,
  ContactCtaContent,
  HeroContent,
  MarqueeItem,
  PartnerLogo,
  PortfolioProject,
  ProcessContent,
  ProcessStep,
  Testimonial,
  TestimonialsContent,
  WhatWeCreateContent,
  WhatWeCreateItem,
} from "@/types/homepage";

const HERO_CONTENT: HeroContent = {
  wordmark: "DENVOLAB",
  headline: "We Build AI-Powered Digital Experiences That Scale Businesses",
  cta: { label: "SAY HELLO", href: "/contact" },
  // Each name links to the service detail page it stands for (Oct 2026).
  // "Full Stack" has no page of its own; Web Design & Development is the
  // closest (design + front end + back end).
  services: [
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Mobile App", href: "/services/mobile-app-development" },
    { label: "SaaS App", href: "/services/saas-development" },
    { label: "Full Stack", href: "/services/web-development" },
    { label: "Branding", href: "/services/branding-visual-identity" },
  ],
};

export async function getHeroContent(): Promise<HeroContent> {
  return HERO_CONTENT;
}

// The spark icon between phrases is public/icons/marquee-spark.svg (Figma node
// 431:6142). Figma repeats the same icon after every phrase.
const MARQUEE_SPARK = "/icons/marquee-spark.svg";
const MARQUEE_ITEMS: MarqueeItem[] = [
  { phrase: "WE DON'T DESIGN", iconSrc: MARQUEE_SPARK },
  { phrase: "WE DO CRAFT", iconSrc: MARQUEE_SPARK },
  { phrase: "CRAFT IS NOT AN ART", iconSrc: MARQUEE_SPARK },
  { phrase: "WE CRAFT BUSINESS", iconSrc: MARQUEE_SPARK },
  { phrase: "WE BUILD BUSINESS", iconSrc: MARQUEE_SPARK },
];

export async function getMarqueeItems(): Promise<MarqueeItem[]> {
  return MARQUEE_ITEMS;
}

// The description below is identical across all 6 cards in the Figma source
// itself (it's placeholder/lorem copy the designer never swapped out per
// project) — reproduced faithfully rather than invented, per real per-project
// write-ups being a content task for whoever owns that copy, not a layout
// one. Same for the tag set — every card carries the same 3 tags in Figma.
const PLACEHOLDER_DESCRIPTION =
  "Modern and minimal design solutions for job referrals and application tracking.";
const PLACEHOLDER_TAGS = ["SaaS App", "Web App", "Full Stack"];

// The files in public/images/portfolio/ are the real project screenshots
// exported from Figma (nodes 230:4068, 230:4081, 230:4094, 716:6235, 230:4120,
// 230:4133). hr-management.png is no longer used (that card became
// Automation Manager) and is kept only in case the project comes back.
//
// `href` points at the project's case study page; null means it has none yet
// and the card shows "Coming soon" on hover (Quotable, Sanime). To swap one, save a new file over the same name (keep the .png
// extension, or change it here). See portfolio-grid/README.md.
// Set `imageSrc: null` on a project to show the bordered "coming soon" box instead.
const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Quotable - No Longer Miss Quote",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: "/images/portfolio/quotable.png",
    href: null,
  },
  {
    title: "Denvo Hotel - Manage Your Booking",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: "/images/portfolio/denvo-hotel.png",
    href: "/case-studies/denvo-hotel",
  },
  {
    title: "Budget Pro Tracker - Manager Your Daily Expanse",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: "/images/portfolio/budget-pro-tracker.png",
    href: "/case-studies/pro-budget-tracker",
  },
  {
    // Figma (node 230:4106) replaced "HR Management" with this project in
    // Oct 2026; its case study is the "AI Assistent" frame.
    title: "Automation Manager - Manage everything Automatically",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: "/images/portfolio/automation-manager.png",
    href: "/case-studies/ai-assistant",
  },
  {
    title: "Sanime - A Telemedicine Solution",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: "/images/portfolio/sanime.png",
    href: null,
  },
  {
    title: "JobSea - Find Your Nearest Job",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: "/images/portfolio/jobsea.png",
    href: "/case-studies/job-sea",
  },
];

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return PORTFOLIO_PROJECTS;
}

const WHAT_WE_CREATE_CONTENT: WhatWeCreateContent = {
  eyebrow: "What We Create",
  heading: "We combine AI, design, and technology to build what's next.",
};

export async function getWhatWeCreateContent(): Promise<WhatWeCreateContent> {
  return WHAT_WE_CREATE_CONTENT;
}

// Same note as PORTFOLIO_PROJECTS: this description is identical across all
// 6 cards in the Figma source itself — reproduced faithfully.
const WHAT_WE_CREATE_DESCRIPTION =
  "UI/UX Design, App Design, Website Design, Dashboard Design, Wireframing & Prototyping, Interaction Design, and Product Design.";

// Each "SEE MORE" opens that service's detail page (/services/<slug>, the
// slugs in lib/data/service-detail). Fixed Oct 2026: four of these used to
// point at slugs that never existed (e.g. /services/mobile-app) and 404'd.
//
// The 6 background images are real (photos/mockups the user supplied, not
// Figma exports — Figma's own image fills for these cards still couldn't be
// downloaded, see what-we-create/README.md). Matched by content to each
// card's topic, not by Figma's own node order.
const WHAT_WE_CREATE_ITEMS: WhatWeCreateItem[] = [
  {
    title: "AI-Enhanced UI/UX Design",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/ui-ux-design" },
    imageSrc: "/images/what-we-create/ui-ux-design.png",
  },
  {
    title: "AI Driven Mobile App Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/mobile-app-development" },
    imageSrc: "/images/what-we-create/mobile-app.png",
  },
  {
    title: "AI Integrated SaaS Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/saas-development" },
    imageSrc: "/images/what-we-create/saas-design.png",
  },
  {
    title: "AI Agent Custom CMS Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/ai-agent-custom-cms" },
    imageSrc: "/images/what-we-create/cms-design.png",
  },
  {
    title: "AI Powered Web Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/web-development" },
    imageSrc: "/images/what-we-create/web-design.png",
  },
  {
    title: "Branding Design & Brand Guideline",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/branding-visual-identity" },
    imageSrc: "/images/what-we-create/branding-design.png",
  },
];

export async function getWhatWeCreateItems(): Promise<WhatWeCreateItem[]> {
  return WHAT_WE_CREATE_ITEMS;
}

const AI_ORBIT_CONTENT: AiOrbitContent = {
  // Copied verbatim from Figma node 572:1572's header (572:1574 / 572:1575).
  eyebrow: "FULL AI WORKFLOW — LIVE DATA FLOW CONCEPT",
  heading: "Smarter Design,\nSupercharged by AI",
};

export async function getAiOrbitContent(): Promise<AiOrbitContent> {
  return AI_ORBIT_CONTENT;
}

// Original case study vector marks, exported in gray for the dark AI section.
const PARTNER_LOGOS: PartnerLogo[] = [
  {
    "name": "Denvo Hotel",
    "logoSrc": "/images/partners/denvo-hotel.svg",
    "size": "wide"
  },
  {
    "name": "Pro Budget Tracker",
    "logoSrc": "/images/partners/pro-budget-tracker.svg",
    "size": "wide"
  },
  {
    "name": "Part Pilot",
    "logoSrc": "/images/partners/part-pilot.svg",
    "size": "wide"
  },
  {
    "name": "Casana AI",
    "logoSrc": "/images/partners/casana-ai.svg",
    "size": "wide"
  },
  {
    "name": "My Crew",
    "logoSrc": "/images/partners/my-crew.svg",
    "size": "wide"
  },
  {
    "name": "Job Sea",
    "logoSrc": "/images/partners/job-sea.svg",
    "size": "wide"
  },
  {
    "name": "Locksmith",
    "logoSrc": "/images/partners/locksmith.svg",
    "size": "wide"
  },
  {
    "name": "Denvo Travel",
    "logoSrc": "/images/partners/denvo-travel.svg",
    "size": "wide"
  },
  {
    "name": "Denvo AI",
    "logoSrc": "/images/partners/ai-assistant.svg",
    "size": "wide"
  },
  {
    "name": "Smart Aqua Farm 360",
    "logoSrc": "/images/partners/smart-aqua-farm-360.svg",
    "size": "wide"
  },
  {
    "name": "Denvo HR",
    "logoSrc": "/images/partners/denvo-hr.svg",
    "size": "wide"
  }
];

export async function getPartnerLogos(): Promise<PartnerLogo[]> {
  return PARTNER_LOGOS;
}

const PROCESS_CONTENT: ProcessContent = {
  eyebrow: "Services We Offer",
  heading: "We Make the Complex\nSimple in 60 Days",
};

export async function getProcessContent(): Promise<ProcessContent> {
  return PROCESS_CONTENT;
}

// TODO(assets): each week's icon (Figma nodes 230:4264, 230:4287, 230:4318 +
// group, 230:4348 + group, 230:4388, 230:4414 + group) is either a single
// unexportable SVG or a multi-layer masked icon graphic — see
// process-steps/README.md. Icons aren't modeled per-step below (no imageSrc
// field); the component renders a plain placeholder in that slot for every
// step until real icons are exported.
const PROCESS_STEPS: ProcessStep[] = [
  {
    week: "Week 1",
    title: "Research",
    description:
      "Ahead of the website kick off we'll immerse ourselves in your brief, company, and scope of work. We'll carry out competitor and industry analysis, a brand audit and start formulating a first draft of a sitemap.",
    tasks: ["Research", "Competitor Analysis", "Industry Analysis", "Sitemap Creation", "Formulate Team"],
  },
  {
    week: "Week 2",
    title: "Ideation & Strategy",
    description:
      "We gather insights through interviews, competitor research, and journey mapping, then brainstorm and create wireframes while defining project challenges and user satisfaction benchmarks to guide the design process.",
    tasks: ["User Interviews", "Competitor Analysis", "Journey Mapping", "Challenges & Goals", "Sketching & Wireframes"],
  },
  {
    week: "Week 3",
    title: "Style Guide & UI Design",
    description:
      "We define the brand's visual identity with a style guide covering typography and color palette. At the same time, we plan for initial UI designs to ensure a consistent, modern, and user-friendly experience.",
    tasks: ["Typography Selection", "Color Palette Creation", "Icon Set Design", "UI Planning"],
  },
  {
    week: "Week 4",
    title: "Front-End Development",
    description:
      "In the final phase, we validate the design through user testing, A/B tests, and feedback. These strategies help us refine the prototype to optimize usability and ensure a smooth & engaging user experience.",
    tasks: ["A/B Testing", "Reviews & Feedback", "Final Refinement", "Quality Assurance"],
  },
  {
    week: "Week 5",
    title: "API Build and Implementation",
    description:
      "In the final phase, we validate the design through user testing, A/B tests, and feedback. These strategies help us refine the prototype to optimize usability and ensure a smooth & engaging user experience.",
    tasks: ["A/B Testing", "Reviews & Feedback", "Final Refinement", "Quality Assurance"],
  },
  {
    week: "Week 6",
    title: "Final Testing & Refinements",
    description:
      "In the final phase, we validate the design through user testing, A/B tests, and feedback. These strategies help us refine the prototype to optimize usability and ensure a smooth & engaging user experience.",
    tasks: ["A/B Testing", "Reviews & Feedback", "Final Refinement", "Quality Assurance"],
  },
];

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return PROCESS_STEPS;
}

const TESTIMONIALS_CONTENT: TestimonialsContent = {
  eyebrow: "Client Feedback",
  heading: "What Our Clients Say",
};

export async function getTestimonialsContent(): Promise<TestimonialsContent> {
  return TESTIMONIALS_CONTENT;
}

// Temporary demo profiles requested by the owner. Each card is visibly labelled.
// Replace names, photos and quotes with verified client feedback before publication.
const TESTIMONIALS: Testimonial[] = [
  {
    "name": "Maya Rahman",
    "role": "Product Founder",
    "quote": "The design process made a complex product feel clear and approachable. The dashboard, mobile screens and key user flows now feel like one consistent experience.",
    "imageSrc": "/images/testimonials/demo-maya.png",
    "isSample": true
  },
  {
    "name": "Daniel Brooks",
    "role": "Operations Lead",
    "quote": "The team translated our workflows into an interface that is easy to follow. Thoughtful layouts and a clear visual hierarchy made the final handoff much easier for our development team.",
    "imageSrc": "/images/testimonials/demo-daniel.png",
    "isSample": true
  },
  {
    "name": "Sophie Bennett",
    "role": "Brand Founder",
    "quote": "The website and brand system feel cohesive across desktop, tablet and mobile. The attention to typography, spacing and presentation gave the project the polished direction we were looking for.",
    "imageSrc": "/images/testimonials/demo-sophie.png",
    "isSample": true
  },
  {
    "name": "Ethan Park",
    "role": "SaaS Product Lead",
    "quote": "The onboarding flow now feels straightforward, with clear decisions at each step. The design gives our product a consistent visual language from the first screen to the dashboard.",
    "imageSrc": "/images/testimonials/demo-ethan.png",
    "isSample": true
  },
  {
    "name": "Amina Hassan",
    "role": "E-commerce Founder",
    "quote": "The new storefront balances a strong brand presence with a simple shopping experience. Product pages, navigation and checkout feel connected across every screen size.",
    "imageSrc": "/images/testimonials/demo-amina.png",
    "isSample": true
  },
  {
    "name": "Lucas Rivera",
    "role": "Service Business Owner",
    "quote": "The website makes our services easier to understand and puts the next action in the right place. The mobile layouts received the same attention as the desktop experience.",
    "imageSrc": "/images/testimonials/demo-lucas.png",
    "isSample": true
  },
  {
    "name": "Elena Rossi",
    "role": "Hospitality Marketing Lead",
    "quote": "The booking journey brings the property experience into the website. Room discovery, details and availability are presented clearly without losing the warmth of the brand.",
    "imageSrc": "/images/testimonials/demo-elena.png",
    "isSample": true
  },
  {
    "name": "Noah Williams",
    "role": "HR Platform Founder",
    "quote": "The dashboard brings the important information together in a clean, focused way. The team gave structure to complex workflows while keeping the interface approachable.",
    "imageSrc": "/images/testimonials/demo-noah.png",
    "isSample": true
  },
  {
    "name": "Priya Shah",
    "role": "Fintech Product Manager",
    "quote": "The information hierarchy makes financial data easier to scan and compare. Charts, tables and everyday actions share a consistent design system that feels considered.",
    "imageSrc": "/images/testimonials/demo-priya.png",
    "isSample": true
  },
  {
    "name": "Oliver Reed",
    "role": "Technology Founder",
    "quote": "The design handoff was organised around reusable components and clear interaction states. It gave us a practical foundation for building the product with confidence.",
    "imageSrc": "/images/testimonials/demo-oliver.png",
    "isSample": true
  },
  {
    "name": "Grace Lin",
    "role": "Mobile Product Lead",
    "quote": "The mobile screens feel cohesive rather than a collection of separate pages. Navigation, spacing and key actions are consistent throughout the experience.",
    "imageSrc": "/images/testimonials/demo-grace.png",
    "isSample": true
  },
  {
    "name": "Marcus Cole",
    "role": "Marketplace Founder",
    "quote": "The marketplace experience connects discovery and decision-making in a clear sequence. The final screens keep the content accessible while giving the brand its own personality.",
    "imageSrc": "/images/testimonials/demo-marcus.png",
    "isSample": true
  }
];

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

// Comparison table — not part of the original Figma source (see
// comparison/README.md for why); content sourced from the reference layout
// the user provided, rebranded from that reference's own name to Denvo Lab.
const COMPARISON_CONTENT: ComparisonContent = {
  heading: "What Do You Get\nBy Choosing Denvo Lab?",
  denvoLabLabel: "Denvo Lab",
  othersLabel: "Other Design Agencies",
  cta: { label: "Book an Intro Call", href: "/contact" },
};

export async function getComparisonContent(): Promise<ComparisonContent> {
  return COMPARISON_CONTENT;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "The best design talent", denvoLab: true, others: true },
  { feature: "Designers with expertise in design for SaaS", denvoLab: true, others: false },
  { feature: "Team scaling on demand", denvoLab: true, others: false },
  { feature: "Dedicated account manager", denvoLab: true, others: false },
  { feature: "It takes days from project request to start", denvoLab: true, others: true },
  { feature: "3-day FREE trial", denvoLab: true, others: true },
];

export async function getComparisonRows(): Promise<ComparisonRow[]> {
  return COMPARISON_ROWS;
}

const CONTACT_CTA_CONTENT: ContactCtaContent = {
  heading: "Let’s Craft Together",
  // Same placeholder paragraph the Figma source reuses for Week 4-6 of
  // process-steps — reproduced faithfully, see PROCESS_STEPS above.
  description:
    "In the final phase, we validate the design through user testing, A/B tests, and feedback. These strategies help us refine the prototype to optimize usability and ensure a smooth & engaging user experience.",
  cta: { label: "SAY HELLO", href: "/contact" },
};

export async function getContactCtaContent(): Promise<ContactCtaContent> {
  return CONTACT_CTA_CONTENT;
}
