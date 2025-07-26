'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/primitives/Button'
import { Select } from '@/components/ui/forms/Select'
import { DatePicker } from '@/components/ui/forms/DatePicker'
import { Alert } from '@/components/ui/feedback/Alert'
import { Badge } from '@/components/ui/primitives/Badge'
import { Icon } from '@/components/ui/Icon'
import { PhoneLink } from '@/components/PhoneLink'
import { getBusinessHours } from '@/lib/api'
import type { BusinessHours } from '@/lib/api'
import { trackFormStart } from '@/lib/gtm-events'

export interface BookingDatePickerProps {
  onDateTimeSelect: (date: string, time: string, partySize: number) => void
  minDate?: Date
  maxDate?: Date
  defaultPartySize?: number
  className?: string
}

// Generate time slots based on kitchen hours
const generateTimeSlots = (
  startHour: number = 12,
  endHour: number = 21,
  endMinute: number = 30
): { value: string; label: string }[] => {
  const slots = []
  
  // Handle case where end time is before start time (crosses midnight)
  const actualEndHour = endHour < startHour ? endHour + 24 : endHour
  
  for (let hour = startHour; hour <= actualEndHour; hour++) {
    const displayHour = hour > 24 ? hour - 24 : hour
    
    for (let minute = 0; minute < 60; minute += 30) {
      // Stop if we've reached the end time
      if (hour === actualEndHour && minute > endMinute) break
      
      const hourStr = displayHour.toString().padStart(2, '0')
      const minuteStr = minute.toString().padStart(2, '0')
      const value = `${hourStr}:${minuteStr}`
      
      const hour12 = displayHour > 12 ? displayHour - 12 : displayHour === 0 ? 12 : displayHour
      const period = displayHour >= 12 ? 'pm' : 'am'
      const label = `${hour12}:${minuteStr}${period}`
      
      slots.push({ value, label })
    }
  }
  
  return slots
}

// Party size options - limited to 6 for immediate confirmation
const PARTY_SIZE_OPTIONS = [
  { value: '1', label: '1 person' },
  { value: '2', label: '2 people' },
  { value: '3', label: '3 people' },
  { value: '4', label: '4 people' },
  { value: '5', label: '5 people' },
  { value: '6', label: '6 people' },
  { value: '7+', label: '7+ people (call us)' }
]

export default function BookingDatePicker({
  onDateTimeSelect,
  minDate = new Date(),
  maxDate,
  defaultPartySize = 2,
  className = ''
}: BookingDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [partySize, setPartySize] = useState<string>(defaultPartySize.toString())
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null)
  const [loadingHours, setLoadingHours] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ value: string; label: string }[]>([])

  // Fetch business hours
  useEffect(() => {
    async function fetchHours() {
      try {
        const hours = await getBusinessHours()
        setBusinessHours(hours)
      } catch (err) {
        console.error('Failed to fetch business hours:', err)
        setError('Unable to load opening hours')
      } finally {
        setLoadingHours(false)
      }
    }
    fetchHours()
  }, [])

  // Check if selected date/time is available
  const isDateTimeAvailable = useCallback((dateStr: string, time: string): boolean => {
    if (!dateStr || !time || !businessHours) return true // Assume available if we can't check

    const date = new Date(dateStr)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const dayHours = businessHours.regularHours[dayOfWeek]

    if (dayHours?.is_closed) {
      return false
    }

    // Check special hours for the specific date
    const specialDay = businessHours.specialHours.find(sh => sh.date === dateStr)
    if (specialDay?.is_closed) {
      return false
    }

    // Check if time is within kitchen hours
    if (dayHours?.kitchen) {
      const [openHour, openMin] = dayHours.kitchen.opens.split(':').map(Number)
      const [closeHour, closeMin] = dayHours.kitchen.closes.split(':').map(Number)
      const [selectedHour, selectedMin] = time.split(':').map(Number)

      const openMinutes = openHour * 60 + openMin
      const closeMinutes = closeHour * 60 + closeMin
      const selectedMinutes = selectedHour * 60 + selectedMin

      return selectedMinutes >= openMinutes && selectedMinutes <= closeMinutes
    }

    return true
  }, [businessHours])

  // Get kitchen hours for selected date
  const getKitchenHours = useCallback((dateStr: string): string | null => {
    if (!dateStr || !businessHours) return null

    const date = new Date(dateStr)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const dayHours = businessHours.regularHours[dayOfWeek]
    
    // Monday - kitchen closed
    if (dayOfWeek === 'monday') {
      return 'Kitchen closed on Mondays'
    }

    if (dayHours?.kitchen) {
      return `Kitchen: ${formatTime(dayHours.kitchen.opens)} - ${formatTime(dayHours.kitchen.closes)}`
    } else if (dayHours && !dayHours.is_closed) {
      // If no specific kitchen hours but restaurant is open, show estimated hours
      return 'Kitchen: 12pm - 9pm (estimated)'
    }

    return 'Kitchen closed'
  }, [businessHours])

  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour || 12
    return minute === 0 ? `${displayHour}${period}` : `${displayHour}:${minute.toString().padStart(2, '0')}${period}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time')
      return
    }

    if (!isDateTimeAvailable(selectedDate, selectedTime)) {
      setError('The kitchen is closed at this time. Please select another time.')
      return
    }

    if (partySize === '7+') {
      setError('For parties larger than 6, please call us at 01753 682707 to discuss your requirements and confirm availability.')
      return
    }

    onDateTimeSelect(selectedDate, selectedTime, parseInt(partySize))
  }

  const handleFormInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      trackFormStart('Table Booking - Date Selection')
    }
  }

  // Update available time slots when date changes
  useEffect(() => {
    if (!selectedDate || !businessHours) {
      setAvailableTimeSlots([])
      return
    }

    const date = new Date(selectedDate)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    
    // Check for special hours first
    const specialDay = businessHours.specialHours?.find(sh => sh.date === selectedDate)
    if (specialDay) {
      if (specialDay.is_closed) {
        setAvailableTimeSlots([])
        return
      }
      // TODO: Handle special hours when kitchen hours are provided
    }
    
    const dayHours = businessHours.regularHours?.[dayOfWeek]

    if (!dayHours || dayHours.is_closed) {
      setAvailableTimeSlots([])
      return
    }
    
    // Special case: Kitchen closed on Mondays (kitchen is null)
    if (!dayHours.kitchen) {
      setAvailableTimeSlots([])
      return
    }

    // Use kitchen hours - they are required for table bookings
    const hoursToUse = dayHours.kitchen
    
    if (!hoursToUse || !hoursToUse.opens || !hoursToUse.closes) {
      setAvailableTimeSlots([])
      return
    }

    // Parse hours - handle HH:mm:ss format
    const openParts = hoursToUse.opens.split(':')
    const closeParts = hoursToUse.closes.split(':')
    
    const openHour = parseInt(openParts[0])
    const openMin = parseInt(openParts[1])
    const closeHour = parseInt(closeParts[0])
    const closeMin = parseInt(closeParts[1])
    
    // Generate slots based on kitchen hours
    // We want to stop taking bookings 30 minutes before kitchen closes
    let lastSlotMinute = closeMin - 30
    let lastSlotHour = closeHour
    
    if (lastSlotMinute < 0) {
      lastSlotMinute = 30
      lastSlotHour = closeHour - 1
    }
    
    const slots = generateTimeSlots(openHour, lastSlotHour, lastSlotMinute)
    setAvailableTimeSlots(slots)
    
    // Reset time selection if it's no longer valid
    if (selectedTime && !slots.find(s => s.value === selectedTime)) {
      setSelectedTime('')
    }
  }, [selectedDate, businessHours, selectedTime])

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <DatePicker
            id="booking-date"
            label="Select Date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setError(null)
              handleFormInteraction()
            }}
            minDate={minDate.toISOString().split('T')[0]}
            maxDate={maxDate?.toISOString().split('T')[0]}
            disabled={loadingHours}
            error={error && !selectedTime ? 'Please select a date' : undefined}
            helperText={selectedDate ? getKitchenHours(selectedDate) || undefined : undefined}
          />
        </div>

        <div>
          <label htmlFor="booking-time" className="block text-sm font-medium text-gray-700 mb-1">
            Select Time
          </label>
          <Select
            id="booking-time"
            value={selectedTime}
            onChange={(e) => {
              setSelectedTime(e.target.value)
              setError(null)
              handleFormInteraction()
            }}
            disabled={!selectedDate || loadingHours}
            error={!!(error && selectedDate && !selectedTime)}
          >
            <option value="">Choose a time</option>
            {availableTimeSlots.length === 0 && selectedDate ? (
              <option disabled>No times available</option>
            ) : (
              availableTimeSlots.map(slot => (
                <option key={slot.value} value={slot.value}>{slot.label}</option>
              ))
            )}
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="party-size" className="block text-sm font-medium text-gray-700 mb-1">
            Party Size
          </label>
          <Select
            id="party-size"
            value={partySize}
            onChange={(e) => {
              setPartySize(e.target.value)
              handleFormInteraction()
            }}
            disabled={loadingHours}
          >
            {PARTY_SIZE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            disabled={!selectedDate || !selectedTime || loadingHours}
          >
            Check Availability
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="error" className="mt-4">
          {error}
        </Alert>
      )}

      {selectedDate && selectedTime && !isDateTimeAvailable(selectedDate, selectedTime) && (
        <Alert variant="warning" className="mt-4">
          <Badge variant="warning" dot>
            Kitchen closed at this time
          </Badge>
          <p className="mt-2 text-sm">
            Please select a different time when our kitchen is open.
          </p>
        </Alert>
      )}

      {partySize === '7+' && (
        <Alert variant="info" className="mt-4">
          <p className="font-medium mb-1">Large Party Booking</p>
          <p className="text-sm">
            For parties larger than 6, please call us at{' '}
            <PhoneLink phone="01753682707" source="table_booking_large_party" className="font-semibold underline">
              01753 682707
            </PhoneLink>{' '}
            to discuss your requirements. We may need to arrange a pre-order for your group.
          </p>
        </Alert>
      )}
    </form>
  )
}