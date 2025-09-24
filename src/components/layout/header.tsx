'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setAtTop(y < 8);

        // Hide on scroll down, show on scroll up
        if (!menuOpen) {
          if (y > lastY.current + 6) setShowHeader(false); // down
          else if (y < lastY.current - 6) setShowHeader(true); // up
        } else {
          // Keep header visible while the mobile menu is open
          setShowHeader(true);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    // Reduced motion: keep header visible always
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return (
    <>
      {/* Spacer to prevent content jump because header is fixed */}
      <div className="h-20 md:h-24" />

      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform',
          showHeader ? 'translate-y-0' : '-translate-y-full',
          atTop ? 'bg-transparent' : 'bg-[#0A0A0B]/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur'
        )}
        role="banner"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-safe md:h-24">
          {/* LOGO — wider on mobile only */}
          <Link
            href="/"
            aria-label="CarVault Home"
            className="inline-flex items-center gap-2"
          >
            <Image
              src="/images/3893893399.png"
              alt="CarVault UAE Logo"
              width={800}
              height={120}
              className="h-20 md:h-28 w-auto object-contain max-w-[320px] md:max-w-[600px]"
              priority
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.text-logo-fallback')) {
                  const textLogo = document.createElement('div');
                  textLogo.className = 'text-logo-fallback text-2xl md:text-3xl font-bold text-white';
                  textLogo.innerHTML = '<span class="text-white">CAR</span> <span class="text-blue-400">VAULT</span>';
                  parent.appendChild(textLogo);
                }
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <a href="#how-it-works" className="text-sm text-neutral-200 hover:text-white">How It Works</a>
            <a href="#why-choose-us" className="text-sm text-neutral-200 hover:text-white">Pricing</a>
            <a href="#who-we-are" className="text-sm text-neutral-200 hover:text-white">About</a>
            <a href="#offer-form" className="text-sm text-neutral-200 hover:text-white">Contact</a>
          </nav>

          {/* Burger (mobile) */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-200 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              {menuOpen ? (
                <path className="fill-white stroke-white stroke-2" d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path className="fill-white stroke-white stroke-2" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={clsx(
            'md:hidden transition-[max-height] duration-300 overflow-hidden',
            menuOpen ? 'max-h-96' : 'max-h-0'
          )}
        >
          <nav aria-label="Mobile" className="space-y-1 border-t border-white/10 bg-[#0A0A0B]/95 px-safe py-3">
            <a onClick={() => setMenuOpen(false)} href="#how-it-works" className="block rounded-md px-3 py-2 text-neutral-200 hover:bg-white/5">How It Works</a>
            <a onClick={() => setMenuOpen(false)} href="#why-choose-us" className="block rounded-md px-3 py-2 text-neutral-200 hover:bg-white/5">Pricing</a>
            <a onClick={() => setMenuOpen(false)} href="#who-we-are" className="block rounded-md px-3 py-2 text-neutral-200 hover:bg-white/5">About</a>
            <a onClick={() => setMenuOpen(false)} href="#offer-form" className="block rounded-md px-3 py-2 text-neutral-200 hover:bg-white/5">Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
}

