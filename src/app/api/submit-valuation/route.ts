import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToTelegram } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, phone, email, city, payoutMethod, brand, model } = body;
    
    if (!name || !phone || !email || !city || !payoutMethod || !brand || !model) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format payout method for display
    const payoutDisplay = payoutMethod === 'crypto' ? 'Crypto' : 'Cash';
    const cryptoToken = body.token ? ` (${body.token})` : '';
    
    // Try to send to Telegram (but don't fail if bot is not configured)
    try {
      await sendLeadToTelegram({
        name,
        phone,
        email,
        city,
        payoutMethod: payoutDisplay + cryptoToken,
        brand,
        model,
      });
      console.log('Lead sent to Telegram successfully');
    } catch (telegramError) {
      console.warn('Telegram bot not configured or failed:', telegramError);
      // Log the lead data for manual processing
      console.log('Lead data for manual processing:', {
        name, phone, email, city, brand, model, payoutMethod: payoutDisplay + cryptoToken
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
