// ---------------------------------------------------------------------------
// ProcessSteps — the "60 Days Process" timeline (Figma node 230:4248, a
// 1120px column centered in the page, on the white background). Server
// Component: content from lib/data/homepage.ts.
// ---------------------------------------------------------------------------
import { getProcessContent } from "@/lib/data/homepage";
import { ProcessIcon } from "./process-icon";
import { ProcessShadow } from "./process-shadow";
import { ProcessRail } from "./process-rail";
import { AnimatedText } from "@/components/ui/animated-text";

// How far from the viewport top each card sticks, and how much each
// successive card's sticky offset steps down by — see the `<li>` comment
// below for why.
const PROCESS_CARD_STICKY_TOP_PX = 96;
const PROCESS_CARD_STACK_OFFSET_PX = 24;

export async function ProcessSteps({ heading }: { heading?: string } = {}) {
  const content = { ...(await getProcessContent()), eyebrow: "HOW WE CRAFT", heading: heading ?? "A clear path from the first\nconversation to launch." };
  const steps = [{"week": "Week 1", "title": "Listen & Understand", "description": "We get to know your business, your audience, and what needs to change. Together, we agree on where to begin.", "tasks": ["Research", "Competitor Analysis", "Industry Analysis", "Sitemap Creation", "Formulate Team"]}, {"week": "Week 2", "title": "Map & Shape", "description": "We map the main journeys and sketch the key screens. You can follow the flow before the finer details take shape.", "tasks": ["User Interviews", "Competitor Analysis", "Journey Mapping", "Challenges & Goals", "Sketching & Wireframes"]}, {"week": "Week 3", "title": "Craft the Experience", "description": "We bring together type, colour, and interaction. Each choice helps people understand where they are and what to do next.", "tasks": ["Typography Selection", "Color Palette Creation", "Icon Set Design", "UI Planning"]}, {"week": "Week 4", "title": "Bring It to Life", "description": "We turn the approved screens into a working experience, checking each journey across desktop, tablet, and mobile.", "tasks": ["A/B Testing", "Reviews & Feedback", "Final Refinement", "Quality Assurance"]}, {"week": "Week 5", "title": "Connect the Parts", "description": "We connect the data and services your product needs, then check that each step leads to the right result.", "tasks": ["A/B Testing", "Reviews & Feedback", "Final Refinement", "Quality Assurance"]}, {"week": "Week 6", "title": "Refine & Launch", "description": "We test the details, resolve issues, and prepare for launch. Your team gets the files and guidance needed to take it forward.", "tasks": ["A/B Testing", "Reviews & Feedback", "Final Refinement", "Quality Assurance"]}];

  return (
    <section data-home-part="process" className="w-full bg-background py-24" data-figma-node="230:4248">
      <ProcessShadow />
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-12 px-5 md:px-10 lg:px-6">
        <div className="flex flex-col items-center gap-7 text-center">
          <p className="font-sans text-label-md tracking-[0.02em] text-secondary">{content.eyebrow}</p>
          <h2 className="whitespace-pre-line font-heading text-display-xl text-foreground">
            <AnimatedText>
              {content.heading}
            </AnimatedText>
          </h2>
        </div>

        <div className="flex w-full items-start gap-8">
          {/* Progress rail — mirrors the Figma source's fixed start-badge +
              track, but stretches to the card column's actual height
              instead of a hardcoded pixel value, so it never falls short or
              overflows if step copy changes length. Hidden below `lg`:
              neither the mobile nor tablet Figma frame shows this rail
              alongside the cards — each card's own small icon slot (see the
              icon placeholder below) carries that role instead.
              Scroll-linked fill animation lives in process-rail.tsx (a
              Client Component) — see that file and this folder's README.
              `firstCardTopPx` syncs the fill's start and the badge's own
              sticky offset to the exact same scroll position card 1 itself
              sticks at, using the same constant the `<li>`s below use. */}
          <ProcessRail
            className="relative hidden w-[72px] shrink-0 self-stretch lg:block"
            firstCardTopPx={PROCESS_CARD_STICKY_TOP_PX}
          />

          <ol className="flex w-full flex-1 flex-col gap-8">
            {steps.map((step, index) => (
              <li
                key={step.week}
                // Sticky stacked-card scroll effect, per the user's reference
                // site + explicit spec ("sticky the card, one card overlap
                // with second card, then working gradually"): every card is
                // `position: sticky` at its own `top` offset (staggered by
                // STACK_OFFSET_PX per card, via inline style since Tailwind
                // can't express a per-index arbitrary value), so as the page
                // scrolls each card locks in place, then the next one slides
                // up and covers it — a thin sliver of every earlier card's
                // top edge stays visible beneath the stack, cascading rather
                // than snapping instantly. Pure CSS (no ScrollTrigger/JS):
                // sticky already IS scroll-driven. `zIndex` makes the paint
                // order explicit rather than relying on DOM order alone.
                className="sticky flex min-h-[320px] w-full items-start gap-4 rounded-[28px] bg-surface-primary p-6 shadow-[0px_-2px_24px_0px_rgba(174,174,174,0.02),0px_8px_32px_-4px_rgba(174,174,174,0.04)] md:gap-7 md:p-8 lg:p-12"
                style={{ top: `${PROCESS_CARD_STICKY_TOP_PX + index * PROCESS_CARD_STACK_OFFSET_PX}px`, zIndex: index + 1 }}
              >
                <ProcessIcon index={index} />

                {/* `min-w-0`: a flex child will not shrink below its longest word
                    unless told it may, and on a phone that pushed the text and
                    task chips past the edge of the card and the screen. */}
                <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
                  <span className="rounded-lg bg-[#f2f2f1] px-3 py-2 font-mono text-caption-md text-secondary">
                    {step.week}
                  </span>
                  <div className="flex flex-col items-start gap-2">
                    <h3 className="font-heading text-heading-1 text-foreground">{step.title}</h3>
                    <p className="font-sans text-body-md text-secondary">{step.description}</p>
                  </div>
                  <div className="flex flex-wrap items-start gap-2.5">
                    {step.tasks.map((task) => (
                      <span
                        key={task}
                        className="rounded-lg bg-[#f2f2f1] px-3 py-2 font-mono text-caption-md text-secondary"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
