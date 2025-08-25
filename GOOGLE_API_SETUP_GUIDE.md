# Complete Step-by-Step Guide: Setting Up Google Reviews

## Prerequisites
- Google account
- Access to Google Cloud Console
- Access to Vercel dashboard (for production)

---

## Part 1: Access Google Cloud Console

### Step 1: Open Google Cloud Console
1. Open your browser
2. Go to: **https://console.cloud.google.com**
3. Sign in with your Google account

### Step 2: Select or Create Project
1. Look at the top navigation bar for the project dropdown (next to "Google Cloud")
2. Click the dropdown
3. Either:
   - **Select existing project** if you have one for The Anchor
   - **Click "NEW PROJECT"** if you need to create one:
     - Project name: `the-anchor-pub`
     - Leave organization as is
     - Click "CREATE"
     - Wait 30 seconds for creation

---

## Part 2: Enable the Google Places API

### Step 3: Navigate to APIs
1. Click the **hamburger menu** (☰) in top-left
2. Select **"APIs & Services"**
3. Click **"Enabled APIs"**

### Step 4: Enable Places API
1. Click **"+ ENABLE APIS AND SERVICES"** button (top of page)
2. In the search box, type: `Places API`
3. Click on **"Places API"** (NOT "Places API (New)")
4. Click the blue **"ENABLE"** button
5. Wait for it to enable (10-20 seconds)

---

## Part 3: Create Server-Side API Key

### Step 5: Go to Credentials
1. In left sidebar, click **"Credentials"**
2. You should see existing API keys listed

### Step 6: Create New API Key
1. Click **"+ CREATE CREDENTIALS"** button (top of page)
2. Select **"API key"** from dropdown
3. A popup shows your new key - **DON'T CLOSE YET**
4. Click **"EDIT API KEY"** in the popup

### Step 7: Configure the API Key

#### Name the Key:
1. At the top, change name from "API Key 1" to: `The Anchor Server Key`

#### Set API Restrictions:
1. Scroll to **"API restrictions"** section
2. Select **"Restrict key"** radio button
3. In the dropdown, select:
   - **Google Places API**
   - (Deselect any others)
4. Click **"OK"** or **"DONE"** on the dropdown

#### Set Application Restrictions:
1. Scroll to **"Application restrictions"** section
2. Select **"IP addresses (web servers, cron jobs, etc.)"**
3. Under "Accept requests from these server IP addresses":
   - Click **"ADD AN ITEM"**
   - For development, add: `127.0.0.1`
   - Click **"ADD AN ITEM"** again
   - For development, also add your public IP:
     - Google "what is my IP" and copy the number
     - Paste it here
   - Click **"DONE"**

### Step 8: Save the Key
1. Click blue **"SAVE"** button at bottom
2. **COPY THE API KEY** - it looks like: `AIzaSy...` (40 characters)
3. Save it somewhere safe temporarily

---

## Part 4: Get Vercel IP Addresses (For Production)

### Step 9: Find Vercel IPs
1. Open new tab, go to: **https://vercel.com/dashboard**
2. Click on your `the-anchor-pub` project
3. Go to **"Settings"** tab
4. Scroll to **"Domains"** section
5. Note: Vercel uses dynamic IPs, so instead:
   - We'll remove IP restrictions for production
   - OR use Vercel's Edge Config (advanced)

### Step 10: Update API Key for Production
1. Go back to Google Cloud Console
2. Edit your Server API Key
3. Under Application restrictions:
   - Change to **"None"** for now
   - (This is less secure but will work with Vercel)
4. Click **"SAVE"**

---

## Part 5: Update Your Code

### Step 11: Update Local Environment
1. Open your code editor
2. Open file: `.env.local`
3. Add these lines:
```bash
# Existing key (keep for reference)
GOOGLE_PLACES_API_KEY=AIzaSyB2RNc8IihbU1sBl6NQzOoUeMRNZEfOU1o

# New server key (paste your new key here)
GOOGLE_PLACES_API_KEY_SERVER=YOUR_NEW_KEY_HERE

# Place ID (keep the same)
GOOGLE_PLACE_ID=ChIJDcbcERJxdkgReaFjdQ7fzfg
```
4. Replace `YOUR_NEW_KEY_HERE` with the key you copied
5. Save the file

### Step 12: Update the Code
1. Open: `/lib/google/places-client.ts`
2. Find line 58-59 that says:
```typescript
if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.GOOGLE_PLACE_ID) {
```
3. Change it to:
```typescript
const API_KEY = process.env.GOOGLE_PLACES_API_KEY_SERVER || process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY || !process.env.GOOGLE_PLACE_ID) {
```
4. Find line 65 that says:
```typescript
process.env.GOOGLE_PLACES_API_KEY,
```
5. Change it to:
```typescript
API_KEY,
```
6. Save the file

---

## Part 6: Add to Vercel (Production)

### Step 13: Add Environment Variables to Vercel
1. Go to: **https://vercel.com/dashboard**
2. Click your `the-anchor-pub` project
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Add new variable:
   - Key: `GOOGLE_PLACES_API_KEY_SERVER`
   - Value: (paste your new API key)
   - Environment: ✓ Production, ✓ Preview, ✓ Development
   - Click **"Save"**

---

## Part 7: Test Everything

### Step 14: Test Locally
1. In terminal, restart your dev server:
```bash
npm run dev
```
2. Open browser to: **http://localhost:3000/test-reviews**
3. Check if you see:
   - "GOOGLE_PLACES_API_KEY: ✅ SET"
   - Real reviews loading (not mock data)

### Step 15: Test API Directly
1. In terminal, run:
```bash
curl http://localhost:3000/api/reviews | grep "source"
```
2. Should see: `"source":"places"` (not "mock")

### Step 16: Deploy and Test Production
1. Commit and push your changes:
```bash
git add .
git commit -m "fix: configure server-side Google Places API key"
git push
```
2. Wait for Vercel to deploy
3. Visit your live site and check reviews

---

## Troubleshooting

### If you see "REQUEST_DENIED":
- API key has wrong restrictions
- Places API not enabled
- Wrong API key in environment

### If you see mock reviews:
- API key not working
- Check `.env.local` has correct key
- Restart dev server after changing `.env.local`

### If reviews don't update:
- Google only provides 5 most recent
- Reviews are cached for 1 hour
- Clear cache or wait

---

## Security Notes

⚠️ **Important**: The server API key should:
- Never be exposed in client-side code
- Have IP restrictions in production (if possible)
- Be different from any client-side keys

---

## Need Help?

If stuck at any step:
1. Take screenshot of error
2. Check Google Cloud Console logs
3. Verify all environment variables are set
4. Make sure Places API is enabled in Google Cloud