declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export function trackAdsConversion(value: number = 1.0, currency: string = 'EUR') {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: 'AW-17534484313/tvOhCPa376sbENn-i6lB',
    value,
    currency: currency.toUpperCase(),
  })
}

