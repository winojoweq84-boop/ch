'use client';

import { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '@/lib/basepath';

const DISMISS_KEY = 'cv_sticky_video_dismissed_until';

function desktopOK() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
}

function dismissed(): boolean {
  try {
    const v = localStorage.getItem(DISMISS_KEY);
    if (!v) return false;
    return Date.now() < Number(v);
  } catch { return false; }
}

export default function StickyVideo({
  src = getAssetPath('/videos/promo.mp4'),
  poster = getAssetPath('/videos/promo-poster.jpg'),
  watchSectionId = 'video', // ID of the main section to observe
}: { src?: string; poster?: string; watchSectionId?: string }) {
  const vid = useRef<HTMLVideoElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!desktopOK() || dismissed()) return;

    const section = document.getElementById(watchSectionId);
    if (!section) { setShow(true); return; }

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting ?? false;
        setShow(!inView);
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0.25 }
    );
    io.observe(section);

    const onVis = () => {
      const v = vid.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else if (show && v.paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        v.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [show, watchSectionId]);

  useEffect(() => {
    // auto play/pause when show toggles
    const v = vid.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (show && !reduce && document.visibilityState === 'visible') {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [show]);

  if (!desktopOK() || dismissed() || !show) return null;

  return (
    <aside
      aria-label="Sticky video"
      className="fixed bottom-4 right-4 z-40 hidden lg:block"
    >
      <div className="group relative w-[360px] max-w-[40vw] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
        <button
          aria-label="Close video"
          onClick={() => {
            setShow(false);
            try {
              // 7 days
              localStorage.setItem(DISMISS_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000));
            } catch {}
          }}
          className="absolute right-2 top-2 z-10 rounded-md bg-black/60 px-2 py-1 text-white/90 hover:bg-black/80"
        >
          ✕
        </button>
        <video
          ref={vid}
          className="block h-auto w-full aspect-video object-cover"
          src={src}
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
    </aside>
  );
}
