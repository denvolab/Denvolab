// Denvo Travel (Figma frame 727:2653). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const denvoTravel = buildTemplateCaseStudy({
  slug: "denvo-travel",
  name: "Denvo Travel",
  tags: ["UI/UX design", "Responsive web"],
  title: "Denvo Travel",
  industry: "Travel & retreats",
  intro:
    "A responsive travel website that pairs immersive destinations with clear retreat, coach and contact journeys, helping visitors explore meaningful travel at their own pace.",
  challenge:
    "Travel discovery needs to inspire without hiding practical next steps. Visitors move between destination imagery, coach information and enquiries on different screen sizes, so the challenge is to balance an expressive brand with clear navigation and readable content.",
  solution: {
    body: "Denvo Travel uses immersive destination imagery, consistent typography and focused navigation to connect the home, coach and contact pages. Desktop and tablet layouts preserve the same hierarchy and visual character.",
    cards: [
      {
        title: "Destination discovery",
        description: "Lead with expressive travel imagery and a direct path to exploring retreats.",
      },
      {
        title: "Coach profiles",
        description: "Make it easy to find the people behind the experience through a dedicated coach page.",
      },
      {
        title: "Easy enquiries",
        description: "Keep contact information and enquiry forms clear across responsive layouts.",
      },
    ],
  },
  tint: "#f0f1f1",
  brand: { color: "#081d22", statement: "A little distance. A fresh perspective." },
  typography: {
    glyph: { width: 390, height: 466, x: 177, y: 142 },
    fontFamily: "var(--font-inter)",
    lines: `Typography — Inter\n\n${SPECIMEN_LINES}`,
    swatches: ["#081d22", "#fb9826", "#d7e3dc", "#ffffff"],
  },
  screens: [
    { name: "home-desktop", label: "desktop home" },
    { name: "contact-tablet", label: "tablet contact" },
    { name: "coaches-desktop", label: "desktop coaches" },
    { name: "coaches-tablet", label: "tablet coaches" },
    { name: "home-tablet", label: "tablet home" },
    { name: "contact-desktop", label: "desktop contact" },
  ],
});
