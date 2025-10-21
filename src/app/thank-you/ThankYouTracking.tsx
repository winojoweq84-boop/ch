"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackLead } from "@/lib/facebook-pixel";
import { trackAdsConversion } from "@/lib/gtag";

function ThankYouTrackingInner() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const value = Number(searchParams.get('value') ?? 1.0);
    const currency = (searchParams.get('currency') ?? 'EUR').toUpperCase();
    // Get lead data from session storage
    let leadData = null;
    if (typeof window !== 'undefined') {
      try {
        const storedData = sessionStorage.getItem('leadData');
        if (storedData) {
          leadData = JSON.parse(storedData);
          // Clear the data after use to prevent duplicate tracking
          sessionStorage.removeItem('leadData');
        }
      } catch (error) {
        console.warn('Failed to parse lead data from session storage:', error);
      }
    }

    // Track lead conversion when user reaches thank you page
    const trackingData = {
      content_name: leadData 
        ? `${leadData.brand} ${leadData.model} Valuation Lead`
        : 'Car Valuation Lead',
      content_category: 'Car Valuation',
      value: 1,
      currency: 'USD',
      page_url: window.location.href,
      page_title: document.title,
    };

    // Add lead-specific data if available
    if (leadData) {
      Object.assign(trackingData, {
        car_brand: leadData.brand,
        car_model: leadData.model,
        payout_method: leadData.payoutMethod,
        crypto_token: leadData.token,
        city: leadData.city,
        lead_timestamp: leadData.timestamp,
      });
    }

    trackLead(trackingData);
    
    // Google Ads conversion tracking
    trackAdsConversion(value, currency);
  }, [searchParams]);

  return null;
}

export function ThankYouTracking() {
  return (
    <Suspense fallback={null}>
      <ThankYouTrackingInner />
    </Suspense>
  );
}
