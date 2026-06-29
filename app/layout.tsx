import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const CANONICAL = "https://unboundfolk.com";
const OG_IMAGE = `${CANONICAL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL),
  title: {
    default: "Unbound Folk | Creative Content and Intelligent Systems",
    template: "%s — Unbound Folk",
  },
  description:
    "Unbound Folk helps growing businesses in Malaysia create standout visuals, smarter workflows, custom software, AI automation, CRM systems, dashboards, and scalable digital systems.",
  keywords: [
    "creative content design Malaysia",
    "3D product video Malaysia",
    "motion graphics Malaysia",
    "AI content creation Malaysia",
    "custom software development Malaysia",
    "AI workflow automation Malaysia",
    "business automation Malaysia",
    "internal tools for SMEs",
    "CRM system development Malaysia",
    "Unbound Folk",
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
    title: "Unbound Folk | Creative Content and Intelligent Systems",
    description:
      "A creative studio and AI systems partner for growing businesses that need better content, smarter workflows, and scalable digital infrastructure.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Unbound Folk creative content and intelligent systems",
      },
    ],
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unbound Folk | Creative Content and Intelligent Systems",
    description:
      "Creative content, custom software, AI workflow automation, CRM systems, dashboards, and internal tools for growing businesses.",
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
      "description": "Creative content and intelligent systems for growing businesses in Malaysia.",
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
      "@type": "ProfessionalService",
      "@id": "https://unboundfolk.com/#service",
      "name": "Unbound Folk Creative Solutions and Intelligent Systems",
      "areaServed": "Malaysia",
      "url": "https://unboundfolk.com",
      "description": "Creative content design, 3D product visuals, motion graphics, AI content creation, custom software development, CRM systems, internal tools, dashboards, and business automation.",
      "serviceType": ["Creative Solutions", "Intelligent Systems", "AI workflow automation", "Custom software development"],
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
    <html lang="en" className={dmSans.variable}>
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
