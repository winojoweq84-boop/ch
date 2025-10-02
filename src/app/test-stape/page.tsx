"use client";

import { useState } from 'react';
import { sendStapeConversion, createStapeConversionFromLead } from '@/lib/stape';

export default function TestStapePage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testStapeIntegration = async () => {
    setIsLoading(true);
    setTestResult('Testing Stape.io integration...\n');
    
    try {
      // Create test lead data
      const testLead = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+971501234567',
        city: 'Dubai',
        brand: 'BMW',
        model: 'X5',
        payoutMethod: 'crypto' as const,
        token: 'USDC',
        source: 'test_page',
      };

      // Create conversion data
      const conversionData = createStapeConversionFromLead(testLead, {
        leadId: 'test-lead-' + Date.now(),
        userAgent: navigator.userAgent,
        ipAddress: '127.0.0.1',
        sessionId: 'test-session-' + Date.now(),
        customProperties: {
          test_mode: true,
          browser_test: true,
        },
      });

      setTestResult(prev => prev + '✅ Conversion data created successfully\n');
      setTestResult(prev => prev + `📊 Data: ${JSON.stringify(conversionData, null, 2)}\n\n`);

      // Send to Stape.io
      setTestResult(prev => prev + '🚀 Sending to Stape.io S2S endpoint...\n');
      const success = await sendStapeConversion(conversionData);
      
      if (success) {
        setTestResult(prev => prev + '✅ SUCCESS: Stape.io S2S tracking sent successfully!\n');
        setTestResult(prev => prev + '🎉 Check your Stape.io dashboard for the conversion.\n');
      } else {
        setTestResult(prev => prev + '⚠️ FAILED: Stape.io S2S tracking failed.\n');
        setTestResult(prev => prev + '💡 Check your API key and endpoint configuration.\n');
      }
    } catch (error) {
      setTestResult(prev => prev + `❌ ERROR: ${error instanceof Error ? error.message : String(error)}\n`);
      setTestResult(prev => prev + '💡 Make sure your .env.local file is configured correctly.\n');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Stape.io Integration Test</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Make sure you have created <code className="bg-gray-700 px-2 py-1 rounded">.env.local</code> with your Stape.io API key</li>
            <li>Update the endpoint URL with your actual Stape.io container domain</li>
            <li>Click the &quot;Test Stape.io Integration&quot; button below</li>
            <li>Check the results and your Stape.io dashboard</li>
          </ol>
        </div>

        <button
          onClick={testStapeIntegration}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold mb-6"
        >
          {isLoading ? 'Testing...' : 'Test Stape.io Integration'}
        </button>

        {testResult && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
              {testResult}
            </pre>
          </div>
        )}

        <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-lg mt-6">
          <h3 className="font-semibold text-yellow-200 mb-2">🔧 Configuration Check:</h3>
          <p className="text-yellow-100 text-sm">
            Make sure your <code className="bg-yellow-800 px-1 rounded">.env.local</code> file contains:
          </p>
          <pre className="text-xs text-yellow-100 mt-2 bg-yellow-800 p-2 rounded">
{`STAPE_S2S_ENDPOINT=https://track.YOUR_DOMAIN.com/s2s
STAPE_API_KEY=your_actual_api_key
STAPE_CONTAINER_DOMAIN=your_domain.com`}
          </pre>
        </div>
      </div>
    </div>
  );
}
