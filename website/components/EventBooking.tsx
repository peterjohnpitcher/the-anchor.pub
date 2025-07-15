'use client'

import { useState, useCallback, useMemo, memo } from 'react'
import { initiateEventBooking } from '@/lib/api'
import type { Event } from '@/lib/api'
import { DebouncedInput } from './DebouncedInput'

interface EventBookingProps {
  event: Event
  className?: string
}

function EventBookingComponent({ event, className = '' }: EventBookingProps) {
  const [isBooking, setIsBooking] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [bookingResponse, setBookingResponse] = useState<any>(null)

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    // Remove spaces and special characters
    const cleaned = phone.replace(/[\s-()]/g, '')
    
    // UK mobile number patterns
    const ukMobilePattern = /^(?:(?:\+44|0044|0)7(?:\d{9}))$/
    
    return ukMobilePattern.test(cleaned)
  }, [])

  const formatPhoneNumber = useCallback((phone: string): string => {
    // Remove spaces and special characters
    let cleaned = phone.replace(/[\s-()]/g, '')
    
    // Convert to standard format
    if (cleaned.startsWith('+44')) {
      return cleaned
    } else if (cleaned.startsWith('0044')) {
      return '+44' + cleaned.substring(4)
    } else if (cleaned.startsWith('07')) {
      return '+44' + cleaned.substring(1)
    }
    
    return cleaned
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!phoneNumber.trim()) {
      setError('Please enter your mobile number')
      return
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid UK mobile number')
      return
    }

    setIsBooking(true)

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      const response = await initiateEventBooking(event.id, formattedPhone)

      if (response) {
        setBookingResponse(response)
        setSuccess(true)
        setPhoneNumber('')
      } else {
        setError('Unable to initiate booking. Please try again or call us.')
      }
    } catch (err: any) {
      console.error('Booking error:', err)
      
      // Check for specific error messages
      if (err?.message?.includes('temporarily unavailable') || err?.status === 503) {
        setError('The booking system is temporarily unavailable. Please try again later or call us at 01753 682707.')
      } else if (err?.message?.includes('API key')) {
        setError('There is a configuration issue. Please call us at 01753 682707 to book.')
      } else {
        setError('Unable to process your booking. Please try again or call us at 01753 682707.')
      }
    } finally {
      setIsBooking(false)
    }
  }, [phoneNumber, validatePhoneNumber, formatPhoneNumber, event.id])

  // If event is sold out or not available, show appropriate message
  if (event.remainingAttendeeCapacity === 0) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <p className="text-red-800 font-semibold">This event is sold out</p>
        <p className="text-red-600 text-sm mt-1">
          Please call us at <a href="tel:01753682707" className="underline">01753 682707</a> to join the waiting list.
        </p>
      </div>
    )
  }

  if (success && bookingResponse) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Initiated!</h3>
        <p className="text-green-700 mb-4">
          We've sent a confirmation link to your mobile. Please check your messages and click the link to complete your booking.
        </p>
        {bookingResponse.event && (
          <div className="bg-white rounded p-4 border border-green-100">
            <p className="text-sm text-gray-600">Event: <span className="font-semibold text-gray-800">{bookingResponse.event.name}</span></p>
            <p className="text-sm text-gray-600">Date: <span className="font-semibold text-gray-800">{bookingResponse.event.date}</span></p>
            <p className="text-sm text-gray-600">Time: <span className="font-semibold text-gray-800">{bookingResponse.event.time}</span></p>
            <p className="text-sm text-gray-600">Available seats: <span className="font-semibold text-gray-800">{bookingResponse.event.available_seats}</span></p>
          </div>
        )}
        <p className="text-sm text-green-600 mt-4">
          The confirmation link expires in 24 hours. Didn't receive the message? 
          <button 
            onClick={() => {
              setSuccess(false)
              setBookingResponse(null)
            }}
            className="ml-1 underline font-semibold"
          >
            Try again
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-amber-900 mb-4">Book Your Spot</h3>
      
      {event.remainingAttendeeCapacity && event.remainingAttendeeCapacity < 10 && (
        <p className="text-amber-700 text-sm mb-4 font-semibold">
          Only {event.remainingAttendeeCapacity} seats remaining!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <DebouncedInput
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="07700 900123"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            disabled={isBooking}
            delay={200}
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll send a confirmation link to this number
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isBooking}
          className="w-full bg-amber-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isBooking ? 'Sending confirmation...' : 'Book Now'}
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-amber-200">
        <p className="text-sm text-gray-600">
          Prefer to call? Ring us at{' '}
          <a href="tel:01753682707" className="font-semibold text-amber-700 underline">
            01753 682707
          </a>
        </p>
      </div>
    </div>
  )
}

export default memo(EventBookingComponent)