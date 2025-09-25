import { sendLeadToTelegram } from "@/lib/telegram";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // keep server runtime

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.email || !body.city || !body.brand || !body.model) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      city: body.city,
      payoutMethod: body.payout?.type === "crypto" ? "Crypto" : "Cash",
      cryptoToken: body.payout?.token || body.payout?.otherToken,
      brand: body.brand,
      model: body.model,
    };

    await sendLeadToTelegram(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
