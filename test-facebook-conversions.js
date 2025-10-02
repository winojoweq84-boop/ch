// Test script for Facebook Conversions API integration
// Using built-in fetch (Node.js 18+)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require('crypto');

function hashUserData(data) {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

async function testFacebookConversionsAPI() {
  console.log('🧪 Testing Facebook Conversions API...\n');
  
  const pixelId = '1281523864018075';
  const accessToken = 'EAAPzC9EI874BPqKWZBMc2731Ea9EEqnAFePLt8nqSZBOaFv6KFzjNWf7nQvJHuuJWVhqpB8GGHGAikAV7JDVQZBhAlD9Y9ZCQ5yXyLuqp2QuTwIarC7QtqZA9jwk61fdm8HFT5tOTrpZCoVSuQg1YZCuWio1FPgZBqZBUqW5l6TpYJ6fOAQ0K3tB4S5wxzNvejwZDZD';
  const apiVersion = 'v18.0';
  
  const testData = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: `test-lead-${Date.now()}`,
      event_source_url: 'https://cars-vault.com',
      user_data: {
        em: [hashUserData('test@example.com')], // Email (hashed)
        ph: [hashUserData('+971501234567')], // Phone (hashed)
        fn: [hashUserData('Test User')], // First name (hashed)
        ct: [hashUserData('Dubai')], // City (hashed)
        country: [hashUserData('AE')], // UAE (hashed)
        client_ip_address: '127.0.0.1',
        client_user_agent: 'Node.js Test',
      },
      custom_data: {
        content_name: 'BMW X5',
        content_category: 'Car Valuation',
        content_type: 'lead',
        value: 1,
        currency: 'USD',
        payout_method: 'crypto',
        crypto_token: 'USDC',
        source: 'test_script',
        session_id: `test-session-${Date.now()}`,
        test_mode: true
      },
      action_source: 'website',
    }],
    test_event_code: 'TEST10904',
  };
  
  console.log('📤 Sending data to Facebook Conversions API...');
  console.log('🔑 Pixel ID:', pixelId);
  console.log('📊 Payload:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${pixelId}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testData,
          access_token: accessToken,
        }),
      }
    );
    
    console.log('\n📡 Response Status:', response.status);
    console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📡 Response Body:', responseText);
    
    if (response.ok) {
      console.log('✅ SUCCESS: Facebook Conversions API event sent successfully!');
      console.log('🎉 Check your Facebook Events Manager for the test event.');
    } else {
      console.log('❌ ERROR: Facebook Conversions API request failed');
    }
    
  } catch (error) {
    console.log('❌ NETWORK ERROR:', error.message);
  }
}

testFacebookConversionsAPI();
