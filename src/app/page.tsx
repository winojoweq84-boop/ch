"use client";

import { useEffect } from "react";
import Header from "@/components/layout/header";
import HeroDirectLux from "@/components/ui/hero-direct-lux";
import { ValuationFormSection } from "@/components/sections/valuation-form";
import WhoWeAre from "@/components/sections/who-we-are";
import VideoSection from "@/components/sections/VideoSection";
import Steps from "@/components/sections/steps";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Reviews from "@/components/sections/reviews";
import FAQ from "@/components/sections/faq";
import Footer from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import { trackViewContent } from "@/lib/facebook-pixel";

export default function Home() {
  useEffect(() => {
    // Track page view with custom content data
    trackViewContent({
      content_name: 'Car Valuation Home Page',
      content_category: 'Car Valuation',
      content_type: 'homepage',
      page_url: window.location.href,
      page_title: document.title,
    });
  }, []);

  return (
    <div className="min-h-screen bg-carbon">
      <Header />
      <main className="pb-20 md:pb-0">
        <HeroDirectLux />
        <WhoWeAre />
        <VideoSection />
        <Steps />
        <WhyChooseUs />
        <Reviews />
        <ValuationFormSection />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}