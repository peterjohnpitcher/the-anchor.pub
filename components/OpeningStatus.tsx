'use client'

import { useEffect, useState } from 'react'
import { anchorAPI, type BusinessHours } from '@/lib/api'

export function OpeningStatus() {
  const [hours, setHours] = useState<BusinessHours | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHours() {
      try {
        const data = await anchorAPI.getBusinessHours()
        setHours(data)
      } catch (err) {
        console.error('Failed to fetch business hours:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHours()
    // Refresh every 5 minutes
    const interval = setInterval(fetchHours, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full border-2 border-anchor-gold/20 px-6 py-3 shadow-sm min-h-[44px] animate-pulse">
        <div className="h-5 bg-gray-300 rounded w-32"></div>
      </div>
    )
  }

  if (!hours) {
    // Fallback to static logic if API fails
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    const time = hour + now.getMinutes() / 60

    let message = ''
    switch (day) {
      case 0: // Sunday
        if (time >= 12 && time < 22) {
          message = time < 17 ? '🟢 Open Now - Kitchen until 5pm' : '🟢 Open Now - Kitchen closed'
        } else if (time < 12) {
          message = '🔴 Opens at 12pm'
        } else {
          message = '🔴 Closed - Opens tomorrow 4pm'
        }
        break
      case 1: // Monday
        if (time >= 16 && time < 22) {
          message = '🟢 Open Now - Kitchen closed Mondays'
        } else if (time < 16) {
          message = '🔴 Opens at 4pm'
        } else {
          message = '🔴 Closed - Opens tomorrow 4pm'
        }
        break
      default:
        if (time >= 16 && time < 22) {
          message = time >= 18 && time < 21 ? '🟢 Open Now - Kitchen until 9pm' : '🟢 Open Now'
        } else if (time < 16) {
          message = '🔴 Opens at 4pm'
        } else {
          message = '🔴 Closed'
        }
    }

    return (
      <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full border-2 border-anchor-gold/20 px-6 py-3 shadow-sm min-h-[44px] flex items-center">
        <p className="text-base font-medium text-anchor-green">{message}</p>
      </div>
    )
  }

  // Use dynamic API data
  const { isOpen, kitchenOpen, closesIn, opensIn } = hours.currentStatus
  
  let message = ''
  if (isOpen) {
    message = `🟢 Open Now`
    if (closesIn) {
      message += ` - Closes ${closesIn}`
    }
    if (kitchenOpen) {
      message += ' - Kitchen open'
    } else {
      message += ' - Kitchen closed'
    }
  } else {
    message = '🔴 Closed'
    if (opensIn) {
      message += ` - Opens ${opensIn}`
    }
  }

  return (
    <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full border-2 border-anchor-gold/20 px-6 py-3 shadow-sm min-h-[44px] flex items-center">
      <p className="text-base font-medium text-anchor-green">{message}</p>
    </div>
  )
}