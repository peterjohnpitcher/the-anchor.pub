# Navigation Breakpoint Analysis & Recommendations

## Current Issues Identified

### 1. **Overlapping Content at Medium Breakpoints (768px - 1024px)**
The navigation has too many items ("What's On", "Food", "Drinks", "Events", "Blog", "Find Us", "Near Heathrow" + CTA button) which causes:
- Items to wrap or overlap between 768px-1024px
- Status bar and weather components competing for space
- CTA button getting squished

### 2. **Complex Breakpoint Logic**
Line 256 has confusing conditional logic:
```tsx
className={cn('hidden items-centre space-x-8', 
  breakpointClass === 'md:hidden' ? 'md:flex' : 
  breakpointClass === 'lg:hidden' ? 'lg:flex' : 'sm:flex'
)}
```

### 3. **Status Bar Visibility Issues**
- Desktop: Shows at `lg:flex` (1024px+)
- Mobile: Shows next to logo, but gets cramped
- No tablet-specific handling

## Recommended Solutions

### Option 1: **Simplified Navigation (Recommended)**
Reduce navigation items for better breakpoint handling:

```tsx
// Group related items under dropdowns
const navigationItems = [
  { label: "Food & Drinks", href: '/food-menu' }, // Combines Food + Drinks
  { label: "What's On", href: '/whats-on' },      // Combines Events + What's On
  { label: 'Find Us', href: '/find-us' },         // Combines Find Us + Near Heathrow
  { label: 'Blog', href: '/blog' },
]
```

### Option 2: **Improved Breakpoint Strategy**

```tsx
// Better breakpoint definitions
const BREAKPOINTS = {
  mobile: 'max-w-768px',    // Up to 768px
  tablet: '769px-1024px',   // 769px to 1024px  
  desktop: 'min-w-1025px'   // 1025px and up
}

// Cleaner implementation
<div className="hidden md:flex lg:hidden"> {/* Tablet only */}
  {/* Show 4-5 priority items + hamburger for rest */}
</div>

<div className="hidden lg:flex"> {/* Desktop only */}
  {/* Show all items */}
</div>
```

### Option 3: **Priority+ Navigation Pattern**
Show priority items and hide others under "More" dropdown:

```tsx
const priorityItems = ['Food & Drinks', 'What\'s On', 'Book Event'];
const overflowItems = ['Blog', 'Find Us', 'Near Heathrow'];

// At medium breakpoints, show priority items + "More" dropdown
```

## Implementation Recommendations

### 1. **Quick Fix (Immediate)**
```tsx
// Update line 256 to be clearer
<div className={cn(
  'hidden',
  'md:flex md:items-centre md:space-x-4 lg:space-x-8'
)}>

// Reduce spacing between items on tablet
// Increase from md (768px) to lg (1024px) for full menu
```

### 2. **Status Bar Handling**
```tsx
// Move status to second row on tablet
<div className="hidden md:block lg:hidden w-full">
  <div className="container mx-auto px-4 py-2 border-t border-white/20">
    {statusComponent}
  </div>
</div>
```

### 3. **CSS Improvements**
```css
/* Add to globals.css */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet-specific navigation */
  .nav-item {
    padding: 0 0.5rem; /* Reduced padding */
    font-size: 0.875rem; /* Slightly smaller text */
  }
  
  /* Hide weather component on tablet */
  .weather-tablet-hide {
    display: none;
  }
}
```

### 4. **Responsive Font Sizing**
```tsx
// Dynamic font sizing for nav items
className={cn(
  'font-medium transition-colours',
  'text-sm md:text-sm lg:text-base', // Responsive text
  mergedTheme.text,
  mergedTheme.hoverText
)}
```

## Testing Breakpoints

Test these specific widths:
- 768px - Tablet minimum
- 900px - Mid-tablet (problematic area)
- 1024px - Desktop minimum
- 1200px - Comfortable desktop

## Priority Actions

1. **Immediate**: Reduce navigation items or implement priority+ pattern
2. **Short-term**: Clean up breakpoint logic and add tablet-specific styles
3. **Long-term**: Consider mega-menu for desktop to better organise content

## Alternative: Hamburger Menu Earlier

Consider showing hamburger menu up to 1024px instead of 768px:
```tsx
// Change mobileBreakpoint default
mobileBreakpoint = 'lg' // Shows hamburger up to 1024px
```

This gives more breathing room and avoids the problematic tablet range entirely.