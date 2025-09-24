'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const VIMEO_ID = '1121566022'; // my video
const VIMEO_BASE = `https://player.vimeo.com/video/${VIMEO_ID}`;

const mainSrc = `${VIMEO_BASE}?badge=0&autopause=0&app_id=58479&dnt=1&muted=0&autoplay=0&title=0&byline=0&portrait=0`;
const stickySrc = `${VIMEO_BASE}?badge=0&autopause=0&app_id=58479&dnt=1&muted=1&autoplay=1&title=0&byline=0&portrait=0`;

export default function VideoSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLIFrameElement>(null);
  const stickyRef = useRef<HTMLIFrameElement>(null);

  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

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
          { threshold: 0.3 }
        );
        io.observe(wrapRef.current);
      }

      // Sync play/pause between players
      const updatePlayback = async () => {
        if (!mainPlayer || !stickyPlayer) return;

        if (showSticky && !reducedMotion) {
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
  }, [showSticky, dismissed, reducedMotion]);

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
    <section id="how-it-works" className="no-x-scroll px-safe">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Text block — first on mobile, second on desktop if desired */}
        <div className="order-1 md:order-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How CarVault Works</h2>
          <p className="mt-3 text-neutral-300 mb-6">
            Fast, fair, and stress-free across the UAE. Online valuation, quick video
            walk-through, instant pricing, and same-day payout & paperwork.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Submit Your Car Details</h3>
                <p className="text-neutral-300 text-sm">Tell us about your car and get an instant valuation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Quick Video Inspection</h3>
                <p className="text-neutral-300 text-sm">Share a short video walkthrough of your car</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Get Your Offer</h3>
                <p className="text-neutral-300 text-sm">Receive a fair market price offer within hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-plate-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Same-Day Settlement</h3>
                <p className="text-neutral-300 text-sm">Complete paperwork and get paid instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video block — second on mobile, sticky on desktop */}
        <div className="order-2 md:order-1 w-full">
          <div className="relative w-full overflow-hidden rounded-2xl">
            {/* Remove sticky on mobile; keep sticky on desktop only */}
            <div className="md:sticky md:top-24">
              {/* Keep your existing Vimeo embed component or iframe wrapper */}
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
        </div>
      </div>

      {/* Sticky bottom mini-player (desktop only) */}
      {!dismissed && (
        <div
          className={[
            'pointer-events-none fixed inset-x-0 bottom-4 z-[70] hidden justify-center lg:flex',
            showSticky ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            'transition-all duration-300'
          ].join(' ')}
          aria-hidden={!showSticky}
        >
          <div className="pointer-events-auto relative w-[720px] max-w-[92vw] overflow-hidden rounded-xl bg-black/80 shadow-2xl backdrop-blur">
            <button
              onClick={() => {
                setDismissed(true);
                setShowSticky(false);
              }}
              aria-label="Close video"
              className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white hover:bg-black/80"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                ref={stickyRef}
                src={stickySrc}
                title="CarVault — sticky video"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}