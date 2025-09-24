<<<<<<< HEAD
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / Tagline */}
          <div>
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="CarVault Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <p className="text-xl font-semibold text-white">CarVault <span className="text-neutral-400">UAE</span></p>
            </div>

            <p className="mt-4 max-w-md text-neutral-300">
              The UAE's premier car buyout service with instant transfer payments. Get up to
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
=======
"use client";

import { Car, Mail, Phone, MapPin, Globe, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-carbon border-t border-trim-silver/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-taillight-red">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="font-saira text-xl font-bold text-pearl">
                CryptoCar
              </span>
              <span className="text-sm text-slate-400">UAE</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              The UAE&apos;s premier car buyout service with instant crypto payments. 
              Get up to 20% more for your car.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-plate-green" />
              <span className="text-xs text-slate-400">KYC & AML Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-saira text-lg font-semibold text-pearl">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="text-slate-400 hover:text-pearl transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-400 hover:text-pearl transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-pearl transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-pearl transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-saira text-lg font-semibold text-pearl">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-pearl transition-colors">
                  Car Valuation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-pearl transition-colors">
                  Crypto Payment
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-pearl transition-colors">
                  Same-day Pickup
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-pearl transition-colors">
                  All Makes & Models
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-saira text-lg font-semibold text-pearl">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-trim-silver" />
                <span className="text-slate-400">+971 4 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-trim-silver" />
                <span className="text-slate-400">info@cryptocar.ae</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-trim-silver" />
                <span className="text-slate-400">Dubai, UAE</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-trim-silver/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span>© 2024 CryptoCar UAE. All rights reserved.</span>
              <a href="#" className="hover:text-pearl transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-pearl transition-colors">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FileText className="h-3 w-3" />
              <span>Licensed by UAE Central Bank</span>
            </div>
          </div>
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
