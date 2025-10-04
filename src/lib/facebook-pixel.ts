/**
 * Facebook Pixel utility functions for client-side tracking
 * 
 * This module provides TypeScript-safe functions for tracking Facebook Pixel events
 * from the client-side of the application.
 */

// Extend the Window interface to include fbq
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: Record<string, any>) => void;
  }
}

/**
 * Check if Facebook Pixel is loaded and available
 */
export function isFacebookPixelLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/**
 * Track a Facebook Pixel event
 */
export function trackFacebookEvent(eventName: string, parameters?: Record<string, any>): void {
  if (!isFacebookPixelLoaded()) {
    console.warn('⚠️ Facebook Pixel not loaded, skipping event:', eventName);
    return;
  }

  try {
    window.fbq('track', eventName, parameters);
    console.log('✅ Facebook Pixel event tracked:', eventName, parameters);
  } catch (error) {
    console.error('❌ Failed to track Facebook Pixel event:', eventName, error);
  }
}

/**
 * Track a custom Facebook Pixel event
 */
export function trackFacebookCustomEvent(eventName: string, parameters?: Record<string, any>): void {
  if (!isFacebookPixelLoaded()) {
    console.warn('⚠️ Facebook Pixel not loaded, skipping custom event:', eventName);
    return;
  }

  try {
    window.fbq('trackCustom', eventName, parameters);
    console.log('✅ Facebook Pixel custom event tracked:', eventName, parameters);
  } catch (error) {
    console.error('❌ Failed to track Facebook Pixel custom event:', eventName, error);
  }
}

/**
 * Track PageView event (usually handled automatically by the pixel)
 */
export function trackPageView(): void {
  trackFacebookEvent('PageView');
}

/**
 * Track Lead event when user submits the form
 */
export function trackLead(leadData?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}): void {
  const parameters = {
    content_name: leadData?.content_name || 'Car Valuation Lead',
    content_category: leadData?.content_category || 'Car Valuation',
    value: leadData?.value || 1,
    currency: leadData?.currency || 'USD',
    ...leadData,
  };

  trackFacebookEvent('Lead', parameters);
}

/**
 * Track ViewContent event for specific pages
 */
export function trackViewContent(contentData?: {
  content_name?: string;
  content_category?: string;
  content_type?: string;
  [key: string]: any;
}): void {
  const parameters = {
    content_name: contentData?.content_name || 'Car Valuation Page',
    content_category: contentData?.content_category || 'Car Valuation',
    content_type: contentData?.content_type || 'page',
    ...contentData,
  };

  trackFacebookEvent('ViewContent', parameters);
}

/**
 * Track CompleteRegistration event (alternative to Lead)
 */
export function trackCompleteRegistration(registrationData?: {
  content_name?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}): void {
  const parameters = {
    content_name: registrationData?.content_name || 'Car Valuation Registration',
    value: registrationData?.value || 1,
    currency: registrationData?.currency || 'USD',
    ...registrationData,
  };

  trackFacebookEvent('CompleteRegistration', parameters);
}

/**
 * Track custom car valuation events
 */
export function trackCarValuationEvent(eventType: 'form_started' | 'form_completed' | 'offer_viewed', data?: Record<string, any>): void {
  const eventName = `CarValuation_${eventType}`;
  const parameters = {
    event_type: eventType,
    timestamp: new Date().toISOString(),
    ...data,
  };

  trackFacebookCustomEvent(eventName, parameters);
}
