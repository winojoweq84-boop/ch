"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackLead, trackViewContent, trackFacebookEvent, isFacebookPixelLoaded } from "@/lib/facebook-pixel";

export default function TestFacebookPixelPage() {
  const [pixelLoaded, setPixelLoaded] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    // Check if pixel is loaded
    const checkPixel = () => {
      const loaded = isFacebookPixelLoaded();
      setPixelLoaded(loaded);
      if (loaded) {
        addTestResult("✅ Facebook Pixel is loaded and ready");
      } else {
        addTestResult("❌ Facebook Pixel is not loaded");
      }
    };

    // Check immediately and after a short delay
    checkPixel();
    const timer = setTimeout(checkPixel, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testPageView = () => {
    trackViewContent({
      content_name: 'Test Page View',
      content_category: 'Test',
      content_type: 'test_page',
    });
    addTestResult("📄 PageView event sent");
  };

  const testLead = () => {
    trackLead({
      content_name: 'Test Lead',
      content_category: 'Test',
      value: 1,
      currency: 'USD',
      test_mode: true,
    });
    addTestResult("🎯 Lead event sent");
  };

  const testCustomEvent = () => {
    trackFacebookEvent('CustomTest', {
      test_parameter: 'test_value',
      timestamp: new Date().toISOString(),
    });
    addTestResult("🔧 Custom event sent");
  };

  return (
    <div className="min-h-screen bg-carbon text-pearl p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Facebook Pixel Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status Panel */}
          <div className="bg-asphalt rounded-lg p-6 border border-trim-silver/20">
            <h2 className="text-xl font-semibold mb-4">Pixel Status</h2>
            <div className="space-y-2">
              <div className={`flex items-center gap-2 ${pixelLoaded ? 'text-plate-green' : 'text-taillight-red'}`}>
                <div className={`w-3 h-3 rounded-full ${pixelLoaded ? 'bg-plate-green' : 'bg-taillight-red'}`}></div>
                {pixelLoaded ? 'Pixel Loaded' : 'Pixel Not Loaded'}
              </div>
              <p className="text-sm text-slate-400">
                Pixel ID: 1281523864018075
              </p>
            </div>
          </div>

          {/* Test Controls */}
          <div className="bg-asphalt rounded-lg p-6 border border-trim-silver/20">
            <h2 className="text-xl font-semibold mb-4">Test Events</h2>
            <div className="space-y-3">
              <button
                onClick={testPageView}
                className="w-full bg-taillight-red hover:bg-taillight-red/80 text-white px-4 py-2 rounded-md transition-colors"
              >
                Test PageView
              </button>
              <button
                onClick={testLead}
                className="w-full bg-desert-gold hover:bg-desert-gold/80 text-white px-4 py-2 rounded-md transition-colors"
              >
                Test Lead Event
              </button>
              <button
                onClick={testCustomEvent}
                className="w-full bg-plate-green hover:bg-plate-green/80 text-white px-4 py-2 rounded-md transition-colors"
              >
                Test Custom Event
              </button>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="mt-8 bg-asphalt rounded-lg p-6 border border-trim-silver/20">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-slate-400">No test results yet. Click the test buttons above.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono bg-carbon/50 p-2 rounded">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-asphalt rounded-lg p-6 border border-trim-silver/20">
          <h2 className="text-xl font-semibold mb-4">How to Verify</h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold text-pearl">1. Browser Developer Tools</h3>
              <p className="text-slate-400">Open F12 → Network tab → Look for requests to facebook.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-pearl">2. Facebook Events Manager</h3>
              <p className="text-slate-400">Go to Facebook Business Manager → Events Manager → Test Events tab</p>
            </div>
            <div>
              <h3 className="font-semibold text-pearl">3. Facebook Pixel Helper</h3>
              <p className="text-slate-400">Install the Facebook Pixel Helper Chrome extension to see real-time events</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-taillight-red hover:bg-taillight-red/80 text-white px-6 py-3 rounded-md transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
