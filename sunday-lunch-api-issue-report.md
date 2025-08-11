# Sunday Lunch Booking API Integration Issue Report

**Date:** August 8, 2025  
**Prepared for:** OrangeJelly API Development Team  
**Issue:** Missing payment URL in Sunday lunch booking responses

---

## Executive Summary

The Sunday lunch booking system on The Anchor website (the-anchor.pub) is unable to process customer payments because the API response from `management.orangejelly.co.uk` is not returning the expected `payment_details` object containing the payment gateway URL. This prevents customers from completing their bookings and paying the required £5 per person deposit.

---

## 1. System Overview

### How It Should Work:
1. Customer selects Sunday lunch menu items on our website
2. Customer submits booking form with guest details
3. Our backend sends booking request to your API
4. Your API creates booking and returns payment URL
5. Customer is redirected to payment gateway
6. Customer pays £5/person deposit
7. Booking is confirmed

### Current Problem:
Step 4 fails - no payment URL is returned, so customers cannot proceed to payment.

---

## 2. API Integration Details

### Endpoints We Call:

| Endpoint | Method | Purpose |
|----------|---------|---------|
| `/api/table-bookings/menu/sunday-lunch` | GET | Fetch available menu items |
| `/api/business/hours` | GET | Check opening times |
| `/api/table-bookings` | POST | **Create booking (ISSUE HERE)** |

### Authentication:
```
Header: X-API-Key: [ANCHOR_API_KEY]
Content-Type: application/json
```

---

## 3. Booking Request We Send

### Example POST to `/api/table-bookings`:

```json
{
  "booking_type": "sunday_lunch",
  "date": "2025-01-12",
  "time": "13:00",
  "party_size": 4,
  "duration_minutes": 120,
  "customer": {
    "first_name": "John",
    "last_name": "Smith",
    "mobile_number": "07700900000",
    "sms_opt_in": true
  },
  "menu_selections": [
    {
      "custom_item_name": "Roasted Chicken",
      "item_type": "main",
      "quantity": 1,
      "guest_name": "Guest 1",
      "price_at_booking": 14.99
    },
    {
      "custom_item_name": "Slow-Cooked Lamb Shank",
      "item_type": "main",
      "quantity": 1,
      "guest_name": "Guest 2",
      "price_at_booking": 15.49
    },
    {
      "custom_item_name": "Kids Roasted Chicken",
      "item_type": "main",
      "quantity": 2,
      "guest_name": "Guest 3",
      "price_at_booking": 9.99
    },
    {
      "custom_item_name": "Herb & Garlic Roast Potatoes",
      "item_type": "side",
      "quantity": 1,
      "guest_name": "Guest 1",
      "price_at_booking": 0
    },
    {
      "custom_item_name": "Seasonal Vegetables",
      "item_type": "side",
      "quantity": 1,
      "guest_name": "Guest 1",
      "price_at_booking": 0
    },
    {
      "custom_item_name": "Yorkshire Pudding",
      "item_type": "side",
      "quantity": 1,
      "guest_name": "Guest 1",
      "price_at_booking": 0
    },
    {
      "custom_item_name": "Cauliflower Cheese",
      "item_type": "extra",
      "quantity": 1,
      "guest_name": "Table",
      "price_at_booking": 3.99
    }
  ],
  "special_requirements": "Highchair needed",
  "dietary_requirements": ["vegetarian"],
  "allergies": ["nuts"],
  "source": "website"
}
```

### Key Details:
- **Booking type:** `sunday_lunch` (not regular booking)
- **Menu format:** Using `custom_item_name` for dish names
- **Deposit required:** £5 per person (£20 for party of 4)
- **Total meal value:** £54.46 in this example

---

## 4. Expected vs Actual Response

### What We Need to Receive:

```json
{
  "booking_id": "550e8400-e29b-41d4-a716-446655440000",
  "booking_reference": "TB-2025-001234",
  "status": "pending_payment",
  "customer": {
    "first_name": "John",
    "last_name": "Smith",
    "mobile_number": "07700900000"
  },
  "booking_details": {
    "date": "2025-01-12",
    "time": "13:00",
    "party_size": 4,
    "duration_minutes": 120
  },
  "payment_details": {                    // ← THIS IS MISSING
    "amount": 20.00,                      // ← £5 × 4 people
    "currency": "GBP",
    "payment_url": "https://...",         // ← CRITICAL: Need this URL
    "expires_at": "2025-01-11T13:00:00Z"
  }
}
```

### What We're Actually Getting:
- ✅ `booking_id` - Received
- ✅ `booking_reference` - Received  
- ✅ `status: "pending_payment"` - Received
- ✅ `customer` details - Received
- ✅ `booking_details` - Received
- ❌ **`payment_details` - NOT RECEIVED**
- ❌ **`payment_url` - NOT RECEIVED**

---

## 5. Our Code Implementation

### Frontend Code (SundayLunchBookingForm.tsx):
```typescript
// Line 373-387: After receiving API response
if (data.status === 'pending_payment' && data.payment_details?.payment_url) {
  // This condition is never true because payment_details is missing
  window.location.href = data.payment_details.payment_url
} else {
  // Falls through here - customer stuck with no payment option
  setSuccess(true)  // Wrong behavior for Sunday lunch
}
```

### Backend Proxy (api/table-bookings/create/route.ts):
```typescript
// Line 401-403: Logging to verify payment details
if (body.booking_type === 'sunday_lunch' && bookingData.status === 'pending_payment') {
  console.log('Sunday lunch booking requires payment:', bookingData.payment_details)
  // This logs: "Sunday lunch booking requires payment: undefined"
}
```

---

## 6. Business Impact

### Customer Experience:
1. Customer fills out entire booking form
2. Selects menu items for each guest
3. Enters contact details
4. Clicks "Proceed to Payment"
5. **Nothing happens** - no redirect to payment
6. Customer cannot complete booking
7. Customer likely abandons and doesn't book

### Business Consequences:
- **Lost revenue** - No Sunday roast deposits collected
- **Customer frustration** - Feature advertised but doesn't work
- **Reputation damage** - Broken booking system
- **Manual overhead** - Customers forced to call instead
- **Compliance issue** - Pre-order system required for sustainability

---

## 7. Diagnostic Questions

To help resolve this issue, please confirm:

1. **Is the payment gateway integration active** for Sunday lunch bookings?
   - Has it ever worked previously?
   - Are there test transactions we can reference?

2. **What triggers payment_details generation?**
   - Is it the `booking_type: "sunday_lunch"` field?
   - Are there additional fields required?
   - Is there a configuration setting needed?

3. **Are there permission/account requirements?**
   - Does our API key have payment permissions?
   - Is there a merchant account that needs setup?
   - Are there IP whitelist requirements?

4. **Is payment URL generation a separate API call?**
   - Should we call a different endpoint after booking creation?
   - Is there a `/api/payments/create` endpoint?

5. **Has the API specification changed?**
   - Was payment previously handled differently?
   - Are we using an outdated integration pattern?

---

## 8. Potential Solutions

### Option A: Fix Current Integration
Enable payment_details in the booking creation response for Sunday lunch bookings.

### Option B: Separate Payment Endpoint
If payment is a two-step process, provide documentation for the payment creation endpoint.

### Option C: Webhook Approach
If payment URLs are generated asynchronously, implement webhook to receive payment details.

### Option D: Direct Integration
We could implement Stripe/PayPal directly if the payment gateway is unavailable.

---

## 9. Test Request

Please test with this exact request to your API:

```bash
curl -X POST https://management.orangejelly.co.uk/api/table-bookings \
  -H "X-API-Key: [YOUR_TEST_KEY]" \
  -H "Content-Type: application/json" \
  -d '{
    "booking_type": "sunday_lunch",
    "date": "2025-01-19",
    "time": "13:00",
    "party_size": 2,
    "duration_minutes": 120,
    "customer": {
      "first_name": "Test",
      "last_name": "User",
      "mobile_number": "07700900123",
      "sms_opt_in": true
    },
    "menu_selections": [{
      "custom_item_name": "Roasted Chicken",
      "item_type": "main",
      "quantity": 2,
      "guest_name": "Guest 1",
      "price_at_booking": 14.99
    }],
    "source": "website"
  }'
```

**Expected:** Response should include `payment_details.payment_url`  
**Actual:** Currently missing this field

---

## 10. Next Steps

### Immediate Actions Needed:
1. Verify payment gateway is configured for The Anchor account
2. Check if API key has correct permissions
3. Test Sunday lunch booking creation in your system
4. Confirm payment_details should be included in response

### Information We Need:
- Example of successful response with payment details
- Any error messages in your system logs
- Documentation for payment integration
- Timeline for when this can be resolved

---

## Contact Information

**Website:** the-anchor.pub  
**Integration Type:** Sunday Lunch Pre-Order System  
**Required Deposit:** £5 per person  
**Booking Cutoff:** Saturday 1pm for Sunday service  

Please let us know if you need any additional information or have questions about our implementation. This is a critical business function that needs urgent attention.

---

*This report documents the current state as of August 8, 2025. All code snippets and API examples are from the production system.*