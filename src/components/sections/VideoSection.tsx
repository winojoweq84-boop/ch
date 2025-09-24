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
    <section id="video" aria-labelledby="video-heading" className="relative">
      <h2 id="video-heading" className="sr-only">Intro video</h2>

      {/* Main responsive Vimeo embed */}
      <div ref={wrapRef} className="relative mx-auto aspect-video w-full max-w-5xl">
        <iframe
          ref={mainRef}
          src={mainSrc}
          title="CarVault — intro"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full rounded-xl border-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        />
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