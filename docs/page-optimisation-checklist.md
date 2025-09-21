# Page Optimisation Checklist

> Tracking systematic optimisation pass across all Next.js App Router pages.

## Legend
- [x] Reviewed & optimised (or confirmed no changes required)
- [~] Reviewed, follow-up improvements identified (documented)
- [ ] Pending review

## Core Marketing
- [x] app/page.tsx (Home) *(refined hero status layout, restored Life at The Anchor gallery assets)*
- [x] app/near-heathrow/page.tsx *(normalised section layout with Container wrappers, mobile CTA tweaks)*
- [x] app/beer-garden/page.tsx *(removed unused imports, switched to shared Container for consistent spacing)*
- [x] app/sunday-lunch/page.tsx *(converted to Container layout, mobile-friendly CTAs, warning banner tidy)*
- [x] app/private-party-venue/page.tsx *(hero CTA widths, Container wrappers, enquiry CTA polish)*
- [x] app/book-event/page.tsx *(converted manual containers, mobile-first contact CTA)*
- [x] app/christmas-parties/page.tsx *(mobile-friendly CTA/contact actions, Container usage)*
- [x] app/corporate-events/page.tsx *(responsive hero CTAs, shared Container layout, consistent contact buttons)*
- [x] app/drinks/page.tsx *(hero CTA widths, Section wrappers for key highlights, CTA button responsiveness)*
- [x] app/food-menu/page.tsx *(hero CTAs responsive, converted manual wrappers to Section/Container, CTA buttons full-width on mobile)*
- [x] app/pizza-tuesday/page.tsx *(hero CTAs responsive, replaced manual sections with Section/Container wrappers)*
- [x] app/free-parking/page.tsx *(hero CTA widths, converted layout to Section/Container, consistent contact CTAs)*
- [x] app/find-us/page.tsx *(hero buttons mobile-ready, section layout normalised, facility blocks converted to shared Container)*
- [x] app/whats-on/page.tsx *(hero CTA buttons responsive, sections converted to shared layout, internal links wrapped in Section)*
- [x] app/events/[id]/page.tsx *(converted header/detail/CTA wrappers to Section, ensured buttons scale on mobile)*

## Location Pages
- [x] app/ashford-pub/page.tsx *(structure/layout OK; no changes required)*
- [x] app/bedfont-pub/page.tsx *(removed unused imports, standardised layout containers)*
- [x] app/egham-pub/page.tsx *(trimmed unused imports, aligned sections with Container component)*
- [x] app/feltham-pub/page.tsx *(removed unused imports, normalised layout containers, tidied CTA markup)*
- [x] app/heathrow-hotels-pub/page.tsx *(trimmed unused imports, standardised Container usage across sections)*
- [x] app/m25-junction-14-pub/page.tsx *(removed unused imports, applied Container layout, tidied CTAs)*
- [x] app/pubs-in-stanwell/page.tsx *(drop unused imports, switched sections to Container for consistent spacing)*
- [x] app/restaurants-near-heathrow/page.tsx *(removed unused imports, applied Container wrappers across sections)*
- [x] app/staines-pub/page.tsx *(removed unused imports, wrapped sections with Container for consistent layout)*
- [x] app/stanwell-pub/page.tsx *(removed unused imports, converted layout to Container components)*
- [x] app/windsor-pub/page.tsx *(removed unused imports, standardised sections with Container)*
- [x] app/near-heathrow/terminal-2/page.tsx *(removed unused Image import, tidied CTA button markup)*
- [x] app/near-heathrow/terminal-3/page.tsx *(removed unused Image import, cleaned CTA button markup)*
- [x] app/near-heathrow/terminal-4/page.tsx *(removed unused Image import, adjusted CTA button markup, added Container around page title)*
- [x] app/near-heathrow/terminal-5/page.tsx *(removed unused Image import, cleaned CTA button markup, wrapped page title with Container)*

## Blog & Content Hubs
- [x] app/blog/page.tsx *(hero CTA info, sections converted to shared layout, CTA buttons mobile responsive)*
- [x] app/blog/[slug]/page.tsx *(migrated to Section/Container layout, cleaned duplicate schema, tightened mobile spacing)*
- [x] app/blog/tag/[tag]/page.tsx *(aligned with shared Section patterns, consolidated CTA/phone info)*
- [x] app/blog/tags/page.tsx *(converted to HeroWrapper + Section layout, centralised tag grid)
- [x] app/components/page.tsx *(general layout OK; removed noisy console logging from demo form)*
- [x] app/sitemap-page/page.tsx *(swapped raw sections for shared Section/Container wrappers)*
- [x] app/privacy-policy/page.tsx *(wrapped with Section container, trimmed unused imports)*
- [x] app/leave-review/page.tsx *(redirect only – no layout changes required)*

## Menu & Booking Journey
- [x] app/book-table/page.tsx *(new hero + guidance panels, BookingWizard wrapped with shared Section layout)*
- [x] app/booking-confirmation/page.tsx *(header/detail/CTA wrapped in Section, buttons responsive)*
- [x] app/drinks/baby-guinness/page.tsx *(switched to shared Section layout, cleared unused imports)*
- [x] app/drinks/managers-special/page.tsx *(aligned with Section patterns, trimmed unused imports, added FAQ wrapper)*
- [x] app/food/fish-and-chips/page.tsx *(now uses Section/Container wrappers, removed dead imports, tightened FAQ spacing)*
- [x] app/food/pizza/page.tsx *(Section wrappers replace manual containers, cleaned unused imports)*
- [x] app/sunday-lunch/page.tsx *(covered in Core Marketing pass)*

## Utility / Debug / Test Pages
- [x] app/debug-hours/page.tsx *(wrapped in Section layout, debug logs gated by env toggle)*
- [x] app/demo-header/page.tsx *(converted to Section wrapper for guidance content)*
- [x] app/gtm-debug/page.tsx *(Sectionised layout, debug output respects `NEXT_PUBLIC_STATUSBAR_DEBUG`)*
- [x] app/test-gtm/page.tsx *(Section layout + UI button, conditional console logging)*
- [x] app/test-hours/page.tsx *(Section layout, tidy loading/error states)*
- [x] app/test-navigation-tracking/page.tsx *(Section layout with cleanup + debug-only logging)*
- [x] app/test-reviews/page.tsx *(Section wrapper, simplified spacing, removed unused imports)*
- [x] app/test-simple/page.tsx *(Section layout, graceful error handling, debug gating)*
- [x] app/test-tracking/page.tsx *(Section layout, debug helper + dataLayer cleanup)*
