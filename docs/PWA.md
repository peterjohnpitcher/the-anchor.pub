# Progressive Web App (PWA) Implementation

The Anchor website is now a Progressive Web App, providing an app-like experience with offline capabilities.

## Features Implemented

### 1. Web App Manifest (`/public/manifest.json`)
- App name and description
- Theme colors matching The Anchor branding
- Icon sizes for all devices (72x72 to 512x512)
- Shortcuts for quick access to key pages
- Screenshot placeholders for app stores

### 2. Service Worker (`/public/sw.js`)
- Offline page fallback
- Basic caching strategy
- Network-first approach with cache fallback
- Automatic cache updates

### 3. Offline Page (`/app/offline`)
- User-friendly offline message
- Contact information available offline
- Retry functionality

### 4. PWA Meta Tags
- Apple touch icons
- Theme color
- Mobile web app capable flags
- Status bar styling

## Installation Instructions

Users can install The Anchor as an app:

### Desktop (Chrome/Edge)
1. Visit the website
2. Click the install icon in the address bar
3. Follow the prompts

### Mobile (Android)
1. Visit the website in Chrome
2. Tap the "Add to Home Screen" banner
3. Or use browser menu > "Add to Home Screen"

### Mobile (iOS)
1. Visit the website in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"

## Benefits

1. **Offline Access**: Basic pages cached for offline viewing
2. **App-like Experience**: Fullscreen mode without browser UI
3. **Faster Loading**: Cached resources load instantly
4. **Home Screen Access**: One-tap access from device home screen
5. **Push Notifications**: Ready for future implementation

## Future Enhancements

1. **Push Notifications**
   - Event reminders
   - Special offers
   - Last orders alerts

2. **Background Sync**
   - Submit bookings when back online
   - Sync favorite events

3. **Enhanced Caching**
   - Cache API responses
   - Offline menu viewing
   - Image optimization

4. **App Store Listing**
   - TWA (Trusted Web Activity) for Google Play
   - Consider native wrapper for iOS

## Icon Requirements

To fully implement the PWA, create these icon files in `/public/icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

Icons should feature The Anchor logo with sufficient padding for maskable display.

## Testing

1. **Lighthouse PWA Audit**
   - Run Lighthouse in Chrome DevTools
   - Check PWA section for compliance

2. **Installation Testing**
   - Test on various devices
   - Verify offline functionality
   - Check icon display

3. **Service Worker Testing**
   - Check DevTools > Application > Service Workers
   - Test offline mode
   - Verify cache storage

## Monitoring

- Track PWA installs in Google Analytics
- Monitor service worker errors
- Check cache hit rates
- User engagement metrics for installed apps