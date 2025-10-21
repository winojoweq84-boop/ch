import type { Metadata } from "next";
import { Inter, Saira_Semi_Condensed, Tajawal } from "next/font/google";
import Script from "next/script";
import Image from "next/image";
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
        {/* Google tag (gtag.js) */}
        <Script
          id="gtag-base"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17534484313"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17534484313');
          `}
        </Script>
        
        <link rel="preload" as="video" href={getPrefixedUrl("/videos/intro.mp4")} />
        
        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1281523864018075');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1281523864018075&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`min-h-screen bg-carbon text-pearl antialiased ${inter.variable} ${saira.variable} ${tajawal.variable}`}>
        {children}
      </body>
    </html>
  );
}