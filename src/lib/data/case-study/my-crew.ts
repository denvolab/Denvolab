// My Crew (Figma frame 716:17818). Its own layout: a full-bleed cover, the
// shared facts / intro / overview, then timeline, challenge, solution and
// several showcase sections.
import type { CaseStudy } from "@/types/case-study";
import { csImage, PROCESS_CLOSING } from "./shared";
import { designProcessBlock } from "./design-process";

const img = (name: string, alt: string, width: number, height: number) => csImage("my-crew", name, alt, width, height);

const INTRO =
  "MyCrew is a private social platform designed for close friends, meaningful interactions, and trusted connections. It creates a simpler, more personal space to connect, communicate, and share moments.";

export const myCrew: CaseStudy = {
  slug: "my-crew",
  name: "My Crew",
  description: INTRO,
  closing: PROCESS_CLOSING,
  closingGap: 314,
  blocks: [
    {
      type: "cover-hero",
      title: "MyCrew",
      // Figma draws the nav bar over the top 77px of this picture; the site
      // header takes that space, so the file starts 77px lower.
      image: img("hero", "MyCrew home screen on a phone in front of a large MyCrew wordmark", 1920, 1124),
    },
    {
      type: "facts",
      gap: 75,
      items: [
        { icon: "industry", title: "Industry", value: "Local Job Portal" },
        { icon: "services", title: "Services", value: "UI/UX Case Study" },
        { icon: "timeline", title: "Timeline", value: "4 Months" },
      ],
    },
    { type: "intro", gap: 35, text: INTRO, minHeight: 476 },
    {
      type: "figure",
      gap: 98,
      image: csImage("job-sea", "overview", "Job Sea home page on a laptop", 1840, 1024),
      x: 40,
      width: 1840,
      radius: 24,
    },
    {
      type: "visual",
      eyebrow: "Project Timeline",
      title: [
        { text: "Project Timeline We’ve Taken For Building " },
        { text: "My Crew", tone: "gradient" },
      ],
      content: {
        kind: "phases",
        phases: [
          {
            badge: "1st Week",
            detail: "Day 1 - 7",
            title: "Research & Interview",
            items: ["Problem Statement", "User Survey", "User Interview", "Competitor Analysis"],
          },
          { badge: "2nd Week", detail: "Day 8 - 15", title: "Define & Plan", items: ["User Flow", "Design System"] },
          { badge: "3rd Week", detail: "Day 15 - 21", title: "UI Design", items: ["UI Design"] },
          {
            badge: "4th Week",
            detail: "Day 22 - 30",
            title: "Test & Validate",
            items: ["Presentation", "Usability Testing"],
          },
        ],
      },
      image: img(
        "timeline",
        "Project timeline over four weeks: research and interviews, define and plan, UI design, test and validate",
        1920,
        858,
      ),
    },
    {
      type: "challenge",
      gap: 109,
      title: "The Challenge",
      body: "People want to stay connected with the people who matter most, but traditional social platforms can often feel crowded, distracting, and impersonal. The constant noise makes it harder to focus on meaningful conversations and everyday moments with close friends and family.",
      x: 412,
      bodyColor: "dark",
      minHeight: 234,
    },
    {
      type: "solution",
      title: "The Solution",
      body: "Job Sea provides a location-centric interface that prioritizes proximity. By integrating interactive maps and simplified application flows, we created a platform where \"finding a job\" feels as easy as \"ordering food.\"",
      x: 397,
      variant: "wide",
      minHeight: 549,
      cards: [
        {
          title: "Hyper-Local Focus",
          description:
            "Create private spaces where users can connect and share moments only with the people they trust.",
          image: img("private-spaces", "Small team talking around a desk", 489, 263),
        },
        {
          title: "Accessibility",
          description:
            "Reduce social-media noise and make it easier to focus on conversations, memories, and moments that truly matter.",
          image: img("family", "Family gathered on a sofa looking at a phone together", 489, 263),
        },
      ],
    },
    designProcessBlock(119),
    {
      type: "figure",
      gap: 100,
      image: csImage("ai-assistant", "hand-phone", "Hand holding a phone with the app's Today screen", 1840, 1161),
      x: 40,
      width: 1840,
      radius: 26,
    },
    {
      type: "competitors",
      gap: 100,
      eyebrow: "Competitor Analysis",
      title: [
        { text: "Exploring ", tone: "muted" },
        { text: "the Social Connection ", tone: "strong" },
        { text: "Landscape", tone: "muted" },
      ],
      columns: [
        {
          name: "Facebook",
          logo: img("logo-facebook", "Facebook", 104, 59),
          rows: [
            { title: "UI/UX", text: "Feature-rich but cluttered; navigation can feel overwhelming" },
            { title: "Strength", text: "Huge community, powerful features, strong brand recognition" },
            { title: "Weakness", text: "Too crowded, distracting content, privacy concerns" },
          ],
        },
        {
          name: "Instagram",
          logo: img("logo-instagram", "Instagram", 98, 43),
          rows: [
            { title: "UI/UX", text: "Clean, visual-first UI with intuitive interactions" },
            { title: "Strength", text: "Strong visual experience, simple content discovery, high engagement" },
            { title: "Weakness", text: "Less personal for close relationships, algorithm-driven feed" },
          ],
        },
        {
          name: "Snapchat",
          logo: img("logo-snapchat", "Snapchat", 94, 26),
          rows: [
            { title: "UI/UX", text: "Interactive and playful, but navigation is less intuitive" },
            { title: "Strength", text: "Fun private communication, strong friend-focused experience" },
            { title: "Weakness", text: "Can feel confusing for new users, learning curve" },
          ],
        },
        {
          name: "MyCrew",
          logo: img("logo-mycrew", "MyCrew", 124, 30),
          rows: [
            { title: "UI/UX", text: "Clean, simple and relationship-focused experience" },
            { title: "Strength", text: "Focuses on close connections and meaningful relationships" },
            { title: "Weakness", text: "New/less established brand with limited recognition" },
          ],
        },
      ],
    },
    {
      type: "visual",
      gap: 161,
      title: [{ text: "SF Pro" }],
      content: {
        kind: "specimen",
        fontName: "SF Pro",
        fontFamily: "var(--font-sf)",
        notes: ["A B C D E F G H F I H T R E B W O P X Z", "a b c d e f g h i f j l o p b w x y z", "012344567890 {} [] “”"],
        weights: ["Regular", "Medium", "Semi Bold", "Bold"],
        colors: [
          { name: "Primary", hex: "#8C22F5" },
          { name: "Gray", hex: "#CDC8D1" },
          { name: "Error", hex: "#E03428" },
          { name: "Warning", hex: "#DFB400" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#121014" },
        ],
      },
      image: img("type-colors", "Typography and colours: SF Pro with the MyCrew colour palette", 1920, 1360),
    },
    {
      type: "figure",
      gap: 94,
      image: img("admin-monitor", "MyCrew admin dashboard on a monitor", 1840, 1462),
      x: 32,
      width: 1840,
      radius: 24,
    },
    {
      type: "figure",
      image: img("phone-screens", "Eight MyCrew app screens on phones", 1920, 2379),
      x: 0,
      width: 1920,
      radius: 0,
    },
    {
      type: "figure",
      gap: 114,
      image: img("web-laptop", "MyCrew web app on a laptop", 1800, 850),
      x: 60,
      width: 1800,
      radius: 24,
    },
    {
      type: "figure",
      gap: 73,
      image: img("circle-laptop", "MyCrew circles page on a laptop", 1789, 850),
      x: 71,
      width: 1789,
      radius: 24,
    },
  ],
};
