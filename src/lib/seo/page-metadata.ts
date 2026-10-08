// ---------------------------------------------------------------------------
// pageMetadata: one call per page for everything search engines and share
// previews read (Oct 8, 2026):
//
//   title / description   the page's own
//   canonical URL         the one address Google should index for the page
//                         (no duplicates from www/non-www or ?query strings)
//   Open Graph / Twitter  the page's own title and description when it is
//                         shared, with the share picture public/og-image.png
//                         (1200x630; set here because a page's own
//                         openGraph replaces the one it would inherit)
//
// Relative paths resolve against metadataBase (siteConfig.url, layout.tsx).
// ---------------------------------------------------------------------------
import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export const SHARE_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Denvo Lab — UI/UX design & development agency",
};

interface PageMetadataInput {
  /** Page title; "| Denvo Lab" is added unless `absolute`. */
  title: string;
  description: string;
  /** Path of the page, e.g. "/services/ui-ux-design" ("/" for home). */
  path: string;
  /** Use `title` exactly as given (the home page). */
  absolute?: boolean;
}

export function pageMetadata({ title, description, path, absolute = false }: PageMetadataInput): Metadata {
  const fullTitle = absolute ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
