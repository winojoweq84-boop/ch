/**
 * Stape.io S2S (Server-to-Server) tracking integration
 * 
 * This module handles sending conversion data to Stape.io's tracking endpoint
 * for lead tracking and analytics purposes.
 */

export interface StapeConversionData {
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
  event_type: 'lead_submission' | 'form_view' | 'button_click';
  source: string;
  timestamp: string;
  
  // User identifiers (for tracking)
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
  
  // Custom properties
  custom_properties?: Record<string, any>;
}

export interface StapeConfig {
  endpoint: string;
  api_key: string;
  container_domain: string;
}

/**
 * Get Stape.io configuration from environment variables
 */
function getStapeConfig(): StapeConfig {
  // Stape.io uses GTM server-side containers, not direct S2S endpoints
  // The correct endpoint format is: https://your-container-id.gtm-server.com/gtm
  const endpoint = process.env.STAPE_GTM_ENDPOINT || 'https://seooruya.gtm-server.com/gtm';
  const apiKey = process.env.STAPE_API_KEY || '';
  const containerDomain = process.env.STAPE_CONTAINER_DOMAIN || 'cars-vault.com';
  
  if (!apiKey) {
    console.warn('⚠️ STAPE_API_KEY not found in environment variables');
  }
  
  return {
    endpoint,
    api_key: apiKey,
    container_domain: containerDomain,
  };
}

/**
 * Send conversion data to Stape.io S2S endpoint
 */
export async function sendStapeConversion(data: StapeConversionData): Promise<boolean> {
  const config = getStapeConfig();
  
  if (!config.api_key) {
    console.warn('⚠️ Stape.io API key not configured, skipping S2S tracking');
    return false;
  }
  
  try {
    console.log('🚀 Sending Stape.io S2S conversion:', {
      event_type: data.event_type,
      lead_id: data.lead_id,
      name: data.name,
      email: data.email,
      city: data.city,
      brand: data.brand,
      model: data.model,
      payout_method: data.payout_method,
    });
    
    // Prepare the payload for GTM server-side container
    // GTM expects data in a specific format with client_name and events
    const payload = {
      client_name: config.container_domain,
      events: [{
        name: data.event_type,
        timestamp_micros: Date.now() * 1000,
        params: {
          // Lead information
          lead_id: data.lead_id,
          lead_name: data.name,
          lead_email: data.email,
          lead_phone: data.phone,
          lead_city: data.city,
          
          // Car details
          car_brand: data.brand,
          car_model: data.model,
          
          // Payout preferences
          payout_method: data.payout_method,
          crypto_token: data.crypto_token,
          
          // Source and tracking
          source: data.source,
          user_agent: data.user_agent,
          ip_address: data.ip_address,
          session_id: data.session_id,
          
          // Custom properties
          ...data.custom_properties,
          
          // Conversion data
          conversion_value: 1,
          currency: 'USD',
        }
      }]
    };
    
    // Send to Stape.io S2S endpoint
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.api_key}`,
        'User-Agent': 'Cars-Vault-Website/1.0',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Stape.io S2S request failed: ${response.status} ${errorText}`);
    }
    
    const responseData = await response.json().catch(() => ({}));
    console.log('✅ Stape.io S2S conversion sent successfully:', responseData);
    
    return true;
    
  } catch (error) {
    console.error('❌ Stape.io S2S tracking failed:', error);
    
    // Log the data for manual processing if needed
    console.log('📋 Stape.io data for manual processing:', {
      config: { endpoint: config.endpoint, container_domain: config.container_domain },
      data: payload,
      error: error instanceof Error ? error.message : String(error),
    });
    
    return false;
  }
}

/**
 * Create a conversion data object from lead payload
 */
export function createStapeConversionFromLead(
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
    customProperties?: Record<string, any>;
  } = {}
): StapeConversionData {
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
    event_type: 'lead_submission',
    source: leadData.source || 'website',
    timestamp: new Date().toISOString(),
    user_agent: options.userAgent,
    ip_address: options.ipAddress,
    session_id: options.sessionId,
    custom_properties: options.customProperties,
  };
}

/**
 * Track form view event
 */
export async function trackFormView(
  formType: string,
  options: {
    userAgent?: string;
    ipAddress?: string;
    sessionId?: string;
  } = {}
): Promise<boolean> {
  const conversionData: StapeConversionData = {
    name: '', // Not available for form view
    email: '',
    phone: '',
    city: '',
    brand: '',
    model: '',
    payout_method: 'cash', // Default
    event_type: 'form_view',
    source: 'website',
    timestamp: new Date().toISOString(),
    user_agent: options.userAgent,
    ip_address: options.ipAddress,
    session_id: options.sessionId,
    custom_properties: {
      form_type: formType,
    },
  };
  
  return await sendStapeConversion(conversionData);
}

/**
 * Track button click event
 */
export async function trackButtonClick(
  buttonId: string,
  options: {
    userAgent?: string;
    ipAddress?: string;
    sessionId?: string;
    customProperties?: Record<string, any>;
  } = {}
): Promise<boolean> {
  const conversionData: StapeConversionData = {
    name: '',
    email: '',
    phone: '',
    city: '',
    brand: '',
    model: '',
    payout_method: 'cash',
    event_type: 'button_click',
    source: 'website',
    timestamp: new Date().toISOString(),
    user_agent: options.userAgent,
    ip_address: options.ipAddress,
    session_id: options.sessionId,
    custom_properties: {
      button_id: buttonId,
      ...options.customProperties,
    },
  };
  
  return await sendStapeConversion(conversionData);
}
