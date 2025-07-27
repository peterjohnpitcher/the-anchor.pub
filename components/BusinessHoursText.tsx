'use client'

import { useBusinessHours } from '@/hooks/useBusinessHours'
import { formatTime12Hour } from '@/lib/time-utils'

interface BusinessHoursTextProps {
  day?: string // Optional day name, defaults to today
  type?: 'bar' | 'kitchen' | 'both'
  fallback?: string
  className?: string
}

/**
 * Dynamic component for displaying business hours inline
 * Use this to replace hardcoded hours in text content
 */
export function BusinessHoursText({ 
  day,
  type = 'both',
  fallback = 'Please check our hours',
  className = ''
}: BusinessHoursTextProps) {
  const { hours, loading, error } = useBusinessHours()
  
  if (loading) {
    return <span className={className}>loading...</span>
  }
  
  if (error || !hours) {
    return <span className={className}>{fallback}</span>
  }
  
  // Get the day to display
  const targetDay = day?.toLowerCase() || new Date().toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()
  const dayHours = hours.regularHours[targetDay]
  
  if (!dayHours) {
    return <span className={className}>{fallback}</span>
  }
  
  if (dayHours.is_closed) {
    return <span className={className}>Closed</span>
  }
  
  // Format bar hours
  const barOpen = formatTime12Hour(dayHours.opens)
  const barClose = formatTime12Hour(dayHours.closes)
  const barHours = `${barOpen}-${barClose}`
  
  // Format kitchen hours
  let kitchenHours = ''
  if (dayHours.kitchen && typeof dayHours.kitchen === 'object' && 'opens' in dayHours.kitchen) {
    const kitchenOpen = formatTime12Hour(dayHours.kitchen.opens)
    const kitchenClose = formatTime12Hour(dayHours.kitchen.closes)
    kitchenHours = `${kitchenOpen}-${kitchenClose}`
  } else if (dayHours.kitchen && 'is_closed' in dayHours.kitchen) {
    kitchenHours = 'Kitchen Closed'
  } else {
    kitchenHours = 'No Kitchen Service'
  }
  
  // Return based on type
  if (type === 'bar') {
    return <span className={className}>{barHours}</span>
  }
  
  if (type === 'kitchen') {
    return <span className={className}>{kitchenHours}</span>
  }
  
  // Both
  return (
    <span className={className}>
      Bar: {barHours}, Kitchen: {kitchenHours}
    </span>
  )
}