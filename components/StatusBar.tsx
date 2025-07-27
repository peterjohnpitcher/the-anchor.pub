'use client'

import { cn } from '@/lib/utils'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { LoadingState } from '@/components/ui/LoadingState'
import { useBusinessHours } from '@/hooks/useBusinessHours'
import { useKitchenStatus } from '@/hooks/useKitchenStatus'
import { formatDuration, minutesUntil, getCurrentTimeDecimal, timeToDecimalHours, formatTime12Hour } from '@/lib/time-utils'

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
  kitchenOpen: 'Kitchen open',
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
  apiEndpoint = '/api/business/hours',
  refreshInterval = 5 * 60 * 1000, // 5 minutes
  theme = defaultTheme,
  labels = defaultLabels
}: StatusBarProps) {
  const { hours, loading, error } = useBusinessHours({ apiEndpoint, refreshInterval })
  const { kitchen } = useKitchenStatus()
  
  const mergedTheme = { ...defaultTheme, ...theme }
  const mergedLabels = { ...defaultLabels, ...labels }

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

  if (error || !hours) {
    return null // Gracefully hide on error
  }

  // Use API-provided status
  const { isOpen, closesIn, opensIn } = hours.currentStatus
  
  // Get today's hours for bar closing time
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()
  const todayHours = hours.regularHours[today]
  
  // Build bar status message
  let barStatus = 'Bar: '
  if (isOpen) {
    if (todayHours && todayHours.closes) {
      const closingTime = formatTime12Hour(todayHours.closes)
      barStatus += `Open until ${closingTime}`
    } else {
      barStatus += 'Open'
    }
  } else {
    if (todayHours && todayHours.opens) {
      const openingTime = formatTime12Hour(todayHours.opens)
      barStatus += `Opens at ${openingTime}`
    } else {
      barStatus += 'Closed'
    }
  }
  
  // Build kitchen status message
  let kitchenStatus = ''
  let kitchenIndicatorStatus: 'open' | 'warning' | 'closed' = 'closed'
  
  if (showKitchen && kitchen) {
    kitchenStatus = 'Kitchen: '
    if (kitchen.status === 'no-service') {
      kitchenStatus += 'Closed today'
      kitchenIndicatorStatus = 'closed'
    } else if (kitchen.status === 'open') {
      if (kitchen.closesAt) {
        const closingTime = formatTime12Hour(kitchen.closesAt)
        kitchenStatus += `Open until ${closingTime}`
      } else {
        kitchenStatus += 'Open'
      }
      kitchenIndicatorStatus = 'open'
    } else {
      // Kitchen is closed
      kitchenStatus += 'Closed today'
      kitchenIndicatorStatus = isOpen ? 'warning' : 'closed'
    }
  }

  // Determine overall status for background color
  const overallStatus = isOpen ? (kitchen?.isOpen ? 'open' : 'partial') : 'closed'
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
    navigation: 'flex flex-col items-start gap-0.5 text-xs'
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
        {variant === 'navigation' ? (
          // Navigation variant: show on two lines
          <>
            <div className="flex items-center gap-1.5">
              <StatusIndicator status={isOpen ? 'open' : 'closed'} size={indicatorSize} />
              <span className="whitespace-nowrap">{barStatus}</span>
            </div>
            {showKitchen && kitchenStatus && (
              <div className="flex items-center gap-1.5">
                <StatusIndicator 
                  status={kitchenIndicatorStatus} 
                  size={indicatorSize}
                />
                <span className="whitespace-nowrap">{kitchenStatus}</span>
              </div>
            )}
          </>
        ) : (
          // Default/compact variants: show on one line with separator
          <>
            <div className="flex items-center gap-1.5">
              <StatusIndicator status={isOpen ? 'open' : 'closed'} size={indicatorSize} />
              <span className="whitespace-nowrap">{barStatus}</span>
            </div>
            
            {showKitchen && kitchenStatus && (
              <>
                <span className={cn(mergedTheme.accentText, 'hidden sm:inline')}>•</span>
                <div className="flex items-center gap-1.5">
                  <StatusIndicator 
                    status={kitchenIndicatorStatus} 
                    size={indicatorSize}
                  />
                  <span className="whitespace-nowrap">{kitchenStatus}</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}