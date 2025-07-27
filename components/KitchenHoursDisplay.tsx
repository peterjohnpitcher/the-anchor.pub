'use client'

import { useBusinessHours } from '@/hooks/useBusinessHours'
import { formatTime12Hour } from '@/lib/time-utils'

interface KitchenHoursDisplayProps {
  format?: 'inline' | 'list' | 'detailed'
  fallback?: string
  className?: string
}

/**
 * Dynamic component for displaying kitchen hours
 * Replaces hardcoded kitchen hours throughout the site
 */
export function KitchenHoursDisplay({ 
  format = 'inline', 
  fallback = 'Kitchen hours vary, please check',
  className = ''
}: KitchenHoursDisplayProps) {
  const { hours, loading, error } = useBusinessHours()
  
  if (loading) {
    return <span className={className}>Loading hours...</span>
  }
  
  if (error || !hours) {
    return <span className={className}>{fallback}</span>
  }
  
  // Build kitchen hours from API data
  const kitchenHours: { [key: string]: string } = {}
  const daysOrder = ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'monday']
  
  daysOrder.forEach(day => {
    const dayHours = hours.regularHours[day]
    if (!dayHours || dayHours.is_closed) {
      kitchenHours[day] = 'Closed'
      return
    }
    
    const kitchen = dayHours.kitchen
    
    if (!kitchen || kitchen === null) {
      kitchenHours[day] = 'Kitchen Closed'
      return
    }
    
    if ('is_closed' in kitchen && kitchen.is_closed === true) {
      kitchenHours[day] = 'Kitchen Closed'
    } else if ('opens' in kitchen && 'closes' in kitchen) {
      const opens = formatTime12Hour(kitchen.opens)
      const closes = formatTime12Hour(kitchen.closes)
      kitchenHours[day] = `${opens}-${closes}`
    } else {
      kitchenHours[day] = 'Kitchen Closed'
    }
  })
  
  // Format based on prop
  if (format === 'inline') {
    // Group consecutive days with same hours
    const groups: Array<{ days: string; hours: string }> = []
    let currentGroup: { days: string[]; hours: string } | null = null
    
    daysOrder.forEach((day, index) => {
      const dayHours = kitchenHours[day]
      const displayDay = day.charAt(0).toUpperCase() + day.slice(1)
      
      if (!currentGroup || currentGroup.hours !== dayHours) {
        if (currentGroup) {
          groups.push({
            days: formatDayRange(currentGroup.days),
            hours: currentGroup.hours
          })
        }
        currentGroup = { days: [displayDay], hours: dayHours }
      } else {
        currentGroup.days.push(displayDay)
      }
      
      if (index === daysOrder.length - 1 && currentGroup) {
        groups.push({
          days: formatDayRange(currentGroup.days),
          hours: currentGroup.hours
        })
      }
    })
    
    return (
      <span className={className}>
        {groups.map((group, i) => (
          <span key={i}>
            {i > 0 && ', '}
            {group.days} {group.hours}
          </span>
        ))}
      </span>
    )
  }
  
  if (format === 'list') {
    return (
      <ul className={className}>
        {daysOrder.map(day => {
          const displayDay = day.charAt(0).toUpperCase() + day.slice(1)
          return (
            <li key={day}>
              {displayDay}: {kitchenHours[day]}
            </li>
          )
        })}
      </ul>
    )
  }
  
  // Detailed format
  return (
    <div className={className}>
      {daysOrder.map(day => {
        const displayDay = day.charAt(0).toUpperCase() + day.slice(1)
        const isToday = new Date().toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase() === day
        
        return (
          <div key={day} className={isToday ? 'font-semibold' : ''}>
            <span>{displayDay}: </span>
            <span>{kitchenHours[day]}</span>
            {isToday && <span className="ml-2 text-sm">(Today)</span>}
          </div>
        )
      })}
    </div>
  )
}

function formatDayRange(days: string[]): string {
  if (days.length === 1) return days[0]
  if (days.length === 2) return `${days[0]} & ${days[1]}`
  
  // Check if consecutive weekdays
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const isConsecutiveWeekdays = days.every(day => weekdays.includes(day)) && 
    days.length === weekdays.filter(day => days.includes(day)).length
  
  if (isConsecutiveWeekdays) {
    return `${days[0]}-${days[days.length - 1]}`
  }
  
  return days.join(', ')
}