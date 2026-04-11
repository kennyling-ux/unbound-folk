import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const CANONICAL = "https://unboundfolk.com";
const OG_IMAGE = `${CANONICAL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL),
  title: {
    default: "AI Product Photography, Fast & Reliable — Unbound Folk",
    template: "%s — Unbound Folk",
  },
  description:
    "Unbound Folk turns any product photo into a studio-quality gallery in under 5 minutes. AI-powered lifestyle shots, white-bg images & ad-ready exports for e-commerce brands.",
  keywords: [
    "AI product photography", "product images AI", "e-commerce product photos",
    "AI studio photography", "product photo generator", "Shopee product images",
    "Lazada listing photos", "Malaysia product photography", "Unbound Folk",
  ],
  authors: [{ name: "Unbound Folk", url: CANONICAL }],
  creator: "Unbound Folk",
  publisher: "Unbound Folk",
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: "Unbound Folk",
    title: "AI Product Photography, Fast & Reliable — Unbound Folk",
    description:
      "Turn any product photo into a complete studio-quality gallery in under 5 minutes. White-bg, lifestyle & ad-ready — powered by AI.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Unbound Folk — AI Product Photography",
      },
    ],
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Photography, Fast & Reliable — Unbound Folk",
    description:
      "Turn any product photo into a complete studio-quality gallery in under 5 minutes. White-bg, lifestyle & ad-ready — powered by AI.",
    images: [OG_IMAGE],
    creator: "@unboundfolk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/uf-logo.svg",
    shortcut: "/uf-logo.svg",
    apple: "/uf-logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://unboundfolk.com/#website",
      "url": "https://unboundfolk.com",
      "name": "Unbound Folk",
      "description": "AI-powered product photography for e-commerce brands.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://unboundfolk.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://unboundfolk.com/#organization",
      "name": "Unbound Folk",
      "url": "https://unboundfolk.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://unboundfolk.com/uf-logo.svg",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+60-18-986-5212",
        "email": "hello@unboundfolk.com",
        "contactType": "customer support",
        "availableLanguage": ["English", "Malay"],
      },
      "sameAs": [],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://unboundfolk.com/#app",
      "name": "Unbound Folk AI Product Photography",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://unboundfolk.com",
      "description":
        "AI-powered platform that turns any product photo into studio-quality images — white-bg, lifestyle, and ad-ready — in under 5 minutes.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "MYR",
        "description": "First 10 images free, no credit card required.",
      },
      "provider": { "@id": "https://unboundfolk.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
