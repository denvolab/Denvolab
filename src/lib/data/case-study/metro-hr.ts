// Denvo HR, formerly Metro HR (Figma frame 727:4205; renamed Oct 7, 2026, the slug stays metro-hr so links keep working). Template page, see shared.ts.
import { buildTemplateCaseStudy, SPECIMEN_LINES } from "./shared";

export const metroHr = buildTemplateCaseStudy({
  slug: "metro-hr",
  name: "Denvo HR",
  tags: ["UI/UX design", "Mobile SaaS"],
  title: "Denvo HR",
  industry: "HR & hospitality",
  intro:
    "A mobile HR workspace for hospitality teams, bringing people, hiring, payroll, attendance and leave into connected screens with clear operational summaries and actions.",
  challenge:
    "HR teams move between employee records, recruitment, payroll and attendance throughout the day. On mobile, dense operational information can be difficult to scan. The challenge is to keep priorities clear while giving each workflow enough detail to act.",
  solution: {
    body: "Denvo HR brings the main HR workflows into a shared mobile navigation structure. Overview cards, employee lists and dedicated task screens connect people, hiring, payroll, attendance and leave management.",
    cards: [
      {
        title: "People & hiring",
        description: "Connect employee information and job openings through focused mobile screens.",
      },
      {
        title: "Payroll overview",
        description: "Present payroll status and related actions in a dedicated operational view.",
      },
      {
        title: "Attendance & leave",
        description: "Keep attendance and leave management accessible within the same workspace.",
      },
    ],
  },
  tint: "#faf0f3",
  brand: { color: "#ff124b", statement: "One workspace for the people behind hospitality." },
  typography: {
    glyph: { width: 390, height: 466, x: 177, y: 142 },
    // Figma sets this specimen in DM Sans SemiBold and names the app's UI
    // font (Proxima Nova) in the text instead of using it.
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    lines: `UI type reference\nProxima Nova\n\n${SPECIMEN_LINES}`,
    swatches: ["#ff124b", "#55ccba", "#172038", "#f7f8fa"],
  },
  screens: [
    { name: "home", label: "home" },
    { name: "leave-management", label: "leave management" },
    { name: "people", label: "people" },
    { name: "attendance", label: "attendance" },
    { name: "payroll", label: "payroll" },
    { name: "job-openings", label: "job openings" },
  ],
});
