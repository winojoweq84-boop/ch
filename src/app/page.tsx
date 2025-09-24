import { Header } from "@/components/layout/header";
import HeroDirectLux from "@/components/ui/hero-direct-lux";
import { ValuationFormSection } from "@/components/sections/valuation-form";
import WhoWeAre from "@/components/sections/who-we-are";
<<<<<<< HEAD
import VideoSectionRich from "@/components/sections/VideoSectionRich";
=======
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
import Steps from "@/components/sections/steps";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Reviews from "@/components/sections/reviews";
import FAQ from "@/components/sections/faq";
<<<<<<< HEAD
import Footer from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import StickyVideo from "@/components/ui/StickyVideo";
=======
import { Footer } from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468

export default function Home() {
  return (
    <div className="min-h-screen bg-carbon">
      <Header />
      <main className="pb-20 md:pb-0">
        <HeroDirectLux />
        <WhoWeAre />
<<<<<<< HEAD
        <VideoSectionRich />
=======
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
        <Steps />
        <WhyChooseUs />
        <Reviews />
        <ValuationFormSection />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
<<<<<<< HEAD
      <StickyVideo watchSectionId="how-it-works" />
=======
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
    </div>
  );
}