'use client'

import { useBusinessHours } from './useBusinessHours'
import { getApiDayName } from '@/lib/time-utils'

interface KitchenStatus {
  isOpen: boolean
  status: 'open' | 'closed' | 'no-service'
  message: string
  opensAt?: string
  closesAt?: string
}

/**
 * Custom hook for kitchen-specific status
 * Uses the currentStatus.kitchenOpen field from the API
 */
export function useKitchenStatus(): {
  kitchen: KitchenStatus | null
  loading: boolean
  error: Error | null
} {
  const { hours, loading, error } = useBusinessHours()

  if (!hours || loading || error) {
    return {
      kitchen: null,
      loading,
      error
    }
  }

  // Use the currentStatus.kitchenOpen field from the API
  const kitchenOpen = hours.currentStatus.kitchenOpen ?? false
  
  // Get today's regular hours for additional info
  const todayName = getApiDayName()
  const todayHours = hours.regularHours[todayName]
  
  
  // Determine kitchen status
  if (!todayHours || todayHours.is_closed) {
    return {
      kitchen: {
        isOpen: false,
        status: 'closed',
        message: 'Closed today'
      },
      loading: false,
      error: null
    }
  }

  // Check kitchen data for times and service status
  const kitchenData = todayHours.kitchen
  
  if (!kitchenData || kitchenData === null) {
    return {
      kitchen: {
        isOpen: false,
        status: 'no-service',
        message: 'No kitchen service today'
      },
      loading: false,
      error: null
    }
  }
  
  // Check if kitchen has specific hours
  if (typeof kitchenData === 'object' && 'opens' in kitchenData && 'closes' in kitchenData) {
    return {
      kitchen: {
        isOpen: kitchenOpen,
        status: kitchenOpen ? 'open' : 'closed',
        message: kitchenOpen ? 'Kitchen open' : 'Kitchen closed',
        opensAt: kitchenData.opens,
        closesAt: kitchenData.closes
      },
      loading: false,
      error: null
    }
  }
  
  // Kitchen marked as closed
  if ('is_closed' in kitchenData && kitchenData.is_closed === true) {
    return {
      kitchen: {
        isOpen: false,
        status: 'closed',
        message: 'Kitchen closed (bar open)'
      },
      loading: false,
      error: null
    }
  }
  
  // Default case - use the API's kitchenOpen status
  return {
    kitchen: {
      isOpen: kitchenOpen,
      status: kitchenOpen ? 'open' : 'closed',
      message: kitchenOpen ? 'Kitchen open' : 'Kitchen closed'
    },
    loading: false,
    error: null
  }
}