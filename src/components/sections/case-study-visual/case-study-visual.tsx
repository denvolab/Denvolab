// ---------------------------------------------------------------------------
// CaseStudyVisual: diagram-like bands on the AI Assistant and My Crew pages
// (design process wheel, user research rings, type and colour specimens,
// project timeline).
//
// From xl the band is the Figma artwork itself, exported at 1920px, so the
// rotated petals, rings, glass swatches and SF Pro lettering look exactly as
// designed. Below xl that artwork would shrink to unreadable sizes, so the
// same content is laid out as real text instead: phases as cards, research
// numbers as a list, the specimen as font name + notes + colour chips.
// The text version stays in the page at every size (visually hidden from xl)
// so screen readers and search engines always get real text; the artwork
// itself is decorative.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CaseStudyTextRun, CaseStudyVisualBlock, CaseStudyVisualContent } from "@/types/case-study";

const GRADIENT = "bg-gradient-to-r from-[#ff8d13] to-[#8c22f5] bg-clip-text text-transparent";

function Runs({ runs }: { runs: CaseStudyTextRun[] }) {
  return runs.map((run, i) => (
    <span
      key={i}
      className={cn(run.tone === "muted" && "text-gray-950/60", run.tone === "gradient" && GRADIENT)}
    >
      {run.text}
    </span>
  ));
}

function Content({ content }: { content: CaseStudyVisualContent }) {
  switch (content.kind) {
    case "phases":
      return (
        <ol className="grid gap-4 md:grid-cols-2">
          {content.phases.map((phase) => (
            <li key={phase.badge} className="flex flex-col gap-4 rounded-[20px] bg-gray-50 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-950 px-4 py-1.5 font-inter text-sm text-white">{phase.badge}</span>
                {phase.detail && (
                  <span className="rounded-full border border-[#b773fa] bg-[#8c22f5]/10 px-4 py-1.5 font-inter text-sm wash-ink [--ink:#312f33]">
                    {phase.detail}
                  </span>
                )}
              </div>
              <h3 className="font-sans text-heading-3 text-gray-950">{phase.title}</h3>
              <ul className="flex flex-col gap-2">
                {phase.items.map((item) => (
                  <li key={item} className="font-inter text-base font-light text-gray-950">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      );
    case "stats":
      return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <p className="flex size-40 shrink-0 items-center justify-center self-center rounded-full bg-[#a855f7] p-6 text-center font-inter text-2xl text-white md:size-48">
            {content.centre}
          </p>
          <dl className="flex flex-1 flex-col divide-y divide-gray-200">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between gap-4 py-4">
                <dt className="font-inter text-base text-gray-700">{stat.label}</dt>
                <dd className="font-inter text-3xl wash-ink [--ink:#7e22ce]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "specimen":
      return (
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-1 text-lg wash-ink [--ink:#5f5666]" style={{ fontFamily: content.fontFamily }}>
            {content.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-gray-950" style={{ fontFamily: content.fontFamily }}>
            {content.weights.map((weight, i) => (
              <li key={weight} style={{ fontWeight: [300, 400, 500, 600, 700][Math.min(i, 4)] }}>
                {weight}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {content.colors.map((color) => (
              <li key={color.hex} className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <span
                  aria-hidden="true"
                  className="size-12 shrink-0 rounded-xl border border-gray-200"
                  style={{ background: color.hex }}
                />
                <span className="flex flex-col">
                  <span className="font-inter text-sm text-gray-600">{color.name}</span>
                  <span className="font-inter text-base text-gray-950">{color.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export function CaseStudyVisual({ block }: { block: CaseStudyVisualBlock }) {
  const specimenFont = block.content.kind === "specimen" ? block.content.fontFamily : undefined;

  return (
    <section className="mx-auto w-full max-w-[1920px]">
      <div className="flex flex-col gap-6 px-5 py-12 md:gap-8 md:px-10 md:py-16 xl:sr-only">
        <div className="flex flex-col gap-3">
          {block.eyebrow && (
            <p className="flex items-center gap-2 font-sf text-base font-medium">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-gradient-to-r from-[#ff8d13] to-[#8c22f5]" />
              <span className={GRADIENT}>{block.eyebrow}</span>
            </p>
          )}
          <h2
            className={cn(
              "text-gray-950",
              specimenFont ? "text-[length:clamp(3rem,2rem+4vw,5rem)] font-semibold leading-none" : "font-sans text-display-xl",
            )}
            style={specimenFont ? { fontFamily: specimenFont } : undefined}
          >
            <Runs runs={block.title} />
          </h2>
          {block.subtitle && (
            <p className="font-sans text-heading-2 text-gray-950/80">
              <Runs runs={block.subtitle} />
            </p>
          )}
        </div>
        <Content content={block.content} />
      </div>

      <div
        aria-hidden="true"
        data-image-reveal=""
        className="relative hidden w-full xl:block"
        style={{ aspectRatio: `${block.image.width} / ${block.image.height}` }}
      >
        <Image src={block.image.src} alt="" fill sizes="(min-width: 1920px) 1920px, 100vw" className="object-cover" />
      </div>
    </section>
  );
}
