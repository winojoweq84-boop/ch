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

export default function Home() {
  return (
    <div className="min-h-screen bg-carbon">
      <Header />
      <main className="pb-20 md:pb-0">
        <div className="section-desktop-pad">
          <HeroDirectLux />
        </div>
        <div className="section-desktop-pad">
          <WhoWeAre />
        </div>
        <div className="section-desktop-pad section-desktop-gap">
          <VideoSection />
        </div>
        <div className="section-desktop-pad">
          <Steps />
        </div>
        <div className="section-desktop-pad">
          <WhyChooseUs />
        </div>
        <div className="section-desktop-pad">
          <Reviews />
        </div>
        <div className="section-desktop-pad">
          <ValuationFormSection />
        </div>
        <div className="section-desktop-pad">
          <FAQ />
        </div>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}