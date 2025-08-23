/**
 * Example usage of table booking API routes
 * This shows how to use the new table booking endpoints from a React component
 */

'use client'

import { useState } from 'react'
import type { 
  TableBookingRequest, 
  TableBookingResponse,
  TableAvailabilityResponse 
} from '@/lib/api'

export function TableBookingExample() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState<TableBookingResponse | null>(null)

  // Check availability
  const checkAvailability = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/table-bookings/availability?' + new URLSearchParams({
        date: '2024-01-20',
        time: '19:00',
        party_size: '4'
      }))
      
      if (!response.ok) {
        throw new Error('Failed to check availability')
      }
      
      const data: TableAvailabilityResponse = await response.json()
      console.log('Available slots:', data.time_slots)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Create booking
  const createBooking = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const bookingData: TableBookingRequest = {
        booking_type: 'regular',
        date: '2024-01-20',
        time: '19:00',
        party_size: 4,
        customer: {
          first_name: 'John',
          last_name: 'Doe',
          mobile_number: '07700900000',
          sms_opt_in: true
        },
        duration_minutes: 120,
        special_requirements: 'Window table if possible',
        dietary_requirements: ['Vegetarian'],
        allergies: ['Nuts'],
        celebration_type: 'birthday',
        source: 'website'
      }
      
      const response = await fetch('/api/table-bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create booking')
      }
      
      const data: TableBookingResponse = await response.json()
      setBooking(data)
      console.log('Booking created:', data.booking_reference)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Get booking details
  const getBookingDetails = async (reference: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/table-bookings/${reference}`)
      
      if (!response.ok) {
        throw new Error('Failed to get booking details')
      }
      
      const data: TableBookingResponse = await response.json()
      setBooking(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Cancel booking
  const cancelBooking = async (reference: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/table-bookings/${reference}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: 'Changed plans' })
      })
      
      if (!response.ok) {
        throw new Error('Failed to cancel booking')
      }
      
      const data = await response.json()
      console.log('Booking cancelled:', data)
      setBooking(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Get Sunday lunch menu
  const getSundayLunchMenu = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/table-bookings/menu/sunday-lunch')
      
      if (!response.ok) {
        throw new Error('Failed to get menu')
      }
      
      const data = await response.json()
      console.log('Sunday lunch menu:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Table Booking Example</h2>
      
      {error && <div className="error">Error: {error}</div>}
      {loading && <div>Loading...</div>}
      
      <button onClick={checkAvailability} disabled={loading}>
        Check Availability
      </button>
      
      <button onClick={createBooking} disabled={loading}>
        Create Booking
      </button>
      
      <button onClick={getSundayLunchMenu} disabled={loading}>
        Get Sunday Lunch Menu
      </button>
      
      {booking && (
        <div>
          <h3>Booking Details</h3>
          <p>Reference: {booking.booking_reference}</p>
          <p>Date: {booking.confirmation_details?.date || booking.booking_details?.date}</p>
          <p>Time: {booking.confirmation_details?.time || booking.booking_details?.time}</p>
          <p>Party Size: {booking.confirmation_details?.party_size || booking.booking_details?.party_size}</p>
          <p>Status: {booking.status}</p>
          
          <button 
            onClick={() => cancelBooking(booking.booking_reference)} 
            disabled={loading}
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  )
}