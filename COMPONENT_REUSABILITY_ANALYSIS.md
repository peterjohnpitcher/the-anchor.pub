# Component Reusability Analysis Report

## Overview
This report analyzes all React components in the `/components` directory to identify opportunities for improved reusability, TypeScript improvements, and code optimisation.

---

## 1. BusinessHours.tsx

### Current Reusability Status: **MEDIUM**

### Hardcoded Values That Should Be Props:
- API endpoint `/api/business-hours` and `/api/weather`
- Refresh interval (5 minutes)
- Day order array
- Time format (12h vs 24h)
- Colour schemes for different variants
- Fixed text messages ("We're Open!", "We're Closed", etc.)

### Missing TypeScript Interfaces:
- `formatTime` function parameters/return type

### Suggestions for Improvement:
1. Extract API endpoints to props with defaults
2. Make refresh interval configurable
3. Create a `TimeFormat` enum for 12h/24h support
4. Extract colour schemes to a theme configuration
5. Allow customizable status messages
6. Extract the `FlightRow` pattern from FlightStatus as a reusable pattern

### Refactoring Example:
```typescript
interface BusinessHoursProps {
  variant?: 'compact' | 'full' | 'status' | 'dark' | 'condensed'
  showKitchen?: boolean
  showWeather?: boolean
  apiEndpoint?: string
  weatherApiEndpoint?: string
  refreshInterval?: number
  timeFormat?: '12h' | '24h'
  messages?: {
    open?: string
    closed?: string
    opensIn?: string
    closesIn?: string
  }
  colours?: {
    openIndicator?: string
    closedIndicator?: string
  }
}
```

---

## 2. CallToAction.tsx

### Current Reusability Status: **HIGH**

### Hardcoded Values That Should Be Props:
- Colour values in `variantClasses` (uses hardcoded Tailwind classes)
- Animation duration ('duration-200')
- Border radius ('rounded-full')

### Missing TypeScript Interfaces:
- None - well typed

### Suggestions for Improvement:
1. Allow custom colour schemes through props
2. Make animation duration configurable
3. Add shape variant (rounded, square, pill)
4. Add icon support (leading/trailing)
5. Add loading state support

### Refactoring Example:
```typescript
interface CallToActionProps {
  // ... existing props
  shape?: 'rounded' | 'square' | 'pill'
  animationDuration?: number
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
}
```

---

## 3. EventSchema.tsx

### Current Reusability Status: **MEDIUM**

### Hardcoded Values That Should Be Props:
- Base URL 'https://the-anchor.pub'
- Default location data (The Anchor Pub address)
- Default geo coordinates (latitude: 51.4567, longitude: -0.4567)
- Default currency 'GBP'
- Default organizer information

### Missing TypeScript Interfaces:
- Schema output structure

### Suggestions for Improvement:
1. Extract all default values to optional props
2. Create a `SchemaConfig` interface for default values
3. Make the component venue-agnostic
4. Add validation for required schema fields

### Refactoring Example:
```typescript
interface EventSchemaProps {
  event: Event
  baseUrl?: string
  defaultLocation?: SchemaLocation
  defaultOrganizer?: SchemaOrganizer
  defaultCurrency?: string
}
```

---

## 4. EventsToday.tsx

### Current Reusability Status: **LOW**

### Hardcoded Values That Should Be Props:
- API endpoint '/api/events'
- Fallback events data (hardcoded day-specific events)
- All UI text strings
- Link paths ('/whats-on', '/sunday-lunch', etc.)
- Card styling and layout

### Missing TypeScript Interfaces:
- `mapEventToDisplay` return type
- `getDaySpecificEvents` return type
- Fallback event structure

### Suggestions for Improvement:
1. Extract all hardcoded events to a configuration file
2. Make component venue-agnostic
3. Allow custom event card rendering
4. Externalize all text for i18n support
5. Make the component accept custom data fetching logic

### Refactoring Example:
```typescript
interface EventsTodayProps {
  apiEndpoint?: string
  fallbackEvents?: EventsByDay
  renderEventCard?: (event: DisplayEvent) => React.ReactNode
  emptyStateMessage?: string
  errorMessage?: string
  loadingMessage?: string
  viewAllLink?: string
}
```

---

## 5. FlightStatus.tsx

### Current Reusability Status: **MEDIUM**

### Hardcoded Values That Should Be Props:
- Refresh interval (5 minutes)
- Terminal prefix variations ('T', 'Terminal')
- UI text strings ('Departures from Terminal', etc.)
- Colour schemes for status indicators
- Icon emojis (✈️, 🛬)

### Missing TypeScript Interfaces:
- None - well typed

### Suggestions for Improvement:
1. Extract `FlightRow` as a separate component
2. Make terminal format handling more flexible
3. Allow custom status colour mapping
4. Support different icon systems (not just emojis)
5. Make the delay widget more configurable

### Refactoring Example:
```typescript
interface FlightStatusProps {
  terminal: string
  type?: 'departures' | 'arrivals' | 'both'
  limit?: number
  refreshInterval?: number
  terminalFormat?: (terminal: string) => string
  statusColors?: Record<string, string>
  icons?: {
    departure?: React.ReactNode
    arrival?: React.ReactNode
  }
}
```

---

## 6. Footer.tsx

### Current Reusability Status: **LOW**

### Hardcoded Values That Should Be Props:
- All content (logo, text, links, contact info)
- Social media links
- Copyright text
- Feature list (dog friendly, etc.)
- Logo dimensions

### Missing TypeScript Interfaces:
- Props interface (component has no props)
- Link structure interface
- Contact info interface

### Suggestions for Improvement:
1. Make completely configurable through props
2. Extract sections as separate sub-components
3. Support dynamic column layout
4. Add schema markup support

### Refactoring Example:
```typescript
interface FooterProps {
  logo?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  description?: string
  sections?: FooterSection[]
  copyright?: string
  socialLinks?: SocialLink[]
}
```

---

## 7. Navigation.tsx

### Current Reusability Status: **LOW**

### Hardcoded Values That Should Be Props:
- Navigation links and paths
- Logo image and dimensions
- Booking URL
- Scroll threshold (50px)
- All UI text

### Missing TypeScript Interfaces:
- Navigation item structure
- Props interface (component has no props)

### Suggestions for Improvement:
1. Make navigation items configurable
2. Extract mobile menu as separate component
3. Support different logo configurations
4. Make scroll behaviour optional
5. Support dropdown menus

### Refactoring Example:
```typescript
interface NavigationProps {
  logo?: LogoConfig
  items?: NavItem[]
  ctaButton?: CTAConfig
  scrollThreshold?: number
  showStatus?: boolean
  showWeather?: boolean
  mobileBreakpoint?: string
}
```

---

## 8. NextEvent.tsx

### Current Reusability Status: **MEDIUM**

### Hardcoded Values That Should Be Props:
- API endpoint '/api/events'
- Date label logic (TODAY, TOMORROW)
- Price formatting and currency
- All UI text strings
- Link structure

### Missing TypeScript Interfaces:
- None - reasonably well typed

### Suggestions for Improvement:
1. Allow custom API endpoint
2. Make date formatting configurable
3. Support custom event rendering
4. Externalize text for i18n
5. Add skeleton loader customisation

### Refactoring Example:
```typescript
interface NextEventProps {
  apiEndpoint?: string
  dateFormatter?: (date: Date) => string
  renderEvent?: (event: Event) => React.ReactNode
  emptyStateComponent?: React.ReactNode
  showSchema?: boolean
}
```

---

## 9. OptimizedImage.tsx

### Current Reusability Status: **HIGH**

### Hardcoded Values That Should Be Props:
- Default quality (85)
- Blur data URL
- Default alt text fallback
- Default sizes string

### Missing TypeScript Interfaces:
- None - well typed

### Suggestions for Improvement:
1. Make blur data URL configurable or auto-generate
2. Allow quality configuration per instance
3. Add support for art direction
4. Add lazy loading threshold configuration

### Refactoring Example:
```typescript
interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
  blurDataURL?: string
  defaultAlt?: string
  lazyThreshold?: number
}
```

---

## 10. StatusBar.tsx

### Current Reusability Status: **LOW**

### Hardcoded Values That Should Be Props:
- API endpoint '/api/business-hours'
- Refresh interval (5 minutes)
- All business logic for hours
- Colour schemes
- Text messages
- Fallback business hours logic

### Missing TypeScript Interfaces:
- Kitchen hours structure
- Formatted time structure

### Suggestions for Improvement:
1. Extract business hours logic to a custom hook
2. Make all text configurable
3. Support different business types (not just pub)
4. Allow custom status calculations
5. Separate data fetching from presentation

### Refactoring Example:
```typescript
interface StatusBarProps {
  variant?: 'default' | 'compact' | 'navigation'
  showKitchen?: boolean
  className?: string
  apiEndpoint?: string
  refreshInterval?: number
  useBusinessHours?: () => BusinessHoursHook
  messages?: StatusMessages
  colours?: StatusColors
}
```

---

## 11. UpcomingEvents.tsx

### Current Reusability Status: **MEDIUM**

### Hardcoded Values That Should Be Props:
- Event limit (20)
- Schema URL structure
- Date grouping logic
- All UI text
- Error messages

### Missing TypeScript Interfaces:
- Props interface (server component has implicit props)
- Event group structure

### Suggestions for Improvement:
1. Convert to client component with props
2. Make grouping strategy configurable
3. Allow custom event rendering
4. Support pagination
5. Add filtering capabilities

### Refactoring Example:
```typescript
interface UpcomingEventsProps {
  limit?: number
  groupBy?: 'date' | 'week' | 'month' | 'category'
  renderEvent?: (event: Event) => React.ReactNode
  showSchema?: boolean
  filterBy?: EventFilter
  pagination?: PaginationConfig
}
```

---

## 12. Weather.tsx

### Current Reusability Status: **MEDIUM**

### Hardcoded Values That Should Be Props:
- API endpoint '/api/weather'
- Refresh interval (30 minutes)
- Location text 'Stanwell Moor'
- Temperature unit (°C)
- Wind speed unit (km/h)

### Missing TypeScript Interfaces:
- None - well typed

### Suggestions for Improvement:
1. Make location configurable
2. Support different unit systems
3. Allow custom weather provider integration
4. Add more display variants
5. Support weather alerts

### Refactoring Example:
```typescript
interface WeatherProps {
  variant?: 'compact' | 'full' | 'detailed' | 'mini'
  location?: string
  units?: 'metric' | 'imperial'
  apiEndpoint?: string
  refreshInterval?: number
  showFeelsLike?: boolean
  showHumidity?: boolean
  showWind?: boolean
}
```

---

## Common Patterns to Extract

### 1. API Data Fetching Hook
```typescript
function useApiData<T>(
  endpoint: string,
  refreshInterval?: number,
  options?: FetchOptions
): {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}
```

### 2. Loading States Component
```typescript
interface LoadingStateProps {
  variant: 'skeleton' | 'spinner' | 'dots' | 'pulse'
  message?: string
  className?: string
}
```

### 3. Error State Component
```typescript
interface ErrorStateProps {
  error: string
  retry?: () => void
  fallbackAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}
```

### 4. Status Indicator Component
```typescript
interface StatusIndicatorProps {
  status: 'open' | 'closed' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  animated?: boolean
  label?: string
}
```

### 5. Time Display Component
```typescript
interface TimeDisplayProps {
  time: string | Date
  format?: '12h' | '24h' | 'relative'
  showSeconds?: boolean
  timezone?: string
}
```

## Priority Recommendations

### High Priority (Do First):
1. Create shared TypeScript interfaces for common data structures
2. Extract API endpoints to environment variables
3. Create reusable loading and error components
4. Extract common utility functions (time formatting, price formatting)

### Medium Priority:
1. Make Footer and Navigation configurable
2. Extract business logic from components into hooks
3. Create theme configuration for colours and spacing
4. Add prop validation with runtime checks

### Low Priority:
1. Add i18n support for all text
2. Create component composition patterns
3. Add storybook for component documentation
4. Implement comprehensive error boundaries

## Code Duplication to Address

1. **Time Formatting**: Used in BusinessHours, EventsToday, UpcomingEvents
2. **API Fetching Pattern**: Repeated in multiple components
3. **Loading States**: Similar animation patterns across components
4. **Status Indicators**: Duplicate colour dot patterns
5. **Error Handling**: Similar error UI patterns

## Conclusion

The codebase has a mix of reusability levels. While some components like `CallToAction` and `OptimizedImage` are well-designed for reuse, others like `Footer`, `Navigation`, and `EventsToday` are tightly coupled to the specific implementation. 

The main improvements needed are:
1. Extracting hardcoded values to props with sensible defaults
2. Creating shared interfaces and types
3. Building common UI pattern components
4. Separating data fetching from presentation
5. Making components venue/business agnostic where possible