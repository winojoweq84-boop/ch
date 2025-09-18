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
        </div>
      </div>
    </footer>
  );
}
