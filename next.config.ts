import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Security headers on every response (Oct 8, 2026, the user: "make it hard to
// hack").
//
// Content-Security-Policy: scripts, styles, frames and connections only from
// this site and Cal.com (the "Book a call" popup, contact/book-call-button).
// 'unsafe-inline' scripts: Next.js streams its page data in inline <script>
// tags, and the JSON-LD block is inline too; nonces would make every page
// dynamic. 'unsafe-eval' only in development (React's dev tools need it).
// Images may come from any https host (next/image only serves our own).
// frame-ancestors 'none' + X-Frame-Options: nobody can show the site inside
// their own page (clickjacking).
// ---------------------------------------------------------------------------
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://app.cal.com https://cal.com`,
  "style-src 'self' 'unsafe-inline' https://app.cal.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://app.cal.com",
  "media-src 'self' blob:",
  "frame-src https://app.cal.com https://cal.com",
  `connect-src 'self' https://app.cal.com https://cal.com https://*.cal.com${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
