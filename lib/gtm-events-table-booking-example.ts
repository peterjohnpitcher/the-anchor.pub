// Example usage of table booking tracking events
// This file demonstrates how to use the new table booking tracking functions

import {
  trackTableBookingView,
  trackTableBookingStart,
  trackTableBookingAvailabilityCheck,
  trackTableBookingDetailsEntered,
  trackTableBookingSubmit,
  trackTableBookingSuccess,
  trackTableBookingError,
  trackTableBookingFunnel
} from './gtm-events'

// Example 1: Track when the booking form is viewed
export function onBookingFormView() {
  trackTableBookingView({
    source: 'restaurant_page',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 2: Track when user starts interacting with the form
export function onBookingFormInteraction() {
  trackTableBookingStart({
    source: 'header_cta',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 3: Track availability check
export function onAvailabilityCheck(partySize: number, date: string, time: string) {
  trackTableBookingAvailabilityCheck({
    partySize,
    bookingDate: date,
    bookingTime: time,
    source: 'booking_modal',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 4: Track when customer details are entered
export function onCustomerDetailsEntered(partySize: number, date: string, time: string) {
  trackTableBookingDetailsEntered({
    partySize,
    bookingDate: date,
    bookingTime: time,
    source: 'booking_page',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 5: Track booking submission
export function onBookingSubmit(partySize: number, date: string, time: string) {
  trackTableBookingSubmit({
    partySize,
    bookingDate: date,
    bookingTime: time,
    source: 'booking_page',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 6: Track successful booking
export function onBookingSuccess(
  partySize: number,
  date: string,
  time: string,
  bookingRef?: string
) {
  trackTableBookingSuccess({
    partySize,
    bookingDate: date,
    bookingTime: time,
    bookingReference: bookingRef,
    source: 'booking_confirmation',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 7: Track booking error
export function onBookingError(
  errorType: string,
  errorMessage: string,
  partySize?: number,
  date?: string,
  time?: string
) {
  trackTableBookingError({
    errorType,
    errorMessage,
    partySize,
    bookingDate: date,
    bookingTime: time,
    source: 'booking_page',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example 8: Using the funnel tracking function
export function trackBookingStep(
  step: 'view' | 'start' | 'availability_check' | 'details_entered' | 'submit' | 'success' | 'error',
  data?: {
    partySize?: number
    date?: string
    time?: string
    bookingRef?: string
    errorType?: string
    errorMessage?: string
  }
) {
  trackTableBookingFunnel({
    step,
    partySize: data?.partySize,
    bookingDate: data?.date,
    bookingTime: data?.time,
    bookingReference: data?.bookingRef,
    errorType: data?.errorType,
    errorMessage: data?.errorMessage,
    source: 'booking_flow',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  })
}

// Example usage in a React component:
/*
'use client'

import { useState } from 'react'
import { 
  trackTableBookingView,
  trackTableBookingStart,
  trackTableBookingAvailabilityCheck,
  trackTableBookingDetailsEntered,
  trackTableBookingSubmit,
  trackTableBookingSuccess,
  trackTableBookingError
} from '@/lib/gtm-events'

export function TableBookingComponent() {
  const [partySize, setPartySize] = useState(2)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')

  // Track form view on component mount
  useEffect(() => {
    trackTableBookingView({
      source: 'restaurant_page',
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
    })
  }, [])

  // Track when user starts interacting
  const handleFirstInteraction = () => {
    trackTableBookingStart({
      source: 'restaurant_page',
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
    })
  }

  // Track availability check
  const handleCheckAvailability = () => {
    trackTableBookingAvailabilityCheck({
      partySize,
      bookingDate,
      bookingTime,
      source: 'restaurant_page',
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
    })
    // ... check availability logic
  }

  // Track booking submission
  const handleSubmitBooking = async () => {
    trackTableBookingSubmit({
      partySize,
      bookingDate,
      bookingTime,
      source: 'restaurant_page',
      deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
    })

    try {
      // ... submit booking logic
      const bookingRef = 'ABC123' // from API response
      
      trackTableBookingSuccess({
        partySize,
        bookingDate,
        bookingTime,
        bookingReference: bookingRef,
        source: 'restaurant_page',
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    } catch (error) {
      trackTableBookingError({
        errorType: 'submission_failed',
        errorMessage: error.message,
        partySize,
        bookingDate,
        bookingTime,
        source: 'restaurant_page',
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }
  }

  return (
    // ... component JSX
  )
}
*/