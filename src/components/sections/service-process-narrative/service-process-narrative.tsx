// ---------------------------------------------------------------------------
// ServiceProcessNarrative: the dark "You should know what happens next."
// section (Figma "05 / Process — decisions and tangible outputs", component
// "3.1 / Process row"). Server Component.
//
// FIGMA LAYOUT: Gray/900, 96px top/bottom. Two columns 80px apart:
//   left  640px "Pin / Process chapter": optional lime label, title, optional
//         body and footnote label (the MVP page uses all four)
//   right 1120px: four rows 64px apart. A row = lime number (112px wide,
//         Display/LG), 32px, then question label, title (H2), body (880px),
//         optional lime "YOU REVIEW / ..." output line; 24px under it a
//         Gray/700 rule.
// Figma names the left column "Pin" and the block "Pinned chapter and
// rolling steps", so on desktop the left column sticks while the steps
// scroll past (it starts in the same place as the static design).
//
// RESPONSIVE: below xl the two columns stack (no sticking). On phones the
// step number sits above its text instead of in a 112px column, and the
// steps are 40px apart.
// ---------------------------------------------------------------------------
import type { ServiceProcessNarrativeBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServiceProcessNarrative({ block }: { block: ServiceProcessNarrativeBlock }) {
  return (
    <section className="w-full bg-gray-900">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-5 py-16 md:px-10 xl:flex-row xl:items-start xl:gap-20 xl:py-24">
        <div className="flex w-full flex-col gap-8 xl:sticky xl:top-24 xl:w-[34.783%] xl:max-w-[640px] xl:shrink-0">
          {block.label ? <p className="font-mono text-label-md text-brand-default">{block.label}</p> : null}
          <h2 className="whitespace-pre-line font-sans text-display-xl text-white"><AnimatedText>{block.title}</AnimatedText></h2>
          {block.body ? <p className="max-w-[560px] font-sans text-body-lg text-gray-300"><AnimatedText>{block.body}</AnimatedText></p> : null}
          {block.footnote ? <p className="max-w-[560px] font-mono text-label-md text-gray-300">{block.footnote}</p> : null}
        </div>

        <ol className="flex min-w-0 flex-1 flex-col gap-10 md:gap-16">
          {block.steps.map((step) => (
            <li key={step.number} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <p className="shrink-0 font-sans text-display-lg text-brand-default md:w-[112px]">{step.number}</p>
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <p className="font-mono text-label-md text-gray-300">{step.question}</p>
                  <h3 className="font-sans text-heading-2 text-white">{step.title}</h3>
                  <p className="max-w-[880px] font-sans text-body-lg text-gray-300"><AnimatedText>{step.body}</AnimatedText></p>
                  {step.output ? <p className="font-mono text-label-md text-brand-default">{step.output}</p> : null}
                </div>
              </div>
              <span aria-hidden="true" className="h-px w-full bg-gray-700" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
