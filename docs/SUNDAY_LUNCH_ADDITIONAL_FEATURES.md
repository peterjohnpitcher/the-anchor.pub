# Sunday Lunch Booking - Additional Features & Requirements

## Your Suggestions (Absolutely Essential!)

### 1. ✅ Email Confirmations
**Customer Email:**
- Instant confirmation after payment
- Includes all booking details
- Calendar invite attachment (.ics file)
- Clear contact information

**Manager Email (manager@the-anchor.pub):**
- Real-time notification of new bookings
- Daily summary email (8am) with Sunday bookings
- Allergy/dietary alerts highlighted in RED
- One-click link to admin dashboard

### 2. ✅ Google Review System
**Review Request Page (/leave-review):**
- Mobile-optimized design
- Direct link to Google Business review page
- Pre-filled 5-star rating (they can change)
- Simple "How was your roast?" message

**Automated Review Request (4 hours post-booking):**
```
Subject: How was your Sunday lunch at The Anchor?

Hi [Name],

We hope you enjoyed your Sunday roast with us today!

If you have 30 seconds, we'd love to hear about your experience:
[⭐ Leave a Review]

Thank you for choosing The Anchor.
```

## Additional Features You'll Definitely Need

### 3. 📱 SMS Reminders (Critical!)
- Booking confirmation SMS immediately after payment
- Reminder SMS on Saturday at 10am
- Day-of reminder at 10am Sunday
- Uses Twilio (£0.04 per SMS)

### 4. 🚫 Cancellation System
**Customer Portal (/booking/manage):**
- Cancel up to 48 hours before (full refund)
- Cancel 24-48 hours (50% refund) 
- No refund within 24 hours
- Modification options (time/party size)

### 5. 📊 Admin Dashboard (/admin/sunday-lunch)
**Features:**
- Today's bookings with arrival times
- Allergy report for kitchen
- No-show tracking
- Revenue analytics
- Export to Excel/PDF
- Print kitchen orders

### 6. ⏰ Time Slot Management
**Capacity per slot:**
```
12:00 PM - 15 tables (60 people max)
12:30 PM - 10 tables (40 people max)
1:00 PM - 15 tables (60 people max)
1:30 PM - 10 tables (40 people max)
2:00 PM - 8 tables (32 people max)
2:30 PM - 5 tables (20 people max)
3:00 PM - 5 tables (20 people max)
```

### 7. 📅 Kitchen Prep Report
**Saturday 2pm Auto-Email to Kitchen:**
```
SUNDAY LUNCH PREP REPORT
========================
Total Covers: 127
- Chicken: 45
- Lamb: 31
- Pork: 28
- Vegetarian: 15
- Kids: 8

Cauliflower Cheese: 23 portions

ALLERGIES (3):
⚠️ Table 12:00-04: Severe nut allergy
⚠️ Table 13:30-02: Gluten free x2
⚠️ Table 14:00-06: Dairy intolerance
```

### 8. 💳 Payment Management
- Refund processing interface
- Payment reconciliation report
- Failed payment retry system
- Corporate invoice option

### 9. 🎯 Marketing Integration
**Customer Database Building:**
- Email opt-in during booking
- Birthday capture for offers
- Frequency tracking (regulars vs new)
- Automated "We miss you" emails

**Post-Booking Upsells:**
- "Book again and save 10%"
- "Try our new weekday menu"
- Event promotion emails

### 10. 📈 Analytics & Reporting
**Key Metrics:**
- Average party size
- Most popular roast options
- Peak booking times
- No-show rate
- Revenue per Sunday
- Customer lifetime value

### 11. 🔄 Integration Options
**POS System Sync:**
- Auto-create orders in till system
- Table assignment coordination
- Stock level updates

**Google Calendar:**
- Staff roster integration
- Automated capacity adjustments
- Holiday/closure management

### 12. 🚨 Failsafes & Contingencies
- Backup phone number display if system fails
- Manual booking override for staff
- Duplicate booking prevention
- Server status page
- Automatic customer notification if issues

## Implementation Priority Order

### Phase 1 (Launch Essentials):
1. Basic booking with payment ✓
2. Email confirmations (customer + manager) ✓
3. SMS booking confirmation
4. Admin dashboard (basic)
5. Cancellation system

### Phase 2 (Week 2-3 after launch):
6. Google review automation
7. Time slot capacity management
8. Kitchen prep reports
9. SMS reminders

### Phase 3 (Month 2):
10. Advanced analytics
11. Marketing automation
12. POS integration

## Nice-to-Have Features

### QR Code Table Cards
- "Enjoyed your meal? Review us!"
- Links to review page
- Track which tables leave reviews

### Loyalty Program
- Every 10th roast free
- Birthday roast discount
- VIP early booking access

### Special Events
- Mother's Day enhanced menu
- Easter special pricing
- Father's Day promotions

### Dietary Preference Memory
- Remember regular customers' allergies
- Pre-fill on repeat bookings
- Alert staff to regulars' needs

## Technical Considerations

### Review System Architecture:
```typescript
// Scheduled job - runs every hour
async function sendReviewRequests() {
  const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000)
  const bookingsToReview = await getCompletedBookings(fourHoursAgo)
  
  for (const booking of bookingsToReview) {
    if (!booking.reviewRequestSent) {
      await sendReviewEmail(booking)
      await markReviewRequestSent(booking.id)
    }
  }
}
```

### Manager Notification Template:
```
NEW SUNDAY LUNCH BOOKING 🍖

Customer: John Smith
Phone: 07700 900000
Date: Sunday 2nd Feb
Time: 1:00 PM
Party: 6 people (4 roasts)

Orders:
- 1x Chicken
- 1x Pork 
- 1x Lamb + Cauliflower
- 1x Vegan Wellington

⚠️ ALLERGIES: Nut allergy, Gluten-free required

Total: £65.95 (PAID)

[View in Dashboard]
```

## Cost Implications

### Ongoing Costs:
- SMS: ~£50/month (1,250 messages)
- Email: Included in current plan
- Review automation: No extra cost
- Admin time: Reduced by 80%

### ROI Calculation:
- Reduced phone calls: 2 hours/week saved
- Reduced no-shows: 5% → 1%
- Increased bookings: 20% (online convenience)
- Review increase: 300% more Google reviews

## Questions for Decision:

1. **SMS Reminders**: Both Saturday and Sunday, or just Saturday?
2. **Review Timing**: 4 hours good, or end of day better?
3. **Cancellation Policy**: 48-hour cutoff reasonable?
4. **Manager Emails**: Just manager@ or also kitchen@?
5. **Capacity**: Are my time slot suggestions accurate?

This comprehensive system would put you ahead of most restaurants and create an exceptional customer experience!