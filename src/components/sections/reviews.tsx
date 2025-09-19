"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  carModel: string;
  amount: string;
  usdtAmount: string;
  avatar: string;
  problem: string;
  solution: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    location: "Dubai, UAE",
    rating: 5,
    text: "Did everything online—video inspection on WhatsApp, payout the same day. Never visited a branch.",
    carModel: "2019 BMW X5",
    amount: "AED 180,000",
    usdtAmount: "49,050 USDT",
    avatar: "AH",
    problem: "Needed quick sale, dealers were slow and lowballing.",
    solution: "CarVault: instant valuation, same-day payment in USDT."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Abu Dhabi, UAE",
    rating: 5,
    text: "Quick online inspection and instant crypto payout. Real market price, no haggling.",
    carModel: "2020 Mercedes C-Class",
    amount: "AED 95,000",
    usdtAmount: "25,870 USDT",
    avatar: "SJ",
    problem: "Worried about scams and lowballing from dealers.",
    solution: "CarVault: transparent process, fair price, secure crypto payment."
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    location: "Sharjah, UAE",
    rating: 5,
    text: "Outstanding service! They handled all the paperwork and gave me 15% more than other dealers offered. The crypto payment option is a game-changer for someone like me who prefers digital assets.",
    carModel: "2018 Toyota Camry",
    amount: "AED 65,000",
    usdtAmount: "17,700 USDT",
    avatar: "MH",
    problem: "Dealers offered 15% less, complex paperwork, wanted crypto payment.",
    solution: "CarVault: 15% more, handled paperwork, USDT to wallet."
  },
  {
    id: 4,
    name: "Priya Patel",
    location: "Dubai, UAE",
    rating: 5,
    text: "Fast, fair, and transparent. CarVault provided the best price for my Lexus and the entire process from valuation to payment took less than 3 hours. The team was professional and helpful throughout.",
    carModel: "2021 Lexus ES",
    amount: "AED 120,000",
    usdtAmount: "32,680 USDT",
    avatar: "PP",
    problem: "Needed quick sale for business investment, traditional methods too slow.",
    solution: "CarVault: 3-hour process, competitive pricing, immediate funds."
  },
  {
    id: 5,
    name: "David Wilson",
    location: "Ajman, UAE",
    rating: 5,
    text: "I've sold cars before, but never this easy. CarVault's online valuation was spot-on, and getting paid in Bitcoin was exactly what I wanted. They even helped with the transfer documentation.",
    carModel: "2017 Audi A4",
    amount: "AED 75,000",
    usdtAmount: "20,420 USDT",
    avatar: "DW",
    problem: "Previous sales: multiple visits, negotiations, delayed payments, wanted Bitcoin.",
    solution: "CarVault: streamlined process, Bitcoin payment, full documentation."
  },
  {
    id: 6,
    name: "Fatima Al-Zahra",
    location: "Ras Al Khaimah, UAE",
    rating: 5,
    text: "Excellent experience from start to finish. The team was knowledgeable, the price was competitive, and receiving payment in USDC was convenient. I'll definitely use CarVault again when I need to sell another car.",
    carModel: "2019 Nissan Altima",
    amount: "AED 55,000",
    usdtAmount: "14,980 USDT",
    avatar: "FA",
    problem: "Living in RAK, hard to find reliable buyers, local dealers low prices.",
    solution: "CarVault: nationwide service, competitive pricing, USDC payment."
  }
];

export default function Reviews() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

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

  const currentReview = reviews[currentIndex];

  return (
    <section 
      id="reviews" 
      data-testid="reviews-section" 
      className="relative bg-carbon text-pearl py-12 lg:py-16"
    >
      {/* Background texture */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_40%,transparent_100%)] bg-[url('/images/patterns/grille-hex.svg')] opacity-[0.04]" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="font-saira text-4xl/tight md:text-5xl font-bold mb-4">
            <div className="flex items-baseline justify-center">
              <BlurredStagger text="What Our " className="text-pearl" />
              <span className="text-desert-gold">
                <BlurredStagger text="Customers" className="text-desert-gold" />
              </span>
              <BlurredStagger text=" Say" className="text-pearl" />
            </div>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real experiences from car sellers across the UAE who chose CarVault for fast, fair, and secure transactions.
          </p>
        </motion.div>

        {/* Main Review Card */}
        <motion.div 
          variants={itemVariants}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-asphalt/60 backdrop-blur-sm rounded-3xl ring-1 ring-trim-silver/20 p-8 lg:p-12 shadow-2xl">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-taillight-red/20">
              <Quote className="h-12 w-12" />
            </div>

            {/* Review Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentReview.rating
                        ? "text-desert-gold fill-desert-gold"
                        : "text-trim-silver/30"
                    }`}
                  />
                ))}
              </div>

              {/* Problem/Solution Section */}
              <div className="mb-6 space-y-2">
                {/* Problem */}
                <div className="bg-carbon/30 rounded-lg p-2 ring-1 ring-trim-silver/5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-md bg-gradient-to-br from-red-500/20 to-red-600/20 ring-1 ring-red-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-3 w-3 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-red-400 text-xs font-semibold mr-2">Problem:</span>
                      <span className="text-slate-300 text-xs">{currentReview.problem}</span>
                    </div>
                  </div>
                </div>

                {/* Solution */}
                <div className="bg-carbon/30 rounded-lg p-2 ring-1 ring-trim-silver/5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-md bg-gradient-to-br from-plate-green/20 to-green-600/20 ring-1 ring-plate-green/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-plate-green" />
                    </div>
                    <div className="flex-1">
                      <span className="text-plate-green text-xs font-semibold mr-2">Solution:</span>
                      <span className="text-slate-300 text-xs">{currentReview.solution}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-lg lg:text-xl text-pearl leading-relaxed mb-8 font-medium">
                &ldquo;{currentReview.text}&rdquo;
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-taillight-red/20 to-desert-gold/20 ring-1 ring-trim-silver/20 flex items-center justify-center">
                    <span className="font-saira font-bold text-pearl text-lg">
                      {currentReview.avatar}
                    </span>
                  </div>
                  
                  {/* Customer Details */}
                  <div>
                    <div className="font-saira font-semibold text-pearl text-lg">
                      {currentReview.name}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {currentReview.location}
                    </div>
                    <div className="text-desert-gold text-sm font-medium">
                      Sold: {currentReview.carModel}
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right">
                  <div className="text-slate-400 text-xs mb-1">Received</div>
                  <div className="font-saira text-2xl font-bold text-pearl">
                    {currentReview.usdtAmount}
                  </div>
                  <div className="text-slate-400 text-xs">
                    ({currentReview.amount})
                  </div>
                </div>
              </div>

              {/* Navigation Controls - Inside Card */}
              <div className="flex items-center justify-center gap-3 mt-6 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevReview}
                  className="h-8 w-8 p-0 text-trim-silver hover:text-pearl hover:bg-trim-silver/10 rounded-lg"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToReview(index)}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-taillight-red scale-125"
                          : "bg-trim-silver/30 hover:bg-trim-silver/50"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextReview}
                  className="h-8 w-8 p-0 text-trim-silver hover:text-pearl hover:bg-trim-silver/10 rounded-lg"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Stats Row */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
        >
          <div className="text-center">
            <div className="font-saira text-3xl lg:text-4xl font-bold text-pearl mb-2">
              4.9/5
            </div>
            <div className="text-slate-400 text-sm">Average Rating</div>
          </div>
          
          <div className="text-center">
            <div className="font-saira text-3xl lg:text-4xl font-bold text-pearl mb-2">
              20k+
            </div>
            <div className="text-slate-400 text-sm">Happy Customers</div>
          </div>
          
          <div className="text-center">
            <div className="font-saira text-3xl lg:text-4xl font-bold text-pearl mb-2">
              98%
            </div>
            <div className="text-slate-400 text-sm">Would Recommend</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
