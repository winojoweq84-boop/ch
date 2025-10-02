/**
 * Browser test for Stape.io integration
 * 
 * This can be run in the browser console to test the Stape.io integration
 * without needing to set up environment variables.
 */

import { createStapeConversionFromLead } from './stape';

export function testStapeIntegration() {
  console.log('🧪 Testing Stape.io Integration in Browser...\n');
  
  // Test data
  const sampleLead = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971501234567',
    city: 'Dubai',
    brand: 'BMW',
    model: 'X5',
    payoutMethod: 'crypto' as const,
    token: 'USDC',
    source: 'browser_test',
  };
  
  // Create conversion data
  const conversionData = createStapeConversionFromLead(sampleLead, {
    leadId: 'browser-test-lead-123',
    userAgent: navigator.userAgent,
    ipAddress: '127.0.0.1', // Will be replaced by server
    sessionId: 'browser-session-' + Date.now(),
    customProperties: {
      test_mode: true,
      browser_test: true,
    },
  });
  
  console.log('✅ Conversion data created:', conversionData);
  
  // Show what would be sent to Stape.io
  console.log('\n📤 Data that would be sent to Stape.io:');
  console.log(JSON.stringify(conversionData, null, 2));
  
  console.log('\n🎉 Browser test completed!');
  console.log('\n📋 To test the actual S2S call:');
  console.log('1. Set up your Stape.io API key in .env.local');
  console.log('2. Submit a real form to trigger the S2S call');
  console.log('3. Check your browser network tab for the S2S request');
  
  return conversionData;
}

// Make it available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).testStapeIntegration = testStapeIntegration;
}
