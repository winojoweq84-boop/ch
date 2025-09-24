'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { getAssetPath } from '@/lib/basepath';

type Props = {
  id?: string;
  title?: string;
  kicker?: string;
  body?: string;
  videoSrc?: string;
  poster?: string;
};

export default function VideoSection({
  id = 'video',
  title = 'What We Do',
  kicker = 'CarVault',
  body = 'Direct buyout at real market price with same-day payout and full online process.',
  videoSrc = getAssetPath('/videos/promo.mp4'),
  poster = getAssetPath('/videos/promo-poster.jpg'),
}: Props) {
  const vref = useRef<HTMLVideoElement | null>(null);

  // Respect reduced motion + visibility pause
  useEffect(() => {
    const v = vref.current;
    if (!v) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) v.pause();

    const onVis = () => {
      if (document.hidden) v.pause();
      else if (!mql.matches && v.paused) v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <section id={id} aria-label="Intro video" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Text */}
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-wide text-amber-400">{kicker}</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="text-neutral-300">{body}</p>
        </div>

        {/* Video */}
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-xl">
            <video
              ref={vref}
              className="h-full w-full object-cover"
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls
              controlsList="nodownload noplaybackrate"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
