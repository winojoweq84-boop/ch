"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-carbon/95 backdrop-blur border-t border-trim-silver/20 px-safe w-full no-x-scroll">
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-pearl">Get up to 5% more</p>
          <p className="text-xs text-slate-400">than market price</p>
        </div>
        <Button 
          size="lg" 
          className="bg-taillight-red hover:bg-[#ff1a12] text-white flex-shrink-0"
          data-analytics="mobile-sticky-cta"
          data-cta="get-my-offer"
          asChild
        >
          <a href="#offer-form" className="flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Get My Offer
          </a>
        </Button>
      </div>
    </div>
  );
}




