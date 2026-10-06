// ---------------------------------------------------------------------------
// CaseStudyProcess: the four "Step" cards on Gray/50 (Figma
// "Frame 2147224390", e.g. 727:2453).
//
// FIGMA (1920): band padding 100 / 40; "Process" centred (Display XL,
// #342f3d); 48px; four 442px cards, 24px apart. Card: white, radius 20, 1px
// #f7f5fa inside stroke, 36px soft shadow, padding 24, 24px between parts:
//   step pill   81 x 40, radius 12, page colour, Host Grotesk Medium 16/150%
//   heading     title (H3, 28/36 -2%) + description (Body LG, gray-600), 12px
//   list        40px below; rows 24px apart, each 36px: a 24px box with an
//               8px gray-300 dot, 4px, Host Grotesk 16/150% gray-500, 12px
//               bottom padding and a 1px gray-100 rule (Figma draws the
//               rule inside the 36px, so the padding here is 11px).
// Cards in a row share the tallest height. Four columns from xl, two from
// md, one on phones.
// ---------------------------------------------------------------------------
import type { CaseStudyProcessBlock } from "@/types/case-study";
import { AnimatedText } from "@/components/ui/animated-text";

export function CaseStudyProcess({ block }: { block: CaseStudyProcessBlock }) {
  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-8 px-5 py-14 md:gap-12 md:px-10 md:py-20 xl:py-[100px]">
        <h2 className="text-center font-sans text-display-xl wash-ink [--ink:#342f3d]"><AnimatedText>{block.title}</AnimatedText></h2>
        <ol className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4">
          {block.steps.map((step) => (
            <li
              key={step.label}
              className="flex flex-col items-start gap-6 rounded-[20px] bg-white p-6 shadow-[0_0_36px_rgba(0,0,0,0.04)] outline outline-1 -outline-offset-1 outline-[#f7f5fa]"
            >
              <span
                className="inline-flex h-10 w-[81px] items-center justify-center rounded-[12px] font-grotesk text-base font-medium leading-normal wash-ink [--ink:#342f3d]"
                style={{ background: step.color }}
              >
                {step.label}
              </span>
              <div className="flex w-full flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans text-heading-3 text-gray-950">{step.title}</h3>
                  <p className="font-sans text-body-lg text-gray-600"><AnimatedText>{step.description}</AnimatedText></p>
                </div>
                <ul className="flex flex-col gap-6">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-1 border-b border-gray-100 pb-[11px]">
                      <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center">
                        <span className="size-2 rounded-full bg-gray-300" />
                      </span>
                      <span className="font-grotesk text-base leading-normal text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
