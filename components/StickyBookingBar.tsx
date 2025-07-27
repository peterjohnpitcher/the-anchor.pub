'use client'

import { useState, useEffect } from 'react'
import { Button, Container } from '@/components/ui'
import { cn } from '@/lib/utils'
import { 
  trackTableBookingClick, 
  trackTableBookingStart,
  trackTableBookingDetailsEntered,
  trackTableBookingSubmit,
  trackTableBookingSuccess,
  trackTableBookingError 
} from '@/lib/gtm-events'
import { type BusinessHours, type TableAvailabilityResponse, getKitchenStatus } from '@/lib/api'
import { LoadingState } from '@/components/ui/LoadingState'
import { Icon } from '@/components/ui/Icon'
import { Alert } from '@/components/ui/feedback/Alert'

interface StickyBookingBarProps {
  source?: string
  incentiveMessage?: string
  className?: string
}

export function StickyBookingBar({ 
  source = 'sticky_bar',
  incentiveMessage = "Ready to book? Select a date below",
  className 
}: StickyBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [partySize, setPartySize] = useState('2')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null)
  const [availability, setAvailability] = useState<TableAvailabilityResponse | null>(null)
  const [checkingAvailability, setCheckingAvailability] = useState(false)

  // Set default date to today
  useEffect(() => {
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]
    setDate(dateStr)
  }, [])

  // Fetch business hours
  useEffect(() => {
    const fetchBusinessHours = async () => {
      try {
        const response = await fetch('/api/business-hours')
        const data = await response.json()
        if (data && !data.error) {
          setBusinessHours(data)
        }
      } catch (err) {
        console.error('Failed to fetch business hours:', err)
      }
    }
    fetchBusinessHours()
  }, [])

  // Check availability when date, time, or party size changes
  useEffect(() => {
    const checkAvailability = async () => {
      if (!date || !time || !partySize) return
      
      setCheckingAvailability(true)
      try {
        const response = await fetch('/api/table-bookings/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date,
            time,
            party_size: parseInt(partySize)
          })
        })
        
        const data = await response.json()
        setAvailability(data)
      } catch (err) {
        console.error('Failed to check availability:', err)
      } finally {
        setCheckingAvailability(false)
      }
    }
    
    checkAvailability()
  }, [date, time, partySize])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      // Show the bar after scrolling past 600px (roughly past the hero section)
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 600)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get kitchen closure info for selected date
  const getKitchenClosureForDate = (selectedDate: string) => {
    if (!businessHours) return null
    
    // Check for special hours with kitchen closure notes
    const specialHour = businessHours.specialHours?.find(sh => 
      sh.date.startsWith(selectedDate) && sh.is_closed
    )
    
    if (specialHour) {
      return specialHour.note || specialHour.reason || 'Kitchen Closed'
    }
    
    // Check regular hours for kitchen status
    const date = new Date(selectedDate)
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const dayHours = businessHours.regularHours[dayName]
    
    if (!dayHours || dayHours.is_closed) {
      return 'Closed All Day'
    }
    
    // Check kitchen status
    const kitchenStatus = dayHours.kitchen ? getKitchenStatus(dayHours.kitchen) : 'no-service'
    if (kitchenStatus === 'no-service' || kitchenStatus === 'closed') {
      return 'Kitchen Closed'
    }
    
    return null
  }

  // Get available times for selected date
  const getAvailableTimes = () => {
    if (!businessHours || !date) return []
    
    const selectedDate = new Date(date)
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const dayHours = businessHours.regularHours[dayName]
    
    if (!dayHours || dayHours.is_closed) return []
    
    const times = []
    const [openHour, openMin] = dayHours.opens!.split(':').map(Number)
    const [closeHour, closeMin] = dayHours.closes!.split(':').map(Number)
    
    // Generate 30-minute slots
    for (let hour = openHour; hour <= closeHour; hour++) {
      for (let min = 0; min < 60; min += 30) {
        if (hour === openHour && min < openMin) continue
        if (hour === closeHour && min >= closeMin) continue
        
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
        times.push(timeStr)
      }
    }
    
    return times
  }

  const handleBookingSubmit = async () => {
    if (!date || !time || !firstName || !lastName || !mobile) {
      setError('Please fill in all fields')
      return
    }
    
    setLoading(true)
    setError(null)
    
    if (typeof window !== 'undefined') {
      trackTableBookingStart({
        source,
        deviceType: 'desktop'
      })
      
      trackTableBookingDetailsEntered({
        partySize: parseInt(partySize),
        bookingDate: date,
        bookingTime: time,
        source,
        deviceType: 'desktop'
      })
      
      trackTableBookingSubmit({
        partySize: parseInt(partySize),
        bookingDate: date,
        bookingTime: time,
        source,
        deviceType: 'desktop'
      })
    }
    
    try {
      const response = await fetch('/api/table-bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_type: 'regular',
          date,
          time,
          party_size: parseInt(partySize),
          customer: {
            first_name: firstName,
            last_name: lastName,
            mobile_number: mobile
          },
          source: 'website'
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking')
      }
      
      if (typeof window !== 'undefined') {
        trackTableBookingSuccess({
          partySize: parseInt(partySize),
          bookingDate: date,
          bookingTime: time,
          bookingReference: data.booking_reference,
          source,
          deviceType: 'desktop'
        })
      }
      
      // Redirect to success page or show success message
      window.location.href = `/book-table?success=true&reference=${data.booking_reference}`
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create booking'
      setError(errorMessage)
      
      if (typeof window !== 'undefined') {
        trackTableBookingError({
          errorType: 'submission_error',
          errorMessage,
          partySize: parseInt(partySize),
          bookingDate: date,
          bookingTime: time,
          source,
          deviceType: 'desktop'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Sticky Bar - Desktop Only */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 hidden lg:block',
          isVisible ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        <Container>
          <div className="py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-anchor-green">
                🍴 {incentiveMessage}
              </span>
              {error && (
                <span className="text-sm text-red-600 flex items-center gap-1">
                  <Icon name="alert" className="h-4 w-4" />
                  {error}
                </span>
              )}
            </div>

            {/* Kitchen Closure Alert */}
            {date && getKitchenClosureForDate(date) && (
              <Alert variant="warning" className="mb-3">
                <Icon name="alert" className="h-4 w-4" />
                <div>
                  <p className="font-medium">
                    {new Date(date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-sm">{getKitchenClosureForDate(date)}</p>
                </div>
              </Alert>
            )}

            {/* Form Fields */}
            <div className="flex items-center gap-3">
              {/* Date Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="sticky-date" className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  Date:
                </label>
                <input
                  type="date"
                  id="sticky-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent"
                />
              </div>

              {/* Time Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="sticky-time" className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  Time:
                </label>
                <select
                  id="sticky-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!date}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select time</option>
                  {getAvailableTimes().map(timeSlot => {
                    const [hour, min] = timeSlot.split(':').map(Number)
                    const displayHour = hour > 12 ? hour - 12 : hour
                    const amPm = hour >= 12 ? 'PM' : 'AM'
                    return (
                      <option key={timeSlot} value={timeSlot}>
                        {displayHour}:{min.toString().padStart(2, '0')} {amPm}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Party Size */}
              <div className="flex items-center gap-2">
                <label htmlFor="sticky-party-size" className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  Party:
                </label>
                <select
                  id="sticky-party-size"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* First Name */}
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent"
              />

              {/* Last Name */}
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent"
              />

              {/* Mobile */}
              <input
                type="tel"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent"
              />

              {/* Availability Status */}
              {checkingAvailability && (
                <LoadingState variant="dots" size="sm" className="inline-flex" />
              )}
              
              {availability && !checkingAvailability && (
                <span className={cn(
                  "text-sm font-medium",
                  availability.available ? "text-green-600" : "text-red-600"
                )}>
                  {availability.available ? '✓ Available' : '✗ Not available'}
                </span>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleBookingSubmit}
                variant="primary"
                size="md"
                disabled={loading || !date || !time || !firstName || !lastName || !mobile || !!(availability && !availability.available)}
                className="bg-anchor-gold hover:bg-anchor-gold/90 text-white whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <LoadingState variant="dots" size="sm" className="inline-flex mr-2" />
                    Booking...
                  </>
                ) : (
                  'Book Now'
                )}
              </Button>
            </div>
          </div>
        </Container>
      </div>

    </>
  )
}