# Facebook Pixel Implementation Guide

## 🎯 Overview

This implementation adds Facebook Pixel tracking to your car valuation website with two main events:
- **PageView**: Triggers when visitors come to the main home page
- **Lead**: Triggers when visitors submit the form and reach the thank-you page

## 📋 Implementation Summary

### ✅ What's Been Added

1. **Facebook Pixel Script** (`src/app/layout.tsx`)
   - Added Facebook Pixel base code with your Pixel ID: `1281523864018075`
   - Automatically tracks PageView on all pages
   - Includes noscript fallback for users with JavaScript disabled

2. **Facebook Pixel Utilities** (`src/lib/facebook-pixel.ts`)
   - TypeScript-safe functions for tracking events
   - Helper functions for common events (PageView, Lead, ViewContent)
   - Error handling and logging

3. **Home Page Tracking** (`src/app/page.tsx`)
   - Added ViewContent event with custom parameters
   - Tracks when users visit the main car valuation page

4. **Thank You Page Tracking** (`src/app/thank-you/page.tsx`)
   - Added Lead event when users reach the thank-you page
   - Confirms successful form submission

5. **Form Submission Tracking** (`src/components/forms/car-valuation-form.tsx`)
   - Added Lead event tracking when form is submitted
   - Includes detailed car and user information

6. **Test Page** (`src/app/test-facebook-pixel/page.tsx`)
   - Interactive test page to verify pixel functionality
   - Real-time status checking and event testing

## 🔧 Technical Details

### Pixel ID Configuration
```javascript
fbq('init', '1281523864018075');
```

### Events Tracked

#### 1. PageView (Automatic)
- **When**: Every page load
- **Data**: Standard page information
- **Location**: `src/app/layout.tsx`

#### 2. ViewContent (Home Page)
- **When**: User visits main home page
- **Data**: 
  ```javascript
  {
    content_name: 'Car Valuation Home Page',
    content_category: 'Car Valuation',
    content_type: 'homepage',
    page_url: window.location.href,
    page_title: document.title
  }
  ```
- **Location**: `src/app/page.tsx`

#### 3. Lead (Thank You Page)
- **When**: User reaches thank-you page after form submission (triggered only once)
- **Data**:
  ```javascript
  {
    content_name: 'BMW X5 Valuation Lead', // Dynamic based on car
    content_category: 'Car Valuation',
    value: 1,
    currency: 'USD',
    car_brand: 'BMW',
    car_model: 'X5',
    payout_method: 'crypto',
    crypto_token: 'USDT',
    city: 'Dubai',
    lead_timestamp: '2024-01-15T10:30:00.000Z',
    page_url: window.location.href,
    page_title: document.title
  }
  ```
- **Location**: `src/app/thank-you/page.tsx`
- **Note**: Form data is passed via session storage to provide detailed lead information

## 🧪 Testing

### 1. Test Page
Visit: `http://localhost:3000/test-facebook-pixel`

This page provides:
- Real-time pixel status checking
- Interactive event testing buttons
- Test results logging
- Verification instructions

### 2. Manual Testing Steps

1. **Open Browser Developer Tools** (F12)
2. **Go to Network Tab**
3. **Visit your website** (`http://localhost:3000`)
4. **Look for requests to** `facebook.com` or `connect.facebook.net`
5. **Submit the form** and check for Lead events
6. **Visit thank-you page** and verify Lead event

### 3. Facebook Events Manager

1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to **Events Manager**
3. Select your Pixel (ID: 1281523864018075)
4. Check **Test Events** tab for real-time events
5. Check **Events** tab for processed events

### 4. Facebook Pixel Helper

Install the [Facebook Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) to see real-time pixel events.

## 🔍 Verification Checklist

- [ ] Facebook Pixel loads on all pages
- [ ] PageView events fire on page load
- [ ] ViewContent events fire on home page
- [ ] Lead events fire on form submission
- [ ] Lead events fire on thank-you page
- [ ] Events appear in Facebook Events Manager
- [ ] No console errors related to Facebook Pixel

## 🚨 Troubleshooting

### Common Issues

1. **Pixel Not Loading**
   - Check browser console for JavaScript errors
   - Verify pixel ID is correct: `1281523864018075`
   - Check network tab for failed requests

2. **Events Not Appearing in Facebook**
   - Wait 5-10 minutes for events to process
   - Check Test Events tab in Events Manager
   - Verify domain is added to pixel settings

3. **Console Errors**
   - Check for ad blockers
   - Verify all imports are correct
   - Check TypeScript compilation

### Debug Commands

Open browser console and run:
```javascript
// Check if pixel is loaded
typeof window.fbq === 'function'

// Manually trigger events
fbq('track', 'PageView');
fbq('track', 'Lead', {content_name: 'Test Lead'});
```

## 📊 Expected Results

### In Facebook Events Manager:
- **PageView**: 1 event per page visit
- **ViewContent**: 1 event per home page visit
- **Lead**: 1 event per form submission (only on thank-you page)

### In Browser Console:
- Success messages: `✅ Facebook Pixel event tracked: [event_name]`
- Error messages: `❌ Failed to track Facebook Pixel event: [event_name]`

## 🔄 Integration with Existing Systems

This Facebook Pixel implementation works alongside your existing:
- **Facebook Conversions API** (server-side tracking)
- **Stape.io CAPI** integration
- **Supabase** lead storage
- **Telegram** notifications

The pixel provides client-side tracking while your existing Conversions API handles server-side tracking for better attribution and iOS 14.5+ compatibility.

## 📞 Support

If you encounter issues:
1. Check the test page: `/test-facebook-pixel`
2. Review browser console for errors
3. Verify events in Facebook Events Manager
4. Check Facebook Pixel Helper extension
5. Refer to [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
