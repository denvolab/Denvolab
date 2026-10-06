// ---------------------------------------------------------------------------
// ServiceHandover: "The handover is part of the product." (Figma "06 /
// Deliverables — a usable handover", component "3.1 / Deliverable row").
// Server Component.
//
// White, 96px top/bottom. Left 640px: optional label, title, body (560px).
// Right 1120px: rows 48px apart. A row = grey index (64px), title (H3,
// 320px), body (Body/LG, 672px), 32px between them; 24px under it a
// Gray/200 rule.
// ---------------------------------------------------------------------------
import type { ServiceHandoverBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServiceHandover({ block }: { block: ServiceHandoverBlock }) {
  return (
    <section className="w-full bg-surface-primary">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 py-16 md:px-10 xl:flex-row xl:items-start xl:gap-20 xl:py-24">
        <div className="flex w-full flex-col gap-8 xl:w-[34.783%] xl:max-w-[640px] xl:shrink-0">
          {block.label ? <p className="font-mono text-label-md text-text-secondary">{block.label}</p> : null}
          <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>
          <p className="max-w-[560px] font-sans text-body-lg text-text-secondary"><AnimatedText>{block.body}</AnimatedText></p>
        </div>

        <ol className="flex min-w-0 flex-1 flex-col gap-8 md:gap-12">
          {block.rows.map((row) => (
            <li key={row.index} className="flex flex-col gap-6">
              {/* Phones and tablets: index, title and body stacked (a 320px
                  title column would squeeze the body). lg+: the Figma row. */}
              <div className="flex flex-col gap-2 2xl:flex-row 2xl:gap-8">
                <p className="w-16 shrink-0 font-mono text-label-md text-text-tertiary">{row.index}</p>
                <h3 className="shrink-0 font-sans text-heading-3 text-text-primary 2xl:w-[28.57%] 2xl:max-w-[320px]">{row.title}</h3>
                <p className="min-w-0 flex-1 font-sans text-body-lg text-text-secondary"><AnimatedText>{row.body}</AnimatedText></p>
              </div>
              <span aria-hidden="true" className="h-px w-full bg-gray-200" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
