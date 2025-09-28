export type LeadPayload = {
  name: string;
  city: string;
  phone: string;
  email: string;
  payoutMethod: 'crypto' | 'cash';
  token?: string;
  otherToken?: string;
  brand?: string;
  model?: string;
  otherBrand?: string;
  otherModel?: string;
  source?: string;
};

export async function sendLeadToWebhook(payload: LeadPayload) {
  // For static GitHub Pages deployment, we need to use a different approach
  // Since API routes don't work on static sites, we'll send directly to Supabase and Telegram
  
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
      payout_method: payload.payoutMethod === 'crypto' ? 'Crypto' : 'Cash',
      crypto_token: payload.token || null,
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
    const botToken = '8307601497:AAG0wAeWC0sERNAnU_nC8yZAbvftyjNHzsA';
    const chatId = '8196426209';
    const telegramApi = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // Format payout method for display
    const payoutDisplay = payload.payoutMethod === 'crypto' ? 'Crypto' : 'Cash';
    const cryptoToken = payload.token ? ` (${payload.token})` : '';
    
    // Escape special characters for MarkdownV2
    function escapeMarkdown(text) {
      return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
    }

    const telegramMessage = [
      `🚗 *New Car Valuation Lead*`,
      ``,
      `👤 *Name:* ${escapeMarkdown(payload.name)}`,
      `📍 *Location:* ${escapeMarkdown(payload.city)}`,
      `📞 *Phone:* ${escapeMarkdown(payload.phone)}`,
      `📧 *Email:* ${escapeMarkdown(payload.email)}`,
      ``,
      `🚙 *Car Details:*`,
      `• *Brand:* ${escapeMarkdown(payload.brand || 'Not specified')}`,
      `• *Model:* ${escapeMarkdown(payload.model || 'Not specified')}`,
      ``,
      `💰 *Payout Method:* ${escapeMarkdown(payoutDisplay + cryptoToken)}`,
      ``,
      `🔗 *Source:* Website \\(GitHub Pages\\)`,
      `⏰ *Time:* ${escapeMarkdown(new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))}`
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
    
  } catch (error) {
    console.error('Lead processing failed:', error);
    throw error;
  }
}
