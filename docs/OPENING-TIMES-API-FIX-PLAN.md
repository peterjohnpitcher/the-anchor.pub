# Opening Times API Implementation Fix Plan

## Audit Summary & Action Items

Based on the senior developer's audit, here's the comprehensive fix plan for the opening times/status bar system.

## 🔴 CRITICAL FIXES (Immediate)

### 1. Polling & Cache Timing (Currently 5 min, should be 1 min)

**Files to Update:**
- `/app/api/business/hours/route.ts`
- `/hooks/useBusinessHours.ts`
- `/components/StatusBar.tsx`
- `/components/StatusBarWrapper.tsx`

**Changes Required:**
```typescript
// app/api/business/hours/route.ts
headers: {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' // Was 300
}

// hooks/useBusinessHours.ts
export function useBusinessHours(refreshInterval = 60000) { // Was 300000

// components/StatusBar.tsx & StatusBarWrapper.tsx
const { hours, loading, error } = useBusinessHours(60000) // Was 300000
```

### 2. Special Hours Precedence Logic

**Current Issue:** Only checking regularHours, ignoring specialHours (holidays/modified days)

**Fix Implementation:**
```typescript
// New utility function in lib/business-hours-utils.ts
export function getHoursForDate(data: BusinessHoursResponse, date: Date): DayHours {
  const dateStr = format(date, 'yyyy-MM-dd')
  
  // Check special hours FIRST
  if (data.specialHours?.[dateStr]) {
    return data.specialHours[dateStr]
  }
  
  // Fall back to regular hours
  const dayName = format(date, 'EEEE').toLowerCase()
  return data.regularHours[dayName]
}
```

### 3. Kitchen State Logic - Missing `is_kitchen_closed` Check

**Current Code:**
```typescript
// Only checking kitchen times, not is_kitchen_closed flag
```

**Required Fix:**
```typescript
// hooks/useKitchenStatus.ts
export function computeKitchenStatus(data: BusinessHoursResponse): KitchenStatus {
  // Complete kitchen closed logic
  const isKitchenClosed = 
    data.currentStatus.is_kitchen_closed === true ||
    data.regularHours[today].kitchen === null ||
    data.regularHours[today].is_closed === true ||
    !data.currentStatus.isOpen
    
  return {
    isOpen: !isKitchenClosed,
    openTime: data.regularHours[today].kitchen?.opens,
    closeTime: data.regularHours[today].kitchen?.closes,
    message: isKitchenClosed ? 'Kitchen closed' : null
  }
}
```

## 🟡 IMPORTANT FIXES (This Week)

### 4. Timezone Handling

**Install Required:**
```bash
npm install luxon @types/luxon
```

**Implementation:**
```typescript
// lib/timezone-utils.ts
import { DateTime } from 'luxon'

export function parseAPITime(timeStr: string): DateTime {
  return DateTime.fromISO(timeStr, { zone: 'Europe/London' })
}

export function isCurrentlyOpen(opens: string, closes: string): boolean {
  const now = DateTime.now().setZone('Europe/London')
  const openTime = parseAPITime(opens)
  const closeTime = parseAPITime(closes)
  
  // Handle midnight closing
  if (closeTime <= openTime) {
    return now >= openTime || now < closeTime
  }
  
  return now >= openTime && now < closeTime
}
```

### 5. Use `upcomingWeek` and `today` Data

**New Component Required:**
```typescript
// components/WeeklySchedule.tsx
export function WeeklySchedule({ data }: { data: BusinessHoursResponse }) {
  return (
    <div className="weekly-schedule">
      {/* Today Card */}
      <div className="today-card">
        <h3>Today</h3>
        <p>{data.today.summary}</p>
        {data.today.isSpecialHours && (
          <Badge variant="warning">Special Hours</Badge>
        )}
        {data.today.events?.[0] && (
          <p className="event">🎉 {data.today.events[0].name}</p>
        )}
      </div>
      
      {/* Week View */}
      <div className="week-grid">
        {data.upcomingWeek.map(day => (
          <div key={day.date} className={day.status !== 'normal' ? 'highlight' : ''}>
            <span>{day.dayName}</span>
            <span>{day.hours}</span>
            {day.note && <Badge>{day.note}</Badge>}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 6. Rate Limiting Headers

**Update Error Handling:**
```typescript
// lib/api.ts
async fetchWithRateLimit(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  
  // Read rate limit headers
  const remaining = response.headers.get('X-RateLimit-Remaining')
  const reset = response.headers.get('X-RateLimit-Reset')
  
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After')
    const delay = retryAfter ? parseInt(retryAfter) * 1000 : this.getBackoffDelay()
    
    await new Promise(resolve => setTimeout(resolve, delay))
    return this.fetchWithRateLimit(url, options) // Retry
  }
  
  // Store rate limit info for intelligent polling
  this.rateLimitInfo = { remaining: Number(remaining), reset: Number(reset) }
  
  return response
}

private getBackoffDelay(): number {
  // Exponential backoff: 1s → 2s → 4s → 8s
  this.retryCount = (this.retryCount || 0) + 1
  return Math.min(1000 * Math.pow(2, this.retryCount - 1), 8000)
}
```

## 🟢 ENHANCEMENTS (Next Sprint)

### 7. SEO Structured Data

**Add to Layout/Pages:**
```typescript
// lib/structured-data.ts
export function generateOpeningHoursSchema(data: BusinessHoursResponse) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "openingHoursSpecification": Object.entries(data.regularHours).map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
      "opens": hours.opens,
      "closes": hours.closes
    })),
    "specialOpeningHoursSpecification": Object.entries(data.specialHours || {}).map(([date, hours]) => ({
      "@type": "OpeningHoursSpecification",
      "validFrom": date,
      "validThrough": date,
      "opens": hours.opens,
      "closes": hours.closes || "00:00" // Closed all day
    }))
  }
}
```

### 8. Status Bar CTA Logic

**Update BookTableButton:**
```typescript
// components/BookTableButton.tsx
export function BookTableButton({ data }: { data?: BusinessHoursResponse }) {
  const canBook = data?.currentStatus?.services?.bookings?.accepting === true
  
  if (!canBook) {
    return (
      <Button disabled>
        Bookings Temporarily Unavailable
      </Button>
    )
  }
  
  return (
    <Button>
      Book Table
      {data.currentStatus.availableSlots && (
        <span className="ml-2">
          Next: {data.currentStatus.availableSlots[0]}
        </span>
      )}
    </Button>
  )
}
```

### 9. Graceful Degradation

**Add Fallback Display:**
```typescript
// components/StatusBar.tsx
export function StatusBar() {
  const { data, error, lastSuccessfulData } = useBusinessHours()
  
  if (error && lastSuccessfulData) {
    return (
      <div className="status-bar degraded">
        <StatusDisplay data={lastSuccessfulData} />
        <span className="update-note">
          Last updated: {format(lastSuccessfulData.timestamp, 'HH:mm')}
        </span>
      </div>
    )
  }
  
  // Normal render...
}
```

## Implementation Checklist

### Phase 1 - Critical (Today)
- [ ] Update all cache/polling to 60 seconds
- [ ] Implement special hours precedence
- [ ] Add is_kitchen_closed check
- [ ] Fix timezone handling with Luxon

### Phase 2 - Important (This Week)
- [ ] Create WeeklySchedule component
- [ ] Implement rate limit handling
- [ ] Add upcomingWeek display
- [ ] Use today summary block

### Phase 3 - Enhancements (Next Sprint)
- [ ] Add SEO structured data
- [ ] Update booking CTA logic
- [ ] Implement graceful degradation
- [ ] Add "last updated" timestamps

## Testing Checklist

### Acceptance Criteria
- [ ] Status flips within ≤60s of actual time change
- [ ] Special dates show correct modified hours
- [ ] Kitchen badge never shows open when is_kitchen_closed=true
- [ ] Weekly table matches upcomingWeek exactly
- [ ] Schema.org validates in Rich Results test
- [ ] Graceful fallback on API errors

### Test Scenarios
1. **Normal Hours**: Verify regular weekday display
2. **Special Hours**: Test holiday/modified days
3. **Kitchen Closed**: Monday (kitchen closed all day)
4. **Midnight Closing**: Friday/Saturday edge case
5. **DST Transition**: Spring/autumn clock changes
6. **API Failure**: Network error handling
7. **Rate Limiting**: 429 response handling

## TypeScript Utility Module

Create `/lib/business-hours-processor.ts`:

```typescript
import { DateTime } from 'luxon'

interface ProcessedHours {
  statusBar: {
    isOpen: boolean
    isKitchenOpen: boolean
    message: string
    closesIn?: string
    opensIn?: string
  }
  todayCard: {
    summary: string
    isSpecial: boolean
    events: Array<{ name: string; time: string }>
  }
  weekView: Array<{
    date: string
    day: string
    hours: string
    isToday: boolean
    isSpecial: boolean
    note?: string
  }>
}

export class BusinessHoursProcessor {
  private timezone = 'Europe/London'
  
  process(apiResponse: BusinessHoursResponse): ProcessedHours {
    const now = DateTime.now().setZone(this.timezone)
    
    return {
      statusBar: this.processStatusBar(apiResponse, now),
      todayCard: this.processTodayCard(apiResponse.today),
      weekView: this.processWeekView(apiResponse.upcomingWeek, now)
    }
  }
  
  private processStatusBar(data: BusinessHoursResponse, now: DateTime) {
    const { currentStatus } = data
    
    // Apply all business rules
    const isKitchenClosed = 
      currentStatus.is_kitchen_closed || 
      !currentStatus.kitchenOpen ||
      !currentStatus.isOpen
    
    return {
      isOpen: currentStatus.isOpen,
      isKitchenOpen: !isKitchenClosed,
      message: this.getStatusMessage(currentStatus),
      closesIn: currentStatus.closesIn,
      opensIn: currentStatus.opensIn
    }
  }
  
  private processTodayCard(today: TodayData) {
    return {
      summary: today.summary,
      isSpecial: today.isSpecialHours,
      events: today.events || []
    }
  }
  
  private processWeekView(week: WeekData[], now: DateTime) {
    return week.map(day => ({
      date: day.date,
      day: day.dayName,
      hours: this.formatHours(day),
      isToday: day.date === now.toISODate(),
      isSpecial: day.status !== 'normal',
      note: day.note
    }))
  }
  
  private getStatusMessage(status: CurrentStatus): string {
    if (!status.isOpen) {
      return status.opensIn ? `Opens ${status.opensIn}` : 'Closed'
    }
    
    if (status.is_kitchen_closed) {
      return 'Open (Kitchen Closed)'
    }
    
    return status.closesIn ? `Open until ${status.closesIn}` : 'Open Now'
  }
  
  private formatHours(day: DayData): string {
    if (day.is_closed) return 'CLOSED'
    return `${day.opens} - ${day.closes}`
  }
}
```

## Next Steps

1. **Immediate**: Fix cache/polling timing (5 min → 1 min)
2. **Today**: Implement special hours and kitchen logic
3. **This Week**: Add timezone handling and weekly view
4. **Next Sprint**: SEO and enhanced error handling

---

*Generated from senior developer audit feedback*
*Priority: HIGH - Customer-facing accuracy issues*
*Timeline: Phase 1 implementation within 24 hours*