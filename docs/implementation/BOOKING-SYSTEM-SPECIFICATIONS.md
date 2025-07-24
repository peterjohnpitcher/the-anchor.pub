# Booking System Specifications - The Anchor Pub
*Last Updated: January 2025*

This document consolidates all booking system requirements and specifications.

## 📋 Current Booking System

### OrderTab Integration (Active)
**URL:** `https://app.ordertab.co.uk/booking/`
**Venue ID:** 5835

**Current Implementation:**
```typescript
function handleBookingClick(source: string) {
  // Track event
  trackTableBookingClick(source);
  
  // Redirect to OrderTab
  const bookingUrl = new URL('https://app.ordertab.co.uk/booking/');
  bookingUrl.searchParams.set('venue', '5835');
  bookingUrl.searchParams.set('utm_source', source);
  bookingUrl.searchParams.set('utm_medium', 'website');
  
  window.open(bookingUrl.toString(), '_blank');
}
```

**Limitations:**
- No real-time availability on our site
- No deposit capability
- Limited customization
- No special requirements capture

## 🎯 Sunday Lunch Booking System (Planned)

### Business Requirements
1. **Capacity Management**
   - 180 covers total
   - 3 sittings: 12pm, 2pm, 4pm
   - Real-time availability display

2. **Deposit System**
   - £10 per person deposit
   - PayPal/Stripe integration
   - Automatic refunds for cancellations (48hr notice)

3. **Menu Pre-Selection**
   - Choose starters, mains, desserts
   - Dietary requirements capture
   - Special requests field

### Technical Architecture

#### Frontend Components
```typescript
interface BookingFlow {
  steps: [
    'SelectDate',      // Calendar with availability
    'SelectTime',      // Available time slots
    'PartyDetails',    // Size and contact info
    'MenuSelection',   // Pre-order options
    'Payment',         // Deposit collection
    'Confirmation'     // Booking summary
  ]
}
```

#### Backend Requirements
```typescript
interface BookingAPI {
  // Availability
  GET /api/bookings/availability
  Query: { date: string, party_size: number }
  Response: { times: TimeSlot[] }
  
  // Create Booking
  POST /api/bookings
  Body: BookingRequest
  Response: { booking_id: string, payment_url: string }
  
  // Confirm Payment
  POST /api/bookings/:id/confirm
  Body: { payment_id: string }
  Response: { status: 'confirmed', details: Booking }
}
```

#### Database Schema
```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  party_size INTEGER NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled'),
  deposit_amount DECIMAL(10,2),
  payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Menu selections
CREATE TABLE booking_menu_items (
  booking_id UUID REFERENCES bookings(id),
  course ENUM('starter', 'main', 'dessert'),
  item_name VARCHAR(255),
  quantity INTEGER,
  dietary_notes TEXT
);
```

### Payment Integration

#### PayPal Setup
```javascript
// Client-side
paypal.Buttons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: depositAmount,
          currency_code: 'GBP'
        },
        description: `Sunday Lunch Deposit - ${partySize} people`
      }]
    });
  },
  onApprove: async (data, actions) => {
    const details = await actions.order.capture();
    await confirmBooking(bookingId, details.id);
  }
}).render('#paypal-button-container');
```

#### Stripe Alternative
```javascript
// Server-side
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'gbp',
      product_data: {
        name: 'Sunday Lunch Deposit',
        description: `Booking for ${partySize} people`
      },
      unit_amount: depositAmount * 100, // in pence
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${domain}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${domain}/booking/cancel`,
  metadata: {
    booking_id: bookingId
  }
});
```

### Email Notifications

#### Confirmation Email
```html
Subject: Booking Confirmed - Sunday Lunch at The Anchor

Dear [Name],

Your Sunday lunch booking is confirmed!

Details:
- Date: [Date]
- Time: [Time]
- Party Size: [Size]
- Deposit Paid: £[Amount]
- Booking Reference: [Reference]

Your Menu Selections:
[Menu choices listed here]

Important:
- Please arrive 10 minutes before your booking
- Cancellations require 48 hours notice for refund
- Remaining balance payable on the day

See you soon!
The Anchor Team
```

#### Reminder Email (24hrs before)
```html
Subject: Tomorrow's Sunday Lunch - The Anchor

Just a reminder about your booking tomorrow!
[Details repeated]
```

### Analytics Tracking

```javascript
// Enhanced tracking for booking funnel
const bookingEvents = {
  'booking_start': { step: 1, value: 0 },
  'date_selected': { step: 2, value: 0 },
  'details_entered': { step: 3, value: 0 },
  'menu_selected': { step: 4, value: 0 },
  'payment_started': { step: 5, value: depositAmount },
  'booking_completed': { step: 6, value: totalValue }
};
```

## 🚦 Implementation Timeline

### Phase 1: MVP (2 weeks)
- Basic availability calendar
- Simple booking form
- PayPal integration
- Email confirmations

### Phase 2: Enhancements (2 weeks)
- Menu pre-selection
- Dietary requirements
- SMS reminders
- Admin dashboard

### Phase 3: Advanced (1 month)
- Table management system
- Waiting list functionality
- Loyalty program integration
- Reporting dashboard

## 🔒 Security Considerations

1. **PCI Compliance**
   - Never store card details
   - Use tokenization
   - SSL/TLS required

2. **Data Protection**
   - GDPR compliant
   - Secure data storage
   - Regular backups

3. **Fraud Prevention**
   - Velocity checks
   - Address verification
   - 3D Secure authentication

## 📊 Success Metrics

1. **Conversion Rate**
   - Target: 15% of visitors book
   - Current: 8% (OrderTab)

2. **Booking Value**
   - Average party size: 4
   - Average spend: £35pp

3. **Operational Efficiency**
   - Reduce no-shows by 50%
   - Increase kitchen efficiency
   - Better capacity utilization

## 🔗 Integration Points

1. **Kitchen Display System**
   - Real-time order visibility
   - Prep time optimization

2. **POS System**
   - Booking lookup
   - Pre-payment integration

3. **CRM System**
   - Customer database
   - Marketing automation

---

*This specification will evolve as requirements are refined.*