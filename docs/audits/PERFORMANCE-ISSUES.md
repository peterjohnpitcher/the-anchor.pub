# Performance Issues Documentation

## Overview

This document details performance-related issues found during the January 2025 audit of The Anchor website.

## Image Optimization Issues

### 1. Unoptimized Hero Images

**Current Issues**:
- Hero images: 2-4MB each
- No responsive images (`srcset`)
- No modern formats (WebP, AVIF)
- Missing blur placeholders
- No lazy loading

**Example Problems**:
```tsx
// Current - Unoptimized
<Image 
  src="/images/hero.jpg" 
  width={1920} 
  height={1080}
/>

// Optimized approach needed
<Image 
  src="/images/hero.jpg"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
  placeholder="blur"
  blurDataURL={blurData}
  priority={true}
/>
```

### 2. Gallery Performance

**Issues**:
- All images load immediately
- No virtualization
- No progressive enhancement
- Memory issues on mobile

**Required Implementation**:
- Intersection Observer for lazy loading
- Virtual scrolling for large galleries
- Thumbnail generation
- Progressive image loading

### 3. Missing Image Optimization

**Problems Found**:
- PNG files for photos (should be JPEG)
- Uncompressed images
- No CDN delivery
- Same image for all viewports

## Bundle Size Issues

### 1. No Code Splitting

**Current State**:
- Single large JavaScript bundle
- All routes included
- Unused components bundled
- Third-party libraries not split

**Impact**:
- First Load JS: 216KB (should be <100KB)
- Parse time on mobile: >1s
- Main thread blocked

### 2. Component Loading Strategy

**Issues**:
```tsx
// Current - Everything loads immediately
import { HeavyComponent } from './HeavyComponent'

// Should be - Lazy loaded
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

### 3. Third-Party Scripts

**Problems**:
- Analytics blocking render
- No facade for embedded content
- External fonts blocking text
- No resource hints

## Data Loading Issues

### 1. No Streaming or Suspense

**Current Implementation**:
- Wait for all data before render
- No incremental loading
- API waterfalls
- Blocking data fetches

### 2. Missing Caching Strategy

**Issues Found**:
- No browser caching headers
- No service worker
- API calls not cached
- Static data refetched

### 3. Inefficient API Calls

**Problems**:
- Multiple calls for related data
- No request deduplication
- Over-fetching data
- No pagination

## Core Web Vitals Issues

### 1. Largest Contentful Paint (LCP)

**Current**: >2.5s (Poor)  
**Target**: <2.5s (Good)  

**Causes**:
- Hero images not optimized
- Fonts blocking render
- No preload directives
- Server response slow

### 2. First Input Delay (FID)

**Current**: >100ms (Needs Improvement)  
**Target**: <100ms (Good)  

**Causes**:
- Large JavaScript execution
- Main thread blocked
- No input prioritization

### 3. Cumulative Layout Shift (CLS)

**Current**: >0.1 (Needs Improvement)  
**Target**: <0.1 (Good)  

**Causes**:
- Images without dimensions
- Dynamic content insertion
- Web fonts causing reflow
- Ads/embeds without space

## Rendering Performance

### 1. No Progressive Enhancement

**Issues**:
- JavaScript required for basic functionality
- No SSG for static content
- Client-side only features
- No fallbacks

### 2. Inefficient Re-renders

**Problems in React Components**:
```tsx
// Bad - Causes unnecessary re-renders
function Component() {
  const style = { color: 'red' } // New object every render
  return <div style={style} />
}

// Good - Memoized
const style = { color: 'red' }
function Component() {
  return <div style={style} />
}
```

### 3. Missing Memoization

**Components Needing Optimization**:
- Event lists
- Menu items
- Gallery images
- Complex calculations

## Network Performance

### 1. No Resource Hints

**Missing Optimizations**:
```html
<!-- Should add to head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
```

### 2. No HTTP/2 Push

**Opportunities**:
- Critical CSS
- Above-fold images
- Essential JavaScript

### 3. Missing Compression

**Issues**:
- No Brotli compression
- Images not optimized
- Text assets not minified
- No CDN caching

## Mobile Performance

### 1. JavaScript Execution

**Problems**:
- Too much JS for mobile CPUs
- No adaptive loading
- Polyfills for modern features
- Complex animations

### 2. Memory Usage

**Issues on Low-End Devices**:
- Image galleries crash
- Memory leaks in components
- No cleanup on unmount
- Infinite scroll issues

### 3. Battery Drain

**Causes**:
- Continuous animations
- Frequent API polling
- GPS usage
- Wake locks

## Recommendations

### Critical Performance Fixes

1. **Image Optimization**
   ```tsx
   // Implement responsive images
   <Image
     src={src}
     sizes="(max-width: 640px) 100vw, 
            (max-width: 1024px) 50vw, 
            33vw"
     quality={85}
     placeholder="blur"
   />
   ```

2. **Code Splitting**
   ```tsx
   // Route-based splitting
   const EventsPage = lazy(() => import('./pages/events'))
   
   // Component splitting
   const HeavyModal = dynamic(
     () => import('./HeavyModal'),
     { ssr: false }
   )
   ```

3. **Resource Hints**
   ```tsx
   // Add to Head
   <Head>
     <link rel="preconnect" href="https://fonts.gstatic.com" />
     <link rel="preload" href="/critical.css" as="style" />
   </Head>
   ```

### High Priority Optimizations

1. **Implement Caching**
   - Service worker for offline
   - Browser cache headers
   - API response caching
   - Static asset caching

2. **Optimize Bundle**
   - Tree shake unused code
   - Minify and compress
   - Split vendor chunks
   - Remove unused CSS

3. **Improve Data Loading**
   - Implement React Suspense
   - Use SWR or React Query
   - Parallel data fetching
   - Incremental loading

### Monitoring and Testing

1. **Set Up Monitoring**
   - Lighthouse CI
   - Web Vitals tracking
   - Real User Monitoring
   - Error tracking

2. **Performance Budget**
   - First Load JS: <100KB
   - LCP: <2.5s
   - FID: <100ms
   - CLS: <0.1

3. **Regular Audits**
   - Weekly Lighthouse runs
   - Monthly bundle analysis
   - Quarterly deep audit
   - User feedback loops

## Implementation Priority

1. **Week 1**: Image optimization and lazy loading
2. **Week 2**: Code splitting and bundle optimization
3. **Week 3**: Caching and data loading improvements
4. **Week 4**: Core Web Vitals optimization
5. **Ongoing**: Monitoring and incremental improvements