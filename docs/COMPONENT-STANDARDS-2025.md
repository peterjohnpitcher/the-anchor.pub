# Component Standards for The Anchor Website

## Overview

This document outlines the standardized React component patterns for The Anchor website, based on modern React and Next.js 14 best practices. Our approach emphasizes server-first architecture, type safety, accessibility, and maintainability.

## Component Architecture

### 1. Directory Structure

```
components/
├── ui/                 # Base UI components
│   ├── primitives/     # Button, Input, Badge, Textarea
│   ├── layout/         # Card, Container, Section, Grid
│   ├── navigation/     # Tabs, Breadcrumb, NavBar
│   ├── forms/          # Form, Select, Checkbox, Radio, DatePicker, Switch
│   ├── feedback/       # Alert, Loading, Toast
│   ├── overlays/       # Modal, Tooltip, Popover
│   ├── index.ts        # Central export file
│   └── types.ts        # Shared TypeScript interfaces
├── features/           # Feature-specific components
├── layouts/            # Layout components
├── providers/          # Context providers
└── hero/              # Hero section variants
```

### 2. Component Categories

#### Base UI Components (`/components/ui/`)
- **Purpose**: Reusable, atomic components used throughout the application
- **Subcategories**:
  - **Primitives**: Button, Input, Badge, Textarea
  - **Layout**: Card, Container, Section, Grid, GridItem
  - **Navigation**: Tabs, Breadcrumb, NavBar
  - **Forms**: Form, Select, Checkbox, Radio, DatePicker, Switch
  - **Feedback**: Alert, Loading, Toast (upcoming)
  - **Overlays**: Modal, Tooltip (upcoming)
- **Characteristics**:
  - Highly customizable via props
  - No business logic
  - Accessibility-first design
  - Support theming
  - Consistent variant patterns

#### Feature Components (`/components/features/`)
- **Purpose**: Complex components that implement specific business features
- **Examples**: EventBooking, MenuDisplay, BlogPost, Gallery
- **Characteristics**:
  - May contain business logic
  - Composed of UI components
  - Feature-specific state management
  - Refactored to use standard UI components

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

#### Standard Component Pattern
```typescript
// components/ui/primitives/Button.tsx
'use client'  // Only if client interactivity needed

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps } from '../types'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors',
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps 
  extends BaseComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={props.disabled || loading}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

#### Compound Component Pattern
```typescript
// components/ui/navigation/Tabs.tsx
const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export const Tabs = ({ defaultValue, value, onValueChange, children }) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue)
  
  return (
    <TabsContext.Provider value={{ activeTab, onValueChange: onValueChange || setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ children, className }) => (
  <div className={cn('flex items-center', className)}>
    {children}
  </div>
)

export const TabsTrigger = ({ value, children }) => {
  const { activeTab, onValueChange } = useContext(TabsContext)!
  
  return (
    <button
      onClick={() => onValueChange(value)}
      data-state={activeTab === value ? 'active' : 'inactive'}
    >
      {children}
    </button>
  )
}
```

### 3. Styling Approach

We use **Tailwind CSS** with **class-variance-authority (cva)** for variant management:

```typescript
// Use cva for variant definitions
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-full transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-anchor-gold text-white hover:bg-anchor-gold-light',
        secondary: 'bg-white text-anchor-green border-2 border-anchor-green',
        ghost: 'text-anchor-green hover:bg-anchor-green/10'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

// Type-safe variant props
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Allow className override for flexibility
className={cn(buttonVariants({ variant, size }), className)}
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

#### Local State
```typescript
// UI state management
const [isOpen, setIsOpen] = useState(false)
```

#### Context Patterns
```typescript
// Form context for managing form state
const FormContext = createContext<FormContextValue | undefined>(undefined)

export const Form = ({ children, onSubmit }) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  return (
    <FormContext.Provider value={{ errors, setError, isSubmitting }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  )
}

// Tab context for compound components
const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}
```

#### Custom Hooks
```typescript
// Shared form logic
export const useFormField = (name: string) => {
  const context = useContext(FormContext)
  if (!context) throw new Error('useFormField must be used within Form')
  
  return {
    error: context.errors[name],
    setError: (error: string) => context.setError(name, error)
  }
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

### Implemented Components (Phases 1-4)

#### Primitives
1. **Button** ✓
   - Variants: primary, secondary, ghost, outline, danger
   - Sizes: sm, md, lg
   - States: loading, disabled
   - Features: icon support, full width

2. **Input** ✓
   - Variants: default, error, success
   - Types: text, email, tel, password, number, search, url
   - Features: labels, helper text, icons

3. **Badge** ✓
   - Variants: default, primary, secondary, success, warning, error
   - Sizes: sm, md, lg
   - Features: dot indicator

#### Layout
4. **Card** ✓
   - Variants: default, outlined, elevated
   - Sections: CardHeader, CardTitle, CardBody, CardFooter
   - Padding options: none, sm, md, lg

5. **Container** ✓
   - Sizes: sm, md, lg, xl, full
   - Features: centered content, responsive padding

6. **Section** ✓
   - Spacing: none, sm, md, lg, xl
   - Features: consistent vertical rhythm

7. **Grid** ✓
   - Columns: 1-12, auto
   - Gap: none, sm, md, lg, xl
   - Features: GridItem with span control

#### Navigation
8. **Tabs** ✓
   - Variants: line, pills, enclosed
   - Sizes: sm, md, lg
   - Compound: TabsList, TabsTrigger, TabsContent

9. **Breadcrumb** ✓
   - Variants: slash, chevron, arrow
   - Compound: BreadcrumbList, BreadcrumbItem, BreadcrumbLink

10. **NavBar** ✓
    - Variants: default, dark, light, transparent
    - Features: sticky, logo, actions, badges

#### Forms
11. **Form** ✓
    - Features: context-based state, validation
    - Compound: FormField, FormSection

12. **Select** ✓
    - Variants: default, error, success
    - Features: placeholder, groups
    - SearchableSelect with filtering

13. **Checkbox** ✓
    - Sizes: sm, md, lg
    - Features: indeterminate state
    - CheckboxGroup for multiple options

14. **Radio** ✓
    - Sizes: sm, md, lg
    - RadioGroup for managing options
    - CardRadio for visual selection

15. **DatePicker** ✓
    - Features: min/max dates, time support
    - DateRangePicker for periods
    - TimePicker for time selection

16. **Switch** ✓
    - Sizes: sm, md, lg
    - Features: on/off labels
    - SwitchGroup for multiple toggles

#### Feedback
17. **Alert** ✓
    - Variants: info, success, warning, error
    - Features: title, dismissible, custom icon

### Upcoming Components (Phase 5)

1. **Modal/Dialog**
   - Sizes: sm, md, lg, fullscreen
   - Focus management

2. **Toast**
   - Position options
   - Auto-dismiss

3. **Tooltip**
   - Placement options
   - Trigger modes

4. **Loading**
   - Spinner variants
   - Skeleton loaders

## Testing Standards

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui'

describe('Button', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="primary">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-anchor-gold')
  })
  
  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

### Accessibility Tests
```typescript
describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  it('supports keyboard navigation', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()
    
    await userEvent.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
```

## Documentation Standards

Each component should have:

1. **TypeScript definitions** for all props
2. **JSDoc comments** for complex props
3. **Usage examples** in Storybook or docs
4. **Accessibility notes**
5. **Performance considerations**

## Form Validation Patterns

### Validation Utilities
```typescript
// lib/form-validation.ts
export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  ukPhone: /^(?:(?:\+44|0044|0)7(?:\d{9}))$/,
  postcode: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
}

export const commonRules = {
  email: {
    required: 'Email is required',
    pattern: { value: patterns.email, message: 'Invalid email address' }
  },
  phone: {
    required: 'Phone number is required',
    pattern: { value: patterns.ukPhone, message: 'Invalid UK phone number' }
  }
}

export const validateForm = (data: FormData, rules: ValidationRules) => {
  const errors: ValidationError[] = []
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data.get(field)
    
    if (fieldRules.required && !value) {
      errors.push({ field, message: fieldRules.required })
    }
    
    if (fieldRules.pattern && value) {
      if (!fieldRules.pattern.value.test(String(value))) {
        errors.push({ field, message: fieldRules.pattern.message })
      }
    }
  }
  
  return errors
}
```

## Migration Strategy

### Completed Phases
1. **Phase 1** ✓: Created base UI components (Button, Card, Input, Alert, Badge)
2. **Phase 2** ✓: Layout and navigation components (Container, Grid, Tabs, Breadcrumb, NavBar)
3. **Phase 3** ✓: Refactored feature components (EventBooking, MenuDisplay, Gallery)
4. **Phase 4** ✓: Form components with validation (Form, Select, Checkbox, Radio, DatePicker, Switch)

### Upcoming Phases
5. **Phase 5**: Feedback & overlay components (Modal, Toast, Tooltip, Loading)
6. **Phase 6**: Comprehensive testing suite
7. **Phase 7**: Complete migration of remaining components
8. **Phase 8**: Performance optimization and deployment

## Key Architectural Decisions

### 1. Base Component Interface
All components extend `BaseComponentProps` for consistency:
```typescript
export interface BaseComponentProps {
  className?: string
  testId?: string
  id?: string
}
```

### 2. Central Export Pattern
All UI components are exported from a single `index.ts` file:
```typescript
import { Button, Card, Input } from '@/components/ui'
```

### 3. Compound Components
Used for complex UI patterns that require multiple related components:
- Tabs (TabsList, TabsTrigger, TabsContent)
- Breadcrumb (BreadcrumbList, BreadcrumbItem, BreadcrumbLink)
- Card (CardHeader, CardTitle, CardBody, CardFooter)

### 4. Form Context Pattern
Forms use context to manage state and validation across fields:
- Centralized error handling
- Consistent submission state
- Field-level validation hooks

### 5. Accessibility First
- All interactive components support keyboard navigation
- Proper ARIA attributes and roles
- Focus management for complex interactions
- Screen reader announcements for dynamic content

## Best Practices

1. **Always use forwardRef** for components that render HTML elements
2. **Provide sensible defaults** for all optional props
3. **Use discriminated unions** for complex prop combinations
4. **Export component types** alongside components
5. **Include displayName** for better debugging
6. **Validate props at runtime** for critical components
7. **Document edge cases** in component comments
8. **Test accessibility** as part of component development

## Conclusion

These standards ensure consistency, maintainability, and quality across The Anchor website. They leverage modern React patterns while prioritizing performance, accessibility, and developer experience. The component library provides a solid foundation for building complex features while maintaining code quality and user experience.