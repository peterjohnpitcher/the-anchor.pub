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
      
      days.push({
        date: dateStr,
        dayNum: currentDate.getDate(),
        dayName: currentDate.toLocaleDateString('en-GB', { weekday: 'short' }),
        month: currentDate.toLocaleDateString('en-GB', { month: 'short' }),
        isToday: dateStr === today.toISOString().split('T')[0],
        isSunday,
        isBlocked: isBlocked || dayData?.isClosed || dayData?.isKitchenClosed,
        hasRoast: isSunday && availabilityData.sundayRoastDates.includes(dateStr),
        specialNote: dayData?.specialNote
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }
  
  const calendarDays = generateCalendarDays()
  
  const handleDateSelect = (date: string, isBlocked: boolean) => {
    if (isBlocked) return
    setSelectedDate(date)
    setError('')
  }
  
  const handleSubmit = () => {
    if (!selectedDate) {
      setError('Please select a date')
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
              onClick={() => handleDateSelect(day.date, day.isBlocked || false)}
              disabled={day.isBlocked}
              className={cn(
                'relative p-2 rounded-lg text-center transition-all',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-anchor-gold',
                'min-h-[60px] flex flex-col items-center justify-center',
                selectedDate === day.date ? 'bg-anchor-green text-white' :
                day.isBlocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                day.isToday ? 'bg-anchor-cream border-2 border-anchor-gold' :
                day.isSunday ? 'bg-amber-50 hover:bg-amber-100' :
                'bg-white hover:bg-gray-50 border border-gray-200'
              )}
            >
              <span className="text-sm font-medium">{day.dayNum}</span>
              {day.isToday && (
                <span className="text-xs mt-1">Today</span>
              )}
              {day.hasRoast && !day.isBlocked && (
                <Icon name="utensils" className="w-3 h-3 mt-1" />
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
          <span>Sunday (Roast available)</span>
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
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
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