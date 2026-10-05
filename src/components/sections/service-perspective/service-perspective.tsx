// ---------------------------------------------------------------------------
// ServicePerspective: the MVP page's opening statement (Figma "Perspective /
// Why this service", node 701:15090). Server Component.
//
// White, 96px top/bottom. A 400px marker label ("01 / THE OPPORTUNITY"),
// 80px, then the title (1260px box) and body (1000px), 32px apart.
// ---------------------------------------------------------------------------
import type { ServicePerspectiveBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServicePerspective({ block }: { block: ServicePerspectiveBlock }) {
  return (
    <section className="w-full bg-surface-primary">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-5 py-16 md:px-10 xl:flex-row xl:gap-20 xl:py-24">
        <p className="font-mono text-label-md text-text-secondary xl:w-[400px] xl:shrink-0">{block.marker}</p>
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <h2 className="max-w-[1260px] whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>
          <p className="max-w-[1000px] font-sans text-body-lg text-text-secondary">{block.body}</p>
        </div>
      </div>
    </section>
  );
}
