"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackLead } from "@/lib/facebook-pixel";
import { trackAdsConversion } from "@/lib/gtag";

function ThankYouTrackingInner() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // const value = Number(searchParams.get('value') ?? 1.0);
    // const currency = (searchParams.get('currency') ?? 'USD').toUpperCase();
    
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

    // Only track conversions for crypto payments
    if (leadData && leadData.payoutMethod === 'crypto') {
      console.log('🚀 Tracking CRYPTO conversion for Google Ads optimization');
      
      // Enhanced tracking data for crypto conversions
      const trackingData = {
        content_name: `${leadData.brand} ${leadData.model} Crypto Valuation Lead`,
        content_category: 'Crypto Car Valuation',
        content_type: 'crypto_lead',
        value: 15, // $15 USD desired price for conversions
        currency: 'USD',
        page_url: window.location.href,
        page_title: document.title,
        // Crypto-specific data
        car_brand: leadData.brand,
        car_model: leadData.model,
        payout_method: 'crypto',
        crypto_token: leadData.token,
        city: leadData.city,
        lead_timestamp: leadData.timestamp,
        conversion_type: 'crypto_preferred',
        higher_payout: true,
        instant_settlement: true,
      };

      // Track Facebook conversion
      trackLead(trackingData);
      
      // Google Ads conversion tracking with $15 USD value
      trackAdsConversion(15, 'USD');
      
      console.log('✅ Crypto conversion tracked successfully');
    } else {
      console.log('ℹ️ Non-crypto payment detected, skipping conversion tracking');
    }
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
