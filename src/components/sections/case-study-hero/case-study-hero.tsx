import { HeroLines } from "@/components/ui/hero-lines";
// ---------------------------------------------------------------------------
// CaseStudyHero: the dark opening band of a case study (Figma "Rectangle 1"
// #1a2128 behind "Frame 150" + the hero picture, e.g. 727:2344 / 727:2359).
//
// FIGMA (1920 frame): the dark band runs from y 0 to 1053 and Figma draws its
// own nav bar in it. The site Header (77px, same colour) sits above every
// page, so this band is 1053 - 77 = 976px tall and everything keeps its
// on-screen position:
//   picture  1057 x 720 at x 823, 101px below the header (radius 32, or 24
//            on the AI page), 155px of band below it.
//   text     741px column at x 40, starting `textOffset` px below the top of
//            the picture (195 on most pages): tags (24/32, gray-300, 8px dot
//            between), 24px, title (96/100, -4%), 48px, "Let’s Talk"
//            (135 x 60 box; the browser's DM Mono is a little narrower than
//            Figma's, so the width is fixed rather than padding-based).
// Desktop starts at xl (1280). The two columns keep their 741 : 1057 share
// of the 1840px content width and the text offset is a percentage of that
// width, so it stays aligned with the picture as the page narrows. Below xl
// the text stacks above the picture.
//
// CaseStudyCoverHero is My Crew's opening: one full-bleed picture (its big
// "MyCrew" wordmark is part of the artwork), with the page title for screen
// readers.
// ---------------------------------------------------------------------------
import Image from "@/components/ui/responsive-image/responsive-image";
import type { CSSProperties } from "react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { pctOf } from "@/lib/utils/fluid";
import type { CaseStudyCoverHeroBlock, CaseStudyHeroBlock } from "@/types/case-study";

export function CaseStudyHero({ block }: { block: CaseStudyHeroBlock }) {
  return (
    <section className="hero-with-lines w-full bg-surface-dark" data-hero=""><HeroLines/>
      <div
        className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 pb-16 pt-12 md:px-10 md:pb-20 md:pt-16 xl:flex-row xl:items-start xl:justify-between xl:gap-0 xl:pb-[155px] xl:pt-[101px]"
        style={{ "--cs-hero-offset": pctOf(block.textOffset, 1840) } as CSSProperties}
      >
        <div className="flex flex-col items-start gap-10 xl:w-[40.2717%] xl:gap-12 xl:pt-[var(--cs-hero-offset)]">
          <div className="flex flex-col gap-4 md:gap-6">
            <ul className="flex flex-wrap items-center gap-2">
              {block.tags.map((tag, i) => (
                <Fragment key={tag}>
                  {i > 0 && <li aria-hidden="true" className="size-2 rounded-full bg-gray-800" />}
                  <li className="font-sans text-heading-4 text-gray-300">{tag}</li>
                </Fragment>
              ))}
            </ul>
            <h1 className="cs-hero-title whitespace-pre-line font-sans font-semibold text-white">{block.title}</h1>
          </div>
          <Button
            href={block.cta.href}
            variant="primary"
            size="lg"
            className="h-[60px] w-[135px] rounded-2xl px-0 font-mono text-label-md"
          >
            {block.cta.label}
          </Button>
        </div>

        <div
          data-image-reveal=""
          className={cn(
            "relative aspect-[1057/720] w-full overflow-hidden rounded-2xl xl:w-[57.4457%]",
            block.imageRadius === 32 ? "xl:rounded-[32px]" : "xl:rounded-3xl",
          )}
        >
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            priority
            sizes="(min-width: 1920px) 1057px, (min-width: 1280px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function CaseStudyCoverHero({ block }: { block: CaseStudyCoverHeroBlock }) {
  return (
    <section className="hero-with-lines w-full bg-black" data-hero=""><HeroLines/>
      <h1 className="sr-only">{block.title}</h1>
      {/* Phones and tablets get a taller crop (centred on the phone in the
          artwork); from xl the picture keeps its own proportions. */}
      <div
        data-image-reveal=""
        className="relative mx-auto aspect-[4/3] w-full max-w-[1920px] md:aspect-[16/10] xl:aspect-[var(--cover-ratio)]"
        style={{ "--cover-ratio": `${block.image.width} / ${block.image.height}` } as CSSProperties}
      >
        <Image src={block.image.src} alt={block.image.alt} fill priority sizes="(min-width: 1920px) 1920px, 100vw" className="object-cover" />
      </div>
    </section>
  );
}
