# Sunday Lunch Booking Form Structure

## Updated Requirements Summary

Based on your additional requirements, the booking form will capture:

1. **Customer Name** ✓
2. **Phone Number** ✓
3. **Email Address** ✓
4. **Booking Date** (any future Sunday, up to 8 weeks ahead) ✓
5. **Booking Time** (30-minute slots from 12:00 to 3:00 PM) ✓
6. **Total Party Size** (might be larger than roast orders) ✓
7. **Number of Roast Orders** (might be less than party size) ✓
8. **Menu Selection** for each roast order ✓
9. **Allergies & Dietary Requirements** (free text field) ✓
10. **Special Requests** (optional) ✓

## Form Flow Visualization

### Step 1: Date & Time Selection
```
┌─────────────────────────────────────────────┐
│ When would you like to book?               │
├─────────────────────────────────────────────┤
│ Select Date:                                │
│ [📅 Sunday 2nd February 2025         ▼]    │
│                                             │
│ Select Time:                                │
│ ⏰ ○ 12:00 PM  ○ 12:30 PM  ● 1:00 PM      │
│    ○ 1:30 PM   ○ 2:00 PM   ○ 2:30 PM      │
│    ○ 3:00 PM                               │
│                                             │
│ Available spaces: 42 remaining              │
└─────────────────────────────────────────────┘
```

### Step 2: Party Details
```
┌─────────────────────────────────────────────┐
│ Tell us about your party                    │
├─────────────────────────────────────────────┤
│ Total party size:                           │
│ [6] people                                  │
│                                             │
│ How many Sunday roasts?                     │
│ [4] roasts                                  │
│                                             │
│ ℹ️ Some guests having regular menu? That's  │
│    fine! Just order the roasts you need.   │
└─────────────────────────────────────────────┘
```

### Step 3: Menu Selection
```
┌─────────────────────────────────────────────┐
│ Choose your roasts                          │
├─────────────────────────────────────────────┤
│ Roast 1:                                    │
│ [🍗 Roasted Chicken - £14.99          ▼]    │
│ □ Add Cauliflower Cheese (+£3.99)          │
│                                             │
│ Roast 2:                                    │
│ [🥩 Crispy Pork Belly - £15.99        ▼]    │
│ □ Add Cauliflower Cheese (+£3.99)          │
│                                             │
│ Roast 3:                                    │
│ [🍖 Lamb Shank - £15.49               ▼]    │
│ ☑ Add Cauliflower Cheese (+£3.99)          │
│                                             │
│ Roast 4:                                    │
│ [🌱 Beetroot Wellington (VG) - £15.49  ▼]    │
│ □ Add Cauliflower Cheese (+£3.99)          │
└─────────────────────────────────────────────┘
```

### Step 4: Contact & Dietary Information
```
┌─────────────────────────────────────────────┐
│ Your details                                │
├─────────────────────────────────────────────┤
│ Name: *                                     │
│ [John Smith                              ]  │
│                                             │
│ Phone: *                                    │
│ [07700 900000                            ]  │
│                                             │
│ Email: *                                    │
│ [john.smith@email.com                    ]  │
│                                             │
│ Allergies or dietary requirements:          │
│ [Severe nut allergy for one guest.      ]  │
│ [One guest is gluten-free.              ]  │
│                                             │
│ Special requests (optional):                │
│ [Table by the window if possible please ]  │
└─────────────────────────────────────────────┘
```

### Step 5: Order Summary & Payment
```
┌─────────────────────────────────────────────┐
│ Order Summary                               │
├─────────────────────────────────────────────┤
│ 📅 Sunday 2nd February 2025 at 1:00 PM     │
│ 👥 Table for 6 (4 roasts ordered)          │
│                                             │
│ Your Order:                                 │
│ • Roasted Chicken             £14.99        │
│ • Crispy Pork Belly           £15.99        │
│ • Lamb Shank                  £15.49        │
│   + Cauliflower Cheese        £3.99         │
│ • Beetroot Wellington (VG)    £15.49        │
│ ─────────────────────────────────────       │
│ Total:                        £65.95        │
│                                             │
│ ⚠️ Allergies noted: Nut allergy, GF needed  │
│                                             │
│ [💳 Pay with PayPal]                        │
│                                             │
│ Payment deadline: Saturday 1st Feb, 1:00 PM │
└─────────────────────────────────────────────┘
```

## Key Form Features

### Smart Validation
- Only shows Sundays in date picker
- Blocks dates past the 1pm Saturday cutoff
- Validates party size vs roast orders
- Ensures at least one roast is ordered

### User-Friendly Design
- Clear indication that not everyone needs to order roast
- Prominent allergy/dietary field
- Real-time price calculation
- Mobile-responsive layout

### Restaurant Benefits
- Captures exact party size for table planning
- Separates roast orders from total guests
- Collects allergies upfront
- Phone number for day-of contact

## Email Confirmation Will Include

```
Subject: Booking Confirmed - The Anchor Sunday Lunch

Dear John,

Your Sunday lunch booking is confirmed!

BOOKING DETAILS
===============
Date: Sunday 2nd February 2025
Time: 1:00 PM
Confirmation: ANC-2025-0202-001

Party size: 6 people
Roasts ordered: 4

YOUR ORDER
==========
• 1x Roasted Chicken (£14.99)
• 1x Crispy Pork Belly (£15.99)
• 1x Lamb Shank with Cauliflower Cheese (£19.48)
• 1x Beetroot Wellington - Vegan (£15.49)

Total paid: £65.95

IMPORTANT NOTES
==============
Allergies recorded: Severe nut allergy, gluten-free required
Special requests: Table by the window if possible

We'll do our best to accommodate your requests.
Our regular menu is also available for guests not having roast.

See you Sunday!

The Anchor Team
01753 682707
```

This structure ensures we capture all the information needed while keeping the form intuitive and user-friendly.