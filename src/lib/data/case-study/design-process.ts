// The "Design process & timeline" wheel. AI Assistant and My Crew share the
// exact same band in Figma (716:6566 and 716:18005), so it lives here once.
import type { CaseStudyVisualBlock } from "@/types/case-study";
import { csImage } from "./shared";

export function designProcessBlock(gap: number): CaseStudyVisualBlock {
  return {
    type: "visual",
    gap,
    title: [{ text: "DESIGN PROCESS & TIMELINE" }],
    subtitle: [
      { text: "Turning complex AI workflows into a simple, intuitive, and ", tone: "muted" },
      { text: "user-friendly experience", tone: "strong" },
      { text: ".", tone: "muted" },
    ],
    content: {
      kind: "phases",
      phases: [
        { badge: "1st week", title: "Discover", items: ["User Interview", "Problem Finding", "Define"] },
        { badge: "2nd week", title: "Design", items: ["Wireframing", "UI design", "Prototyping"] },
        { badge: "3rd week", title: "Deliver", items: ["Useability Testing", "Feedback", "Refinement"] },
      ],
    },
    image: csImage(
      "ai-assistant",
      "design-process",
      "Design process wheel: Discover in week 1, Design in week 2, Deliver in week 3",
      1920,
      1403,
    ),
  };
}
