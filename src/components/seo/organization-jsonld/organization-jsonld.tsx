// ---------------------------------------------------------------------------
// Organization structured data (schema.org/JSON-LD) — rendered once in the
// root layout so every page carries it. Helps search engines attach the
// logo, name and social profiles to the Denvo Lab brand entity.
// ---------------------------------------------------------------------------
import { siteConfig } from "@/lib/seo/site-config";
import { JsonLd } from "@/components/seo/json-ld";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@type": "Organization",
        name: siteConfig.legalName,
        url: siteConfig.url,
        logo: new URL("/images/home/lockup.svg", siteConfig.url).toString(),
        description: siteConfig.description,
        email: siteConfig.email,
        sameAs: Object.values(siteConfig.socials),
      }}
    />
  );
}
