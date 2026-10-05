// ---------------------------------------------------------------------------
// CaseStudiesHero — the Case Studies page's opening band (Figma node
// 431:6534, "Work": the dark block at the top, up to y=625). Server
// Component: content comes from lib/data/case-studies.ts.
//
// The frame draws its own nav bar at the top (node 431:6537, "Home / About /
// Services / Case Studies / Become a Client"). The site already has a global
// Header above every page, so that bar is not repeated here — same call as
// hero/ and about-hero/.
//
// LAYOUT: headline top-left, paragraph anchored lower on the right, same
// two-column pattern as about-hero/ (xl:flex-row, paragraph pushed down with
// an xl:mt- offset rather than a separate row). No CTA button here — unlike
// about-hero, Figma's source doesn't put one in this band.
//
// DECORATIVE BARS: the same 14-bar treatment as hero/ and contact-cta/
// (border-brand, opacity-[0.04], justify-between). Figma's own bar frame
// bleeds 455px past the bottom of this section's dark background (bars are
// 1080px tall, the dark band is only 625px) — that reads as the decorative
// frame simply not having been trimmed to match, the same kind of drift this
// project normalizes elsewhere (see about-values/README.md's card-height
// note), so the bars are contained to this section's own height instead of
// bleeding into the project grid below it. Desktop-only (lg+), same
// reasoning as contact-cta/: over a two-line wrapped heading on a narrow
// screen the bars read as visual noise, not a flourish.
// ---------------------------------------------------------------------------
import { getCaseStudiesHero } from "@/lib/data/case-studies";

const DECORATIVE_BAR_COUNT = 14;

export async function CaseStudiesHero() {
  const hero = await getCaseStudiesHero();

  return (
    <section className="relative overflow-hidden bg-surface-dark" data-figma-node="431:6534">
      {/* Decorative vertical bars — desktop only, see the file header. */}
      <div className="absolute inset-0 hidden lg:flex lg:justify-between" aria-hidden="true">
        {Array.from({ length: DECORATIVE_BAR_COUNT }).map((_, i) => (
          <span key={i} className="h-full w-[3.75%] border-x border-brand opacity-[0.04]" />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[1920px] px-5 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24 xl:pb-[85px] xl:pt-[231px]">
        <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
          <h1 className="max-w-[601px] font-heading text-display-2xl text-foreground-inverse">
            {hero.heading}
          </h1>

          <div className="max-w-[483px] xl:mt-[141px] xl:w-[483px] xl:shrink-0">
            <p className="font-sans text-body-lg text-foreground-inverse">{hero.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
