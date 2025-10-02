import type { Metadata } from "next";
import { Inter, Saira_Semi_Condensed, Tajawal } from "next/font/google";
import "./globals.css";
import { getPrefixedUrl } from "@/lib/prefix";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const saira = Saira_Semi_Condensed({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-saira",
});

const tajawal = Tajawal({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Sell Your Luxury Car in the UAE | CarVault — Instant Transfer Payout",
  description: "Direct buyout of premium cars in the UAE. Real market pricing, no middleman, and instant transfer payout. Licensed UAE business with same-day service.",
  keywords: "sell luxury car UAE, premium car buyout, instant transfer payout, Dubai, Abu Dhabi, car valuation, same-day payout",
  authors: [{ name: "CarVault UAE" }],
  openGraph: {
    title: "Sell Your Luxury Car in the UAE | CarVault — Instant Transfer Payout",
    description: "Direct buyout of premium cars in the UAE. Real market pricing, no middleman, and instant transfer payout. Licensed UAE business with same-day service.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preload" as="video" href={getPrefixedUrl("/videos/intro.mp4")} />
      </head>
      <body className={`min-h-screen bg-carbon text-pearl antialiased ${inter.variable} ${saira.variable} ${tajawal.variable}`}>
        {children}
      </body>
    </html>
  );
}
