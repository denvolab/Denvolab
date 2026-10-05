import Image from "next/image";
import type { Testimonial } from "@/types/homepage";
import { cn } from "@/lib/utils/cn";

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
      data-testimonial-card=""
      className={cn(
        "flex min-h-[331px] shrink-0 flex-col items-start gap-6 rounded-2xl bg-surface-primary p-8",
        fixedWidth ? "w-[611px]" : "w-full",
      )}
    >
      {testimonial.isSample && <p className="font-mono text-caption-md text-foreground-subtle">Sample testimonial · Fictional profile</p>}
      <div className="flex w-full items-center gap-4">
        {testimonial.imageSrc ? <Image src={testimonial.imageSrc} alt={testimonial.name} width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" /> : <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface font-sans text-heading-5 text-foreground" aria-hidden="true">{testimonial.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</span>}
        <div className="flex min-w-0 flex-col items-start gap-1">
          <p className="font-sans text-heading-5 text-foreground">{testimonial.name}</p>
          <p className="font-sans text-body-sm text-foreground-subtle">{testimonial.role}</p>
        </div>
      </div>

      {/* Divider — node 230:4459, an unexportable hairline SVG in Figma;
          reproduced as a plain 1px rule. */}
      <div className="h-px w-full bg-border-subtle" aria-hidden="true" />

      <blockquote className="w-full font-sans text-body-lg text-foreground">{testimonial.quote}</blockquote>
      {testimonial.sourceHref && <a href={testimonial.sourceHref} className="font-sans text-body-sm text-foreground-subtle underline underline-offset-4">View original review</a>}
    </div>
  );
}

// Shared by all three rows in testimonials.tsx — same "one row component,
// reused with a direction flag" pattern as partner-logos/partner-logo-row.tsx.
// `count` reproduces Figma's own per-row card count (5/4/5) before the track
// is duplicated for the seamless loop; the content itself is identical
// across two identical animation groups for a seamless loop.
export function TestimonialRow({
  testimonials,
  count,
  reverse = false,
}: {
  testimonials: Testimonial[];
  count: number;
  reverse?: boolean;
}) {
  if (!testimonials.length) return null;
  const base = Array.from({ length: count }, (_, i) => testimonials[i % testimonials.length]);

  return (
    // `shrink-0`: this row must never be compressed by a flex-column
    // parent with less space than its real (card) height needs — that
    // silently cropped every card's bottom off when this lived inside
    // testimonials.tsx's old fixed-height row wrapper. See that file's
    // top-of-file comment for the full story.
    <div data-testimonial-row="" className="relative w-full shrink-0 overflow-hidden">
      <div
        className={cn(
          "flex w-max items-center",
          reverse ? "animate-marquee-scroll-reverse" : "animate-marquee-scroll",
        )}
      >
        {[0, 1].map(copy => <div key={copy} className="flex items-center gap-6 pr-6" aria-hidden={copy === 1 || undefined}>
          {base.map((testimonial, i) => <TestimonialCard key={i} testimonial={testimonial} />)}
        </div>)}
      </div>

      {/* Edge fades — matching Figma's own "Shadow" gradient overlay (node
          230:4736: surface/secondary -> transparent -> transparent ->
          surface/secondary), which is what confirmed these rows are meant to
          scroll rather than sit as a static overflowing grid. Uses
          `from-surface` (not `from-background`, unlike partner-logos/) since
          this section sits on the gray `bg-surface`, not white.
          `data-wash-fade`: when the page colour wash changes the page
          colour, the fade starts from the wash colour instead
          (components/motion/color-wash). */}
      <div
        aria-hidden="true"
        data-wash-fade=""
        className="pointer-events-none absolute inset-y-0 left-0 w-[250px] bg-gradient-to-r from-surface from-30% to-transparent"
      />
      <div
        aria-hidden="true"
        data-wash-fade=""
        className="pointer-events-none absolute inset-y-0 right-0 w-[250px] bg-gradient-to-l from-surface from-30% to-transparent"
      />
    </div>
  );
}
