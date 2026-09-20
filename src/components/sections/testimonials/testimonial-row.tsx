import type { Testimonial } from "@/types/homepage";
import { cn } from "@/lib/utils/cn";

const STAR_COUNT = 5;

// One card — node 230:4440 (and its 13 structurally-identical siblings).
// Exported (unlike most row-local pieces) because the mobile/tablet static
// grid in testimonials.tsx reuses it directly instead of going through the
// marquee `TestimonialRow` below — same card, no track/edge-fade wrapper.
// `fixedWidth` is true for the desktop marquee track (where every card must
// be the same explicit 611px so the track's total width is predictable) and
// false for the mobile/tablet grid (where the card should just fill its
// grid cell).
export function TestimonialCard({
  testimonial,
  fixedWidth = true,
}: {
  testimonial: Testimonial;
  fixedWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-start gap-6 rounded-2xl bg-surface-primary p-8",
        fixedWidth ? "w-[611px]" : "w-full",
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar — node 230:2173 (the shared "Avatar" component). No asset
              could be exported into this codebase — see testimonials/README.md
              — a plain circle stands in until a real photo is available. */}
          <div className="size-14 shrink-0 rounded-full bg-surface" aria-hidden="true" />
          <div className="flex w-32 flex-col items-start gap-1">
            <p className="font-sans text-heading-5 text-foreground">{testimonial.name}</p>
            <p className="font-sans text-body-sm text-foreground-subtle">{testimonial.role}</p>
          </div>
        </div>

        {/* Star rating — node 230:4448 etc, 5 x 24px icon frames. The star
            icon itself couldn't be exported (see README); plain filled chips
            stand in until the real icon is available. */}
        <div className="flex items-center gap-2" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: STAR_COUNT }).map((_, i) => (
            <span key={i} className="size-6 shrink-0 rounded-sm bg-brand" aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* Divider — node 230:4459, an unexportable hairline SVG in Figma;
          reproduced as a plain 1px rule. */}
      <div className="h-px w-full bg-border-subtle" aria-hidden="true" />

      <p className="w-full font-sans text-body-lg text-foreground">{testimonial.quote}</p>
    </div>
  );
}

// Shared by all three rows in testimonials.tsx — same "one row component,
// reused with a direction flag" pattern as partner-logos/partner-logo-row.tsx.
// `count` reproduces Figma's own per-row card count (5/4/5) before the track
// is duplicated for the seamless loop; the content itself is identical
// across every card (see lib/data/homepage.ts's TESTIMONIAL constant).
export function TestimonialRow({
  testimonials,
  count,
  reverse = false,
}: {
  testimonials: Testimonial[];
  count: number;
  reverse?: boolean;
}) {
  const base = Array.from({ length: count }, (_, i) => testimonials[i % testimonials.length]);
  const track = [...base, ...base];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={cn(
          "flex w-max items-center gap-6",
          reverse ? "animate-marquee-scroll-reverse" : "animate-marquee-scroll",
        )}
      >
        {track.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} />
        ))}
      </div>

      {/* Edge fades — matching Figma's own "Shadow" gradient overlay (node
          230:4736: surface/secondary -> transparent -> transparent ->
          surface/secondary), which is what confirmed these rows are meant to
          scroll rather than sit as a static overflowing grid. Uses
          `from-surface` (not `from-background`, unlike partner-logos/) since
          this section sits on the gray `bg-surface`, not white. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[250px] bg-gradient-to-r from-surface from-30% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[250px] bg-gradient-to-l from-surface from-30% to-transparent"
      />
    </div>
  );
}
