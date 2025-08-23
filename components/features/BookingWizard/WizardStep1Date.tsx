'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import type { WizardStepProps, AvailabilityData } from './types'

interface WizardStep1DateProps extends WizardStepProps {
  value: string
  availabilityData: AvailabilityData
  onNext: (date: string) => void
}

export function WizardStep1Date({ value, availabilityData, onNext }: WizardStep1DateProps) {
  const [selectedDate, setSelectedDate] = useState(value || '')
  const [error, setError] = useState('')
  
  // Get today's date and max booking date (30 days)
  const today = new Date()
  today.setHours(12, 0, 0, 0) // Use noon to avoid timezone issues
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 30)
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    const currentDate = new Date(today)
    
    while (currentDate <= maxDate) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const dayData = availabilityData.days.find(d => d.date === dateStr)
      const isBlocked = availabilityData.blockedDates.includes(dateStr)
      const isSunday = currentDate.getDay() === 0
      const isMonday = currentDate.getDay() === 1
      
      // Separate venue closed from kitchen closed
      // Use dayData if available, otherwise default to false (open)
      const venueClosed = isBlocked || (dayData !== undefined ? dayData.isClosed : false)
      
      // Kitchen closed logic:
      // - If we have data, use it
      // - If no data AND it's Monday, default to kitchen closed (drinks only)
      // - Otherwise default to open
      const kitchenClosed = dayData !== undefined 
        ? dayData.isKitchenClosed 
        : isMonday // Mondays default to kitchen closed unless API says otherwise
        
      const drinksOnly = !venueClosed && kitchenClosed // Venue open but kitchen closed
      
      days.push({
        date: dateStr,
        dayNum: currentDate.getDate(),
        dayName: currentDate.toLocaleDateString('en-GB', { weekday: 'short' }),
        month: currentDate.toLocaleDateString('en-GB', { month: 'short' }),
        isToday: dateStr === today.toISOString().split('T')[0],
        isSunday,
        isBlocked: venueClosed, // Only block if venue is closed
        isDrinksOnly: drinksOnly, // New flag for drinks-only days
        hasRoast: isSunday && !venueClosed && !kitchenClosed, // Show Sunday lunch icon if Sunday and kitchen is open,
        specialNote: dayData?.specialNote || (drinksOnly ? 'Kitchen closed - drinks only' : '')
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }
  
  const calendarDays = generateCalendarDays()
  
  const handleDateSelect = (date: string, isBlocked: boolean, isDrinksOnly: boolean) => {
    if (isBlocked) return
    
    // Don't allow selection of drinks-only days - they must call
    if (isDrinksOnly) {
      setSelectedDate('') // Clear any previous selection
      setError('Kitchen is closed on this day. For drinks-only bookings, please call 01753 682707')
      return
    }
    
    setSelectedDate(date)
    setError('')
  }
  
  const handleSubmit = () => {
    if (!selectedDate) {
      setError('Please select a date')
      return
    }
    
    // Double-check the selected date isn't drinks-only
    const selectedDay = calendarDays.find(d => d.date === selectedDate)
    if (selectedDay?.isDrinksOnly) {
      setError('Kitchen is closed on this day. For drinks-only bookings, please call 01753 682707')
      return
    }
    
    onNext(selectedDate)
  }
  
  // Format selected date for display
  const formatSelectedDate = () => {
    if (!selectedDate) return ''
    const date = new Date(selectedDate + 'T12:00:00')
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-anchor-charcoal mb-2">
          When would you like to visit us?
        </h2>
        <p className="text-gray-600">
          Select your preferred date from the calendar below
        </p>
      </div>
      
      {/* Calendar Grid */}
      <div className="border rounded-lg p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {/* Add empty cells for alignment */}
          {(() => {
            const firstDay = new Date(calendarDays[0].date + 'T12:00:00').getDay()
            const emptyDays = firstDay === 0 ? 6 : firstDay - 1
            return Array.from({ length: emptyDays }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))
          })()}
          
          {/* Calendar days */}
          {calendarDays.map(day => (
            <button
              key={day.date}
              type="button"
              onClick={() => handleDateSelect(day.date, day.isBlocked || false, day.isDrinksOnly || false)}
              disabled={day.isBlocked}
              title={day.specialNote || ''}
              className={cn(
                'relative p-2 rounded-lg text-center transition-all',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-anchor-gold',
                'min-h-[60px] flex flex-col items-center justify-center',
                selectedDate === day.date ? 'bg-anchor-green text-white' :
                day.isBlocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                day.isDrinksOnly ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200' :
                day.isSunday && !day.isBlocked && !day.isDrinksOnly ? 'bg-amber-50 hover:bg-amber-100 border border-amber-200' :
                day.isToday ? 'bg-anchor-cream border-2 border-anchor-gold' :
                'bg-white hover:bg-gray-50 border border-gray-200'
              )}
            >
              <span className="text-sm font-medium">{day.dayNum}</span>
              {day.isToday && (
                <span className="text-xs mt-1">Today</span>
              )}
              {day.hasRoast && !day.isBlocked && !day.isDrinksOnly && (
                <Icon name="utensils" className="w-3 h-3 mt-1" />
              )}
              {day.isDrinksOnly && (
                <Icon name="wine" className="w-3 h-3 mt-1 text-blue-500" />
              )}
              {day.isBlocked && (
                <Icon name="close" className="w-3 h-3 mt-1 text-red-400" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-50 rounded border border-amber-200" />
          <span>Sunday (Lunch available)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-50 rounded border border-blue-200" />
          <span>Drinks only - call to book</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded" />
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-anchor-cream rounded border-2 border-anchor-gold" />
          <span>Today</span>
        </div>
      </div>
      
      {/* Selected Date Display */}
      {selectedDate && (
        <div className="bg-anchor-cream rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">You selected:</p>
          <p className="text-lg font-semibold text-anchor-green">
            {formatSelectedDate()}
          </p>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm flex items-start gap-2">
          <Icon name="info" className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-anchor-green text-white px-8 py-3 rounded-lg font-medium hover:bg-anchor-green-dark transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}