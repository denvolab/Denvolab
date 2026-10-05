// Smart Aqua Farm 360 (Figma frame 727:4981). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const smartAquaFarm360 = buildTemplateCaseStudy({
  slug: "smart-aqua-farm-360",
  name: "Smart Aqua Farm 360",
  tags: ["UI/UX design", "Web dashboard"],
  title: "Smart Aqua\nFarm 360",
  industry: "Aquaculture operations",
  intro:
    "An aquaculture management dashboard that connects pond status, fish stock, feeding, mortality and water operations in one structured workspace for farm teams.",
  challenge:
    "Farm teams need to monitor several operational signals at once while moving between ponds, stock and equipment. Dense data can make important changes hard to notice. The challenge is to give the overview a clear hierarchy and connect it to focused operational screens.",
  solution: {
    body: "Smart Aqua Farm 360 organizes operational KPIs in a shared dashboard and provides dedicated views for active ponds, stock, feeding, mortality and water pumps. Consistent cards and navigation make each area easier to locate and compare.",
    cards: [
      {
        title: "Farm overview",
        description: "Bring pond, stock and health indicators into one scannable dashboard.",
      },
      {
        title: "Feeding & stock",
        description: "Use dedicated views for feed schedules and fish-stock information.",
      },
      {
        title: "Operational monitoring",
        description: "Connect mortality and water-pump views to the wider farm workspace.",
      },
    ],
  },
  tint: "#f0f2f3",
  brand: { color: "#02355a", statement: "A connected view of the farm, from pond to performance." },
  typography: {
    glyph: { width: 390, height: 466, x: 177, y: 142 },
    fontFamily: "var(--font-inter)",
    lines: `Typography — Inter\n\n${SPECIMEN_LINES}`,
    swatches: ["#02355a", "#3b82f6", "#10b981", "#f5f8fa"],
  },
  screens: [
    { name: "dashboard", label: "dashboard" },
    { name: "water-pump", label: "water pump" },
    { name: "active-ponds", label: "active ponds" },
    { name: "mortality", label: "mortality" },
    { name: "feeding-schedule", label: "feeding schedule" },
    { name: "stock-overview", label: "stock overview" },
  ],
});
