# Orphaned Pages Analysis - The Anchor Pub Website

## Summary
This analysis compares pages in the sitemap against pages linked from navigation and internal content to identify orphaned, unlinked, or hidden pages.

## Pages in Sitemap (sitemap.ts)
- `/` (Home)
- `/food-menu`
- `/drinks`
- `/sunday-lunch`
- `/whats-on`
- `/whats-on/drag-shows`
- `/blog`
- `/near-heathrow`
- `/near-heathrow/terminal-2`
- `/near-heathrow/terminal-3`
- `/near-heathrow/terminal-4`
- `/near-heathrow/terminal-5`
- `/find-us`
- `/book-event`
- `/beer-garden`
- `/staines-pub`
- `/food/pizza`
- Dynamic blog posts: `/blog/[slug]`
- Dynamic tag pages: `/blog/tag/[tag]`

## Pages Linked in Navigation (Navigation.tsx)
Main navigation:
- `/whats-on`
- `/food-menu`
- `/drinks`
- `/book-event`
- `/blog`
- `/find-us`
- `/near-heathrow`

## Pages Linked in Footer (Footer.tsx)
Quick Links:
- `/whats-on`
- `/food-menu`
- `/sunday-lunch`
- `/drinks`
- `/book-event`
- `/sitemap-page`

Private Events:
- `/christmas-parties`
- `/corporate-events`
- `/private-party-venue`
- `/function-room-hire`

Special Features:
- `/beer-garden`
- `/food/pizza`
- `/whats-on/drag-shows`
- `/find-us`

Near Heathrow:
- `/near-heathrow`
- `/near-heathrow/terminal-2`
- `/near-heathrow/terminal-3`
- `/near-heathrow/terminal-4`
- `/near-heathrow/terminal-5`

Other:
- `/leave-review`

## All Pages Found in App Directory
1. `/` (page.tsx)
2. `/_api-diagnostics` ⚠️
3. `/api-status` ⚠️
4. `/api-test` ⚠️
5. `/ashford-pub`
6. `/bedfont-pub`
7. `/beer-garden`
8. `/blog`
9. `/blog/[slug]`
10. `/blog/tag/[tag]`
11. `/blog/tags`
12. `/book-event`
13. `/christmas-parties`
14. `/components` ⚠️
15. `/corporate-events`
16. `/demo-header` ⚠️
17. `/drinks`
18. `/drinks/managers-special`
19. `/egham-pub`
20. `/events/[id]`
21. `/feltham-pub`
22. `/find-us`
23. `/food-menu`
24. `/food/pizza`
25. `/function-room-hire`
26. `/heathrow-hotels-pub`
27. `/leave-review`
28. `/m25-junction-14-pub`
29. `/near-heathrow`
30. `/near-heathrow/terminal-2`
32. `/near-heathrow/terminal-3`
33. `/near-heathrow/terminal-4`
34. `/near-heathrow/terminal-5`
35. `/pizza-tuesday`
36. `/private-party-venue`
37. `/sitemap-page`
38. `/staines-pub`
39. `/stanwell-pub`
40. `/sunday-lunch`
41. `/test-reviews` ⚠️
42. `/whats-on`
43. `/whats-on/drag-shows`
44. `/windsor-pub`

## Orphaned Pages Analysis

### Pages NOT in Sitemap but ARE Linked
- `/christmas-parties` (linked in Footer and homepage)
- `/corporate-events` (linked in Footer and homepage)
- `/private-party-venue` (linked in Footer and homepage)
- `/function-room-hire` (linked in Footer)
- `/sitemap-page` (linked in Footer)
- `/leave-review` (linked in Footer)

### Completely Orphaned Pages (Not in sitemap, not linked anywhere)
1. `/ashford-pub`
2. `/bedfont-pub`
3. `/egham-pub`
4. `/feltham-pub`
5. `/heathrow-hotels-pub`
6. `/m25-junction-14-pub`
7. `/stanwell-pub`
8. `/windsor-pub`
9. `/pizza-tuesday`
10. `/drinks/managers-special`
11. `/events/[id]` (dynamic route)
12. `/blog/tags`

### Test/Debug Pages (Should NOT be indexed)
1. `/_api-diagnostics`
2. `/api-status`
3. `/api-test`
4. `/components`
5. `/demo-header`
6. `/test-reviews`

## Recommendations

### 1. Add to Sitemap
These pages are linked but missing from sitemap:
- `/christmas-parties`
- `/corporate-events`
- `/private-party-venue`
- `/function-room-hire`
- `/leave-review`
- `/sitemap-page`

### 2. Add Navigation Links
These location pages could be valuable for local SEO but are completely orphaned:
- `/ashford-pub`
- `/bedfont-pub`
- `/egham-pub`
- `/feltham-pub`
- `/heathrow-hotels-pub`
- `/m25-junction-14-pub`
- `/stanwell-pub`
- `/windsor-pub`

Consider creating a "Nearby Areas" section in the footer or a dedicated locations page.

### 3. Fix Missing Links
- Link to `/drinks/managers-special` from the drinks page
- Link to `/pizza-tuesday` from relevant pages (it seems redundant with `/food/pizza`)
- Add link to `/blog/tags` from the blog page

### 4. Exclude from Indexing
Add robots.txt or noindex meta tags to:
- `/_api-diagnostics`
- `/api-status`
- `/api-test`
- `/components`
- `/demo-header`
- `/test-reviews`

### 5. Review Dynamic Routes
- `/events/[id]` - Ensure this is properly handled in sitemap if events are public
- Consider if individual event pages should be indexed

### 6. Content Consolidation
- `/pizza-tuesday` vs `/food/pizza` - These might be duplicates, consider consolidating
- Location pages might benefit from a central "Locations We Serve" page that links to all area-specific pages