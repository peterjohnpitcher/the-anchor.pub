'use client'

import { forwardRef, SelectHTMLAttributes, useState, useRef, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps } from '../types'

const selectVariants = cva(
  'w-full rounded-lg border bg-white px-4 py-2 text-gray-900 transition-colours focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer',
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

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps 
  extends BaseComponentProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className,
    variant,
    size,
    label,
    error,
    helperText,
    options,
    placeholder = 'Select an option',
    id,
    testId,
    ...props 
  }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              selectVariants({ variant: errorVariant, size }),
              'pr-10',
              className
            )}
            data-testid={testId}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom arrow icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-700">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

// Advanced searchable select component
export interface SearchableSelectProps extends Omit<SelectProps, 'options' | 'onChange'> {
  options: SelectOption[]
  onSearch?: (query: string) => void
  loading?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SearchableSelect = forwardRef<HTMLDivElement, SearchableSelectProps>(
  ({ 
    className,
    variant,
    size,
    label,
    error,
    helperText,
    options,
    placeholder = 'Search and select',
    value,
    onChange,
    onSearch,
    loading,
    disabled,
    id,
    testId,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorVariant = error ? 'error' : variant
    
    // Filter options based on search query
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    // Get selected option label
    const selectedOption = options.find(opt => opt.value === value)
    const displayValue = selectedOption ? selectedOption.label : ''
    
    // Handle option selection
    const handleSelect = (option: SelectOption) => {
      if (!option.disabled && onChange) {
        const event = {
          target: {
            value: option.value,
            name: props.name
          }
        } as React.ChangeEvent<HTMLSelectElement>
        onChange(event)
      }
      setIsOpen(false)
      setSearchQuery('')
    }
    
    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (isOpen && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex])
          } else {
            setIsOpen(true)
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSearchQuery('')
          break
      }
    }
    
    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
      setHighlightedIndex(0)
      if (onSearch) {
        onSearch(query)
      }
    }
    
    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchQuery('')
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div ref={dropdownRef} className="relative">
          <input
            ref={inputRef}
            id={selectId}
            type="text"
            className={cn(
              selectVariants({ variant: errorVariant, size }),
              'pr-10',
              className
            )}
            value={isOpen ? searchQuery : displayValue}
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            data-testid={testId}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls="listbox"
            role="combobox"
          />
          
          {/* Arrow icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
            <svg 
              className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {loading ? (
                <div className="px-4 py-8 text-center text-gray-700">
                  <svg className="animate-spin h-5 w-5 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-700">
                  No options found
                </div>
              ) : (
                <ul role="listbox" id="listbox">
                  {filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={option.value === value}
                      className={cn(
                        'px-4 py-2 cursor-pointer transition-colours',
                        option.disabled && 'opacity-50 cursor-not-allowed',
                        option.value === value && 'bg-anchor-gold/10 text-anchor-gold font-medium',
                        index === highlightedIndex && 'bg-gray-100',
                        !option.disabled && option.value !== value && 'hover:bg-gray-50'
                      )}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-700">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

SearchableSelect.displayName = 'SearchableSelect'