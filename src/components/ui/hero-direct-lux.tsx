"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, CheckCircle, FileText, Users } from "lucide-react";

interface HeroDirectLuxProps {
  carImage?: string;
  carImageAlt?: string;
}

export default function HeroDirectLux({ 
  carImage = "/images/783993.png",
  carImageAlt = "Luxury car showcase for sale in UAE with instant crypto payout"
}: HeroDirectLuxProps) {
  // Apply basePath for GitHub Pages
  const basePath = process.env.GITHUB_PAGES === 'true' ? '/car' : '';
  const imageSrc = `${basePath}${carImage}`;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion ? {} : {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const cryptoCoins = ["USDT", "USDC", "BTC", "ETH", "BNB", "SOL"];

  return (
    <section 
      id="hero" 
      data-testid="hero" 
      className="relative overflow-hidden bg-carbon text-pearl no-x-scroll px-safe"
    >

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-none mx-auto px-2 sm:px-4 pt-8 pb-8 lg:pt-12 lg:pb-12 lg:max-w-7xl lg:px-8"
      >
        {/* Mobile: Crypto Badge at Top */}
        <motion.div 
          variants={itemVariants}
          className="lg:hidden flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-taillight-red/20 to-desert-gold/20 rounded-full px-1 py-0.5 ring-1 ring-trim-silver/20">
            <Zap className="h-3 w-3 text-desert-gold" />
            <span className="text-xs font-semibold text-desert-gold">Crypto Payout Today</span>
          </div>
        </motion.div>

        {/* Mobile: Main Title at Top */}
        <motion.h1 
          variants={itemVariants}
          className="lg:hidden font-saira text-3xl/tight sm:text-4xl font-bold text-pearl leading-tight text-center mb-6 px-1"
        >
          <span className="text-desert-gold">We Buy Premium Cars</span> in the UAE — Get Paid in Crypto Today
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Mobile: Image First, Desktop: Copy First */}
          <div className="lg:col-span-6 lg:order-1 order-2 px-1 lg:px-0">
             {/* Desktop: Crypto Payout Badge */}
             <motion.div 
               variants={itemVariants}
               className="hidden lg:inline-flex items-center gap-0.5 bg-gradient-to-r from-taillight-red/20 to-desert-gold/20 rounded-full px-0.5 py-0 ring-1 ring-trim-silver/20 mb-4"
             >
               <Zap className="h-2.5 w-2.5 text-desert-gold" />
               <span className="text-xs font-semibold text-desert-gold">Crypto Payout Today</span>
             </motion.div>

          {/* Desktop: Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="hidden lg:block font-saira text-3xl/tight md:text-4xl lg:text-5xl font-bold text-pearl leading-tight mb-6"
          >
            <span className="text-desert-gold">We Buy Premium Cars</span> in the UAE — Get Paid in Crypto Today
          </motion.h1>

          {/* Subhead */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-sm sm:text-lg leading-relaxed mb-6 lg:mb-8 max-w-full sm:max-w-xl text-center lg:text-left px-1 sm:px-0"
          >
            Direct buyout, no middleman. Real market pricing with transparent offers—and instant crypto payout straight to your wallet.
          </motion.p>

          {/* Crypto Badge Line */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 sm:gap-3 w-full mb-6 lg:mb-8 justify-center lg:justify-start"
          >
            {cryptoCoins.map((coin, index) => (
              <motion.div
                key={coin}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                <Badge
                  variant="outline"
                  className={`border-trim-silver text-pearl transition-all duration-200 ${!shouldReduceMotion ? 'hover:ring-1 hover:ring-desert-gold hover:shadow-[0_0_20px_rgba(215,179,106,0.25)]' : 'hover:ring-1 hover:ring-desert-gold'}`}
                >
                  {coin}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Strip */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 lg:gap-4 mb-6 lg:mb-8 text-sm text-slate-400 justify-center lg:justify-start"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-plate-green" />
              <span>Online inspection — no branch visit needed</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-plate-green" />
              <span>Same-day payout & paperwork</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-plate-green" />
              <span>For locals & expats</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="mt-5 flex w-full flex-col sm:flex-row gap-3 sm:gap-4 mb-6"
          >
            <Button 
              size="lg" 
              className={`w-full lg:w-auto bg-taillight-red hover:bg-taillight-red/90 text-white border-0 rounded-2xl px-8 py-4 lg:py-4 font-semibold transition-all duration-200 text-lg justify-center ${!shouldReduceMotion ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}
              data-analytics="hero" 
              data-cta="get-offer"
              asChild
            >
              <a href="#offer-form" className="flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                Get My Offer
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className={`w-full lg:w-auto bg-transparent hover:bg-trim-silver/10 text-pearl border-trim-silver/30 hover:border-trim-silver/50 rounded-2xl px-8 py-4 lg:py-4 font-semibold transition-all duration-200 text-lg justify-center ${!shouldReduceMotion ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}
              data-cta="how-it-works"
              asChild
            >
              <a href="#how-it-works" className="flex items-center justify-center">
                How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* Compliance Microcopy */}
          <motion.div 
            variants={itemVariants}
            className="text-xs text-slate-400/90 max-w-xl text-center lg:text-left"
          >
            KYC required under UAE AML/CFT. Final price after quick inspection. Network fees may apply. Rate lock applies.
          </motion.div>
        </div>

          {/* Mobile: Image First, Desktop: Image Second */}
          <motion.div 
            variants={imageVariants}
            className="lg:col-span-6 lg:order-2 order-1 relative flex justify-center px-1 lg:px-0"
          >
            <div className="relative w-full max-w-none sm:max-w-md lg:max-w-none">
              <Image 
                src={imageSrc} 
                alt={carImageAlt}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
