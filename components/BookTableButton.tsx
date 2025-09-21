'use client'

import { forwardRef, MouseEvent } from 'react'
import { Button, ButtonProps } from '@/components/ui/primitives/Button'
import { trackCtaClick, trackTableBookingClick } from '@/lib/gtm-events'
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

      trackCtaClick({
        id: `book_table_${source}`,
        label: trackingLabel,
        location: source,
        destination: 'book_table',
        context,
        variant: variant ?? undefined
      })

      trackTableBookingClick({
        source,
        context,
        eventName,
        device: isMobile ? 'mobile' : 'desktop',
        timeOfDay,
        dayOfWeek: new Date().toLocaleDateString('en-GB', { weekday: 'long' }),
        variant: variant ?? undefined,
        destination: bookingUrl,
        originPath: pathname
      })

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
