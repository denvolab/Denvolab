// Pro Budget Tracker (Figma frame 727:3429). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const proBudgetTracker = buildTemplateCaseStudy({
  slug: "pro-budget-tracker",
  name: "Pro Budget Tracker",
  tags: ["UI/UX design", "Mobile product"],
  title: "Pro Budget\nTracker",
  industry: "Personal finance",
  intro:
    "A personal-finance app that brings available cash, budgets, savings, bills and debt into a structured mobile overview, with dedicated flows for each everyday money task.",
  challenge:
    "Budgets, bills, savings and debt compete for attention in everyday financial planning. The interface needs to surface priorities without overwhelming users with numbers. The challenge is to connect a concise overview with the detailed actions behind it.",
  solution: {
    body: "Pro Budget Tracker uses a dashboard for key balances and dedicated screens for plans, savings goals, bills, debt and financial health. A clear card hierarchy helps users move from an overview to the next relevant action.",
    cards: [
      {
        title: "At-a-glance overview",
        description: "Bring available cash and remaining budget into a focused home dashboard.",
      },
      {
        title: "Goals & plans",
        description: "Give budget plans and savings goals their own clear progress views.",
      },
      {
        title: "Bills & debt",
        description: "Separate payment commitments into dedicated flows with readable summaries.",
      },
    ],
  },
  tint: "#f0f4fa",
  brand: { color: "#0866ff", statement: "Everyday money, brought into focus." },
  typography: {
    glyph: { width: 391, height: 451, x: 169, y: 151 },
    fontFamily: "var(--font-sf)",
    lines: `Typography — SF Pro\n\n${SPECIMEN_LINES}`,
    swatches: ["#0866ff", "#039855", "#a30303", "#d5e9fd"],
  },
  screens: [
    { name: "dashboard", label: "dashboard" },
    { name: "debt", label: "debt" },
    { name: "budget-plan", label: "budget plan" },
    { name: "bills", label: "bills" },
    { name: "financial-health", label: "financial health" },
    { name: "savings-goals", label: "savings goals" },
  ],
});
