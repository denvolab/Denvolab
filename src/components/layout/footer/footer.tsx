// ---------------------------------------------------------------------------
// Footer — link columns + brand wordmark, rendered on every page via the
// root layout. Server Component; see lib/data/footer.ts for the
// API-readiness note (same pattern as the header).
// ---------------------------------------------------------------------------
import { getFooterColumns } from "@/lib/data/footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo/site-config";

export async function Footer() {
  const columns = await getFooterColumns();

  return (
    <footer className="bg-surface-dark text-foreground-inverse">
      <div className="mx-auto max-w-[1920px] px-6 pt-20 lg:px-16">
        {/* Logo + link columns -------------------------------------------
            Breakpoints: per the homepage-responsive-tablet-mobile project
            doc, the Figma tablet (768px) frame ALSO stacks the logo above
            the columns (same as mobile) — only the desktop frame (lg+) puts
            them side by side, so that switch is `lg:`, not `md:`. The
            column count still steps at `md:` (768px tablet -> 2 columns)
            before reaching the full 4 at `lg:` (desktop). */}
        <div className="flex flex-col gap-16 border-b border-foreground-inverse/10 pb-16 lg:flex-row lg:items-start lg:justify-between">
          {/*
            TODO: this points at a temporary Figma asset URL (expires ~7 days
            after export). Automated download was blocked by this sandbox's
            network policy — export the logo from Figma and drop it at
            public/denvolab-logo.svg, then swap the src below.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.figma.com/api/mcp/asset/483855c4-157b-4536-83f4-6b0bab1970ec.svg"
            alt={siteConfig.name}
            className="h-[60px] w-auto"
          />

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-16">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h3 className="font-sans text-heading-5">{column.title}</h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Button
                        href={link.href}
                        external={link.external}
                        variant="ghost"
                        className="text-label-sm uppercase"
                      >
                        {link.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant wordmark --------------------------------------------------
            Real text (not an image) on purpose: it's crawlable brand copy
            and doubles as a natural place for the legal name for SEO. */}
        <p
          aria-hidden="true"
          className="select-none overflow-hidden font-mono text-[18vw] leading-none text-primary lg:text-[22vw]"
        >
          {siteConfig.name.replace(/\s/g, "").toUpperCase()}
        </p>
        <span className="sr-only">
          {siteConfig.legalName} — {siteConfig.tagline}
        </span>
      </div>
    </footer>
  );
}
