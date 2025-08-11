'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

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

  const { currentStatus, regularHours } = data.data
  const isOpen = currentStatus.isOpen
  const kitchenOpen = currentStatus.kitchenOpen
  
  // Get today's and tomorrow's hours
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const now = new Date()
  const todayIndex = now.getDay()
  const tomorrowIndex = (todayIndex + 1) % 7
  const today = days[todayIndex]
  const tomorrow = days[tomorrowIndex]
  
  const todayHours = regularHours[today]
  const tomorrowHours = regularHours[tomorrow]
  
  // Format time (HH:mm:ss to h:mma)
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour || 12
    return `${displayHour}${minute === 0 ? '' : `:${minute.toString().padStart(2, '0')}`}${period}`
  }

  if (variant === 'navigation') {
    // Build bar message with tomorrow logic
    let barMessage = ''
    if (isOpen && todayHours?.closes) {
      barMessage = `Open until ${formatTime(todayHours.closes)}`
    } else if (!isOpen) {
      // Check if we should show tomorrow's time
      if (todayHours?.opens) {
        const currentTime = now.getHours() + now.getMinutes() / 60
        const openingHour = parseInt(todayHours.opens.split(':')[0])
        const openingMinute = parseInt(todayHours.opens.split(':')[1]) / 60
        const openingDecimal = openingHour + openingMinute
        
        if (currentTime < openingDecimal) {
          // Before today's opening
          barMessage = `Opens at ${formatTime(todayHours.opens)}`
        } else if (tomorrowHours?.opens && !tomorrowHours.is_closed) {
          // After today's closing, show tomorrow
          barMessage = `Open tomorrow at ${formatTime(tomorrowHours.opens)}`
        } else {
          barMessage = 'Closed'
        }
      } else if (tomorrowHours?.opens && !tomorrowHours.is_closed) {
        barMessage = `Open tomorrow at ${formatTime(tomorrowHours.opens)}`
      } else {
        barMessage = 'Closed'
      }
    } else {
      barMessage = isOpen ? 'Open' : 'Closed'
    }

    // Build kitchen message with tomorrow logic
    let kitchenMessage = ''
    if (!todayHours?.kitchen || todayHours.kitchen === null) {
      // No kitchen service today (like Monday)
      const tomorrowKitchen = tomorrowHours?.kitchen
      if (tomorrowKitchen && typeof tomorrowKitchen === 'object' && 'opens' in tomorrowKitchen && tomorrowKitchen.opens) {
        kitchenMessage = `Open tomorrow at ${formatTime(tomorrowKitchen.opens)}`
      } else {
        kitchenMessage = 'Closed today'
      }
    } else if (kitchenOpen && todayHours.kitchen.closes) {
      kitchenMessage = `Open until ${formatTime(todayHours.kitchen.closes)}`
    } else if (!kitchenOpen) {
      // Kitchen closed - check if it opens later today
      if (todayHours.kitchen.opens) {
        const currentTime = now.getHours() + now.getMinutes() / 60
        const kitchenOpenHour = parseInt(todayHours.kitchen.opens.split(':')[0])
        const kitchenOpenMinute = parseInt(todayHours.kitchen.opens.split(':')[1]) / 60
        const kitchenOpenDecimal = kitchenOpenHour + kitchenOpenMinute
        
        if (currentTime < kitchenOpenDecimal) {
          // Kitchen opens later today
          kitchenMessage = `Opens at ${formatTime(todayHours.kitchen.opens)}`
        } else {
          // Kitchen closed for today, show tomorrow
          const tomorrowKitchen = tomorrowHours?.kitchen
          if (tomorrowKitchen && typeof tomorrowKitchen === 'object' && 'opens' in tomorrowKitchen && tomorrowKitchen.opens) {
            kitchenMessage = `Open tomorrow at ${formatTime(tomorrowKitchen.opens)}`
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