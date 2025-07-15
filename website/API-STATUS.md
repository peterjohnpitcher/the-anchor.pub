# The Anchor API Integration Status

## Current Status
As of testing, the API at `https://management.orangejelly.co.uk/api` is returning 401 Unauthorized errors despite using the provided API key.

## Configuration
- API Key: Configured in `.env.local` as `ANCHOR_API_KEY`
- Base URL: `https://management.orangejelly.co.uk/api`
- Authentication: Both `X-API-Key` header and `Authorization: Bearer` methods implemented

## Test Results
All endpoints tested return:
```json
{
  "code": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

## Implementation Details
The API client (`lib/api.ts`) has been updated to:
1. Support both authentication methods as documented
2. Properly handle error responses
3. Provide fallback content when API is unavailable
4. Cache responses for 5 minutes to reduce load

## Next Steps
1. Verify the API key is active and valid
2. Check if the API service is operational
3. The application currently shows static/fallback content when API is unavailable
4. Once API access is restored, dynamic content will automatically appear

## Fallback Behavior
The website gracefully handles API failures by:
- Showing sample events on the homepage
- Displaying static event information on the What's On page
- All other content is served from static pages