'use client'

import { useEffect } from 'react'
import { Card, CardBody } from '@/components/ui/layout/Card'
import { Button } from '@/components/ui/primitives/Button'
import { Alert } from '@/components/ui/feedback/Alert'
import { Badge } from '@/components/ui/primitives/Badge'
import { Icon } from '@/components/ui/Icon'
import { PhoneLink } from '@/components/PhoneLink'
import type { TableBookingResponse } from '@/lib/api'

export interface BookingConfirmationProps {
  booking: TableBookingResponse
  onNewBooking?: () => void
  className?: string
}

export default function BookingConfirmation({
  booking,
  onNewBooking,
  className = ''
}: BookingConfirmationProps) {
  // Play success sound on mount
  useEffect(() => {
    // Optional: Play a subtle success sound
    const audio = new Audio('/sounds/success.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Ignore if autoplay is blocked
    })
  }, [])

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeStr: string): string => {
    const [hour, minute] = timeStr.split(':').map(Number)
    const period = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour || 12
    return minute === 0 ? `${displayHour}${period}` : `${displayHour}:${minute.toString().padStart(2, '0')}${period}`
  }

  const addToCalendar = () => {
    const date = booking.confirmation_details?.date || booking.booking_details?.date
    const time = booking.confirmation_details?.time || booking.booking_details?.time
    const duration = booking.confirmation_details?.duration_minutes || booking.booking_details?.duration_minutes || 120
    const startDate = new Date(`${date}T${time}`)
    const endDate = new Date(startDate.getTime() + duration * 60000)
    
    const event = {
      title: `Table booking at The Anchor`,
      start: startDate.toISOString().replace(/-|:|\.\d\d\d/g, ''),
      end: endDate.toISOString().replace(/-|:|\.\d\d\d/g, ''),
      location: 'The Anchor, 5-7 Church Street, Colnbrook, SL3 0LW',
      details: `Booking reference: ${booking.booking_reference}\nParty size: ${booking.confirmation_details?.party_size || booking.booking_details?.party_size} people`
    }
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.details)}`
    
    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <Card variant="elevated" className={`bg-green-50 border-green-200 ${className}`}>
      <CardBody>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Icon name="check" className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Booking Confirmed!
          </h2>
          
          <p className="text-gray-700">
            We'll send you a text confirmation to your phone number
          </p>
        </div>

        <Alert variant="success" className="mb-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">Booking Reference:</span>
            <Badge variant="success" size="lg">
              {booking.booking_reference}
            </Badge>
          </div>
        </Alert>

        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center text-gray-600">
              <Icon name="calendar" className="mr-2 h-4 w-4" />
              <span className="text-sm">Date</span>
            </div>
            <span className="font-medium">{formatDate(booking.confirmation_details?.date || booking.booking_details?.date || '')}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center text-gray-600">
              <Icon name="clock" className="mr-2 h-4 w-4" />
              <span className="text-sm">Time</span>
            </div>
            <span className="font-medium">{formatTime(booking.confirmation_details?.time || booking.booking_details?.time || '')}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center text-gray-600">
              <Icon name="users" className="mr-2 h-4 w-4" />
              <span className="text-sm">Party Size</span>
            </div>
            <span className="font-medium">
              {booking.confirmation_details?.party_size || booking.booking_details?.party_size} {(booking.confirmation_details?.party_size || booking.booking_details?.party_size) === 1 ? 'person' : 'people'}
            </span>
          </div>
          
          {(booking.confirmation_details?.special_requirements || booking.booking_details?.special_requirements) && (
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-start">
                <Icon name="info" className="mr-2 h-4 w-4 text-gray-600 mt-0.5" />
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Special Requirements</span>
                  <span className="text-sm">{booking.confirmation_details?.special_requirements || booking.booking_details?.special_requirements}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={addToCalendar}
          >
            <Icon name="calendar" className="mr-2" />
            Add to Calendar
          </Button>
          
          {onNewBooking && (
            <Button
              variant="ghost"
              fullWidth
              onClick={onNewBooking}
            >
              Make Another Booking
            </Button>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-green-200">
          <p className="text-sm text-gray-600 text-center">
            Need to change or cancel your booking? Call us at{' '}
            <PhoneLink
              phone="01753682707"
              source="booking_confirmation"
              className="font-semibold text-green-700 underline"
              showIcon={false}
            >
              01753 682707
            </PhoneLink>
          </p>
          
          {booking.cancellation_policy && (
            <p className="text-xs text-gray-500 text-center mt-2">
              {booking.cancellation_policy}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  )
}