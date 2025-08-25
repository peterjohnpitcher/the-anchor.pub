# How to Fix Google Reviews Integration

## Current Issue
- API Key: `AIzaSyB2RNc8IihbU1sBl6NQzOoUeMRNZEfOU1o` has referrer restrictions
- Place ID: `ChIJDcbcERJxdkgReaFjdQ7fzfg` is correct
- Error: "API keys with referer restrictions cannot be used with this API"

## Step-by-Step Fix

### 1. Create New Server API Key
1. Go to https://console.cloud.google.com
2. Select your project (or create one)
3. Go to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **API key**
5. Name it "The Anchor Server Key"

### 2. Configure the New Key
1. Click on the new API key
2. Under **API restrictions**:
   - Select "Restrict key"
   - Choose "Google Places API"
3. Under **Application restrictions**:
   - Choose "IP addresses" 
   - Add your Vercel production IPs (found in Vercel dashboard)
   - For development, add your local IP

### 3. Update Environment Variables
```bash
# In .env.local (for development)
GOOGLE_PLACES_API_KEY_SERVER=your-new-server-key-here
GOOGLE_PLACES_API_KEY=AIzaSyB2RNc8IihbU1sBl6NQzOoUeMRNZEfOU1o # Keep for any client-side use
GOOGLE_PLACE_ID=ChIJDcbcERJxdkgReaFjdQ7fzfg

# In Vercel Dashboard
# Add the same environment variables to your Vercel project
```

### 4. Update the Code

Update `/lib/google/places-client.ts`:
```typescript
// Use server key for API calls
const API_KEY = process.env.GOOGLE_PLACES_API_KEY_SERVER || process.env.GOOGLE_PLACES_API_KEY
```

### 5. Test the Integration
```bash
# After updating, test locally:
npm run dev
# Visit http://localhost:3000/test-reviews

# Or test the API directly:
curl http://localhost:3000/api/reviews
```

## What You'll Get
- **Real Google Reviews**: The 5 most recent reviews (API limitation)
- **Accurate Ratings**: Real star rating and total review count
- **Auto-updates**: Reviews refresh when Google updates them

## Important Notes
- Google Places API only returns the **5 most recent reviews**
- For all reviews, you'd need Google My Business API (requires verification)
- Keep both API keys - one for server, one for client-side maps

## Alternative: Manual Review Management
If you can't fix the API, consider:
1. Manually copying real reviews with permission
2. Using review widgets from Google directly
3. Embedding Google reviews iframe (if available)