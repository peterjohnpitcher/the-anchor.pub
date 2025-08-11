'use client'

import { forwardRef, MouseEvent } from 'react'
import { Button, ButtonProps } from '@/components/ui/primitives/Button'
import { analytics } from '@/lib/analytics'
import { usePathname } from 'next/navigation'

interface BookTableButtonProps extends Omit<ButtonProps, 'href' | 'onClick'> {
  /**
   * Where the button is located (e.g., 'header', 'hero', 'floating_actions', 'footer')
   */
  source: string
  /**
   * Additional context for the booking (e.g., 'special_event', 'christmas_party', 'regular')
   */
  context?: string
  /**
   * Event associated with the booking if applicable
   */
  eventName?: string
  /**
   * Custom tracking label (defaults to 'Book a Table')
   */
  trackingLabel?: string
  /**
   * Custom onClick handler (called after tracking)
   */
  onClickAfterTracking?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export const BookTableButton = forwardRef<HTMLButtonElement, BookTableButtonProps>(
  ({ 
    source,
    context = 'regular',
    eventName,
    trackingLabel = 'Book a Table',
    onClickAfterTracking,
    children = '📅 Book a Table',
    variant = 'primary',
    size = 'md',
    className,
    ...props 
  }, ref) => {
    const pathname = usePathname()
    
    // Use new booking wizard
    const bookingUrl = '/book-table'
    const isExternal = false

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      // Detect device type
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                      window.innerWidth < 768

      // Get time of day
      const hour = new Date().getHours()
      let timeOfDay: string
      if (hour < 12) timeOfDay = 'morning'
      else if (hour < 17) timeOfDay = 'afternoon'
      else timeOfDay = 'evening'

      // Track the click event
      analytics.track({
        action: 'click',
        category: 'booking',
        label: trackingLabel,
        value: 1
      })

      // Also send a specific table_booking_click event for easier filtering
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'table_booking_click',
          booking_source: source,
          booking_context: context,
          booking_event: eventName,
          booking_page: pathname,
          booking_device: isMobile ? 'mobile' : 'desktop',
          booking_time_of_day: timeOfDay,
          booking_day_of_week: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
          booking_timestamp: new Date().toISOString()
        })
      }

      // Call custom onClick handler if provided
      if (onClickAfterTracking) {
        onClickAfterTracking(event as any)
      }

      // Navigate to booking page
      if (typeof window !== 'undefined') {
        window.location.href = bookingUrl
      }
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

BookTableButton.displayName = 'BookTableButton'