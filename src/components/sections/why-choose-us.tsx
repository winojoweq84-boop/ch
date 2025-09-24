"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/basepath";

// Feature data
const FEATURES = [
  {
    id: 1,
    badge: "Online Inspection", 
    title: "No branch visit needed",
    description: "Complete your car inspection online with video walk-around. No need to visit any branch - we handle everything remotely.",
    icon: Clock,
    image: "/images/nano-banana-2025-09-22T13-00-51.png"
  }
];

// Individual Feature Component
function FeatureCard({ feature, index }: { feature: typeof FEATURES[0], index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = feature.icon;
  
  // Apply basePath for GitHub Pages
  const basePath = process.env.GITHUB_PAGES === 'true' ? '/car' : '';
  const imageSrc = `${basePath}${feature.image}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
        delayChildren: index * 0.2,
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
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (index % 2 === 0 ? -30 : 30) },
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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col gap-8 lg:gap-12 lg:items-center ${
          index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row'
        }`}>
          {/* Image */}
          <motion.div 
            variants={imageVariants}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <Image 
                src={imageSrc}
                alt={`${feature.title} - CarVault`}
                width={600}
                height={400}
                className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3]"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-taillight-red/10 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div>
              <Badge className="bg-taillight-red/10 text-taillight-red border-taillight-red/20 hover:bg-taillight-red/20">
                {feature.badge}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-asphalt to-carbon ring-1 ring-trim-silver/25 shadow-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-trim-silver" />
                </div>
                <h2 className="font-saira text-3xl md:text-4xl lg:text-5xl font-bold text-pearl tracking-tight">
                  {feature.title}
                </h2>
              </div>
              
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                {feature.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Main Why Choose Us Component
export default function WhyChooseUs() {
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
      id="why-choose-us" 
      data-testid="why-choose-us-section"
      data-analytics="why-choose-us"
      className="relative bg-carbon text-pearl"
    >
      {/* Background texture */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-[0.03]"
        style={{ backgroundImage: `url(${getAssetPath('/images/patterns/grille-hex.svg')})` }} 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="pt-12 lg:pt-16"
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12 lg:mb-16">
          <motion.div variants={itemVariants}>
            <Badge className="bg-desert-gold/10 text-desert-gold border-desert-gold/20 hover:bg-desert-gold/20 mb-6">
              Why Choose CarVault
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="font-saira text-4xl/tight md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-pearl">Why Choose </span>
            <span className="text-desert-gold">
              Car Vault
            </span>
            <span className="text-pearl">?</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto"
          >
            Experience the difference with UAE&apos;s most trusted car buying platform. 
            Fast, fair, and secure transactions with the best prices guaranteed.
          </motion.p>
        </div>

        {/* Features */}
        <div className="space-y-0">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
