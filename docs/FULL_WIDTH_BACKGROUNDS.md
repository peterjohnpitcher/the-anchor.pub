# Full-Width Background Guide

## The Problem
When using the standard `Section` component from our UI library, backgrounds are constrained by the Container's max-width. This creates white gaps on larger screens.

## The Solution
Use the `FullWidthSection` component for any section that needs a background color/image to span the full viewport width.

## Usage

### ❌ DON'T - This creates gaps on wide screens:
```tsx
<Section className="bg-gray-50">
  <h2>My Content</h2>
</Section>
```

### ✅ DO - This ensures full-width backgrounds:
```tsx
<FullWidthSection className="bg-gray-50 py-16">
  <h2>My Content</h2>
</FullWidthSection>
```

## Examples

### Basic Usage
```tsx
import { FullWidthSection } from '@/components/ui'

<FullWidthSection className="bg-gray-50 py-16">
  <h2>Content with gray background</h2>
</FullWidthSection>
```

### With Gradient Background
```tsx
<FullWidthSection className="bg-gradient-to-br from-anchor-green to-emerald-800 text-white py-20">
  <h2>Hero section with gradient</h2>
</FullWidthSection>
```

### Custom Container Width
```tsx
<FullWidthSection 
  className="bg-anchor-green" 
  containerClassName="max-w-4xl"
>
  <h2>Narrower content area</h2>
</FullWidthSection>
```

## When to Use

### Use FullWidthSection for:
- Hero sections
- Alternating background colors between sections
- CTA sections with colored backgrounds
- Any section where the background should touch screen edges

### Use regular Section for:
- Content within a consistent white background
- When you don't need the background to extend full width

## Styling Tips

1. **Always add vertical padding** to the outer div:
   ```tsx
   <FullWidthSection className="bg-gray-50 py-16 sm:py-20 lg:py-24">
   ```

2. **For text on dark backgrounds**, ensure proper contrast:
   ```tsx
   <FullWidthSection className="bg-anchor-green text-white">
   ```

3. **Combine with other components**:
   ```tsx
   <FullWidthSection className="bg-gray-50 py-16">
     <SectionHeader title="My Title" />
     <FeatureGrid features={features} />
   </FullWidthSection>
   ```

## Common Patterns

### Alternating Backgrounds
```tsx
<FullWidthSection className="bg-white py-16">
  {/* Section 1 content */}
</FullWidthSection>

<FullWidthSection className="bg-gray-50 py-16">
  {/* Section 2 content */}
</FullWidthSection>

<FullWidthSection className="bg-white py-16">
  {/* Section 3 content */}
</FullWidthSection>
```

### Hero with Pattern Overlay
```tsx
<FullWidthSection className="bg-gradient-to-br from-anchor-green to-emerald-800 relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
    }}></div>
  </div>
  <div className="relative z-10 py-20">
    {/* Content */}
  </div>
</FullWidthSection>
```

## Troubleshooting

**Q: My background isn't full width**
A: Make sure you're using `FullWidthSection`, not `Section`

**Q: Content is touching screen edges**
A: The Container inside handles padding. If you need custom padding, use `containerClassName`

**Q: Background color not showing**
A: Ensure you've added the className to the FullWidthSection component, not a child div