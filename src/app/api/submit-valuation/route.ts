import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToTelegram } from '@/lib/telegram';
import { supabase, Lead } from '@/lib/supabase';
import { sendFacebookConversion, createFacebookConversionFromLead } from '@/lib/facebook-conversions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, phone, email, city, payoutMethod, brand, model } = body;
    
    // Extract tracking data from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1';
    const sessionId = body.sessionId || undefined;
    
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
      
      // Step 3: Send to Facebook Conversions API
      try {
        const facebookConversionData = createFacebookConversionFromLead({
          name,
          email,
          phone,
          city,
          brand,
          model,
          payoutMethod: payoutMethod as 'crypto' | 'cash',
          token: body.token,
          source: body.source || 'api_form',
        }, {
          leadId,
          userAgent,
          ipAddress,
          sessionId,
          customProperties: {
            other_brand: body.otherBrand,
            other_model: body.otherModel,
            other_token: body.otherToken,
            other_city: body.otherCity,
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
      
      // Step 4: Update Supabase record to mark Telegram as sent
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
