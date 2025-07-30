# Performance Audit Report - The Anchor Pub Website

## Executive Summary

This comprehensive performance audit examined The Anchor pub website with a focus on Core Web Vitals, page speed, technical performance, and mobile optimization. The audit reveals a well-optimized site with several strengths and specific areas for improvement.

## 1. Core Web Vitals Analysis

### Strengths Found:
- **Optimized Image Delivery**: Next.js Image component properly configured with:
  - Multiple formats (AVIF, WebP, JPEG fallbacks)
  - Responsive sizing with proper `sizes` attributes
  - Blur placeholders for above-fold images
  - Priority loading for critical images
  
- **Layout Stability**: 
  - Fixed heights for navigation and hero sections
  - Proper aspect ratios defined for images
  - Skeleton loaders implemented for dynamic content

### Areas for Improvement:

#### Largest Contentful Paint (LCP)
**Current Issues:**
- Hero images on critical pages are large (Page Headers - Homepage.jpg)
- No responsive image optimization for hero sections on some pages
- Logo image loads separately from hero background

**Solutions:**
```javascript
// Implement optimized hero images with srcset
<OptimizedHeroSection
  image={{
    optimized: {
      mobile: "/images/hero/mobile-480w",
      tablet: "/images/hero/tablet-768w", 
      desktop: "/images/hero/desktop-1920w"
    }
  }}
/>
```

#### First Input Delay (FID)
**Current Issues:**
- Multiple event listeners attached on load
- Heavy JavaScript bundles on some pages (drag-shows page: 812 lines)

**Solutions:**
- Implement passive event listeners
- Use React.lazy() for non-critical components
- Defer non-essential JavaScript

#### Cumulative Layout Shift (CLS)
**Current Issues:**
- Dynamic content loading without reserved space (NextEventServer)
- Font loading causing text shifts

**Solutions:**
- Add explicit dimensions to dynamic content containers
- Implement font-display: swap with fallback metrics

## 2. Page Speed Issues

### JavaScript Bundle Analysis

**Large Page Files Found:**
- `/app/whats-on/drag-shows/page.tsx` - 812 lines
- `/app/book-event/page.tsx` - 674 lines
- `/app/corporate-events/page.tsx` - 629 lines

**Optimization Strategies:**

1. **Code Splitting Improvements**
```javascript
// Current good practice found:
const BusinessHours = dynamic(() => 
  import('@/components/BusinessHours').then(mod => ({ 
    default: mod.BusinessHours 
  })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
})
```

2. **Bundle Optimization in next.config.js**
- Good: Separate chunks for vendor, UI, features, and hero components
- Missing: No chunk for tracking/analytics code
- Missing: No separate chunk for form components

### Image Optimization

**Current Implementation:**
- Next.js Image component with proper configuration
- AVIF and WebP formats enabled
- Minimum cache TTL set to 1 year
- Device-specific sizing configured

**Issues Found:**
1. **Hero Images**: Not using optimized variants
2. **Gallery Images**: Loading all at once instead of lazy loading
3. **Mobile-specific images**: MobileOptimizedImage component adds client-side logic overhead

**Recommendations:**
```javascript
// Use picture element for art direction
<picture>
  <source media="(max-width: 640px)" srcSet="/hero-mobile.webp" />
  <source media="(max-width: 1024px)" srcSet="/hero-tablet.webp" />
  <img src="/hero-desktop.webp" alt="Hero" />
</picture>
```

### Third-Party Scripts Impact

**Google Tag Manager:**
- Loading strategy: `afterInteractive` (Good)
- Issue: No facade for initial load
- Impact: ~50KB additional JavaScript

**Recommendations:**
1. Implement Partytown for GTM off-main-thread execution
2. Delay GTM initialization until user interaction
3. Use Google Tag Manager Server-Side for critical events

## 3. Technical Performance

### Next.js Configuration Analysis

**Strengths:**
- SWC minification enabled
- Production source maps disabled
- Compression enabled
- Proper cache headers configured

**Improvements Needed:**

1. **Enable Experimental Features:**
```javascript
experimental: {
  optimizeCss: true, // Currently disabled
  optimizePackageImports: ['lucide-react', 'clsx'],
  turbo: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}
```

2. **Missing Resource Hints:**
```html
<!-- Add to layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preload" as="font" href="/fonts/outfit-400.woff2" crossorigin />
```

### Critical CSS Delivery

**Current Implementation:**
- Inline critical CSS in layout.tsx (Good)
- Tailwind CSS with proper purging

**Issues:**
- Critical CSS could be more comprehensive
- No automatic critical CSS extraction

**Solution:**
```javascript
// Use critters or critical for automatic extraction
const Critters = require('critters');
const critters = new Critters({
  preload: 'swap',
  pruneSource: true,
});
```

### Caching Strategies

**Current Implementation:**
- Static headers for assets (1 year cache)
- API routes with proper cache headers
- Static generation for blog pages

**Missing:**
- No ISR (Incremental Static Regeneration) for dynamic content
- No stale-while-revalidate for API routes
- No edge caching configuration

**Recommendations:**
```javascript
// Add ISR to dynamic pages
export const revalidate = 3600 // Revalidate every hour

// Add SWR headers to API routes
headers: {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400'
}
```

## 4. Mobile Performance

### Mobile-Specific Issues Found:

1. **Touch Target Sizes**
   - Some buttons below 48x48px minimum
   - Navigation links too close together

2. **Mobile Image Quality**
   - MobileOptimizedImage uses client-side detection (causes hydration issues)
   - Quality set too low (65) for mobile devices

3. **Viewport Performance**
   - Large hero sections on mobile (70vh minimum)
   - Horizontal scrolling on some components

### Recommended Solutions:

```css
/* Ensure proper touch targets */
.button, .link {
  min-height: 48px;
  min-width: 48px;
  @apply p-3; /* Increase padding */
}

/* Optimize hero heights for mobile */
.hero {
  min-height: 50vh; /* Instead of 70vh */
}
```

## 5. Page-Specific Analysis

### Homepage Performance
**Strengths:**
- Optimized hero section with blur placeholder
- Lazy loading for non-critical sections
- Proper use of Suspense for NextEventServer

**Issues:**
- Too many components loaded immediately
- Review carousel loads all reviews at once

**Solutions:**
1. Implement intersection observer for section loading
2. Paginate reviews or implement virtual scrolling
3. Defer loading of event sections below fold

### Food Menu Page
**Strengths:**
- Good use of static content
- Proper heading hierarchy

**Issues:**
- Large menu data loaded at once
- No progressive enhancement for menu sections

**Solutions:**
1. Implement collapsible menu sections
2. Load menu categories on demand
3. Add search/filter functionality with debouncing

### Heathrow Page
**Strengths:**
- Relevant content prioritized
- Good information architecture

**Issues:**
- Multiple similar image requests
- Directions cards could be optimized

**Solutions:**
1. Combine similar images into sprites
2. Use CSS for direction indicators instead of images

## 6. Critical Performance Bottlenecks

### 1. **Bundle Size** (HIGH PRIORITY)
- Main JS bundle includes all components
- No tree shaking for unused exports
- Large page components (800+ lines)

### 2. **Image Loading** (HIGH PRIORITY)
- Hero images not optimized for different viewports
- Gallery loads all images immediately
- No progressive image loading

### 3. **Third-Party Scripts** (MEDIUM PRIORITY)
- GTM blocks main thread
- Weather API calls on every page
- No facade for external widgets

### 4. **Font Loading** (MEDIUM PRIORITY)
- Two font families loading (Outfit + Merriweather)
- No font subsetting
- Missing font-display: optional for non-critical fonts

### 5. **API Calls** (LOW PRIORITY)
- Business hours API called on multiple components
- No request deduplication
- Missing edge caching

## 7. Immediate Action Items

1. **Optimize Hero Images** (1-2 days)
   - Create responsive image sets
   - Implement picture element
   - Add proper preloading

2. **Implement Code Splitting** (2-3 days)
   - Split tracking code into separate chunk
   - Lazy load below-fold components
   - Create route-based code splitting

3. **Optimize Mobile Performance** (1-2 days)
   - Fix touch target sizes
   - Implement proper mobile images
   - Reduce mobile bundle size

4. **Improve Caching** (1 day)
   - Add ISR to appropriate pages
   - Implement SWR headers
   - Configure edge caching

5. **Defer Non-Critical JavaScript** (1 day)
   - Move GTM to web worker
   - Lazy load animation libraries
   - Defer social media widgets

## 8. Long-Term Optimizations

1. **Implement Service Worker**
   - Cache static assets
   - Offline functionality
   - Background sync for forms

2. **Migrate to App Router Fully**
   - Use React Server Components
   - Streaming SSR
   - Parallel data fetching

3. **Implement Edge Functions**
   - Move business logic to edge
   - Reduce API latency
   - Geographic optimization

4. **Advanced Image Optimization**
   - Implement AVIF for all images
   - Use Cloudinary or similar CDN
   - Automatic format selection

## Conclusion

The Anchor pub website demonstrates good foundational performance practices with Next.js optimization, proper image handling, and component structure. However, there are significant opportunities for improvement in bundle sizes, mobile optimization, and Core Web Vitals metrics.

Implementing the immediate action items should result in:
- 20-30% improvement in LCP
- 15-25% reduction in JavaScript bundle size
- Better mobile user experience
- Improved search engine rankings

The recommended optimizations align with the business goals of attracting Heathrow travelers and event bookings by ensuring fast, reliable page loads on all devices.