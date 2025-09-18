import type { Metadata } from "next";
import { Inter, Saira_Semi_Condensed, Tajawal } from "next/font/google";
import "./globals.css";

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
  title: "Sell Your Luxury Car in the UAE | CarVault — Instant Crypto Payout",
  description: "Direct buyout of premium cars in the UAE. Real market pricing, no middleman, and instant crypto payout to your wallet (USDT, USDC, BTC, ETH, BNB, SOL).",
  keywords: "sell luxury car UAE, crypto payment, premium car buyout, instant crypto payout, Dubai, Abu Dhabi, USDT, USDC, BTC, ETH",
  authors: [{ name: "CarVault UAE" }],
  openGraph: {
    title: "Sell Your Luxury Car in the UAE | CarVault — Instant Crypto Payout",
    description: "Direct buyout of premium cars in the UAE. Real market pricing, no middleman, and instant crypto payout to your wallet (USDT, USDC, BTC, ETH, BNB, SOL).",
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
      <body className={`min-h-screen bg-carbon text-pearl antialiased ${inter.variable} ${saira.variable} ${tajawal.variable}`}>
        {children}
      </body>
    </html>
  );
}
