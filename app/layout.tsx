import type { Metadata } from "next";
import { Archivo_Black, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PageAnimations } from "@/components/page-animations";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "HashVault Systems LLP",
  description:
    "Practitioner-led cybersecurity training for engineering colleges and corporate teams. Hands-on workshops, live lab environments, and structured assessments.",
  url: "https://hashvaultsystems.com",
  email: "contact@hashvaultsystems.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "State",
    name: "Karnataka",
  },
  knowsAbout: [
    "Cybersecurity Training",
    "Ethical Hacking Workshops",
    "Web Application Security",
    "Cloud Security",
    "Capture The Flag (CTF)",
  ],
  priceRange: "Contact for pricing",
};

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-brutal",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "HashVault | Security Training for Teams That Need Real Readiness",
  description:
    "HashVault designs hands-on cybersecurity programs, live lab environments, and practitioner-led workshops for universities and technical teams.",
  keywords: [
    "cybersecurity training",
    "live-fire workshops",
    "security labs",
    "red team education",
    "university cybersecurity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark root">
      <body
        className={`${geistMono.variable} ${archivoBlack.variable} min-h-screen antialiased`}
      >
        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <PageAnimations />
        {/* Google Analytics GA4 — only loaded when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
