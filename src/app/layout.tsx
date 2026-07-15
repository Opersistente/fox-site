import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.foxagencia.com.br"),
  title: {
    default: "Fox Agência de Viagens e Turismo | Fretamento em Blumenau",
    template: "%s | Fox Agência de Viagens e Turismo",
  },
  description:
    "Há quase 30 anos transportando pessoas com segurança, conforto e tranquilidade. Fretamento, excursões, turismo escolar, eventos e viagens corporativas em Blumenau e todo o Brasil.",
  keywords: [
    "fretamento de ônibus Blumenau",
    "agência de turismo Blumenau",
    "excursões Blumenau",
    "transporte corporativo",
    "turismo escolar",
    "Fox Viagens",
  ],
  openGraph: {
    title: "Fox Agência de Viagens e Turismo",
    description:
      "Segurança, conforto e tranquilidade em cada viagem. Fretamento, excursões, eventos e turismo escolar em Blumenau e todo o Brasil.",
    url: "https://www.foxagencia.com.br",
    siteName: "Fox Agência de Viagens e Turismo",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE.name,
  foundingDate: String(SITE.foundingYear),
  url: SITE.url,
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Butantã, 295, Sala 01 – Velha",
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: "BR",
  },
  areaServed: "BR",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${fraunces.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-navy-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
