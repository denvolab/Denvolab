// Denvo Hotel (Figma frame 727:2265). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const denvoHotel = buildTemplateCaseStudy({
  slug: "denvo-hotel",
  name: "Denvo Hotel",
  tags: ["UI/UX design", "Web design"],
  title: "Denvo Hotel",
  industry: "Hospitality & booking",
  intro:
    "A responsive hotel booking experience that brings room discovery, stay details and checkout into one clear journey, helping guests compare options and plan a comfortable stay.",
  challenge:
    "Guests need to compare rooms, understand amenities and confirm a stay without losing context. The design challenge is to make discovery and reservation feel consistent on desktop and mobile, with clear room information and a focused path to checkout.",
  solution: {
    body: "Denvo Hotel connects room discovery, detailed stay information and checkout through a consistent responsive interface. Clear room cards and focused booking actions help guests move from browsing to reservation.",
    cards: [
      {
        title: "Room discovery",
        description: "Browse room photography, amenities and nightly prices in a consistent card layout.",
      },
      {
        title: "Stay details",
        description: "Keep room information and booking decisions together in a focused detail page.",
      },
      {
        title: "Booking flow",
        description: "Connect room selection to checkout, with responsive layouts for booking on mobile.",
      },
    ],
  },
  tint: "#f6f3fa",
  brand: { color: "#a259ff", statement: "Designed for comfort. From room discovery to a confident booking." },
  typography: {
    glyph: { width: 391, height: 451, x: 169, y: 151 },
    fontFamily: "var(--font-sf)",
    lines: `Typography — SF Pro\n\n${SPECIMEN_LINES}`,
    swatches: ["#a259ff", "#d3baf5", "#181818", "#f8f5fc"],
  },
  screens: [
    { name: "home", label: "home" },
    { name: "mobile-home", label: "mobile home" },
    { name: "popular-rooms", label: "popular rooms" },
    { name: "room-listing", label: "room listing" },
    { name: "checkout", label: "checkout" },
    { name: "room-details", label: "room details" },
  ],
});
