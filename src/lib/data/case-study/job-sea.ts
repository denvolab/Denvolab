// Job Sea (Figma frame 557:9828), the first case study. Same layout as the
// template pages (shared.ts) but with its own pictures, a quote card in the
// collage, its own process copy and a Noto Sans Bengali "A".
import type { CaseStudy } from "@/types/case-study";
import { csImage, PROCESS_CLOSING, STEP_COLORS } from "./shared";

const img = (name: string, alt: string, width = 1840, height = 1035) => csImage("job-sea", name, alt, width, height);

const INTRO =
  "A hyper-local recruitment platform designed to help job seekers find employment within their immediate community and empower local businesses to find the right staff quickly.";

export const jobSea: CaseStudy = {
  slug: "job-sea",
  name: "Job Sea",
  description: INTRO,
  closing: PROCESS_CLOSING,
  closingGap: 80,
  blocks: [
    {
      type: "hero",
      tags: ["UI/UX design", "SaaS design"],
      title: "Job Sea - Local Job Portal",
      cta: { label: "Let’s Talk", href: "/contact" },
      image: img("hero", "Job Sea home page on a laptop", 1057, 720),
      imageRadius: 32,
      textOffset: 195,
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
    {
      type: "intro",
      gap: 151,
      lead: "A hyper-local ",
      text: INTRO.slice("A hyper-local ".length),
      minHeight: 408,
    },
    {
      type: "figure",
      gap: 78,
      image: img("overview", "Job Sea home page on a laptop", 1840, 1024),
      x: 40,
      width: 1840,
      radius: 24,
    },
    {
      type: "challenge",
      gap: 198,
      title: "The Challenge",
      body: "Most major job portals focus on corporate, high-level positions, often overlooking the needs of small local businesses and blue-collar workers. Job seekers frequently struggle to find roles that are within a commutable distance, while local employers find it difficult to reach neighborhood talent through traditional digital channels.",
      x: 470,
      minHeight: 253,
    },
    {
      type: "solution",
      title: "The Solution",
      body: "Job Sea provides a location-centric interface that prioritizes proximity. By integrating interactive maps and simplified application flows, we created a platform where \"finding a job\" feels as easy as \"ordering food.\"",
      x: 470,
      variant: "compact",
      minHeight: 686,
      cards: [
        {
          title: "Hyper-Local Focus",
          description:
            "Map-based job discovery within customizable radius, prioritizing walkable and commutable opportunities for local communities.",
          image: img("map-phone", "Phone showing a city map with nearby job pins", 302, 263),
        },
        {
          title: "Accessibility",
          description:
            "WCAG 2.1 compliant design with screen reader support, high contrast modes, and simplified navigation for all users.",
          image: img("accessible-tablet", "Tablet showing an accessibility icon next to simple content blocks", 302, 263),
        },
        {
          title: "Rapid Hiring",
          description:
            "One-tap application system and instant employer notifications to reduce time-to-hire and improve candidate engagement.",
          image: img("quick-apply", "Phone with a one-tap apply button and a notification badge", 302, 263),
        },
      ],
    },
    {
      type: "collage",
      background: "#fcfdf1",
      left: [
        img("poster", "Job Sea poster on a tiled wall", 599, 651),
        img("search-laptop", "Job Sea search results on a laptop between rocks", 599, 572),
      ],
      middle: {
        card: {
          kind: "quote",
          background: "#f8ffeb",
          quote: "Navigate your career like a sea — JobSea keeps on you job opportunity",
          image: img("quote-phone", "Job Sea app icon on a phone home screen", 349, 393),
        },
        image: img("landing-laptop", "Job Sea landing page on a laptop", 599, 830),
      },
      right: [
        img("poster-framed", "Framed Job Sea poster", 599, 794),
        img("laptop-stage", "Job Sea landing page on a laptop", 599, 429),
      ],
    },
    {
      type: "process",
      title: "Process",
      steps: [
        {
          label: "Step 1",
          color: STEP_COLORS[0],
          title: "Discovery & Research",
          description:
            "We have successfully delivered over 450+ digital products for startups and Fortune 500 companies.",
          items: [
            "User research.",
            "Market analysis.",
            "Competitor benchmarking.",
            "Stakeholder interviews.",
            "User personas.",
          ],
        },
        {
          label: "Step 2",
          color: STEP_COLORS[1],
          title: "Wireframing & Prototyping",
          description: "Building the structural blueprint and interactive flows of your product.",
          items: ["User journey mapping.", "Interactive prototypes.", "Usability testing.", "Feedback integration."],
        },
        {
          label: "Step 3",
          color: STEP_COLORS[2],
          title: "Visual Design",
          description: "Applying colors, typography, and branding to create a stunning look and feel.",
          items: [
            "Brand integration.",
            "Typography and color selection.",
            "High-fidelity mockups.",
            "Design system creation.",
            "Visual consistency.",
          ],
        },
        {
          label: "Step 4",
          color: STEP_COLORS[3],
          title: "Evaluate & Handoff",
          description: "Rigorous usability testing followed by a seamless developer handoff.",
          items: [
            "Usability testing.",
            "A/B testing.",
            "User feedback loops.",
            "Iterative design improvements.",
            "Final design validation.",
          ],
        },
      ],
    },
    {
      type: "figure",
      gap: 100,
      image: img("billboard", "Job Sea billboard on a building wall", 1840, 850),
      x: 40,
      width: 1840,
      radius: 24,
    },
    {
      type: "typography",
      gap: 100,
      glyph: { src: "/images/case-studies/job-sea/glyph.svg", width: 406, height: 553, x: 161, y: 70 },
      panel: {
        background: "#e8f0ff",
        image: img("type-phone", "Job Sea app icon on a phone home screen", 692, 697),
      },
      specimen: {
        lines:
          "Open Source\nA B C D E F G H I J K L M N O P Q R S T U V W X Y Z\na b c d e f g h i j k l m n o p q r s t u v w x y z\n\nRegular\nMedium\nSemiBold\nBold",
        fontFamily: "var(--font-sans)",
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: "-0.025em",
        fontWeight: 600,
        width: 420,
        x: 53,
        y: 149,
      },
      swatches: ["#b2f828", "#ff5900", "#3cc72c", "#fe3333"],
    },
    ...(
      [
        ["homepage", "home page"],
        ["messaging", "messages"],
        ["job-search", "job search"],
        ["saved-jobs", "saved jobs"],
        ["profile", "edit profile"],
        ["job-details", "job details"],
      ] as const
    ).map(([name, label], i) => ({
      type: "figure" as const,
      gap: i === 0 ? 25 : 80,
      image: img(name, `Job Sea ${label} screen on a tablet`),
      x: 40,
      width: 1840,
      height: i === 3 || i === 4 ? 1034 : 1035,
      // Figma gives the third screen square corners (same on every frame).
      radius: i === 2 ? 0 : 24,
    })),
  ],
};
