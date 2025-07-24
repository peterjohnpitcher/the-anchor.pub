# Technical Specifications - The Anchor Pub
*Last Updated: January 2025*

This document consolidates all technical specifications for the website implementation.

## 🔧 API Specifications

### Table Booking API Requirements
**Endpoint:** OrderTab Integration
**Method:** External redirect with parameters

**Required Parameters:**
```typescript
interface BookingParams {
  venue_id: string;        // "5835"
  date?: string;          // "YYYY-MM-DD"
  time?: string;          // "HH:MM"
  party_size?: number;    // 1-20
  utm_source?: string;    // Tracking source
  utm_medium?: string;    // "website"
  utm_campaign?: string;  // Campaign name
}
```

### Sunday Lunch Booking API (Planned)
**Features Required:**
1. Real-time availability checking
2. Deposit payment integration (PayPal/Stripe)
3. Email confirmation system
4. SMS reminders
5. Dietary requirements capture
6. Table preference options

**Data Structure:**
```typescript
interface SundayLunchBooking {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  booking: {
    date: Date;
    time: string;
    party_size: number;
    table_preference?: 'window' | 'quiet' | 'accessible';
  };
  menu_selections: {
    starters: MenuItem[];
    mains: MenuItem[];
    desserts: MenuItem[];
  };
  dietary_requirements: string[];
  special_requests?: string;
  deposit: {
    amount: number;
    status: 'pending' | 'paid' | 'refunded';
    transaction_id?: string;
  };
}
```

## 📊 Data Layer Specifications

### Standard Event Structure
```javascript
{
  event: string,              // Event name
  event_category: string,     // Category
  event_action: string,       // Action
  event_label?: string,       // Optional label
  event_value?: number,       // Optional value
  
  // Enhanced Ecommerce (when applicable)
  ecommerce?: {
    currency: 'GBP',
    value: number,
    items: Array<{
      item_id: string,
      item_name: string,
      item_category: string,
      price: number,
      quantity: number
    }>
  },
  
  // Custom dimensions
  custom_dimensions?: {
    day_part: 'breakfast' | 'lunch' | 'dinner',
    day_type: 'weekday' | 'weekend' | 'holiday',
    kitchen_status: 'open' | 'closing_soon' | 'closed',
    weather_condition: string,
    special_event_active: boolean
  }
}
```

### Critical Events to Track
1. **table_booking_click** - When user clicks book table
2. **phone_call** - When user clicks phone number
3. **menu_view** - When user views any menu
4. **directions_click** - When user gets directions
5. **offer_view** - When user views special offers
6. **error** - When errors occur

## 🎨 Component Specifications

### Design System Tokens
```typescript
// Colors
const colors = {
  'anchor-green': '#1B5E3F',
  'anchor-gold': '#FFD700',
  'anchor-cream': '#FFF8DC',
  'anchor-sand': '#F5E6D3',
  'anchor-navy': '#1a365d'
};

// Spacing
const spacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
  '3xl': '6rem'   // 96px
};

// Container Sizes
const containers = {
  sm: 'max-w-3xl',  // 768px
  md: 'max-w-5xl',  // 1024px
  lg: 'max-w-7xl'   // 1280px
};
```

### Component Architecture
```typescript
// Base component interface
interface BaseComponentProps {
  className?: string;
  testId?: string;
  children?: React.ReactNode;
}

// All components must:
1. Use forwardRef for ref forwarding
2. Include proper TypeScript types
3. Support className merging with cn()
4. Include accessibility attributes
5. Follow naming convention: PascalCase
```

## 🔍 SEO Technical Requirements

### Page Requirements
1. **Single H1 per page** (currently missing on many)
2. **Proper heading hierarchy** (H1 → H2 → H3)
3. **Meta descriptions** 150-160 characters
4. **Title tags** 50-60 characters
5. **Canonical URLs** on all pages
6. **Open Graph tags** for social sharing

### Schema Requirements
Every page must include:
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "breadcrumb": { /* BreadcrumbList */ },
  "mainEntity": { /* Primary entity */ },
  "isPartOf": { /* WebSite reference */ }
}
```

### Image Requirements
1. **WebP format** with JPEG fallback
2. **Responsive images** with srcset
3. **Lazy loading** with native loading="lazy"
4. **Alt text** descriptive and keyword-aware
5. **Aspect ratios** maintained to prevent CLS

## 🚀 Performance Requirements

### Target Metrics
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTI**: < 3.5s
- **Total Page Size**: < 2MB

### Optimization Techniques
1. **Code splitting** by route
2. **Tree shaking** unused code
3. **Image optimization** (WebP, lazy load)
4. **Font optimization** (preload, display=swap)
5. **CSS optimization** (critical CSS, purge unused)

## 🔐 Security Requirements

### Content Security Policy
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: *.googletagmanager.com;
  connect-src 'self' *.google-analytics.com *.googletagmanager.com;
```

### GDPR Compliance
1. **Cookie consent** before tracking
2. **Privacy policy** linked from all pages
3. **Data retention** policies
4. **Right to deletion** process
5. **Consent mode** integration

## 📱 Responsive Requirements

### Breakpoints
```scss
$mobile: 640px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1280px;
```

### Mobile-First Approach
1. Base styles for mobile
2. Progressive enhancement
3. Touch-friendly tap targets (44x44px min)
4. Readable font sizes (16px min)
5. Appropriate spacing

## 🧪 Testing Requirements

### Unit Tests
- Components: 80% coverage
- Utilities: 100% coverage
- Critical paths: 100% coverage

### E2E Tests
- Booking flow
- Contact forms
- Navigation
- Search functionality
- Error handling

### Performance Tests
- Lighthouse CI on every build
- Bundle size monitoring
- Runtime performance profiling

---

*Reference this document when implementing new features.*