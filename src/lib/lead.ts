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
  const url = process.env.NEXT_PUBLIC_TG_WEBHOOK_URL;
  
  // For local development, just log the payload if webhook URL is not set
  if (!url) {
    console.info('[Dev] Lead payload:', payload);
    
    // Show a simple alert for development
    if (typeof window !== 'undefined') {
      alert(`Lead submitted (dev mode):\nName: ${payload.name}\nBrand: ${payload.brand}\nModel: ${payload.model}`);
    }
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    mode: 'cors',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Webhook error ${res.status}: ${text}`);
  }
}
