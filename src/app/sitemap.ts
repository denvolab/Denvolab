// ---------------------------------------------------------------------------
// Generated sitemap.xml. Add a route here as soon as its page ships — this
// list is what search engines use to discover the site's structure.
// ---------------------------------------------------------------------------
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { getServiceDetailSlugs } from "@/lib/data/service-detail";
import { getCaseStudySlugs } from "@/lib/data/case-study";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes = (await getServiceDetailSlugs()).map((slug) => `/services/${slug}`);
  const caseStudyRoutes = (await getCaseStudySlugs()).map((slug) => `/case-studies/${slug}`);
  const routes = ["", "/about", "/services", ...serviceRoutes, "/case-studies", ...caseStudyRoutes, "/contact"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
