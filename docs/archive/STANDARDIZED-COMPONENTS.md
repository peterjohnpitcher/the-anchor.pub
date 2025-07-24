# Standardized Components Documentation

This document outlines the standardized components created to ensure consistency across The Anchor website.

## Component Library

### 1. CTASection
**Purpose**: Standardizes call-to-action sections at the bottom of pages.

```tsx
import { CTASection } from '@/components/ui'

<CTASection
  title="Ready for a Great Night Out?"
  description="Book your table now and join us"
  buttons={[
    { 
      text: "📞 Call to Book", 
      href: "tel:01753682707", 
      variant: "secondary" 
    },
    { 
      text: "📍 Get Directions", 
      href: "/find-us", 
      variant: "primary",
      className: "bg-white text-anchor-green hover:bg-gray-100"
    }
  ]}
  variant="green" // 'green' | 'red' | 'dark'
  footer="Open Tuesday-Sunday • Free Parking"
/>
```

### 2. SectionHeader
**Purpose**: Consistent section introductions throughout the site.

```tsx
import { SectionHeader } from '@/components/ui'

<SectionHeader
  title="What Makes Us Special"
  subtitle="More than just a pub - we're the heart of the community"
  align="center" // 'left' | 'center' | 'right'
/>
```

### 3. FeatureCard & FeatureGrid
**Purpose**: Display features, benefits, or highlights in a consistent card format.

```tsx
import { FeatureGrid } from '@/components/ui'

<FeatureGrid
  columns={3}
  features={[
    {
      icon: "🍺",
      title: "Real Ales",
      description: "Carefully selected local and national brews",
      variant: "cream"
    },
    {
      icon: "🍕",
      title: "Pizza Tuesday",
      description: "Buy one get one free all day",
      variant: "default"
    }
  ]}
/>
```

### 4. InfoBox & InfoBoxGrid
**Purpose**: Highlight important information or special offers.

```tsx
import { InfoBoxGrid } from '@/components/ui'

<InfoBoxGrid
  columns={2}
  boxes={[
    {
      title: "Tuesday Special",
      content: (
        <ul className="space-y-2">
          <li>• Pizza BOGOF all day</li>
          <li>• Dine in or takeaway</li>
        </ul>
      ),
      footnote: "No voucher needed!",
      variant: "colored",
      color: "bg-red-50"
    }
  ]}
/>
```

### 5. AlertBox
**Purpose**: Display important notices, tips, or warnings.

```tsx
import { AlertBox } from '@/components/ui'

<AlertBox
  variant="warning"
  title="Important Notice"
  content="Sunday roasts must be ordered by 1pm Saturday"
/>
```

### 6. AmenityList
**Purpose**: Display lists of features or amenities with icons.

```tsx
import { AmenityList } from '@/components/ui'

<AmenityList
  items={[
    { 
      icon: "🚗", 
      title: "Free Parking", 
      description: "20 spaces available" 
    },
    { 
      icon: "📶", 
      description: "Free WiFi throughout" 
    }
  ]}
  iconColor="text-anchor-gold"
/>
```

### 7. QuickInfoGrid
**Purpose**: Display key information in a compact grid format.

```tsx
import { QuickInfoGrid } from '@/components/ui'

<QuickInfoGrid
  columns={4}
  items={[
    { icon: "📍", title: "Location", subtitle: "Stanwell Moor" },
    { icon: "🕐", title: "Open", subtitle: "Tue-Sun" },
    { icon: "🚗", title: "Parking", subtitle: "Free" },
    { icon: "📞", title: "Bookings", subtitle: "Welcome" }
  ]}
/>
```

### 8. DirectionsCard & DirectionsGrid
**Purpose**: Display step-by-step directions from various locations.

```tsx
import { DirectionsGrid } from '@/components/ui'

<DirectionsGrid
  columns={2}
  directions={[
    {
      from: "Heathrow T5",
      steps: [
        "Exit via Southern Perimeter Road",
        "Turn left onto A3044",
        "Right onto Horton Road",
        "The Anchor on your left"
      ],
      time: "7 minutes",
      distance: "3.2 miles"
    }
  ]}
/>
```

### 9. BusinessHoursSection
**Purpose**: Wrapper for the BusinessHours component with consistent styling.

```tsx
import { BusinessHoursSection } from '@/components/ui'

<BusinessHoursSection
  title="When We're Open"
  subtitle="Kitchen closes earlier - see times below"
  variant="centered"
  showKitchen={true}
/>
```

## Usage Guidelines

### Color Consistency
- Primary actions: `bg-anchor-green`
- Secondary actions: Varies by context
- Info boxes: Use semantic colors (amber for warnings, blue for info, etc.)
- Icons: Default to `text-anchor-gold` for amenity lists

### Spacing
- All components use `section-spacing` class for consistent vertical spacing
- Internal padding follows the design system (p-4, p-6, p-8)

### Responsive Design
- All components are mobile-first
- Grid components automatically adjust columns on smaller screens

### Accessibility
- All interactive elements have proper focus states
- Color contrast meets WCAG standards
- Semantic HTML structure maintained

## Migration Guide

To migrate existing code to use these components:

1. **Identify repeated patterns** in your page
2. **Import the appropriate component** from `@/components/ui`
3. **Replace the HTML** with the component
4. **Pass the required props**
5. **Test responsiveness** and styling

Example migration:
```tsx
// Before
<section className="section-spacing bg-anchor-green text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Visit Us Today
    </h2>
    <p className="text-xl mb-8 text-white/90">
      Experience the best of British hospitality
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      <CallToAction href="tel:01753682707" variant="secondary" size="lg">
        📞 Call Now
      </CallToAction>
    </div>
  </div>
</section>

// After
<CTASection
  title="Visit Us Today"
  description="Experience the best of British hospitality"
  buttons={[
    { text: "📞 Call Now", href: "tel:01753682707", variant: "secondary" }
  ]}
/>
```

## Best Practices

1. **Use semantic variants** - Choose variants that match the content purpose
2. **Keep content concise** - These components work best with focused messaging
3. **Maintain consistency** - Use the same component variant for similar content types
4. **Test on mobile** - All components are responsive but verify your specific content
5. **Follow accessibility** - Use proper heading hierarchy and meaningful link text

## Future Enhancements

- Add animation variants for components
- Create theme variants for seasonal updates
- Add more grid layout options
- Implement dark mode variants
- Add loading states for dynamic content