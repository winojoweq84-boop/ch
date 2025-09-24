import { Header } from "@/components/layout/header";
import HeroDirectLux from "@/components/ui/hero-direct-lux";
import { ValuationFormSection } from "@/components/sections/valuation-form";
import WhoWeAre from "@/components/sections/who-we-are";
import VideoSectionRich from "@/components/sections/VideoSectionRich";
import Steps from "@/components/sections/steps";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Reviews from "@/components/sections/reviews";
import FAQ from "@/components/sections/faq";
import Footer from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import StickyVideo from "@/components/ui/StickyVideo";

export default function Home() {
  return (
    <div className="min-h-screen bg-carbon">
      <Header />
      <main className="pb-20 md:pb-0">
        <HeroDirectLux />
        <WhoWeAre />
        <VideoSectionRich />
        <Steps />
        <WhyChooseUs />
        <Reviews />
        <ValuationFormSection />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
      <StickyVideo watchSectionId="how-it-works" />
    </div>
  );
}