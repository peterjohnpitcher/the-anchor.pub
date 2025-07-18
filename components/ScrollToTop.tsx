'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScrollToTopProps {
  threshold?: number
  className?: string
  ariaLabel?: string
}

export function ScrollToTop({ 
  threshold = 300,
  className,
  ariaLabel = 'Scroll to top'
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Check initial position
    toggleVisibility()

    // Add scroll listener
    window.addEventListener('scroll', toggleVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label={ariaLabel}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'bg-anchor-gold text-white',
        'p-3 rounded-full shadow-lg',
        'transition-all duration-300',
        'hover:bg-anchor-gold-light hover:scale-110',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-anchor-gold',
        'min-h-[44px] min-w-[44px]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none',
        className
      )}
    >
      <ChevronUp className="w-6 h-6" aria-hidden="true" />
    </button>
  )
}