# API Usage Documentation - The Anchor Pub Website

## Overview

This document provides a comprehensive overview of how The Anchor pub website integrates with external APIs, primarily the OrangeJelly management system API. This is intended for technical review by senior developers.

## Table of Contents
1. [API Architecture](#api-architecture)
2. [Authentication & Security](#authentication--security)
3. [API Endpoints Used](#api-endpoints-used)
4. [Implementation Patterns](#implementation-patterns)
5. [Data Flow](#data-flow)
6. [Caching Strategy](#caching-strategy)
7. [Error Handling](#error-handling)
8. [Known Issues](#known-issues)
9. [Code Examples](#code-examples)
10. [Recommendations](#recommendations)

## API Architecture

### External API Provider
- **Provider**: OrangeJelly Management System
- **Base URL**: `https://management.orangejelly.co.uk/api`
- **Protocol**: HTTPS REST API
- **Authentication**: API Key (X-API-Key header)
- **Response Format**: JSON

### Internal Architecture
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  React Client   │────▶│ Next.js API      │────▶│ External API    │
│  Components     │◀────│ Routes (Proxy)   │◀────│ (OrangeJelly)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        ▲                        ▲                         ▲
        │                        │                         │
   React Hooks              Server Cache              API Key Auth
```

## Authentication & Security

### API Key Management
```typescript
// Environment variable (never exposed to client)
ANCHOR_API_KEY=anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4

// Server-side usage only (/lib/api.ts)
headers: {
  'X-API-Key': process.env.ANCHOR_API_KEY,
  'Content-Type': 'application/json',
}
```

### Security Implementation
1. **Proxy Pattern**: All API calls go through Next.js API routes
2. **Environment Variables**: API keys stored in `.env.local`
3. **CORS Handling**: Configured in Next.js API routes
4. **No Client Exposure**: API keys never sent to browser

## API Endpoints Used

### 1. Business Hours & Status
```typescript
GET /business/hours
Purpose: Fetch current opening hours and live status
Usage: Status bars, header displays, booking validation
Response: {
  regularHours: { [day]: { opens, closes, kitchen } },
  currentStatus: { isOpen, kitchenOpen, closesIn, opensIn }
}
```

### 2. Table Booking
```typescript
POST /bookings/create
Purpose: Submit table reservations
Payload: {
  date, time, partySize, customerDetails,
  booking_type: "regular" | "sunday_lunch",
  menuSelections?: [...] // For Sunday lunch
}
Response: {
  success, booking: { reference, payment_required, payment_url }
}
```

### 3. Availability Check
```typescript
GET /bookings/availability/{date}
Purpose: Check available booking times
Response: {
  available_times: string[],
  blocked_times: string[]
}
```

### 4. Sunday Lunch Menu
```typescript
GET /menu/sunday-lunch
Purpose: Fetch current Sunday lunch menu items
Response: {
  items: [{ id, name, description, price, category }]
}
```

### 5. Event Booking
```typescript
POST /events/book
Purpose: Book tickets for events (drag shows, quizzes)
Payload: {
  event_id, quantity, customer_details
}
```

### 6. Newsletter Subscription
```typescript
POST /newsletter/subscribe
Purpose: Add email to mailing list
Payload: { email, marketing_consent }
```

## Implementation Patterns

### 1. API Client Class (`/lib/api.ts`)
```typescript
export class AnchorAPI {
  private apiKey: string
  private baseURL = 'https://management.orangejelly.co.uk/api'

  async fetchWithAuth(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    
    if (!response.ok) {
      throw new APIError(response.status, await response.text())
    }
    
    return response.json()
  }
}
```

### 2. Next.js API Routes Pattern
```typescript
// /app/api/business/hours/route.ts
export async function GET(request: Request) {
  try {
    const api = new AnchorAPI(process.env.ANCHOR_API_KEY!)
    const data = await api.getBusinessHours()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    return handleAPIError(error)
  }
}
```

### 3. React Hook Pattern
```typescript
// /hooks/useBusinessHours.ts
export function useBusinessHours(refreshInterval = 300000) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/business/hours')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

  return { data, loading, error, refresh: fetchData }
}
```

## Data Flow

### Typical Request Flow
1. **User Action**: User interacts with UI component
2. **React Hook**: Component calls custom hook (e.g., `useBusinessHours`)
3. **Internal API Call**: Hook fetches from `/api/business/hours`
4. **Proxy Request**: Next.js route calls external API with authentication
5. **External API**: OrangeJelly processes request
6. **Response Chain**: Data flows back through proxy to client
7. **State Update**: React updates UI with new data

### Example: Table Booking Flow
```
User fills form → BookingWizard component → submitBooking() 
→ POST /api/bookings/create → External API → Booking confirmation 
→ Payment redirect (if required) → Success page
```

## Caching Strategy

### Server-Side Caching
```typescript
// Next.js fetch with revalidation
fetch(url, {
  next: { 
    revalidate: 300 // 5-minute cache for business hours
  }
})

// Shorter cache for critical data
fetch(url, {
  next: { 
    revalidate: 60 // 1-minute cache for availability
  }
})
```

### Client-Side Cache Busting
```typescript
// Prevent browser caching with timestamp
const url = `/api/business/hours?t=${Date.now()}`
fetch(url, { cache: 'no-store' })
```

### Cache Headers
```typescript
// API route response headers
'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
```

## Error Handling

### Error Response Structure
```typescript
interface APIError {
  error: string
  message: string
  statusCode: number
  details?: any
  timestamp: string
  correlationId?: string
}
```

### Error Handling Layers

#### 1. External API Errors
```typescript
// Handle specific API error codes
switch (response.status) {
  case 401:
    throw new Error('API authentication failed')
  case 429:
    throw new Error('Rate limit exceeded')
  case 503:
    throw new Error('Service temporarily unavailable')
}
```

#### 2. Proxy Layer Errors
```typescript
// /app/api/[...]/route.ts
catch (error) {
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }
  
  // Generic error fallback
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

#### 3. Client-Side Error Handling
```typescript
// React component error boundaries
if (error) {
  return <ErrorDisplay message={getUserFriendlyError(error)} />
}

// Graceful degradation
if (!data) {
  return <FallbackContent />
}
```

## Known Issues

### Critical Issues

#### 1. Midnight Closing Time Bug
**Problem**: API returns `isOpen: false` for venues closing at 00:00
**Impact**: Shows "closed" during peak Friday/Saturday evening hours
**Workaround**: None currently - requires API fix

#### 2. Sunday Lunch Payment Integration
**Problem**: API doesn't return payment URLs for Sunday lunch bookings
**Impact**: Cannot complete bookings requiring deposits
**Workaround**: Manual payment processing

### Medium Priority Issues

#### 3. Rate Limiting
**Problem**: No rate limit information in API responses
**Impact**: Cannot implement proper backoff strategies

#### 4. Inconsistent Error Messages
**Problem**: API error messages vary in format
**Impact**: Difficult to provide consistent user experience

## Code Examples

### Making an API Call
```typescript
// Using the API client
const api = new AnchorAPI(process.env.ANCHOR_API_KEY!)
const hours = await api.getBusinessHours()

// Using hooks in components
function StatusBar() {
  const { data, loading, error } = useBusinessHours()
  
  if (loading) return <Skeleton />
  if (error) return null
  
  return <StatusDisplay {...data} />
}
```

### Submitting a Booking
```typescript
async function submitBooking(bookingData: BookingFormData) {
  const response = await fetch('/api/bookings/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  })
  
  const result = await response.json()
  
  if (result.payment_required) {
    window.location.href = result.payment_url
  } else {
    router.push(`/booking-confirmation?ref=${result.reference}`)
  }
}
```

## Recommendations

### Immediate Actions
1. **Fix Critical Bugs**: Work with OrangeJelly to fix midnight closing and payment issues
2. **Add Monitoring**: Implement API health monitoring and alerting
3. **Improve Fallbacks**: Add static fallback data for when API is unavailable

### Architecture Improvements
1. **Implement React Query/SWR**: Better caching and synchronization
2. **Add Request Queuing**: Prevent duplicate concurrent requests
3. **WebSocket Integration**: Real-time updates for status changes
4. **Offline Support**: Service worker for offline functionality

### Performance Optimizations
1. **Request Deduplication**: Share API responses across components
2. **Predictive Prefetching**: Preload likely next requests
3. **Response Compression**: Enable gzip/brotli compression
4. **Edge Caching**: Use CDN for static API responses

### Security Enhancements
1. **API Key Rotation**: Implement regular key rotation
2. **Request Signing**: Add request signatures for integrity
3. **Rate Limiting**: Implement client-side rate limiting
4. **Audit Logging**: Log all API interactions for security analysis

## Contact & Support

**Internal Development**: The Anchor Web Team
**API Provider**: OrangeJelly Support (support@orangejelly.co.uk)
**Documentation**: This document + inline code comments
**Issue Tracking**: GitHub Issues (#68 for status bar specific)

---

*Last Updated: August 2024*
*Version: 1.0.0*
*Author: Development Team*