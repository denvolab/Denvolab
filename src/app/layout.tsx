import { ImageRippleController } from "@/components/motion/image-ripple/image-ripple-controller";
import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/page-transition/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";
import { siteConfig } from "@/lib/seo/site-config";
import { SHARE_IMAGE } from "@/lib/seo/page-metadata";
import { ImageRevealController } from "@/components/motion/image-reveal";
import { TextRevealController } from "@/components/motion/text-reveal/text-reveal-controller";
import { PressController } from "@/components/motion/press/press-controller";
import { SmoothScroll } from "@/components/motion/smooth-scroll/smooth-scroll";
import { WhatsAppChat } from "@/components/ui/whatsapp-chat/whatsapp-chat";

// -----------------------------------------------------------------------------
// Fonts — self-hosted via Fontsource (real font files ship in the npm
// package) rather than `next/font/google`, so the site never depends on a
// runtime request to Google's font CDN. DM Sans is the font for all text
// (body, headings, labels, buttons). DM Mono is used for captions
// (`font-mono text-caption-md`, Regular 400) and for the AI section's
// eyebrow label (Figma: DM Mono Medium), so 400 and 500 are loaded.
// The font-family names these packages register are wired to the
// `--font-sans` / `--font-mono` tokens in globals.css.
//
// Heading font: the Figma file uses "Mona Sans" for the big headings, but
// the site uses DM Sans for headings too (decision of Sept 21, 2026), so the
// `--font-heading` token in typography.css simply points at DM Sans. To use
// a different heading font later: add its font files and an `@font-face` in
// globals.css and point `--font-heading` at it. Every heading already reads
// the token, so nothing else in the app changes.
import "@fontsource-variable/dm-sans";
import "@fontsource/dm-mono/latin-400.css";
import "@fontsource/dm-mono/latin-500.css";
import "./globals.css";
import "lenis/dist/lenis.css";

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
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [SHARE_IMAGE.url],
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">{children}</main>
        <Footer />
        <WhatsAppChat />
        {/* Keep image reveals active. ColorWashController is intentionally
            not mounted: section colors stay fixed across all routes. */}
        <ImageRevealController />
        <TextRevealController />
        <PressController />
        <ImageRippleController />
        <PageTransition />
        <SmoothScroll />
      </body>
    </html>
  );
}
