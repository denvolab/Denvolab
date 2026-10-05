// ---------------------------------------------------------------------------
// GENERATED from Figma node 572:1572 ("AI Workflow Section — Variation 6:
// Marquee Data Flow", file I1pKT66lH6Iiv70gGqh6bH) on Sept 27 2026, by
// reading the frame's layers with the Figma plugin API and writing this file
// from a script. Every number below is the layer's real value in the frame,
// not an estimate:
//   x, y, size          -> the badge frame inside "Workflow Canvas" (574:1534),
//                          canvas coordinates (canvas is 1635 x 680)
//   iconX, iconY        -> the icon frame's offset inside its badge
//   iconFrame           -> the icon frame's size in Figma
//   svgW, svgH          -> the exported SVG's own size (Figma rounds the export
//                          canvas up, e.g. 47.33 -> 48, so the <img> is drawn at
//                          this size from iconX/iconY to stay pixel-exact)
// The icon art itself is public/images/ai-orbit/tools/<slug>.svg, exported
// from the same layers (not simple-icons redraws).
//
// `name` / `description` feed the brand badge under the hub. Figma only has
// one filled in ("Farmer" / "No Code Website Builder" -- "Farmer" is read as
// a typo for Framer, next to the Framer icon); the other 11 descriptions
// were written to match that style.
// ---------------------------------------------------------------------------

export interface WorkflowTool {
  slug: string;
  name: string;
  description: string;
  x: number;
  y: number;
  size: number;
  iconX: number;
  iconY: number;
  iconFrame: number;
  svgW: number;
  svgH: number;
}

export const WORKFLOW_TOOLS: WorkflowTool[] = [
  { slug: "claude", name: "Claude", description: "AI Coding Assistant", x: 561, y: 16, size: 96, iconX: 24.3357, iconY: 25.0908, iconFrame: 47.3287, svgW: 48, svgH: 48 },
  { slug: "gemini", name: "Gemini", description: "Multimodal AI Model", x: 1057, y: 86, size: 96, iconX: 23.8322, iconY: 24.084, iconFrame: 48.3357, svgW: 49, svgH: 49 },
  { slug: "deepseek", name: "DeepSeek", description: "Open Reasoning Model", x: 853, y: 346, size: 96, iconX: 24.0839, iconY: 25.0908, iconFrame: 48.3357, svgW: 49, svgH: 49 },
  { slug: "codex", name: "Codex", description: "AI Coding Agent", x: 869, y: 16, size: 96, iconX: 24.0839, iconY: 26.6016, iconFrame: 48.3357, svgW: 49, svgH: 49 },
  { slug: "antigravity", name: "Antigravity", description: "Agentic Code Editor", x: 735, y: 156, size: 96, iconX: 23.5804, iconY: 24.084, iconFrame: 48.3357, svgW: 49, svgH: 49 },
  { slug: "openai", name: "OpenAI", description: "ChatGPT & GPT Models", x: 1021, y: 256, size: 96, iconX: 22.3217, iconY: 24.084, iconFrame: 48.3357, svgW: 49, svgH: 49 },
  { slug: "figma", name: "Figma", description: "UI/UX Design Tool", x: 1219, y: 56, size: 96, iconX: 23.9998, iconY: 24, iconFrame: 47.3287, svgW: 48, svgH: 48 },
  { slug: "framer", name: "Framer", description: "No Code Website Builder", x: 1380, y: 29, size: 96, iconX: 23.9998, iconY: 24, iconFrame: 47.3287, svgW: 48, svgH: 48 },
  { slug: "clickup", name: "ClickUp", description: "Project Management", x: 347, y: 74, size: 96, iconX: 23.9998, iconY: 24, iconFrame: 47.3287, svgW: 48, svgH: 48 },
  { slug: "notion", name: "Notion", description: "Docs & Knowledge Base", x: 583, y: 266, size: 96, iconX: 23.9998, iconY: 24, iconFrame: 47.3287, svgW: 48, svgH: 48 },
  { slug: "linear", name: "Linear", description: "Issue Tracking", x: 659, y: 406, size: 107, iconX: 29.9998, iconY: 30, iconFrame: 47.3287, svgW: 48, svgH: 48 },
  { slug: "asana", name: "Asana", description: "Team Task Management", x: 765, y: 475, size: 96, iconX: 23.9998, iconY: 24, iconFrame: 47.3287, svgW: 48, svgH: 48 },
];

/** The small icon badge inside the brand badge ("Icon Badge — Framer", 573:1611). */
export const SMALL_BADGE = { size: 36, iconOffset: 6.168, iconFrame: 23.6643 };

/** The tool the brand badge shows in the Figma frame (and at t=0). */
export const INITIAL_BADGE_SLUG = "framer";

export function toolIconSrc(slug: string) {
  return `/images/ai-orbit/tools/${slug}.svg`;
}
