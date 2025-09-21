# Analytics & GTM Event Taxonomy (September 2025)

This document summarises the unified tracking approach introduced for The Anchor in September 2025. It covers the shared dispatcher, the core events we rely on, and the metadata each event sends to Google Tag Manager, Google Analytics, and `/api/analytics`.

## 1. Dispatcher overview

- `lib/tracking/dispatcher.ts` now owns all pushes to `window.dataLayer`, `gtag`, and the `/api/analytics` endpoint.
- The dispatcher respects the analytics cookie category. Events that require consent are skipped automatically if the user has not opted in.
- Additional helpers (`trackWithMetadata`, `pushToDataLayer`, `trackCtaClick`, etc.) all call the dispatcher, so every tracking call now shares the same formatting, timestamp, and page context.
- Consider the dispatcher the **only** approved way to push events. Avoid direct `window.dataLayer.push` statements in components.

## 2. Key events & payloads

### `cta_click`
| Field | Notes |
| --- | --- |
| `event` | `cta_click` |
| `event_category` | `CTA` |
| `cta_id` | Required unique identifier per CTA |
| `cta_label` | Guest-facing text |
| `cta_location` | Section or component name (e.g. `christmas_hero`) |
| `cta_destination` | Primary outcome (`enquiry_form`, `phone`, `email`, `event_page`, etc.) |
| `cta_mode` | Optional – e.g. `dinner` vs `buffet` |
| `cta_context` | Optional free text for campaigns |
| `cta_variant` | Optional styling variant / test bucket |

### `form_start`, `form_complete`, `form_abandon`
| Field | Notes |
| --- | --- |
| `form_name` | Stable identifier e.g. `christmas_main_enquiry_form` |
| `form_source` | Where the form was triggered (`hero_dinner`, `lightbox`, etc.) |
| `form_mode` | Mode or pathway (`dinner`, `buffet`) |
| `form_journey` | Conversion journey identifier (`christmas_parties_page`) |
| `form_step` | Optional – use for multi-step flows |
| `last_field` | Only for `form_abandon` |

### `table_booking_click`
| Field | Notes |
| --- | --- |
| `booking_source` | CTA source (`header`, `floating_actions`, etc.) |
| `booking_context` | Optional narrative (`regular`, `christmas_party`) |
| `booking_event` | Linked event name if relevant |
| `booking_device` | `mobile` or `desktop` |
| `booking_time_of_day` | Derived tag for day-part targeting |
| `booking_day_of_week` | Plain-English weekday |
| `booking_destination` | URL or flow target |
| `booking_origin_path` | Pathname where the click happened |

*Note:* `table_booking_click` events are sent to `/api/analytics` by default because we previously used `analytics.track` here. No extra work required in components.

### `banner_interaction`
| Field | Notes |
| --- | --- |
| `banner_id` | Identifier for the banner (`christmas_earlybird_banner`, `event_countdown_banner`) |
| `banner_action` | `view`, `click`, or `dismiss` |
| `banner_campaign` | Campaign or slug to help with segmentation |
| `event_label` | Human-readable label (usually the banner headline) |

### Other existing events
- Booking funnel events (`table_booking_*`, `booking_wizard_*`), navigation clicks, allergen filters, etc., continue to work but now run through the dispatcher so they inherit timestamps, page context and consent handling automatically.

## 3. Implementation guidelines

1. **CTAs:** Always call `trackCtaClick` with a unique `cta_id` _before_ invoking the behaviour (form scroll, tel link, etc.).
2. **Forms:** Use `trackFormStart` and `trackFormComplete` with `{ formName, source, mode, journey }` objects instead of plain strings.
3. **Banners / lightboxes:** Fire a `banner_interaction` event when the element is displayed (`action: 'view'`) and again on click/dismiss.
4. **Phone / email links:** Call `analytics.phoneCall` or `analytics.emailClick` **and** `trackCtaClick` so that call tracking still feeds `/api/analytics`.
5. **New features:** Import `pushToDataLayer` only for helper utilities. In components, prefer the semantic helpers (`trackCtaClick`, `trackFormStart`, etc.).
6. **Testing:** Use `/app/test-tracking` or Chrome DevTools console (`window.dataLayer`) to confirm events; all helpers append `event_timestamp`, `page_path`, and `page_location` automatically.

## 4. QA checklist (post-change)
- [x] Hero buttons on `/christmas-parties` fire `cta_click` with correct metadata.
- [x] Form submissions send `form_start` + `form_complete` events and update `/api/analytics`.
- [x] Early-bird ribbon and lightbox fire `banner_interaction` for view/click/dismiss.
- [x] Event countdown banner emits `view`, `click`, and `dismiss` actions with the new schema.
- [x] `BookTableButton` now emits a single `table_booking_click` event (no duplicate manual `dataLayer` pushes).
- [x] `npm run lint` passes without warnings to catch missing imports introduced during the refactor.

Keep this file updated as we add new journeys or extend the taxonomy.
