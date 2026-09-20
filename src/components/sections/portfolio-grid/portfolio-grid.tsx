// ---------------------------------------------------------------------------
// PortfolioGrid — the 6-project showcase directly under the marquee (Figma
// node 230:4066, y 1420-4120, on the page's white base background — same as
// the marquee above it, not the dark hero). Server Component: content comes
// from lib/data/homepage.ts.
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
// ---------------------------------------------------------------------------
import { getPortfolioProjects } from "@/lib/data/homepage";

export async function PortfolioGrid() {
  const projects = await getPortfolioProjects();

  return (
    <section className="w-full bg-background py-24" data-figma-node="230:4066">
      {/* Breakpoint: `md:` (768px), matching the Figma tablet frame's own
          2-column portfolio grid exactly (mobile stays 1-column). */}
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-x-6 gap-y-16 px-5 md:gap-x-10 md:gap-y-20 md:px-10 md:grid-cols-2">
        {projects.map((project) => (
          <a key={project.title} href={project.href} className="group flex flex-col gap-8">
            {/* Project screenshot — no asset could be exported into the
                codebase (see this folder's README). Placeholder keeps the
                design's exact 700px-tall, 16px-rounded frame. */}
            {project.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- swapped for next/image once a real, sized asset lands
              <img
                src={project.imageSrc}
                alt={project.title}
                className="h-[700px] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-[700px] w-full items-center justify-center rounded-2xl border border-border bg-surface">
                <span className="font-mono text-caption-md text-foreground-subtle">
                  Project preview coming soon
                </span>
              </div>
            )}

            <div className="flex flex-col gap-4">
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
                  <span
                    key={tag}
                    className="rounded-lg bg-[#f2f2f1] px-3 py-2 font-mono text-caption-md text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
