# Component Optimization Checklist

## 🔴 CRITICAL - Fix Immediately

### Remove Debug Code
- [ ] BusinessHours.tsx - Remove console.log (lines 44-45)
- [ ] CategoryFilter.tsx - Remove console.error
- [ ] Check all components for console statements

### Add Missing Schema Markup
- [ ] Footer.tsx - Add LocalBusiness schema
- [ ] BusinessHours.tsx - Add OpeningHoursSpecification
- [ ] MenuRenderer.tsx - Add Menu/MenuItem schema
- [ ] Navigation.tsx - Add SiteNavigationElement
- [ ] OptimizedImage.tsx - Add ImageObject schema
- [ ] SpecialOfferNotifications.tsx - Add Offer schema
- [ ] Weather.tsx - Add WeatherForecast schema

### Fix Accessibility Issues
- [ ] Navigation.tsx - Add skip navigation link
- [ ] CategoryFilter.tsx - Add keyboard navigation
- [ ] CallToAction.tsx - Fix yellow variant contrast
- [ ] FloatingActions.tsx - Add keyboard support
- [ ] All components - Add proper ARIA labels
- [ ] Dynamic content - Add ARIA-live regions

## 🟡 IMPORTANT - This Sprint

### Performance Optimizations
- [ ] Footer.tsx - Implement lazy loading
- [ ] MenuRenderer.tsx - Add intersection observer
- [ ] PageHeader.tsx - Optimize image loading
- [ ] EventBooking.tsx - Code split component
- [ ] Weather.tsx - Reduce update frequency
- [ ] All components - Remove emoji usage

### SEO Enhancements
- [ ] CallToAction.tsx - Add event tracking
- [ ] All pages - Implement breadcrumbs
- [ ] Footer.tsx - Add aggregate ratings
- [ ] Images - Remove generic alt text
- [ ] All schemas - Add validation

### UX Improvements
- [ ] Loading states - Add progress indicators
- [ ] API calls - Add retry mechanisms
- [ ] FAQs - Add "Was this helpful?"
- [ ] Menus - Add search functionality
- [ ] Mobile - Add haptic feedback

## 🟢 FUTURE - Next Quarter

### Advanced Features
- [ ] A/B testing infrastructure
- [ ] Advanced analytics
- [ ] Print stylesheets
- [ ] Email templates
- [ ] i18n support

## Testing Checklist

### Before Each PR
- [ ] Run Lighthouse (score >90)
- [ ] Test keyboard navigation
- [ ] Validate schema markup
- [ ] Check mobile responsiveness
- [ ] Verify no console logs

### Weekly
- [ ] Full accessibility audit
- [ ] Performance monitoring
- [ ] Cross-browser testing
- [ ] Real device testing
- [ ] Analytics review

## Quick Wins (< 1 hour each)

1. Remove all console.log statements
2. Add skip navigation link
3. Fix color contrast issues
4. Add basic ARIA labels
5. Implement simple lazy loading

## Component Templates

### Schema-Enabled Component
```typescript
const ComponentWithSchema = ({ data }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Thing",
    // ... schema properties
  };

  return (
    <>
      <Script
        id="component-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Component JSX */}
    </>
  );
};
```

### Accessible Interactive Component
```typescript
<button
  aria-label="Clear description"
  aria-pressed={isActive}
  aria-describedby="help-text"
  onKeyDown={handleKeyboard}
>
  {children}
</button>
```

### Performance-Optimized Component
```typescript
const LazyComponent = dynamic(
  () => import('./HeavyComponent'),
  { 
    loading: () => <LoadingState />,
    ssr: false 
  }
);
```