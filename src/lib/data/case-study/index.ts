// ---------------------------------------------------------------------------
// Case study pages: getters used by app/case-studies/[slug] and by the
// case studies grid. Same API-readiness idea as the other data files: swap
// these bodies for a fetch() once the admin panel manages this content.
// ---------------------------------------------------------------------------
import type { CaseStudy } from "@/types/case-study";
import type { PortfolioProject } from "@/types/homepage";
import { getPortfolioProjects } from "@/lib/data/homepage";
import { aiAssistant } from "./ai-assistant";
import { casanaAi } from "./casana-ai";
import { denvoHotel } from "./denvo-hotel";
import { denvoTravel } from "./denvo-travel";
import { jobSea } from "./job-sea";
import { locksmith } from "./locksmith";
import { metroHr } from "./metro-hr";
import { myCrew } from "./my-crew";
import { partPilot } from "./part-pilot";
import { proBudgetTracker } from "./pro-budget-tracker";
import { smartAquaFarm360 } from "./smart-aqua-farm-360";

const CASE_STUDIES: CaseStudy[] = [
  jobSea,
  aiAssistant,
  myCrew,
  denvoHotel,
  denvoTravel,
  partPilot,
  proBudgetTracker,
  locksmith,
  metroHr,
  casanaAi,
  smartAquaFarm360,
];

export async function getCaseStudySlugs(): Promise<string[]> {
  return CASE_STUDIES.map((study) => study.slug);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** URL of a case study page. */
export function caseStudyHref(slug: string): string {
  return `/case-studies/${slug}`;
}

// The seven case studies that are not on the homepage grid. The Case Studies
// page lists them after the homepage six, so every page can be reached from
// the site. Titles follow the grid's "Name - what it is" pattern, using each
// frame's own industry / intro wording; the description is the Figma intro.
const MORE_PROJECTS: PortfolioProject[] = [
  {
    title: "My Crew - Private Social Platform",
    description: myCrew.description,
    tags: ["UI/UX design", "Mobile app"],
    imageSrc: "/images/case-studies/my-crew/hero.webp",
    href: caseStudyHref(myCrew.slug),
  },
  {
    title: "Denvo Travel - Travel & Retreats",
    description: denvoTravel.description,
    tags: ["UI/UX design", "Responsive web"],
    imageSrc: "/images/case-studies/denvo-travel/home-desktop.webp",
    href: caseStudyHref(denvoTravel.slug),
  },
  {
    title: "Part Pilot - Automotive Commerce",
    description: partPilot.description,
    tags: ["UI/UX design", "Mobile product"],
    imageSrc: "/images/case-studies/part-pilot/home.webp",
    href: caseStudyHref(partPilot.slug),
  },
  {
    title: "Locksmith - Security Services",
    description: locksmith.description,
    tags: ["UI/UX design", "Web design"],
    imageSrc: "/images/case-studies/locksmith/home.webp",
    href: caseStudyHref(locksmith.slug),
  },
  {
    title: "Denvo HR - HR & Hospitality",
    description: metroHr.description,
    tags: ["UI/UX design", "Mobile SaaS"],
    imageSrc: "/images/case-studies/metro-hr/home.webp",
    href: caseStudyHref(metroHr.slug),
  },
  {
    title: "Casana AI - Property Technology",
    description: casanaAi.description,
    tags: ["UI/UX design", "AI web experience"],
    imageSrc: "/images/case-studies/casana-ai/home.webp",
    href: caseStudyHref(casanaAi.slug),
  },
  {
    title: "Smart Aqua Farm 360 - Aquaculture Operations",
    description: smartAquaFarm360.description,
    tags: ["UI/UX design", "Web dashboard"],
    imageSrc: "/images/case-studies/smart-aqua-farm-360/dashboard.webp",
    href: caseStudyHref(smartAquaFarm360.slug),
  },
];

/** Every project for the Case Studies page: the homepage six, then the rest. */
export async function getCaseStudyGridProjects(): Promise<PortfolioProject[]> {
  const featured = await getPortfolioProjects();
  return [...featured, ...MORE_PROJECTS];
}
