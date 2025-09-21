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
- [ ] app/blog/[slug]/page.tsx
- [ ] app/blog/tag/[tag]/page.tsx
- [ ] app/blog/tags/page.tsx
- [ ] app/components/page.tsx
- [ ] app/sitemap-page/page.tsx
- [ ] app/privacy-policy/page.tsx
- [ ] app/leave-review/page.tsx

## Menu & Booking Journey
- [ ] app/book-table/page.tsx
- [x] app/booking-confirmation/page.tsx *(header/detail/CTA wrapped in Section, buttons responsive)*
- [ ] app/drinks/baby-guinness/page.tsx
- [ ] app/drinks/managers-special/page.tsx
- [ ] app/food/fish-and-chips/page.tsx
- [ ] app/food/pizza/page.tsx
- [ ] app/sunday-lunch/page.tsx

## Utility / Debug / Test Pages
- [ ] app/debug-hours/page.tsx
- [ ] app/demo-header/page.tsx
- [ ] app/gtm-debug/page.tsx
- [ ] app/test-gtm/page.tsx
- [ ] app/test-hours/page.tsx
- [ ] app/test-navigation-tracking/page.tsx
- [ ] app/test-reviews/page.tsx
- [ ] app/test-simple/page.tsx
- [ ] app/test-tracking/page.tsx
