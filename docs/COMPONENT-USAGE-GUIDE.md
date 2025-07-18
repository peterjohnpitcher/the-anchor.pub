# Component Usage Guide

This guide provides practical examples and best practices for using The Anchor standardized React components.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Core Components](#core-components)
3. [Layout Components](#layout-components)
4. [Navigation Components](#navigation-components)
5. [Form Components](#form-components)
6. [Feature Components](#feature-components)
7. [Composition Patterns](#composition-patterns)
8. [Styling Guidelines](#styling-guidelines)
9. [Accessibility Best Practices](#accessibility-best-practices)
10. [Migration Guide](#migration-guide)

## Getting Started

### Importing Components

All UI components are exported from a central location for convenience:

```tsx
// Import core components
import { Button, Card, Input, Alert, Badge } from '@/components/ui'

// Import layout components
import { Container, Section, Grid, GridItem } from '@/components/ui'

// Import navigation components
import { Tabs, Breadcrumb, NavBar } from '@/components/ui'

// Import form components
import { Form, Select, Checkbox, Radio, DatePicker, Switch } from '@/components/ui'

// Import overlay components
import { Modal, Toast, Tooltip, Popover, useToast, ToastProvider } from '@/components/ui'

// Import feedback/loading components
import { Spinner, Skeleton, LoadingOverlay } from '@/components/ui'

// Import component types
import type { ButtonProps, CardProps, FormProps, ModalProps, ToastProps } from '@/components/ui'
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

## Core Components

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
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button variant="primary" size="sm">Book Now</Button>
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
<Badge variant="success" dot>Available</Badge>

// Count badge
<Badge variant="primary" size="sm">12</Badge>

// Category tags
<div className="flex gap-2">
  <Badge>All</Badge>
  <Badge variant="primary">Featured</Badge>
  <Badge variant="secondary">Popular</Badge>
</div>
```

## Layout Components

### Container & Section

Container and Section components provide consistent page structure:

```tsx
// Basic container
<Container size="lg">
  <h1>Page Title</h1>
  <p>Content goes here</p>
</Container>

// Section with spacing
<Section spacing="lg" className="bg-gray-50">
  <Container size="md">
    <h2>Section Title</h2>
    <p>Section content</p>
  </Container>
</Section>

// Nested sections with different sizes
<Section spacing="md">
  <Container size="xl">
    <Grid cols={3} gap="lg">
      {/* Grid content */}
    </Grid>
  </Container>
</Section>
```

### Grid System

The Grid component creates responsive layouts:

```tsx
// Basic grid
<Grid cols={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Responsive grid with custom items
<Grid cols={4} gap="lg" align="start">
  <GridItem span={2}>
    <Card>Wide item spanning 2 columns</Card>
  </GridItem>
  <GridItem>
    <Card>Normal item</Card>
  </GridItem>
  <GridItem>
    <Card>Normal item</Card>
  </GridItem>
  <GridItem span="full">
    <Card>Full width item</Card>
  </GridItem>
</Grid>

// Auto-fit grid
<Grid cols="auto" gap="sm">
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Grid>
```

## Navigation Components

### Tabs

Create tabbed interfaces with the Tabs component:

```tsx
// Basic tabs
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="menu">Menu</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p>Overview content</p>
  </TabsContent>
  <TabsContent value="menu">
    <p>Menu content</p>
  </TabsContent>
  <TabsContent value="reviews">
    <p>Reviews content</p>
  </TabsContent>
</Tabs>

// Controlled tabs with different variants
<Tabs 
  value={activeTab} 
  onValueChange={setActiveTab}
  variant="pills"
  size="lg"
>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Breadcrumb

Add navigation breadcrumbs:

```tsx
// Array-based breadcrumb
<Breadcrumb 
  items={[
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', current: true }
  ]}
/>

// Composition-based breadcrumb
<nav aria-label="Breadcrumb">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="/events">Events</BreadcrumbLink>
      <BreadcrumbSeparator>→</BreadcrumbSeparator>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbPage>Summer Festival</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</nav>
```

### NavBar

Modern navigation bar component:

```tsx
// Basic navbar
<NavBar
  logo={{
    src: '/logo.png',
    alt: 'The Anchor',
    width: 150,
    height: 60
  }}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' }
  ]}
  sticky
/>

// NavBar with actions and badges
<NavBar
  variant="light"
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Orders', href: '/orders', badge: 3 },
    { label: 'Settings', href: '/settings' }
  ]}
  actions={
    <Button variant="primary" size="sm">
      Book Table
    </Button>
  }
/>
```

## Form Components

### Form Wrapper

The Form component provides context and validation:

```tsx
// Basic form
<Form onSubmit={async (formData) => {
  // Handle form submission
  console.log(Object.fromEntries(formData))
}}>
  <FormField name="email" label="Email" required>
    <Input type="email" name="email" />
  </FormField>
  
  <FormField name="message" label="Message">
    <Textarea name="message" />
  </FormField>
  
  <Button type="submit">Submit</Button>
</Form>

// Form with sections
<Form onSubmit={handleSubmit}>
  <FormSection 
    title="Personal Information" 
    description="Tell us about yourself"
  >
    <FormField name="firstName" label="First Name" required>
      <Input name="firstName" />
    </FormField>
    
    <FormField name="lastName" label="Last Name" required>
      <Input name="lastName" />
    </FormField>
  </FormSection>
  
  <FormSection title="Preferences">
    <FormField name="newsletter">
      <Checkbox name="newsletter" label="Subscribe to newsletter" />
    </FormField>
  </FormSection>
  
  <Button type="submit">Save</Button>
</Form>
```

### Select Components

Select dropdowns with search functionality:

```tsx
// Basic select
<Select
  label="Country"
  options={[
    { value: 'uk', label: 'United Kingdom' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ]}
  placeholder="Choose a country"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
/>

// Searchable select
<SearchableSelect
  label="Choose a product"
  options={products.map(p => ({
    value: p.id,
    label: p.name
  }))}
  value={selectedProduct}
  onChange={(e) => setSelectedProduct(e.target.value)}
  onSearch={handleSearch}
  loading={isSearching}
/>
```

### Checkbox & Radio

Checkbox and radio components with groups:

```tsx
// Checkbox group
<CheckboxGroup
  label="Select amenities"
  options={[
    { value: 'wifi', label: 'Free WiFi' },
    { value: 'parking', label: 'Free Parking' },
    { value: 'pool', label: 'Swimming Pool' },
    { value: 'gym', label: 'Gym', disabled: true }
  ]}
  value={selectedAmenities}
  onChange={setSelectedAmenities}
  orientation="vertical"
/>

// Radio group
<RadioGroup
  name="payment"
  label="Payment Method"
  options={[
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'cash', label: 'Cash on Delivery' }
  ]}
  value={paymentMethod}
  onChange={setPaymentMethod}
/>

// Card radio for visual selection
<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <div className="grid grid-cols-3 gap-4">
    <CardRadio
      name="plan"
      value="basic"
      label="Basic"
      description="Essential features"
      icon={<BasicIcon />}
      checked={plan === 'basic'}
      onChange={() => setPlan('basic')}
    />
    <CardRadio
      name="plan"
      value="pro"
      label="Pro"
      description="Advanced features"
      icon={<ProIcon />}
      checked={plan === 'pro'}
      onChange={() => setPlan('pro')}
    />
  </div>
</RadioGroup>
```

### Date & Time Pickers

Date and time selection components:

```tsx
// Date picker
<DatePicker
  label="Select Date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  minDate={today}
  maxDate={nextMonth}
/>

// Date range picker
<DateRangePicker
  label="Select Period"
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  minDate={today}
/>

// Time picker
<TimePicker
  label="Appointment Time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  min="09:00"
  max="17:00"
  step={900} // 15 minute intervals
/>

// DateTime picker
<DatePicker
  label="Event Date & Time"
  showTime
  value={eventDateTime}
  onChange={(e) => setEventDateTime(e.target.value)}
/>
```

### Switch Component

Toggle switches for boolean values:

```tsx
// Basic switch
<Switch
  label="Enable notifications"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>

// Switch with on/off labels
<Switch
  checked={isPublic}
  onChange={(e) => setIsPublic(e.target.checked)}
  onLabel="Public"
  offLabel="Private"
/>

// Switch group
<SwitchGroup
  label="Features"
  options={[
    { id: 'feature1', label: 'Dark Mode' },
    { id: 'feature2', label: 'Email Notifications' },
    { id: 'feature3', label: 'SMS Alerts', helperText: 'Standard rates apply' }
  ]}
  values={enabledFeatures}
  onChange={(id, checked) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [id]: checked
    }))
  }}
/>
```

## Overlay Components

### Modal

Modals provide a focused overlay for important content or actions:

```tsx
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui'

function DeleteConfirmModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <ModalHeader>
        <ModalTitle>Confirm Deletion</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}

// Full-featured modal
<Modal
  open={isOpen}
  onClose={handleClose}
  size="lg"
  closeOnEscape={false}
  closeOnBackdropClick={false}
  initialFocus={firstInputRef}
>
  <ModalHeader>
    <ModalTitle>Edit Profile</ModalTitle>
    <ModalDescription>
      Update your profile information below
    </ModalDescription>
  </ModalHeader>
  <ModalBody>
    <Form>
      <Input ref={firstInputRef} label="Name" />
      <Input label="Email" type="email" />
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
  </ModalFooter>
</Modal>
```

### Toast Notifications

Toasts provide brief, non-blocking feedback:

```tsx
// Setup in your app root
import { ToastProvider } from '@/components/ui'

function App() {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      {/* Your app content */}
    </ToastProvider>
  )
}

// Using toasts in components
import { useToast } from '@/components/ui'

function MyComponent() {
  const { toast } = useToast()
  
  const handleSuccess = () => {
    toast({
      variant: 'success',
      title: 'Changes saved',
      description: 'Your profile has been updated successfully.'
    })
  }
  
  const handleError = () => {
    toast({
      variant: 'error',
      title: 'Error occurred',
      description: 'Unable to save changes. Please try again.',
      duration: 10000 // Show for 10 seconds
    })
  }
  
  const handleAction = () => {
    toast({
      title: 'Item deleted',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo delete')
      }
    })
  }
  
  return (
    <div>
      <Button onClick={handleSuccess}>Show Success</Button>
      <Button onClick={handleError}>Show Error</Button>
      <Button onClick={handleAction}>Show with Action</Button>
    </div>
  )
}
```

### Tooltip

Tooltips provide contextual information on hover or focus:

```tsx
// Basic tooltip
<Tooltip content="This action cannot be undone">
  <Button variant="danger">Delete</Button>
</Tooltip>

// Tooltip with custom placement
<Tooltip 
  content="Click to copy to clipboard" 
  placement="right"
  variant="light"
>
  <button className="p-2">
    <CopyIcon />
  </button>
</Tooltip>

// Interactive tooltip with delay
<Tooltip
  content={
    <div>
      <p className="font-semibold">Keyboard Shortcuts</p>
      <p className="text-sm">Ctrl+C: Copy</p>
      <p className="text-sm">Ctrl+V: Paste</p>
    </div>
  }
  placement="bottom"
  delay={500}
  interactive
>
  <Button variant="ghost">Help</Button>
</Tooltip>

// Click-triggered tooltip
<Tooltip
  content="Settings menu"
  trigger="click"
  placement="bottom-start"
>
  <Button variant="ghost">
    <SettingsIcon />
  </Button>
</Tooltip>
```

### Popover

Popovers provide rich content in a floating overlay:

```tsx
import { Popover, PopoverHeader, PopoverBody } from '@/components/ui'

// Simple popover
<Popover
  content={
    <PopoverBody>
      <p>This is popover content with more details.</p>
    </PopoverBody>
  }
>
  <Button variant="ghost">More Info</Button>
</Popover>

// Complex popover with form
<Popover
  trigger="click"
  placement="bottom-start"
  sameWidth
  content={
    <>
      <PopoverHeader>
        <h3 className="font-semibold">Filter Options</h3>
      </PopoverHeader>
      <PopoverBody>
        <div className="space-y-2">
          <Checkbox label="Active only" />
          <Checkbox label="Include archived" />
          <Select
            label="Sort by"
            options={[
              { value: 'date', label: 'Date' },
              { value: 'name', label: 'Name' }
            ]}
          />
        </div>
      </PopoverBody>
      <PopoverFooter className="flex justify-end gap-2">
        <Button size="sm" variant="ghost">Reset</Button>
        <Button size="sm" variant="primary">Apply</Button>
      </PopoverFooter>
    </>
  }
>
  <Button variant="outline">
    <FilterIcon className="w-4 h-4 mr-2" />
    Filter
  </Button>
</Popover>

// Controlled popover
const [open, setOpen] = useState(false)

<Popover
  open={open}
  onOpenChange={setOpen}
  trigger="manual"
  content={<PopoverBody>Controlled content</PopoverBody>}
>
  <Button onClick={() => setOpen(!open)}>Toggle</Button>
</Popover>
```

## Loading & Feedback Components

### Spinner

Spinners indicate loading states:

```tsx
// Basic spinner
<Spinner />

// Different sizes and colors
<Spinner size="xs" color="secondary" />
<Spinner size="lg" color="white" />

// With loading text
<div className="flex flex-col items-center gap-2">
  <Spinner size="lg" />
  <p className="text-sm text-gray-600">Loading your data...</p>
</div>

// Inline spinner in button
<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Processing...
</Button>
```

### Skeleton

Skeletons provide loading placeholders:

```tsx
// Text skeleton
<Skeleton variant="text" count={3} />

// Custom skeleton layouts
<div className="space-y-4">
  <Skeleton variant="title" width="md" />
  <Skeleton variant="text" count={2} />
  <div className="flex gap-2">
    <Skeleton variant="rounded" width="sm" height="sm" />
    <Skeleton variant="rounded" width="sm" height="sm" />
  </div>
</div>

// Preset skeleton components
import { SkeletonCard, SkeletonTable, SkeletonAvatar } from '@/components/ui'

// Card skeleton
<SkeletonCard />

// Table skeleton
<SkeletonTable rows={5} columns={4} />

// Avatar skeleton
<div className="flex items-center gap-3">
  <SkeletonAvatar size="lg" />
  <div>
    <Skeleton variant="text" width="md" />
    <Skeleton variant="text" width="sm" className="mt-1" />
  </div>
</div>
```

### Loading Overlay

Loading overlays block interaction during async operations:

```tsx
// Basic loading overlay
<div className="relative">
  <LoadingOverlay visible={isLoading} />
  <div className="p-6">
    {/* Your content */}
  </div>
</div>

// Custom message and fullscreen
<LoadingOverlay 
  visible={isSaving}
  message="Saving your changes..."
  fullScreen
/>

// Without blur effect
<LoadingOverlay 
  visible={isLoading}
  blur={false}
  message="Loading data"
/>
```

## Feature Components

Refactored event booking component:

```tsx
import { EventBooking } from '@/components/features/EventBooking'

<EventBooking 
  event={{
    id: '123',
    name: 'Summer Jazz Night',
    date: '2024-07-20',
    remainingAttendeeCapacity: 15
  }}
/>
```

### MenuDisplay

Enhanced menu display component:

```tsx
import { MenuDisplay } from '@/components/features/MenuDisplay'

<MenuDisplay 
  menuData={{
    categories: menuCategories,
    kitchenHours: {
      'Mon-Fri': '12pm-9pm',
      'Sat-Sun': '11am-10pm'
    }
  }}
/>
```

### Gallery

New gallery component with lightbox:

```tsx
import { Gallery } from '@/components/features/Gallery'

<Gallery
  images={[
    { src: '/img1.jpg', alt: 'Interior', category: 'Interior' },
    { src: '/img2.jpg', alt: 'Food', category: 'Food' },
    { src: '/img3.jpg', alt: 'Events', category: 'Events' }
  ]}
  columns={3}
  showFilter
  showCaptions
/>
```

## Composition Patterns

### Complete Form Example

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
        <Form onSubmit={async (data) => {
          // Validate and submit
          const result = await submitBooking(data)
          if (result.success) {
            // Handle success
          }
        }}>
          <FormSection>
            <Grid cols={2} gap="md">
              <FormField name="name" label="Full Name" required>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </FormField>
              
              <FormField name="email" label="Email" required>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </FormField>
              
              <FormField name="date" label="Date" required>
                <DatePicker 
                  name="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  minDate={new Date().toISOString().split('T')[0]}
                />
              </FormField>
              
              <FormField name="guests" label="Number of Guests" required>
                <Select
                  name="guests"
                  options={[
                    { value: '1', label: '1 Guest' },
                    { value: '2', label: '2 Guests' },
                    { value: '3', label: '3 Guests' },
                    { value: '4', label: '4 Guests' },
                    { value: '5+', label: '5+ Guests' }
                  ]}
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                />
              </FormField>
            </Grid>
            
            <FormField name="notes" label="Special Requests">
              <Textarea 
                name="notes"
                rows={3}
                placeholder="Any dietary requirements or special occasions?"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </FormField>
          </FormSection>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Book Table
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
```

### Dashboard Layout

```tsx
function DashboardLayout({ children }) {
  return (
    <>
      <NavBar
        variant="light"
        sticky
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Orders', href: '/orders', badge: newOrders },
          { label: 'Menu', href: '/menu' },
          { label: 'Settings', href: '/settings' }
        ]}
        actions={
          <div className="flex items-center gap-4">
            <Badge variant="success" dot>Online</Badge>
            <Button variant="ghost" size="sm">
              <UserIcon className="w-5 h-5" />
            </Button>
          </div>
        }
      />
      
      <Section spacing="lg">
        <Container size="xl">
          <Breadcrumb 
            items={breadcrumbItems}
            showHome
          />
          
          {children}
        </Container>
      </Section>
    </>
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

### Layout Migration

#### Before
```tsx
<div className="container mx-auto px-4">
  <div className="py-12">
    {/* Content */}
  </div>
</div>
```

#### After
```tsx
<Section spacing="md">
  <Container>
    {/* Content */}
  </Container>
</Section>
```

## Form Validation Example

Using the validation utilities:

```tsx
import { validateForm, commonRules } from '@/lib/form-validation'

function ContactForm() {
  const [errors, setErrors] = useState({})
  
  const validationRules = {
    email: commonRules.email,
    phone: commonRules.phone,
    message: {
      required: 'Message is required',
      minLength: { value: 10, message: 'Message too short' }
    }
  }
  
  const handleSubmit = async (formData) => {
    const validationErrors = validateForm(formData, validationRules)
    
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, err) => ({
        ...acc,
        [err.field]: err.message
      }), {})
      setErrors(errorMap)
      return
    }
    
    // Submit form
    await submitForm(formData)
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="email" label="Email" error={errors.email}>
        <Input type="email" name="email" />
      </FormField>
      
      <FormField name="phone" label="Phone" error={errors.phone}>
        <Input type="tel" name="phone" />
      </FormField>
      
      <FormField name="message" label="Message" error={errors.message}>
        <Textarea name="message" rows={5} />
      </FormField>
      
      <Button type="submit">Send Message</Button>
    </Form>
  )
}
```

## Best Practices Summary

1. **Use semantic component names** - Choose the right component for the job
2. **Leverage composition** - Build complex UIs from simple components
3. **Maintain consistency** - Use the same patterns throughout the app
4. **Prioritize accessibility** - Always include proper ARIA attributes
5. **Test interactions** - Ensure components work with keyboard and screen readers
6. **Document edge cases** - Note any special behavior or limitations
7. **Validate forms properly** - Use the provided validation utilities
8. **Handle loading states** - Show appropriate feedback during async operations
9. **Manage focus properly** - Especially important for modals and popovers
10. **Provide feedback** - Use toasts for actions, tooltips for guidance

## Need Help?

- Check component stories in Storybook: `npm run storybook`
- Review type definitions in `components/ui/types.ts`
- See implementation examples in the codebase
- Consult the component standards document