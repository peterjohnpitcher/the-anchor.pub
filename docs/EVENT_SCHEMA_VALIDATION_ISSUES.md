# Event Schema Validation Issues - Google Search Console

## Problem Summary

Google Search Console is reporting multiple validation errors for event schemas across the site. Despite recent fixes to some event pages, there are still systematic issues with missing required fields.

## Current Validation Errors (as of 2025-07-18)

| Field | Error Type | Affected Items | Priority |
|-------|-----------|----------------|----------|
| performer | Missing field | 7 | High |
| organizer | Missing field | 7 | High |
| image | Missing field | 5 | High |
| offers | Missing field | 4 | High |
| eventStatus | Missing field | 4 | High |
| availability (in offers) | Missing field | 3 | Medium |
| validFrom (in offers) | Missing field | 3 | Medium |
| url (in offers) | Missing field | 3 | Medium |
| endDate | Missing field | 1 | Low |
| description | Missing field | 1 | Low |

## Required Schema Fields for Events

According to Google's documentation, Event schema must include:

### Required Fields:
- `@type`: "Event"
- `name`: Event name
- `startDate`: ISO 8601 format with timezone
- `location`: Physical location with full address including country
- `eventStatus`: Must be one of the valid status URLs
- `eventAttendanceMode`: Must be one of the valid attendance mode URLs

### Strongly Recommended Fields:
- `endDate`: ISO 8601 format with timezone
- `description`: Text description of the event
- `image`: Array of image URLs
- `offers`: Ticket/pricing information
  - `url`: URL where tickets can be purchased
  - `price`: Numeric price
  - `priceCurrency`: Currency code (e.g., "GBP")
  - `availability`: Schema.org availability status
  - `validFrom`: When offers become available
- `performer`: Person or organization performing
- `organizer`: Organization hosting the event

## Discovery Plan

1. **Find All Event Renderings**
   - Search for all JSON-LD scripts with Event type
   - Find all uses of EventSchema component
   - Find all hardcoded event schemas
   - Check API responses for event data

2. **Analyze EventSchema Component**
   - Verify it includes all required fields
   - Check conditional logic that might skip fields
   - Ensure proper fallbacks for missing data

3. **Identify Event Sources**
   - Static events (hardcoded)
   - Dynamic events from API
   - Event series/recurring events
   - Special one-time events

4. **Map Event Locations**
   - Pages with event listings
   - Individual event pages
   - Component renderings (UpcomingEvents, NextEvent, etc.)

## Implementation Strategy

1. **Update EventSchema Component**
   - Ensure ALL required fields are always included
   - Add sensible defaults for missing data
   - Add validation/warnings for missing fields

2. **Standardize Event Data**
   - Create consistent event data structure
   - Ensure all event sources provide required fields
   - Add data transformation layer if needed

3. **Fix All Event Renderings**
   - Replace hardcoded schemas with EventSchema component
   - Ensure component is used everywhere events are displayed
   - Add missing data to static events

4. **Testing & Validation**
   - Use Google's Rich Results Test
   - Check all event pages
   - Monitor Search Console for improvements

## Files to Review

- `/components/EventSchema.tsx` - Main schema component
- `/lib/api.ts` - Event data structures
- `/lib/static-events.ts` - Static event definitions
- All pages in `/app/` that might render events
- Components that display events

## Analysis Results

### EventSchema Component Analysis
The EventSchema component has proper fallbacks for all required fields:
- ✅ Always includes eventStatus and eventAttendanceMode
- ✅ Has default organizer (The Anchor)
- ✅ Has default performer (The Anchor Entertainment)
- ✅ Always includes image (with fallback)
- ✅ Always includes offers with all subfields
- ✅ Always includes full location with country
- ✅ Always generates endDate if missing
- ✅ Always includes description with fallback

### Hardcoded Event Schemas Found
1. `/app/whats-on/page.tsx` - EventSeries with subEvents (lines 347-403)
2. `/app/whats-on/drag-shows/page.tsx` - Event schema (lines 417-467)
3. `/app/christmas-parties/page.tsx` - christmasEventSchema variable
4. `/app/corporate-events/page.tsx` - corporateEventSchema variable
5. `/app/private-party-venue/page.tsx` - privatePartySchema variable

### Root Cause Analysis
The validation errors are coming from:
1. **Hardcoded schemas** that were recently "fixed" but are still missing some fields
2. **EventSeries schemas** in lib/schema.ts that don't use the EventSchema component
3. **Possible API events** that might not have all required data

## Comprehensive Fix Plan

### Phase 1: Fix Hardcoded Event Schemas
Replace all hardcoded schemas with proper event data objects that use the EventSchema component.

### Phase 2: Update EventSeries Schemas
Convert EventSeries schemas to use individual Event schemas for better validation.

### Phase 3: Ensure API Events Have Required Data
Add data validation/transformation for events from the API.

### Phase 4: Testing & Validation
Test all pages with Google's Rich Results Test tool.

## Success Criteria

- Zero validation errors in Google Search Console
- All events eligible for rich results
- Consistent schema implementation across the site
- Proper fallbacks for optional fields