'use client'

import { useState, useEffect, useRef } from 'react'
import { BusinessHours } from '@/lib/api'
import { logError } from '@/lib/error-handling'
import { computeNextStatusChange } from '@/lib/status-boundary-calculator'

interface UseBusinessHoursOptions {
  refreshInterval?: number
  apiEndpoint?: string
}

interface CachedData {
  data: BusinessHours | null
  etag: string | null
  lastFetchTime: Date | null
  isStale: boolean
}

interface UseBusinessHoursReturn {
  hours: BusinessHours | null
  loading: boolean
  error: Error | null
  isStale: boolean
  refresh: () => Promise<void>
}

/**
 * Custom hook for fetching and managing business hours data
 * Now with ETag support, smart refresh timing, and robust error handling
 */
export function useBusinessHours(options: UseBusinessHoursOptions = {}): UseBusinessHoursReturn {
  const {
    apiEndpoint = '/api/business/hours'
  } = options

  const [cached, setCached] = useState<CachedData>({ 
    data: null, 
    etag: null,
    lastFetchTime: null,
    isStale: false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const retryCount = useRef(0)
  const abortControllerRef = useRef<AbortController>()
  const nextRefreshTimerRef = useRef<NodeJS.Timeout>()
  const fallbackTimerRef = useRef<NodeJS.Timeout>()

  const scheduleNextRefresh = (data: BusinessHours, trigger: string) => {
    // Clear any existing timers
    if (nextRefreshTimerRef.current) {
      clearTimeout(nextRefreshTimerRef.current)
    }

    try {
      // Calculate next status change
      const nextChange = computeNextStatusChange(data)
      
      // Refresh 10 seconds before the boundary to account for network delay
      const msUntilRefresh = Math.max(
        5000, // Minimum 5 seconds
        nextChange.at.getTime() - Date.now() - 10000
      )

      if (process.env.NODE_ENV === 'development') {
        const minutesUntil = Math.round(msUntilRefresh / 60000)
        console.log(
          `[StatusBar] Next refresh scheduled in ${minutesUntil} minutes for ${nextChange.reason}`,
          {
            trigger,
            nextChange: nextChange.at.toISOString(),
            currentTime: new Date().toISOString()
          }
        )
      }

      nextRefreshTimerRef.current = setTimeout(() => {
        fetchHours('boundary')
      }, msUntilRefresh)
    } catch (err) {
      // If boundary calculation fails, fall back to regular interval
      if (process.env.NODE_ENV === 'development') {
        console.warn('[StatusBar] Failed to calculate next boundary, using fallback', err)
      }
    }
  }

  const fetchHours = async (trigger: string = 'unknown') => {
    try {
      // Log refresh trigger in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[StatusBar] Refresh triggered by: ${trigger} at ${new Date().toISOString()}`)
      }

      // Cancel any in-flight request
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      const headers: HeadersInit = {}
      if (cached.etag) {
        headers['If-None-Match'] = cached.etag
      }

      const response = await fetch(apiEndpoint, {
        headers,
        cache: 'no-store',
        signal: abortControllerRef.current.signal
      })

      if (response.status === 304) {
        // Data hasn't changed, mark as fresh
        setCached(prev => ({ ...prev, isStale: false, lastFetchTime: new Date() }))
        if (process.env.NODE_ENV === 'development') {
          console.log('[StatusBar] 304 Not Modified - using cached data')
        }
        // Still reschedule based on cached data
        if (cached.data) {
          scheduleNextRefresh(cached.data, '304-refresh')
        }
        return
      }

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }

      const result = await response.json()
      const newEtag = response.headers.get('ETag')
      
      // Handle API response wrapper
      const data = result.success && result.data ? result.data : result
      
      // Validate the response has expected structure
      if (!data.regularHours || !data.currentStatus) {
        throw new Error('Invalid business hours data structure')
      }
      
      // Successfully fetched - reset retry count
      retryCount.current = 0
      
      setCached({
        data,
        etag: newEtag,
        lastFetchTime: new Date(),
        isStale: false
      })
      setError(null)
      
      // Schedule next refresh based on new data
      scheduleNextRefresh(data, 'fetch-success')
      
    } catch (err: any) {
      if (err.name === 'AbortError') return
      
      // On error, mark existing data as stale but keep showing it
      setCached(prev => ({ ...prev, isStale: true }))
      
      const error = err instanceof Error ? err : new Error('Failed to fetch business hours')
      setError(error)
      logError('use-business-hours', error)
      
      // Exponential backoff for retries
      retryCount.current++
      const retryDelay = Math.min(60000, 5000 * Math.pow(2, retryCount.current - 1))
      
      if (process.env.NODE_ENV === 'development') {
        console.error(`[StatusBar] Fetch error, retry in ${retryDelay}ms:`, err)
      }
      
      // Schedule retry
      if (nextRefreshTimerRef.current) {
        clearTimeout(nextRefreshTimerRef.current)
      }
      nextRefreshTimerRef.current = setTimeout(() => fetchHours('error-retry'), retryDelay)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch on mount
  useEffect(() => {
    fetchHours('mount')
    
    // Set up fallback timer (60 seconds) in case boundary calculation fails
    fallbackTimerRef.current = setInterval(() => {
      fetchHours('fallback')
    }, 60000)
    
    return () => {
      // Cleanup
      if (fallbackTimerRef.current) {
        clearInterval(fallbackTimerRef.current)
      }
      if (nextRefreshTimerRef.current) {
        clearTimeout(nextRefreshTimerRef.current)
      }
      abortControllerRef.current?.abort()
    }
  }, [apiEndpoint])

  // Refresh on visibility/focus changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchHours('visibility')
      }
    }
    
    const handleFocus = () => {
      fetchHours('focus')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return {
    hours: cached.data,
    loading,
    error,
    isStale: cached.isStale,
    refresh: () => fetchHours('manual')
  }
}