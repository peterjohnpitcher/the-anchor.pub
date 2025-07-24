# Accessibility Issues Documentation

## Overview

This document comprehensively details all accessibility issues found during the January 2025 audit of The Anchor website, organized by WCAG 2.1 guidelines.

## Critical WCAG Violations

### Level A Violations (Must Fix)

#### 1. Missing Skip Navigation Links
**WCAG Criterion**: 2.4.1 Bypass Blocks  
**Severity**: Critical  
**Affected**: All pages  

Users cannot skip repetitive content, forcing screen reader users to navigate through the entire header on every page.

**Required Fix**:
```tsx
// Add to Layout component
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
<main id="main-content">
  {children}
</main>
```

#### 2. Images Missing Alt Text
**WCAG Criterion**: 1.1.1 Non-text Content  
**Severity**: Critical  
**Found in**: Multiple pages  

**Examples of Issues**:
```tsx
// Bad - No alt text
<Image src="/hero.jpg" />

// Bad - Generic alt text
<Image src="/food.jpg" alt="Image" />

// Good - Descriptive alt text
<Image src="/food.jpg" alt="Traditional British fish and chips served with mushy peas" />
```

#### 3. Form Inputs Without Labels
**WCAG Criterion**: 3.3.2 Labels or Instructions  
**Severity**: Critical  
**Found in**: Search forms, contact forms  

**Issues**:
- Placeholder text used instead of labels
- Labels not associated with inputs
- Required fields not indicated

#### 4. Heading Hierarchy Violations
**WCAG Criterion**: 1.3.1 Info and Relationships  
**Severity**: High  
**Found in**: Most pages  

**Common Issues**:
```tsx
// Bad - Skipping heading levels
<h1>Page Title</h1>
<h3>Subsection</h3>  // Should be h2

// Bad - Multiple h1 tags
<h1>Main Title</h1>
<h1>Another Title</h1>  // Should be h2
```

#### 5. Keyboard Navigation Issues
**WCAG Criterion**: 2.1.1 Keyboard  
**Severity**: Critical  
**Found in**: Interactive components  

**Problems**:
- Click handlers on divs without keyboard support
- Custom dropdowns not keyboard accessible
- Modal dialogs trap focus incorrectly
- Tab order illogical in some sections

### Level AA Violations (Should Fix)

#### 1. Color Contrast Issues
**WCAG Criterion**: 1.4.3 Contrast (Minimum)  
**Severity**: High  
**Found in**: Various components  

**Specific Issues**:
- Anchor gold (#D4A574) on white: 2.89:1 (needs 4.5:1)
- Light gray text (#9CA3AF) on white: 2.82:1
- White text on anchor-green needs verification

**Tools to Test**: WebAIM Contrast Checker

#### 2. Focus Indicators
**WCAG Criterion**: 2.4.7 Focus Visible  
**Severity**: Medium  
**Found in**: Custom components  

**Issues**:
- Focus indicators removed with `outline-none`
- Custom focus styles insufficient contrast
- Some interactive elements have no focus indicator

#### 3. Touch Target Size
**WCAG Criterion**: 2.5.5 Target Size  
**Severity**: Medium  
**Found in**: Mobile layouts  

**Problems**:
- Buttons smaller than 44x44 pixels
- Links too close together (< 8px spacing)
- Navigation items too small on mobile

## Component-Specific Issues

### Navigation Component
```tsx
// Current - Inaccessible
<nav className="flex gap-4">
  <div onClick={() => navigate('/menu')}>Menu</div>
</nav>

// Fixed - Accessible
<nav aria-label="Main navigation">
  <ul className="flex gap-4">
    <li>
      <a href="/menu" className="focus:outline-2 focus:outline-anchor-gold">
        Menu
      </a>
    </li>
  </ul>
</nav>
```

### Modal/Dialog Issues
- No focus trap implementation
- Close button not labeled
- Background not marked inert
- Escape key doesn't close

### Cards and Interactive Elements
```tsx
// Current - Not keyboard accessible
<div onClick={handleClick} className="card">
  <h3>Event Title</h3>
  <p>Description</p>
</div>

// Fixed - Fully accessible
<article className="card">
  <h3 id="event-title">Event Title</h3>
  <p>Description</p>
  <button 
    onClick={handleClick}
    aria-labelledby="event-title"
    className="focus:ring-2"
  >
    View Event Details
  </button>
</article>
```

## ARIA Implementation Issues

### 1. Missing Landmarks
**Required Landmarks**:
- `<header role="banner">`
- `<nav role="navigation">`
- `<main role="main">`
- `<footer role="contentinfo">`

### 2. Live Regions
No aria-live regions for dynamic content updates:
```tsx
// Add for status messages
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Add for errors
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### 3. Descriptive Labels
```tsx
// Bad - Generic label
<button aria-label="Click here">

// Good - Descriptive label
<button aria-label="View Sunday lunch menu">
```

## Screen Reader Issues

### 1. Decorative Images
SVG icons not hidden from screen readers:
```tsx
// Current
<svg className="icon">...</svg>

// Fixed
<svg className="icon" aria-hidden="true">...</svg>
```

### 2. Icon-Only Buttons
```tsx
// Current - No context
<button>
  <svg>...</svg>
</button>

// Fixed - Screen reader friendly
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>
```

### 3. Dynamic Content
Content updates not announced:
- Loading states silent
- Error messages not announced
- Success feedback missed

## Mobile Accessibility

### Touch Targets
Minimum requirements not met:
- Should be: 44x44 pixels minimum
- Found: Some buttons 32x32 pixels
- Link spacing: Often < 8 pixels

### Zoom and Scaling
- Some layouts break at 200% zoom
- Horizontal scrolling at high zoom levels
- Text not reflowing properly

## Testing Checklist

### Manual Testing Required
1. ✓ Navigate entire site with keyboard only
2. ✓ Test with screen reader (NVDA/JAWS/VoiceOver)
3. ✓ Check color contrast ratios
4. ✓ Test at 200% zoom
5. ✓ Verify focus order is logical
6. ✓ Check all interactive elements are reachable

### Automated Testing Tools
- axe DevTools
- WAVE (WebAIM)
- Lighthouse (Chrome DevTools)
- Pa11y CLI tool

## Priority Fixes

### Immediate (Legal Compliance)
1. Add skip navigation links
2. Fix all missing alt texts
3. Ensure keyboard navigation works
4. Add proper form labels
5. Fix heading hierarchy

### High Priority (User Impact)
1. Fix color contrast issues
2. Add focus indicators
3. Implement ARIA landmarks
4. Fix touch target sizes
5. Add live regions for updates

### Medium Priority (Enhancement)
1. Improve screen reader experience
2. Add ARIA descriptions
3. Enhance keyboard shortcuts
4. Improve error messaging
5. Add loading announcements

## Implementation Guidelines

### Component Template
```tsx
// Accessible Component Template
export function AccessibleComponent({ 
  title, 
  description, 
  onAction,
  id 
}: Props) {
  return (
    <article 
      className="card"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      <h2 id={`${id}-title`}>{title}</h2>
      <p id={`${id}-desc`}>{description}</p>
      <button
        onClick={onAction}
        className="min-h-[44px] min-w-[44px] focus:ring-2"
        aria-label={`Learn more about ${title}`}
      >
        Learn More
      </button>
    </article>
  )
}
```

### CSS Utilities
```css
/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible utilities */
.focus-visible:focus {
  outline: 2px solid #D4A574;
  outline-offset: 2px;
}
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)