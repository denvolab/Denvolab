// ---------------------------------------------------------------------------
// ServiceConversation: the lime closing band of every service page (Figma
// "Conversation / Start something meaningful"). Server Component; the
// effect is the client LensDistortion wrapper.
//
// FIGMA LAYOUT: brand/default, 96px top/bottom. Title (Display/XL, Gray/900)
// in an 857px box on the branding page and 1320px on the others, then 80px,
// then a 440px column: description + Gray/900 "Let's talk" (135 x 60).
//
// EFFECT: the frame carries Figma's "Lens distortion" shader (Distortion 0,
// Aberration 0.02 on pages 01-02 and 0.03 on 03-07, centre 50/50, Lateral,
// High quality). The text near the left and right edges smears into colour
// fringes and the edges get a bright rim. That is how the design looks, so
// it is reproduced with the same shader maths in WebGL
// (components/ui/lens-distortion). The real text stays in the page.
// ---------------------------------------------------------------------------
import { Button } from "@/components/ui/button";
import { LensDistortion } from "@/components/ui/lens-distortion";
import type { ServiceConversationBlock } from "@/types/service-detail";

export function ServiceConversation({ block }: { block: ServiceConversationBlock }) {
  return (
    <section className="w-full">
      <LensDistortion aberration={block.aberration} className="bg-brand-default">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-5 py-16 md:px-10 xl:flex-row xl:gap-20 xl:py-24">
          <h2
            className="min-w-0 whitespace-pre-line font-sans text-display-xl text-gray-900 xl:shrink"
            style={{ width: block.titleWidth, maxWidth: "100%" }}
          >
            {block.title}
          </h2>
          <div className="flex flex-col items-start gap-6 xl:w-[440px] xl:shrink-0">
            <p className="font-sans text-body-lg text-gray-900">{block.description}</p>
            <Button
              href={block.cta.href}
              variant="primary"
              size="lg"
              className="h-[60px] rounded-2xl bg-gray-900 px-6 font-mono text-white hover:bg-gray-800 active:bg-gray-700"
            >
              {block.cta.label}
            </Button>
          </div>
        </div>
      </LensDistortion>
    </section>
  );
}
