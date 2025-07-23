'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/gtm-events'

export default function ScrollDepthTracker() {
  const milestonesFired = useRef<Set<number>>(new Set())
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return

      rafId.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const scrollableHeight = documentHeight - windowHeight
        const scrollPercentage = (scrollTop / scrollableHeight) * 100

        const milestones = [25, 50, 75, 90]
        
        milestones.forEach((milestone) => {
          if (
            scrollPercentage >= milestone &&
            !milestonesFired.current.has(milestone)
          ) {
            milestonesFired.current.add(milestone)
            
            // Track scroll depth milestone
            trackScrollDepth(milestone)
          }
        })

        rafId.current = null
      })
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return null
}