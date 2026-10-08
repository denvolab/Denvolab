import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";
import "@fontsource/frank-ruhl-libre/latin-400.css";
import "@fontsource/frank-ruhl-libre/latin-500.css";
import "@fontsource/frank-ruhl-libre/latin-700.css";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/data/case-study";
import { getCaseStudyPresentation } from "@/lib/data/case-study/presentation";
import { CaseStudyPresentation } from "@/components/sections/case-study-presentation/case-study-presentation";
import { MoreCrafts } from "@/components/sections/more-crafts/more-crafts";
import { JsonLd, breadcrumbs, organizationRef, absoluteUrl } from "@/components/seo/json-ld";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map(slug => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  const presentation = getCaseStudyPresentation(slug);
  if (!study || !presentation) return {};
  return pageMetadata({
    title: `${study.name} case study`,
    description: `${presentation.intro.lead ?? ""}${presentation.intro.text}`,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  const presentation = getCaseStudyPresentation(slug);
  if (!study || !presentation) notFound();
  return <div className="ds-v31 bg-background">
    <JsonLd data={{ "@type": "CreativeWork", name: study.name, headline: presentation.title, description: `${presentation.intro.lead ?? ""}${presentation.intro.text}`, url: absoluteUrl(`/case-studies/${slug}`), creator: organizationRef }} />
    <JsonLd data={breadcrumbs([["Our Craft", "/case-studies"], [study.name, `/case-studies/${slug}`]])} />
    <CaseStudyPresentation content={presentation} name={study.name} />
    <MoreCrafts currentHref={`/case-studies/${slug}`} />
  </div>;
}
