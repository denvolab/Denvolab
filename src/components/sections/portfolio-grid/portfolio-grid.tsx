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
// shows "View project" over its picture on hover; a project without one
// (`href: null`) is not a link and shows "Coming soon". On touch screens,
// where there is no hover, the label is always shown.
// ---------------------------------------------------------------------------
import Link from "next/link";
import { RippleImage } from "@/components/ui/ripple-image";
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
      {/* Breakpoint: `md:` (768px), matching the Figma tablet frame's own
          2-column portfolio grid exactly (mobile stays 1-column). */}
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-x-6 gap-y-16 px-5 md:gap-x-10 md:gap-y-20 md:px-10 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { href } = project;
  const live = href !== null;

  const content = (
    <>
      {/* The picture plus the hover label. The label sits after the
          RippleImage with its own z-index: RippleImage isolates its hover
          canvas, so the label always stays on top of the ripple. */}
      <div data-image-reveal="" data-project-image="" className="relative">
        {/* Project screenshot: a RippleImage, so the picture ripples like
            water under the cursor (see components/ui/ripple-image). Keeps
            the design's exact 700px-tall, 16px-rounded frame. Projects
            without an image yet fall back to the bordered placeholder. */}
        {project.imageSrc ? (
          <RippleImage
            src={project.imageSrc}
            alt={project.title}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-[700px] w-full"
            imageClassName="rounded-2xl"
          />
        ) : (
          <div className="flex h-[700px] w-full items-center justify-center rounded-2xl border border-border bg-surface">
            <span className="font-mono text-caption-md text-foreground-subtle">Project preview coming soon</span>
          </div>
        )}

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
            "opacity-0 transition-opacity duration-300 ease-out",
            "group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
          )}
        >
          <span
            className={cn(
              "inline-flex h-[52px] translate-y-2 items-center gap-2 rounded-full px-6 font-mono text-label-md uppercase shadow-lg transition-transform duration-300 ease-out",
              "group-hover:translate-y-0 group-focus-visible:translate-y-0 [@media(hover:none)]:translate-y-0",
              live ? "bg-brand-default text-text-on-brand" : "bg-gray-950/85 text-white backdrop-blur-sm",
            )}
          >
            {live ? "View project" : "Coming soon"}
            {live && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
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
