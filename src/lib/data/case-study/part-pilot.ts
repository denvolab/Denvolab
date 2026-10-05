// Part Pilot (Figma frame 727:3041). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const partPilot = buildTemplateCaseStudy({
  slug: "part-pilot",
  name: "Part Pilot",
  tags: ["UI/UX design", "Mobile product"],
  title: "Part Pilot",
  industry: "Automotive commerce",
  intro:
    "A mobile parts-shopping experience that connects vehicle context, product discovery, part requests, cart and order tracking in one practical interface for car owners.",
  challenge:
    "Car owners need to find relevant parts while keeping their vehicle and purchase context clear. Product browsing, requests and order status can otherwise become disconnected tasks. The challenge is to give these actions a consistent mobile structure.",
  solution: {
    body: "Part Pilot brings vehicle context into the home screen and connects categories, product details, part requests, cart and orders. Compact product cards and visible action buttons keep the next step close to the information that supports it.",
    cards: [
      {
        title: "Vehicle context",
        description: "Start with the selected car and relevant parts categories on the home screen.",
      },
      {
        title: "Parts & requests",
        description: "Connect product information to shopping and a dedicated part-request flow.",
      },
      {
        title: "Order visibility",
        description: "Use consistent cart and order screens to carry the purchase journey forward.",
      },
    ],
  },
  tint: "#faf3f0",
  brand: { color: "#ff4f00", statement: "The right part. A clearer route from discovery to delivery." },
  typography: {
    glyph: { width: 390, height: 466, x: 177, y: 142 },
    fontFamily: "var(--font-inter)",
    lines: `Typography — Inter\n\n${SPECIMEN_LINES}`,
    swatches: ["#ff4f00", "#111827", "#f3f4f6", "#ffffff"],
  },
  screens: [
    { name: "home", label: "home" },
    { name: "part-request", label: "part request" },
    { name: "categories", label: "categories" },
    { name: "orders", label: "orders" },
    { name: "cart", label: "cart" },
    { name: "product-details", label: "product details" },
  ],
});
