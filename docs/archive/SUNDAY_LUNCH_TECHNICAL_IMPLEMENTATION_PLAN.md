# Sunday Lunch Booking Technical Implementation Plan

## Current Page Analysis

The existing `/sunday-lunch` page is a static page with:
- Hero section with booking CTA (phone only)
- Menu display with prices
- Important notice about pre-ordering by 1pm Saturday
- No interactive booking functionality
- No payment processing

## Implementation Architecture

### 1. Frontend Components Structure

```
app/sunday-lunch/
├── page.tsx (modified - will contain booking integration)
├── components/
│   ├── BookingForm.tsx (client component)
│   ├── PaymentSection.tsx (client component) 
│   ├── AvailabilityChecker.tsx
│   ├── OrderSummary.tsx
│   └── BookingConfirmation.tsx
```

### 2. API Routes Structure

```
app/api/
├── bookings/
│   └── sunday-lunch/
│       ├── availability/route.ts
│       ├── create/route.ts
│       └── confirm/route.ts
├── payments/
│   └── paypal/
│       ├── create-order/route.ts
│       └── capture/route.ts
└── email/
    └── booking-confirmation/route.ts
```

### 3. Database Schema (Using Prisma)

```prisma
model SundayLunchBooking {
  id                        String   @id @default(cuid())
  bookingDate               DateTime
  bookingTime               String   // "12:00", "12:30", etc.
  customerName              String
  customerEmail             String
  customerPhone             String
  totalPartySize            Int      // Total people in party
  roastOrdersCount          Int      // Number of roasts ordered
  menuSelections            Json
  allergiesDietaryRequirements String? @db.Text
  specialRequests           String?  @db.Text
  totalAmount               Float
  paymentStatus             PaymentStatus @default(PENDING)
  paypalOrderId             String?
  paypalCaptureId           String?
  createdAt                 DateTime @default(now())
  updatedAt                 DateTime @updatedAt
  status                    BookingStatus @default(CONFIRMED)
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

model SundayLunchAvailability {
  id           String   @id @default(cuid())
  date         DateTime @unique
  maxCapacity  Int      @default(50)
  currentCount Int      @default(0)
  isAvailable  Boolean  @default(true)
}
```

## Component Implementation Details

### 1. BookingForm Component

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const bookingSchema = z.object({
  date: z.string(),
  time: z.enum(['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']),
  totalPartySize: z.number().min(1).max(20),
  roastOrdersCount: z.number().min(1).max(20),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  menuSelections: z.array(z.object({
    orderNumber: z.number(),
    menuItem: z.string(),
    extras: z.array(z.string()).optional()
  })),
  allergiesDietaryRequirements: z.string().optional(),
  specialRequests: z.string().optional()
})

export function BookingForm({ onSubmit, availableDates }) {
  // Form implementation
}
```

### 2. PayPal Integration Component

```tsx
'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "GBP",
  intent: "capture",
}

export function PaymentSection({ bookingData, amount }) {
  const createOrder = async () => {
    // Call server API to create order
    const response = await fetch('/api/payments/paypal/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingData, amount })
    })
    const order = await response.json()
    return order.id
  }

  const onApprove = async (data) => {
    // Call server API to capture payment
    const response = await fetch('/api/payments/paypal/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: data.orderID, bookingData })
    })
    // Handle success/failure
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: "vertical" }}
      />
    </PayPalScriptProvider>
  )
}
```

### 3. Server-Side Payment Validation

```typescript
// app/api/payments/paypal/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'

// PayPal client setup
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
)
const client = new paypal.core.PayPalHttpClient(environment)

export async function POST(request: NextRequest) {
  const { bookingData, amount } = await request.json()
  
  // Validate booking data server-side
  // Check availability
  // Calculate total server-side (NEVER trust client)
  
  const orderRequest = new paypal.orders.OrdersCreateRequest()
  orderRequest.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'GBP',
        value: amount.toFixed(2)
      },
      description: `Sunday Lunch Booking - ${bookingData.date}`
    }]
  })

  const order = await client.execute(orderRequest)
  return NextResponse.json({ id: order.result.id })
}
```

## Security Implementation

### 1. Input Validation
- Zod schemas for all user inputs
- Server-side validation of all data
- SQL injection prevention via Prisma

### 2. Payment Security
- All price calculations on server
- PayPal order creation server-side only
- Verify captured amount matches expected
- CSRF protection on all endpoints

### 3. Rate Limiting
```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
})
```

## User Experience Flow

### 1. Booking Process
1. User selects next available Sunday
2. System checks availability (real-time)
3. User enters guest count
4. For each guest, selects meal option
5. Adds any extras (cauliflower cheese)
6. Enters contact details
7. Reviews order summary
8. Proceeds to payment

### 2. Payment Flow
1. PayPal checkout opens
2. User logs in to PayPal
3. Confirms payment
4. System captures payment
5. Booking confirmed in database
6. Emails sent to customer & restaurant

### 3. Error Handling
- Clear error messages
- Graceful fallbacks
- Payment retry options
- Manual booking fallback (phone)

## Environment Variables Required

```env
# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

# Database
DATABASE_URL=

# Email (using Resend)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://the-anchor.pub
```

## Testing Strategy

### 1. Development Testing
- PayPal Sandbox accounts
- Test credit cards
- Mock booking scenarios

### 2. Integration Testing
```typescript
// __tests__/booking-flow.test.ts
describe('Sunday Lunch Booking Flow', () => {
  it('should create booking and process payment', async () => {
    // Test implementation
  })
})
```

### 3. Load Testing
- Simulate concurrent bookings
- Test capacity limits
- Database transaction handling

## Deployment Checklist

- [ ] Set up production PayPal account
- [ ] Configure production environment variables
- [ ] Set up database (Planetscale/Supabase)
- [ ] Configure email service (Resend)
- [ ] SSL certificate verified
- [ ] Rate limiting configured
- [ ] Error monitoring (Sentry)
- [ ] Analytics tracking
- [ ] Admin dashboard for bookings
- [ ] Backup payment method (phone)

## Timeline Estimate

**Week 1:**
- Database setup
- Basic booking form
- Availability checking

**Week 2:**
- PayPal integration
- Payment processing
- Server validation

**Week 3:**
- Email notifications
- Error handling
- Testing

**Week 4:**
- Admin features
- Production deployment
- Documentation

## Risk Mitigation

1. **Payment Failures:** Clear retry instructions, phone backup
2. **Capacity Issues:** Real-time availability, waitlist option
3. **Technical Issues:** Graceful degradation to phone booking
4. **Compliance:** GDPR consent, data retention policies