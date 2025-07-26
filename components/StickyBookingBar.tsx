'use client'

import { useState, useEffect } from 'react'
import { Button, Container } from '@/components/ui'
import { cn } from '@/lib/utils'
import { trackTableBookingClick } from '@/lib/gtm-events'

interface StickyBookingBarProps {
  source?: string
  incentiveMessage?: string
  className?: string
}

export function StickyBookingBar({ 
  source = 'sticky_bar',
  incentiveMessage = "Hungry? Book your table now",
  className 
}: StickyBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [partySize, setPartySize] = useState('2')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      // Show the bar after scrolling past 600px (roughly past the hero section)
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 600)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookingClick = () => {
    if (typeof window !== 'undefined') {
      trackTableBookingClick(source)
      // Navigate to booking page with party size
      window.location.href = `/book-table?party_size=${partySize}`
    }
  }

  return (
    <>
      {/* Sticky Bar - Desktop Only */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 hidden lg:block',
          isVisible ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        <Container>
          <div className="py-4 flex items-center justify-between">
            {/* Left side - Incentive message */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-anchor-green">
                🍴 {incentiveMessage}
              </span>
            </div>

            {/* Right side - Party size selector and book button */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="sticky-party-size" className="text-sm text-gray-600 font-medium">
                  Party size:
                </label>
                <select
                  id="sticky-party-size"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleBookingClick}
                variant="primary"
                size="md"
                className="bg-anchor-gold hover:bg-anchor-gold/90 text-white"
              >
                Book a Table
              </Button>
            </div>
          </div>
        </Container>
      </div>

    </>
  )
}