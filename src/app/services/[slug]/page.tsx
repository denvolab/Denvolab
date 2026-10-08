import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { notFound } from "next/navigation";
import { getServiceDetail, getServiceDetailSlugs } from "@/lib/data/service-detail";
import type { ServiceDetailBlock } from "@/types/service-detail";
import "./service-detail.css";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceCapabilities } from "@/components/sections/service-capabilities";
import { ServiceBrandStudy } from "@/components/sections/service-brand-study";
import { ServiceProcessNarrative } from "@/components/sections/service-process-narrative";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { ServiceCraftSplit } from "@/components/sections/service-craft-split";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceConversation } from "@/components/sections/service-conversation";
import { ServicePractice } from "@/components/sections/service-practice";
import { ServiceHandover } from "@/components/sections/service-handover";
import { ServiceProcessSteps } from "@/components/sections/service-process-steps";
import { ServiceChecklist } from "@/components/sections/service-checklist";
import { ServicePerspective } from "@/components/sections/service-perspective";
import { JsonLd, breadcrumbs, organizationRef, absoluteUrl } from "@/components/seo/json-ld";

// -----------------------------------------------------------------------------
// Service detail pages (/services/<slug>), one per service, built from the
// Figma "Service Detail / 01-07" frames (section 701:16436). Every page is
// prerendered at build time; an unknown slug is a 404.
//
// A page is its data file's list of blocks (lib/data/service-detail), drawn
// in order, then the shared closing "Let's work. Together" (ContactCta with
// the service-page copy and the Streamline icon credit) and the site footer.
//
// `.ds-v31` switches on the Design System v3.1 details these pages were
// designed with: the optical-size DM Sans, negative Display/Heading
// letter-spacing and the lighter surface/secondary grey (see
// styles/tokens/typography.css and colors.css).
// -----------------------------------------------------------------------------

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getServiceDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = await getServiceDetail(slug);
  if (!page) return {};
  return pageMetadata({ title: page.name, description: page.description, path: `/services/${slug}` });
}

function Block({ block }: { block: ServiceDetailBlock }) {
  switch (block.type) {
    case "hero":
      return <ServiceHero block={block} />;
    case "capabilities":
      return <ServiceCapabilities block={block} />;
    case "brand-study":
      return <ServiceBrandStudy block={block} />;
    case "process-narrative":
      return <ServiceProcessNarrative block={block} />;
    case "showcase":
      return <ServiceShowcase block={block} />;
    case "craft-split":
      return <ServiceCraftSplit block={block} />;
    case "faq":
      return <ServiceFaq block={block} />;
    case "conversation":
      return <ServiceConversation block={block} />;
    case "practice":
      return <ServicePractice block={block} />;
    case "handover":
      return <ServiceHandover block={block} />;
    case "process-steps":
      return <ServiceProcessSteps block={block} />;
    case "checklist":
      return <ServiceChecklist block={block} />;
    case "perspective":
      return <ServicePerspective block={block} />;
  }
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const page = await getServiceDetail(slug);
  if (!page) notFound();

  return (
    <div className="ds-v31 service-detail" data-service-detail={slug}>
      <JsonLd data={{ "@type": "Service", name: page.name, description: page.description, url: absoluteUrl(`/services/${slug}`), provider: organizationRef, areaServed: "Worldwide" }} />
      <JsonLd data={breadcrumbs([["Services", "/services"], [page.name, `/services/${slug}`]])} />
      {page.blocks.map((block, i) => (
        <div key={`${block.type}-${i}`} data-service-block={block.type}><Block block={block} /></div>
      ))}
    </div>
  );
}
