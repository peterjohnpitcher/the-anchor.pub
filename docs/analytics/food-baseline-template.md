# Food Performance Baseline Template

**Purpose:** Capture pre-implementation metrics for `/food-menu`, `/sunday-lunch`, `/pizza-tuesday`, and supporting content so uplift can be monitored against the growth plan.

## 1. Data Pull Instructions

### Google Search Console
- Property: `https://www.the-anchor.pub/`
- Date range: last 12 complete weeks
- Filter: Page contains `/food-menu`, `/sunday-lunch`, `/pizza-tuesday`, `/food/`
- Export fields: Clicks, Impressions, CTR, Avg Position, Top Queries (add query dimension)
- Save export to: `analytics/raw/gsc-food-YYYYMMDD.csv`

### GA4 (The Anchor Property)
- Report: Engagement → Pages & screens
- Date range: matching GSC export
- Filter: Page path exactly `/food-menu`, `/sunday-lunch`, `/pizza-tuesday`
- Metrics: Views, Users, Avg engagement time, Event count (table_booking_complete if available)
- Export to: `analytics/raw/ga4-food-YYYYMMDD.csv`

### Booking Engine
- Report: Completed bookings referencing “Food”/“Roast”/“Pizza” tags
- Fields: Booking ID, Date, Party size, Source (website/phone), Notes
- Export to: `analytics/raw/bookings-food-YYYYMMDD.csv`

---

## 2. Summary Table (Populate Weekly)

| Week Ending | Page | GSC Clicks | GSC Impressions | CTR | Avg Position | GA4 Views | GA4 Users | GA4 Avg Engagement (s) | Food CTA Clicks | Bookings | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | /food-menu |  |  |  |  |  |  |  |  |  |  |
| YYYY-MM-DD | /sunday-lunch |  |  |  |  |  |  |  |  |  |  |
| YYYY-MM-DD | /pizza-tuesday |  |  |  |  |  |  |  |  |  |  |

---

## 3. Insights & Actions Log

Use this section to capture notable observations and proposed responses each week.

| Date | Insight | Proposed Action | Owner | Status |
| --- | --- | --- | --- | --- |
| YYYY-MM-DD | | | | |

---

## 4. Dashboard Notes

- Add Looker Studio data sources for the three CSV exports above (or connect live once GA4/GSC connectors are ready).
- Recommended charts: CTR vs target line, Bookings vs target, Event funnel (`food_menu_view` → `food_cta_click` → `table_booking_complete`).
- Document any filter settings or custom fields used so the dashboard can be replicated.
