// ---------------------------------------------------------------------------
// CaseStudyGoal: the AI Assistant's "// Project Goal" block (Figma
// "Frame 2147229498", 716:7134). Set in Inter.
//
// FIGMA (1920): a 1052px block at x 434 (content starts 11px in):
//   label      "// Project Goal", Light 24
//   statement  32px below, 36/53; light runs at 60% black, bold-ish runs
//              (Regular) in full black
//   rule       1px black at 20%, at y 400 of the block
//   meta       four labels (Regular 16, 60% black, uppercase), a "ruler" of
//              1px ticks every 9px (30% black, four darker ticks under the
//              labels) and the four values (Regular 20/27)
//   chips      four outlined chips at y 761, starting at the block's own
//              left edge (11px left of the text) (0.5px black at 40%, radius 8,
//              padding 16 / 31, Regular 20 at 80% black, 25px apart)
// The meta labels and values sit at fixed spots along the ruler in Figma
// (PROJECT at 4, INDUSTRY 256, TIME 625, LOCATION right-aligned), which are
// kept as percentages of the 1007px ruler. Below xl the meta becomes a
// simple two-column list without the ruler.
// ---------------------------------------------------------------------------
import { cn } from "@/lib/utils/cn";
import type { CaseStudyGoalBlock } from "@/types/case-study";

// x positions in the 1007px meta row: [label, value] per column; the last
// column is right-aligned in Figma.
const META_X: [number, number][] = [
  [4, 0],
  [256, 246],
  [625, 580],
];
const TICKS = [4, 292, 643, 1003];
const pct = (px: number) => `${((px / 1007) * 100).toFixed(4)}%`;

export function CaseStudyGoal({ block }: { block: CaseStudyGoalBlock }) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-5 md:px-10 xl:px-0">
      <div className="font-inter text-black xl:ml-[22.6042%] xl:w-[54.7917%] xl:pl-[11px]">
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="text-[length:clamp(1.125rem,1rem+0.4vw,1.5rem)] font-light leading-[1.2]">{block.label}</p>
          <p className="text-[length:clamp(1.5rem,1.2rem+0.95vw,2.25rem)] leading-[1.4722]">
            {block.statement.map((run, i) => (
              <span key={i} className={run.tone === "muted" ? "font-light text-black/60" : "font-normal"}>
                {run.text}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-12 h-px w-full bg-black/20 xl:mt-[127px] xl:max-w-[1007px]" />

        {/* Mobile / tablet: label + value pairs. */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 xl:hidden">
          {block.meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="text-sm text-black/60">{item.label}</dt>
              <dd className="text-lg leading-[1.35]">{item.value}</dd>
            </div>
          ))}
        </dl>

        {/* Desktop: labels, ruler and values placed as in Figma. */}
        <dl className="relative mt-10 hidden h-[279px] max-w-[1007px] xl:block">
          {block.meta.map((item, i) => {
            const last = i === block.meta.length - 1;
            const [labelX, valueX] = META_X[i] ?? [0, 0];
            return (
              <div key={item.label}>
                <dt
                  className={cn("absolute text-base leading-[1.2] text-black/60", last ? "right-0 top-0" : "top-3")}
                  style={last ? undefined : { left: pct(labelX) }}
                >
                  {item.label}
                </dt>
                <dd
                  className={cn(
                    "absolute w-[18.8679%] text-xl leading-[1.35]",
                    last ? "right-0 top-[130px] text-right" : i === 0 ? "top-[125px] leading-[1.2]" : "top-[130px]",
                  )}
                  style={last ? undefined : { left: pct(valueX) }}
                >
                  {item.value}
                </dd>
              </div>
            );
          })}
          <div
            aria-hidden="true"
            className="absolute top-[50px] h-14"
            style={{
              left: pct(4),
              width: pct(1000),
              backgroundImage: "repeating-linear-gradient(to right, rgba(0,0,0,0.3) 0 1px, transparent 1px 9px)",
            }}
          />
          {TICKS.map((x) => (
            <span aria-hidden="true" key={x} className="absolute top-[50px] h-14 w-px bg-black/90" style={{ left: pct(x) }} />
          ))}
        </dl>

        <ul className="mt-10 flex flex-wrap gap-3 md:gap-[25px] xl:-ml-[11px] xl:mt-[41px]">
          {block.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-lg border-[0.5px] border-black/40 px-5 py-3 text-base leading-6 text-black/80 md:px-[31px] md:py-4 md:text-xl md:leading-6"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
