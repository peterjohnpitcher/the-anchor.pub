'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type { WizardStepProps } from './types'

interface WizardStep3PartySizeProps extends WizardStepProps {
  value: number
  onNext: (size: number) => void
  onBack: () => void
}

export function WizardStep3PartySize({ value, onNext, onBack }: WizardStep3PartySizeProps) {
  const [partySize, setPartySize] = useState(value || 2)
  const [error, setError] = useState('')
  
  const MIN_SIZE = 1
  const MAX_SIZE = 20
  
  // Common party sizes for quick selection
  const quickSizes = [1, 2, 3, 4, 5, 6, 8, 10, 12]
  
  const handleSizeChange = (size: number) => {
    if (size < MIN_SIZE || size > MAX_SIZE) return
    setPartySize(size)
    setError('')
  }
  
  const handleSubmit = () => {
    if (partySize < MIN_SIZE || partySize > MAX_SIZE) {
      setError(`Please select between ${MIN_SIZE} and ${MAX_SIZE} people`)
      return
    }
    onNext(partySize)
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-anchor-charcoal mb-2">
          How many people will be joining us?
        </h2>
        <p className="text-gray-600">
          Select your party size
        </p>
      </div>
      
      {/* Current Selection Display */}
      <div className="bg-anchor-cream rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Decrease Button */}
          <button
            type="button"
            onClick={() => handleSizeChange(partySize - 1)}
            disabled={partySize <= MIN_SIZE}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-all',
              partySize <= MIN_SIZE
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 text-anchor-green hover:scale-110'
            )}
            aria-label="Decrease party size"
          >
            <Icon name="minus" className="w-5 h-5" />
          </button>
          
          {/* Size Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-anchor-green mb-1">
              {partySize}
            </div>
            <div className="text-sm text-gray-600">
              {partySize === 1 ? 'Person' : 'People'}
            </div>
          </div>
          
          {/* Increase Button */}
          <button
            type="button"
            onClick={() => handleSizeChange(partySize + 1)}
            disabled={partySize >= MAX_SIZE}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-all',
              partySize >= MAX_SIZE
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 text-anchor-green hover:scale-110'
            )}
            aria-label="Increase party size"
          >
            <Icon name="plus" className="w-5 h-5" />
          </button>
        </div>
        
        {/* Visual Representation */}
        <div className="flex justify-center flex-wrap gap-1">
          {Array.from({ length: Math.min(partySize, 20) }).map((_, i) => (
            <Icon
              key={i}
              name="user"
              className={cn(
                'w-6 h-6',
                i < partySize ? 'text-anchor-gold' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Quick Selection Buttons */}
      <div>
        <p className="text-sm text-gray-600 mb-3">Quick select:</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {quickSizes.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeChange(size)}
              className={cn(
                'py-2 px-4 rounded-lg font-medium transition-all',
                partySize === size
                  ? 'bg-anchor-green text-white'
                  : 'bg-white border border-gray-200 hover:border-anchor-gold text-gray-700 hover:bg-anchor-cream'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Large Group Notice */}
      {partySize >= 15 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Icon name="info" className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Large group booking</p>
              <p>
                For the best experience with groups of 15+, we recommend calling us directly
                to discuss menu options and seating arrangements.
              </p>
              <a
                href="tel:+441753682707"
                className="inline-flex items-center gap-1 mt-2 text-amber-700 font-medium hover:underline"
              >
                <Icon name="phone" className="w-4 h-4" />
                01753 682707
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Groups Over 20 */}
      {partySize >= MAX_SIZE && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Icon name="users" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Need space for more than 20?</p>
              <p>
                Please call us to arrange your booking. We can accommodate larger groups
                with advance notice.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 px-6 py-3 hover:text-gray-800 transition-colors flex items-center gap-2"
        >
          <Icon name="arrowLeft" className="w-4 h-4" />
          Back
        </button>
        
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