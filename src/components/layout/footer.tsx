'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  // Apply basePath for GitHub Pages
  const basePath = process.env.GITHUB_PAGES === 'true' ? '/car' : '';
  const logoSrc = `${basePath}/images/3893893399.png`;

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] no-x-scroll px-safe">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / Tagline */}
          <div>
            <div className="flex items-center gap-3 text-white">
              <Image
                src={logoSrc}
                alt="CarVault UAE Logo"
                width={900}
                height={110}
                className="h-18 md:h-24 w-auto object-contain"
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
              <span className="sr-only">CarVault</span>
            </div>

            <p className="mt-4 max-w-md text-neutral-300">
              The UAE&apos;s premier car buyout service with instant transfer payments. Get up to
              <span className="font-semibold text-white"> 5% more</span> than market price for your car.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
              <svg width="18" height="18" viewBox="0 0 24 24" className="fill-emerald-400">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-4-4 1.414-1.414L11 13.172l5.586-5.586L18 9Z" />
              </svg>
              <span>KYC & AML Compliant</span>
            </div>
          </div>

          {/* Quick Links (clickable to page anchors) */}
          <nav aria-label="Quick Links">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#how-it-works" className="text-neutral-300 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-neutral-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-neutral-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-neutral-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services (NON-clickable list) */}
          <section aria-label="Services">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-neutral-300">
              <li><span className="cursor-default">Premium Car Buyout</span></li>
              <li><span className="cursor-default">Online Inspection</span></li>
              <li><span className="cursor-default">Market Value Pricing</span></li>
              <li><span className="cursor-default">Same-Day Settlement</span></li>
            </ul>
          </section>

          {/* NOTE: Contact Info column has been removed */}
          {/* NOTE: Language selector has been removed */}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} CarVault LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}