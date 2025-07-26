# Table Booking Components

A set of React components for handling table bookings at The Anchor pub.

## Components

### TableBookingForm
The main component that orchestrates the entire booking flow.

```tsx
import { TableBookingForm } from '@/components/features/TableBooking'

<TableBookingForm 
  onSuccess={(booking) => console.log('Booking confirmed:', booking)}
/>
```

### BookingDatePicker
Handles date, time, and party size selection with business hours validation.

### AvailabilityChecker
Checks and displays available time slots for the selected date.

### CustomerDetails
Collects customer information and special requirements.

### BookingConfirmation
Displays booking confirmation with reference number and calendar integration.

## Features

- **Multi-step booking flow**: Date selection → Availability check → Customer details → Confirmation
- **Business hours validation**: Automatically checks kitchen hours
- **Real-time availability**: Checks table availability via API
- **Mobile responsive**: Works seamlessly on all devices
- **Accessibility**: Full ARIA labels and keyboard navigation
- **Error handling**: Retry logic with user-friendly error messages
- **GTM tracking**: Integrated analytics for conversion tracking
- **Calendar integration**: Add booking to Google Calendar

## Usage Example

```tsx
// In a page component
import { TableBookingForm } from '@/components/features/TableBooking'

export default function BookTablePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Table</h1>
      <TableBookingForm 
        onSuccess={(booking) => {
          // Handle successful booking
          console.log('Booking reference:', booking.booking_reference)
        }}
      />
    </div>
  )
}
```

## API Integration

The components use the following API endpoints:
- `GET /api/business/hours` - Fetch opening hours
- `GET /api/table-bookings/availability` - Check available slots
- `POST /api/table-bookings/create` - Create booking

## Styling

Components use Tailwind CSS with the anchor-branded color palette:
- Primary actions: Amber colors
- Success states: Green colors
- Error states: Red colors
- Neutral elements: Gray colors