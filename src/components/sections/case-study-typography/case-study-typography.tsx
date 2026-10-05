// ---------------------------------------------------------------------------
// CaseStudyTypography: the type and colour band (Figma "Frame 2147224388",
// e.g. 727:2585).
//
// FIGMA (1920): band #f7f5fa, padding 100 / 40. A row, 60px gap:
//   glyph box  567 x 702. The giant "A" in the product's font, exported from
//              Figma as an SVG (glyph.svg). Figma clips it at the box edge,
//              so the SVG is clipped the same way. The box has a 2px blue
//              gradient rule on its right edge and a soft drop shadow.
//   panel      1213 x 697, radius 24, page tint. Specimen text at 53, 149
//              (420px wide, 26/40 -2.5% in most pages); the right 692px is a
//              picture (screen 1 cropped to fill, or Job Sea's phone shot).
// 80px below: four 424 x 298 colour swatches, radius 32, 48px apart.
//
// From xl the glyph box and panel keep their 567 : 1213 share of the width
// and everything inside the panel is sized in container units, so it scales
// as one piece. Below xl the glyph sits above, the panel stacks its text over
// its picture, and the swatches go two per row on phones.
// ---------------------------------------------------------------------------
import Image from "next/image";
import type { CSSProperties } from "react";
import { pctOf } from "@/lib/utils/fluid";
import type { CaseStudyTypographyBlock } from "@/types/case-study";

export function CaseStudyTypography({ block }: { block: CaseStudyTypographyBlock }) {
  const { glyph, panel, specimen } = block;
  // Specimen metrics as container units of the 1213px panel (xl and up).
  const cq = (px: number) => `${((px / 1213) * 100).toFixed(4)}cqw`;
  const specimenVars = {
    fontFamily: specimen.fontFamily,
    fontWeight: specimen.fontWeight,
    letterSpacing: specimen.letterSpacing,
    "--cs-spec-size": cq(specimen.fontSize),
    "--cs-spec-leading": cq(specimen.lineHeight),
    "--cs-spec-x": cq(specimen.x),
    "--cs-spec-y": cq(specimen.y),
    "--cs-spec-w": cq(specimen.width),
  } as CSSProperties;

  return (
    <section className="w-full bg-[#f7f5fa]">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-5 py-14 md:gap-12 md:px-10 md:py-20 xl:gap-20 xl:py-[100px]">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-[3.2609%]">
          {/* Figma: the box clips the letter, has a 2px blue gradient rule on
              its right edge and a drop shadow (4, 8, blur 48, black 25%) that
              the letter and the rule cast. */}
          <div data-image-reveal="" className="relative mx-auto aspect-[567/702] w-full max-w-[360px] overflow-hidden [filter:drop-shadow(3.94px_7.87px_47.87px_rgba(0,0,0,0.25))] md:max-w-[420px] xl:mx-0 xl:w-[30.8152%] xl:max-w-none">
            <Image
              src={glyph.src}
              alt=""
              width={glyph.width}
              height={glyph.height}
              unoptimized
              className="absolute"
              style={{
                left: pctOf(glyph.x, 567),
                top: pctOf(glyph.y, 702),
                width: pctOf(glyph.width, 567),
                height: pctOf(glyph.height, 702),
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-0.5 bg-[linear-gradient(to_bottom,rgba(69,130,253,0)_0%,#4582fd_54%,rgba(69,130,253,0)_100%)] xl:block"
            />
          </div>

          <div
            data-image-reveal=""
            className="@container relative flex flex-col overflow-hidden rounded-3xl xl:block xl:aspect-[1213/697] xl:w-[65.9239%]"
            style={{ background: panel.background }}
          >
            <p
              className="whitespace-pre-line p-6 text-[length:clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-[1.55] text-black md:p-10 xl:absolute xl:left-[var(--cs-spec-x)] xl:top-[var(--cs-spec-y)] xl:w-[var(--cs-spec-w)] xl:p-0 xl:text-[length:var(--cs-spec-size)] xl:leading-[var(--cs-spec-leading)]"
              style={specimenVars}
            >
              {specimen.lines}
            </p>
            <div className="relative aspect-[692/697] w-full xl:absolute xl:inset-y-0 xl:right-0 xl:aspect-auto xl:w-[57.0486%]">
              <Image
                src={panel.image.src}
                alt={panel.image.alt}
                fill
                sizes="(min-width: 1280px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 xl:gap-[2.6087%]" aria-label="Colour palette">
          {block.swatches.map((hex) => (
            <li
              key={hex}
              className="aspect-[424/298] rounded-2xl md:rounded-3xl xl:rounded-[32px]"
              style={{ background: hex }}
            >
              <span className="sr-only">{hex.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
