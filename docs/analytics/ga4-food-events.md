# GA4 & GTM Implementation Brief – Food Performance Tracking

**Updated:** 2025-10-13  
**Owner:** Analytics (assign)  
**Purpose:** Instrument all food-specific conversion events so we can measure impressions → clicks → bookings across `/food-menu`, `/sunday-lunch`, `/pizza-tuesday`, and supporting promo modules.

---

## 1. Data Layer Events

| Event Name | Trigger | Parameters | Notes |
| --- | --- | --- | --- |
| `food_menu_view` | `MenuPageTracker` component initialises on `/food-menu`, `/sunday-lunch`, `/pizza-tuesday` | `menu_type`, `page_url`, `timestamp`, `special_offers_visible`, `special_offers_count` | Now fires from front-end; send to GA4 as dedicated event. |
| `food_menu_exit` | User leaves tracked menu page | `menu_type`, `page_url`, `time_spent_seconds`, `special_offers_viewed` | Useful for dwell/effectiveness analysis. |
| `food_cta_click` | Any CTA promoting food booking/WhatsApp | `cta_id`, `cta_label`, `cta_location`, `cta_mode`, `cta_context`, `device_type` | Map from existing `cta_click` event with context in the `BookTableButton`. |
| `whatsapp_click` | WhatsApp quick enquiry buttons | `cta_location`, `cta_context`, `device_type`, `phone_number` | Fire on `href^="https://wa.me/441753682707"` clicks. |
| `table_booking_complete` | Booking confirmation callback (booking engine) | `booking_reference`, `party_size`, `booking_datetime`, `source_page`, `offer_selected` | Requires booking engine integration; fire server-side if possible. |
| `scroll_depth` | 50%, 75% scroll on `/food-menu`, `/pizza-tuesday`, `/sunday-lunch` | `scroll_depth`, `page_title`, `page_location` | Already emitted; add GA4 tag filter to food URLs. |

### GTM Mapping
- Configure GA4 tags for `food_menu_view` and `food_menu_exit` listening for the matching data layer events.
- Duplicate GA4 event for `food_cta_click` triggered when `event` equals `cta_click` AND `cta_context` matches `food|sunday_lunch|pizza|heathrow_layover`.
- For WhatsApp, create click trigger on CSS selector `[href*="wa.me/441753682707"]` scoped to food pages and push dedicated event via GTM custom JS variable if not already in dataLayer.
- Booking completions: coordinate with booking provider to push `table_booking_complete` to dataLayer (or send Measurement Protocol hit) on confirmation screen. Use GA4 conversion event.

---

## 2. GA4 Event Configuration

1. **Create Custom Dimensions**
   - `menu_type` (event scope)
   - `cta_location` (event scope)
   - `cta_context` (event scope)
   - `device_type` (event scope)
   - `offer_selected` (event scope)

2. **Mark Conversions**
   - `food_cta_click` (micro-conversion)
   - `table_booking_complete` (primary conversion)

3. **Audiences**
   - *Food Engagers:* `event_name = food_menu_view` in last 7 days.
   - *Pizza Tuesday Intenders:* `cta_context = pizza_tuesday`.
   - *Roast Intenders:* `cta_context = sunday_roast`.
   - *WhatsApp Enquirers:* `event_name = whatsapp_click`.

4. **Explorations**
   - Funnel: `food_menu_view` → `food_cta_click` → `table_booking_complete`.
   - Pathing: Starting from `food_menu_view`, identify drop-off points.

---

## 3. GTM Container Checklist

- [ ] Import GA4 configuration tag (existing property ID `G-XXXXXXXX`).
- [ ] Add lookup table to translate `navigator.userAgent` to `device_type`.
- [ ] Implement `WhatsApp CTA` tag (GA4 event) with link click trigger.
- [ ] Ensure consent mode settings match site default (analytics storage default = granted).
- [ ] Publish container to staging and run Tag Assistant verification.

---

## 4. QA Steps

1. Use Tag Assistant to confirm `menu_page_view` and `food_cta_click` fire on page load and CTA click.
2. Trigger WhatsApp CTA and verify event payload includes `cta_location`.
3. Submit a test booking via staging booking engine; inspect `table_booking_complete` event.
4. In GA4 DebugView, confirm mapped events with parameters.
5. After launch, validate daily counts in Looker Studio vs booking engine exports.

---

## 5. Dependencies

- Booking engine must expose success callback or confirmation page accessible for GTM.
- Dev team to ensure `BookTableButton` includes unique `source` values on new sections (check `/food-menu`, `/heathrow-layover-dining`).
- Analytics to coordinate with Marketing for WhatsApp quick replies tagging (UTM parameters).

---

## 6. Timeline

- **Week 1:** Implement GTM tags on staging, gather QA screenshots.
- **Week 2:** Push to production post-canonical/sitemap release; monitor for 48 hours.
- **Week 3:** Add Looker Studio panels for new events.
