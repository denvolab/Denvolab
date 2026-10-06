// UI/UX and SaaS pages: title + rows of three grey cards (Figma component
// "Service / Capability / 588"). Card: 40px padding, 72px icon tile, 64px
// to the text. Cards are 32px apart; rows 32px (UI/UX) or 64px (SaaS), from
// the data. On the UI/UX page the cards
// keep their fixed 588px width (the row ends 12px short of the edge, as in
// Figma); on the SaaS page they stretch to share the row (592px each).
import type { CSSProperties } from "react";
import { ServiceIconTile } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils/cn";
import type { CapabilitiesCardGrid } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

export function CardGrid({ block }: { block: CapabilitiesCardGrid }) {
  return (
    <div className="flex flex-col gap-16">
      <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>

      {/* Below xl the row wrappers drop out (display: contents) and the cards
          flow as a 1-column (phones) or 2-column (md) grid. From xl: Figma's
          rows of three, `rowGap` apart. */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:flex xl:flex-col xl:gap-[var(--row-gap)]"
        style={{ "--row-gap": `${block.rowGap}px` } as CSSProperties}
      >
        {chunk(block.items, 3).map((row, r) => (
          <div key={r} className="contents xl:flex xl:flex-row xl:gap-8">
            {row.map((item) => (
              <article
                key={item.title}
                className={cn(
                  "flex min-w-0 flex-1 flex-col gap-10 rounded-3xl bg-surface-secondary p-6 md:p-10 xl:gap-16",
                  !block.stretch && "xl:max-w-[588px]",
                )}
              >
                <ServiceIconTile name={item.icon} size={72} className="bg-secondary-50" />
                {/* Figma's text boxes are a fixed 508px, even in the wider SaaS cards. */}
                <div className="flex max-w-[508px] flex-col gap-4">
                  <h3 className="font-sans text-heading-3 text-text-primary">{item.title}</h3>
                  <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{item.description}</AnimatedText></p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
