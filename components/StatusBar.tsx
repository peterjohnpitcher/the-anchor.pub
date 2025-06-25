'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { LoadingState } from '@/components/ui/LoadingState'
import type { BusinessHours } from '@/lib/api'

interface StatusBarProps {
  variant?: 'default' | 'compact' | 'navigation'
  showKitchen?: boolean
  className?: string
  apiEndpoint?: string
  refreshInterval?: number
  theme?: {
    background?: string
    border?: string
    text?: string
    accentText?: string
  }
  labels?: {
    barOpen?: string
    barClosed?: string
    kitchenOpen?: string
    kitchenClosed?: string
    opens?: string
    closes?: string
  }
}

const defaultTheme = {
  background: 'bg-anchor-green',
  border: 'border-2 border-anchor-gold',
  text: 'text-white',
  accentText: 'text-white/60'
}

const defaultLabels = {
  barOpen: 'Bar open',
  barClosed: 'Bar closed',
  kitchenOpen: 'Kitchen',
  kitchenClosed: 'Kitchen closed',
  opens: 'opens',
  closes: 'closes'
}

export function StatusBar({ 
  variant = 'default', 
  showKitchen = true,
  className = '',
  apiEndpoint = '/api/business-hours',
  refreshInterval = 5 * 60 * 1000, // 5 minutes
  theme = defaultTheme,
  labels = defaultLabels
}: StatusBarProps) {
  const [hours, setHours] = useState<BusinessHours | null>(null)
  const [loading, setLoading] = useState(true)

  const mergedTheme = { ...defaultTheme, ...theme }
  const mergedLabels = { ...defaultLabels, ...labels }

  useEffect(() => {
    async function fetchHours() {
      try {
        const response = await fetch(apiEndpoint)
        const data = await response.json()
        setHours(data)
      } catch (err) {
        console.error('Failed to fetch business hours:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHours()
    
    if (refreshInterval > 0) {
      const interval = setInterval(fetchHours, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [apiEndpoint, refreshInterval])

  if (loading) {
    if (variant === 'navigation') {
      return <LoadingState variant="skeleton" className="h-5 w-32" />
    }
    return (
      <div className={cn(
        'inline-block rounded-full px-6 py-3 shadow-md min-h-[44px]',
        mergedTheme.background,
        mergedTheme.border,
        className
      )}>
        <LoadingState variant="skeleton" className="h-5 w-32" />
      </div>
    )
  }

  if (!hours) {
    return null
  }

  // Use dynamic API data
  const { isOpen, kitchenOpen, closesIn, opensIn } = hours.currentStatus
  
  // Check if there's a special hours entry for today
  const today = new Date().toISOString().split('T')[0]
  const todaySpecialHours = hours.specialHours?.find(sh => sh.date === today)
  
  // Navigation variant - simple text
  if (variant === 'navigation') {
    let navMessage = isOpen ? 'Open now' : 'Closed'
    
    // Add special hours reason if available
    if (todaySpecialHours?.reason) {
      navMessage += ` (${todaySpecialHours.reason})`
    }
    
    if (isOpen && closesIn) {
      navMessage += ` • Closes ${closesIn}`
    } else if (!isOpen && opensIn) {
      navMessage += ` • Opens ${opensIn}`
    }
    
    return (
      <div className="flex items-center gap-2 text-sm">
        <StatusIndicator status={isOpen ? 'open' : 'closed'} size="sm" />
        <span>{navMessage}</span>
      </div>
    )
  }

  // Compact variant - smaller padding, bar status only
  if (variant === 'compact') {
    let message = ''
    if (isOpen) {
      message = mergedLabels.barOpen
      if (todaySpecialHours?.reason) {
        message += ` (${todaySpecialHours.reason})`
      }
      if (closesIn) {
        message += ` • ${closesIn}`
      }
    } else {
      message = mergedLabels.barClosed
      if (todaySpecialHours?.reason) {
        message += ` (${todaySpecialHours.reason})`
      }
      if (opensIn) {
        message += ` • ${opensIn}`
      }
    }
    
    return (
      <div className={cn(
        'inline-block rounded-full px-4 py-2 shadow-md',
        mergedTheme.background,
        mergedTheme.border,
        className
      )}>
        <div className={cn('flex items-center gap-2 text-sm font-medium', mergedTheme.text)}>
          <StatusIndicator status={isOpen ? 'open' : 'closed'} size="sm" />
          <span>{message}</span>
        </div>
      </div>
    )
  }

  // Default variant - full size with separate bar and kitchen info
  const getKitchenHours = () => {
    // Get today's hours from the API data
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const todayHours = hours.regularHours[today]
    
    if (!todayHours || !todayHours.kitchen) {
      return { isOpen: false, message: 'closed' }
    }
    
    // Calculate kitchen closes in / opens at
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTime = currentHour + currentMinutes / 60
    
    const [kitchenOpenHour, kitchenOpenMin] = todayHours.kitchen.opens.split(':').map(Number)
    const [kitchenCloseHour, kitchenCloseMin] = todayHours.kitchen.closes.split(':').map(Number)
    
    const kitchenOpenTime = kitchenOpenHour + kitchenOpenMin / 60
    const kitchenCloseTime = kitchenCloseHour + kitchenCloseMin / 60
    
    if (currentTime >= kitchenOpenTime && currentTime < kitchenCloseTime) {
      // Kitchen is open
      const hoursUntilClose = Math.floor(kitchenCloseTime - currentTime)
      const minutesUntilClose = Math.round((kitchenCloseTime - currentTime - hoursUntilClose) * 60)
      
      if (hoursUntilClose > 0) {
        return { isOpen: true, message: `${mergedLabels.closes} ${hoursUntilClose}h ${minutesUntilClose}m` }
      } else {
        return { isOpen: true, message: `${mergedLabels.closes} ${minutesUntilClose}m` }
      }
    } else if (currentTime < kitchenOpenTime) {
      // Kitchen opens later today
      const hoursUntilOpen = Math.floor(kitchenOpenTime - currentTime)
      const minutesUntilOpen = Math.round((kitchenOpenTime - currentTime - hoursUntilOpen) * 60)
      
      if (hoursUntilOpen > 0) {
        return { isOpen: false, message: `${mergedLabels.opens} ${hoursUntilOpen}h ${minutesUntilOpen}m` }
      } else {
        return { isOpen: false, message: `${mergedLabels.opens} ${minutesUntilOpen}m` }
      }
    } else {
      // Kitchen closed for today
      return { isOpen: false, message: 'closed today' }
    }
  }
  
  const kitchenInfo = showKitchen ? getKitchenHours() : null
  
  let barMessage = ''
  if (isOpen) {
    barMessage = mergedLabels.barOpen
    if (todaySpecialHours?.reason) {
      barMessage += ` (${todaySpecialHours.reason})`
    }
    if (closesIn) {
      barMessage += ` ${mergedLabels.closes} ${closesIn}`
    }
  } else {
    barMessage = mergedLabels.barClosed
    if (todaySpecialHours?.reason) {
      barMessage += ` (${todaySpecialHours.reason})`
    }
    if (opensIn) {
      barMessage += ` ${mergedLabels.opens} ${opensIn}`
    }
  }

  return (
    <div className={cn(
      'inline-block rounded-full px-6 py-3 shadow-md min-h-[44px] flex items-center',
      mergedTheme.background,
      mergedTheme.border,
      className
    )}>
      <div className={cn('flex items-center gap-4 text-base font-medium', mergedTheme.text)}>
        <div className="flex items-center gap-2">
          <StatusIndicator status={isOpen ? 'open' : 'closed'} />
          <span>{barMessage}</span>
        </div>
        {showKitchen && (
          <>
            <span className={mergedTheme.accentText}>•</span>
            <div className="flex items-center gap-2">
              <StatusIndicator status={kitchenInfo?.isOpen ? 'open' : 'closed'} />
              <span>{mergedLabels.kitchenOpen} {kitchenInfo ? kitchenInfo.message : 'closed'}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}