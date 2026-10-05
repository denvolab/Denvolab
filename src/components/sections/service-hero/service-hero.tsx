import { HeroLines } from "@/components/ui/hero-lines";
// ---------------------------------------------------------------------------
// ServiceHero: the dark opening section of every service detail page
// (Figma "Hero / Editorial identity", e.g. node 701:14161). Server Component.
//
// FIGMA LAYOUT (1920 frame): padding 180 / 40 / 96, 48px gaps.
//   1. Headline, "V3.1 / Editorial hero" (128/132), in a box as wide as the
//      design's (`headlineWidth`), so the hand-set line breaks stay put.
//   2. A row of two equal halves, 80px apart:
//        left  = the two scroll-cue labels (DM Mono, 24px apart)
//        right = intro paragraph + "Talk about your project" (248 x 52)
//      Pages 01-02 align the halves to the top, 03-07 center them.
//   3. The visual: an 1840 x 850 picture (radius 24 or 12, some with a 1px
//      border), or on the AI agent page the 1840 x 680 workflow funnel.
//
// The Figma frame draws its own nav bar in the top 180px. The site's global
// Header (77px) already sits above every page, so the top padding here is
// 180 - 77 = 103px, which puts the headline at the same height on screen.
//
// Figma also keeps an "Introduction and action" block parked off-canvas
// (x = 1920) on pages 01-02. It is outside the frame, so it is not drawn.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { ServiceHeroBlock } from "@/types/service-detail";

export function ServiceHero({ block }: { block: ServiceHeroBlock }) {
  const { visual } = block;

  return (
    <section className="hero-with-lines w-full bg-gray-900"><HeroLines/>
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 pb-16 pt-16 md:px-10 xl:pb-24 xl:pt-[103px]">
        <div className="flex flex-col gap-12">
          <h1
            className="whitespace-pre-line font-sans text-editorial-hero text-white"
            style={{ maxWidth: block.headlineWidth }}
          >
            {block.headline}
          </h1>

          <div
            className={cn(
              "flex flex-col gap-10 xl:flex-row xl:gap-20",
              block.cueAlign === "center" ? "xl:items-center" : "xl:items-start",
            )}
          >
            <div className="flex flex-1 flex-col gap-6">
              <p className="max-w-[720px] font-mono text-label-md text-gray-300">{block.problemLabel}</p>
              <p className="max-w-[720px] font-mono text-label-md text-brand-default">{block.scrollLabel}</p>
            </div>

            <div className="flex flex-1 flex-col items-start gap-8">
              <p className="font-sans text-body-lg text-gray-300" style={{ maxWidth: block.introWidth }}>
                {block.intro}
              </p>
              <Button
                href={block.cta.href}
                variant="primary"
                size="lg"
                className="h-[52px] w-[248px] rounded-2xl px-6 font-mono"
              >
                {block.cta.label}
              </Button>
            </div>
          </div>
        </div>

        {visual.kind === "image" ? (
          <div
            data-image-reveal=""
            className={cn(
              "relative aspect-[1840/850] w-full overflow-hidden",
              visual.radius === 24 ? "rounded-3xl" : "rounded-[12px]",
            )}
          >
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              priority
              sizes="(min-width: 1920px) 1840px, 100vw"
              className="object-cover"
            />
            {visual.bordered ? (
              // Figma's 1px INSIDE stroke, drawn over the picture.
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] border border-border-primary"
              />
            ) : null}
          </div>
        ) : (
          // AI agent page: the static funnel from Figma's "Workflow Canvas"
          // (node 701:15254), exported as one SVG.
          // eslint-disable-next-line @next/next/no-img-element -- static vector art, no resizing needed
          <img
            data-image-reveal=""
            src="/images/service-detail/ai-workflow-canvas.svg"
            alt={visual.alt}
            width={1840}
            height={680}
            className="h-auto w-full"
          />
        )}
      </div>
    </section>
  );
}
