// Locksmith (Figma frame 727:3817). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const locksmith = buildTemplateCaseStudy({
  slug: "locksmith",
  name: "Locksmith",
  tags: ["UI/UX design", "Web design"],
  title: "Locksmith",
  industry: "Security services",
  intro:
    "A service website that presents locksmith expertise, service details and completed projects, with a visible emergency request path and a dedicated contact experience.",
  challenge:
    "Visitors seeking locksmith help may need urgent assistance or time to assess a service provider. The site has to support both situations: make the contact action visible while keeping service information, project work and navigation easy to understand.",
  solution: {
    body: "The Locksmith website combines an emergency request action with structured service and project pages. Strong imagery and a consistent navigation system support both quick contact and deeper exploration of the provider's work.",
    cards: [
      {
        title: "Urgent contact",
        description: "Keep the emergency request action prominent alongside the service information.",
      },
      {
        title: "Service clarity",
        description: "Use dedicated service and detail pages to explain the available work.",
      },
      {
        title: "Project evidence",
        description: "Give completed projects their own overview and detail-page structure.",
      },
    ],
  },
  tint: "#f1f1f1",
  brand: { color: "#171717", statement: "Locked out? A clear path to the right help." },
  typography: {
    glyph: { width: 401, height: 423, x: 166, y: 151 },
    fontFamily: "var(--font-frank-ruhl)",
    lines: `Typography — Frank Ruhl Libre\n\n${SPECIMEN_LINES}`,
    swatches: ["#e9fa2e", "#171717", "#a9a9a9", "#ffffff"],
  },
  screens: [
    { name: "home", label: "home" },
    { name: "contact", label: "contact" },
    { name: "services", label: "services" },
    { name: "project-details", label: "project details" },
    { name: "projects", label: "projects" },
    { name: "service-details", label: "service details" },
  ],
});
