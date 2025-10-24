import { sendFacebookConversion, createFacebookConversionFromLead } from './facebook-conversions';

export type LeadPayload = {
  name: string;
  city: string;
  phone: string;
  email: string;
  payoutMethod: 'crypto' | 'cash';
  token?: string;
  brand?: string;
  model?: string;
  otherBrand?: string;
  otherModel?: string;
  otherCity?: string;
  source?: string;
  // Optional tracking data
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
};

// helper: convert unknown to Error without changing behavior
function normalizeError(e: unknown): Error {
  if (e instanceof Error) return e;
  if (typeof e === 'string') return new Error(e);
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}

export async function sendLeadToWebhook(payload: LeadPayload) {
  // For static GitHub Pages deployment, we need to use a different approach
  // Since API routes don't work on static sites, we'll send directly to Supabase, Telegram, and Stape.io
  
  console.log('🚀 sendLeadToWebhook called with payload:', payload);
  
  try {
    // Send to Supabase directly
    const supabaseUrl = 'https://scnrhzqqhbtvobbxvbnx.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbnJoenFxaGJ0dm9iYnh2Ym54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzU4MDIsImV4cCI6MjA3NDY1MTgwMn0.kzmzbVtRTsuUL62Gg1aTkpJ3nzMrU9_mphCn_K1aCkE';
    
    // Prepare data for Supabase
    const leadData = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      city: payload.city,
      payout_method: 'Crypto',
      crypto_token: payload.token,
      brand: payload.brand || '',
      model: payload.model || '',
      telegram_sent: false,
    };

    // Insert into Supabase
    const supabaseRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(leadData),
    });

    if (!supabaseRes.ok) {
      const errorText = await supabaseRes.text().catch(() => '');
      throw new Error(`Supabase insert failed: ${supabaseRes.status} ${errorText}`);
    }

    // Send to Telegram
    const botToken = '8307601497:AAGJO9dY0Gd7a1R4T_Sd7xSS_WvRm1OaBok';
    const chatId = '8196426209';
    const telegramApi = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // Format payout method for display
    const payoutDisplay = 'Crypto';
    const cryptoToken = ` (${payload.token})`;
    
    // Escape special characters for MarkdownV2
    function escapeMarkdown(text: string): string {
      return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
    }

    const telegramMessage = [
      `🚗 *New Car Valuation Lead*`,
      ``,
      `👤 *Name:* ${escapeMarkdown(String(payload.name))}`,
      `📍 *Location:* ${escapeMarkdown(String(payload.city))}`,
      `📞 *Phone:* ${escapeMarkdown(String(payload.phone))}`,
      `📧 *Email:* ${escapeMarkdown(String(payload.email))}`,
      ``,
      `🚙 *Car Details:*`,
      `• *Brand:* ${escapeMarkdown(String(payload.brand || 'Not specified'))}`,
      `• *Model:* ${escapeMarkdown(String(payload.model || 'Not specified'))}`,
      ``,
      `💰 *Payout Method:* ${escapeMarkdown(String(payoutDisplay + cryptoToken))}`,
      ``,
      `🔗 *Source:* Website \\(GitHub Pages\\)`,
      `⏰ *Time:* ${escapeMarkdown(String(new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })))}`
    ].join("\n");

    const telegramRes = await fetch(telegramApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      })
    });

    if (!telegramRes.ok) {
      const telegramError = await telegramRes.text().catch(() => '');
      console.warn('Telegram send failed:', telegramError);
    }

    console.log('✅ Lead processed successfully (Supabase + Telegram)');
    
    // Step 3: Send to Facebook Conversions API
    try {
      const facebookConversionData = createFacebookConversionFromLead({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        brand: payload.brand || '',
        model: payload.model || '',
        payoutMethod: payload.payoutMethod,
        token: payload.token,
        source: payload.source || 'hero_form_compact',
      }, {
        leadId: `lead_${Date.now()}`,
        userAgent: payload.userAgent,
        ipAddress: payload.ipAddress,
        sessionId: payload.sessionId,
        customProperties: {
          other_brand: payload.otherBrand,
          other_model: payload.otherModel,
          other_city: payload.city === 'Other' ? payload.otherCity : undefined,
        },
      });
      
      const facebookSuccess = await sendFacebookConversion(facebookConversionData);
      if (facebookSuccess) {
        console.log('✅ Facebook Conversions API tracking sent successfully');
      } else {
        console.warn('⚠️ Facebook Conversions API tracking failed, but lead was still processed');
      }
    } catch (facebookError) {
      console.warn('⚠️ Facebook Conversions API tracking failed:', facebookError);
      // Don't fail the entire lead processing if Facebook tracking fails
    }
    
  } catch (error: unknown) {
    const err = normalizeError(error);
    
    console.error('❌ Lead processing failed:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      payload: payload
    });
    throw err;
  }
}
