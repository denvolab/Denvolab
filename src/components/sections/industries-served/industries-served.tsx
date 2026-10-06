// ---------------------------------------------------------------------------
// IndustriesServed — "Industries We Serve" (Figma node 483:1256, y
// 7463-8153 on the Services page): a heading + subtext + outline button row,
// then six industry cards. Server Component: content from
// lib/data/services.ts.
//
// PLACEHOLDER CONTENT: Figma's own subtext on this section reads "...adapted
// from a reference site for layout only — swap in DenvoLab's real industries
// and case studies before this ships." That's a build note left in the
// design file, not copy meant for visitors — see
// lib/data/services.ts's INDUSTRIES_SERVED comment for how it was handled
// (the genuinely-usable part of the sentence kept, the dev note dropped).
// The six cards themselves ARE Figma's real (if reference-derived) copy,
// reproduced verbatim.
//
// TYPOGRAPHY: every role here matches an existing token exactly, confirmed
// via get_design_context's "styles contained in the design" metadata:
//   - Section heading -> Heading/H2 (32/40/600)      -> text-heading-2
//   - Subtext         -> Body/LG    (18/28/400)      -> text-body-lg
//   - Button label     -> Label/MD  (14/20/2%/500)    -> text-label-md,
//     set in DM Mono like services-list's bullets -> Button's "outline"
//     variant already carries the `font-mono` override, see ui/button.
//   - Card name        -> Heading/H5 (20/28/600)      -> text-heading-5
//   - Card description -> Body/MD   (16/24/400)      -> text-body-md
//   - "Photo placeholder" label -> Label/SM (12/16/2%/500) -> text-label-sm
//     with the same font-mono override as the bullets/button above.
//
// CARD WIDTH: Figma's six "Reel Card" wrappers are 300px / 280px (x4) /
// 307px — each card's own "Industry Image Placeholder" box inside is a
// consistent 280px regardless. That reads as the same kind of per-card
// drift this project normalizes elsewhere (see about-values/README.md), so
// every card here uses the majority 280px width, not the two outliers.
//
// LAYOUT: "Reel Card Row" is built as a horizontally-scrolling strip
// (`overflow-x-auto`), not a wrapping grid — the six fixed-width cards don't
// fit any viewport narrower than ~1880px side by side, and "Reel" in the
// Figma layer name reads as a scrolling filmstrip, not a design asking to
// reflow into columns. No snap/autoplay is added since Figma doesn't specify
// a motion behavior here — unlike about-values' explicitly-marqueed row.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { getIndustriesServed } from "@/lib/data/services";
import { LoopCarousel } from "@/components/ui/loop-carousel";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";

export async function IndustriesServed() {
  const industries = await getIndustriesServed();

  return (
    <section className="w-full bg-surface" data-figma-node="483:1256">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-10 py-16 md:gap-16 md:py-20 xl:py-24">
        <div className="flex w-full flex-col items-start gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex flex-col items-start gap-3.5">
            <h2 className="font-sans text-heading-2 text-foreground"><AnimatedText>{industries.heading}</AnimatedText></h2>
            <p className="max-w-[820px] font-sans text-body-lg text-secondary">
              {industries.description}
            </p>
          </div>

          <Button href={industries.cta.href} variant="outline">{industries.cta.label}</Button>
        </div>

        <LoopCarousel className="industries-carousel" label="Industries we serve"><div className="industries-carousel-items">
          {industries.items.map((industry) => (
            <div key={industry.name} className="flex w-[280px] shrink-0 flex-col items-start gap-3">
              <div data-image-reveal="" className="relative flex h-[200px] w-[280px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-primary bg-surface-secondary">
                {industry.imageSrc ? (
                  <Image
                    src={industry.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 280px, (max-width: 1023px) 320px, 470px"
                    className="object-cover services-industry-image"
                  />
                ) : (
                  <span aria-hidden="true" />
                )}
              </div>
              <h3 className="font-sans text-heading-5 text-foreground">{industry.name}</h3>
              <p className="w-[280px] font-sans text-body-md text-secondary">
                {industry.description}
              </p>
            </div>
          ))}
        </div></LoopCarousel>
      </div>
    </section>
  );
}
