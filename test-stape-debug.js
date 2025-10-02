// Quick test script to debug Stape.io integration
// Using built-in fetch (Node.js 18+)

async function testStapeDirectly() {
  console.log('🧪 Testing Stape.io S2S endpoint directly...\n');
  
  const endpoint = 'https://seooruya.gtm-server.com/gtag/js';
  const apiKey = 'me:seooruya:6cb5fb6f844e5cf4d835919b9fcc2401f40fcee0seooruya';
  
  const testData = {
    client_name: 'cars-vault.com',
    events: [{
      name: 'lead_submission',
      timestamp_micros: Date.now() * 1000,
      params: {
        lead_id: 'test-lead-' + Date.now(),
        lead_name: 'Test User',
        lead_email: 'test@example.com',
        lead_phone: '+971501234567',
        lead_city: 'Dubai',
        car_brand: 'BMW',
        car_model: 'X5',
        payout_method: 'crypto',
        crypto_token: 'USDC',
        source: 'direct_test',
        user_agent: 'Node.js Test',
        ip_address: '127.0.0.1',
        session_id: 'test-session-' + Date.now(),
        conversion_value: 1,
        currency: 'USD',
        test_mode: true
      }
    }]
  };
  
  console.log('📤 Sending data to:', endpoint);
  console.log('🔑 Using API key:', apiKey.substring(0, 20) + '...');
  console.log('📊 Payload:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Cars-Vault-Test/1.0',
      },
      body: JSON.stringify(testData),
    });
    
    console.log('\n📡 Response Status:', response.status);
    console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📡 Response Body:', responseText);
    
    if (response.ok) {
      console.log('✅ SUCCESS: Request sent successfully!');
    } else {
      console.log('❌ ERROR: Request failed');
    }
    
  } catch (error) {
    console.log('❌ NETWORK ERROR:', error.message);
  }
}

testStapeDirectly();
