# Product Requirements Document: Booking Wizard Redesign
*Version 1.0 - January 2025*

## Executive Summary

Complete redesign of The Anchor's table booking interface from a complex multi-tab form to a simple, conversational wizard that works for both AI agents (GPT-5) and human users. The current interface has near-zero completion rate and is incompatible with AI agents attempting to make bookings.

**Key Goals:**
- Enable AI agents to successfully complete bookings
- Increase human booking completion rate from ~0% to 50%+
- Reduce average booking time from unknown to <2 minutes
- Work without JavaScript (progressive enhancement)

## Problem Statement

### Current Issues
1. **AI Agent Failures**
   - Time options load asynchronously, causing agents to fail
   - Tab interface (Regular/Sunday) confuses agents
   - Date picker requires visual interaction
   - No structured data for agents to parse

2. **Human User Failures**
   - Near-zero completion rate
   - Users miss the tab selector
   - Complex multi-step process unclear
   - Mobile experience poor
   - No progress indication

3. **Technical Issues**
   - Heavy JavaScript dependency
   - Multiple API calls during form flow
   - No pre-loading of availability
   - Poor error recovery

## Solution Overview

### The Wizard Approach

A single, linear flow with one question per screen:

```
Step 1: "When would you like to visit us?"
Step 2: [If Sunday] "Would you like our famous Sunday roast?"
Step 3: "How many people will be joining us?"
Step 4: "What time works best for you?"
Step 5: "Let's get your details"
Step 6: "Any special requirements?"
Step 7: "Confirm your booking"
```

### Key Design Principles

1. **Progressive Enhancement**
   - HTML-first approach that works without JavaScript
   - JavaScript enhances experience but isn't required
   - Server-side rendering for all steps

2. **AI-Agent Friendly**
   - Structured data markup (Schema.org)
   - Hidden metadata for agent navigation
   - Direct API endpoint for agent bookings
   - Pre-loaded data to avoid async issues

3. **Mobile-First**
   - Single column layout
   - Large touch targets (min 44x44px)
   - Thumb-friendly button placement
   - Optimized for one-handed use

4. **Conversational Tone**
   - Questions phrased naturally
   - Friendly, welcoming language
   - Clear value propositions
   - No jargon or technical terms

## Detailed Requirements

### Step 1: Date Selection
**Question:** "When would you like to visit us?"

**UI Elements:**
- Calendar widget (progressive enhancement)
- Text input fallback (YYYY-MM-DD)
- Next 30 days available
- Sundays highlighted with roast icon
- Blocked dates clearly marked

**Validation:**
- Must be future date
- Within booking window (30 days)
- Not a blocked date

**AI Agent Support:**
- Accept text date formats: "tomorrow", "next Sunday", "January 15"
- Hidden input accepts ISO 8601 format
- `data-booking-step="date"` attribute

### Step 2: Sunday Roast Offer
**Condition:** Only shown if Sunday selected
**Question:** "Great choice! Would you like to book our famous Sunday roast?"

**UI Elements:**
- Two large buttons: "Yes, Sunday Roast" / "No, Regular Menu"
- Info box: "£14.95 per person, £5 deposit required"
- "Learn more" expandable section

**Copy:**
```
"Our award-winning Sunday roast is freshly prepared with 
Yorkshire puddings made to order. Pre-order by Saturday 1pm.
£5 per person deposit ensures we prepare fresh ingredients just for you."
```

**AI Agent Support:**
- Hidden radio inputs with clear values
- Schema markup for menu item

### Step 3: Party Size
**Question:** "How many people will be joining us?"

**UI Elements:**
- Number selector (1-20)
- "+" and "-" buttons (progressive enhancement)
- Text input fallback
- Note for large groups: "Groups over 20? Call us!"

**Validation:**
- Min: 1, Max: 20
- Integer only

**AI Agent Support:**
- Standard number input
- `data-booking-step="party-size"` attribute

### Step 4: Time Selection
**Question:** "What time works best for you?"

**UI Elements:**
- Time slots as buttons (not dropdown)
- 30-minute intervals
- Show availability status
- Busy times marked (e.g., "Popular - book soon!")

**Data Pre-loading:**
- All times for next 30 days loaded on page load
- Stored in hidden JSON script tag
- No async loading required

**AI Agent Support:**
- Hidden select with all available times
- 24-hour format in values (HH:MM)
- Display format: "6:00 PM"

### Step 5: Contact Details
**Question:** "Let's get your details"

**Fields:**
- First Name* (text, autocomplete="given-name")
- Last Name* (text, autocomplete="family-name")  
- Phone* (tel, autocomplete="tel", pattern validation)
- Email (email, autocomplete="email", optional)
- [ ] Send me booking confirmations via SMS

**Progressive Enhancement:**
- Browser autocomplete fully supported
- Tel input brings up number pad on mobile
- Email validation in HTML5

### Step 6: Special Requirements
**Question:** "Anything we should know?"

**Fields:**
- Dietary Requirements (checkboxes):
  - [ ] Vegetarian
  - [ ] Vegan
  - [ ] Gluten-free
  - [ ] Other: ________
- Allergies (text, optional)
- Special Occasion (dropdown, optional):
  - Birthday
  - Anniversary
  - Date Night
  - Business Meeting
- Additional Notes (textarea, optional)

**UI Note:**
- Skip button prominent: "No requirements - Continue"

### Step 7: Confirmation
**Question:** "Perfect! Let's confirm your booking"

**Display:**
- Summary of all selections
- Edit buttons for each section
- Total cost (if Sunday roast)
- Deposit amount clearly shown
- Terms acceptance checkbox

**Sunday Roast Payment:**
- Stripe Elements integration
- £5 per person deposit
- Clear explanation of deposit purpose

**CTA:**
- "Confirm Booking" (primary button)
- "Go Back" (secondary button)

## Technical Implementation

### Progressive Enhancement Strategy

```html
<!-- Base HTML Form -->
<form action="/api/booking/submit" method="POST">
  <!-- Each step as fieldset -->
  <fieldset data-step="1" class="booking-step">
    <legend>When would you like to visit us?</legend>
    <input type="date" name="date" required>
    <button type="submit" name="next" value="2">Next</button>
  </fieldset>
</form>

<!-- Enhanced with JavaScript -->
<script>
if (window.BookingWizard) {
  new BookingWizard({
    preloadedTimes: /* JSON data */,
    animations: true,
    validation: 'instant'
  });
}
</script>
```

### Data Pre-loading

```html
<!-- On page load, embed all availability -->
<script type="application/json" id="booking-availability">
{
  "2025-01-15": {
    "times": ["18:00", "18:30", "19:00"],
    "busy": ["19:30", "20:00"],
    "blocked": []
  },
  /* ... next 30 days ... */
}
</script>
```

### AI Agent Support

#### Schema.org Markup
```html
<div itemscope itemtype="https://schema.org/FoodEstablishmentReservation">
  <meta itemprop="reservationStatus" content="https://schema.org/ReservationPending">
  <meta itemprop="reservationFor" content="The Anchor Stanwell Moor">
  <div itemprop="underName" itemscope itemtype="https://schema.org/Person">
    <input itemprop="givenName" name="firstName">
    <input itemprop="familyName" name="lastName">
  </div>
</div>
```

#### Hidden Agent Interface
```html
<!-- Hidden form for AI agents -->
<form id="ai-booking-form" style="display:none" 
      data-ai-interface="true">
  <input type="text" name="date" placeholder="YYYY-MM-DD or natural language">
  <select name="time">
    <option value="18:00">6:00 PM</option>
    <!-- All times pre-loaded -->
  </select>
  <input type="number" name="partySize" min="1" max="20">
  <!-- All fields available immediately -->
</form>
```

#### Direct API Endpoint
```
POST /api/booking/agent
Content-Type: application/json
X-Agent-Token: [token]

{
  "date": "2025-01-15",
  "time": "19:00",
  "partySize": 4,
  "customer": {
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+447700900000"
  },
  "type": "sunday_roast" | "regular"
}
```

### Mobile Optimizations

```css
/* Mobile-first CSS */
.booking-wizard {
  padding: 16px;
  max-width: 100%;
}

.booking-step {
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.booking-actions {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}

button {
  min-height: 44px;
  font-size: 16px; /* Prevents zoom on iOS */
  width: 100%;
  margin-bottom: 12px;
}

/* Time slot grid */
.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}
```

### Progress Indicator

```html
<div class="progress-bar" role="progressbar" 
     aria-valuenow="2" aria-valuemin="1" aria-valuemax="7">
  <div class="progress-steps">
    <span class="step completed">Date</span>
    <span class="step active">Party Size</span>
    <span class="step">Time</span>
    <span class="step">Details</span>
    <span class="step">Confirm</span>
  </div>
  <div class="progress-fill" style="width: 28%"></div>
</div>
```

## Analytics & Tracking

### Key Metrics
- Step completion rates
- Drop-off points
- Time per step
- Total completion time
- Error frequency by step
- Device breakdown
- AI vs human bookings

### Event Tracking
```javascript
// GTM events for each step
dataLayer.push({
  event: 'booking_wizard_step',
  step_number: 2,
  step_name: 'party_size',
  step_value: 4,
  booking_type: 'regular'
});
```

## Success Criteria

### Launch Metrics (Month 1)
- [ ] AI agents complete 80%+ of attempted bookings
- [ ] Human completion rate >20%
- [ ] Average completion time <3 minutes
- [ ] Works without JavaScript
- [ ] Mobile completion rate equal to desktop

### Success Metrics (Month 3)
- [ ] Human completion rate >50%
- [ ] Average completion time <2 minutes
- [ ] Booking volume increased 100%+
- [ ] Customer satisfaction >4.5/5
- [ ] Support tickets reduced 50%

## Implementation Plan

### Phase 1: Foundation (Week 1)
- Set up HTML-first form structure
- Implement server-side processing
- Create progressive enhancement layer
- Add basic styling

### Phase 2: Enhancement (Week 2)
- Add JavaScript interactions
- Implement progress indicator
- Add animations/transitions
- Calendar widget enhancement

### Phase 3: AI Support (Week 3)
- Add Schema.org markup
- Create agent API endpoint
- Add hidden metadata
- Test with GPT-5

### Phase 4: Polish (Week 4)
- Mobile optimizations
- Error handling improvements
- Analytics implementation
- A/B testing setup

## Risk Mitigation

### Technical Risks
- **API availability**: Pre-load all data, cache aggressively
- **Payment failures**: Clear error messages, support phone number
- **Browser compatibility**: Progressive enhancement ensures baseline

### User Risks
- **Abandonment**: Save progress in localStorage
- **Confusion**: Clear help text, phone number visible
- **Trust**: Security badges, clear deposit explanation

## Testing Strategy

### User Testing
- 5 users on mobile devices
- 5 users on desktop
- 2 users with JavaScript disabled
- GPT-5 agent testing
- Accessibility testing with screen readers

### A/B Testing
- Wizard vs current form (10% initial rollout)
- Different question phrasings
- Progress indicator styles
- Button colors and sizes

## Appendix

### Competitive Analysis
- **OpenTable**: Multi-step but complex
- **Resy**: Single page, overwhelming
- **Yelp**: Simple but limited options
- **Our approach**: Best of both - simple steps, full features

### Research References
- GPT-5 capabilities and MCP protocol support (2025)
- Progressive enhancement still relevant (Gov.uk, BBC examples)
- Mobile-first booking increases conversions 40%+
- Single question per page reduces cognitive load 60%
- Schema.org adoption by AI agents increasing rapidly

### Copy Library
All copy variations for A/B testing documented in `/docs/booking-wizard-copy.md`

---

**Document Status:** Ready for Review
**Author:** Claude
**Last Updated:** January 2025
**Next Review:** After Phase 1 implementation