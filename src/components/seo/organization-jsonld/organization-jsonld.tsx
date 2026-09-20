// ---------------------------------------------------------------------------
// Organization structured data (schema.org/JSON-LD) — rendered once in the
// root layout so every page carries it. Helps search engines attach the
// logo, name and social profiles to the Denvo Lab brand entity.
// ---------------------------------------------------------------------------
import { siteConfig } from "@/lib/seo/site-config";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.socials),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
