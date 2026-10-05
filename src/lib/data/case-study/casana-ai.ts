// Casana AI (Figma frame 727:4593). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const casanaAi = buildTemplateCaseStudy({
  slug: "casana-ai",
  name: "Casana AI",
  tags: ["UI/UX design", "AI web experience"],
  title: "Casana AI",
  industry: "Property technology",
  intro:
    "A property-focused website that introduces Casana's AI valuation proposition and connects home-value discovery, savings, chat and tailored journeys for buyers and sellers.",
  challenge:
    "Property decisions involve different questions for buyers, sellers and homeowners. AI-led valuation also needs an understandable explanation and a clear entry point. The design challenge is to organize these journeys without diluting the central value proposition.",
  solution: {
    body: "Casana presents its home-value proposition through a clear landing page and dedicated savings, chat, buyer and seller journeys. Consistent calls to action and supporting explanations connect exploration to the next relevant step.",
    cards: [
      {
        title: "Home-value entry",
        description: "Give visitors a clear introduction to the property's value proposition.",
      },
      {
        title: "Guided discovery",
        description: "Use chat and explanatory pages to support questions during the journey.",
      },
      {
        title: "Buyer & seller paths",
        description: "Provide dedicated page structures for different property goals.",
      },
    ],
  },
  tint: "#f1f4f9",
  brand: { color: "#1a73e8", statement: "A clearer starting point for your next property decision." },
  typography: {
    glyph: { width: 397, height: 455, x: 170, y: 138 },
    fontFamily: "var(--font-roboto)",
    lines: `Typography — Roboto\n\n${SPECIMEN_LINES}`,
    swatches: ["#1a73e8", "#071b36", "#fbbc05", "#34a853"],
  },
  screens: [
    { name: "home", label: "home" },
    { name: "for-buyers", label: "for buyers" },
    { name: "savings", label: "savings" },
    { name: "for-sellers", label: "for sellers" },
    { name: "how-it-works", label: "how it works" },
    { name: "chat", label: "chat" },
  ],
});
