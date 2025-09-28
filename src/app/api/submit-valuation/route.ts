import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToTelegram } from '@/lib/telegram';
import { supabase, Lead } from '@/lib/supabase';

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
    
    // Step 1: Save lead to Supabase
    let leadId: string | null = null;
    try {
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        name,
        phone,
        email,
        city,
        payout_method: payoutDisplay,
        crypto_token: body.token || null,
        brand,
        model,
        telegram_sent: false,
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select('id')
        .single();

      if (error) {
        throw new Error(`Supabase insert failed: ${error.message}`);
      }

      leadId = data.id;
      console.log('✅ Lead saved to Supabase with ID:', leadId);
    } catch (supabaseError) {
      console.error('❌ Supabase save failed:', supabaseError);
      // Continue with Telegram even if Supabase fails
    }

    // Step 2: Send to Telegram
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
      
      console.log('✅ Lead sent to Telegram successfully');
      
      // Step 3: Update Supabase record to mark Telegram as sent
      if (leadId) {
        try {
          await supabase
            .from('leads')
            .update({ 
              telegram_sent: true, 
              telegram_sent_at: new Date().toISOString() 
            })
            .eq('id', leadId);
          console.log('✅ Updated Supabase record - Telegram sent');
        } catch (updateError) {
          console.warn('⚠️ Failed to update Supabase record:', updateError);
        }
      }
    } catch (telegramError) {
      console.error('❌ Telegram bot failed:', telegramError);
      // Log the lead data for manual processing
      console.log('📋 Lead data for manual processing:', {
        leadId,
        name, phone, email, city, brand, model, payoutMethod: payoutDisplay + cryptoToken
      });
      // Don't fail the request if Telegram fails, but log the error
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
