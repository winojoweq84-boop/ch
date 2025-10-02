# Conversion Tracking Setup Guide

## 🚨 **Important Update**

After investigation, we discovered that **Stape.io is primarily a Google Tag Manager (GTM) server-side hosting service**, not a direct S2S API service. The original implementation was incorrect.

## ✅ **New Implementation: Facebook Conversions API**

We've updated the integration to use **Facebook Conversions API** instead, which provides direct S2S tracking capabilities.

### **What Changed:**

1. **Replaced Stape.io integration** with Facebook Conversions API
2. **Updated all tracking functions** to use Facebook's format
3. **Maintained the same lead processing flow** (Supabase + Telegram + Tracking)

## 🔧 **Setup Instructions**

### **Step 1: Get Facebook Credentials**

1. **Create a Facebook App:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app or use an existing one
   - Add "Facebook Login" product

2. **Get Your Pixel ID:**
   - Go to [Facebook Business Manager](https://business.facebook.com/)
   - Navigate to Events Manager
   - Create a new Pixel or use an existing one
   - Copy the Pixel ID

3. **Get Access Token:**
   - In your Facebook App, go to "Facebook Login" > "Settings"
   - Add your domain to "Valid OAuth Redirect URIs"
   - Generate a User Access Token or use App Access Token

### **Step 2: Update Environment Variables**

Update your `.env.local` file with your Facebook credentials:

```bash
# Facebook Conversions API Configuration
FACEBOOK_PIXEL_ID=your_facebook_pixel_id_here
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
FACEBOOK_API_VERSION=v18.0
FACEBOOK_TEST_EVENT_CODE=your_test_event_code_here
```

### **Step 3: Test the Integration**

1. **Visit the test page:** `http://localhost:3000/test-stape`
2. **Submit the actual form:** `http://localhost:3000`
3. **Check Facebook Events Manager** for incoming events

## 📊 **What Data is Sent to Facebook**

- **Lead Information:** Name, email, phone, city
- **Car Details:** Brand, model, specifications
- **Payout Preferences:** Crypto/cash method, token type
- **Event Data:** Lead event with conversion value
- **User Tracking:** IP address, user agent, session ID

## 🔍 **Finding Logs**

### **Facebook Side:**
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel
3. Check "Test Events" tab for real-time events
4. Check "Events" tab for processed events

### **Application Side:**
1. **Browser Console (F12):** Look for Facebook tracking messages
2. **Server Logs:** Check terminal for Facebook API responses
3. **Network Tab:** Look for requests to `graph.facebook.com`

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"Facebook Pixel ID not found":**
   - Check your `FACEBOOK_PIXEL_ID` in `.env.local`
   - Restart your development server

2. **"Access Token invalid":**
   - Verify your `FACEBOOK_ACCESS_TOKEN` is correct
   - Check token permissions and expiration

3. **"Events not appearing in Facebook":**
   - Check the "Test Events" tab in Events Manager
   - Verify your domain is added to the Pixel settings
   - Check for any error messages in the console

### **Success Indicators:**
- ✅ Console shows: "Facebook Conversions API tracking sent successfully"
- ✅ Facebook Events Manager shows new Lead events
- ✅ Network tab shows successful POST to `graph.facebook.com`

## 🔄 **Alternative: Stape.io with GTM**

If you prefer to use Stape.io, you would need to:

1. **Set up a GTM server-side container** on Stape.io
2. **Configure conversion tracking tags** in GTM
3. **Send data to the GTM endpoint** using GTM's format

However, the Facebook Conversions API approach is more direct and reliable for your use case.

## 📞 **Support**

If you need help with Facebook setup or encounter issues:
1. Check Facebook's [Conversions API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
2. Use Facebook's [Test Events tool](https://business.facebook.com/events_manager/test_events)
3. Contact Facebook support for API-related issues
