/**
 * Test script for Stape.io S2S integration
 * 
 * This script tests the Stape.io integration with sample data
 * Run with: node scripts/test-stape-integration.js
 */

// Mock environment variables for testing
process.env.STAPE_S2S_ENDPOINT = 'https://track.cars-vault.com/s2s';
process.env.STAPE_API_KEY = 'test_api_key_123';
process.env.STAPE_CONTAINER_DOMAIN = 'cars-vault.com';

// Import the Stape.io functions
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { sendStapeConversion, createStapeConversionFromLead } = require('../src/lib/stape.ts');

async function testStapeIntegration() {
  console.log('🧪 Testing Stape.io S2S Integration...\n');
  
  // Test 1: Create conversion data from lead
  console.log('Test 1: Creating conversion data from lead...');
  const sampleLead = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971501234567',
    city: 'Dubai',
    brand: 'BMW',
    model: 'X5',
    payoutMethod: 'crypto',
    token: 'USDC',
    source: 'test_form',
  };
  
  const conversionData = createStapeConversionFromLead(sampleLead, {
    leadId: 'test-lead-123',
    userAgent: 'Mozilla/5.0 (Test Browser)',
    ipAddress: '192.168.1.1',
    sessionId: 'test-session-456',
    customProperties: {
      test_mode: true,
      other_brand: null,
      other_model: null,
    },
  });
  
  console.log('✅ Conversion data created:', {
    event_type: conversionData.event_type,
    lead_id: conversionData.lead_id,
    name: conversionData.name,
    email: conversionData.email,
    city: conversionData.city,
    brand: conversionData.brand,
    model: conversionData.model,
    payout_method: conversionData.payout_method,
    crypto_token: conversionData.crypto_token,
    source: conversionData.source,
    timestamp: conversionData.timestamp,
  });
  
  // Test 2: Send conversion to Stape.io (this will fail with test API key, but we can see the request structure)
  console.log('\nTest 2: Sending conversion to Stape.io...');
  try {
    const success = await sendStapeConversion(conversionData);
    if (success) {
      console.log('✅ Stape.io conversion sent successfully!');
    } else {
      console.log('⚠️ Stape.io conversion failed (expected with test API key)');
    }
  } catch (error) {
    console.log('⚠️ Stape.io conversion failed (expected with test API key):', error.message);
  }
  
  // Test 3: Test with different payout method
  console.log('\nTest 3: Testing with cash payout method...');
  const cashLead = {
    ...sampleLead,
    payoutMethod: 'cash',
    token: undefined,
  };
  
  const cashConversionData = createStapeConversionFromLead(cashLead, {
    leadId: 'test-lead-124',
    userAgent: 'Mozilla/5.0 (Test Browser)',
    ipAddress: '192.168.1.2',
    sessionId: 'test-session-457',
  });
  
  console.log('✅ Cash conversion data created:', {
    event_type: cashConversionData.event_type,
    payout_method: cashConversionData.payout_method,
    crypto_token: cashConversionData.crypto_token,
  });
  
  console.log('\n🎉 Stape.io integration test completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Add your real Stape.io API key to .env.local');
  console.log('2. Update the endpoint URL with your actual domain');
  console.log('3. Test with a real form submission');
  console.log('4. Check your Stape.io dashboard for incoming conversions');
}

// Run the test
testStapeIntegration().catch(console.error);
