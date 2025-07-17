'use client'

import { useState, useEffect } from 'react'
import { CallToAction } from '@/components/CallToAction'
import { cn } from '@/lib/utils'

export function FloatingEventCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true) // Start minimized

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 15000) // Show after 15 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-40 transition-all duration-300",
        isMinimized ? "translate-y-0" : "translate-y-0"
      )}
    >
      {!isMinimized ? (
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs border border-gray-200">
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Minimize"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <p className="text-sm font-medium text-gray-800 mb-2">
            Planning an event?
          </p>
          <p className="text-xs text-gray-600 mb-2">
            We host private parties & corporate events
          </p>
          
          <div className="space-y-2">
            <CallToAction 
              href="/book-event" 
              variant="primary" 
              size="sm"
              fullWidth
            >
              View Event Options
            </CallToAction>
            <div className="flex gap-2">
              <CallToAction 
                href="tel:01753682707" 
                variant="secondary" 
                size="xs"
                className="flex-1"
              >
                📞 Call
              </CallToAction>
              <CallToAction 
                href="https://wa.me/441753682707?text=Hi,%20I'd%20like%20to%20enquire%20about%20hosting%20an%20event" 
                variant="secondary" 
                size="xs"
                className="flex-1"
              >
                💬 WhatsApp
              </CallToAction>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-md transition-all"
          aria-label="Show event booking options"
        >
          <span className="text-lg">🎉</span>
        </button>
      )}
    </div>
  )
}