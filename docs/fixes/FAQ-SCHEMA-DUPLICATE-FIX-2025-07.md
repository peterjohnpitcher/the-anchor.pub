# FAQ Schema Duplicate Fix - July 2025

## Issue Summary
Google Search Console reported "Duplicate field 'FAQPage'" errors on 27 pages, preventing them from being eligible for rich results.

## Root Causes Identified

1. **Duplicate Schema Markup Types**
   - FAQAccordionWithSchema component was using BOTH JSON-LD schema AND microdata markup (itemScope/itemType)
   - This created two FAQPage schemas per component instance

2. **Next.js Script Component Issues**
   - Using Next.js Script component with useId() was causing potential hydration/re-render issues
   - Script component might render multiple times during hydration

3. **Incorrect Schema Usage**
   - EventSchema component incorrectly used FAQPage as a subEvent type
   - FAQPage should never be a child of Event schema

## Changes Made

### 1. FAQAccordionWithSchema Component (`/components/FAQAccordionWithSchema.tsx`)

**Removed:**
- Microdata markup (itemScope, itemType, itemProp attributes)
- Next.js Script component
- useId() hook usage

**Changed:**
- Replaced Script component with regular `<script>` tag
- Removed all microdata attributes from HTML elements
- Simplified schema injection to prevent duplicates

**Key Changes:**
```diff
- import { useState, useId } from 'react'
- import Script from 'next/script'
+ import { useState } from 'react'

- <Script
-   id={`faq-schema-${schemaId}`}
-   type="application/ld+json"
-   dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
- />
+ <script
+   type="application/ld+json"
+   dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
+ />

- <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
+ <div className="space-y-4">
```

### 2. EventSchema Component (`/components/EventSchema.tsx`)

**Removed:**
- Incorrect use of FAQPage as subEvent

```diff
- ...(event.faq && event.faq.length > 0 && {
-   "subEvent": {
-     "@type": "FAQPage",
-     "mainEntity": event.faq
-   }
- }),
+ // Removed incorrect FAQPage as subEvent - FAQPage should never be a subEvent of Event
```

## Why These Changes Fix the Issue

1. **Single Schema Source**: By removing microdata markup, only JSON-LD schema remains
2. **No Re-render Issues**: Regular script tag doesn't re-render like Next.js Script component
3. **Correct Schema Structure**: FAQPage is no longer incorrectly nested in Event schemas

## Affected Pages (All Fixed)
All 27 pages reported by Google Search Console will be fixed by these component changes:
- /drinks
- /find-us
- /whats-on
- /m25-junction-14-pub
- /food-menu
- /pizza-tuesday
- /ashford-pub
- /christmas-parties
- /function-room-hire
- /beer-garden
- /corporate-events
- /private-party-venue
- /near-heathrow/terminal-5
- And all other pages using FAQAccordionWithSchema

## Testing Recommendations

1. **Immediate Testing**
   - Use Google's Rich Results Test on affected URLs
   - Verify only one FAQPage schema per page
   - Check that schema is valid JSON-LD

2. **Post-Deployment**
   - Monitor Google Search Console for validation
   - Expect 1-2 weeks for Google to re-crawl and validate
   - Check rich results eligibility improves

## Best Practices Going Forward

1. **One FAQPage per URL**: Never have multiple FAQPage schemas on one page
2. **Use JSON-LD Only**: Avoid mixing microdata with JSON-LD
3. **Avoid Dynamic IDs**: Use static schema injection to prevent hydration issues
4. **Correct Schema Nesting**: Never use FAQPage as a child of other types

## References
- [Google FAQPage Documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- Previous fix attempt: `/docs/archive/audits/FAQ-SCHEMA-DUPLICATE-ISSUE.md`