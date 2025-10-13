# Food Performance Growth Plan

**Objective:** Drive bookings from food-related searches by lifting impressions → clicks → conversions for core food URLs (`/food-menu`, `/sunday-lunch`, `/pizza-tuesday`, supporting offer pages).

**Baseline (GSC 28d ending 2025-10-12):**
- `/food-menu` variants: 11 clicks / 1,974 impressions, CTR <1.3% despite positions 5–8.
- Strong intent queries (“Sunday roast near Heathrow”, “Tuesday pizza deals”) show impressions with low CTR or rankings >10.
- Duplicate hostnames (`the-anchor.pub` vs `www`) splitting page signals.

| URL | Clicks | Impressions | CTR | Avg. Position |
| --- | ---: | ---: | ---: | ---: |
| `https://www.the-anchor.pub/food-menu` | 4 | 1,406 | 0.28% | 7.68 |
| `https://the-anchor.pub/food-menu` | 7 | 568 | 1.23% | 4.95 |
| `https://www.the-anchor.pub/sunday-lunch` | 26 | 696 | 3.74% | 6.50 |
| `https://www.the-anchor.pub/pizza-tuesday` | 1 | 327 | 0.31% | 13.60 |
| `https://www.the-anchor.pub/food/pizza` | 0 | 168 | 0.00% | 14.77 |

**High-value query clusters (top 10 each)**
- **Roast:** `sunday roast near heathrow airport` (2 clicks, 20 impressions, position 3.55) ▸ `sunday roast heathrow airport` ▸ `roast dinner near me` ▸ `sunday roast near me` (0 clicks, 27 impressions, position 13.81).
- **Pizza:** `tuesday pizza deals` (0/30/12.67) ▸ `bogof pizza near me` (0/13/7.38) ▸ `urban pizza stanwell moor` (0/19/6.05) ▸ `pizza buy one get one free near me` (0/22/31.95).
- **Menu:** `pub food near me` (1/12/24.17) ▸ `the anchor pub menu` (0/16/3.69) ▸ `british pub food menu staines` (0/95/10.45).

---

## Phase 1 – Audit & Foundations (Week 1)

- ⏳ **Canonical alignment**
  - Confirm preferred host (www vs non-www); enforce 301s and canonical tags.
  - Update `sitemap.xml` + robots if needed; re-submit in Search Console.
- ⏳ **Baseline metrics**
  - Snapshot GSC data for target URLs; export GA4 + booking conversions tied to food pages.
  - Build Looker Studio dashboard for weekly monitoring (food URL filter).
- ⏳ **Technical sweep**
  - Validate existing schema (FAQ, Menu, Offer) using Rich Results test.
  - Record Core Web Vitals for food templates (mobile-first).
  - Verify Google Business Profile menu accuracy.

## Phase 2 – Messaging & UX Overhaul (Weeks 2–4)

- ⏳ **Metadata refresh**
  - Rewrite titles/meta descriptions for key food URLs with offer-led messaging + booking CTA.
  - Target ≥4% CTR uplift by aligning with top queries.
  - ✅ 2025-10-12: Updated metadata for `/food-menu`, `/sunday-lunch`, `/pizza-tuesday` to emphasise booking, roasts and Pizza Tuesday deal.
- ✅ **Food hub redesign (`/food-menu`)**
  - New hero with primary booking CTA.
  - Split sections: Sunday roasts, Pizza Tuesday, Pub classics, Dietary-friendly options.
  - Add anchor links for quick jump; include high-quality imagery with alt text.
  - Surface social proof (food-specific reviews, awards).
  - ✅ 2025-10-12: Added hero booking CTA, quick-jump anchors, dedicated roast/pizza/classics sections and social proof card on `/food-menu`.
- ⏳ **CTA optimisation**
  - Persistent booking buttons (desktop + mobile), WhatsApp quick enquiry, deposit messaging for roasts.
  - Tag clicks with GA4 event labels (`section`, `device`).
  - ✅ 2025-10-12: Added Pizza Tuesday/Sunday Roast/Book Table CTAs to drinks menu hero & footer, plus quick-link promos.
- ⏳ **Schema update**
  - Publish FAQPage for roasts, ItemList for menu categories, Offer schema for Pizza Tuesday.

## Phase 3 – Offer Landing Pages (Weeks 3–6)

- ⏳ **Pizza Tuesday landing**
  - Detail deal mechanics, availability calendar, FAQ, testimonial snippets.
  - Link from homepage, food hub, events calendar; embed booking CTA.
  - ✅ 2025-10-12: Refresh `pizza-tuesday` hero, quick links, traveller section, group CTA and testimonial with BookTable buttons.
- ⏳ **Sunday Roast revamp**
  - Highlight menu options (beef, veggie, kids), sourcing story, pre-order/deposit steps.
  - Promote limited availability with booking prompts; include image gallery.
  - ✅ 2025-10-12: Updated `/sunday-lunch` hero CTA, Heathrow traveller guidance, family-friendly section and embedded BookTable buttons.
- ⏳ **Heathrow layover dining page**
  - Compare airport pricing vs pub experience; outline free parking, timed itineraries, quick booking.
  - Cross-link from travel guides and Airport pages.

## Phase 4 – Content & Internal Linking (Weeks 5–8)

- ⏳ **Support content**
  - Blog posts targeting clusters: “Best roast near Heathrow”, “Family-friendly Sunday lunch”, “Pizza deals Stanwell”.
  - Use query data for H2s/FAQs; interlink to landing pages.
- ✅ **Internal promos**
  - Add food CTAs to high-traffic pages (beer garden, travel guides, events listings).
  - Update homepage hero banners seasonally to feature food offers.
  - ✅ 2025-10-12: Added dedicated Sunday Roast/Pizza/Food CTAs to `/near-heathrow` traveller page.
  - ✅ 2025-10-12: Embedded food CTAs inside `/near-heathrow/terminal-5` for pre-flight diners.
  - ✅ 2025-10-12: Added roast/pizza/all-day booking modules to `/beer-garden` plane-spotting page.
  - ✅ 2025-10-12: Added Sunday Roast/Pizza Tuesday/all-day CTAs to `/plane-spotting-heathrow` guide.
  - ✅ 2025-10-12: Added food and booking CTA blocks to `/near-heathrow/terminal-2`, `/terminal-3`, and `/terminal-4` guides.
  - ✅ 2025-10-12: Promoted pizza/roast/table bookings on drag show landing page.
  - ✅ 2025-10-12: Added roast/pizza/all-day CTAs to bingo landing page.
- ⏳ **Off-site promotion**
  - Weekly Google Business Profile posts for roasts & pizza.
  - Newsletter + social updates with UTM links; share with local Facebook groups/Nextdoor.

## Phase 5 – Experience Enhancements (Weeks 6–9)

- ⏳ **Performance tuning**
  - Optimise images (WebP, srcset), lazy-load sections, review CSS/JS bundles for food templates.
  - Aim for mobile FCP <1.8s, LCP <2.5s.
- ⏳ **Social proof & media**
  - Embed Google reviews filtered for food mentions.
  - Add short videos (pizza prep, roast carving) with schema (`VideoObject`).
- ⏳ **Conversion tracking**
  - Configure GA4 events: `food_menu_view`, `food_cta_click`, `table_booking_complete`.
  - Ensure booking engine returns success signal with source attribution.

## Phase 6 – Measurement & Iteration (Weeks 8–12)

- ⏳ **Weekly reporting**
  - Review GSC food filter (impressions, CTR, average position).
  - Compare bookings vs prior periods; adjust copy/offers if under target.
- ⏳ **Testing roadmap**
  - A/B hero headlines, CTA copy/colour, offer emphasis (roast vs pizza).
  - Monitor impact on both CTR and bookings.
- ⏳ **Authority building**
  - Pitch refreshed content to Heathrow travel blogs, local food reviewers for backlinks.
  - Encourage satisfied diners to leave GBP reviews referencing food keywords.

---

## Success Metrics

- **3-month goals**
  - +60% clicks to food URLs vs baseline.
  - CTR ≥4% for `/food-menu`.
  - ≥30 incremental bookings attributed to food pages.
  - Pizza Tuesday page ranking top 3 for “Tuesday pizza deals Heathrow” keyword cluster.
- **Monthly checkpoints**
  - Week 4: CTR + metadata uplift.
  - Week 8: Booking conversions trending upward.
  - Week 12: SERP share and backlink growth.

---

## Ownership & Cadence

- ⏳ **Roles**
  - SEO/content: metadata, copy, schema (Owner: ___).
  - Design/dev: layout updates, performance tuning (Owner: ___).
  - Marketing: GBP, newsletter, social amplification (Owner: ___).
  - Analytics: dashboarding, conversion tracking (Owner: ___).
- ⏳ **Rhythm**
  - Weekly stand-up on tasks/blockers.
  - Monthly KPI review using Looker Studio dashboard.
  - 90-day retrospective to reset targets and roadmap next experiments.

---

**Outstanding next steps**
1. Confirm preferred canonical domain and communicate to devs for Week 1 implementation.
2. Schedule working session to wireframe redesigned food hub and Pizza Tuesday page.
3. Prepare metadata draft updates for key URLs ahead of copywriting sprint.
4. Assign named owners for SEO/content, design/dev, marketing, and analytics workstreams.

**Outstanding summary**
- Phase 1: Canonical alignment, analytics baseline capture, and technical sweep remain open.
- Phase 2: GA4/GTM deployment for new CTA events still required (data layer live).
- Phase 4: Off-site promotion calendar ready but execution and owner assignment pending.
- Phase 5: Awaiting performance optimisation, social proof media, and GA4 conversion tracking configuration.
- Phase 6: Standing up reporting, testing roadmap, and authority outreach yet to start.
- Operations: Role assignments and cadence rituals to be formalised.

---

## Execution Detail For Outstanding Items

### Phase 1
- ⏳ Canonical alignment: audit current redirects (`the-anchor.pub` ↔ `www`), update nginx/hosting rules to enforce preferred host, confirm `rel=canonical` and `hreflang` alignment, regenerate `sitemap.xml`, submit change request for Search Console `Change of Address`.
- ⏳ Baseline metrics: pull 12-week historic GSC export for `/food` URLs, map GA4 events to booking funnel, document baseline conversions in shared dashboard brief.
  - 📝 2025-10-13: Created baseline capture template and instructions in `docs/analytics/food-baseline-template.md`.
- ⏳ Technical sweep: run Rich Results test for `/food-menu`, `/sunday-lunch`, `/pizza-tuesday`; capture Core Web Vitals via PageSpeed API; verify GBP menu items, pricing, and Pizza Tuesday offer.

### Phase 2
- ⏳ CTA optimisation: implement persistent sticky CTA on mobile template, add WhatsApp link with UTM + GA4 event parameters, configure GA4 click tracking via GTM with `section` + `device` custom dimensions.
  - ✅ 2025-10-13: Deployed `FoodStickyCtaBar` with tracked booking + WhatsApp actions across `/food-menu`, `/pizza-tuesday`, `/sunday-lunch`, and `/heathrow-layover-dining`; added context-aware `food_cta_click` event in `lib/gtm-events.ts`.
  - ✅ 2025-10-13: Normalised CTA contexts on food pages and exposed dedicated `food_menu_view/exit` events to the data layer for GA4 ingestion.
  - ⚙️ Next: Configure GTM/GA4 per `docs/analytics/ga4-food-events.md` so the new events surface in reporting.
- ✅ Schema update: draft FAQ markup for roast questions, extend ItemList to cover vegetarian/gluten-free options, add Offer schema for Pizza Tuesday with valid price/availability fields, validate through Rich Results.
  - ✅ 2025-10-13: Added ItemList JSON-LD across `/food-menu`, `/sunday-lunch`, `/pizza-tuesday` plus refreshed Pizza Tuesday offer data.

### Phase 3
- ✅ Pizza Tuesday landing: expand copy describing deal mechanics, add weekly availability table, embed testimonials carousel, craft FAQ section targeting “pizza deals near Heathrow” queries.
  - ✅ 2025-10-13: Added upcoming availability table, mobile sticky CTA, and WhatsApp tracking enhancements on `app/pizza-tuesday/page.tsx`.
- ✅ Sunday Roast revamp: integrate menu cards per protein option, highlight sourcing story (e.g., local farms), add booking/deposit flow explainer, publish mini-gallery with alt text.
  - ✅ 2025-10-13: Extended CTA coverage with mobile booking bar and WhatsApp pathing on `app/sunday-lunch/page.tsx`.
- ✅ Heathrow layover dining page: structure itinerary content (2h/3h layovers), list transport/parking info, compare airport vs pub pricing, integrate booking CTA and cross-links to `/near-heathrow` guides.
  - ✅ 2025-10-13: Launched `app/heathrow-layover-dining/page.tsx` with itineraries, travel table, FAQ schema, and sticky CTA; linked via navigation and sitemap.

#### Page Structure Drafts
- **Pizza Tuesday landing**
  1. Hero: headline emphasising BOGOF Tuesdays, subhead with timings, booking CTA.
  2. Deal mechanics: pricing table, how to redeem, dietary options.
  3. Availability calendar: simple week-by-week slots, note on group bookings/deposits.
  4. Testimonials: carousel with review snippets, star rating callouts.
  5. FAQs: booking window, vegetarian/vegan options, takeaway policy.
  6. Heathrow traveller section: travel time comparisons, parking info, map embed.
  7. Sticky CTA/footer: “Book Pizza Tuesday” + WhatsApp enquiry.
- **Sunday Roast revamp**
  1. Hero with seasonal imagery, copy stressing limited portions, booking CTA.
  2. Menu cards: Beef, Pork, Veggie, Kids; include sides and allergens.
  3. Provenance story: supplier highlights, sustainability note.
  4. Planning info: seating times, deposit/pre-order guidance, group bookings.
  5. Family friendly: kids’ play options, high chairs, dog-friendly note.
  6. Travel & parking: Heathrow layover tips, map snippet.
  7. Gallery: carousel of roast imagery with descriptive alt text.
  8. FAQ: “Do you cater gluten-free?”, “Do you offer takeaway roasts?” etc.
- **Heathrow layover dining page**
  1. Hero: headline around “Layover Dining in 90 Minutes”, CTA to book.
  2. Why choose The Anchor: price comparison vs terminals, ambience, table service.
  3. Itinerary guides: 90-minute, 3-hour, overnight layover options.
  4. Logistics: shuttle/taxi/Uber times, luggage storage tips, parking instructions.
  5. Menu highlights: roasts, pizza, express bites with link to `/food-menu`.
  6. Booking & arrival checklist: reserve table, confirm party size, arrival buffer.
  7. Testimonials from travellers, link to GBP reviews.
  8. Map & directions embed, cross-links to `/near-heathrow` sub-pages.

### Phase 4
- ✅ Support content: brief blog outlines for roast, family-friendly lunch, and pizza deal articles; include target queries, internal link targets, and schema opportunities (HowTo/FAQ).
  - ✅ 2025-10-13: Published blogs `content/blog/best-sunday-roast-near-heathrow`, `family-friendly-sunday-lunch-heathrow`, and `pizza-deals-stanwell-heathrow-tuesdays`.
- ⏳ Off-site promotion: plan 6-week GBP post calendar, coordinate newsletter featuring food offers with UTM tracking, identify Heathrow traveller Facebook/Nextdoor groups for promotion schedule.
  - 📝 2025-10-13: Drafted 6-week activation plan in `docs/marketing/food-offsite-promo-calendar.md`; execution to follow once owners assigned.

#### Blog Briefs
- **Best Sunday Roast Near Heathrow**
  - Primary query: “best sunday roast near heathrow”, secondary: “heathrow roast dinner”, “roast near me heathrow terminal 5”.
  - Structure: intro (layover positioning), section for each roast option (Anchor hero, competitor comparisons), tips for booking ahead, FAQs, CTA to `/sunday-lunch`.
  - Schema: `FAQPage` for top 3 roast questions.
- **Family-Friendly Sunday Lunch Heathrow**
  - Primary query: “family friendly sunday lunch heathrow”, secondary: “kid friendly roast near heathrow”, “family lunch staines”.
  - Structure: family amenities, kids menu highlights, stroller access, parking info, testimonials from families, CTA to `/sunday-lunch`.
  - Schema: `HowTo` for planning a family Sunday lunch trip.
- **Pizza Deals Stanwell & Heathrow Tuesdays**
  - Primary query: “tuesday pizza deals heathrow”, secondary: “bogof pizza stanwell”, “pizza tuesday near heathrow”.
  - Structure: Pizza Tuesday offer overview, pricing comparison, group booking options, layover value angle, FAQs, CTA to `/pizza-tuesday`.
  - Schema: `FAQPage` with redemption details.

### Phase 5
- ⏳ Performance tuning: compress hero imagery to WebP, implement `loading="lazy"` for below-fold media, audit CSS/JS bundles for unused assets, report LCP improvements.
- ⏳ Social proof & media: source top GBP food reviews, embed via API or manual snippet, storyboard short-form video content for pizza/roast prep, tag with `VideoObject` schema.
- ⏳ Conversion tracking: define GA4 custom events (`food_menu_view`, `food_cta_click`, `table_booking_complete`), coordinate booking engine callback for conversion confirmation, QA tracking in staging then production.

### Phase 6
- ⏳ Weekly reporting: configure Looker Studio dashboard with filters for food URLs, add CTR, position, and booking trend charts, schedule automated email delivery.
- ⏳ Testing roadmap: prioritise A/B tests (hero headline variations, CTA styling) with hypothesis, KPI, and sample size; set up testing cadence.
- ⏳ Authority building: compile target list of Heathrow blogs/food reviewers, draft outreach templates, create testimonials landing page for backlinks, prompt diners for GBP reviews referencing roasts/pizza.

### Operations
- ⏳ Ownership: assign named owners for SEO/content (metadata, schema), design/dev (layout, performance), marketing (GBP, newsletter, social), and analytics (dashboards, tracking).
- ⏳ Cadence: schedule weekly stand-up, define agenda, create shared tracker for blockers; set monthly KPI review invites and template; prep 90-day retrospective outline and responsible facilitator.

---

## Workstream Tracker

| Priority | Task | Owner | Target Date | Status |
| --- | --- | --- | --- | --- |
| High | Enforce canonical host + regenerate sitemap and submit in GSC | TBD (Dev) | Week 1 | ⏳ In progress (middleware live; GSC resubmission pending) |
| High | Build food performance Looker Studio dashboard with GA4 + GSC data | TBD (Analytics) | Week 1 | ⏳ Not started |
| High | Draft/approve structured data (FAQ, ItemList, Offer) for food pages | TBD (SEO) | Week 2 | ⏳ Not started |
| High | Implement GA4 event tracking for food CTAs via GTM | TBD (Analytics) | Week 2 | ⏳ Not started |
| High | Prepare GA4/GTM implementation brief & QA checklist | TBD (Analytics) | Week 1 | ✅ Completed 2025-10-13 (`docs/analytics/ga4-food-events.md`) |
| Medium | Extend Pizza Tuesday page with availability table + testimonials | TBD (Content) | Week 3 | ✅ Completed 2025-10-13 |
| Medium | Produce Heathrow layover dining landing page | TBD (Content) | Week 3 | ✅ Launched 2025-10-13 |
| Medium | Publish supporting blog posts (roast, family lunch, pizza deals) | TBD (Content) | Week 5 | ✅ Published 2025-10-13 |
| Medium | Launch GBP/social promotion calendar for food offers | TBD (Marketing) | Week 5 | 📝 Plan drafted 2025-10-13 |
| Medium | Deploy mobile sticky CTAs + WhatsApp funnels on food pages | TBD (Dev) | Week 2 | ✅ Live 2025-10-13 |
| Medium | Compress hero imagery and optimise LCP on food templates | TBD (Dev) | Week 6 | ⏳ Not started |
| Low | Embed food-focused reviews and video assets with schema | TBD (Marketing) | Week 7 | ⏳ Not started |
| Low | Stand up A/B testing roadmap and backlog | TBD (SEO/Analytics) | Week 8 | ⏳ Not started |
| Low | Execute backlink outreach to Heathrow travel/food sites | TBD (SEO/Marketing) | Week 10 | ⏳ Not started |

---

## Dependencies & Risks

- **Tracking before optimisation:** GA4 event schema must be live before CTA tests (Phases 2 & 6) so results can be measured; prioritise GTM updates once canonical work is approved.
- **Canonical + sitemap:** Search Console submission depends on redirect updates; coordinate with dev ops to execute in off-peak window and monitor for crawl errors.
- **Content sequencing:** Heathrow layover landing page should publish ahead of support blogs to unlock internal linking; ensure design assets are ready one week prior.
- **Media capture:** Video/social proof tasks require coordination with kitchen schedule; lock filming dates to avoid slipping Phase 5 timelines.
- **Resource bandwidth:** Same dev resource spans canonical fixes, performance tuning, and GTM updates—align sprint planning to avoid bottlenecks; consider contractor support if timelines compress.
- **External promotion:** GBP/social calendar relies on finalised Pizza Tuesday/Sunday Roast copy; content team to deliver drafts at least three days before scheduled posts.

---

## Immediate 2-Week Action Plan

**Week 1**
- Finalise preferred canonical host and deploy 301s + sitemap update; follow with Search Console submissions and crawl health check.
- Kick off analytics: export historic GSC/GA4 data, define dashboard requirements, start Looker Studio build.
- Inventory current schema output and capture issues ahead of FAQ/Offer implementation.

**Week 2**
- Ship GA4/GTM tracking for key CTAs, including event naming conventions and QA checklist.
- Draft structured data snippets (FAQ, ItemList, Offer) and circulate for review before pushing to production.
- Begin content expansion briefs for Pizza Tuesday and Heathrow layover pages so copy can be drafted in Week 3.

**Week 3**
- Publish enhanced Pizza Tuesday and Sunday Roast copy assets; wire up availability table and testimonial modules.
- Launch Heathrow layover dining page with internal links from `/near-heathrow` hubs and homepage banner.
- Prepare GBP/social content for fortnightly posts aligned to new page launches; ensure UTM parameters are ready.

**Week 4**
- Deliver first support blog article (“Best Sunday Roast Near Heathrow”), promote via newsletter segment, link from `/sunday-lunch`.
- QA GA4 dashboard outputs against booking engine data; adjust filters/segments.
- Plan A/B testing backlog for hero/CTA experiments, define success metrics, and schedule initial test for Week 5.

**Week 5**
- Publish “Family-Friendly Sunday Lunch Heathrow” blog, embed schema, and push to GBP/social channels.
- Run first hero CTA test on `/food-menu`; monitor GA4 events daily, prepare interim report.
- Begin performance optimisation sprint: implement WebP conversions and lazy loading for `/food-menu` assets.
- Record initial customer testimonials for video/social proof; begin edit workflow.

**Week 6**
- Launch “Pizza Deals Stanwell & Heathrow Tuesdays” blog and cross-link from `/pizza-tuesday` + travel guides.
- Deploy Offer/FAQ schema to production and validate via Search Console enhancements report.
- Finalise social proof module with top GBP reviews and embed on `/food-menu`.
- Complete performance audit follow-up, aiming for FCP/LCP targets; document before/after metrics.

**Weeks 7–8**
- Release short-form videos (pizza prep, roast carving) site-wide with `VideoObject` schema; promote via newsletter/social.
- Expand backlink outreach to Heathrow blogs, track responses, secure at least two placements.
- Launch second A/B test (CTA copy/colour); continue dashboard monitoring and share insights in weekly stand-up.
- Review booking conversion data vs baseline; adjust offer messaging if targets lag.

**Weeks 9–12**
- Continue backlink and GBP review drive, highlighting food keywords in prompts.
- Iterate on metadata based on new query data; adjust titles/descriptions if CTR plateauing.
- Conduct performance regression check after all media embeds.
- Prepare 90-day retrospective deck: KPIs vs goals, learnings from tests/content, roadmap proposals for next quarter.
