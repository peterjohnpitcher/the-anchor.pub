/**
 * Time utilities for handling API time formats
 */

/**
 * Parse time string from API format (HH:mm:ss) to hour and minute numbers
 * @param timeString - Time in format "HH:mm:ss" or "HH:mm"
 * @returns Object with hour and minute as numbers
 */
export function parseApiTime(timeString: string): { hour: number; minute: number } {
  const parts = timeString.split(':')
  return {
    hour: parseInt(parts[0], 10),
    minute: parseInt(parts[1], 10)
  }
}

/**
 * Convert time to decimal hours for easier calculations
 * @param timeString - Time in format "HH:mm:ss" or "HH:mm"
 * @returns Time as decimal hours (e.g., 14:30 = 14.5)
 */
export function timeToDecimalHours(timeString: string): number {
  const { hour, minute } = parseApiTime(timeString)
  return hour + minute / 60
}

/**
 * Format time for display (removes seconds)
 * @param timeString - Time in format "HH:mm:ss"
 * @returns Time in format "HH:mm"
 */
export function formatTimeForDisplay(timeString: string): string {
  const { hour, minute } = parseApiTime(timeString)
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

/**
 * Format time in 12-hour format
 * @param timeString - Time in format "HH:mm:ss" or "HH:mm"
 * @returns Time in format "h:mma" or "ha" (e.g., "2:30pm" or "2pm")
 */
export function formatTime12Hour(timeString: string): string {
  const { hour, minute } = parseApiTime(timeString)
  const period = hour >= 12 ? 'pm' : 'am'
  const displayHour = hour % 12 || 12
  
  if (minute === 0) {
    return `${displayHour}${period}`
  }
  return `${displayHour}:${minute.toString().padStart(2, '0')}${period}`
}

/**
 * Get current time as decimal hours in UK timezone
 * @returns Current time as decimal hours
 */
export function getCurrentTimeDecimal(): number {
  const now = new Date()
  return now.getHours() + now.getMinutes() / 60
}

/**
 * Calculate minutes until a given time
 * @param targetTime - Target time as decimal hours
 * @param currentTime - Current time as decimal hours
 * @returns Minutes until target time (handles midnight wrap)
 */
export function minutesUntil(targetTime: number, currentTime: number): number {
  if (targetTime === 0) {
    // Midnight
    return (24 - currentTime) * 60
  } else if (targetTime < currentTime) {
    // Target is tomorrow
    return (24 - currentTime + targetTime) * 60
  } else {
    // Target is today
    return (targetTime - currentTime) * 60
  }
}

/**
 * Format duration for display
 * @param minutes - Duration in minutes
 * @returns Formatted duration (e.g., "2h 30m" or "45m")
 */
export function formatDuration(minutes: number): string {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    if (mins === 0) {
      return `${hours}h`
    }
    return `${hours}h ${mins}m`
  }
  return `${Math.round(minutes)}m`
}

/**
 * Check if a time is between opening and closing times
 * @param currentTime - Current time as decimal hours
 * @param openTime - Opening time as decimal hours
 * @param closeTime - Closing time as decimal hours
 * @returns Whether the current time is within opening hours
 */
export function isTimeBetween(currentTime: number, openTime: number, closeTime: number): boolean {
  if (closeTime < openTime) {
    // Closes after midnight
    return currentTime >= openTime || currentTime < closeTime
  }
  // Normal hours
  return currentTime >= openTime && currentTime < closeTime
}

/**
 * Get day name in lowercase for API compatibility
 * @param date - Date object (defaults to today)
 * @returns Day name in lowercase (e.g., "monday")
 */
export function getApiDayName(date: Date = new Date()): string {
  return date.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()
}

/**
 * Parse duration from API format "2 hours 30 minutes" to abbreviated format "2h 30m"
 * @param duration - Duration string from API (e.g., "2 hours 30 minutes")
 * @returns Abbreviated duration (e.g., "2h 30m") or null
 */
export function parseApiDuration(duration: string | null): string | null {
  if (!duration) return null
  
  // Match patterns like "2 hours 30 minutes", "1 hour", "45 minutes"
  const match = duration.match(/(?:(\d+)\s*hours?\s*)?(?:(\d+)\s*minutes?)?/i)
  if (!match || (!match[1] && !match[2])) return duration // Return as-is if no match
  
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  
  if (hours && minutes) {
    return `${hours}h ${minutes}m`
  } else if (hours) {
    return `${hours}h`
  } else if (minutes) {
    return `${minutes}m`
  }
  
  return duration
}