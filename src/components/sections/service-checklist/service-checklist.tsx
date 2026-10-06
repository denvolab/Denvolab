// ---------------------------------------------------------------------------
// ServiceChecklist: "Everything your team needs next." (Figma "Deliverables /
// Built to be used"). Server Component.
//
// White (or Brand/50 on the web page), 96px top/bottom. Left 640px: optional
// eyebrow + title. Right 1120px: rows 48px apart, a border/primary rule
// under every row (the last one too). A row = 32px check, the format label
// (DM Mono, 210px) and the deliverable (H4), 24px apart. The SaaS page
// centres the row items vertically; the web and AI agent pages align them
// to the top (the label then sits 6px higher), both as in Figma.
//
// RESPONSIVE: on phones the format label sits above the deliverable (the
// 210px label column would leave the deliverable about 60px wide at 390px)
// and the rows are 24px apart; from md the Figma row layout returns.
// ---------------------------------------------------------------------------
import { ServiceGlyph } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils/cn";
import type { ServiceChecklistBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServiceChecklist({ block }: { block: ServiceChecklistBlock }) {
  return (
    <section className={cn("w-full", block.tone === "brand" ? "bg-brand-50" : "bg-surface-primary")}>
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 py-16 md:px-10 xl:flex-row xl:items-start xl:gap-20 xl:py-24">
        <div className="flex w-full flex-col gap-6 xl:w-[34.783%] xl:max-w-[640px] xl:shrink-0">
          {block.eyebrow ? <p className="font-mono text-label-md text-text-secondary">{block.eyebrow}</p> : null}
          <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>
          {block.body && <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{block.body}</AnimatedText></p>}
        </div>

        <ul className="flex min-w-0 flex-1 flex-col gap-6 md:gap-12">
          {block.items.map((item) => (
            <li key={item.deliverable} className="flex flex-col gap-6 md:gap-12">
              <div
                className={cn(
                  "flex items-start gap-4 md:gap-6",
                  block.rowAlign === "center" ? "md:items-center" : "md:items-start",
                )}
              >
                <ServiceGlyph name="check" className="shrink-0 text-text-primary" />
                {/* Phones: label above the deliverable. md+: side by side, as in Figma. */}
                <div
                  className={cn(
                    "flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:gap-6",
                    block.rowAlign === "center" ? "md:items-center" : "md:items-start",
                  )}
                >
                  <p className="font-mono text-label-md text-text-tertiary md:w-[28%] md:max-w-[210px] md:shrink-0">{item.format}</p>
                  <p className="min-w-0 flex-1 font-sans text-heading-4 text-text-primary"><AnimatedText>{item.deliverable}</AnimatedText></p>
                </div>
              </div>
              <span aria-hidden="true" className="h-px w-full bg-border-primary" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
