// ---------------------------------------------------------------------------
// Homepage section content, mirrored from the Figma source. Same API-readiness
// note as lib/data/navigation and lib/data/footer: swap each function body for
// a `fetch()` once the admin panel can manage this content — the section
// components never change.
// ---------------------------------------------------------------------------
import type {
  AiOrbitContent,
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
  services: ["UI/UX Design", "Mobile App", "SaaS App", "Full Stack", "Branding"],
};

export async function getHeroContent(): Promise<HeroContent> {
  return HERO_CONTENT;
}

// TODO(assets): Figma's own icon for this strip (node 231:5215, "icon_vector")
// couldn't be exported into this codebase — see marquee-tagline/README.md for
// why. `iconSrc: null` renders the documented placeholder until a real SVG is
// dropped at public/icons/marquee-spark.svg and wired in here.
const MARQUEE_ITEMS: MarqueeItem[] = [
  { phrase: "WE DON'T DESIGN", iconSrc: null },
  { phrase: "WE DO CRAFT", iconSrc: null },
  { phrase: "CRAFT IS NOT AN ART", iconSrc: null },
  { phrase: "WE CRAFT BUSINESS", iconSrc: null },
  { phrase: "WE BUILD BUSINESS", iconSrc: null },
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

// TODO(assets): none of the 6 project screenshots (Figma nodes 230:4068,
// 230:4081, 230:4094, 230:4107, 230:4120, 230:4133) could be exported into
// this codebase — see portfolio-grid/README.md. `imageSrc: null` renders the
// documented placeholder for each card until real screenshots are dropped at
// public/images/portfolio/<slug>.png and wired in here.
const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Quotable - No Longer Miss Quote",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: null,
    href: "/work/quotable",
  },
  {
    title: "Denvo Hotel - Manage Your Booking",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: null,
    href: "/work/denvo-hotel",
  },
  {
    title: "Budget Pro Tracker - Manager Your Daily Expanse",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: null,
    href: "/work/budget-pro-tracker",
  },
  {
    title: "HR Management - One Stop HR Solutions",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: null,
    href: "/work/hr-management",
  },
  {
    title: "Sanime - A Telemedicine Solution",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: null,
    href: "/work/sanime",
  },
  {
    title: "JobSea - Find Your Nearest Job",
    description: PLACEHOLDER_DESCRIPTION,
    tags: PLACEHOLDER_TAGS,
    imageSrc: null,
    href: "/work/jobsea",
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

// TODO(assets): none of these 6 images (Figma nodes 237:5232, 238:5338,
// 238:5330, 238:5346, 238:5322, 238:5354) could be exported into this
// codebase — see what-we-create/README.md. `imageSrc: null` renders the
// documented placeholder until real images are dropped at
// public/images/what-we-create/<slug>.png and wired in here.
const WHAT_WE_CREATE_ITEMS: WhatWeCreateItem[] = [
  {
    title: "AI-Enhanced UI/UX Design",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/ui-ux-design" },
    imageSrc: null,
  },
  {
    title: "AI Driven Mobile App Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/mobile-app" },
    imageSrc: null,
  },
  {
    title: "AI Integrated SaaS Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/saas-design" },
    imageSrc: null,
  },
  {
    title: "AI Agent Custom CMS Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/cms-design" },
    imageSrc: null,
  },
  {
    title: "AI Powered Web Design & Development",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/web-design" },
    imageSrc: null,
  },
  {
    title: "Branding Design & Brand Guideline",
    description: WHAT_WE_CREATE_DESCRIPTION,
    cta: { label: "SEE MORE", href: "/services/branding-design" },
    imageSrc: null,
  },
];

export async function getWhatWeCreateItems(): Promise<WhatWeCreateItem[]> {
  return WHAT_WE_CREATE_ITEMS;
}

const AI_ORBIT_CONTENT: AiOrbitContent = {
  heading: "Smarter Design,\nSupercharged by AI",
};

export async function getAiOrbitContent(): Promise<AiOrbitContent> {
  return AI_ORBIT_CONTENT;
}

// The Figma source alternates two literal logo images ("Visa" and a generic
// "it-sks" mark) 11 times each per row — neither is a real Denvo Lab client,
// so reproducing them verbatim would misrepresent an actual, unaffiliated
// company (Visa) as a partner. This ships generic placeholder slots instead,
// at the same two alternating widths, until the real client roster and logo
// assets are supplied — see partner-logos/README.md.
const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Client One", logoSrc: null, size: "wide" },
  { name: "Client Two", logoSrc: null, size: "narrow" },
  { name: "Client Three", logoSrc: null, size: "wide" },
  { name: "Client Four", logoSrc: null, size: "narrow" },
  { name: "Client Five", logoSrc: null, size: "wide" },
  { name: "Client Six", logoSrc: null, size: "narrow" },
  { name: "Client Seven", logoSrc: null, size: "wide" },
  { name: "Client Eight", logoSrc: null, size: "narrow" },
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
  eyebrow: "Services We Offer",
  heading: "Clients Words About Denvo",
};

export async function getTestimonialsContent(): Promise<TestimonialsContent> {
  return TESTIMONIALS_CONTENT;
}

// All 14 testimonial cards in the Figma source share the exact same name,
// role, star rating, and quote — reproduced faithfully rather than invented,
// same reasoning as PORTFOLIO_PROJECTS/WHAT_WE_CREATE_DESCRIPTION above (this
// is clearly placeholder copy the designer never swapped per reviewer). One
// entry is kept here; testimonials/testimonial-row.tsx repeats it to fill
// each marquee row, exactly like PARTNER_LOGOS feeding partner-logo-row.tsx.
const TESTIMONIAL: Testimonial = {
  name: "Bruno Malkes",
  role: "Denvolab",
  rating: 5,
  quote:
    "Integer placerat pellentesque leo mi faucibus. Elementum quam mauris vitae orci porta. Congue eleifend amet risus commodo. Urna ipsum porta enim cursus pellentesque faucibus. Integer placerat pellentesque leo mi faucibus. Elementum quam mauris vitae orci porta. Congue eleifend amet risus commodo. Urna ipsum porta enim cursus pellentesque faucibus.",
};

export async function getTestimonials(): Promise<Testimonial[]> {
  return [TESTIMONIAL];
}

const CONTACT_CTA_CONTENT: ContactCtaContent = {
  heading: "Let's Contact",
  // Same placeholder paragraph the Figma source reuses for Week 4-6 of
  // process-steps — reproduced faithfully, see PROCESS_STEPS above.
  description:
    "In the final phase, we validate the design through user testing, A/B tests, and feedback. These strategies help us refine the prototype to optimize usability and ensure a smooth & engaging user experience.",
  cta: { label: "SAY HELLO", href: "/contact" },
};

export async function getContactCtaContent(): Promise<ContactCtaContent> {
  return CONTACT_CTA_CONTENT;
}
