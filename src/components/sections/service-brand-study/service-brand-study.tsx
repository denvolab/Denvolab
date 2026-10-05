// ---------------------------------------------------------------------------
// ServiceBrandStudy: the branding page's identity study (Figma component
// "3.1 / Study / Brand identity", instance 701:14218). Server Component.
//
// A Brand/100 panel (1840 x 860, radius 12) with three overlapping cards
// placed at fixed spots, exactly as in Figma:
//   1. dark "form." specimen (960 x 698 at 96, 72) with the colour strip
//   2. white typography card (580 x 600 at 1140, 40)
//   3. lime application card (710 x 152 at 1020, 658), on top of card 1
//
// SCALING: the panel keeps its 1840 x 860 proportions at every width. Every
// size inside (positions, boxes, text) is "Figma px x --k", where --k is
// 1px when the panel is 1840px wide (it's a container: 100cqw / 1840). So at
// 1920 it matches Figma pixel for pixel, and on smaller screens the whole
// composition shrinks together instead of cards running into each other.
// Same idea as sections/ai-orbit/frame.ts.
//
// RESPONSIVE: the scaled panel is used from xl (1280px) up. Below that the
// same three cards are stacked at normal reading sizes (dark specimen, then
// typography and lime application cards side by side from md).
// ---------------------------------------------------------------------------
import type { CSSProperties } from "react";
import type { ServiceBrandStudyBlock } from "@/types/service-detail";

const PANEL_W = 1840;

/** Figma px -> CSS length at the panel's current scale. */
function k(px: number) {
  return `calc(${px} * var(--k))`;
}

function box(x: number, y: number, w: number, h: number): CSSProperties {
  return { left: k(x), top: k(y), width: k(w), height: k(h), padding: k(40), gap: k(24) };
}

// Text styles inside the panel: same families/weights/tracking as the
// tokens, with the size and line height scaled by --k.
const label = (lh = 20): CSSProperties => ({ fontSize: k(14), lineHeight: k(lh), letterSpacing: "0.02em" });
const editorial: CSSProperties = { fontSize: k(128), lineHeight: k(132), letterSpacing: "-0.05em" };
// Display styles use DM Sans' fixed opsz-14 cut, like everywhere on these
// pages (see the v3.1 note in styles/tokens/typography.css).
const displayXl: CSSProperties = {
  fontSize: k(60),
  lineHeight: k(68),
  letterSpacing: "-0.04em",
  fontVariationSettings: '"opsz" 14',
};
const displayLg: CSSProperties = {
  fontSize: k(48),
  lineHeight: k(56),
  letterSpacing: "-0.035em",
  fontVariationSettings: '"opsz" 14',
};
const bodyLg: CSSProperties = { fontSize: k(18), lineHeight: k(28) };

const SWATCHES = ["bg-white", "bg-brand-100", "bg-brand-default", "bg-gray-700"];

export function ServiceBrandStudy({ block }: { block: ServiceBrandStudyBlock }) {
  const { specimen, typography, application } = block;

  return (
    <section className="w-full bg-surface-primary">
      <div className="mx-auto w-full max-w-[1920px] px-5 py-16 md:px-10 xl:py-24">
        {/* Phones and tablets: the three cards stacked at normal reading
            sizes (scaled down, the composition's 14px labels would end up
            around 5px). Only one of the two versions is ever displayed, so
            screen readers read the content once. */}
        <div className="flex flex-col gap-4 rounded-[12px] bg-brand-100 p-4 md:gap-6 md:p-6 xl:hidden">
          <div className="flex flex-col gap-5 rounded-[12px] bg-gray-900 p-6 md:p-10">
            <p className="font-mono text-label-md text-brand-default">{specimen.label}</p>
            <p className="font-sans text-editorial-hero font-semibold text-white">{specimen.wordmark}</p>
            <p className="max-w-[560px] whitespace-pre-line font-sans text-body-lg text-gray-300">{specimen.body}</p>
            <div className="flex h-14 w-full md:h-20" aria-hidden="true">
              {SWATCHES.map((swatch) => (
                <span key={swatch} className={`h-full flex-1 ${swatch}`} />
              ))}
            </div>
            <p className="font-mono text-label-md text-gray-300">{specimen.footnote}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-5 rounded-[12px] bg-white p-6 md:p-10">
              <p className="font-mono text-label-md text-text-tertiary">{typography.label}</p>
              <p className="font-sans text-editorial-hero font-semibold text-text-primary">{typography.specimen}</p>
              <p className="whitespace-pre-line font-sans text-display-xl text-text-primary">{typography.title}</p>
              <p className="font-sans text-body-lg text-text-secondary">{typography.body}</p>
              <span aria-hidden="true" className="h-px w-full bg-gray-200" />
              <p className="font-mono text-label-md text-text-secondary">{typography.footnote}</p>
            </div>

            <div className="flex flex-col justify-end gap-5 rounded-[12px] bg-brand-default p-6 md:p-10">
              <p className="font-sans text-display-lg text-text-primary">{application.title}</p>
              <p className="font-mono text-label-md text-gray-900">{application.label}</p>
            </div>
          </div>
        </div>

        <div className="@container hidden w-full xl:block">
          {/* data-wash="keep": this panel is artwork (a brand study with its
              own colours), so the page colour wash never recolours it or
              anything in it (components/motion/color-wash). */}
          <div
            data-wash="keep"
            className="relative aspect-[1840/860] w-full overflow-hidden rounded-[12px] bg-brand-100"
            style={{ "--k": `calc(100cqw / ${PANEL_W})` } as CSSProperties}
          >
            {/* 1. Brand specimen */}
            <div className="absolute flex flex-col overflow-hidden rounded-[12px] bg-gray-900" style={box(96, 72, 960, 698)}>
              <p className="font-mono font-medium text-brand-default" style={label()}>
                {specimen.label}
              </p>
              <p className="font-sans font-semibold text-white" style={editorial}>
                {specimen.wordmark}
              </p>
              <p className="whitespace-pre-line font-sans text-gray-300" style={{ ...bodyLg, width: k(560) }}>
                {specimen.body}
              </p>
              <div className="flex" style={{ width: k(800), height: k(96) }} aria-hidden="true">
                {SWATCHES.map((swatch) => (
                  <span key={swatch} className={`h-full flex-1 ${swatch}`} />
                ))}
              </div>
              <p className="font-mono font-medium text-gray-300" style={{ ...label(), width: k(800) }}>
                {specimen.footnote}
              </p>
            </div>

            {/* 2. Typography application */}
            <div className="absolute flex flex-col overflow-hidden rounded-[12px] bg-white" style={box(1140, 40, 580, 600)}>
              <p className="font-mono font-medium text-text-tertiary" style={label()}>
                {typography.label}
              </p>
              <p className="font-sans font-semibold text-text-primary" style={editorial}>
                {typography.specimen}
              </p>
              <p className="whitespace-pre-line font-sans font-semibold text-text-primary" style={displayXl}>
                {typography.title}
              </p>
              <p className="font-sans text-text-secondary" style={{ ...bodyLg, width: k(450) }}>
                {typography.body}
              </p>
              <span aria-hidden="true" className="block shrink-0 bg-gray-200" style={{ width: k(500), height: k(1) }} />
              <p className="font-mono font-medium text-text-secondary" style={label()}>
                {typography.footnote}
              </p>
            </div>

            {/* 3. Brand application (drawn last, so it sits over card 1) */}
            <div
              className="absolute flex flex-col overflow-hidden rounded-[12px] bg-brand-default"
              style={box(1020, 658, 710, 152)}
            >
              <p className="font-sans font-semibold text-text-primary" style={displayLg}>
                {application.title}
              </p>
              <p className="font-mono font-medium text-gray-900" style={label()}>
                {application.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
