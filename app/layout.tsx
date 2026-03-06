import type { Metadata } from "next";
import { Archivo_Black, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
