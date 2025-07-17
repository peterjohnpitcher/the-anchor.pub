# Component Usage Guide

This guide provides practical examples and best practices for using The Anchor standardized React components.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Component Examples](#component-examples)
3. [Composition Patterns](#composition-patterns)
4. [Styling Guidelines](#styling-guidelines)
5. [Accessibility Best Practices](#accessibility-best-practices)
6. [Migration Guide](#migration-guide)

## Getting Started

### Importing Components

All UI components are exported from a central location for convenience:

```tsx
// Import individual components
import { Button, Card, Input, Alert, Badge } from '@/components/ui'

// Import component types
import type { ButtonProps, CardProps } from '@/components/ui'
```

### Basic Usage

```tsx
import { Button } from '@/components/ui'

export function MyComponent() {
  return (
    <Button 
      variant="primary" 
      size="md"
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </Button>
  )
}
```

## Component Examples

### Button Component

The Button component supports multiple variants, sizes, and states:

```tsx
// Primary button with icon
<Button 
  variant="primary"
  icon={<PlusIcon className="w-5 h-5" />}
>
  Add Item
</Button>

// Loading state
<Button loading disabled>
  Saving...
</Button>

// Full width button
<Button fullWidth variant="secondary">
  Continue
</Button>

// Button with right icon
<Button 
  variant="ghost"
  icon={<ArrowRightIcon />}
  iconPosition="right"
>
  Next Step
</Button>
```

### Card Component

Cards provide a flexible container for grouping related content:

```tsx
// Simple card
<Card variant="elevated">
  <CardBody>
    <p>Simple card content</p>
  </CardBody>
</Card>

// Complete card structure
<Card>
  <CardHeader>
    <CardTitle>Event Details</CardTitle>
  </CardHeader>
  <CardBody>
    <p>Join us for live music this Friday!</p>
    <p className="mt-2 text-gray-600">8:00 PM - 11:00 PM</p>
  </CardBody>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="ghost" size="sm">
      Cancel
    </Button>
    <Button variant="primary" size="sm">
      Book Now
    </Button>
  </CardFooter>
</Card>

// Card with no padding for images
<Card padding="none" variant="elevated">
  <img 
    src="/hero-image.jpg" 
    alt="Hero" 
    className="w-full h-48 object-cover"
  />
  <CardBody>
    <h3 className="font-semibold">Featured Event</h3>
  </CardBody>
</Card>
```

### Input Component

Input components support validation states and helper elements:

```tsx
// Basic input with label
<Input 
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  required
/>

// Input with error state
<Input 
  label="Username"
  variant="error"
  error="Username is already taken"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

// Input with icons
<Input 
  placeholder="Search events..."
  leftIcon={<SearchIcon className="w-5 h-5" />}
  rightIcon={
    <button onClick={clearSearch}>
      <XIcon className="w-4 h-4" />
    </button>
  }
/>

// Textarea for longer content
<Textarea 
  label="Special Instructions"
  rows={5}
  helperText="Let us know about any dietary requirements"
  value={instructions}
  onChange={(e) => setInstructions(e.target.value)}
/>
```

### Alert Component

Alerts communicate important information to users:

```tsx
// Success alert
<Alert variant="success">
  Your booking has been confirmed!
</Alert>

// Error with title and close button
<Alert 
  variant="error"
  title="Booking Failed"
  onClose={() => setShowError(false)}
>
  Please check your payment details and try again.
</Alert>

// Warning with custom icon
<Alert 
  variant="warning"
  icon={<ClockIcon className="w-5 h-5" />}
>
  Limited availability - book soon!
</Alert>

// Info alert without icon
<Alert variant="info" icon={false}>
  Kitchen closes at 9:00 PM on Sundays
</Alert>
```

### Badge Component

Badges highlight status or categorize items:

```tsx
// Status badges
<Badge variant="success" dot>
  Available
</Badge>

// Count badge
<Badge variant="primary" size="sm">
  12
</Badge>

// Category tags
<div className="flex gap-2">
  <Badge>All</Badge>
  <Badge variant="primary">Featured</Badge>
  <Badge variant="secondary">Popular</Badge>
</div>
```

## Composition Patterns

### Form Example

```tsx
function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Reservation</CardTitle>
      </CardHeader>
      <CardBody>
        <form className="space-y-4">
          <Input 
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
            required
          />
          
          <Input 
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            
            <Input 
              label="Number of Guests"
              type="number"
              min="1"
              max="20"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              required
            />
          </div>
          
          <Textarea 
            label="Special Requests"
            placeholder="Any dietary requirements or special occasions?"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={3}
          />
        </form>
      </CardBody>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Book Table
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### List with Cards

```tsx
function EventList({ events }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} variant="elevated">
          <CardBody>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{event.title}</h3>
              <Badge variant={event.featured ? 'primary' : 'default'}>
                {event.category}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{event.date}</span>
              <Button size="sm" variant="primary">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
```

## Styling Guidelines

### Using Tailwind with Components

Components are designed to work seamlessly with Tailwind CSS:

```tsx
// Adding custom styles
<Button className="shadow-lg hover:shadow-xl transition-shadow">
  Enhanced Button
</Button>

// Responsive sizing
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardBody>Responsive card</CardBody>
</Card>

// Custom color overrides
<Alert className="bg-blue-50 text-blue-900 border-blue-200">
  Custom styled alert
</Alert>
```

### Theme Customization

Components use CSS variables that can be customized:

```css
:root {
  --anchor-gold: #FFD700;
  --anchor-gold-light: #FFED4E;
  --anchor-green: #2E7D32;
  --anchor-green-light: #4CAF50;
}
```

## Accessibility Best Practices

### Keyboard Navigation

All interactive components support keyboard navigation:

```tsx
// Ensure proper tab order
<div>
  <Input label="First Name" tabIndex={1} />
  <Input label="Last Name" tabIndex={2} />
  <Button tabIndex={3}>Submit</Button>
</div>
```

### Screen Reader Support

```tsx
// Provide context for screen readers
<Button aria-label="Close dialog" variant="ghost">
  <XIcon className="w-5 h-5" aria-hidden="true" />
</Button>

// Announce dynamic content
<Alert role="alert" aria-live="polite">
  {message}
</Alert>
```

### Focus Management

```tsx
// Trap focus in modals
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus()
  }
}, [isOpen])
```

## Migration Guide

### Replacing Old Components

#### Before (Old CallToAction)
```tsx
<CallToAction 
  href="/book"
  variant="primary"
  size="lg"
>
  Book Now
</CallToAction>
```

#### After (New Button)
```tsx
<Button 
  variant="primary"
  size="lg"
  onClick={() => router.push('/book')}
>
  Book Now
</Button>
```

### Updating Form Components

#### Before
```tsx
<input 
  type="text" 
  className="px-4 py-2 border rounded-lg"
  placeholder="Enter name"
/>
{error && <p className="text-red-500">{error}</p>}
```

#### After
```tsx
<Input 
  label="Name"
  placeholder="Enter name"
  error={error}
/>
```

### Card Migration

#### Before
```tsx
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-lg font-bold mb-2">Title</h3>
  <p>Content</p>
</div>
```

#### After
```tsx
<Card variant="elevated">
  <CardBody>
    <CardTitle>Title</CardTitle>
    <p>Content</p>
  </CardBody>
</Card>
```

## Best Practices Summary

1. **Use semantic component names** - Choose the right component for the job
2. **Leverage composition** - Build complex UIs from simple components
3. **Maintain consistency** - Use the same patterns throughout the app
4. **Prioritize accessibility** - Always include proper ARIA attributes
5. **Test interactions** - Ensure components work with keyboard and screen readers
6. **Document edge cases** - Note any special behavior or limitations

## Need Help?

- Check component stories in Storybook: `npm run storybook`
- Review type definitions in `components/ui/types.ts`
- See implementation examples in the codebase
- Consult the component standards document