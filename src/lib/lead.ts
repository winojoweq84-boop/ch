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
  // Use local API endpoint
  const url = '/api/submit-valuation';
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Lead submission error ${res.status}: ${text}`);
  }
}
