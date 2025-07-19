# Sunday Lunch Booking API Specification

## API Endpoints Overview

### Booking Management APIs

#### 1. Check Availability
**GET** `/api/bookings/sunday-lunch/availability`

Query Parameters:
- `startDate` (optional): ISO date string (defaults to next Sunday)
- `weeks` (optional): Number of weeks to check (default: 4)

Response:
```json
{
  "availableDates": [
    {
      "date": "2025-02-02",
      "availableSpaces": 45,
      "maxCapacity": 50,
      "cutoffTime": "2025-02-01T13:00:00Z",
      "isAvailable": true
    }
  ]
}
```

#### 2. Create Booking (Pre-Payment)
**POST** `/api/bookings/sunday-lunch/create`

Request Body:
```json
{
  "bookingDate": "2025-02-02",
  "bookingTime": "13:00",
  "customerDetails": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "07700900000"
  },
  "totalPartySize": 6,
  "roastOrdersCount": 4,
  "menuSelections": [
    {
      "orderNumber": 1,
      "menuItem": "roast-chicken",
      "extras": ["cauliflower-cheese"]
    },
    {
      "orderNumber": 2,
      "menuItem": "lamb-shank",
      "extras": []
    }
  ],
  "allergiesDietaryRequirements": "Nut allergy for one guest, gluten-free required for another",
  "specialRequests": "Table near the window if possible"
}
```

Response:
```json
{
  "bookingId": "clh3k4j5k0001qj5z8x9y7z6w",
  "totalAmount": 61.97,
  "breakdown": {
    "items": [
      {
        "name": "Roasted Chicken",
        "price": 14.99,
        "quantity": 1
      },
      {
        "name": "Cauliflower Cheese",
        "price": 3.99,
        "quantity": 1
      }
    ],
    "subtotal": 61.97,
    "vat": 0
  },
  "expiresAt": "2025-02-01T14:00:00Z"
}
```

#### 3. Confirm Booking (Post-Payment)
**POST** `/api/bookings/sunday-lunch/confirm`

Request Body:
```json
{
  "bookingId": "clh3k4j5k0001qj5z8x9y7z6w",
  "paypalOrderId": "4VW84562UJ508831L",
  "paypalCaptureId": "3C679366HH908993F"
}
```

Response:
```json
{
  "success": true,
  "confirmationNumber": "ANC-2025-0202-001",
  "booking": {
    "date": "2025-02-02",
    "time": "12:00-17:00",
    "guests": 4,
    "totalPaid": 61.97
  }
}
```

#### 4. Get Booking Details
**GET** `/api/bookings/sunday-lunch/:bookingId`

Headers:
- `Authorization`: Bearer token or booking email verification

Response:
```json
{
  "booking": {
    "id": "clh3k4j5k0001qj5z8x9y7z6w",
    "confirmationNumber": "ANC-2025-0202-001",
    "date": "2025-02-02",
    "customerName": "John Smith",
    "guestCount": 4,
    "menuSelections": [...],
    "totalAmount": 61.97,
    "status": "CONFIRMED",
    "createdAt": "2025-01-28T10:30:00Z"
  }
}
```

### Payment APIs

#### 1. Create PayPal Order
**POST** `/api/payments/paypal/create-order`

Request Body:
```json
{
  "bookingId": "clh3k4j5k0001qj5z8x9y7z6w",
  "amount": 61.97,
  "currency": "GBP"
}
```

Response:
```json
{
  "id": "4VW84562UJ508831L",
  "status": "CREATED",
  "links": [
    {
      "href": "https://www.paypal.com/checkoutnow?token=4VW84562UJ508831L",
      "rel": "approve",
      "method": "GET"
    }
  ]
}
```

#### 2. Capture PayPal Payment
**POST** `/api/payments/paypal/capture`

Request Body:
```json
{
  "orderId": "4VW84562UJ508831L",
  "bookingId": "clh3k4j5k0001qj5z8x9y7z6w"
}
```

Response:
```json
{
  "success": true,
  "captureId": "3C679366HH908993F",
  "status": "COMPLETED",
  "amount": {
    "value": "61.97",
    "currency": "GBP"
  }
}
```

### Email APIs

#### Send Booking Confirmation
**POST** `/api/email/booking-confirmation`

Request Body:
```json
{
  "bookingId": "clh3k4j5k0001qj5z8x9y7z6w",
  "recipientEmail": "john@example.com",
  "confirmationNumber": "ANC-2025-0202-001"
}
```

Response:
```json
{
  "success": true,
  "messageId": "msg_2n0j3k4l5m6n7o8p"
}
```

## Database Schema Details

### Tables Required

#### 1. sunday_lunch_bookings
```sql
CREATE TABLE sunday_lunch_bookings (
  id VARCHAR(30) PRIMARY KEY,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  total_party_size INT NOT NULL,
  roast_orders_count INT NOT NULL,
  menu_selections JSON NOT NULL,
  allergies_dietary_requirements TEXT,
  special_requests TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
  paypal_order_id VARCHAR(50),
  paypal_capture_id VARCHAR(50),
  confirmation_number VARCHAR(20) UNIQUE,
  status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_booking_date_time (booking_date, booking_time),
  INDEX idx_customer_email (customer_email),
  INDEX idx_confirmation (confirmation_number)
);
```

#### 2. sunday_lunch_availability
```sql
CREATE TABLE sunday_lunch_availability (
  id VARCHAR(30) PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  max_capacity INT DEFAULT 50,
  current_bookings INT DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_date (date),
  INDEX idx_available (date, is_available)
);
```

#### 3. menu_items (Reference Table)
```sql
CREATE TABLE sunday_lunch_menu_items (
  id VARCHAR(30) PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category ENUM('MAIN', 'KIDS', 'EXTRA') NOT NULL,
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  
  INDEX idx_slug (slug),
  INDEX idx_available (is_available)
);
```

## Error Handling

### Standard Error Response Format
```json
{
  "error": {
    "code": "BOOKING_UNAVAILABLE",
    "message": "No availability for selected date",
    "details": {
      "date": "2025-02-02",
      "availableSpaces": 0
    }
  }
}
```

### Error Codes
- `INVALID_DATE`: Selected date is not a Sunday or is in the past
- `BOOKING_UNAVAILABLE`: No spaces available
- `CUTOFF_PASSED`: Booking attempted after 1pm Saturday
- `PAYMENT_FAILED`: PayPal payment capture failed
- `INVALID_MENU_SELECTION`: Selected menu item not available
- `CAPACITY_EXCEEDED`: Guest count exceeds available spaces
- `DUPLICATE_BOOKING`: Email already has booking for this date

## Rate Limiting

All APIs implement rate limiting:
- Anonymous: 10 requests per minute
- Authenticated: 30 requests per minute
- Payment APIs: 5 requests per minute per IP

## Authentication

- Public endpoints (availability, menu) require no auth
- Booking creation requires CSRF token
- Booking retrieval requires either:
  - Booking ID + email verification
  - Admin JWT token

## Webhook Endpoints

### PayPal IPN Handler
**POST** `/api/webhooks/paypal`

Handles PayPal payment status updates:
- Payment completed
- Payment refunded
- Dispute opened

## Admin APIs (Protected)

### Get All Bookings
**GET** `/api/admin/bookings/sunday-lunch`

Query Parameters:
- `date`: Filter by specific date
- `status`: Filter by booking status
- `page`: Pagination
- `limit`: Results per page

### Update Booking
**PATCH** `/api/admin/bookings/sunday-lunch/:bookingId`

### Export Bookings
**GET** `/api/admin/bookings/sunday-lunch/export`

Formats: CSV, PDF

## Integration Points

### External Services
1. **PayPal SDK**: Payment processing
2. **Resend/SendGrid**: Email notifications
3. **Twilio (optional)**: SMS confirmations
4. **Google Calendar API (optional)**: Restaurant calendar sync

### Internal Systems
1. **Analytics**: Track conversion rates
2. **Error Monitoring**: Sentry integration
3. **Logging**: Structured logs for debugging