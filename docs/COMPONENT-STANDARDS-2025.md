# Component Standards for The Anchor Website

## Overview

This document outlines the standardized React component patterns for The Anchor website, based on modern React and Next.js 14 best practices. Our approach emphasizes server-first architecture, type safety, accessibility, and maintainability.

## Component Architecture

### 1. Directory Structure

```
components/
├── ui/                 # Base UI components (buttons, cards, inputs)
├── features/           # Feature-specific components
├── layouts/            # Layout components
├── providers/          # Context providers
└── hero/              # Hero section variants
```

### 2. Component Categories

#### Base UI Components (`/components/ui/`)
- **Purpose**: Reusable, atomic components used throughout the application
- **Examples**: Button, Card, Input, Select, Dialog, Alert
- **Characteristics**:
  - Highly customizable via props
  - No business logic
  - Accessibility-first design
  - Support theming

#### Feature Components (`/components/features/`)
- **Purpose**: Complex components that implement specific business features
- **Examples**: EventBooking, MenuDisplay, BlogPost, GalleryViewer
- **Characteristics**:
  - May contain business logic
  - Composed of UI components
  - Feature-specific state management

#### Layout Components (`/components/layouts/`)
- **Purpose**: Page structure and navigation components
- **Examples**: Header, Footer, Sidebar, PageWrapper
- **Characteristics**:
  - Consistent across pages
  - Handle responsive behavior
  - Manage navigation state

## Component Standards

### 1. TypeScript Interfaces

```typescript
// Always define explicit interfaces for props
interface ComponentProps {
  // Required props first
  title: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  
  // Event handlers
  onClick?: () => void;
  
  // Children and composition
  children?: React.ReactNode;
  
  // Extend native HTML elements when appropriate
  className?: string;
}

// Use discriminated unions for complex state
type ComponentState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };
```

### 2. Component Structure

```typescript
// components/ui/Button.tsx
'use client'  // Only if client interactivity needed

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full',
          // Variant styles
          variants[variant],
          // Size styles
          sizes[size],
          // Custom classes
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### 3. Styling Approach

We use **Tailwind CSS** with the following conventions:

```typescript
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

// Define variant maps for consistency
const variants = {
  primary: 'bg-anchor-gold text-white hover:bg-anchor-gold-light',
  secondary: 'bg-white text-anchor-green border-2 border-anchor-green',
  ghost: 'text-anchor-green hover:bg-anchor-green/10'
}

// Allow className override for flexibility
className={cn(baseStyles, variantStyles, className)}
```

### 4. Accessibility Standards

- **Semantic HTML**: Use proper HTML5 elements
- **ARIA Labels**: Add when semantic HTML isn't sufficient
- **Keyboard Navigation**: Support Tab, Enter, Escape, Arrow keys
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Minimum 4.5:1 ratio

```typescript
// Example accessible component
<button
  role="button"
  aria-label={ariaLabel || children}
  aria-pressed={isActive}
  aria-disabled={disabled}
  tabIndex={disabled ? -1 : 0}
  onKeyDown={handleKeyDown}
>
  {children}
</button>
```

### 5. Server vs Client Components

**Server Components (Default)**
- No `'use client'` directive
- Used for static content, data fetching
- Better performance, SEO

**Client Components**
- Add `'use client'` directive
- Required for:
  - State management (useState, useReducer)
  - Event handlers (onClick, onChange)
  - Browser APIs (window, document)
  - Third-party client libraries

### 6. State Management Patterns

```typescript
// Local state for UI
const [isOpen, setIsOpen] = useState(false)

// Custom hooks for shared logic
const { data, loading, error } = useEventData(eventId)

// Context for theme/auth
const { theme, toggleTheme } = useTheme()

// Server state with Server Actions
async function updateEvent(formData: FormData) {
  'use server'
  // Server-side logic
}
```

### 7. Error Handling

```typescript
// Error boundaries for components
export function ComponentErrorBoundary({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {children}
    </ErrorBoundary>
  )
}

// Loading states
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
```

### 8. Performance Optimization

- **Code Splitting**: Use dynamic imports for large components
- **Image Optimization**: Always use Next.js Image component
- **Memoization**: Use React.memo for expensive renders
- **Suspense**: Implement loading boundaries

```typescript
// Dynamic import example
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
)
```

## Component Library

### Core UI Components to Implement

1. **Button**
   - Variants: primary, secondary, ghost, outline
   - Sizes: xs, sm, md, lg, xl
   - States: loading, disabled

2. **Card**
   - Variants: default, outlined, elevated
   - Sections: header, body, footer

3. **Input**
   - Types: text, email, tel, textarea
   - States: error, success, disabled
   - With labels and helper text

4. **Select**
   - Single and multi-select
   - Searchable option
   - Custom option rendering

5. **Dialog/Modal**
   - Sizes: sm, md, lg, fullscreen
   - Dismissible/non-dismissible
   - Accessible focus management

6. **Alert**
   - Types: info, success, warning, error
   - Dismissible option
   - Action buttons

7. **Badge**
   - Variants: default, success, warning, error
   - Sizes: sm, md, lg

8. **Skeleton**
   - For loading states
   - Various shapes: text, card, image

## Testing Standards

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Button handles click events', async () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  await userEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Accessibility Tests
```typescript
test('Button is accessible', () => {
  const { container } = render(<Button>Click me</Button>)
  expect(container).toHaveNoA11yViolations()
})
```

## Documentation Standards

Each component should have:

1. **TypeScript definitions** for all props
2. **JSDoc comments** for complex props
3. **Usage examples** in Storybook or docs
4. **Accessibility notes**
5. **Performance considerations**

## Migration Strategy

1. **Phase 1**: Create base UI components
2. **Phase 2**: Refactor existing components to use base UI
3. **Phase 3**: Implement feature components
4. **Phase 4**: Add comprehensive testing
5. **Phase 5**: Documentation and examples

## Conclusion

These standards ensure consistency, maintainability, and quality across The Anchor website. They leverage modern React patterns while prioritizing performance, accessibility, and developer experience.