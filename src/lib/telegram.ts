const BOT = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT = process.env.TELEGRAM_CHAT_ID!;
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
    `*New CarVault Lead*`,
    `Name: ${esc(data.name)}`,
    `Phone: ${esc(data.phone)}`,
    `Email: ${esc(data.email)}`,
    `City/Emirate: ${esc(data.city)}`,
    `Brand: ${esc(data.brand)}`,
    `Model: ${esc(data.model)}`,
    `Payout: ${esc(data.payoutMethod)}${data.payoutMethod === "Crypto" && data.cryptoToken ? ` (${esc(data.cryptoToken)})` : ""}`,
    `Source: Website`
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
