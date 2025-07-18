# Component Migration Checklist

## Overview

This checklist guides the migration from legacy components to the new standardized component library. Follow these steps to ensure a smooth transition.

## Pre-Migration Checklist

- [ ] Review the [Component Usage Guide](./COMPONENT-USAGE-GUIDE.md)
- [ ] Ensure all tests are passing (`npm test`)
- [ ] Create a backup branch for rollback if needed
- [ ] Review the component playground at `/components` to understand new components

## Component Migration Map

### 1. Button Components
- [ ] Replace `CallToAction` → `Button`
- [ ] Replace inline button styles → `Button` with variants
- [ ] Replace `<a>` styled as buttons → `Button as="a"`

### 2. Card Components
- [ ] Replace custom card divs → `Card` with sub-components
- [ ] Replace `InfoBox` → `Card` with appropriate variant
- [ ] Replace `FeatureCard` → `Card` with custom content

### 3. Alert/Notification Components
- [ ] Replace `AlertBox` → `Alert`
- [ ] Replace custom error messages → `Alert variant="error"`
- [ ] Replace success messages → `Alert variant="success"`

### 4. Form Components
- [ ] Replace raw `<input>` → `Input` component
- [ ] Replace raw `<select>` → `Select` component
- [ ] Replace raw `<textarea>` → `Input as="textarea"` or `Textarea`
- [ ] Replace checkbox groups → `CheckboxGroup`
- [ ] Replace radio buttons → `RadioGroup`
- [ ] Wrap forms in `Form` component for validation

### 5. Layout Components
- [ ] Replace container divs → `Container`
- [ ] Replace section wrappers → `Section`
- [ ] Replace custom grids → `Grid` with `GridItem`

### 6. Navigation Components
- [ ] Replace breadcrumb implementations → `Breadcrumb`
- [ ] Replace tab interfaces → `Tabs` compound component
- [ ] Update navigation bars → `NavBar`

### 7. Loading States
- [ ] Replace loading spinners → `Spinner`
- [ ] Replace loading placeholders → `Skeleton`
- [ ] Replace full-page loaders → `LoadingOverlay`

### 8. Overlays
- [ ] Replace modals/dialogs → `Modal`
- [ ] Replace tooltips → `Tooltip`
- [ ] Replace popovers → `Popover`
- [ ] Implement `ToastProvider` and replace notifications → `useToast`

## Migration Steps by Page

### Homepage (`app/page.tsx`)

```tsx
// Before
<div className="container mx-auto px-4">
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Click me
  </button>
</div>

// After
<Container>
  <Button variant="primary">Click me</Button>
</Container>
```

### Event Pages

1. **Event Listing (`app/events/page.tsx`)**
   - [ ] Replace event cards with `Card` component
   - [ ] Use `Grid` for event layout
   - [ ] Replace CTAs with `Button`

2. **Event Details (`app/events/[slug]/page.tsx`)**
   - [ ] Use `Container` and `Section` for layout
   - [ ] Replace booking form with new form components
   - [ ] Use `Alert` for booking confirmations

### Menu Pages

1. **Menu Display (`app/menu/page.tsx`)**
   - [ ] Use `Tabs` for menu categories
   - [ ] Replace menu items with `Card` components
   - [ ] Use `Badge` for dietary information

### Blog Pages

1. **Blog Listing (`app/blog/page.tsx`)**
   - [ ] Replace blog cards with standardized `Card`
   - [ ] Use `Grid` for blog post layout

2. **Blog Post (`app/blog/[slug]/page.tsx`)**
   - [ ] Use `Container` for content width
   - [ ] Replace inline styles with utility classes

## Common Patterns to Replace

### Replace Inline Styles

```tsx
// Before
<div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
  Content
</div>

// After
<Card variant="elevated" padding="md">
  <CardBody>Content</CardBody>
</Card>
```

### Replace Custom Loading States

```tsx
// Before
{loading ? (
  <div className="animate-spin">Loading...</div>
) : (
  <Content />
)}

// After
{loading ? (
  <Spinner size="lg" />
) : (
  <Content />
)}
```

### Replace Form Patterns

```tsx
// Before
<form onSubmit={handleSubmit}>
  <input type="email" required />
  <button type="submit">Submit</button>
</form>

// After
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email" required>
    <Input type="email" name="email" />
  </FormField>
  <Button type="submit" variant="primary">Submit</Button>
</Form>
```

## Testing After Migration

### Component Testing
- [ ] Run all component tests: `npm test`
- [ ] Check for console errors in development
- [ ] Verify all interactive elements work

### Visual Testing
- [ ] Compare before/after screenshots
- [ ] Check responsive behavior
- [ ] Verify animations and transitions

### Accessibility Testing
- [ ] Test keyboard navigation
- [ ] Run accessibility audit (Lighthouse)
- [ ] Test with screen reader

### Performance Testing
- [ ] Check bundle size didn't increase significantly
- [ ] Verify Core Web Vitals metrics
- [ ] Test on slower devices

## Cleanup Tasks

1. **Remove Old Components**
   - [ ] Delete deprecated component files
   - [ ] Remove unused CSS modules
   - [ ] Clean up unused dependencies

2. **Update Documentation**
   - [ ] Update README with new component info
   - [ ] Document any custom patterns
   - [ ] Update deployment guides

3. **Code Quality**
   - [ ] Run linter: `npm run lint`
   - [ ] Fix any TypeScript errors
   - [ ] Remove commented-out code

## Rollback Plan

If issues arise during migration:

1. **Immediate Rollback**
   ```bash
   git checkout backup-branch
   git push --force-with-lease
   ```

2. **Partial Rollback**
   - Revert specific components while keeping others
   - Use feature flags to toggle between old/new

3. **Hotfix Strategy**
   - Keep old components temporarily
   - Gradually phase out over multiple deployments

## Post-Migration Tasks

- [ ] Monitor error tracking for new issues
- [ ] Gather team feedback on new components
- [ ] Document lessons learned
- [ ] Plan future component additions
- [ ] Set up component usage analytics

## Success Criteria

Migration is complete when:
- ✅ All pages use new components
- ✅ No console errors in production
- ✅ All tests passing
- ✅ Performance metrics maintained or improved
- ✅ Team trained on new components
- ✅ Documentation updated

## Support

- Component Usage Guide: `/docs/COMPONENT-USAGE-GUIDE.md`
- Component Playground: `/components`
- Component Standards: `/docs/COMPONENT-STANDARDS-2025.md`

---

Last Updated: 2025-01-17