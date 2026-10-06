import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/host-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/frank-ruhl-libre/400.css";
import "@fontsource/frank-ruhl-libre/500.css";
import "@fontsource/frank-ruhl-libre/700.css";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/data/case-study";
import { getCaseStudyPresentation } from "@/lib/data/case-study/presentation";
import { CaseStudyPresentation } from "@/components/sections/case-study-presentation/case-study-presentation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map(slug => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  const presentation = getCaseStudyPresentation(slug);
  if (!study || !presentation) return {};
  return { title: `${study.name} case study`, description: `${presentation.intro.lead ?? ""}${presentation.intro.text}` };
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  const presentation = getCaseStudyPresentation(slug);
  if (!study || !presentation) notFound();
  return <div className="ds-v31 bg-background">
    <CaseStudyPresentation content={presentation} name={study.name} />
  </div>;
}
