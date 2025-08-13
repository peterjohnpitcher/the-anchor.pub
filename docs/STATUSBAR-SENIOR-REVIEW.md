# StatusBar Real-Time Update Issue - Senior Developer Review

## Executive Summary

The StatusBar component on the website displays whether the pub is open/closed and kitchen status. Customers are getting confused because they're seeing outdated information when they load the page. The component doesn't update immediately on page load and only refreshes every 60 seconds, meaning customers might see "Closed" when the pub is actually open.

## The Problem in Detail

### Current Architecture

The StatusBar is a React client component that fetches opening hours from an API:

```typescript
// Component: /components/StatusBar.tsx
'use client'

export function StatusBar({ 
  refreshInterval = 5 * 60 * 1000, // Recently changed to 60 seconds
  ...
}) {
  const { hours, loading, error } = useBusinessHours({ 
    apiEndpoint, 
    refreshInterval 
  })
  
  // Renders: "Bar: Open until 10pm • Kitchen: Open until 9pm"
  // Or: "Bar: Closed, opens at 4pm"
}
```

The data fetching hook:

```typescript
// Hook: /hooks/useBusinessHours.ts
export function useBusinessHours(options) {
  const refreshInterval = options.refreshInterval || 60000 // 60 seconds
  
  const fetchHours = async () => {
    const response = await fetch('/api/business/hours?t=' + Date.now())
    // ... handle response
  }

  useEffect(() => {
    fetchHours() // Initial fetch
    
    if (refreshInterval > 0) {
      const interval = setInterval(fetchHours, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [apiEndpoint, refreshInterval])
}
```

### Why Customers Are Confused

1. **Stale Initial Data**: When a user loads the page at 4:01pm (just after opening), they might see "Closed" for up to 60 seconds
2. **Tab Switching**: User checks the site at 3:55pm (closed), leaves tab open, comes back at 4:05pm - still shows "Closed"
3. **No Immediate Updates**: The component uses polling, not real-time updates

### Real Customer Impact

- Customer sees "Bar: Closed" when it's actually open
- They might not visit thinking the pub is closed
- Lost business opportunity
- Poor user experience

## Proposed Solutions

### Phase 1: Quick Fixes (Minimal Risk)

These can be implemented immediately with very low risk:

#### 1. Force Immediate Refresh on Page Focus

```typescript
// Add to useBusinessHours hook
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      fetchHours() // Refresh when tab becomes visible
    }
  }
  
  const handleFocus = () => {
    fetchHours() // Refresh when window gets focus
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('focus', handleFocus)
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('focus', handleFocus)
  }
}, [])
```

**Benefits**: 
- Users returning to the tab see current status immediately
- No additional server load (only triggers on user action)
- Standard browser API, well-supported

#### 2. Reduce Polling Interval to 30 Seconds

```typescript
// Change default in StatusBar component
export function StatusBar({ 
  refreshInterval = 30000, // Was 60000
  ...
}) {
```

**Impact on API**:
- Current: 60 calls/hour/user
- Proposed: 120 calls/hour/user
- If 100 concurrent users: 12,000 calls/hour (200/minute)

#### 3. Add Smart Refresh Near Status Changes

```typescript
// Calculate next refresh based on proximity to open/close times
const calculateRefreshInterval = (hours) => {
  const now = new Date()
  const currentTime = now.getHours() + now.getMinutes() / 60
  
  // Find next status change time
  const nextChange = getNextStatusChangeTime(hours) // returns decimal hours
  const hoursUntilChange = nextChange - currentTime
  
  if (hoursUntilChange < 0.083) return 5000   // < 5 min: refresh every 5 sec
  if (hoursUntilChange < 0.5) return 15000    // < 30 min: refresh every 15 sec
  if (hoursUntilChange < 2) return 30000      // < 2 hours: refresh every 30 sec
  return 60000                                 // Otherwise: every 60 sec
}
```

### Phase 2: Better Architecture (Needs Discussion)

#### Option A: Server-Sent Events (SSE)

```typescript
// Server pushes updates when status changes
const eventSource = new EventSource('/api/business/hours/stream')

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  setHours(data)
}

// Server only sends data when status actually changes
// Much more efficient than polling
```

**Pros**: 
- Real-time updates
- Lower server load (only sends on change)
- One-way communication (simpler than WebSockets)

**Cons**: 
- Requires server infrastructure change
- Need to handle reconnection logic
- May need proxy/CDN configuration

#### Option B: Optimistic Client Updates

```typescript
// Calculate status client-side between API calls
const getOptimisticStatus = (lastApiData, lastFetchTime) => {
  const now = new Date()
  const timeSinceLastFetch = now - lastFetchTime
  
  // Use last known hours to calculate current status
  // Only rely on this for < 5 minutes since last fetch
  if (timeSinceLastFetch < 5 * 60 * 1000) {
    return calculateStatusFromHours(lastApiData.regularHours, now)
  }
  
  return lastApiData.currentStatus // Fall back to last API response
}
```

**Pros**: 
- Immediate updates without API calls
- Smooth UX
- No infrastructure changes

**Cons**: 
- Complexity in handling edge cases
- Need to handle special hours/holidays
- Clock sync issues between client/server

## Performance & Scale Considerations

### Current Load (Estimated)
- ~50-200 concurrent users during peak
- 60-second polling = 3,000-12,000 API calls/hour

### With Proposed Changes
- 30-second polling = 6,000-24,000 API calls/hour
- Smart intervals would reduce this during quiet periods
- Visibility detection prevents unnecessary calls

### API Optimization Options
```typescript
// Add caching headers to API response
res.setHeader('Cache-Control', 'public, max-age=30')
res.setHeader('ETag', generateETag(data))

// Client sends conditional requests
fetch('/api/business/hours', {
  headers: {
    'If-None-Match': lastETag
  }
})
// Returns 304 Not Modified if unchanged
```

## Risk Assessment

### Phase 1 Risks (Low)
- ✅ Visibility API is standard and well-supported
- ✅ Polling interval change is configurable
- ✅ Can rollback instantly if issues
- ⚠️ Slight increase in API load (2x)

### Phase 2 Risks (Medium)
- ⚠️ SSE requires infrastructure changes
- ⚠️ Optimistic updates need thorough testing
- ⚠️ Edge cases around timezone/DST changes

## My Recommendation

**Implement Phase 1 immediately** because:
1. Low risk, high impact
2. Solves 90% of customer confusion
3. Can be deployed today
4. Easy to monitor and rollback

**Then evaluate Phase 2** based on:
1. Actual API load after Phase 1
2. Customer feedback
3. Business priority vs development effort

## Questions for Senior Developer

1. **API Load Concerns**: Is 200 requests/minute acceptable for the `/api/business/hours` endpoint? Current infrastructure can handle this?

2. **Caching Strategy**: Should we implement ETags/conditional requests before increasing polling frequency?

3. **Real-time Priority**: Is this important enough to justify SSE/WebSocket infrastructure?

4. **Business Logic**: Are there special cases (holidays, private events) that would break optimistic client-side calculations?

5. **Monitoring**: What metrics should we track to measure success?

## Immediate Action Items

If approved, I can implement Phase 1 in this order:

1. Add visibility/focus detection (no server impact)
2. Deploy and monitor for 24 hours
3. Reduce polling to 30 seconds
4. Add smart intervals near open/close times
5. Monitor API metrics for a week
6. Decide on Phase 2 based on data

## Code Locations

- Main Component: `/components/StatusBar.tsx`
- Data Hook: `/hooks/useBusinessHours.ts`
- API Endpoint: `/api/business/hours`
- Debug Page: `/app/debug-hours/page.tsx` (for testing)

The changes would be isolated to the hook file primarily, making it easy to test and rollback if needed.