// ---------------------------------------------------------------------------
// PortfolioGrid — the 6-project showcase directly under the marquee (Figma
// node 230:4066, y 1420-4120, on the page's white base background — same as
// the marquee above it, not the dark hero). Server Component: content comes
// from lib/data/homepage.ts, or from the `projects` prop (the Case Studies
// page passes its longer list, see lib/data/case-study).
//
// NORMALIZATION NOTE: 5 of these 6 cards use ad-hoc styling in the Figma
// source (`font-bold text-black` titles, a literal `#3c3a3a` description
// color) instead of the file's own Heading/H3 + text/secondary tokens — only
// the "Denvo Hotel" card was built against the real tokens. Since nothing
// about those 5 projects calls for a different visual treatment (it reads as
// a designer forgetting to apply the shared style, not an intentional
// variation), every card here is normalized to the correct token-based style
// rather than reproducing the inconsistency — consistent with this project's
// "components only ever reference the design system by name" rule.
//
// HOVER LABEL (Oct 2026): a project with a case study page is a link and
// shows the round "EXPLORE THE STORY" wheel (ui/work-wheel, Figma 1087:20132)
// over its picture on hover, its text ring turning and its arrow pulsing
// (it replaced the "View project" pill on Oct 7, 2026); a project without
// one (`href: null`) is not a link and shows "Coming soon". With a mouse
// the wheel rides next to the pointer and glides after it, like the
// carousels' Drag cursor (work-wheel-cursor.tsx). Keyboard focus shows the wheel in the middle; on
// touch screens, where there is no hover, the label is always shown.
// ---------------------------------------------------------------------------
import Link from "@/components/ui/animated-link/animated-link";
import { RippleImage } from "@/components/ui/ripple-image";
import { WorkWheel } from "@/components/ui/work-wheel";
import { WorkWheelCursor } from "./work-wheel-cursor";
import { getPortfolioProjects } from "@/lib/data/homepage";
import { cn } from "@/lib/utils/cn";
import type { PortfolioProject } from "@/types/homepage";

interface PortfolioGridProps {
  /** Projects to show. Defaults to the homepage's six. */
  projects?: PortfolioProject[];
}

export async function PortfolioGrid({ projects: given }: PortfolioGridProps = {}) {
  const projects = given ?? (await getPortfolioProjects());

  return (
    <section id="projects" data-home-part="portfolio" className="w-full bg-background py-24" data-figma-node="230:4066">
      {/* No visible title in Figma; this keeps the heading order h1 → h2 → h3
          (card titles) for screen readers and Lighthouse. */}
      <h2 className="sr-only">Our craft</h2>
      {/* Breakpoint: `md:` (768px), matching the Figma tablet frame's own
          2-column portfolio grid exactly (mobile stays 1-column). */}
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-x-6 gap-y-16 px-5 md:gap-x-10 md:gap-y-20 md:px-10 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
      {/* On a mouse, the wheel rides next to the pointer over the pictures
          (one for the whole section, like the carousels' Drag cursor). */}
      <WorkWheelCursor />
    </section>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const { href } = project;
  const live = href !== null;

  const content = (
    <>
      {/* The picture plus the hover label. The label sits after the
          RippleImage with its own z-index: RippleImage isolates its hover
          canvas, so the label always stays on top of the ripple. */}
      <div data-image-reveal="" data-project-image="" data-wheel-cursor={live ? "" : undefined} className="relative">
        {/* Project screenshot: a RippleImage, so the picture ripples like
            water under the cursor (see components/ui/ripple-image). Keeps
            the design's exact 700px-tall, 16px-rounded frame. Projects
            without an image yet fall back to the bordered placeholder. */}
        {project.imageSrc ? (
          <RippleImage
            src={project.imageSrc}
            alt={project.title}
            sizes="(min-width: 1920px) 900px, (min-width: 1280px) calc((100vw - 120px) / 2), (min-width: 768px) calc((100vw - 68px) / 2), calc(100vw - 32px)"
            className="h-[700px] w-full"
            imageClassName="rounded-2xl"
          />
        ) : (
          <div className="flex h-[700px] w-full items-center justify-center rounded-2xl border border-border bg-surface">
            <span className="font-mono text-caption-md text-foreground-subtle">Project preview coming soon</span>
          </div>
        )}

        {/* No fade on this box or on the wheel's own box: in Chrome an
            ancestor with opacity below 1 hides the picture from a
            backdrop-filter inside it, so the wheel's dark glass only
            switched on, all at once, when the fade ended (light, then
            suddenly dark). Each layer fades itself instead (see
            work-wheel.css; the pill below), and the glass darkens
            smoothly with it. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        >
          {live ? (
            // Centred wheel: keyboard focus and touch screens. With a mouse
            // the section's cursor wheel takes over (work-wheel-cursor.tsx).
            <span
              className={cn(
                "block translate-y-2 scale-90 transition-transform duration-500 ease-out",
                "group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100",
                "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:scale-100",
              )}
            >
              <WorkWheel pathId={`work-wheel-path-${index}`} />
            </span>
          ) : (
            <span
              className={cn(
                "inline-flex h-[52px] translate-y-2 items-center gap-2 rounded-full px-6 font-mono text-label-md uppercase shadow-lg opacity-0 transition-[opacity,transform] duration-300 ease-out",
                "group-hover:translate-y-0 group-focus-visible:translate-y-0 [@media(hover:none)]:translate-y-0",
                "group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
                "bg-gray-950/85 text-white backdrop-blur-sm",
              )}
            >
              Coming soon
            </span>
          )}
        </span>
      </div>

      <div data-project-copy="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-sans text-heading-3 text-foreground">{project.title}</h3>
          <p className="font-sans text-body-md text-secondary">{project.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-[11px]">
          {project.tags.map((tag) => (
            // Figma's literal `#f2f2f1` chip fill isn't bound to any
            // variable in the source file (unlike almost everything
            // else here) — kept as the exact one-off hex rather than
            // rounding it to the nearest gray token.
            <span key={tag} className="rounded-lg bg-[#f2f2f1] px-3 py-2 font-mono text-caption-md text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        data-press-card=""
        className="group flex flex-col gap-8 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand-default"
      >
        {content}
        <span className="sr-only">View the case study</span>
      </Link>
    );
  }

  return (
    <div className="group flex cursor-default flex-col gap-8">
      {content}
      <span className="sr-only">Case study coming soon</span>
    </div>
  );
}
