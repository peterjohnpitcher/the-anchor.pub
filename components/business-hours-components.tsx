'use client'

import { cn } from '@/lib/utils'
import { StatusIndicator } from '@/components/ui/StatusIndicator'
import { LoadingState } from '@/components/ui/LoadingState'
import { Badge } from '@/components/ui/primitives/Badge'
import { Card } from '@/components/ui/layout/Card'
import { Button } from '@/components/ui/primitives/Button'
import { useProcessedBusinessHours } from '@/lib/business-hours-processor'
import type { StatusBarViewModel, TodayCardViewModel, WeekViewViewModel } from '@/lib/business-hours-processor'

// ============================================================================
// Enhanced Status Bar Component with all audit fixes
// ============================================================================

interface StatusBarProps {
  variant?: 'default' | 'compact' | 'navigation'
  showKitchen?: boolean
  className?: string
  refreshInterval?: number
  theme?: {
    background?: string
    border?: string
    text?: string
    accentText?: string
  }
}

const defaultTheme = {
  background: 'bg-anchor-green',
  border: 'border-2 border-anchor-gold',
  text: 'text-white',
  accentText: 'text-white/60'
}

export function ProcessedStatusBar({ 
  variant = 'default', 
  showKitchen = true,
  className = '',
  refreshInterval = 60000, // 60 seconds per audit requirements
  theme = defaultTheme
}: StatusBarProps) {
  const { data, loading, error, lastSuccessful, isStale } = useProcessedBusinessHours(refreshInterval)
  
  const mergedTheme = { ...defaultTheme, ...theme }
  
  if (loading && !lastSuccessful) {
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

  // Use last successful data if available during errors
  const statusData = data?.statusBar || lastSuccessful?.statusBar
  
  if (!statusData) {
    // Show a fallback message instead of disappearing completely
    if (variant === 'navigation') {
      return (
        <div className="text-sm text-white/60">
          Opening hours unavailable
        </div>
      )
    }
    return (
      <div className={cn(
        'inline-flex rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md min-h-[40px] sm:min-h-[44px] items-center',
        mergedTheme.background,
        mergedTheme.border,
        className
      )}>
        <span className="text-sm text-white/80">Opening hours temporarily unavailable</span>
      </div>
    )
  }

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
  
  // Determine background based on status variant
  const backgroundClass = statusData.variant === 'kitchen-closed' 
    ? 'bg-amber-500' 
    : statusData.variant === 'closed-venue'
    ? 'bg-gray-500'
    : mergedTheme.background

  return (
    <div 
      className={cn(
        containerClasses[variant],
        variant !== 'navigation' && backgroundClass,
        variant !== 'navigation' && mergedTheme.border,
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Restaurant status: ${statusData.message}`}
    >
      <div className={cn(textClasses[variant], mergedTheme.text)}>
        {variant === 'navigation' ? (
          // Navigation variant: show on two lines
          <>
            <div className="flex items-center gap-1.5">
              <StatusIndicator 
                status={statusData.isOpen ? 'open' : 'closed'} 
                size={indicatorSize} 
              />
              <span className="whitespace-nowrap">
                {statusData.message}
                {!statusData.isLive && !statusData.closesIn && ' • Updating...'}
              </span>
            </div>
            {showKitchen && statusData.variant === 'kitchen-closed' && (
              <div className="flex items-center gap-1.5">
                <StatusIndicator status="warning" size={indicatorSize} />
                <span className="whitespace-nowrap text-amber-600">
                  Kitchen closed
                </span>
              </div>
            )}
            {isStale && lastSuccessful && (
              <span className="text-xs text-gray-500">
                Last updated: {new Date(lastSuccessful.meta.lastUpdated).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            )}
          </>
        ) : (
          // Default/compact variants: show on one line
          <>
            <div className="flex items-center gap-1.5">
              <StatusIndicator 
                status={statusData.isOpen ? 'open' : 'closed'} 
                size={indicatorSize} 
              />
              <span className="whitespace-nowrap">
                {statusData.message}
                {!statusData.isLive && !statusData.closesIn && (
                  <span className="text-xs opacity-75 ml-1">(cached)</span>
                )}
              </span>
            </div>
            
            {showKitchen && statusData.variant === 'kitchen-closed' && (
              <>
                <span className={cn(mergedTheme.accentText, 'hidden sm:inline')}>•</span>
                <div className="flex items-center gap-1.5">
                  <StatusIndicator status="warning" size={indicatorSize} />
                  <span className="whitespace-nowrap">Kitchen closed</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Booking CTA with Guardrails
// ============================================================================

export function BookingCTA({ className }: { className?: string }) {
  const { data } = useProcessedBusinessHours()
  
  if (!data?.statusBar.canBook) {
    return (
      <Button 
        disabled 
        className={cn('opacity-50 cursor-not-allowed', className)}
        aria-label="Bookings currently unavailable"
      >
        Bookings Temporarily Unavailable
      </Button>
    )
  }
  
  const nextSlots = data.statusBar.nextAvailableSlots
  
  return (
    <Button 
      className={cn('bg-anchor-gold hover:bg-anchor-gold/90 text-anchor-charcoal', className)}
      onClick={() => window.location.href = '/book'}
    >
      Book Table
      {nextSlots && nextSlots.length > 0 && (
        <span className="ml-2 text-xs opacity-90">
          • Next: {nextSlots[0]}
        </span>
      )}
    </Button>
  )
}

// ============================================================================
// Today Card Component
// ============================================================================

export function TodayCard({ className }: { className?: string }) {
  const { data, loading } = useProcessedBusinessHours()
  
  if (loading || !data?.todayCard) {
    return (
      <Card className={cn('p-6', className)}>
        <LoadingState variant="skeleton" className="h-32" />
      </Card>
    )
  }
  
  const today = data.todayCard
  
  return (
    <Card className={cn('p-6 space-y-4', className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{today.dayName}</h3>
          <p className="text-sm text-gray-600">{today.date}</p>
        </div>
        {today.badge && (
          <Badge variant={today.isSpecialHours ? 'warning' : 'default'}>
            {today.badge}
          </Badge>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="font-medium">{today.summary}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Venue:</span>
            <p className="font-medium font-mono">{today.hours.venue}</p>
          </div>
          <div>
            <span className="text-gray-500">Kitchen:</span>
            <p className="font-medium font-mono">{today.hours.kitchen}</p>
          </div>
        </div>
      </div>
      
      {today.events.length > 0 && (
        <div className="border-t pt-3">
          <p className="text-sm font-medium mb-2">Today's Events</p>
          <div className="space-y-1">
            {today.events.map((event, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span>{event.icon}</span>
                <span>{event.name}</span>
                <span className="text-gray-500">• {event.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

// ============================================================================
// Week View Component - Uses upcomingWeek directly
// ============================================================================

export function WeekView({ className }: { className?: string }) {
  const { data, loading } = useProcessedBusinessHours()
  
  if (loading || !data?.weekView) {
    return (
      <div className={cn('space-y-2', className)}>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    )
  }
  
  return (
    <div className={cn('space-y-2', className)}>
      {data.weekView.days.map(day => (
        <div
          key={day.date}
          className={cn(
            'flex items-center justify-between p-3 rounded-lg border',
            day.isToday && 'bg-amber-50 border-amber-300',
            day.isClosed && 'bg-gray-50',
            day.isSpecial && !day.isToday && 'bg-blue-50 border-blue-200'
          )}
        >
          <div className="flex items-center gap-3">
            <div>
              <p className={cn('font-medium', day.isToday && 'text-amber-900')}>
                {day.dayName}
              </p>
              <p className="text-xs text-gray-500">{day.date}</p>
            </div>
            {day.badge && (
              <Badge 
                variant={day.isClosed ? 'error' : 'secondary'} 
                className="text-xs"
              >
                {day.badge}
              </Badge>
            )}
          </div>
          
          <div className="text-right text-sm">
            <p className={cn('font-medium font-mono', day.isClosed && 'text-gray-400')}>
              {day.hours}
            </p>
            {day.kitchenHours !== '-' && (
              <p className="text-xs text-gray-500 font-mono">
                Kitchen: {day.kitchenHours}
              </p>
            )}
            {day.note && (
              <p className="text-xs text-blue-600 mt-1">{day.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// Compact Hours Display (for footers, sidebars, etc.)
// ============================================================================

export function CompactHours({ className }: { className?: string }) {
  const { data, loading, isStale } = useProcessedBusinessHours()
  
  if (loading || !data) {
    return <LoadingState variant="skeleton" className="h-20" />
  }
  
  const today = data.todayCard
  const isOpen = data.statusBar.isOpen
  
  return (
    <div className={cn('space-y-2 text-sm', className)}>
      <div className="flex items-center gap-2">
        <StatusIndicator status={isOpen ? 'open' : 'closed'} size="sm" />
        <span className="font-medium">
          {isOpen ? 'Open Now' : 'Currently Closed'}
        </span>
        {isStale && (
          <span className="text-xs text-gray-500">(updating...)</span>
        )}
      </div>
      <div className="pl-6 space-y-1 text-gray-600 font-mono text-xs">
        <p>Today: {today.hours.venue}</p>
        {today.hours.kitchen !== 'No food service' && (
          <p>Kitchen: {today.hours.kitchen}</p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// SEO JSON-LD Component (Server-side regenerated every 60s)
// ============================================================================

export function OpeningHoursSchema() {
  const { data } = useProcessedBusinessHours()
  
  if (!data?.seo) return null
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'The Anchor',
    openingHoursSpecification: data.seo.openingHoursSpecification,
    specialOpeningHoursSpecification: data.seo.specialOpeningHoursSpecification
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================================================
// Export all components
// ============================================================================

const BusinessHoursComponents = {
  ProcessedStatusBar,
  BookingCTA,
  TodayCard,
  WeekView,
  CompactHours,
  OpeningHoursSchema
}

export default BusinessHoursComponents