// ---------------------------------------------------------------------------
// PartnerLogos — the two-row infinite logo strip (Figma node 230:4222, y
// 7588-7796, on the page's white background — confirmed by reading the
// frame's own fill, same as marquee-tagline/portfolio-grid; NOT the dark
// `surface-dark-deep` of the ai-orbit section directly above it, despite the
// two often being designed together). Server Component: content from
// lib/data/homepage.ts.
//
// Reuses the same `animate-marquee-scroll` loop as marquee-tagline (see that
// folder's README for how/why it works), plus a reversed variant for the
// second row — Figma's two rows are structurally identical, but Figma's own
// annotations on each row's edge-fade element ("left side carousel" /
// "right side carousel") point at the two rows scrolling in opposite
// directions, which is also the standard treatment for a 2-row logo strip.
// ---------------------------------------------------------------------------
import { getPartnerLogos } from "@/lib/data/homepage";
import { PartnerLogoRow } from "./partner-logo-row";

export async function PartnerLogos() {
  const logos = await getPartnerLogos();

  return (
    <section className="w-full bg-background" data-figma-node="230:4222">
      {/* Mobile/tablet (<lg) — Figma nodes 251:1791 (mobile, a fixed 2-column
          x 3-row grid) / 253:1243 (tablet). Per the
          homepage-responsive-tablet-mobile project doc, these widths drop
          the infinite-scroll marquee for simple static rows — built here as
          one wrapping flex row rather than a fixed grid so it holds up at
          any width from 390px to the `lg` breakpoint, not just the two
          exact Figma frame widths. */}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 px-5 py-10 md:px-10 lg:hidden">
        {logos.map((logo, i) =>
          logo.logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- swapped for next/image once real client logos land
            <img
              key={i}
              src={logo.logoSrc}
              alt={logo.name}
              className={logo.size === "wide" ? "h-12 w-36 object-contain" : "h-12 w-[103px] object-contain"}
            />
          ) : (
            <div
              key={i}
              className={
                logo.size === "wide"
                  ? "flex h-12 w-36 items-center justify-center rounded-md border border-border-subtle"
                  : "flex h-12 w-[103px] items-center justify-center rounded-md border border-border-subtle"
              }
            >
              <span className="font-mono text-caption-md text-foreground-subtle">{logo.name}</span>
            </div>
          ),
        )}
      </div>

      {/* Desktop (lg+) — the original infinite-scroll marquee. */}
      <div className="hidden flex-col gap-[10px] lg:flex">
        <PartnerLogoRow logos={logos} />
        <PartnerLogoRow logos={logos} reverse />
      </div>
    </section>
  );
}
