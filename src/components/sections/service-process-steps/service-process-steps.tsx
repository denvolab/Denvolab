// ---------------------------------------------------------------------------
// ServiceProcessSteps: the light grey process strip (Figma "Process / ...").
// Server Component. surface/secondary, 96px top/bottom, title then columns
// 64px below it. Two designs:
//
//   "friction" (mobile app, node 701:14521): 528px title, three 581px
//     columns 48px apart. Column: grey index (Display/XL), Gray/200 rule,
//     title (H2), body (540px), 24px apart.
//   "sequence" (SaaS, web, AI agent): optional eyebrow, full-width title,
//     four 436px columns 32px apart. Column: step number (Display/2XL, dark
//     or grey), border/primary rule, title (H2), body (400px), 32px apart.
// ---------------------------------------------------------------------------
import { cn } from "@/lib/utils/cn";
import type { ServiceProcessStepsBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServiceProcessSteps({ block }: { block: ServiceProcessStepsBlock }) {
  const friction = block.variant === "friction";

  return (
    <section className="w-full bg-surface-secondary">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-5 py-16 md:px-10 xl:py-24">
        <div className="flex flex-col gap-6">
          {block.eyebrow ? <p className="font-mono text-label-md text-text-secondary">{block.eyebrow}</p> : null}
          <h2
            className="whitespace-pre-line font-sans text-display-xl text-text-primary"
            style={block.titleWidth ? { maxWidth: block.titleWidth } : undefined}
          >
            <AnimatedText>
              {block.title}
            </AnimatedText>
          </h2>
        </div>

        <ol className={cn("grid grid-cols-1 md:grid-cols-2", friction ? "gap-12 xl:grid-cols-3" : "gap-8 xl:grid-cols-4")}>
          {block.items.map((item) => (
            <li key={item.index} className={cn("flex min-w-0 flex-col", friction ? "gap-6" : "gap-8")}>
              <p
                className={cn(
                  "font-sans",
                  friction ? "text-display-xl text-text-tertiary" : "text-display-2xl",
                  !friction && (block.numberTone === "tertiary" ? "text-text-tertiary" : "text-text-primary"),
                )}
              >
                {item.index}
              </p>
              <span aria-hidden="true" className={cn("h-px w-full", friction ? "bg-gray-200" : "bg-border-primary")} />
              <h3 className="font-sans text-heading-2 text-text-primary">{item.title}</h3>
              <p className={cn("font-sans text-body-lg text-text-secondary", friction ? "max-w-[540px]" : "max-w-[400px]")}>
                <AnimatedText>{item.body}</AnimatedText>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
