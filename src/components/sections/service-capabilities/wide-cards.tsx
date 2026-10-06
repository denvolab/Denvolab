// MVP page: "From first hypothesis to a product worth testing." Figma node
// 701:15108 (component "Service / Capability / 896"). Eyebrow + title, then
// rows of two 896px cards (48px apart, rows 64px apart). Cards alternate
// between the Brand/50 tint and grey, and sit on a white 72px icon tile
// with a 48px glyph. One card in Figma ("Feature prioritization") uses the
// smaller 56px tile and is 16px shorter; that is kept as designed
// (`iconSize` in the data).
import { ServiceIconTile } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils/cn";
import type { CapabilitiesWideCards } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

export function WideCards({ block }: { block: CapabilitiesWideCards }) {
  return (
    <div className="flex flex-col gap-6 md:gap-16">
      <div className="mb-4 flex flex-col gap-6 md:mb-0">
        <p className="font-mono text-label-md text-text-secondary">{block.eyebrow}</p>
        <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>
      </div>

      {chunk(block.items, 2).map((row, r) => (
        // Two cards per row from md (stretched to the same height below xl,
        // top-aligned from xl as in Figma); stacked on phones.
        <div key={r} className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8 xl:items-start xl:gap-12">
          {row.map((item) => (
            <article
              key={item.title}
              className={cn(
                "flex w-full min-w-0 flex-col gap-10 rounded-3xl p-6 md:flex-1 md:p-10 xl:max-w-[896px] xl:gap-16",
                item.tone === "brand" ? "bg-brand-50" : "bg-surface-secondary",
              )}
            >
              <ServiceIconTile
                name={item.icon}
                size={item.iconSize}
                glyphSize={item.iconSize === 72 ? 48 : 32}
                className="bg-white"
              />
              <div className="flex flex-col gap-4">
                <h3 className="font-sans text-heading-3 text-text-primary">{item.title}</h3>
                <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{item.description}</AnimatedText></p>
              </div>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
