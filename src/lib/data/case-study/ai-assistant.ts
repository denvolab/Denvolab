// AI Assistant (Figma frame 716:6393, "AI Assistent"). Shown on the case
// studies grid as "Automation Manager". It starts like the template pages
// (hero, facts, intro, overview) and then has its own sections.
import type { CaseStudy } from "@/types/case-study";
import { csImage, PROCESS_CLOSING } from "./shared";
import { designProcessBlock } from "./design-process";

const img = (name: string, alt: string, width: number, height: number) =>
  csImage("ai-assistant", name, alt, width, height);

const INTRO =
  "I need an AI assistant that can manage my daily workflow, track important client interactions, remind me before deadlines, and help me make faster decisions while keeping me in control.";

export const aiAssistant: CaseStudy = {
  slug: "ai-assistant",
  name: "Automation Manager",
  description: INTRO,
  closing: PROCESS_CLOSING,
  closingGap: 194,
  blocks: [
    {
      type: "hero",
      tags: ["UI/UX design", "SaaS design"],
      title: "Assistant Manager - Manager everything Automatically",
      cta: { label: "Let’s Talk", href: "/contact" },
      image: img("hero", "AI assistant dashboard on a laptop", 1057, 720),
      imageRadius: 24,
      textOffset: 75,
    },
    {
      type: "facts",
      gap: 78,
      items: [
        { icon: "industry", title: "Industry", value: "Local Job Portal" },
        { icon: "services", title: "Services", value: "UI/UX Case Study" },
        { icon: "timeline", title: "Timeline", value: "4 Months" },
      ],
    },
    { type: "intro", gap: 115, text: INTRO, minHeight: 408 },
    {
      type: "figure",
      gap: 99,
      image: csImage("job-sea", "overview", "Job Sea home page on a laptop", 1840, 1024),
      x: 40,
      width: 1840,
      radius: 24,
    },
    {
      type: "goal",
      gap: 132,
      label: "// Project Goal",
      statement: [
        { text: "To design a simple, ", tone: "muted" },
        { text: "trustworthy, and intelligent AI assistant experience", tone: "strong" },
        { text: " that helps freelancers and agency owners save time,", tone: "muted" },
        { text: " manage multiple responsibilities", tone: "strong" },
        { text: ", and focus more on growing their business.", tone: "muted" },
      ],
      meta: [
        { label: "PROJECT", value: "Automotion AI Employee" },
        { label: "INDUSTRY", value: "Artificial Intelligence (AI) / SaaS / Productivity Automation" },
        { label: "TIME", value: "24 April, 2026" },
        { label: "LOCATION", value: "Global" },
      ],
      chips: ["Automotion AI", "Saas Product", "UI Design", "UX Stagey"],
    },
    {
      type: "figure",
      gap: 149,
      image: img("team-dashboard", "HR manager at a laptop surrounded by employee, leave and payroll cards", 1920, 850),
      x: 0,
      width: 1920,
      radius: 0,
    },
    designProcessBlock(52),
    {
      type: "figure",
      gap: 100,
      image: img("hand-phone", "Hand holding a phone with the assistant's Today screen", 1840, 1161),
      x: 40,
      width: 1840,
      radius: 26,
    },
    {
      type: "visual",
      gap: 100,
      title: [{ text: "USER RESEARCH" }],
      subtitle: [
        { text: "Understanding user ", tone: "muted" },
        { text: "behavior, challenges, and opportunities", tone: "strong" },
        { text: " to create a smarter AI workflow experience.", tone: "muted" },
      ],
      content: {
        kind: "stats",
        centre: "Research Topics",
        stats: [
          { value: "50%", label: "User Workflow Analysis" },
          { value: "65%", label: "User Pain Point Research" },
          { value: "80%", label: "AI Assistant Usage Behavior" },
        ],
      },
      image: img(
        "user-research",
        "User research rings: 50% user workflow analysis, 65% user pain point research, 80% AI assistant usage behavior",
        1920,
        2123,
      ),
    },
    {
      type: "visual",
      gap: 69,
      title: [{ text: "Inter" }],
      content: {
        kind: "specimen",
        fontName: "Inter",
        fontFamily: "var(--font-inter)",
        notes: ["Heading 48px", "Title 28px", "Subtitle 16px"],
        weights: ["Light", "Regular", "Semi bold"],
        colors: [
          { name: "Primary", hex: "#A855F7" },
          { name: "Secondary", hex: "#14B8A6" },
          { name: "Black", hex: "#0A0A0A" },
          { name: "White", hex: "#FFFFFF" },
        ],
      },
      image: img("type-colors", "Typography and colours: Inter in Light, Regular and Semi bold, with the colour palette", 1920, 982),
    },
    {
      type: "figure",
      gap: 39,
      image: img("approvals-phone", "Approvals screen on a phone", 1840, 1161),
      x: 32,
      width: 1840,
      radius: 26,
    },
    {
      type: "figure",
      gap: 42,
      image: img("executing", "Approval detail screen with the email draft and timeline", 1840, 1141),
      x: 32,
      width: 1840,
      radius: 26,
    },
    {
      type: "figure",
      gap: 42,
      image: img("inbox-monitor", "Email inbox screen on a desktop monitor", 1920, 1411),
      x: 0,
      width: 1920,
      radius: 0,
    },
    {
      type: "figure",
      // Figma: 1787 x 1095 at x 76 with a 1px outside stroke; the export
      // includes the stroke, so the box is 1789 x 1097 at x 75, 41px down.
      gap: 41,
      image: img("today", "Today dashboard with next call, approvals, marketplace and inbox digest", 1789, 1097),
      x: 75,
      width: 1789,
      radius: 24,
    },
  ],
};
