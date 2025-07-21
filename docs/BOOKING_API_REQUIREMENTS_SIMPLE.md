# Booking System API Requirements

## What We Need From Your Booking System

### 1. Check Availability

#### For Sunday Lunch
We need to check:
- Which Sundays are available (up to 8 weeks ahead)
- Available time slots (12:00, 12:30, 1:00, 1:30, 2:00, 2:30, 3:00)
- Whether it's past the 1pm Saturday cutoff

#### For Regular Tables
We need to check:
- Which times are available on a specific date
- If there's space for the requested party size

### 2. Create Bookings

#### Sunday Lunch Bookings Need:
- **Date & Time**: Which Sunday and what time slot
- **Customer Info**: Name, email, phone number
- **Party Details**: 
  - Total number of people at the table
  - How many are ordering Sunday roasts (might be less)
- **Menu Choices**: Which roasts each person wants, any extras
- **Important Info**: Allergies, dietary requirements, special requests
- **Total Price**: Calculated based on selections

#### Regular Table Bookings Need:
- **Date & Time**: When they want to come
- **Customer Info**: Name, email, phone number  
- **Party Size**: How many people
- **Special Requirements**: Allergies, celebrations, accessibility needs
- **Duration**: How long they'll need the table

### 3. Handle Payments

For Sunday lunch only:
- Accept PayPal payment confirmation
- Mark booking as paid
- Send confirmation number

### 4. Manage Bookings

We need to be able to:
- Get full booking details using booking ID
- Cancel bookings (with refund eligibility info)
- Modify bookings (change time, party size, menu items)

### 5. Menu Information

For Sunday lunch, we need current:
- Menu items with IDs
- Prices
- Descriptions
- What's available/unavailable
- Dietary information

## Notifications Your System Should Send

### To Customers:

1. **Immediate Confirmation Email** with:
   - All booking details
   - Calendar file they can save
   - Your contact info
   - Cancellation link

2. **Reminder Email** (Saturday morning for Sunday bookings):
   - Time and date
   - Party size
   - Reference number
   - What they ordered
   - Any allergies noted

3. **Review Request** (4-6 hours after their visit):
   - Link to leave Google review
   - Thank you message

### To Restaurant Staff (via Email):

1. **New Booking Alert** to manager@the-anchor.pub:
   - Customer details
   - What they ordered
   - **Allergies highlighted**
   - Special requests
   - Phone number for quick contact

2. **Kitchen Prep List** to manager@the-anchor.pub (Saturday 2pm for Sunday):
   - Total of each roast type needed
   - All allergies for the day
   - Time slot breakdown
   - Special dietary requirements

3. **Daily Booking Summary** to manager@the-anchor.pub (each morning):
   - Today's bookings by time
   - Party sizes
   - Any special requirements
   - Contact details

## Information We Need Back

### After Checking Availability:
- Is the date/time available?
- Can we accept the booking?

### After Creating a Booking:
- Unique booking ID
- Total amount to charge
- Payment deadline (for Sunday lunch)
- Any important messages

### After Payment:
- Confirmation number
- Success/failure status
- Updated booking status

### When Things Go Wrong:
- Clear error messages
- What went wrong (fully booked, past deadline, etc.)
- What the customer should do

## Business Rules to Enforce

### Sunday Lunch:
- Only accept bookings during Sunday kitchen hours (12pm-5pm)
- No bookings after 1pm Saturday for that Sunday
- Require pre-payment
- 48-hour cancellation for full refund
- 24-48 hours for 50% refund
- No refund within 24 hours

### Regular Tables:
- Only accept bookings during kitchen opening times:
  - Tuesday-Friday: 6pm-9pm
  - Saturday: 1pm-7pm
  - Sunday: 12pm-5pm
  - Closed Mondays
- 2-hour notice for cancellation
- No pre-payment needed

## Special Considerations

1. **Kitchen hours are absolute** - No bookings outside opening times (the website already knows these)
2. **All internal comms via email** - No SMS to staff, only email addresses
3. **Allergies are critical** - Must be clearly captured and highlighted
4. **Party size vs orders** - Not everyone at a table might order Sunday lunch
5. **Time slots may have different availability** - Lunch time busier than 3pm
6. **Some customers will book weeks ahead** - System needs to handle future dates
7. **Review requests boost business** - Automated follow-up is valuable

## What Success Looks Like

Customers can:
- See what's available instantly
- Book and pay in one smooth flow
- Get clear confirmations
- Cancel if plans change

Restaurant gets:
- Guaranteed payments upfront
- Accurate numbers for prep
- Allergy alerts
- Less phone calls
- More Google reviews

The website becomes a 24/7 booking system that works while you sleep!