'use client'

import { useEffect, useRef, useState } from 'react'
import { pushToDataLayer } from '@/lib/gtm-events'

interface ScrollDepthTrackerProps {
  thresholds?: number[]
}

export function ScrollDepthTracker({ 
  thresholds = [25, 50, 75, 90] 
}: ScrollDepthTrackerProps) {
  const [trackedDepths, setTrackedDepths] = useState<Set<number>>(new Set())
  const timeOnPageRef = useRef<number>(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedDepths.has(threshold)) {
          const timeSpent = Math.round((Date.now() - timeOnPageRef.current) / 1000)
          
          pushToDataLayer({
            event: 'scroll_depth',
            scroll_threshold: threshold,
            scroll_units: 'percent',
            time_on_page: timeSpent,
            page_path: window.location.pathname
          })
          
          setTrackedDepths(prev => new Set(prev).add(threshold))
        }
      })
    }

    // Cheque initial scroll position
    handleScroll()

    // Add scroll listener with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [thresholds, trackedDepths])

  return null
}