"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-trim-silver/20 bg-carbon/95 backdrop-blur supports-[backdrop-filter]:bg-carbon/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-taillight-red">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="font-saira text-xl font-bold text-pearl">
              CryptoCar
            </span>
            <span className="text-sm text-slate-400">UAE</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button size="sm" data-analytics="header-cta" data-cta="get-offer" asChild>
              <a href="#offer-form">Get My Offer</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-trim-silver/20">
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <Button size="sm" className="w-full" data-analytics="mobile-header-cta" data-cta="get-offer" asChild>
                  <a href="#offer-form">Get My Offer</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

