"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { Zap, ArrowRight } from "lucide-react";

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="relative overflow-hidden bg-carbon text-pearl"
    >
      {/* Background layers */}
      {/* Top-right radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-taillight-red/30 to-transparent pointer-events-none" />
      
      {/* Carbon fiber pattern */}
      <div className="absolute inset-0 bg-carbon-fiber opacity-[0.06] pointer-events-none" />
      
      {/* Animated gradient splitter */}
      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-trim-silver/20 via-trim-silver/60 to-taillight-red"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 2,
            ease: "easeOut" as const,
            delay: 0.5
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 lg:pt-32 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
      >
        {/* Left Column */}
        <div className="lg:col-span-6">
          <motion.div 
            variants={itemVariants}
            className="font-saira text-3xl/tight md:text-4xl lg:text-5xl font-bold text-pearl leading-tight"
          >
            <div className="space-y-2">
              <div>
                <BlurredStagger text="Sell Your Car Today — Get" className="text-pearl" />
              </div>
              <div>
                <BlurredStagger text="Up to 20% More" className="text-desert-gold" />
              </div>
              <div>
                <BlurredStagger text="with Instant Crypto Payout" className="text-pearl" />
              </div>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="mt-5 text-slate-400 max-w-xl text-lg leading-relaxed"
          >
            We buy any car across the UAE and pay in USDT/USDC/BTC/ETH within minutes. 
            Free online valuation. Paperwork handled.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button 
              size="lg" 
              className={`bg-taillight-red hover:bg-taillight-red/90 text-white border-0 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${!shouldReduceMotion ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}
              data-analytics="hero" 
              data-cta="crypto-offer"
              asChild
            >
              <a href="/valuation" className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Get My Crypto Offer
              </a>
            </Button>
            <Button 
              size="lg" 
              className={`bg-white hover:bg-gray-100 text-gray-700 border-0 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${!shouldReduceMotion ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}
              data-cta="how-it-works"
              asChild
            >
              <a href="#how-it-works" className="flex items-center">
                How It Works
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* Trust Strip */}
          <motion.div 
            variants={itemVariants}
            className="mt-5 text-sm text-slate-400"
          >
            20k+ sellers · 30+ partners · Same-day payout
          </motion.div>

          {/* Disclaimer */}
          <motion.div 
            variants={itemVariants}
            className="mt-3 text-xs text-slate-400/90 max-w-xl"
          >
            KYC required under UAE AML/CFT. Final price after quick inspection. 
            Network fees apply. Rate lock 15 min.
          </motion.div>

          {/* Crypto Coin Chips */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-wrap gap-2"
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
        </div>

        {/* Right Column - Car Image */}
        <motion.div 
          variants={imageVariants}
          className="lg:col-span-6 relative"
        >
          <div className="relative">
            <img 
              src="/images/mercedes-hero.png" 
              alt="Mercedes-Benz S-Class AMG luxury sedan" 
              width={600}
              height={400}
              className="w-full rounded-2xl shadow-xl object-cover aspect-[3/2]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export { Hero };