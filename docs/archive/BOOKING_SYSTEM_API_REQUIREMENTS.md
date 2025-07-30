# Booking System API Requirements for The Anchor

## Overview
This document outlines the API requirements for integrating The Anchor's Next.js website with your management platform's booking system. The API should support both Sunday lunch pre-orders and regular table bookings.

## Authentication

All API requests should use Bearer token authentication:
```
Authorization: Bearer YOUR_API_TOKEN
```

Consider implementing:
- API key rotation
- Rate limiting (100 requests/minute suggested)
- IP whitelist for production

## API Endpoints Required

### 1. Check Availability

#### Sunday Lunch Availability
**GET** `/api/availability/sunday-lunch`

Query Parameters:
- `start_date` (ISO 8601): Starting date to check
- `end_date` (ISO 8601): End date (max 8 weeks ahead)

Response:
```json
{
  "available_dates": [
    {
      "date": "2025-02-02",
      "time_slots": [
        {
          "time": "12:00",
          "total_capacity": 60,
          "roast_orders_available": 50,
          "tables_available": 15,
          "can_book": true
        },
        {
          "time": "12:30",
          "total_capacity": 40,
          "roast_orders_available": 30,
          "tables_available": 10,
          "can_book": true
        }
      ],
      "cutoff_time": "2025-02-01T13:00:00Z"
    }
  ]
}
```

#### Regular Table Availability
**GET** `/api/availability/tables`

Query Parameters:
- `date` (ISO 8601): Date to check
- `party_size` (integer): Number of people
- `duration_minutes` (integer, optional): Expected duration (default: 120)

Response:
```json
{
  "date": "2025-01-25",
  "available_times": [
    {
      "time": "18:00",
      "tables_available": 5,
      "can_book": true
    },
    {
      "time": "18:30",
      "tables_available": 3,
      "can_book": true
    }
  ]
}
```

### 2. Create Booking

#### Sunday Lunch Booking
**POST** `/api/bookings/sunday-lunch`

Request Body:
```json
{
  "booking_date": "2025-02-02",
  "booking_time": "13:00",
  "customer": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "07700900000"
  },
  "party_details": {
    "total_size": 6,
    "roast_orders_count": 4
  },
  "menu_selections": [
    {
      "item_id": "roast-chicken",
      "quantity": 1,
      "extras": ["cauliflower-cheese"]
    },
    {
      "item_id": "lamb-shank",
      "quantity": 2,
      "extras": []
    },
    {
      "item_id": "vegan-wellington",
      "quantity": 1,
      "extras": []
    }
  ],
  "special_requirements": {
    "allergies": "Severe nut allergy for one guest, gluten-free required",
    "other_requests": "Table by window if possible",
    "accessibility": ""
  },
  "marketing_consent": true
}
```

Response:
```json
{
  "booking_id": "BK-2025-0202-0047",
  "status": "pending_payment",
  "total_amount": 65.95,
  "payment_deadline": "2025-02-01T13:00:00Z",
  "breakdown": {
    "items": [
      {"name": "Roasted Chicken", "price": 14.99},
      {"name": "Lamb Shank x2", "price": 30.98},
      {"name": "Vegan Wellington", "price": 15.49},
      {"name": "Cauliflower Cheese", "price": 3.99}
    ],
    "subtotal": 65.95,
    "vat_included": 10.99
  }
}
```

#### Regular Table Booking
**POST** `/api/bookings/table`

Request Body:
```json
{
  "booking_date": "2025-01-25",
  "booking_time": "19:00",
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "07700900001"
  },
  "party_size": 4,
  "duration_minutes": 120,
  "special_requirements": {
    "allergies": "",
    "other_requests": "Birthday celebration",
    "accessibility": "Wheelchair access needed"
  },
  "booking_notes": "Bringing birthday cake",
  "marketing_consent": false
}
```

Response:
```json
{
  "booking_id": "TB-2025-0125-0023",
  "status": "confirmed",
  "table_number": null,
  "confirmation_message": "Table for 4 confirmed for Sat 25th Jan at 7:00 PM"
}
```

### 3. Confirm Payment

**POST** `/api/bookings/{booking_id}/confirm-payment`

Request Body:
```json
{
  "payment_method": "paypal",
  "payment_reference": "PAYPAL-4VW84562UJ508831L",
  "amount_paid": 65.95,
  "payment_timestamp": "2025-01-28T14:30:00Z"
}
```

Response:
```json
{
  "booking_id": "BK-2025-0202-0047",
  "status": "confirmed",
  "confirmation_number": "ANC-2025-0202-047",
  "message": "Booking confirmed. Confirmation email sent."
}
```

### 4. Cancel/Modify Booking

#### Cancel Booking
**DELETE** `/api/bookings/{booking_id}`

Request Body:
```json
{
  "reason": "customer_request",
  "cancellation_note": "Family emergency"
}
```

Response:
```json
{
  "booking_id": "BK-2025-0202-0047",
  "status": "cancelled",
  "refund": {
    "eligible": true,
    "amount": 65.95,
    "policy": "full_refund_48_hours"
  }
}
```

#### Modify Booking
**PATCH** `/api/bookings/{booking_id}`

Request Body:
```json
{
  "modifications": {
    "party_size": 5,
    "booking_time": "13:30",
    "special_requirements": {
      "allergies": "Updated: Severe nut allergy and dairy intolerance"
    }
  }
}
```

### 5. Get Booking Details

**GET** `/api/bookings/{booking_id}`

Headers:
- Optionally include email for verification: `X-Customer-Email: john@example.com`

Response:
```json
{
  "booking": {
    "id": "BK-2025-0202-0047",
    "type": "sunday_lunch",
    "status": "confirmed",
    "booking_date": "2025-02-02",
    "booking_time": "13:00",
    "customer": {
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "07700900000"
    },
    "party_details": {
      "total_size": 6,
      "roast_orders_count": 4
    },
    "total_amount": 65.95,
    "payment_status": "paid",
    "created_at": "2025-01-28T14:25:00Z",
    "confirmation_number": "ANC-2025-0202-047"
  }
}
```

### 6. Menu Information

**GET** `/api/menu/sunday-lunch`

Response:
```json
{
  "menu_items": [
    {
      "id": "roast-chicken",
      "name": "Roasted Chicken",
      "description": "Oven-roasted chicken breast with sage & onion stuffing",
      "price": 14.99,
      "category": "main",
      "available": true,
      "dietary": ["gluten_free_available"]
    },
    {
      "id": "cauliflower-cheese",
      "name": "Cauliflower Cheese",
      "description": "Creamy mature cheddar sauce, baked until golden",
      "price": 3.99,
      "category": "extra",
      "available": true,
      "dietary": ["vegetarian"]
    }
  ],
  "last_updated": "2025-01-15T10:00:00Z"
}
```

## Webhook Requirements

Your system should send webhooks to our endpoints for:

### Booking Confirmation
**POST** `https://www.the-anchor.pub/api/webhooks/booking-confirmed`
```json
{
  "event": "booking.confirmed",
  "booking_id": "BK-2025-0202-0047",
  "timestamp": "2025-01-28T14:30:00Z"
}
```

### Booking Cancellation
**POST** `https://www.the-anchor.pub/api/webhooks/booking-cancelled`
```json
{
  "event": "booking.cancelled",
  "booking_id": "BK-2025-0202-0047",
  "timestamp": "2025-01-28T16:00:00Z",
  "refund_amount": 65.95
}
```

## Email Requirements

Your system should trigger these emails:

### Customer Emails
1. **Booking Confirmation** (immediate)
   - Include all booking details
   - Attach calendar invite (.ics)
   - Include cancellation link
   
2. **Reminder Email** (Saturday 10am for Sunday bookings)
   - Booking details
   - Directions/parking info
   - Contact number

3. **Review Request** (4-6 hours after booking time)
   - Link to Google review page
   - Thank you message

### Staff Emails
1. **New Booking Alert** to manager@the-anchor.pub (immediate)
   - All booking details
   - Highlight allergies in red
   - Link to admin dashboard

2. **Daily Summary** to manager@the-anchor.pub (Saturday 2pm)
   - All Sunday bookings
   - Grouped by time slot
   - Allergy report
   - Prep quantities

## SMS Requirements (Optional but Recommended)

1. **Booking Confirmation** (immediate)
   ```
   The Anchor: Booking confirmed for Sun 2nd Feb, 1pm. 
   Party of 6. Ref: ANC-2025-0202-047
   ```

2. **Reminder** (Sunday 10am)
   ```
   The Anchor: Reminder - Your table is booked for 1pm today.
   Any issues? Call 01753 682707
   ```

## Error Handling

All errors should return consistent format:
```json
{
  "error": {
    "code": "INSUFFICIENT_CAPACITY",
    "message": "Not enough roast orders available for this time slot",
    "details": {
      "requested": 10,
      "available": 8
    }
  }
}
```

Common error codes:
- `INVALID_DATE` - Booking date invalid
- `PAST_CUTOFF` - Past booking deadline
- `INSUFFICIENT_CAPACITY` - Not enough space
- `PAYMENT_REQUIRED` - Payment not completed
- `BOOKING_NOT_FOUND` - Invalid booking ID
- `DUPLICATE_BOOKING` - Customer already has booking

## Testing Requirements

Please provide:
1. Sandbox/staging environment
2. Test API credentials
3. Test payment details
4. Sample booking IDs for testing

## Security Requirements

1. **HTTPS only** - All API calls must use TLS
2. **Rate limiting** - Prevent abuse
3. **Input validation** - Sanitize all inputs
4. **Audit logging** - Track all bookings/cancellations
5. **PCI compliance** - If handling card details

## Performance Requirements

- Availability checks: < 500ms response time
- Booking creation: < 2 seconds
- 99.9% uptime during booking hours (Tue-Sun)

## Regular Table Booking Specific Notes

For regular table bookings (non-Sunday lunch):
- No payment required at booking
- Instant confirmation
- Different cancellation policy (2 hours notice)
- No menu pre-selection
- Simpler email confirmations
- Should integrate with table management system

## Questions for Your Development

1. What format do you prefer for customer phone numbers?
2. Do you have existing customer IDs we should reference?
3. Should we handle repeat customers differently?
4. Do you want real-time table assignment or just booking?
5. Any specific business rules for group sizes?
6. Integration with your POS system needed?

## Next Steps

Once your API is ready, we'll need:
1. API documentation with examples
2. Staging environment access
3. Test scenarios walkthrough
4. Error handling examples
5. Webhook endpoint configuration

This specification should give you everything needed to build a comprehensive booking system that the Next.js frontend can integrate with seamlessly.