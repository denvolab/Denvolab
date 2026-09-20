// ---------------------------------------------------------------------------
// ProcessSteps — the "60 Days Process" timeline (Figma node 230:4248, a
// 1120px column centered in the page, on the white background). Server
// Component: content from lib/data/homepage.ts.
// ---------------------------------------------------------------------------
import { getProcessContent, getProcessSteps } from "@/lib/data/homepage";

export async function ProcessSteps() {
  const [content, steps] = await Promise.all([getProcessContent(), getProcessSteps()]);

  return (
    <section className="w-full bg-background py-24" data-figma-node="230:4248">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-12 px-5 md:px-10 lg:px-6">
        <div className="flex flex-col items-center gap-7 text-center">
          <p className="font-mono text-label-md tracking-[0.02em] text-secondary">{content.eyebrow}</p>
          <h2 className="whitespace-pre-line font-heading text-display-xl text-foreground">
            {content.heading}
          </h2>
        </div>

        <div className="flex w-full items-start gap-8">
          {/* Progress rail — decorative, mirrors the Figma source's fixed
              start-badge + track, but stretches to the card column's actual
              height instead of a hardcoded pixel value, so it never falls
              short or overflows if step copy changes length. Hidden below
              `lg`: neither the mobile nor tablet Figma frame shows this rail
              alongside the cards — each card's own small icon slot (see the
              icon placeholder below) carries that role instead. */}
          <div className="relative hidden w-[72px] shrink-0 self-stretch lg:block" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-gray-200" />
            <div className="absolute left-1/2 top-0 h-14 w-0.5 -translate-x-1/2 rounded-full bg-surface-accent" />
            <div className="absolute left-0 top-0 flex size-[72px] items-center justify-center rounded-full bg-surface-accent">
              <span className="font-mono text-label-sm text-brand-subtle">AI</span>
            </div>
          </div>

          <ol className="flex w-full flex-1 flex-col gap-8">
            {steps.map((step) => (
              <li
                key={step.week}
                className="flex min-h-[320px] w-full items-start gap-7 rounded-[28px] bg-surface-primary p-12 shadow-[0px_18px_18px_rgba(201,201,201,0.17)]"
              >
                {/* Step icon — no exportable asset for any of these (several
                    are multi-layer masked graphics in the source) — see
                    this folder's README. */}
                <div
                  className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface"
                  aria-hidden="true"
                />

                <div className="flex flex-1 flex-col items-start gap-4">
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
