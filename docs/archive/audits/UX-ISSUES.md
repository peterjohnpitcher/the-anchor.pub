# UX Issues Documentation

## Overview

This document details all user experience issues found during the January 2025 audit of The Anchor website.

## Mobile Experience Issues

### 1. Touch Target Size Problems

**Severity**: High  
**Standard**: 44x44 pixels minimum (Apple/Google guidelines)  

**Current Issues**:
- Navigation links: 32px height
- Some buttons: 36px height
- Close buttons: 24x24px
- Social media icons: 30x30px

**Affected Components**:
```tsx
// Bad - Too small
<button className="px-2 py-1 text-sm">Click</button>

// Good - Proper touch target
<button className="min-h-[44px] min-w-[44px] px-4 py-3">Click</button>
```

### 2. Text Readability on Mobile

**Issues Found**:
- Body text: 14px (should be 16px minimum)
- Button text: 12px on small buttons
- Line height too tight on mobile
- Long lines of text (> 75 characters)

### 3. Responsive Layout Problems

**Horizontal Scrolling Issues**:
- Info boxes overflow on screens < 375px
- Tables not responsive
- Wide images cause overflow
- Fixed-width elements

**Example Problems**:
```tsx
// Bad - Fixed width
<div className="w-[400px]">Content</div>

// Good - Responsive
<div className="w-full max-w-[400px]">Content</div>
```

## Loading States and Feedback

### 1. No Loading Indicators

**Affected Areas**:
- Event data loading
- Menu loading
- Blog post loading
- Search operations
- Form submissions

**Required Implementation**:
```tsx
// Skeleton loader component needed
function EventSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  )
}
```

### 2. Poor Error Handling

**Current Issues**:
- Generic "Something went wrong" messages
- No retry options
- Errors not user-friendly
- No offline handling

**Better Error Pattern**:
```tsx
function ErrorDisplay({ error, retry }) {
  return (
    <div role="alert" className="p-4 bg-red-50 rounded">
      <h3>Unable to load events</h3>
      <p>Check your connection and try again.</p>
      <button onClick={retry}>Retry</button>
    </div>
  )
}
```

### 3. Missing Success Feedback

**Problems**:
- Form submissions silent
- Booking confirmations unclear
- No progress indicators
- Actions feel unresponsive

## Navigation Issues

### 1. Missing Breadcrumbs

**Affected Pages**:
- Event detail pages
- Blog post pages
- Location-specific pages
- Deep menu sections

**Implementation Needed**:
```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex gap-2">
    <li><a href="/">Home</a> /</li>
    <li><a href="/events">Events</a> /</li>
    <li aria-current="page">Quiz Night</li>
  </ol>
</nav>
```

### 2. No Back Navigation

**Issues**:
- Detail pages lack back buttons
- No escape from deep navigation
- Browser back button only option

### 3. Long Page Navigation

**Missing Features**:
- No scroll-to-top button
- No sticky navigation on long pages
- No section anchors in menu pages
- No progress indicator

## Form and Input Issues

### 1. No Inline Validation

**Current State**:
- Errors only shown on submit
- No real-time feedback
- Required fields not clearly marked
- Success states not indicated

### 2. Poor Mobile Form Experience

**Problems**:
- Input types not optimized (no tel, email types)
- No autocomplete attributes
- Labels too small
- Error messages cut off

**Better Implementation**:
```tsx
<input
  type="tel"
  inputMode="numeric"
  autoComplete="tel"
  pattern="[0-9]{11}"
  className="text-base min-h-[44px]"
/>
```

## Content Organization

### 1. Information Overload

**Issues on**:
- Menu pages (too many items visible)
- Event listings (no filtering)
- FAQ sections (no search)
- Location pages (wall of text)

### 2. No Progressive Disclosure

**Problems**:
- All content shown immediately
- No collapsed sections
- No "Read more" functionality
- Cognitive overload on mobile

### 3. Poor Content Hierarchy

**Visual Issues**:
- Inconsistent spacing
- Unclear information grouping
- Important info buried
- No visual anchors

## Performance Perception

### 1. No Optimistic UI

**Current Behavior**:
- Wait for server response
- UI freezes during actions
- No immediate feedback

### 2. Janky Animations

**Issues**:
- No CSS transitions
- Abrupt state changes
- No micro-interactions
- Feels unpolished

### 3. Image Loading

**Problems**:
- No progressive loading
- Large images block render
- No blur-up effect
- Layout shift on load

## Specific Page Issues

### Homepage
- Hero too tall on mobile (requires scroll)
- CTAs below fold
- No clear value proposition
- Information architecture unclear

### Event Pages
- Can't filter by type
- No calendar view
- Dates hard to scan
- No "Add to Calendar" feature

### Menu Pages
- No search functionality
- No dietary filters
- Prices not prominent
- No item images

### Booking Pages
- Multi-step process unclear
- No progress indicator
- Form too long
- No save and continue

## Recommendations

### Critical Fixes

1. **Touch Targets**
   ```css
   .touch-target {
     min-height: 44px;
     min-width: 44px;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   ```

2. **Loading States**
   - Implement skeleton loaders
   - Add spinner component
   - Show progress indicators

3. **Error Handling**
   - Create error boundary component
   - User-friendly error messages
   - Always provide retry option

### High Priority

1. **Mobile Typography**
   ```css
   body {
     font-size: 16px;
     line-height: 1.5;
   }
   ```

2. **Responsive Fixes**
   - Audit all fixed widths
   - Implement responsive tables
   - Test at 320px width

3. **Navigation Improvements**
   - Add breadcrumbs component
   - Implement scroll-to-top
   - Add back buttons

### Medium Priority

1. **Form Enhancement**
   - Add inline validation
   - Optimize input types
   - Improve error display

2. **Content Organization**
   - Implement accordions
   - Add filtering options
   - Improve visual hierarchy

3. **Performance Feel**
   - Add transitions
   - Implement optimistic UI
   - Progressive image loading

## Testing Checklist

### Device Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] Pixel 5 (393px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)

### Interaction Testing
- [ ] One-handed mobile use
- [ ] Slow 3G connection
- [ ] Offline mode
- [ ] Screen rotation
- [ ] Zoom to 200%

### User Journey Testing
- [ ] Find and book table
- [ ] View event and get tickets
- [ ] Browse menu and dietary info
- [ ] Get directions to pub
- [ ] Contact for private event

## Success Metrics

- Touch target compliance: 100%
- Mobile font size: ≥16px
- Page load perception: <3s
- Error recovery rate: >90%
- Task completion rate: >85%