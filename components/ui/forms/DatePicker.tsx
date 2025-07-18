'use client'

import { forwardRef, InputHTMLAttributes, useState, useRef, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps } from '../types'

const datePickerVariants = cva(
  'w-full rounded-lg border bg-white px-4 py-2 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-gray-300 hover:border-gray-400',
        error: 'border-red-500 hover:border-red-600',
        success: 'border-green-500 hover:border-green-600'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

export interface DatePickerProps 
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'size'>,
    VariantProps<typeof datePickerVariants> {
  label?: string
  error?: string
  helperText?: string
  minDate?: string
  maxDate?: string
  showTime?: boolean
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ 
    className,
    variant,
    size,
    label,
    error,
    helperText,
    minDate,
    maxDate,
    showTime = false,
    id,
    testId,
    ...props 
  }, ref) => {
    const datePickerId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorVariant = error ? 'error' : variant
    const inputType = showTime ? 'datetime-local' : 'date'

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={datePickerId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={datePickerId}
            type={inputType}
            min={minDate}
            max={maxDate}
            className={cn(
              datePickerVariants({ variant: errorVariant, size }),
              className
            )}
            data-testid={testId}
            aria-invalid={!!error}
            aria-describedby={error ? `${datePickerId}-error` : helperText ? `${datePickerId}-helper` : undefined}
            {...props}
          />
          
          {/* Calendar icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p id={`${datePickerId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${datePickerId}-helper`} className="mt-1 text-sm text-gray-700">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

// Date Range Picker
export interface DateRangePickerProps extends BaseComponentProps {
  label?: string
  startDate?: string
  endDate?: string
  onStartDateChange?: (date: string) => void
  onEndDateChange?: (date: string) => void
  minDate?: string
  maxDate?: string
  error?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({ 
    label,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    minDate,
    maxDate,
    error,
    helperText,
    size = 'md',
    disabled,
    testId,
    ...props 
  }, ref) => {
    const [localStartDate, setLocalStartDate] = useState(startDate || '')
    const [localEndDate, setLocalEndDate] = useState(endDate || '')

    // Update end date min when start date changes
    const endDateMin = localStartDate || minDate

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value
      setLocalStartDate(newDate)
      if (onStartDateChange) {
        onStartDateChange(newDate)
      }
      
      // Clear end date if it's before the new start date
      if (localEndDate && newDate > localEndDate) {
        setLocalEndDate('')
        if (onEndDateChange) {
          onEndDateChange('')
        }
      }
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value
      setLocalEndDate(newDate)
      if (onEndDateChange) {
        onEndDateChange(newDate)
      }
    }

    return (
      <div ref={ref} className="space-y-4" data-testid={testId} {...props}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Start Date"
            value={localStartDate}
            onChange={handleStartDateChange}
            minDate={minDate}
            maxDate={maxDate}
            size={size}
            disabled={disabled}
            error={error ? 'Invalid date range' : undefined}
          />
          
          <DatePicker
            label="End Date"
            value={localEndDate}
            onChange={handleEndDateChange}
            minDate={endDateMin}
            maxDate={maxDate}
            size={size}
            disabled={disabled || !localStartDate}
            error={error ? 'Invalid date range' : undefined}
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-gray-700">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

DateRangePicker.displayName = 'DateRangePicker'

// Time Picker
export interface TimePickerProps 
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'size'>,
    VariantProps<typeof datePickerVariants> {
  label?: string
  error?: string
  helperText?: string
  min?: string
  max?: string
  step?: number
}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ 
    className,
    variant,
    size,
    label,
    error,
    helperText,
    min,
    max,
    step = 60, // Default to 1 minute intervals
    id,
    testId,
    ...props 
  }, ref) => {
    const timePickerId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={timePickerId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={timePickerId}
            type="time"
            min={min}
            max={max}
            step={step}
            className={cn(
              datePickerVariants({ variant: errorVariant, size }),
              className
            )}
            data-testid={testId}
            aria-invalid={!!error}
            aria-describedby={error ? `${timePickerId}-error` : helperText ? `${timePickerId}-helper` : undefined}
            {...props}
          />
          
          {/* Clock icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p id={`${timePickerId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${timePickerId}-helper`} className="mt-1 text-sm text-gray-700">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TimePicker.displayName = 'TimePicker'