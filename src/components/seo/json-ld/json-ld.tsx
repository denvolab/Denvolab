// ---------------------------------------------------------------------------
// JsonLd: structured data for search engines (schema.org), as a
// <script type="application/ld+json">. "<" is escaped so text in the data
// can never close the script tag early.
// ---------------------------------------------------------------------------
import { siteConfig } from "@/lib/seo/site-config";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

/** Breadcrumbs from Home down to the page: [["Services", "/services"], ...]. */
export function breadcrumbs(trail: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absolute(path),
    })),
  };
}

export const organizationRef = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };
export { absolute as absoluteUrl };
