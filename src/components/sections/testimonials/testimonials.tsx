// ---------------------------------------------------------------------------
// Testimonials — "Clients Words About Denvo" (Figma "Frame 1000003334", node
// 230:4436, y 10878-12461 of the Home Page frame). Server Component: content
// from lib/data/homepage.ts.
//
// LAYOUT NOTE — same fixed-aspect, percentage-positioned approach as hero/,
// ai-orbit/, and contact-cta/: the section is one `aspect-[1920/1583]` box
// capped at `max-w-[1920px]`, with the intro block and row wrapper positioned
// as a % of that box from get_metadata's exact pixel coordinates (intro at
// x=402 y=218 w=1120 h=116; row wrapper at x=2 y=407 w=1920 h=1056, section
// h=1583).
//
// The three card rows (230:4439/4545/4630) are each wider than the 1920px
// frame (3151px / 2516px / 3151px) and sit centered with equal negative
// overflow on both sides — combined with the "Shadow" edge-fade overlay
// (node 230:4736), this is the same signature as the already-built
// partner-logos/ marquee, not a static grid, so it's built the same way:
// TestimonialRow (testimonial-row.tsx) is the row-track marquee component,
// reused 3x with alternating scroll direction (row 2 reversed) — see that
// file and testimonials/README.md for the full reasoning.
// ---------------------------------------------------------------------------
import { getTestimonials, getTestimonialsContent } from "@/lib/data/homepage";
import { TestimonialCard, TestimonialRow } from "./testimonial-row";

// Mobile/tablet card count — the doc's "2x2 on tablet, single column on
// mobile" is a `grid-cols-1 md:grid-cols-2` grid, which reads correctly at
// any card count; 4 matches Figma's own mobile frame (`251:2189`, four
// stacked "Container" cards) exactly.
const RESPONSIVE_CARD_COUNT = 4;

export async function Testimonials() {
  const [content, testimonials] = await Promise.all([
    getTestimonialsContent(),
    getTestimonials(),
  ]);

  return (
    <section className="relative w-full bg-surface" data-figma-node="230:4436">
      {/* Mobile/tablet (<lg) — Figma node 251:2189 (mobile, 4 stacked cards)
          / 253:1436 (tablet, the same 4 cards as a 2x2 grid). Per the
          homepage-responsive-tablet-mobile project doc, these widths drop
          the infinite-scroll marquee for a plain static grid — same
          `TestimonialCard`, no track or edge-fade. */}
      <div className="flex flex-col items-center gap-10 px-5 py-16 text-center md:px-10 lg:hidden">
        <p className="font-mono text-label-md tracking-[0.02em] text-secondary">{content.eyebrow}</p>
        <h2 className="font-heading text-display-xl text-foreground">{content.heading}</h2>
        <div className="grid w-full grid-cols-1 gap-6 text-left md:grid-cols-2">
          {Array.from({ length: RESPONSIVE_CARD_COUNT }, (_, i) => (
            <TestimonialCard key={i} testimonial={testimonials[i % testimonials.length]} fixedWidth={false} />
          ))}
        </div>
      </div>

      {/* Desktop (lg+) — the original fixed-aspect marquee. */}
      <div className="relative mx-auto hidden aspect-[1920/1583] w-full max-w-[1920px] overflow-hidden lg:block">
        {/* Section intro — node 230:4737 */}
        <div className="absolute left-1/2 top-[13.77%] flex w-[58.33%] -translate-x-1/2 flex-col items-center gap-[28px] text-center">
          <p className="font-mono text-label-md tracking-[0.02em] text-secondary">{content.eyebrow}</p>
          <h2 className="font-heading text-display-xl text-foreground">{content.heading}</h2>
        </div>

        {/* Testimonial rows — node 230:4438 */}
        <div className="absolute top-[25.71%] left-0 flex h-[66.71%] w-full flex-col justify-center gap-6">
          <TestimonialRow testimonials={testimonials} count={5} />
          <TestimonialRow testimonials={testimonials} count={4} reverse />
          <TestimonialRow testimonials={testimonials} count={5} />
        </div>
      </div>
    </section>
  );
}
