"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CarFront, ClipboardCheck, Wallet, Zap } from "lucide-react";
import { getAssetPath } from "@/lib/basepath";

// Step data with icons and content
const STEPS = [
  {
    id: 1,
    icon: CarFront,
    title: "Instant Valuation",
    description: "Share year, model, km."
  },
  {
    id: 2,
    icon: ClipboardCheck,
    title: "Online Inspection",
    description: "Walk-around video, VIN & odometer."
  },
  {
    id: 3,
    icon: Wallet,
    title: "Payout & Pickup",
    description: "Instant crypto or cash; we collect."
  }
];

// Individual Step Card Component
function StepCard({ step, index }: { step: typeof STEPS[0], index: number }) {
  const IconComponent = step.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.6,
        ease: "easeOut"
      }}
      className="relative group"
      data-analytics="steps"
      data-step={step.id}
      aria-label={`Step ${step.id}: ${step.title}`}
    >
      {/* Ghost Numeral */}
      <div className="absolute -top-12 -left-12 lg:-top-20 lg:-left-20 pointer-events-none">
        <div 
          className="text-[6rem] sm:text-[8rem] lg:text-[10rem] font-bold leading-none select-none"
          style={{ 
            WebkitTextStroke: '3px rgba(201,209,217,0.6)', 
            color: 'transparent',
            fontFamily: 'Saira SemiCondensed, sans-serif'
          }}
        >
          {String(step.id).padStart(2, '0')}
        </div>
      </div>

      {/* Card */}
      <div className="relative bg-asphalt/10 backdrop-blur-sm rounded-2xl ring-1 ring-trim-silver/15 shadow-xl p-6 lg:p-8 hover:bg-asphalt/25 transition-all duration-300 group-hover:shadow-2xl">
        {/* Icon Tile */}
        <div className="relative mb-6">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-asphalt to-carbon ring-1 ring-trim-silver/25 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <IconComponent 
              className="w-8 h-8 lg:w-10 lg:h-10 text-trim-silver" 
              aria-hidden="true" 
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-saira text-xl lg:text-2xl font-bold text-pearl leading-tight">
            {step.title}
          </h3>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed line-clamp-3">
            {step.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

// Main Steps Component
export default function Steps() {
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

  return (
    <section 
      id="how-it-works" 
      data-testid="steps-section"
      data-analytics="steps"
      className="relative bg-carbon text-pearl py-12 lg:py-16"
    >
      {/* Background texture */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-[0.03]"
        style={{ backgroundImage: `url(${getAssetPath('/images/patterns/grille-hex.svg')})` }} 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Main Heading */}
          <motion.h2 
            variants={itemVariants}
            className="font-saira text-4xl/tight md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-pearl">How CarVault Works</span>
          </motion.h2>

          {/* Caption */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto"
          >
            Fast, fair, and stress-free across the UAE.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-10 flex justify-center"
        >
          <a
            href="#offer-form"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-taillight-red hover:bg-taillight-red/90 transition-colors text-base font-semibold text-white animate-taillight-pulse"
            aria-label="Get My Offer"
            data-cta="get_my_offer_steps"
          >
            <Zap className="w-4 h-4 mr-2" />
            Get My Offer
          </a>
        </motion.div>
      </div>
    </section>
  );
}
