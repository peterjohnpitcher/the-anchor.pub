# Kitchen Closure API Update Implementation Plan

## Executive Summary
The business hours API has been updated to provide more granular kitchen closure information. This plan outlines the necessary changes to ensure customers clearly understand when the bar is open but the kitchen is closed.

## New API Kitchen Status Formats

The API now returns three different kitchen status formats:

1. **Kitchen Open with Times**
   ```json
   "kitchen": {
     "opens": "12:00:00",
     "closes": "17:00:00"
   }
   ```

2. **Kitchen Closed but Venue Open**
   ```json
   "kitchen": {
     "is_closed": true
   }
   ```

3. **No Kitchen Service**
   ```json
   "kitchen": null
   ```

## Implementation Plan

### Phase 1: Update TypeScript Interfaces and Type Guards

#### 1.1 Update BusinessHours Interface (`/lib/api.ts`)
```typescript
// Current
kitchen?: {
  opens: string
  closes: string
} | null

// Updated
kitchen?: {
  opens: string
  closes: string
} | {
  is_closed: true
} | null
```

#### 1.2 Create Type Guards
```typescript
// Type guard for open kitchen
export const isKitchenOpen = (kitchen: any): kitchen is { opens: string; closes: string } => {
  return kitchen && typeof kitchen === 'object' && 'opens' in kitchen && 'closes' in kitchen
}

// Type guard for closed kitchen
export const isKitchenClosed = (kitchen: any): kitchen is { is_closed: true } => {
  return kitchen && typeof kitchen === 'object' && 'is_closed' in kitchen
}

// Helper to get kitchen status
export const getKitchenStatus = (kitchen: any): 'open' | 'closed' | 'no-service' => {
  if (isKitchenOpen(kitchen)) return 'open'
  if (isKitchenClosed(kitchen)) return 'closed'
  return 'no-service'
}
```

### Phase 2: Update Core Components

#### 2.1 StatusBar Component (`/components/StatusBar.tsx`)
**Current Display**: "Open • Kitchen: 12pm - 9pm" or "Open • Kitchen closed"

**Updated Display Options**:
- Bar & Kitchen Open: "Open • Kitchen: 12pm - 9pm"
- Bar Open, Kitchen Closed: "Bar Open • Kitchen Closed"
- Bar Open, No Kitchen Service: "Open • No Kitchen Service Today"
- Everything Closed: "Closed"

**Key Changes**:
- Update `getKitchenHours()` function to handle all three formats
- Add clear messaging when bar is open but kitchen is closed
- Use different colors/icons to distinguish states

#### 2.2 BusinessHours Component (`/components/BusinessHours.tsx`)
**Updates**:
- Modify kitchen status calculation to use new type guards
- Update display logic for all three variants (default, condensed, full)
- Add visual indicators (icons/colors) for kitchen closed states
- Show clear message: "Bar open but kitchen closed" when applicable

#### 2.3 BookingDatePicker Component (`/components/features/TableBooking/BookingDatePicker.tsx`)
**Critical Updates**:
- Update `isDateTimeAvailable` to properly check kitchen status
- Modify availability messaging to be clearer:
  - "Kitchen closed but bar is open - drinks only"
  - "No food service available at this time"
- Update `getKitchenHours` to handle new formats
- Ensure booking flow clearly indicates when only drinks are available

### Phase 3: Update API Routes

#### 3.1 Business Hours Routes
- `/app/api/business-hours/route.ts`
- `/app/api/business/hours/route.ts` (duplicate to be removed)

**Updates**:
- Ensure routes properly pass through the new kitchen format
- Add response validation to ensure format consistency

### Phase 4: User Experience Improvements

#### 4.1 Clear Visual Indicators
- **Green**: Both bar and kitchen open
- **Amber**: Bar open, kitchen closed
- **Red**: Everything closed

#### 4.2 Messaging Guidelines
| Scenario | StatusBar | BusinessHours | Booking Form |
|----------|-----------|---------------|--------------|
| Bar & Kitchen Open | "Open • Kitchen: 12-9pm" | "Kitchen: 12:00pm - 9:00pm" | "Book a table" |
| Bar Open, Kitchen Closed | "Bar Open • Kitchen Closed" | "Bar: Open<br>Kitchen: Closed (drinks only)" | "Kitchen closed - drinks service only" |
| Bar Open, No Kitchen | "Open • No Kitchen Service" | "Bar: Open<br>Kitchen: No service today" | "No food service available" |

#### 4.3 Booking Flow Enhancements
- Add warning banner when selecting times with kitchen closed
- Update confirmation to clearly state "drinks only" bookings
- Consider adding booking type selection: "Food & Drinks" vs "Drinks Only"

### Phase 5: Testing Scenarios

#### 5.1 Unit Tests
- Test all three kitchen formats in type guards
- Test status calculation logic
- Test display formatting for each scenario

#### 5.2 Integration Tests
- Test API response handling with each format
- Test booking availability calculations
- Test real-time status updates

#### 5.3 Manual Testing Checklist
- [ ] StatusBar displays correctly for all three states
- [ ] BusinessHours shows appropriate messaging
- [ ] Booking form prevents food bookings when kitchen closed
- [ ] Mobile view maintains clarity
- [ ] All components handle timezone correctly

### Phase 6: Implementation Order

1. **Day 1**: Update TypeScript interfaces and create type guards
2. **Day 2**: Update StatusBar and BusinessHours components
3. **Day 3**: Update booking components and availability logic
4. **Day 4**: Update API routes and test integration
5. **Day 5**: Comprehensive testing and bug fixes

### Additional Considerations

#### Mobile Responsiveness
- Ensure kitchen status is clearly visible on mobile
- Consider abbreviated messages for small screens
- Test touch interactions with new UI elements

#### Accessibility
- Add appropriate ARIA labels for status indicators
- Ensure color is not the only differentiator
- Screen reader announcements for status changes

#### Analytics
- Track how often users encounter "kitchen closed" states
- Monitor booking abandonment when kitchen is closed
- Track clicks on "drinks only" bookings

### Rollback Plan
- Keep existing interfaces with deprecation warnings
- Implement feature flag to toggle between old/new behavior
- Monitor error rates during rollout

## Success Metrics
- Zero confusion about kitchen availability
- Reduced support queries about food service
- Maintained or improved booking conversion
- Clear understanding of service availability at all times

## Next Steps
1. Review and approve this plan
2. Create feature branch for implementation
3. Begin Phase 1 implementation
4. Daily progress updates during implementation