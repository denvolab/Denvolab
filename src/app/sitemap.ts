// ---------------------------------------------------------------------------
// Generated sitemap.xml. Add a route here as soon as its page ships — this
// list is what search engines use to discover the site's structure.
// ---------------------------------------------------------------------------
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/case-studies", "/contact"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
