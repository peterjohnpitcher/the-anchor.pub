# Google Places Reviews Integration

The site pulls the latest five Google reviews and rating details from the Google Places API. Follow this guide whenever you rotate credentials, onboard a new environment, or troubleshoot missing reviews.

## Prerequisites

- Google account with access to the pub's Google Business profile.
- Project in Google Cloud Console (create one named `the-anchor-pub` if needed).
- Vercel access for configuring production environment variables.

## Configure API Access

1. **Enable the API**
   - Open https://console.cloud.google.com.
   - Select the `the-anchor-pub` project (or create it).
   - Navigate to **APIs & Services → Enabled APIs & services**.
   - Click **+ ENABLE APIS AND SERVICES**, search for **Places API**, and enable it.

2. **Create a server API key**
   - Go to **APIs & Services → Credentials**.
   - Click **+ CREATE CREDENTIALS → API key** and name it `The Anchor Server Key`.
   - Under **Application restrictions**, choose **IP addresses** and add the Vercel production IPs plus your local IP (optional).
   - Under **API restrictions**, restrict the key to **Google Places API**.

3. **(Optional) Retain the legacy browser key**
   - If the old browser key (`GOOGLE_PLACES_API_KEY`) is still used for client-side widgets, keep it restricted to HTTP referrers only.

## Environment Variables

Add these variables to `.env.local` for local development and to the Vercel production environment:

```bash
GOOGLE_PLACES_API_KEY_SERVER=your-server-side-key
GOOGLE_PLACES_API_KEY=legacy-browser-key-if-needed
GOOGLE_PLACE_ID=ChIJDcbcERJxdkgReaFjdQ7fzfg
```

The code prefers `GOOGLE_PLACES_API_KEY_SERVER` (see `lib/google/places-client.ts`). If it is missing, it will fall back to `GOOGLE_PLACES_API_KEY`.

## Verifying the Integration

1. Run `npm run dev` and visit `/test-reviews` to trigger a live fetch.
2. Hit `GET /api/reviews` or `GET /api/reviews/status` locally or in production to confirm credentials are detected.
3. In production, deploy via `vercel deploy --prod` once variables are saved; the API calls are server-side only.

## Troubleshooting

- **Error: API keys with referer restrictions**  
  Ensure the server key uses IP restrictions, not HTTP referrers.

- **No reviews returned**  
  Double-check that the Place ID matches the business listing. You can discover it via https://developers.google.com/maps/documentation/places/web-service/place-id.

- **Rate limits or quota exceeded**  
  Monitor the Google Cloud usage dashboard; the reviews endpoint is light, but spikes may occur during heavy testing.

- **Only five reviews visible**  
  This is a Google Places API limitation. Fetching the full history requires the Google My Business API.

Keep credentials out of git history and rotate keys if they are ever exposed.
