# The Anchor API Integration Report

## Overview
This report details the current API integration implementation and the authentication issues we're experiencing.

## API Configuration

### Base URL
```
https://management.orangejelly.co.uk/api
```

### API Key
```
anch_wzjjWLuMd5osCBUZA7YTAyIKagxI_oboVSXRyYiIHmg
```
*Stored in `.env.local` as `ANCHOR_API_KEY`*

## Implementation Details

### Authentication Methods Implemented
Following the API documentation, we've implemented BOTH authentication methods:

```typescript
// From lib/api.ts
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
}

if (this.apiKey) {
  headers['X-API-Key'] = this.apiKey
  headers['Authorization'] = `Bearer ${this.apiKey}`
}
```

### Endpoints We're Calling

1. **GET /events**
   - Used on: What's On page
   - Purpose: Fetch upcoming events
   - Parameters: `?per_page=20&status=scheduled&from_date={today}&sort=date&order=asc`

2. **GET /events/today**
   - Used on: Homepage
   - Purpose: Show today's events
   - Parameters: None

3. **GET /menu** (prepared but not actively used)
4. **GET /business/hours** (prepared but not actively used)
5. **GET /business/amenities** (prepared but not actively used)

## The Problem

### Error Response
All API calls return a 401 Unauthorized error:

```json
{
  "code": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

### Request Example
Here's an actual request being made:

```
URL: https://management.orangejelly.co.uk/api/events/today
Method: GET
Headers:
  Content-Type: application/json
  X-API-Key: anch_wzjjWLuMd5osCBUZA7YTAyIKagxI_oboVSXRyYiIHmg
  Authorization: Bearer anch_wzjjWLuMd5osCBUZA7YTAyIKagxI_oboVSXRyYiIHmg
```

### Response
```
Status: 401 Unauthorized
Body: {
  "code": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

## What We've Tried

1. **Both Authentication Methods**: Sending both `X-API-Key` header AND `Authorization: Bearer` header
2. **Verified API Key**: Confirmed the key is being sent correctly (first 10 chars: `anch_wzjjW...`)
3. **Checked Documentation**: Following the exact format from the provided API docs
4. **Different Endpoints**: All endpoints return the same 401 error

## Current Workaround

The website gracefully handles API failures by showing:
- Static day-specific events on the homepage
- Error messages with contact information on other pages
- All other content is served from static pages

## Questions for the API Developer

1. **Is the API key valid?** The key `anch_wzjjWLuMd5osCBUZA7YTAyIKagxI_oboVSXRyYiIHmg` returns unauthorized
2. **Is the API service currently active?** All endpoints return 401
3. **Are there any IP restrictions?** The requests are coming from Vercel's deployment servers
4. **Is there a different authentication format required?** We're following the documented format exactly
5. **Are there any CORS restrictions?** The website is deployed at `https://the-anchor-pub.vercel.app`

## Code References

- API Client: `/lib/api.ts`
- Homepage Integration: `/components/EventsToday.tsx` 
- Events Page Integration: `/components/UpcomingEvents.tsx`
- Environment Config: `/.env.local` (API key stored here)

## Next Steps

Once we receive a working API key or confirmation of the correct authentication method, the website will automatically start displaying dynamic content without any code changes needed. The integration is complete and ready.

## Contact

If you need to test the integration or need more details, the implementation is live at:
- Production: https://the-anchor-pub.vercel.app
- Repository: https://github.com/peterjohnpitcher/the-anchor.pub

The failed API calls can be observed in the browser's network inspector when visiting the homepage or What's On page.