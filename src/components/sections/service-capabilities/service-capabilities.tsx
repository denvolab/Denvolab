// ---------------------------------------------------------------------------
// ServiceCapabilities: the "what we do" section of a service detail page
// (Figma "Capabilities / <service>"). Server Component.
//
// Each of the seven pages lays this section out differently, so the data
// names a `layout` and this file picks the matching component. All of them
// share the section frame: white, 96px top/bottom, 40px sides, max 1920.
//
//   editorial-list  Branding   title + principles card, icon rows
//   card-grid       UI/UX, SaaS  rows of three grey cards
//   anatomy         Mobile app  before / picture / after columns
//   indexed-grid    Web         3-column grid with index numbers
//   wide-cards      MVP         rows of two large tinted cards
//   list-feature    AI agent    icon rows + picture card
// ---------------------------------------------------------------------------
import type { ServiceCapabilitiesBlock } from "@/types/service-detail";
import { Anatomy } from "./anatomy";
import { CardGrid } from "./card-grid";
import { EditorialList } from "./editorial-list";
import { IndexedGrid } from "./indexed-grid";
import { ListFeature } from "./list-feature";
import { WideCards } from "./wide-cards";

function Layout({ block }: { block: ServiceCapabilitiesBlock }) {
  switch (block.layout) {
    case "editorial-list":
      return <EditorialList block={block} />;
    case "card-grid":
      return <CardGrid block={block} />;
    case "anatomy":
      return <Anatomy block={block} />;
    case "indexed-grid":
      return <IndexedGrid block={block} />;
    case "wide-cards":
      return <WideCards block={block} />;
    case "list-feature":
      return <ListFeature block={block} />;
  }
}

export function ServiceCapabilities({ block }: { block: ServiceCapabilitiesBlock }) {
  return (
    <section className="w-full bg-surface-primary">
      <div className="mx-auto w-full max-w-[1920px] px-5 py-16 md:px-10 xl:py-24">
        <Layout block={block} />
      </div>
    </section>
  );
}
