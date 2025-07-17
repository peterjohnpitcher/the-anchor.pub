# Comprehensive Redirect Plan for The Anchor Website

## Overview
This plan covers all necessary 301 redirects for URLs that have received traffic in the last 16 months, mapping them from the old Wix structure to the new Next.js structure.

## Key URL Pattern Changes

### 1. Main Pages
- `/food` → `/food-menu`
- `/drink` → `/drinks`
- `/sport` → Removed (content integrated into homepage)
- `/our-events` → `/whats-on`
- `/review-the-anchor` → Removed (reviews on Google/Facebook)
- `/join-the-team` → Removed (contact info on main pages)

### 2. Blog Posts
Pattern: `/post/[slug]` → `/blog/[slug]`

### 3. Event Details
Pattern: `/event-details/[slug]` → `/events/[id]` (requires mapping)

### 4. Drink Pages
Pattern: `/drinks/[drink-name]` → Removed (all drinks now on single `/drinks` page)

### 5. Special Pages
- `/honey-bee-mine` → Removed (promotional page)
- `/category/all-products` → Removed (e-commerce functionality)
- `/subscribe` → Removed (newsletter signup in footer)

## Required Redirects

### High Priority (High Traffic Pages)

```json
{
  "source": "/food",
  "destination": "/food-menu",
  "permanent": true
}
```

```json
{
  "source": "/drink",
  "destination": "/drinks",
  "permanent": true
}
```

```json
{
  "source": "/our-events",
  "destination": "/whats-on",
  "permanent": true
}
```

```json
{
  "source": "/sport",
  "destination": "/",
  "permanent": true
}
```

### Blog Post Redirects

All blog posts need to be redirected from `/post/[slug]` to `/blog/[slug]`. Here are the high-traffic ones:

```json
{
  "source": "/post/autumn-internationals-2024-fixtures-key-matches",
  "destination": "/blog/autumn-internationals-2024-fixtures-key-matches",
  "permanent": true
}
```

```json
{
  "source": "/post/charity-walk-for-holly-fathers-mission",
  "destination": "/blog/charity-walk-holly",
  "permanent": true
}
```

```json
{
  "source": "/post/tequila-and-tradition-role-of-agave",
  "destination": "/blog/tequila-and-tradition-how-agave-shapes-mexican-cul",
  "permanent": true
}
```

```json
{
  "source": "/post/quiz-night-at-the-anchor",
  "destination": "/blog/pub-quiz-nights",
  "permanent": true
}
```

```json
{
  "source": "/post/the-importance-of-being-dog-friendly",
  "destination": "/blog/dog-friendly-pub",
  "permanent": true
}
```

```json
{
  "source": "/post/british-chip-shop-guide",
  "destination": "/blog/fish-chips-guide",
  "permanent": true
}
```

```json
{
  "source": "/post/euro-2024-stanwell-moor-staines",
  "destination": "/blog/euro-2024-viewing",
  "permanent": true
}
```

```json
{
  "source": "/post/celebrate-fathers-day-at-the-anchor",
  "destination": "/blog/fathers-day-celebration",
  "permanent": true
}
```

```json
{
  "source": "/post/introducing-inches-apple-cider",
  "destination": "/blog/inches-apple-cider",
  "permanent": true
}
```

```json
{
  "source": "/post/mothers-day",
  "destination": "/blog/mothers-day-at-the-anchor-march-19th",
  "permanent": true
}
```

### Drink Page Redirects

All individual drink pages should redirect to the main drinks menu:

```json
{
  "source": "/drinks/:drink*",
  "destination": "/drinks",
  "permanent": true
}
```

### Event Redirects

For events, we need to redirect to the main what's on page since event IDs have changed:

```json
{
  "source": "/event-details/:event*",
  "destination": "/whats-on",
  "permanent": true
}
```

### Special Promotions

```json
{
  "source": "/honey-bee-mine",
  "destination": "/",
  "permanent": true
}
```

```json
{
  "source": "/honey-bee-mine-terms-and-conditions",
  "destination": "/",
  "permanent": true
}
```

### Category Pages

```json
{
  "source": "/category/:category*",
  "destination": "/",
  "permanent": true
}
```

### Review/Team Pages

```json
{
  "source": "/review-the-anchor",
  "destination": "/",
  "permanent": true
}
```

```json
{
  "source": "/join-the-team",
  "destination": "/",
  "permanent": true
}
```

### Blog Category/Navigation

```json
{
  "source": "/blog/categories/:category*",
  "destination": "/blog",
  "permanent": true
}
```

```json
{
  "source": "/blog/page/:page",
  "destination": "/blog",
  "permanent": true
}
```

## Implementation Steps

1. **Create comprehensive redirect file**: Compile all redirects into a new `wix-redirects.json` file
2. **Update next.config.js**: Import and include the new redirect file
3. **Test critical paths**: Verify high-traffic URLs redirect correctly
4. **Monitor 404s**: Use Google Search Console to identify any missed redirects

## Additional Recommendations

1. **Submit sitemap**: Update and submit new sitemap to Google Search Console
2. **Update internal links**: Ensure all internal links use new URLs
3. **Monitor traffic**: Watch Analytics for any traffic drops
4. **Set up 404 monitoring**: Implement tracking for 404 errors

## Priority Order

1. Main navigation pages (/food, /drink, /our-events)
2. High-traffic blog posts (top 20)
3. Event pages (redirect to /whats-on)
4. Drink pages (redirect to /drinks)
5. All remaining blog posts
6. Utility pages (subscribe, categories, etc.)