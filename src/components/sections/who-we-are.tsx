"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { Handshake, Building2, Smile, CheckCircle2 } from "lucide-react";

export default function WhoWeAre() {
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
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion ? {} : {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      id="who-we-are" 
      data-testid="who-section" 
      data-analytics="who"
      className="relative bg-carbon text-pearl"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* LEFT: IMAGE (lg:col-span-6) */}
        <motion.figure 
          variants={imageVariants}
          className="order-1 lg:order-none lg:col-span-6 relative"
        >
          <Image
            src="/images/mercedes-hero.png"
            alt="Mercedes-Benz S-Class AMG luxury sedan at CarVault"
            width={600}
            height={400}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="w-full rounded-2xl shadow-xl ring-1 ring-trim-silver/20 object-cover aspect-[3/2]"
          />
          {/* Subtle highlight overlay + taillight edge */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-taillight-red/10 via-transparent to-transparent" />
        </motion.figure>

        {/* RIGHT: CONTENT (lg:col-span-6) */}
        <div className="lg:col-span-6">
          {/* Eyebrow/Title */}
          <motion.div 
            variants={itemVariants}
            className="font-saira text-4xl/tight md:text-5xl font-bold text-center lg:text-left"
          >
            <div className="flex items-baseline justify-center lg:justify-start">
              <BlurredStagger text="Who We Are — " className="text-pearl" />
              <span className="text-desert-gold">
                <BlurredStagger text="Car Vault" className="text-desert-gold" />
              </span>
            </div>
          </motion.div>

          {/* Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-slate-400 max-w-2xl"
          >
            Dubai-based, 15 years buying premium cars. We buy direct (no middleman), price at real market value, and settle same day—crypto to your wallet or cash. Paperwork handled across all emirates. We offer full online inspection so you never need to visit a branch.
          </motion.p>

          {/* 2×2 Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
            {/* 15+ Years */}
            <div className="flex items-center gap-4 rounded-2xl bg-asphalt/60 ring-1 ring-trim-silver/15 p-4 md:p-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-asphalt to-carbon ring-1 ring-trim-silver/20 shadow-md grid place-content-center">
                <Handshake className="h-5 w-5 md:h-6 md:w-6 text-trim-silver" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base md:text-lg font-semibold text-pearl">15+ Years</div>
                <div className="text-xs md:text-sm leading-tight opacity-70 text-slate-400">Since 2009 in Dubai.</div>
              </div>
            </div>

            {/* Direct Buyout */}
            <div className="flex items-center gap-4 rounded-2xl bg-asphalt/60 ring-1 ring-trim-silver/15 p-4 md:p-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-asphalt to-carbon ring-1 ring-trim-silver/20 shadow-md grid place-content-center">
                <Building2 className="h-5 w-5 md:h-6 md:w-6 text-trim-silver" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base md:text-lg font-semibold text-pearl">Direct Buyout</div>
                <div className="text-xs md:text-sm leading-tight opacity-70 text-slate-400">No listings. No auctions.</div>
              </div>
            </div>

            {/* Instant Crypto */}
            <div className="flex items-center gap-4 rounded-2xl bg-asphalt/60 ring-1 ring-trim-silver/15 p-4 md:p-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-asphalt to-carbon ring-1 ring-trim-silver/20 shadow-md grid place-content-center">
                <Smile className="h-5 w-5 md:h-6 md:w-6 text-trim-silver" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base md:text-lg font-semibold text-pearl">Instant Crypto</div>
                <div className="text-xs md:text-sm leading-tight opacity-70 text-slate-400">USDT/USDC/BTC/ETH.</div>
              </div>
            </div>

            {/* 30-Min Inspection */}
            <div className="flex items-center gap-4 rounded-2xl bg-asphalt/60 ring-1 ring-trim-silver/15 p-4 md:p-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-asphalt to-carbon ring-1 ring-trim-silver/20 shadow-md grid place-content-center">
                <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-trim-silver" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base md:text-lg font-semibold text-pearl">30-Min Inspection</div>
                <div className="text-xs md:text-sm leading-tight opacity-70 text-slate-400">On-site across UAE.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background texture (very subtle) */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_20%_10%,#000_40%,transparent_100%)] bg-[url('/images/patterns/grille-hex.svg')] opacity-[0.06]" 
      />
    </section>
  );
}
