// ---------------------------------------------------------------------------
// ContactCta — the homepage's closing section (Figma "Container" node
// 230:4740 for the decorative bars + "Frame 1000003336" node 230:4755 for the
// content, y 12461-13869 of the Home Page frame). Server Component: content
// from lib/data/homepage.ts.
//
// LAYOUT NOTE — same fixed-aspect, percentage-positioned approach as hero/
// and ai-orbit/: the section is one `aspect-[1920/1408]` box capped at
// `max-w-[1920px]`, with every child positioned as a % of that box computed
// from the Figma frame's own pixel coordinates (get_metadata gave the exact
// numbers: bars container x=-2 y=12461 w=1922 h=1408; content frame x=40
// y=12669 w=1840 h=363, relative offsets 42/1408 and 208/1408). Within the
// content frame, "Let's Contact" (1006px) + a 405px gap + the 429px right
// column exactly sums to the 1840px content width, and both sides bottom-
// align (Figma's `items-end`) — reproduced below as a plain `flex
// items-end justify-between` row rather than hardcoding the 405px gap,
// since `justify-between` hits the identical result and self-adjusts if
// the content ever reflows.
//
// The 14-bar decorative pattern is identical to hero/'s (same 72px-wide /
// justify-between treatment) — duplicated here rather than extracted into a
// shared component, per this project's per-section-independence convention
// (see components/sections/README.md).
// ---------------------------------------------------------------------------
import { getContactCtaContent } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";

const DECORATIVE_BAR_COUNT = 14;

export async function ContactCta() {
  const cta = await getContactCtaContent();

  return (
    <section className="relative w-full bg-surface-accent" data-figma-node="230:4740">
      {/* Mobile/tablet (<lg) — Figma nodes 251:2277 (mobile) / 253:1524
          (tablet). Both stack heading -> description -> CTA top-to-bottom
          instead of the desktop's side-by-side, bottom-aligned row; the
          14-bar background pattern is dropped (it's a decorative desktop-
          only flourish over the huge headline's width, and reads as visual
          noise once the heading wraps to fewer, shorter lines). */}
      <div className="flex flex-col items-start gap-8 px-5 py-16 md:px-10 lg:hidden">
        <h2 className="font-heading text-display-jumbo text-foreground-inverse">
          {cta.heading}
        </h2>
        <p className="font-sans text-body-lg text-foreground-disabled">{cta.description}</p>
        <Button href={cta.cta.href} variant="primary" size="lg">
          {cta.cta.label}
        </Button>
      </div>

      {/* Desktop (lg+) — the original fixed-aspect, bottom-aligned row. */}
      <div className="relative mx-auto hidden aspect-[1920/1408] w-full max-w-[1920px] overflow-hidden lg:block">
        {/* Decorative vertical bars — node 230:4741-4754, same treatment as
            hero/'s wordmark bars. */}
        <div className="absolute inset-0 flex justify-between" aria-hidden="true">
          {Array.from({ length: DECORATIVE_BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              className="h-full w-[3.75%] border-x border-brand opacity-[0.04]"
            />
          ))}
        </div>

        {/* Content — node 230:4755 */}
        <div className="absolute left-[2.19%] top-[14.77%] flex w-[95.83%] items-end justify-between">
          <h2 className="font-heading text-display-jumbo text-foreground-inverse">
            {cta.heading}
          </h2>

          <div className="flex w-[23.32%] flex-col items-start gap-10">
            <p className="font-sans text-body-lg text-foreground-disabled">
              {cta.description}
            </p>
            <Button href={cta.cta.href} variant="primary" size="lg">
              {cta.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
