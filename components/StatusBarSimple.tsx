'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function StatusBarSimple({ variant = 'default' }: { variant?: 'default' | 'navigation' }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  
  // Get today's hours
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const todayHours = regularHours[today]
  
  // Format time (HH:mm:ss to h:mma)
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour || 12
    return `${displayHour}${minute === 0 ? '' : `:${minute.toString().padStart(2, '0')}`}${period}`
  }

  if (variant === 'navigation') {
    return (
      <div className="flex flex-col gap-0.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className={cn('inline-block w-2 h-2 rounded-full', isOpen ? 'bg-green-400' : 'bg-red-400')} />
          <span className="text-white">
            Bar: {isOpen ? `Open until ${formatTime(todayHours.closes)}` : todayHours?.opens ? `Opens at ${formatTime(todayHours.opens)}` : 'Closed'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn('inline-block w-2 h-2 rounded-full', 
            kitchenOpen ? 'bg-green-400' : isOpen ? 'bg-amber-400' : 'bg-red-400'
          )} />
          <span className="text-white">
            Kitchen: {!todayHours?.kitchen || todayHours.kitchen === null ? 'Closed today' : 
                     kitchenOpen ? `Open until ${formatTime(todayHours.kitchen.closes)}` : 
                     todayHours.kitchen.opens ? `Opens at ${formatTime(todayHours.kitchen.opens)}` : 'Closed today'}
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