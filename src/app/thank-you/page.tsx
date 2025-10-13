"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Car, Zap, Clock } from "lucide-react";
import { trackLead } from "@/lib/facebook-pixel";

// GTM dataLayer type declaration
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function ThankYouPage() {
  useEffect(() => {
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
    
    // Push GTM event for successful conversion
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        transaction_id: leadData?.timestamp || Date.now().toString(),
        value: 1,
        currency: 'USD',
        items: [{
          item_id: leadData?.brand + '_' + leadData?.model || 'car_valuation',
          item_name: leadData ? `${leadData.brand} ${leadData.model} Valuation` : 'Car Valuation',
          category: 'Car Valuation',
          quantity: 1,
          price: 1
        }]
      });
      
      // Also push a lead conversion event
      window.dataLayer.push({
        event: 'lead_conversion',
        lead_type: 'car_valuation',
        lead_value: 1,
        currency: 'USD',
        lead_data: leadData || {}
      });
    }
    
    // Google Ads conversion tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17534484313/tvOhCPa376sbENn-i6IB',
        'value': 1.0,
        'currency': 'USD'
      });
    }
  }, []);
  return (
    <div className="min-h-screen bg-carbon flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-24 h-24 bg-plate-green/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-12 h-12 text-plate-green" />
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-saira text-4xl md:text-5xl font-bold text-pearl mb-4"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed"
        >
          Your car valuation request has been submitted successfully. Our team will contact you within 24 hours with your personalized offer.
        </motion.p>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-asphalt/50 rounded-2xl p-6 mb-8 border border-trim-silver/20"
        >
          <h2 className="font-saira text-xl font-bold text-pearl mb-4">What happens next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-taillight-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Car className="w-4 h-4 text-taillight-red" />
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Expert Review</h3>
                <p className="text-slate-400 text-sm">Our team will review your car details and market conditions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-desert-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-desert-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Personalized Offer</h3>
                <p className="text-slate-400 text-sm">Receive your competitive offer via phone or email</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-plate-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-plate-green" />
              </div>
              <div>
                <h3 className="font-semibold text-pearl">Quick Settlement</h3>
                <p className="text-slate-400 text-sm">Complete the sale and get paid within 24 hours</p>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}