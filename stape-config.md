# Stape.io Integration Configuration

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Stape.io S2S Tracking Configuration
# Replace with your actual Stape.io container domain and API key

# Your Stape.io S2S endpoint (replace 'cars-vault.com' with your actual domain)
STAPE_S2S_ENDPOINT=https://track.cars-vault.com/s2s

# Your Stape.io Container API Key (get this from your Stape.io dashboard)
STAPE_API_KEY=your_stape_api_key_here

# Your container domain (used for tracking identification)
STAPE_CONTAINER_DOMAIN=cars-vault.com

# Optional: Enable/disable Stape.io tracking (default: true)
STAPE_TRACKING_ENABLED=true
```

## Setup Instructions

1. **Get your Stape.io API Key:**
   - Log into your Stape.io dashboard
   - Navigate to your container settings
   - Copy your Container API Key

2. **Update the endpoint URL:**
   - Replace `cars-vault.com` with your actual domain
   - The endpoint should follow the format: `https://track.YOUR_DOMAIN.com/s2s`

3. **Add to your environment:**
   - Create a `.env.local` file in your project root
   - Add the environment variables above with your actual values

4. **For production deployment:**
   - Add these environment variables to your hosting platform (Vercel, Netlify, etc.)
   - Make sure to use your production domain in the endpoint URL

## Testing

The integration will automatically:
- Track lead submissions from the car valuation form
- Send conversion data to Stape.io S2S endpoint
- Include lead details, car information, and payout preferences
- Handle errors gracefully without breaking the form submission

## Data Sent to Stape.io

The following data is sent with each lead submission:
- Lead information (name, email, phone, city)
- Car details (brand, model)
- Payout preferences (crypto/cash, token type)
- Event metadata (timestamp, source, event type)
- User tracking data (user agent, IP, session ID)
- Custom properties (other brand/model, other token, etc.)
