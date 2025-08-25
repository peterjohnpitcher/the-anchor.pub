'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { getTodayHours, getTomorrowHours, formatTime12Hour } from '@/lib/status-boundary-calculator'

export function StatusBarSimple({ variant = 'default' }: { variant?: 'default' | 'navigation' }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/business/hours')
        .then(res => res.json())
        .then(result => {
          setData(result)
          setLoading(false)
        })
        .catch(err => {
          console.error('StatusBarSimple error:', err)
          setLoading(false)
        })
    }
    
    // Initial fetch
    fetchData()
    
    // Refresh every 5 minutes (300000ms)
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className={cn(
        variant === 'navigation' ? 'text-sm text-white' : 'inline-flex items-center gap-2 bg-anchor-green text-white px-4 py-2 rounded-full'
      )}>
        Loading...
      </div>
    )
  }

  if (!data?.success || !data?.data) {
    return null
  }

  const { currentStatus } = data.data
  const isOpen = currentStatus.isOpen
  const kitchenOpen = currentStatus.kitchenOpen
  
  // Get today's and tomorrow's hours using the helper functions
  // These properly handle special hours and timezone logic
  const todayHours = getTodayHours(data.data)
  const tomorrowHours = getTomorrowHours(data.data)

  if (variant === 'navigation') {
    // Build bar message - check TODAY first, then tomorrow
    let barMessage = ''
    if (isOpen) {
      if (todayHours?.closes) {
        barMessage = `Open until ${formatTime12Hour(todayHours.closes)}`
      } else {
        barMessage = 'Open'
      }
    } else {
      // When closed, check if we're before today's opening FIRST
      if (todayHours?.opens && !todayHours.is_closed) {
        const now = new Date()
        const currentTime = now.getHours() + now.getMinutes() / 60
        const openingHour = parseInt(todayHours.opens.split(':')[0])
        const openingMinute = parseInt(todayHours.opens.split(':')[1]) / 60
        const openingDecimal = openingHour + openingMinute
        
        if (currentTime < openingDecimal) {
          // We're before today's opening (e.g., 6:45am before 4pm)
          barMessage = `Opens at ${formatTime12Hour(todayHours.opens)}`
        } else {
          // We're after today's closing, show tomorrow if available
          if (tomorrowHours?.opens && !tomorrowHours.is_closed) {
            barMessage = `Opens tomorrow at ${formatTime12Hour(tomorrowHours.opens)}`
          } else {
            barMessage = 'Closed'
          }
        }
      } else if (tomorrowHours?.opens && !tomorrowHours.is_closed) {
        // Today has no hours (closed all day), show tomorrow
        barMessage = `Opens tomorrow at ${formatTime12Hour(tomorrowHours.opens)}`
      } else {
        barMessage = 'Closed'
      }
    }

    // Build kitchen message with tomorrow logic
    let kitchenMessage = ''
    if (!todayHours?.kitchen || todayHours.kitchen === null) {
      // No kitchen service today (like Monday)
      const tomorrowKitchen = tomorrowHours?.kitchen
      if (tomorrowKitchen && typeof tomorrowKitchen === 'object' && 'opens' in tomorrowKitchen && tomorrowKitchen.opens) {
        kitchenMessage = `Open tomorrow at ${formatTime12Hour(tomorrowKitchen.opens)}`
      } else {
        kitchenMessage = 'Closed today'
      }
    } else if (kitchenOpen && todayHours.kitchen && typeof todayHours.kitchen === 'object' && 'closes' in todayHours.kitchen) {
      kitchenMessage = `Open until ${formatTime12Hour(todayHours.kitchen.closes)}`
    } else if (!kitchenOpen) {
      // Kitchen closed - check if it opens later today
      if (todayHours.kitchen && typeof todayHours.kitchen === 'object' && 'opens' in todayHours.kitchen) {
        const now = new Date()
        const currentTime = now.getHours() + now.getMinutes() / 60
        const kitchenOpenHour = parseInt(todayHours.kitchen.opens.split(':')[0])
        const kitchenOpenMinute = parseInt(todayHours.kitchen.opens.split(':')[1]) / 60
        const kitchenOpenDecimal = kitchenOpenHour + kitchenOpenMinute
        
        if (currentTime < kitchenOpenDecimal) {
          // Kitchen opens later today
          kitchenMessage = `Opens at ${formatTime12Hour(todayHours.kitchen.opens)}`
        } else {
          // Kitchen closed for today, show tomorrow
          const tomorrowKitchen = tomorrowHours?.kitchen
          if (tomorrowKitchen && typeof tomorrowKitchen === 'object' && 'opens' in tomorrowKitchen && tomorrowKitchen.opens) {
            kitchenMessage = `Open tomorrow at ${formatTime12Hour(tomorrowKitchen.opens)}`
          } else {
            kitchenMessage = 'Closed'
          }
        }
      } else {
        kitchenMessage = 'Closed'
      }
    } else {
      kitchenMessage = 'Open'
    }

    return (
      <div className="flex flex-col gap-0.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className={cn('inline-block w-2 h-2 rounded-full', isOpen ? 'bg-green-400' : 'bg-red-400')} />
          <span className="text-white">
            Bar: {barMessage}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn('inline-block w-2 h-2 rounded-full', 
            kitchenOpen ? 'bg-green-400' : isOpen ? 'bg-amber-400' : 'bg-red-400'
          )} />
          <span className="text-white">
            Kitchen: {kitchenMessage}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 bg-anchor-green text-white px-4 py-2 rounded-full border-2 border-anchor-gold">
      <span className={cn('inline-block w-2 h-2 rounded-full', isOpen ? 'bg-green-400' : 'bg-red-400')} />
      <span>
        {isOpen ? 'Open Now' : 'Closed'}
        {kitchenOpen !== undefined && ` • Kitchen ${kitchenOpen ? 'Open' : 'Closed'}`}
      </span>
    </div>
  )
}