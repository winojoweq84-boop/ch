const BOT = process.env.TELEGRAM_BOT_TOKEN || '8307601497:AAG0wAeWC0sERNAnU_nC8yZAbvftyjNHzsA';
const CHAT = process.env.TELEGRAM_CHAT_ID || '8196426209';
const API = `https://api.telegram.org/bot${BOT}/sendMessage`;

function esc(s: string) {
  // Minimal escape for MarkdownV2
  return s.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function sendLeadToTelegram(data: {
  name: string; phone: string; email: string; city: string;
  payoutMethod: string; cryptoToken?: string;
  brand: string; model: string;
}) {
  const lines = [
    `🚗 *New Car Valuation Lead*`,
    ``,
    `👤 *Name:* ${esc(data.name)}`,
    `📍 *Location:* ${esc(data.city)}`,
    `📞 *Phone:* ${esc(data.phone)}`,
    `📧 *Email:* ${esc(data.email)}`,
    ``,
    `🚙 *Car Details:*`,
    `• *Brand:* ${esc(data.brand)}`,
    `• *Model:* ${esc(data.model)}`,
    ``,
    `💰 *Payout Method:* ${esc(data.payoutMethod)}`,
    ``,
    `🔗 *Source:* Website`,
    `⏰ *Time:* ${new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Dubai',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}`
  ].join("\n");

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT,
      text: lines,
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    })
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Telegram send failed: ${res.status} ${t}`);
  }
}
