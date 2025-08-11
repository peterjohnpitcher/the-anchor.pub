/**
 * Business Hours Processor v2
 * 
 * Bulletproof implementation for opening times API processing.
 * 
 * Key principles:
 * - currentStatus fields are source of truth for "right now"
 * - Timetables are for display only, not live state calculation
 * - specialHours is an array, not an object
 * - Consistent Europe/London timezone everywhere
 * - Graceful degradation with clear messaging
 */

import { DateTime } from 'luxon'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { logError } from '@/lib/error-handling'

// ============================================================================
// Type Definitions - Matching actual API shape
// ============================================================================

export interface SpecialHoursEntry {
  date: string
  is_closed?: boolean
  opens?: string
  closes?: string
  kitchen?: {
    opens: string
    closes: string
  } | null
  is_kitchen_closed?: boolean
  note?: string
}

export interface BusinessHoursResponse {
  regularHours: Record<string, DayHours>
  specialHours?: SpecialHoursEntry[]  // Array, not object!
  currentStatus: CurrentStatus
  today: TodayData
  upcomingWeek: WeekData[]
  updateFrequency: number
  timezone: string
  correlationId?: string  // For error tracking
}

export interface DayHours {
  is_closed?: boolean
  opens?: string
  closes?: string
  kitchen?: {
    opens: string
    closes: string
  } | null
  is_kitchen_closed?: boolean  // Per-day flag
  note?: string
}

export interface CurrentStatus {
  isOpen: boolean         // Live venue status
  kitchenOpen: boolean    // Live kitchen status (NOT is_kitchen_closed)
  closesIn?: string
  opensIn?: string
  services?: {
    bookings?: {
      accepting: boolean
      availableSlots?: string[]
    }
    kitchen?: {
      closesIn?: string  // Kitchen-specific timing
    }
  }
}

export interface TodayData {
  date: string
  summary: string
  isSpecialHours: boolean
  hours: DayHours
  events?: Array<{
    name: string
    time: string
    type: string
  }>
}

export interface WeekData {
  date: string
  dayName: string
  status: 'normal' | 'special' | 'closed'
  hours: string
  kitchen?: string
  note?: string
  is_closed?: boolean
  opens?: string
  closes?: string
}

// ============================================================================
// Processed Output Types
// ============================================================================

export interface ProcessedBusinessHours {
  statusBar: StatusBarViewModel
  todayCard: TodayCardViewModel
  weekView: WeekViewViewModel
  seo: SEODataViewModel
  meta: MetaViewModel
}

export interface StatusBarViewModel {
  isOpen: boolean
  isKitchenOpen: boolean
  message: string
  variant: 'open' | 'closed' | 'kitchen-closed' | 'closed-venue'
  closesIn?: string
  opensIn?: string
  canBook: boolean
  nextAvailableSlots?: string[]
  isLive: boolean  // false when showing stale data
}

export interface TodayCardViewModel {
  date: string
  dayName: string
  summary: string
  isSpecialHours: boolean
  badge?: string
  events: Array<{
    name: string
    time: string
    icon: string
  }>
  hours: {
    venue: string
    kitchen: string
  }
}

export interface WeekViewViewModel {
  days: Array<{
    date: string
    dayName: string
    dayAbbr: string
    isToday: boolean
    isSpecial: boolean
    isClosed: boolean
    hours: string
    kitchenHours: string
    badge?: string
    note?: string
  }>
}

export interface SEODataViewModel {
  openingHoursSpecification: Array<{
    '@type': string
    dayOfWeek: string | string[]
    opens?: string
    closes?: string
  }>
  specialOpeningHoursSpecification: Array<{
    '@type': string
    validFrom: string
    validThrough: string
    opens?: string
    closes?: string
  }>
}

export interface MetaViewModel {
  lastUpdated: string
  nextUpdate: string
  cacheMaxAge: number
  timezone: string
  correlationId?: string
}

// ============================================================================
// Main Processor Class
// ============================================================================

export class BusinessHoursProcessor {
  private readonly timezone = 'Europe/London'
  private readonly cacheMaxAge = 60 // seconds, per API spec
  
  /**
   * Process the raw API response into view models
   * CRITICAL: Uses currentStatus for live state, not timetable calculations
   */
  process(apiResponse: BusinessHoursResponse): ProcessedBusinessHours {
    const now = DateTime.now().setZone(this.timezone)
    
    return {
      statusBar: this.processStatusBar(apiResponse, now),
      todayCard: this.processTodayCard(apiResponse.today, now),
      weekView: this.processWeekView(apiResponse.upcomingWeek, now),
      seo: this.processSEO(apiResponse),
      meta: this.processMeta(apiResponse, now)
    }
  }
  
  // ==========================================================================
  // Status Bar Processing - Uses LIVE currentStatus
  // ==========================================================================
  
  private processStatusBar(data: BusinessHoursResponse, now: DateTime): StatusBarViewModel {
    const { currentStatus } = data
    
    // Use LIVE fields from currentStatus as source of truth
    const isOpen = currentStatus.isOpen
    const isKitchenOpen = currentStatus.kitchenOpen  // NOT is_kitchen_closed!
    
    // Booking CTA guardrails
    const canBook = currentStatus.services?.bookings?.accepting === true
    const nextSlots = canBook ? currentStatus.services?.bookings?.availableSlots : undefined
    
    // Determine variant for styling
    const variant = !isOpen ? 'closed-venue' :  // Venue closed = no kitchen info
                    !isKitchenOpen ? 'kitchen-closed' : 
                    'open'
    
    return {
      isOpen,
      isKitchenOpen,
      message: this.getStatusMessage(currentStatus),
      variant,
      closesIn: currentStatus.closesIn,
      opensIn: currentStatus.opensIn,
      canBook,
      nextAvailableSlots: nextSlots?.slice(0, 2), // Show max 2 slots
      isLive: true  // Will be set to false when showing stale data
    }
  }
  
  private getStatusMessage(status: CurrentStatus): string {
    if (!status.isOpen) {
      return status.opensIn ? `Opens ${status.opensIn}` : 'Closed'
    }
    
    // Venue is open
    if (!status.kitchenOpen) {
      // Use kitchen-specific timing if available
      const kitchenOpens = status.services?.kitchen?.closesIn
      if (kitchenOpens) {
        return `Open • Kitchen opens ${kitchenOpens}`
      }
      return 'Open • Kitchen Closed'
    }
    
    // Both open
    return status.closesIn ? `Open until ${status.closesIn}` : 'Open Now'
  }
  
  // ==========================================================================
  // Today Card Processing
  // ==========================================================================
  
  private processTodayCard(today: TodayData, now: DateTime): TodayCardViewModel {
    const dayName = now.toFormat('EEEE')
    
    return {
      date: today.date,
      dayName,
      summary: today.summary,
      isSpecialHours: today.isSpecialHours,
      badge: this.getTodayBadge(today),
      events: this.processEvents(today.events || []),
      hours: {
        venue: this.formatVenueHours(today.hours),
        kitchen: this.formatKitchenHours(today.hours)
      }
    }
  }
  
  private getTodayBadge(today: TodayData): string | undefined {
    if (today.hours.is_closed) return 'Closed Today'
    if (today.isSpecialHours) return 'Special Hours'
    if (today.hours.is_kitchen_closed) return 'Kitchen Closed'
    return undefined
  }
  
  private processEvents(events: TodayData['events'] = []): TodayCardViewModel['events'] {
    return events.map(event => ({
      name: event.name,
      time: event.time,
      icon: this.getEventIcon(event.type)
    }))
  }
  
  private getEventIcon(type: string): string {
    const icons: Record<string, string> = {
      'quiz': '🧠',
      'drag': '👑',
      'music': '🎵',
      'sport': '⚽',
      'special': '⭐'
    }
    return icons[type] || '📅'
  }
  
  // ==========================================================================
  // Week View Processing - Uses upcomingWeek directly
  // ==========================================================================
  
  private processWeekView(week: WeekData[], now: DateTime): WeekViewViewModel {
    const today = now.toISODate()
    
    // Use upcomingWeek data directly as it's pre-processed by API
    return {
      days: week.map(day => ({
        date: day.date,
        dayName: day.dayName,
        dayAbbr: day.dayName.substring(0, 3),
        isToday: day.date === today,
        isSpecial: day.status === 'special',
        isClosed: day.status === 'closed' || day.is_closed === true,
        hours: this.formatDayHours(day),
        kitchenHours: this.formatDayKitchenHours(day),
        badge: this.getWeekDayBadge(day),
        note: day.note
      }))
    }
  }
  
  private getWeekDayBadge(day: WeekData): string | undefined {
    if (day.status === 'special') return 'Special'
    if (day.status === 'closed') return 'Closed'
    if (day.note?.includes('event')) return 'Event'
    return undefined
  }
  
  // ==========================================================================
  // SEO Data Processing
  // ==========================================================================
  
  private processSEO(data: BusinessHoursResponse): SEODataViewModel {
    // Regular hours from regularHours
    const regularSpecs = Object.entries(data.regularHours)
      .filter(([_, hours]) => !hours.is_closed)
      .map(([day, hours]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: this.capitalize(day),
        opens: hours.opens,
        closes: this.fixMidnightForSEO(hours.closes)
      }))
    
    // Special hours from array (not object!)
    const specialSpecs = (data.specialHours || [])
      .filter(special => special.is_closed || special.opens !== data.regularHours[this.getDayFromDate(special.date)]?.opens)
      .map(special => ({
        '@type': 'OpeningHoursSpecification',
        validFrom: special.date,
        validThrough: special.date,
        opens: special.is_closed ? undefined : special.opens,
        closes: special.is_closed ? undefined : this.fixMidnightForSEO(special.closes)
      }))
    
    return {
      openingHoursSpecification: regularSpecs,
      specialOpeningHoursSpecification: specialSpecs
    }
  }
  
  private fixMidnightForSEO(time?: string): string | undefined {
    // Schema.org doesn't accept 00:00, use 23:59
    return time === '00:00' || time === '00:00:00' ? '23:59' : time
  }
  
  private getDayFromDate(dateStr: string): string {
    return DateTime.fromISO(dateStr, { zone: this.timezone })
      .toFormat('EEEE')
      .toLowerCase()
  }
  
  // ==========================================================================
  // Meta Information
  // ==========================================================================
  
  private processMeta(data: BusinessHoursResponse, now: DateTime): MetaViewModel {
    return {
      lastUpdated: now.toISO() ?? '',
      nextUpdate: now.plus({ seconds: this.cacheMaxAge }).toISO() ?? '',
      cacheMaxAge: this.cacheMaxAge,
      timezone: this.timezone,
      correlationId: data.correlationId
    }
  }
  
  // ==========================================================================
  // Helper Methods
  // ==========================================================================
  
  /**
   * Get hours for a specific date, checking specialHours array first
   */
  private getHoursForDate(data: BusinessHoursResponse, date: Date): DayHours {
    const dateStr = DateTime.fromJSDate(date).toISODate()
    
    // Check special hours ARRAY (not object!) for this date
    if (dateStr && data.specialHours) {
      const special = data.specialHours.find(s => s.date === dateStr)
      if (special) {
        return special
      }
    }
    
    // Fall back to regular hours
    const dayName = DateTime.fromJSDate(date)
      .setZone(this.timezone)
      .toFormat('EEEE')
      .toLowerCase()
    
    return data.regularHours[dayName] || { is_closed: true }
  }
  
  private formatVenueHours(hours: DayHours): string {
    if (hours.is_closed) return 'CLOSED'
    if (!hours.opens || !hours.closes) return 'Hours vary'
    // Consistent 24-hour format
    return `${hours.opens} - ${hours.closes}`
  }
  
  private formatKitchenHours(hours: DayHours): string {
    if (hours.is_closed) return 'CLOSED'
    if (hours.is_kitchen_closed) return 'Kitchen Closed'
    if (!hours.kitchen) return 'No food service'
    // Consistent 24-hour format
    return `${hours.kitchen.opens} - ${hours.kitchen.closes}`
  }
  
  private formatDayHours(day: WeekData): string {
    if (day.is_closed) return 'CLOSED'
    if (!day.opens || !day.closes) return 'Call for hours'
    // Keep from upcomingWeek as-is
    return day.hours
  }
  
  private formatDayKitchenHours(day: WeekData): string {
    if (day.is_closed) return '-'
    if (!day.kitchen) return 'No food'
    return day.kitchen
  }
  
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

// ============================================================================
// React Hook Integration with Rate Limiting
// ============================================================================

interface RateLimitInfo {
  remaining: number
  reset: number
  retryAfter?: number
}

/**
 * Enhanced hook with graceful degradation and rate limit awareness
 */
export function useProcessedBusinessHours(refreshInterval = 60000) {
  const [processed, setProcessed] = useState<ProcessedBusinessHours | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [lastSuccessful, setLastSuccessful] = useState<ProcessedBusinessHours | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null)
  const [isPolling, setIsPolling] = useState(true)
  
  const processor = useMemo(() => new BusinessHoursProcessor(), [])
  
  const fetchData = useCallback(async () => {
    try {
      // Check rate limiting
      if (rateLimitInfo && rateLimitInfo.remaining === 0) {
        const now = Date.now() / 1000
        if (now < rateLimitInfo.reset) {
          // Still rate limited, skip this poll
          return
        }
      }
      
      const response = await fetch(`/api/business/hours?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      // Read rate limit headers
      const remaining = response.headers.get('X-RateLimit-Remaining')
      const reset = response.headers.get('X-RateLimit-Reset')
      const retryAfter = response.headers.get('Retry-After')
      
      if (remaining && reset) {
        setRateLimitInfo({
          remaining: parseInt(remaining),
          reset: parseInt(reset),
          retryAfter: retryAfter ? parseInt(retryAfter) : undefined
        })
      }
      
      // Handle rate limiting
      if (response.status === 429) {
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : 60000
        setIsPolling(false)
        setTimeout(() => {
          setIsPolling(true)
          fetchData()
        }, delay)
        
        // Keep showing last successful with stale indicator
        if (lastSuccessful) {
          setProcessed({
            ...lastSuccessful,
            statusBar: {
              ...lastSuccessful.statusBar,
              isLive: false
            }
          })
        }
        return
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const result = await response.json()
      const data = result.success && result.data ? result.data : result
      
      const processedData = processor.process(data)
      
      setProcessed(processedData)
      setLastSuccessful(processedData)
      setError(null)
      
    } catch (err) {
      const error = err as Error
      setError(error)
      
      // Log with correlation ID if available
      if (lastSuccessful?.meta.correlationId) {
        logError('business-hours-fetch', error, {
          correlationId: lastSuccessful.meta.correlationId
        })
      }
      
      // Show last successful with stale indicator
      if (lastSuccessful) {
        setProcessed({
          ...lastSuccessful,
          statusBar: {
            ...lastSuccessful.statusBar,
            isLive: false
          }
        })
      }
    } finally {
      setLoading(false)
    }
  }, [processor, lastSuccessful, rateLimitInfo])
  
  useEffect(() => {
    fetchData()
    
    if (isPolling && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchData, refreshInterval, isPolling])
  
  return {
    data: processed,
    loading,
    error,
    lastSuccessful,
    refresh: fetchData,
    rateLimitInfo,
    isStale: processed?.statusBar.isLive === false
  }
}

// ============================================================================
// Utility Functions for Boundary Testing
// ============================================================================

/**
 * Check if venue is currently open - for testing exact boundaries
 */
export function isCurrentlyOpen(opens: string, closes: string): boolean {
  const now = DateTime.now().setZone('Europe/London')
  const openTime = DateTime.fromFormat(opens, 'HH:mm:ss', { zone: 'Europe/London' })
  const closeTime = DateTime.fromFormat(closes, 'HH:mm:ss', { zone: 'Europe/London' })
  
  // Handle midnight closing (critical fix from audit)
  if (closeTime <= openTime) {
    // Spans midnight
    return now >= openTime || now < closeTime
  }
  
  return now >= openTime && now < closeTime
}

/**
 * Test boundary conditions
 */
export function testBoundaries(opens: string, closes: string): Record<string, boolean> {
  const tests: Record<string, boolean> = {}
  
  // Test exact open minute
  const openTime = DateTime.fromFormat(opens, 'HH:mm:ss', { zone: 'Europe/London' })
  tests['exactOpen'] = isCurrentlyOpen(opens, closes) // Should be true at exact open
  
  // Test 1 minute before open
  const beforeOpen = openTime.minus({ minutes: 1 }).toFormat('HH:mm:ss')
  tests['beforeOpen'] = !isCurrentlyOpen(opens, closes) // Should be false
  
  // Test exact close minute
  const closeTime = DateTime.fromFormat(closes, 'HH:mm:ss', { zone: 'Europe/London' })
  tests['exactClose'] = !isCurrentlyOpen(opens, closes) // Should be false at exact close
  
  // Test 1 minute before close
  const beforeClose = closeTime.minus({ minutes: 1 }).toFormat('HH:mm:ss')
  tests['beforeClose'] = isCurrentlyOpen(opens, closes) // Should be true
  
  // Test midnight boundaries
  if (closes === '00:00' || closes === '00:00:00') {
    tests['midnightClose'] = isCurrentlyOpen('23:00:00', '00:00:00')
  }
  
  return tests
}