import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";
import { siteConfig } from "@/lib/seo/site-config";

// -----------------------------------------------------------------------------
// Fonts — self-hosted via Fontsource (real font files ship in the npm
// package) rather than `next/font/google`, so the site never depends on a
// runtime request to Google's font CDN. DM Sans / DM Mono match the Figma
// source exactly; the font-family names these packages register are wired
// to the `--font-sans` / `--font-mono` tokens in globals.css.
//
// Heading font: the source uses "Mona Sans" (GitHub's OFL display face),
// which isn't on Google Fonts / Fontsource and has no trustworthy npm
// distribution — pulling in an unverified package for a licensed brand font
// is worse than a temporary stand-in. "Sora" fills in with a near-identical
// geometric grotesk feel via the `--font-heading` token. To switch to the
// real font: drop the Mona Sans variable woff2 at
// src/app/fonts/mona-sans.woff2, point `--font-heading` at an `@font-face`
// for it in globals.css, and remove the Sora import below — every heading
// already reads the token, so nothing else in the app changes.
import "@fontsource-variable/dm-sans";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "@fontsource-variable/sora";
import "./globals.css";

// -----------------------------------------------------------------------------
// Site-wide metadata — per-page titles compose into "<page> | Denvo Lab" via
// the `template`. Individual routes only need to set `title`.
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
