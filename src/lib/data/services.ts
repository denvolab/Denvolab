// Updated Services content and local assets from Figma Final design 437:8298.
// Industry photos: Healthcare, Software & Apps and AI Tools have theirs (industry-1/2/3.png); the other
// three cards stay on the empty placeholder until their photos are supplied (set `imageSrc` below).
import type {
  IndustriesServedContent,
  ServiceListItem,
  ServicesHeroContent,
  ServicesListContent,
} from "@/types/services";

const HERO: ServicesHeroContent = {
  lineOne: "Services",
  lineTwo: "Solutions",
  connector: "&",
};

const SERVICE_LIST_ITEMS: ServiceListItem[] = [
  {
    "number": "01",
    "title": "Brand Identity",
    "description": "Give your business a look people recognise. We craft your logo, colours, type, and the guidance that keeps everything consistent.",
    "bullets": [
      "Logo Craft",
      "Brand Colours",
      "Typography",
      "Brand Guidelines",
      "Brand Graphics",
      "Motion Graphics",
      "Brand Naming",
      "Brand Direction"
    ],
    "imageSrc": "/images/services/final/service-1.png",
    "href": "/services/branding-visual-identity"
  },
  {
    "number": "02",
    "title": "UI/UX Design",
    "description": "Make the next step clear. We learn what people need, map their journey, and craft screens they can use with less effort.",
    "bullets": [
      "User Research",
      "User Journeys",
      "Wireframes",
      "UI Craft",
      "Clickable Prototypes",
      "Usability Testing",
      "UX Reviews"
    ],
    "imageSrc": "/images/services/final/service-2.png",
    "href": "/services/ui-ux-design"
  },
  {
    "number": "03",
    "title": "Mobile Apps",
    "description": "Craft an app that fits into someone’s day. We help you plan, build, and test the tasks people will use it for.",
    "bullets": [
      "App Planning",
      "User Journeys",
      "Screen Craft",
      "Clickable Prototypes",
      "iOS & Android Development",
      "API Connections",
      "App Testing"
    ],
    "imageSrc": "/images/services/final/service-3.png",
    "href": "/services/mobile-app-development"
  },
  {
    "number": "04",
    "title": "SaaS Products",
    "description": "Make a busy product easier to use. We craft clear dashboards, useful tools, and a simple start for new users.",
    "bullets": [
      "Product Planning",
      "Dashboard Craft",
      "New User Setup",
      "User Research",
      "Product Development",
      "AI Features",
      "Reusable UI Components"
    ],
    "imageSrc": "/images/services/final/service-4.png",
    "href": "/services/saas-development"
  },
  {
    "number": "05",
    "title": "Websites",
    "description": "Help visitors understand what you offer and where to go next. We craft and build websites that feel clear on every screen.",
    "bullets": [
      "Website Planning",
      "Website Craft",
      "Business Websites",
      "Online Stores",
      "Web Apps",
      "Website Updates",
      "Responsive Development",
      "Website Testing"
    ],
    "imageSrc": "/images/services/final/service-5.png",
    "href": "/services/web-development"
  },
  {
    "number": "06",
    "title": "MVP Development",
    "description": "Start with the part people need most. We help you build a first version, gather feedback, and decide what to add next.",
    "bullets": [
      "Idea Review",
      "Feature Planning",
      "Clickable Prototypes",
      "First Product Build",
      "Web & Mobile MVPs",
      "User Testing",
      "Demo Builds",
      "Launch Support"
    ],
    "imageSrc": "/images/services/final/service-6.png",
    "href": "/services/mvp-development"
  },
  {
    "number": "07",
    "title": "Custom CMS & Automation",
    "description": "Give your team an easier way to manage content. We build editing tools, access controls, and automation around the tasks they handle every day.",
    "bullets": [
      "Content Editing Tools",
      "Admin Dashboards",
      "Team Access",
      "API Connections",
      "Content Automation",
      "AI Integration",
      "Custom CMS Development",
      "Workflow Automation"
    ],
    "imageSrc": "/images/services/final/service-7.png",
    "href": "/services/ai-agent-custom-cms"
  }
];

// The Figma source's own subtext under "Different fields. Everyday needs." reads: "A
// snapshot of the sectors we design and build for, adapted from a reference
// site for layout only — swap in DenvoLab's real industries and case studies
// before this ships." That second clause is a build note left in the design
// file for whoever implements it, not copy meant for visitors, so it isn't
// reproduced verbatim below (only the genuinely-usable first clause is kept)
// — see industries-served/README.md and claude/services-page.md for the
// full explanation. The six industry cards below ARE reproduced verbatim
// from Figma (real, specific, well-written copy, unlike that dev note) but
// carry the same "reference site, layout only" caveat, so they're NOT
// confirmed as Denvo Lab's actual served industries or case studies.
const INDUSTRIES_SERVED: IndustriesServedContent = {
  heading: "Different fields. Everyday needs.",
  description: "Each business has its own customers and challenges. We shape the experience around what those people need to do.",
  cta: { label: "EXPLORE CASE STUDIES", href: "/case-studies" },
  items: [
    {
      name: "Hotels & Travel",
      description:
        "Help guests explore, book, and plan their stay.",
      imageSrc: null,
    },
    {
      name: "Healthcare",
      description:
        "Help people find care and take the next step with confidence.",
      imageSrc: "/images/services/current/industry-1.png",
    },
    {
      name: "Money & Finance",
      description:
        "Make spending, payments, and financial information easier to follow.",
      imageSrc: null,
    },
    {
      name: "Software & Apps",
      description:
        "Help people learn a product and use its tools with less confusion.",
      imageSrc: "/images/services/current/industry-2.png",
    },
    {
      name: "Online Stores",
      description: "Make it easier to find a product, choose it, and check out.",
      imageSrc: null,
    },
    {
      name: "AI Tools",
      description:
        "Give people clear ways to use AI, review its results, and stay in control.",
      imageSrc: "/images/services/current/industry-3.png",
    },
  ],
};

export async function getServicesHero(): Promise<ServicesHeroContent> {
  return HERO;
}

export async function getServicesList(): Promise<ServicesListContent> {
  return { items: SERVICE_LIST_ITEMS };
}

export async function getIndustriesServed(): Promise<IndustriesServedContent> {
  return INDUSTRIES_SERVED;
}
