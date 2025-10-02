'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from "framer-motion";

const VIMEO_ID = '1121566022'; // my video
const VIMEO_BASE = `https://player.vimeo.com/video/${VIMEO_ID}`;

const mainSrc = `${VIMEO_BASE}?badge=0&autopause=0&app_id=58479&dnt=1&muted=0&autoplay=1&title=0&byline=0&portrait=0`;
const stickySrc = `${VIMEO_BASE}?badge=0&autopause=0&app_id=58479&dnt=1&muted=1&autoplay=1&title=0&byline=0&portrait=0`;

export default function VideoSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLIFrameElement>(null);
  const stickyRef = useRef<HTMLIFrameElement>(null);

  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);
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

  useEffect(() => {
    let Player: typeof import('@vimeo/player').default;
    let mainPlayer: import('@vimeo/player').default | null = null;
    let stickyPlayer: import('@vimeo/player').default | null = null;
    let io: IntersectionObserver | null = null;

    (async () => {
      const isDesktop = () =>
        typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

      // dynamic import to avoid SSR issues
      const mod = await import('@vimeo/player');
      Player = mod.default;

      if (mainRef.current) mainPlayer = new Player(mainRef.current);
      if (stickyRef.current) stickyPlayer = new Player(stickyRef.current);

      // IntersectionObserver to toggle sticky when main video leaves the viewport (desktop only)
      if (wrapRef.current && typeof window !== 'undefined') {
        io = new IntersectionObserver(
          ([entry]) => {
            const shouldStick = !entry.isIntersecting && isDesktop() && !dismissed;
            setShowSticky(shouldStick);
          },
          { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
          }
        );
        io.observe(wrapRef.current);
      }

      // Sync play/pause between players
      const updatePlayback = async () => {
        if (!mainPlayer || !stickyPlayer) return;

        if (showSticky && !shouldReduceMotion) {
          try {
            await mainPlayer.pause();
          } catch {}
          try {
            await stickyPlayer.setMuted(true);
            await stickyPlayer.play();
          } catch {}
        } else {
          try {
            await stickyPlayer.pause();
          } catch {}
        }
      };

      updatePlayback();

      return () => {
        io?.disconnect();
        // don't destroy players to preserve Vimeo playback state across toggles
      };
    })();
  }, [showSticky, dismissed, shouldReduceMotion]);

  // handle desktop-only sticky behavior on resize
  useEffect(() => {
    const onResize = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (!isDesktop) setShowSticky(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section id="how-it-works" className="no-x-scroll px-safe py-12 lg:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center no-x-scroll"
      >
        {/* Text block — left side on desktop */}
        <div className="lg:col-span-6">
          {/* Title */}
          <motion.div 
            variants={itemVariants}
            className="font-saira text-4xl/tight md:text-5xl font-bold text-center lg:text-left mb-6"
          >
            <span className="text-pearl">How </span>
            <span className="text-desert-gold">CarVault</span>
            <span className="text-pearl"> Works</span>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl text-center lg:text-left"
          >
            Fast, fair, and stress-free across the UAE. Online valuation, quick video
            walk-through, instant pricing, and same-day payout & paperwork.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Submit Your Car Details</h3>
                <p className="text-slate-400 text-sm">Tell us about your car and get an instant valuation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Quick Video Inspection</h3>
                <p className="text-slate-400 text-sm">Share a short video walkthrough of your car</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Get Your Offer</h3>
                <p className="text-slate-400 text-sm">Receive a fair market price offer within hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Same-Day Settlement</h3>
                <p className="text-slate-400 text-sm">Complete paperwork and get paid instantly</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video block — right side on desktop */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-6 relative"
        >
          <div ref={wrapRef} className="relative w-full overflow-hidden rounded-2xl">
            {/* Sticky video on desktop */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="relative pt-[56.25%]">
                <iframe
                  ref={mainRef}
                  src={mainSrc}
                  className="absolute inset-0 h-full w-full rounded-2xl"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="intro"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Sticky mini-player in right corner (desktop only) */}
      {!dismissed && (
        <div
          className={[
            'pointer-events-none fixed bottom-6 right-6 z-[70] hidden lg:block',
            showSticky ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            'transition-all duration-300'
          ].join(' ')}
          aria-hidden={!showSticky}
        >
          <div className="pointer-events-auto relative w-[320px] h-[180px] overflow-hidden rounded-xl bg-black/90 shadow-2xl backdrop-blur border border-trim-silver/20">
            <button
              onClick={() => {
                setDismissed(true);
                setShowSticky(false);
              }}
              aria-label="Close video"
              className="absolute right-2 top-2 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-white hover:bg-black/90 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-full h-full">
              <iframe
                ref={stickyRef}
                src={stickySrc}
                title="CarVault — sticky video"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}