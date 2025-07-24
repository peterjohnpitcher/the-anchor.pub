# Competitor Comparison Page Design Specifications

## Component Structure

### 1. ComparisonHero Component
```tsx
interface ComparisonHeroProps {
  competitor: string
  competitorLogo?: string
  headline: string
  subheadline: string
  quickWins: string[] // 3-4 key advantages
}
```

### 2. QuickComparisonTable Component
```tsx
interface ComparisonMetric {
  category: string
  anchorValue: string | boolean
  competitorValue: string | boolean
  anchorWins: boolean
  importance: 'high' | 'medium' | 'low'
}

interface QuickComparisonTableProps {
  metrics: ComparisonMetric[]
  competitorName: string
  showAllMetrics?: boolean
}
```

### 3. DetailedComparison Component
```tsx
interface ComparisonSection {
  title: string
  icon: string
  anchorDetails: {
    description: string
    bulletPoints: string[]
    rating: number
  }
  competitorDetails: {
    description: string
    bulletPoints: string[]
    rating: number
  }
}
```

## Visual Design Guidelines

### Color Scheme
- **Winner Highlight**: `bg-green-50 border-green-500`
- **Neutral**: `bg-gray-50 border-gray-300`
- **The Anchor Brand**: Use existing brand colors
  - Primary: `#005131` (anchor-green)
  - Accent: `#a57626` (anchor-gold)
  - Background: `#faf8f3` (anchor-cream)

### Typography
- **Headings**: Merriweather font (existing)
- **Body**: Outfit font (existing)
- **Comparison Values**: Bold, larger size
- **Winner Indicators**: Gold star icon or checkmark

### Layout Patterns
```
┌─────────────────────────────────────┐
│         HERO SECTION                │
│   The Anchor vs [Competitor]        │
│   Quick value propositions          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│      QUICK COMPARISON TABLE         │
│  ┌─────┬──────────┬──────────┐     │
│  │     │ Anchor   │ Competitor│     │
│  ├─────┼──────────┼──────────┤     │
│  │Price│ ✓ Lower  │ Higher   │     │
│  └─────┴──────────┴──────────┘     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│     DETAILED COMPARISONS            │
│  ┌─────────┐  ┌─────────┐          │
│  │ Anchor  │  │Competitor│          │
│  │ Card    │  │  Card    │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│      CUSTOMER TESTIMONIALS          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         CTA SECTION                 │
└─────────────────────────────────────┘
```

## Mobile Responsive Design

### Breakpoints
- **Desktop**: 1024px+ (side-by-side comparison)
- **Tablet**: 768px-1023px (stacked with indicators)
- **Mobile**: <768px (fully stacked, swipeable)

### Mobile Comparison Table
```
┌─────────────────────┐
│   Feature Name      │
├─────────────────────┤
│ ✓ The Anchor: Free  │
│ ✗ Competitor: £3/hr │
└─────────────────────┘
```

## Interactive Elements

### 1. Metric Filtering
```tsx
const filterOptions = [
  'Show All',
  'Price & Value',
  'Location & Access',
  'Food & Drinks',
  'Atmosphere & Service'
]
```

### 2. Sorting Options
- By importance (High → Low)
- By category
- By "Anchor Wins" first

### 3. Expandable Details
- Click to expand full comparison details
- Smooth accordion animation
- Plus/minus indicators

## Accessibility Requirements

### ARIA Labels
```html
<table role="table" aria-label="Comparison between The Anchor and [Competitor]">
  <caption class="sr-only">
    Detailed comparison of features and services
  </caption>
</table>
```

### Keyboard Navigation
- Tab through interactive elements
- Enter/Space to expand sections
- Arrow keys for table navigation

### Screen Reader Optimization
- Descriptive alt text for icons
- Clear relationship indicators
- Summary text for complex comparisons

## Performance Optimization

### Image Loading
```tsx
// Lazy load comparison images
<Image
  src={competitorImage}
  alt={`${competitor} exterior`}
  loading="lazy"
  placeholder="blur"
/>
```

### Component Code Splitting
```tsx
// Dynamic imports for heavy components
const DetailedComparison = dynamic(
  () => import('@/components/compare/DetailedComparison'),
  { 
    loading: () => <ComparisonSkeleton />,
    ssr: true 
  }
)
```

## Schema Markup Example
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "The Anchor vs Wetherspoons Comparison",
  "description": "Compare The Anchor pub with Wetherspoons",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Restaurant",
          "name": "The Anchor",
          "priceRange": "££",
          "servesCuisine": "British"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Restaurant",
          "name": "Wetherspoons",
          "priceRange": "££",
          "servesCuisine": "British"
        }
      }
    ]
  }
}
```

## Content Templates

### Winner Badge Component
```tsx
const WinnerBadge = ({ isWinner }: { isWinner: boolean }) => (
  <div className={`
    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
    ${isWinner 
      ? 'bg-green-100 text-green-800 border border-green-200' 
      : 'bg-gray-100 text-gray-600'
    }
  `}>
    {isWinner && <CheckIcon className="w-3 h-3 mr-1" />}
    {isWinner ? 'Best Choice' : 'Alternative'}
  </div>
)
```

### Comparison Card Component
```tsx
const ComparisonCard = ({ 
  venue, 
  metrics, 
  highlighted 
}: ComparisonCardProps) => (
  <div className={`
    rounded-lg border-2 p-6 transition-all
    ${highlighted 
      ? 'border-anchor-gold bg-anchor-cream shadow-lg scale-105' 
      : 'border-gray-200 bg-white'
    }
  `}>
    <h3 className="text-xl font-bold mb-4">{venue.name}</h3>
    {metrics.map(metric => (
      <MetricRow key={metric.id} {...metric} />
    ))}
  </div>
)
```

## Animation Guidelines

### Micro-interactions
- Hover effects on comparison rows
- Smooth transitions for filtering
- Subtle bounce on "winner" indicators
- Progress bars for ratings

### Loading States
```tsx
const ComparisonSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
    <div className="grid grid-cols-2 gap-4">
      <div className="h-64 bg-gray-100 rounded" />
      <div className="h-64 bg-gray-100 rounded" />
    </div>
  </div>
)
```

## Testing Checklist

### Functional Testing
- [ ] All comparison data loads correctly
- [ ] Filtering works as expected
- [ ] Mobile responsive behavior
- [ ] Print stylesheet works

### Accessibility Testing
- [ ] Keyboard navigation complete
- [ ] Screen reader announces correctly
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

### Performance Testing
- [ ] Page loads under 3 seconds
- [ ] No layout shift (CLS < 0.1)
- [ ] Images optimized and lazy loaded
- [ ] Component splitting works

### SEO Testing
- [ ] Schema markup validates
- [ ] Meta tags present and unique
- [ ] Internal linking structure
- [ ] Mobile-friendly test passes