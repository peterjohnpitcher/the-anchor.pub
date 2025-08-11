'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import type { WizardStepProps } from './types'

interface WizardStep6RequirementsProps extends WizardStepProps {
  specialRequirements: string
  onNext: (requirements: {
    specialRequirements: string
  }) => void
  onBack: () => void
}

export function WizardStep6Requirements({ 
  specialRequirements: initialSpecial,
  onNext, 
  onBack 
}: WizardStep6RequirementsProps) {
  const [specialRequirements, setSpecialRequirements] = useState(initialSpecial || '')
  
  const handleSkip = () => {
    onNext({
      specialRequirements: ''
    })
  }
  
  const handleSubmit = () => {
    onNext({
      specialRequirements: specialRequirements.trim()
    })
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-anchor-charcoal mb-2">
          Any special requirements?
        </h2>
        <p className="text-gray-600">
          Let us know about dietary needs or allergies (optional)
        </p>
      </div>
      
      {/* Allergen Warning */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="alert" className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">
              Important Allergen Information
            </p>
            <p className="text-sm text-amber-800">
              Items are prepared in a single kitchen, and while we take great care, 
              we cannot guarantee allergen cross-contamination. Please inform us of 
              any severe allergies when you arrive.
            </p>
          </div>
        </div>
      </div>
      
      {/* Special Requirements */}
      <div>
        <label htmlFor="special" className="block text-sm font-medium text-gray-700 mb-2">
          Special requirements, dietary needs, or allergies
        </label>
        <textarea
          id="special"
          value={specialRequirements}
          onChange={(e) => setSpecialRequirements(e.target.value)}
          placeholder="E.g., Vegetarian, nut allergy, gluten-free, high chair needed, wheelchair access..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-gold resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Our kitchen team will do their best to accommodate your needs
        </p>
      </div>
      
      {/* Skip Notice */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          No special requirements - skip this step
        </button>
      </div>
      
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