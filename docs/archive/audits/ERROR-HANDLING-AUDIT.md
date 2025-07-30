# Error Handling Audit Report

This document contains a comprehensive audit of all error handling patterns in the codebase, identifying user-facing error messages that could be improved.

## Summary of Findings

Found multiple patterns of error handling across the codebase:
- Generic error messages that don't provide actionable guidance
- Technical error messages exposed to users
- Inconsistent error messaging patterns
- Missing retry mechanisms in some components
- Some errors fail silently without user notification

## Error Handling Patterns Found

### 1. Generic "Unable to load" Messages

These provide minimal context and no actionable steps:

#### Components with Generic Loading Errors:
- **EventsToday.tsx**: `setError('Unable to load events')`
- **NextEvent.tsx**: `setError('Unable to load event information')`
- **BusinessHours.tsx**: `setError('Unable to load business hours')`
- **FlightStatus.tsx**: `setError('Unable to load flight information')`
- **Weather.tsx**: `setError('Unable to load weather')`
- **UpcomingEvents.tsx**: `Unable to load upcoming events at the moment.`
- **FilteredUpcomingEvents.tsx**: `Unable to load upcoming events at the moment.`

#### API Routes with Generic Errors:
- **api/business-hours/route.ts**: `{ error: 'Unable to load business hours' }`
- **api/weather/route.ts**: `{ error: 'Unable to load weather' }`

### 2. Technical Error Messages

These expose technical details that users may not understand:

#### API Error Messages:
- **api/events/route.ts**: `{ error: 'Failed to fetch events' }`
- **api/events/[id]/route.ts**: `{ error: 'Failed to fetch event' }`
- **api/event-categories/route.ts**: `{ error: 'Failed to fetch event categories' }`
- **api/events/[id]/availability/route.ts**: `{ error: 'Failed to check availability' }`
- **api/bookings/initiate/route.ts**: `{ error: 'Failed to initiate booking' }`
- **api/business-hours/route.ts**: `Failed to fetch business hours` (thrown error)

#### Console Error Logs:
- **lib/api.ts**: Multiple `console.error('Failed to fetch...')` messages
- **lib/flights.ts**: `console.error('Failed to fetch departures/arrivals:')`

### 3. Booking-Related Errors

More specific but could be improved:

#### EventBooking Components:
- **EventBooking.tsx & features/EventBooking.tsx**:
  - `'Please enter your mobile number'`
  - `'Please enter a valid UK mobile number'`
  - `'Unable to initiate booking. Please try again or call us.'`
  - `'Unable to process your booking. Please try again or call us at 01753 682707.'`
  - `'There is a configuration issue. Please call us at 01753 682707 to book.'`

### 4. Silent Failures

Components that fail without user notification:

- **NextEventServer.tsx**: Returns `null` on error with no user feedback
- **EventCategories.tsx**: Returns `null` on error
- **StatusBar.tsx**: Catches error but provides no user feedback
- **CategoryFilter.tsx**: Only logs to console: `console.error('Failed to load categories:')`

### 5. Spelling/Grammar Issues

- **lib/api.ts**: `console.error('Failed to check event availability:')` (should be "check")
- **EventAvailability.tsx**: `// Error: Failed to check availability` (should be "check")

### 6. Components with Better Error Handling

These show good practices that should be replicated:

- **UpcomingEvents.tsx & FilteredUpcomingEvents.tsx**: 
  - Provides context: "Unable to load upcoming events at the moment."
  - Offers alternative: "Please try again later or contact us at 01753 682707."

## Recommendations for Improvement

### 1. Standardize Error Messages

Create consistent, user-friendly error messages:

```typescript
// Instead of: "Unable to load events"
// Use: "We couldn't load the events right now. Please refresh the page or try again in a few moments."

// Instead of: "Failed to fetch events"
// Use: "Something went wrong while loading events. Please check your connection and try again."
```

### 2. Add Retry Mechanisms

Implement retry buttons for recoverable errors:

```typescript
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  showContactInfo?: boolean;
}

function ErrorState({ message, onRetry, showContactInfo = true }: ErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-700 mb-4">{message}</p>
      <button onClick={onRetry} className="btn-primary mb-2">
        Try Again
      </button>
      {showContactInfo && (
        <p className="text-gray-600 text-sm">
          Still having issues? Call us at 01753 682707
        </p>
      )}
    </div>
  );
}
```

### 3. Context-Specific Error Messages

Provide specific guidance based on the error context:

```typescript
// Weather component
"We couldn't get the current weather. Don't worry, we're still open during our regular hours!"

// Flight status
"Flight information is temporarily unavailable. For real-time updates, check the Heathrow Airport website."

// Event booking
"We couldn't process your booking online. Please call us at 01753 682707 and we'll reserve your spot right away."
```

### 4. Progressive Error Disclosure

Show simple messages to users with optional technical details:

```typescript
interface ErrorDisplayProps {
  userMessage: string;
  technicalDetails?: string;
  showDetails?: boolean;
}

function ErrorDisplay({ userMessage, technicalDetails, showDetails = false }: ErrorDisplayProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="error-container">
      <p>{userMessage}</p>
      {showDetails && technicalDetails && (
        <>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide' : 'Show'} details
          </button>
          {expanded && <pre className="text-xs">{technicalDetails}</pre>}
        </>
      )}
    </div>
  );
}
```

### 5. Error Recovery Strategies

Implement fallback content where appropriate:

```typescript
// EventsToday already does this well:
} catch (err) {
  setError('Unable to load events')
  // Use fallback events on error
  setEvents(fallbackEvents)
}
```

### 6. Consistent Error Handling Hook

Create a reusable error handling hook:

```typescript
function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const handleError = useCallback((error: unknown, context: string) => {
    const userMessage = getUserFriendlyMessage(error, context);
    setError(userMessage);
    
    // Log technical details for debugging
    console.error(`Error in ${context}:`, error);
    
    // Track error in analytics
    analytics.error(context, error);
  }, []);
  
  const retry = useCallback(() => {
    setError(null);
    setRetryCount(prev => prev + 1);
  }, []);
  
  return { error, handleError, retry, retryCount };
}
```

## Priority Fixes

1. **High Priority**: Fix booking flow errors (EventBooking components) as these directly impact revenue
2. **Medium Priority**: Improve loading error messages in frequently used components (Events, Weather, BusinessHours)
3. **Low Priority**: Add retry mechanisms and improve error messages in less critical components

## Next Steps

1. Create a standardized error message dictionary
2. Implement a consistent ErrorBoundary component
3. Add retry mechanisms to all data-fetching components
4. Review and update all error messages to be user-friendly
5. Ensure all errors provide actionable next steps
6. Fix spelling errors ("cheque" → "check")
7. Add error tracking/monitoring to identify most common failures