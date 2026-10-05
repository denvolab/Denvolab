// ---------------------------------------------------------------------------
// Testimonials — "Clients Words About Denvo" (Figma "Frame 1000003334", node
// 230:4436, y 10878-12461 of the Home Page frame). Server Component: content
// from lib/data/homepage.ts.
//
// LAYOUT NOTE — normal flow (intro, then the three rows, stacked with gap),
// NOT the fixed-aspect percentage-positioned box used by hero/, ai-orbit/,
// and contact-cta/. An earlier version did use that pattern (row wrapper
// pinned to a fixed `h-[66.71%]` of the aspect box, from get_metadata's exact
// pixel coordinates: intro at x=402 y=218 w=1120 h=116; row wrapper at x=2
// y=407 w=1920 h=1056, section h=1583) and it clipped every card's bottom
// off. Root cause, found by measuring the live DOM: the row wrapper is a
// `flex-col` with a *fixed* height; each `TestimonialRow` is a plain flex
// item (no `shrink-0`) inside it, so when three real 331px-tall card rows
// (plus gaps) needed more room than the fixed height had, flex-shrink
// compressed every row down to fit — and because each row has its own
// `overflow-hidden` (for the marquee) while the *card* inside is `shrink-0`
// (won't compress), the still-full-height card just got its bottom cropped
// by its now-shorter row. Percentage-based aspect-ratio boxes only work
// safely for content with a short, predictable height (a headline, an
// icon) — a paragraph-length quote is exactly the case that breaks it, so
// this section now matches `partner-logos/`'s approach instead (also a
// 3-row-vs-2-row marquee, but always built as ordinary flow): let the
// section's real height be whatever the content actually needs, with only
// each row's own `overflow-hidden` clipping the horizontal marquee track,
// not the whole section clipping a fixed-height column of rows.
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
import { AnimatedText } from "@/components/ui/animated-text";

export async function Testimonials({ home = false }: { home?: boolean } = {}) {
  const [content, testimonials] = await Promise.all([
    getTestimonialsContent(),
    getTestimonials(),
  ]);

  if (!testimonials.length) return null;

  if (home) return <section className="home-testimonials" data-figma-node="1087:20526">
    <div className="home-section-intro"><p className="home-eyebrow">CLIENT VOICES</p><h2><AnimatedText>The craft is ours. The story is shared.</AnimatedText></h2></div>
    <div className="home-reviews-desktop"><TestimonialRow testimonials={testimonials.slice(0, 5)} count={5} /><TestimonialRow testimonials={testimonials.slice(5, 9)} count={4} reverse /><TestimonialRow testimonials={[...testimonials.slice(9), ...testimonials.slice(0, 2)]} count={5} /></div>
    <div className="home-reviews-responsive"><TestimonialRow testimonials={testimonials.slice(0, 6)} count={6} /><TestimonialRow testimonials={testimonials.slice(6, 12)} count={6} reverse /></div>
  </section>;

  return (
    <section className="relative w-full bg-surface" data-figma-node="230:4436">
      {/* Mobile/tablet (<lg) — all twelve reviews in the original responsive grid
          with the original column widths and spacing. Per the
          homepage-responsive-tablet-mobile project doc, these widths drop
          the infinite-scroll marquee for a plain static grid — same
          `TestimonialCard`, no track or edge-fade. */}
      <div className="flex flex-col items-center gap-10 px-5 py-16 text-center md:px-10 lg:hidden">
        <p className="font-sans text-label-md tracking-[0.02em] text-secondary">{content.eyebrow}</p>
        <h2 className="font-heading text-display-xl text-foreground"><AnimatedText>{content.heading}</AnimatedText></h2>
        <div className="grid w-full grid-cols-1 gap-6 text-left md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} fixedWidth={false} />
          ))}
        </div>
      </div>

      {/* Desktop (lg+) — normal flow, sized to its real content (see the
          layout note above for why this replaced a fixed-aspect box). The
          intro is capped at the same 1120px readable width used elsewhere
          (process-steps/, comparison/); the rows themselves stay full-width
          since each one's own track needs to bleed past both edges. */}
      <div className="hidden w-full flex-col items-center gap-16 py-24 lg:flex">
        <div className="flex w-full max-w-[1120px] flex-col items-center gap-7 px-5 text-center md:px-10 lg:px-6">
          <p className="font-sans text-label-md tracking-[0.02em] text-secondary">{content.eyebrow}</p>
          <h2 className="font-heading text-display-xl text-foreground"><AnimatedText>{content.heading}</AnimatedText></h2>
        </div>

        {/* Testimonial rows — node 230:4438 */}
        <div className="flex w-full flex-col gap-6">
          <TestimonialRow testimonials={testimonials.slice(0, 5)} count={5} />
          <TestimonialRow testimonials={testimonials.slice(5, 9)} count={4} reverse />
          <TestimonialRow testimonials={[...testimonials.slice(9), ...testimonials.slice(0, 2)]} count={5} />
        </div>
      </div>
    </section>
  );
}
