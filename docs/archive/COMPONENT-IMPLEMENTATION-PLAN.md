# Standardized Component Implementation Plan

## Overview
This document outlines the phased implementation of standardized components across The Anchor website to improve consistency and maintainability.

## Components to Implement
1. **CTASection** - Call-to-action sections
2. **SectionHeader** - Section introductions
3. **FeatureCard/Grid** - Feature displays
4. **InfoBox/Grid** - Information boxes
5. **AlertBox** - Alerts and notices
6. **AmenityList** - Feature/amenity lists
7. **QuickInfoGrid** - Compact info displays
8. **DirectionsCard/Grid** - Direction displays
9. **BusinessHoursSection** - Hours display wrapper

## Implementation Phases

### Phase 1: High-Traffic Pages (Priority: HIGH)
**Pages to update:**
- `/app/page.tsx` (Homepage)
- `/app/food-menu/page.tsx`
- `/app/whats-on/page.tsx`
- `/app/near-heathrow/page.tsx`
- `/app/beer-garden/page.tsx`

**Components to implement:**
- CTASection (all pages)
- SectionHeader (all pages)
- FeatureCard/Grid (homepage, food-menu)
- QuickInfoGrid (homepage)

### Phase 2: Location Pages (Priority: HIGH)
**Pages to update:**
- `/app/stanwell-pub/page.tsx`
- `/app/ashford-pub/page.tsx`
- `/app/windsor-pub/page.tsx`
- `/app/heathrow-hotels-pub/page.tsx`
- `/app/m25-junction-14-pub/page.tsx`

**Components to implement:**
- CTASection (all pages)
- SectionHeader (all pages)
- InfoBox/Grid (all pages)
- DirectionsCard/Grid (all pages)
- AlertBox (where applicable)

### Phase 3: Service Pages (Priority: MEDIUM)
**Pages to update:**
- `/app/pizza-tuesday/page.tsx`
- `/app/drinks/page.tsx`
- `/app/book-event/page.tsx`
- `/app/find-us/page.tsx`

**Components to implement:**
- CTASection (all pages)
- SectionHeader (all pages)
- InfoBox/Grid (pizza-tuesday, book-event)
- AmenityList (book-event, find-us)
- AlertBox (pizza-tuesday)

### Phase 4: Terminal Pages & Others (Priority: MEDIUM)
**Pages to update:**
- `/app/near-heathrow/terminal-2/page.tsx`
- `/app/near-heathrow/terminal-3/page.tsx`
- `/app/near-heathrow/terminal-4/page.tsx`
- `/app/near-heathrow/terminal-5/page.tsx`

**Components to implement:**
- CTASection (all pages)
- SectionHeader (all pages)
- QuickInfoGrid (all pages)
- DirectionsCard (all pages)

### Phase 5: Additional Location Pages (Priority: LOW)
**Pages to update:**
- `/app/staines-pub/page.tsx`
- `/app/egham-pub/page.tsx`
- `/app/feltham-pub/page.tsx`
- `/app/bedfont-pub/page.tsx`

**Components to implement:**
- CTASection (all pages)
- SectionHeader (all pages)
- Remaining components as needed

## Implementation Details by Component

### CTASection Replacements
**Pattern to replace:**
```tsx
<section className="section-spacing bg-anchor-green text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      {title}
    </h2>
    <p className="text-xl mb-8 text-white/90">
      {description}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      {buttons}
    </div>
  </div>
</section>
```

### SectionHeader Replacements
**Pattern to replace:**
```tsx
<div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
    {title}
  </h2>
  <p className="text-xl text-gray-700 max-w-3xl mx-auto">
    {subtitle}
  </p>
</div>
```

### FeatureCard/Grid Replacements
**Pattern to replace:**
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <div className="bg-white/bg-cream rounded-xl p-6">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
</div>
```

### InfoBox Replacements
**Pattern to replace:**
```tsx
<div className="bg-amber-50 rounded-xl p-6">
  <h3 className="text-xl font-bold text-amber-800 mb-4">{title}</h3>
  <p className="mb-3">{content}</p>
  <p className="text-sm text-amber-700">{footnote}</p>
</div>
```

### DirectionsCard Replacements
**Pattern to replace:**
```tsx
<div className="bg-white rounded-xl p-6">
  <h3 className="text-xl font-bold mb-4">🚗 From {location}</h3>
  <ol className="space-y-3">
    {steps}
  </ol>
  <p className="mt-4 text-sm text-gray-600">
    <strong>Journey time:</strong> {time}
  </p>
</div>
```

## Success Metrics
- Reduced code duplication by ~40%
- Consistent styling across all pages
- Easier maintenance and updates
- Improved development speed for new pages
- Better mobile responsiveness

## Testing Checklist for Each Page
- [ ] Visual regression testing
- [ ] Mobile responsiveness
- [ ] Component prop validation
- [ ] Accessibility compliance
- [ ] Performance metrics (bundle size)

## Notes
- Keep original styling intent while standardizing
- Document any custom variations needed
- Update component library if patterns emerge
- Consider creating Storybook stories for components