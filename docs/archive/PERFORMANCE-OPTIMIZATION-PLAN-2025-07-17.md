# Performance Optimization Implementation Plan

## Executive Summary

Current performance score is 72/100 with an 8.2s LCP. This plan outlines a comprehensive approach to achieve 90+/100 score with sub-2.5s LCP through image optimization, critical CSS extraction, edge deployment optimization, and modern JavaScript delivery.

## Phase 1: Critical Image Optimization (Week 1)
**Goal**: Reduce LCP from 8.2s to under 2.5s

### 1.1 Hero Image Optimization
```javascript
// Current: 1.6MB homepage hero image
// Target: <200KB with responsive variants

// Implementation:
- Generate responsive image variants:
  - Mobile: 640x360 @ 75 quality (WebP/AVIF)
  - Tablet: 1024x576 @ 80 quality (WebP/AVIF)
  - Desktop: 1920x1080 @ 82 quality (WebP/AVIF)
  
- Update hero component:
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  priority={true}
  placeholder="blur"
  blurDataURL={optimizedBlurData}
```

### 1.2 Implement Sharp-based Image Pipeline
```javascript
// next.config.js updates:
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  minimumCacheTTL: 31536000,
}
```

### 1.3 Add Image Preprocessing Script
```javascript
// scripts/optimize-images.js
// Automatically optimize all images in public/images
// Generate blur placeholders
// Create responsive variants
// Convert to WebP/AVIF
```

## Phase 2: Critical CSS Extraction (Week 1)
**Goal**: Eliminate 790ms render-blocking delay

### 2.1 Implement Critters/Beasties
```javascript
// Install and configure critical CSS extraction
npm install --save-dev critters

// next.config.js:
experimental: {
  optimizeCss: true // Only for pages router
}
```

### 2.2 Manual Critical CSS for App Router
```javascript
// app/critical-css.tsx
export async function generateCriticalCSS() {
  // Extract above-fold CSS
  // Inline in <head>
  // Defer non-critical CSS
}
```

### 2.3 Optimize CSS Loading Strategy
```javascript
// Preload critical fonts
<link rel="preload" href="/fonts/outfit.woff2" as="font" type="font/woff2" crossorigin />

// Load non-critical CSS asynchronously
<link rel="preload" href="/css/non-critical.css" as="style" />
<link rel="stylesheet" href="/css/non-critical.css" media="print" onload="this.media='all'" />
```

## Phase 3: Modern JavaScript Delivery (Week 2)
**Goal**: Eliminate 12KB legacy polyfills + reduce 105KB unused JS

### 3.1 Configure Modern Output
```javascript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020", // Update from ES5
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

### 3.2 Update Browserslist
```
# .browserslistrc
defaults and supports es6-module
not dead
not op_mini all
```

### 3.3 Implement Code Splitting
```javascript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

## Phase 4: Edge Deployment Optimization (Week 2)
**Goal**: Reduce server response time from 669ms to <200ms

### 4.1 Enable Vercel Edge Functions
```javascript
// app/layout.tsx
export const runtime = 'edge' // Where appropriate

// Implement edge middleware for caching
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### 4.2 Configure ISR with Edge Caching
```javascript
// For dynamic pages
export const revalidate = 3600 // 1 hour
export const dynamicParams = true
```

### 4.3 Implement Stale-While-Revalidate
```javascript
// next.config.js
module.exports = {
  experimental: {
    swrDelta: 31536000 // 1 year
  }
}
```

## Phase 5: Advanced Optimizations (Week 3)

### 5.1 Implement Partial Prerendering (PPR)
```javascript
// For dynamic content with static shell
export const experimental_ppr = true
```

### 5.2 Resource Hints
```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://openweathermap.org" />

<!-- Preconnect for critical origins -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

### 5.3 Service Worker for Offline Support
```javascript
// Implement workbox for caching strategies
// Cache static assets aggressively
// Network-first for API calls
```

## Phase 6: Monitoring & Continuous Optimization

### 6.1 Set Up Real User Monitoring
- Vercel Analytics
- Custom Web Vitals tracking
- Error boundary monitoring

### 6.2 Automated Performance Testing
- Lighthouse CI in GitHub Actions
- Performance budgets
- Alerts for regression

## Expected Results

### Performance Improvements
- **LCP**: 8.2s → 1.5s (82% improvement)
- **FCP**: 1.2s → 0.8s (33% improvement)
- **Speed Index**: 3.7s → 1.8s (51% improvement)
- **Overall Score**: 72 → 95+ (32% improvement)

### Business Impact
- **Bounce Rate**: -25% (from faster load times)
- **Conversion Rate**: +15% (from better UX)
- **SEO Rankings**: Improved (Core Web Vitals boost)

## Implementation Timeline

**Week 1**: Image optimization + Critical CSS
**Week 2**: Modern JS + Edge deployment
**Week 3**: Advanced optimizations + monitoring
**Week 4**: Testing, refinement, and documentation

## Risk Mitigation

1. **Gradual Rollout**: Test on staging first
2. **Feature Flags**: Roll out optimizations incrementally
3. **Rollback Plan**: Keep previous configs accessible
4. **A/B Testing**: Validate improvements with real users

## Required Resources

- Developer time: 3 weeks
- Vercel Pro plan for advanced features
- Image optimization tools/services
- Monitoring tools setup

## Success Criteria

1. PageSpeed score ≥ 90/100
2. LCP < 2.5s on mobile
3. No regression in other metrics
4. Positive user feedback
5. Improved business metrics