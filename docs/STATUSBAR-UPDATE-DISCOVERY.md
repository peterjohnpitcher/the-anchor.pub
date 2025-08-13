# StatusBar Real-Time Update Discovery Report

## Issue Summary
**GitHub Issue:** [#69](https://github.com/peterjohnpitcher/the-anchor.pub/issues/69)

The StatusBar component is not updating automatically when the page is loaded, causing customer confusion about the venue's current open/closed status. The component shows static information that was rendered at the initial load time and doesn't reflect real-time changes.

## Current Implementation Analysis

### Architecture Overview
1. **Component Type:** Client Component (`'use client'`)
2. **Location:** `/components/StatusBar.tsx`
3. **Data Source:** `useBusinessHours` hook fetching from `/api/business/hours`
4. **Refresh Mechanism:** Polling via `setInterval` (default 60 seconds)

### Key Components

#### StatusBar Component
- Client-side React component using hooks
- Depends on `useBusinessHours` and `useKitchenStatus` hooks
- Renders status based on API data
- Has refresh capability but defaults to 5 minutes (recently changed to 60 seconds per audit)

#### useBusinessHours Hook
- Fetches data from API endpoint
- Implements polling with configurable `refreshInterval`
- Adds cache-busting timestamp to prevent stale data
- Returns: `{ hours, loading, error, refresh }`

#### Rendering Pattern
- Most pages import `StatusBar` directly
- Component is rendered client-side with SSR enabled
- Uses `StatusBarWrapper` with dynamic imports in some cases
- Includes loading skeletons for better UX

## Problems Identified

### 1. Initial Load Issue
**Problem:** StatusBar shows stale data on page load
- Component renders with initial SSR data
- Client-side hydration doesn't immediately refresh
- Users see outdated status until first refresh interval

### 2. Refresh Interval Too Long
**Current Setting:** 60 seconds (was 5 minutes)
- Still too long for critical status information
- Customers may see wrong status for up to a minute
- No immediate update when crossing open/close times

### 3. No Real-Time Updates
**Current Approach:** Polling only
- No WebSocket or Server-Sent Events
- No visibility change detection
- No automatic refresh on focus/tab switch

### 4. Logic Bug (Previously Fixed)
**Reference:** `/docs/STATUSBAR-COMPLETE-LOGIC-ANALYSIS.md`
- Bug where "tomorrow" was shown instead of "today"
- Fixed in recent commits but highlights fragility

## Solutions & Recommendations

### Immediate Fixes (Quick Wins)

#### 1. Force Immediate Refresh on Mount
```typescript
// In useBusinessHours hook
useEffect(() => {
  // Fetch immediately on mount
  fetchHours()
  
  // Then set up interval
  if (refreshInterval > 0) {
    const interval = setInterval(fetchHours, refreshInterval)
    return () => clearInterval(interval)
  }
}, [apiEndpoint, refreshInterval])
```

#### 2. Reduce Refresh Interval
- Change default to 30 seconds or less
- Consider 10-15 seconds during business hours
- Could be dynamic based on proximity to open/close times

#### 3. Add Visibility Change Detection
```typescript
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      fetchHours() // Refresh when tab becomes visible
    }
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange)
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
}, [])
```

### Medium-Term Improvements

#### 1. Smart Refresh Intervals
```typescript
const calculateRefreshInterval = (hours) => {
  const minutesUntilChange = getMinutesUntilNextStatusChange(hours)
  
  if (minutesUntilChange < 5) return 10000 // 10 seconds
  if (minutesUntilChange < 30) return 30000 // 30 seconds
  return 60000 // 1 minute default
}
```

#### 2. Optimistic UI Updates
- Calculate expected state changes client-side
- Update UI immediately when crossing time boundaries
- Verify with API in background

#### 3. Better Error Handling
- Show last known good state on error
- Add retry logic with exponential backoff
- Display user-friendly error messages

### Long-Term Solutions

#### 1. Server-Sent Events (SSE)
```typescript
// API endpoint that streams updates
const eventSource = new EventSource('/api/business/hours/stream')
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  updateStatus(data)
}
```

#### 2. WebSocket Implementation
- Real-time bidirectional communication
- Instant updates when status changes
- More complex but most responsive

#### 3. Service Worker with Background Sync
- Update status even when page not visible
- Cache latest status for offline support
- Push notifications for status changes

## Performance Considerations

### Current Impact
- API calls every 60 seconds per client
- Minimal bandwidth (~500 bytes per request)
- No significant performance issues observed

### With Proposed Changes
- More frequent updates = more API calls
- Consider implementing:
  - Response caching with ETags
  - Conditional requests (If-Modified-Since)
  - CDN caching for static periods

## Implementation Priority

### Phase 1 - Immediate (This Week)
1. ✅ Fix immediate refresh on mount
2. ✅ Add visibility change detection
3. ✅ Reduce refresh interval to 30 seconds
4. ✅ Test thoroughly on debug page

### Phase 2 - Short Term (Next Sprint)
1. Implement smart refresh intervals
2. Add focus detection
3. Improve error handling
4. Add loading states for updates

### Phase 3 - Long Term (Future)
1. Evaluate SSE vs WebSocket
2. Implement chosen real-time solution
3. Add offline support
4. Consider push notifications

## Testing Requirements

### Manual Testing
1. Load page and verify immediate status
2. Keep page open across status change time
3. Switch tabs and return - verify refresh
4. Test on mobile with app switching
5. Test with poor network conditions

### Automated Testing
```typescript
// Example test cases
describe('StatusBar Updates', () => {
  it('should refresh immediately on mount')
  it('should update when tab becomes visible')
  it('should handle API errors gracefully')
  it('should update within 30 seconds of status change')
})
```

## Metrics to Track

1. **User Confusion Rate**
   - Support tickets about wrong status
   - Click-through on closed status

2. **Technical Metrics**
   - API call frequency
   - Error rates
   - Update latency

3. **Performance Impact**
   - Page load time
   - Time to Interactive (TTI)
   - API response times

## Conclusion

The StatusBar update issue is causing real customer confusion and needs immediate attention. The quick wins (immediate refresh, visibility detection, shorter intervals) can be implemented quickly with minimal risk. 

The longer-term real-time solutions would provide the best user experience but require more development effort and infrastructure changes.

**Recommended Next Steps:**
1. Implement Phase 1 fixes immediately
2. Deploy to production with monitoring
3. Gather user feedback for 1-2 weeks
4. Evaluate need for Phase 2/3 based on impact

## Related Documents
- `/docs/STATUSBAR-COMPLETE-LOGIC-ANALYSIS.md` - Logic bug analysis
- `/components/StatusBar.tsx` - Main component
- `/hooks/useBusinessHours.ts` - Data fetching hook
- `/app/debug-hours/page.tsx` - Debug/testing page