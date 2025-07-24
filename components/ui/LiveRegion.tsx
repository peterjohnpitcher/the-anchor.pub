'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface LiveRegionProps {
  message: string
  type?: 'polite' | 'assertive'
  className?: string
  clearAfter?: number // milliseconds to clear the message
}

export function LiveRegion({ 
  message, 
  type = 'polite',
  className,
  clearAfter = 5000 
}: LiveRegionProps) {
  const regionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (message && clearAfter > 0) {
      const timer = setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = ''
        }
      }, clearAfter)
      
      return () => clearTimeout(timer)
    }
  }, [message, clearAfter])
  
  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={type}
      aria-atomic="true"
      className={cn('sr-only', className)}
    >
      {message}
    </div>
  )
}

// Global live region for app-wide announcements
let globalLiveRegion: HTMLDivElement | null = null

export function announceToScreenReader(
  message: string, 
  type: 'polite' | 'assertive' = 'polite',
  clearAfter: number = 5000
) {
  if (typeof window === 'undefined') return
  
  // Create global live region if it doesn't exist
  if (!globalLiveRegion) {
    globalLiveRegion = document.createElement('div')
    globalLiveRegion.setAttribute('role', 'status')
    globalLiveRegion.setAttribute('aria-live', type)
    globalLiveRegion.setAttribute('aria-atomic', 'true')
    globalLiveRegion.className = 'sr-only'
    document.body.appendChild(globalLiveRegion)
  }
  
  // Update the live region type if needed
  globalLiveRegion.setAttribute('aria-live', type)
  
  // Clear previous message
  globalLiveRegion.textContent = ''
  
  // Set new message after a brief delay to ensure screen readers pick it up
  setTimeout(() => {
    if (globalLiveRegion) {
      globalLiveRegion.textContent = message
      
      // Clear after specified time
      if (clearAfter > 0) {
        setTimeout(() => {
          if (globalLiveRegion) {
            globalLiveRegion.textContent = ''
          }
        }, clearAfter)
      }
    }
  }, 100)
}

// Hook for using live regions
import { useState, useCallback } from 'react'

export function useLiveRegion(defaultType: 'polite' | 'assertive' = 'polite') {
  const [message, setMessage] = useState('')
  
  const announce = useCallback((newMessage: string, type?: 'polite' | 'assertive') => {
    setMessage('')
    setTimeout(() => {
      setMessage(newMessage)
      announceToScreenReader(newMessage, type || defaultType)
    }, 100)
  }, [defaultType])
  
  return { message, announce }
}