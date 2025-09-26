'use client';

import { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';

type Props = {
  videoId: string | number; // e.g. 1121566022
  startMuted?: boolean;
};

export default function StickyVimeo({ videoId, startMuted = false }: Props) {
  const blockRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [muted, setMuted] = useState(startMuted);
  const [player, setPlayer] = useState<Player | null>(null);

  // init player
  useEffect(() => {
    if (!frameRef.current) return;
    const p = new Player(frameRef.current, {
      id: Number(videoId),
      autopause: false,
      background: false,
      byline: false,
      title: false,
      portrait: false,
      controls: true,
      muted: muted,
      playsinline: true,
    });
    setPlayer(p);

    // Try autoplay with sound first; if blocked, mute and play
    (async () => {
      try {
        await p.setMuted(false);
        await p.play();
      } catch {
        await p.setMuted(true);
        setMuted(true);
        try { await p.play(); } catch {}
      }
    })();

    return () => { p.destroy(); };
  }, [videoId, muted]);

  // intersection → toggle sticky
  useEffect(() => {
    if (!blockRef.current) return;

    const onChange = (entries: IntersectionObserverEntry[]) => {
      const e = entries[0];
      // show sticky when video is mostly out of view
      setShowSticky(!e.isIntersecting && window.innerWidth >= 1024);
    };

    const io = new IntersectionObserver(onChange, { threshold: 0.2 });
    io.observe(blockRef.current);
    return () => io.disconnect();
  }, []);

  const handleUnmute = async () => {
    try {
      if (!player) return;
      await player.setMuted(false);
      await player.play();
      setMuted(false);
    } catch { /* ignore */ }
  };

  return (
    <>
      {/* Inline video block */}
      <div ref={blockRef} className="rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            ref={frameRef}
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${muted ? 1 : 0}&transparent=0&app_id=58479`}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            title="How CarVault Works"
          />
        </div>
      </div>

      {/* Sticky mini-player (desktop only) */}
      <div
        className={`fixed z-50 bottom-4 right-4 w-[360px] max-w-[34vw] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black
          transition-opacity duration-300 ${showSticky ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          hidden lg:block`}
      >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${muted ? 1 : 0}&transparent=0&app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          className="h-full w-full"
          title="How CarVault Works (Mini)"
        />
        {muted && (
          <button
            onClick={handleUnmute}
            className="absolute bottom-2 left-2 px-3 py-1.5 text-sm rounded-lg bg-white/90 text-black hover:bg-white"
          >
            Unmute
          </button>
        )}
      </div>
    </>
  );
}
