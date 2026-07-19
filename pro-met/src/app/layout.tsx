import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRO-MET | Obróbka Skrawaniem CNC, Kotwy Budowlane i Sprzęt Fitness",
  description:
    "PRO-MET Siennica (Nowe Zalesie 14) - precyzyjna obróbka skrawaniem CNC (toczenie, frezowanie, szlifowanie, wiercenie). Produkcja atestowanych kotew budowlanych S235JR, hantli fitness premium 5-70kg oraz kotwic marynistycznych. Poznaj naszą ofertę.",
  metadataBase: new URL("https://www.pro-met.com.pl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PRO-MET | Obróbka Skrawaniem CNC i Gotowe Wyroby Stalowe",
    description:
      "Precyzyjny park obróbczy CNC w Siennicy koło Mińska Mazowieckiego. Atestowane kotwy do murłat, gumowany sprzęt fitness (tolerancja 50g) oraz kotwice do łodzi.",
    url: "https://www.pro-met.com.pl",
    siteName: "PRO-MET",
    images: [
      {
        url: "/images/hero_cnc.png",
        width: 1200,
        height: 630,
        alt: "PRO-MET Obróbka CNC",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090B] text-zinc-300 font-sans">
        <Navbar />
        <main className="flex-grow pt-16 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
