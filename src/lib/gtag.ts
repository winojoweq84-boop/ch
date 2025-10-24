declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export function trackAdsConversion(value: number = 15, currency: string = 'USD') {
  if (typeof window === 'undefined' || !window.gtag) return
  
  console.log('🎯 Google Ads Conversion Tracking:', {
    value,
    currency,
    conversion_type: 'crypto_lead'
  });
  
  window.gtag('event', 'conversion', {
    send_to: 'AW-17534484313/tvOhCPa376sbENn-i6lB',
    value,
    currency: currency.toUpperCase(),
    // Additional crypto-specific parameters
    custom_parameters: {
      conversion_type: 'crypto_preferred',
      higher_payout: true,
      instant_settlement: true,
    }
  })
}

