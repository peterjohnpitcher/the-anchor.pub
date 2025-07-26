# Kitchen & Bar Hours Separation Update Summary

## Overview
Updated the StatusBar and BusinessHours components to always show bar and kitchen hours separately, with individual countdown timers for each.

## Changes Made

### 1. StatusBar Component
- **Before**: Single status showing either bar or combined status
- **After**: Always shows both "Bar: closes in Xh Xm" and "Kitchen: closes in Xh Xm"
- **Visual Changes**:
  - Green background when both open
  - Amber background when bar open but kitchen closed
  - Separate status indicators for each
- **All Variants Updated**:
  - Default: Full size with both statuses
  - Compact: Smaller text but both statuses
  - Navigation: Header version with both statuses

### 2. BusinessHours Component  
- **Before**: Kitchen hours shown as subtext under bar hours
- **After**: Separate labeled rows for Bar and Kitchen
- **Display Format**:
  ```
  Monday
  Bar: 4pm - 10pm
  Kitchen: No service
  
  Tuesday  
  Bar: 12pm - 10pm
  Kitchen: 12pm - 9pm
  ```
- **All Variants Updated**:
  - Dark: Shows separate rows with proper coloring
  - Condensed: Compact view with separate rows
  - Full: Detailed view with separate rows

### 3. Header Integration
- The navigation variant of StatusBar is used in the header
- Now shows the same separated format as the main StatusBar
- Automatically updates via the same component

## Visual States

### Kitchen Status Display
1. **Kitchen Open**: Shows hours (e.g., "12pm - 9pm")
2. **Kitchen Closed**: Shows "Closed" in amber
3. **No Kitchen Service**: Shows "No service" in gray

### StatusBar Background Colors
1. **Both Open**: Green background
2. **Bar Open, Kitchen Closed**: Amber background  
3. **Both Closed**: Green background with closed indicators

## Example Displays

### StatusBar Examples
- Both open: "Bar: closes in 2h 30m • Kitchen: closes in 1h 30m"
- Kitchen closed: "Bar: closes in 2h 30m • Kitchen: Closed"
- Monday: "Bar: closes in 2h 30m • Kitchen: No service"

### BusinessHours Examples
Each day shows:
```
Bar:     12pm - 10pm
Kitchen: 12pm - 9pm
```

Or when kitchen is closed:
```
Bar:     4pm - 10pm  
Kitchen: Closed
```

## Technical Details
- Uses the new kitchen status type guards
- Handles all three kitchen formats from the API
- Maintains responsive design with proper mobile formatting
- Preserves all existing functionality while adding separation