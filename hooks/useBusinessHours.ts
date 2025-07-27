'use client'

import { useState, useEffect } from 'react'
import { BusinessHours } from '@/lib/api'
import { logError } from '@/lib/error-handling'

interface UseBusinessHoursOptions {
  refreshInterval?: number
  apiEndpoint?: string
}

interface UseBusinessHoursReturn {
  hours: BusinessHours | null
  loading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

/**
 * Custom hook for fetching and managing business hours data
 * Handles API response format, error states, and automatic refresh
 */
export function useBusinessHours(options: UseBusinessHoursOptions = {}): UseBusinessHoursReturn {
  const {
    refreshInterval = 5 * 60 * 1000, // 5 minutes default
    apiEndpoint = '/api/business/hours'
  } = options

  const [hours, setHours] = useState<BusinessHours | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchHours = async () => {
    try {
      setError(null)
      
      // Add timestamp to prevent caching
      const url = `${apiEndpoint}${apiEndpoint.includes('?') ? '&' : '?'}t=${Date.now()}`
      
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch business hours: ${response.status}`)
      }
      
      const result = await response.json()
      
      // Handle API response wrapper
      if (result.success === false && result.error) {
        throw new Error(result.error.message || 'API request failed')
      }
      
      // Extract data from wrapper if present
      const data = result.success && result.data ? result.data : result
      
      // Validate the response has expected structure
      if (!data.regularHours || !data.currentStatus) {
        throw new Error('Invalid business hours data structure')
      }
      
      setHours(data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      logError('use-business-hours', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHours()
    
    if (refreshInterval > 0) {
      const interval = setInterval(fetchHours, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [apiEndpoint, refreshInterval])

  return {
    hours,
    loading,
    error,
    refresh: fetchHours
  }
}