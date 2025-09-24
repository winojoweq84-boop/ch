"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import AnchorLink from "@/components/system/AnchorLink";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-trim-silver/20 bg-carbon/95 backdrop-blur supports-[backdrop-filter]:bg-carbon/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="CarVault Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="font-saira text-xl font-bold text-pearl">
              CarVault
            </span>
            <span className="text-sm text-slate-400">UAE</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <AnchorLink
              href="#how-it-works"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              How It Works
            </AnchorLink>
            <AnchorLink
              href="#why-choose-us"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              Pricing
            </AnchorLink>
            <AnchorLink
              href="#who-we-are"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              About
            </AnchorLink>
            <AnchorLink
              href="#offer-form"
              className="text-sm font-medium text-pearl hover:text-taillight-red transition-colors"
            >
              Contact
            </AnchorLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button size="sm" data-analytics="header-cta" data-cta="get-offer" asChild>
              <AnchorLink href="#offer-form" className="flex items-center" ariaLabel="Get My Offer">
                <Zap className="w-4 h-4 mr-2" />
                Get My Offer
              </AnchorLink>
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
              <AnchorLink
                href="#how-it-works"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onNavigate={() => setIsMenuOpen(false)}
              >
                How It Works
              </AnchorLink>
              <AnchorLink
                href="#why-choose-us"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onNavigate={() => setIsMenuOpen(false)}
              >
                Pricing
              </AnchorLink>
              <AnchorLink
                href="#who-we-are"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onNavigate={() => setIsMenuOpen(false)}
              >
                About
              </AnchorLink>
              <AnchorLink
                href="#offer-form"
                className="block px-3 py-2 text-base font-medium text-pearl hover:text-taillight-red hover:bg-asphalt rounded-md transition-colors"
                onNavigate={() => setIsMenuOpen(false)}
              >
                Contact
              </AnchorLink>
              <div className="px-3 py-2">
                <Button size="sm" className="w-full" data-analytics="mobile-header-cta" data-cta="get-offer" asChild>
                  <AnchorLink href="#offer-form" className="flex items-center justify-center" ariaLabel="Get My Offer" onNavigate={() => setIsMenuOpen(false)}>
                    <Zap className="w-4 h-4 mr-2" />
                    Get My Offer
                  </AnchorLink>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

