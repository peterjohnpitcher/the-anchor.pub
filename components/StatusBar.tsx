'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { LoadingState } from '@/components/ui/LoadingState'
import type { BusinessHours } from '@/lib/api'
import { isKitchenOpen, isKitchenClosed, getKitchenStatus } from '@/lib/api'

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
  kitchenClosedBarOpen: 'Bar Open • Kitchen Closed',
  noKitchenService: 'No Kitchen Service',
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
        // Add timestamp to prevent caching issues
        const url = `${apiEndpoint}${apiEndpoint.includes('?') ? '&' : '?'}t=${Date.now()}`
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        const data = await response.json()
        setHours(data)
      } catch (err) {
        // Error: Failed to fetch business hours
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
  

  // Default variant - full size with separate bar and kitchen info
  const getKitchenHours = () => {
    // Use the kitchenOpen status from the API which is already calculated in UK time
    const isKitchenCurrentlyOpen = hours.currentStatus.kitchenOpen
    
    // Check if we have special hours that might affect kitchen
    if (todaySpecialHours) {
      if (todaySpecialHours.is_closed) {
        return { isOpen: false, message: 'closed', status: 'no-service' }
      }
      // For special hours, we can't determine kitchen hours precisely
      return { isOpen: false, message: 'check special hours', status: 'no-service' }
    }
    
    // Get today's hours from the API data
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const todayHours = hours.regularHours[today]
    
    if (!todayHours) {
      return { isOpen: false, message: 'closed', status: 'no-service' }
    }
    
    // Handle the three kitchen status formats
    const kitchenStatus = todayHours.kitchen ? getKitchenStatus(todayHours.kitchen) : 'no-service'
    
    if (kitchenStatus === 'no-service') {
      // Kitchen is null - no kitchen service
      return { isOpen: false, message: mergedLabels.noKitchenService, status: 'no-service' }
    }
    
    if (kitchenStatus === 'closed') {
      // Kitchen has is_closed: true - kitchen closed but bar open
      return { isOpen: false, message: 'closed', status: 'closed' }
    }
    
    // Kitchen has open/close times
    if (!todayHours.kitchen || !isKitchenOpen(todayHours.kitchen)) {
      return { isOpen: false, message: 'closed', status: 'no-service' }
    }
    
    // Use the API's calculated status
    if (isKitchenCurrentlyOpen) {
      return { isOpen: true, message: 'open', status: 'open' }
    } else {
      return { isOpen: false, message: 'closed', status: 'closed' }
    }
  }
  
  const kitchenInfo = showKitchen ? getKitchenHours() : null
  
  // Build bar status message
  let barStatus = ''
  if (isOpen) {
    if (closesIn) {
      barStatus = `Bar: ${mergedLabels.closes} ${closesIn.startsWith('in ') ? closesIn : `in ${closesIn}`}`
    } else {
      barStatus = 'Bar: Open'
    }
  } else {
    if (opensIn) {
      barStatus = `Bar: ${mergedLabels.opens} ${opensIn.startsWith('in ') ? opensIn : `in ${opensIn}`}`
    } else {
      barStatus = 'Bar: Closed'
    }
  }
  
  // Build kitchen status message
  let kitchenStatus = ''
  if (kitchenInfo) {
    if (kitchenInfo.status === 'no-service') {
      kitchenStatus = 'Kitchen: No service'
    } else if (kitchenInfo.status === 'closed') {
      kitchenStatus = 'Kitchen: Closed'
    } else if (kitchenInfo.isOpen) {
      kitchenStatus = `Kitchen: ${kitchenInfo.message}`
    } else {
      kitchenStatus = `Kitchen: ${kitchenInfo.message}`
    }
  }

  // Determine overall status for background color
  const overallStatus = isOpen ? (kitchenInfo?.isOpen ? 'open' : 'partial') : 'closed'
  const backgroundClass = overallStatus === 'partial' ? 'bg-amber-500' : mergedTheme.background

  // Variant-specific styling
  const containerClasses = {
    default: 'inline-flex rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md min-h-[40px] sm:min-h-[44px] items-center',
    compact: 'inline-flex rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md items-center',
    navigation: 'inline-flex items-center gap-2'
  }
  
  const textClasses = {
    default: 'flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-sm sm:text-base font-medium',
    compact: 'flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium',
    navigation: 'flex items-center gap-2 text-xs'
  }
  
  const indicatorSize = variant === 'navigation' || variant === 'compact' ? 'sm' : 'md'

  return (
    <div className={cn(
      containerClasses[variant],
      variant !== 'navigation' && backgroundClass,
      variant !== 'navigation' && mergedTheme.border,
      className
    )}>
      <div className={cn(textClasses[variant], mergedTheme.text)}>
        {/* Bar Status */}
        <div className="flex items-center gap-1.5">
          <StatusIndicator status={isOpen ? 'open' : 'closed'} size={indicatorSize} />
          <span className="whitespace-nowrap">{barStatus}</span>
        </div>
        
        {/* Separator */}
        {showKitchen && kitchenStatus && (
          <span className={cn(mergedTheme.accentText, variant === 'navigation' ? '' : 'hidden sm:inline')}>•</span>
        )}
        
        {/* Kitchen Status */}
        {showKitchen && kitchenStatus && (
          <div className="flex items-center gap-1.5">
            <StatusIndicator 
              status={kitchenInfo?.isOpen ? 'open' : kitchenInfo?.status === 'closed' ? 'warning' : 'closed'} 
              size={indicatorSize}
            />
            <span className="whitespace-nowrap">{kitchenStatus}</span>
          </div>
        )}
      </div>
    </div>
  )
}