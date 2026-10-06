import { AnimatedAnchor } from "@/components/ui/animated-link/animated-link";
import { ButtonText } from "@/components/ui/button/button-text";
// ---------------------------------------------------------------------------
// Comparison — "What Do You Get By Choosing Denvo Lab?" table, sitting
// between the process timeline and testimonials. Server Component: content
// from lib/data/homepage.ts.
//
// Not a Figma section (see this folder's README): the user supplied a
// reference screenshot of a competing agency's own comparison table and
// asked for the same layout, rebranded to Denvo Lab. Built the same
// content-driven way as every other section regardless (types/homepage.ts +
// lib/data/homepage.ts), and reaching for this site's own design tokens
// throughout rather than the reference's colors.
// ---------------------------------------------------------------------------
import { getComparisonContent, getComparisonRows } from "@/lib/data/homepage";
import { cn } from "@/lib/utils/cn";
import { AnimatedText } from "@/components/ui/animated-text";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M16.6667 5L7.5 14.1667L3.33333 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// One table cell: a check in `--color-success` when the row applies, an x in
// muted gray when it doesn't — the label follows the same true/false
// coloring, matching the reference (only the "loses" side of a row reads as
// grayed-out; a row both sides have stays full-contrast on both sides).
function ComparisonCell({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      {active ? (
        <CheckIcon className="mt-0.5 size-4 shrink-0 text-success sm:size-5" />
      ) : (
        <XIcon className="mt-0.5 size-4 shrink-0 text-foreground-subtle sm:size-5" />
      )}
      <span
        className={cn(
          "font-sans text-body-sm sm:text-body-md",
          active ? "text-foreground" : "text-foreground-subtle",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export async function Comparison() {
  const [content, rows] = await Promise.all([getComparisonContent(), getComparisonRows()]);

  return (
    <section className="w-full bg-surface py-16 lg:py-24" data-section="comparison">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-10 px-5 md:px-10 lg:items-stretch lg:px-6">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <h2 className="whitespace-pre-line font-heading text-display-xl text-foreground">
            <AnimatedText>
              {content.heading}
            </AnimatedText>
          </h2>

          {/* Bespoke pill CTA — no existing Button variant is a rounded-full
              dark pill with a trailing arrow (Button's "primary"/"secondary"
              are this site's actual Figma-spec'd shapes), so this is built
              inline rather than stretching that component for a one-off
              shape that isn't part of the design system. */}
          <AnimatedAnchor
            href={content.cta.href}
            className="button-sweep button-sweep--comparison inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-sans text-label-md text-background transition-colors hover:bg-foreground/90"
          >
            <ButtonText text={content.cta.label} />
            <ArrowUpRightIcon className="size-4" />
          </AnimatedAnchor>
        </div>

        <div className="flex w-full flex-col divide-y divide-border-subtle overflow-hidden rounded-[28px] border border-border-subtle bg-surface-primary">
          <div className="grid grid-cols-2 gap-4 px-6 py-5 sm:gap-6 sm:px-10 sm:py-6">
            <span className="font-heading text-heading-5 text-foreground">{content.denvoLabLabel}</span>
            <span className="font-heading text-heading-5 text-foreground">{content.othersLabel}</span>
          </div>

          {rows.map((row) => (
            <div key={row.feature} className="grid grid-cols-2 gap-4 px-6 py-4 sm:gap-6 sm:px-10 sm:py-5">
              <ComparisonCell active={row.denvoLab} label={row.feature} />
              <ComparisonCell active={row.others} label={row.feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
