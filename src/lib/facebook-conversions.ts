/**
 * Facebook Conversions API integration
 * 
 * This module handles sending conversion data directly to Facebook's Conversions API
 * for lead tracking and analytics purposes.
 */

import crypto from 'crypto';

export interface FacebookConversionData {
  // Lead information
  lead_id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  
  // Car details
  brand: string;
  model: string;
  
  // Payout preferences
  payout_method: 'crypto' | 'cash';
  crypto_token?: string;
  
  // Event metadata
  event_name: 'Lead' | 'Purchase' | 'CompleteRegistration';
  source: string;
  timestamp: string;
  
  // User identifiers
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
  
  // Custom properties
  custom_properties?: Record<string, unknown>;
}

export interface FacebookConfig {
  pixel_id: string;
  access_token: string;
  api_version: string;
}

/**
 * Hash user data for Facebook Conversions API
 */
function hashUserData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

/**
 * Get Facebook configuration from environment variables
 */
function getFacebookConfig(): FacebookConfig {
  const pixelId = process.env.FACEBOOK_PIXEL_ID || '';
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || '';
  const apiVersion = process.env.FACEBOOK_API_VERSION || 'v18.0';
  
  if (!pixelId || !accessToken) {
    console.warn('⚠️ Facebook Pixel ID or Access Token not found in environment variables');
  }
  
  return {
    pixel_id: pixelId,
    access_token: accessToken,
    api_version: apiVersion,
  };
}

/**
 * Send conversion data to Facebook Conversions API
 */
export async function sendFacebookConversion(data: FacebookConversionData): Promise<boolean> {
  const config = getFacebookConfig();
  
  if (!config.pixel_id || !config.access_token) {
    console.warn('⚠️ Facebook configuration incomplete, skipping conversion tracking');
    return false;
  }
  
  // Prepare the payload for Facebook Conversions API
  const payload = {
      data: [{
        event_name: data.event_name,
        event_time: Math.floor(Date.parse(data.timestamp) / 1000),
        event_id: data.lead_id || `lead_${Date.now()}`,
        event_source_url: 'https://cars-vault.com',
        user_data: {
          em: [hashUserData(data.email)], // Email (hashed)
          ph: [hashUserData(data.phone)], // Phone (hashed)
          fn: [hashUserData(data.name)], // First name (hashed)
          ct: [hashUserData(data.city)], // City (hashed)
          country: [hashUserData('AE')], // UAE (hashed)
          client_ip_address: data.ip_address,
          client_user_agent: data.user_agent,
        },
        custom_data: {
          content_name: `${data.brand} ${data.model}`,
          content_category: 'Car Valuation',
          content_type: 'lead',
          value: 1,
          currency: 'USD',
          payout_method: data.payout_method,
          crypto_token: data.crypto_token,
          source: data.source,
          session_id: data.session_id,
          ...data.custom_properties,
        },
        action_source: 'website',
      }],
      test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE || undefined,
    };
  
  try {
    console.log('🚀 Sending Facebook Conversions API event:', {
      event_name: data.event_name,
      lead_id: data.lead_id,
      name: data.name,
      email: data.email,
      city: data.city,
      brand: data.brand,
      model: data.model,
      payout_method: data.payout_method,
    });
    
    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${config.api_version}/${config.pixel_id}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          access_token: config.access_token,
        }),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Facebook Conversions API request failed: ${response.status} ${errorText}`);
    }
    
    const responseData = await response.json();
    console.log('✅ Facebook Conversions API event sent successfully:', responseData);
    
    return true;
    
  } catch (error) {
    console.error('❌ Facebook Conversions API tracking failed:', error);
    
    // Log the data for manual processing if needed
    console.log('📋 Facebook conversion data for manual processing:', {
      config: { pixel_id: config.pixel_id, api_version: config.api_version },
      data: payload,
      error: error instanceof Error ? error.message : String(error),
    });
    
    return false;
  }
}

/**
 * Create a conversion data object from lead payload
 */
export function createFacebookConversionFromLead(
  leadData: {
    name: string;
    email: string;
    phone: string;
    city: string;
    brand: string;
    model: string;
    payoutMethod: 'crypto' | 'cash';
    token?: string;
    source?: string;
  },
  options: {
    leadId?: string;
    userAgent?: string;
    ipAddress?: string;
    sessionId?: string;
    customProperties?: Record<string, unknown>;
  } = {}
): FacebookConversionData {
  return {
    lead_id: options.leadId,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    city: leadData.city,
    brand: leadData.brand,
    model: leadData.model,
    payout_method: leadData.payoutMethod,
    crypto_token: leadData.token,
    event_name: 'Lead',
    source: leadData.source || 'website',
    timestamp: new Date().toISOString(),
    user_agent: options.userAgent,
    ip_address: options.ipAddress,
    session_id: options.sessionId,
    custom_properties: options.customProperties,
  };
}
