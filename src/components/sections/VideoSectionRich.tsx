'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/basepath';

const SHOW_CRYPTO =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SHOW_CRYPTO_COPY === 'true';

export default function VideoSectionRich() {
  const vref = useRef<HTMLVideoElement | null>(null);

  // Respect reduced motion & tab visibility
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) v.pause();
    const onVis = () => (document.hidden ? v.pause() : !reduce && v.play().catch(() => {}));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <section id="video" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Text column */}
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-wide text-amber-400">CarVault • UAE</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Direct premium-car buyout in the UAE — fast, fair, and fully online
          </h2>

          <p className="text-neutral-300">
            We&apos;re a Dubai-based buyer focused on premium cars. We inspect online, price at{' '}
            <strong className="text-white">real market value</strong>, and settle{' '}
            <strong className="text-white">the same day</strong>
            {SHOW_CRYPTO ? ' with instant digital/crypto payout' : ' with instant transfer payout'}
            . Paperwork is handled for you across all emirates.
          </p>

          {/* CTA */}
          <div className="pt-2">
            <Button asChild size="lg">
              <Link href="#contact">
                Get My Offer
              </Link>
            </Button>
          </div>
        </div>

        {/* Video column */}
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-xl">
            <video
              ref={vref}
              className="h-full w-full object-cover"
              src={getAssetPath('/videos/intro.mp4')}
              poster={getAssetPath('/videos/intro-poster.jpg')}
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
