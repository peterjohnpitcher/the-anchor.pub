'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { WizardStep1Date } from './WizardStep1Date'
import { WizardStep2SundayOffer } from './WizardStep2SundayOffer'
import { WizardStep2bMenuSelection } from './WizardStep2bMenuSelection'
import { WizardStep3PartySize } from './WizardStep3PartySize'
import { WizardStep4Time } from './WizardStep4Time'
import { WizardStep5DetailsAndRequirements } from './WizardStep5DetailsAndRequirements'
import { WizardStep6Confirm } from './WizardStep6Confirm'
import { WizardProgress } from './WizardProgress'
import { trackBookingWizardStep, trackFormComplete, trackError } from '@/lib/gtm-events'
import type { BookingWizardData, AvailabilityData, MenuSelection } from './types'

interface BookingWizardProps {
  availabilityData: AvailabilityData
  initialStep?: number
  preselectedDate?: string
  bookingType?: 'regular' | 'sunday_roast'
}

export function BookingWizard({
  availabilityData,
  initialStep = 1,
  preselectedDate,
  bookingType: initialBookingType
}: BookingWizardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingData, setBookingData] = useState<BookingWizardData>({
    date: preselectedDate || '',
    bookingType: initialBookingType || 'regular',
    menuSelections: undefined,
    partySize: 2,
    time: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dietaryRequirements: [],
    allergies: '',
    occasion: '',
    specialRequirements: '',
    marketingOptIn: true
  })
  
  // Check if selected date is Sunday
  const isSunday = bookingData.date ? new Date(bookingData.date).getDay() === 0 : false
  const isSundayRoast = bookingData.bookingType === 'sunday_roast'
  
  // Calculate total steps
  // Base: Date, PartySize, Time, Details+Requirements, Confirm = 5 steps
  // If Sunday: +1 for Sunday offer step
  // If Sunday roast selected: +1 for menu selection
  let totalSteps = 5
  if (isSunday) totalSteps++ // Add Sunday offer step
  if (isSundayRoast) totalSteps++ // Add menu selection step
  
  // Adjust step numbering for display
  let adjustedStep = currentStep
  if (!isSunday && currentStep > 2) adjustedStep-- // Skip Sunday offer
  if (!isSundayRoast && currentStep > 3) adjustedStep-- // Skip menu selection
  
  // Update URL with current step
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', currentStep.toString())
    if (bookingData.date) params.set('date', bookingData.date)
    if (bookingData.bookingType) params.set('type', bookingData.bookingType)
    
    const newUrl = `/book-table?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [currentStep, bookingData.date, bookingData.bookingType])
  
  // Track step changes
  useEffect(() => {
    trackBookingWizardStep(currentStep, getStepName(currentStep))
  }, [currentStep, isSunday, isSundayRoast])
  
  // Handle step navigation
  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  const goNext = useCallback(() => {
    // Skip step 2 if not Sunday
    if (currentStep === 1 && !isSunday) {
      goToStep(3)
    } else {
      goToStep(currentStep + 1)
    }
  }, [currentStep, isSunday, goToStep])
  
  const goBack = useCallback(() => {
    // Skip step 2 when going back if not Sunday
    if (currentStep === 3 && !isSunday) {
      goToStep(1)
    } else {
      goToStep(currentStep - 1)
    }
  }, [currentStep, isSunday, goToStep])
  
  // Update booking data
  const updateBookingData = useCallback((data: Partial<BookingWizardData>) => {
    setBookingData(prev => ({ ...prev, ...data }))
  }, [])
  
  // Handle final submission
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      // Track submission
      trackFormComplete('booking_wizard')
      
      // Submit booking
      const response = await fetch('/api/booking/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        console.error('Booking failed:', result)
        throw new Error(result.error || 'Booking submission failed')
      }
      
      // Redirect to confirmation page
      router.push(`/booking-confirmation?ref=${result.reference || result.booking?.reference || 'confirmed'}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      trackError('booking_submission', errorMessage)
      console.error('Booking submission error:', error)
      alert('Sorry, there was an error with your booking. Please call us at 01753 682707.')
    } finally {
      setIsSubmitting(false)
    }
  }, [bookingData, isSunday, router])
  
  // Get step name for tracking
  function getStepName(step: number): string {
    const stepMap: { [key: number]: string } = {
      1: 'date',
      2: isSunday ? 'sunday_offer' : 'party_size',
      3: isSundayRoast ? 'menu_selection' : (isSunday ? 'party_size' : 'time'),
      4: isSunday ? (isSundayRoast ? 'party_size' : 'time') : 'details_and_requirements',
      5: isSunday ? 'time' : 'confirm',
      6: isSunday ? 'details_and_requirements' : 'confirm',
      7: 'confirm'
    }
    return stepMap[step] || 'unknown'
  }
  
  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStep1Date
            value={bookingData.date}
            availabilityData={availabilityData}
            onNext={(date) => {
              updateBookingData({ date })
              goNext()
            }}
          />
        )
      
      case 2:
        // Sunday offer step (only on Sundays)
        if (!isSunday) {
          // Not Sunday, show party size instead
          return (
            <WizardStep3PartySize
              value={bookingData.partySize}
              onNext={(size) => {
                updateBookingData({ partySize: size })
                goNext()
              }}
              onBack={goBack}
            />
          )
        }
        return (
          <WizardStep2SundayOffer
            selectedDate={typeof bookingData.date === 'string' ? bookingData.date : new Date().toISOString()}
            onSelect={(type) => {
              updateBookingData({ bookingType: type })
              if (type === 'sunday_roast') {
                // Need to collect party size first for menu selection
                goToStep(4) // Go to party size
              } else {
                goToStep(4) // Go to party size for regular booking
              }
            }}
            onBack={goBack}
          />
        )
      
      case 3:
        // Menu selection step (only for Sunday roast)
        if (!isSundayRoast) {
          // Not Sunday roast, show time selection
          if (!isSunday) {
            // Regular weekday: show time selection
            return (
              <WizardStep4Time
                date={bookingData.date}
                partySize={bookingData.partySize}
                availabilityData={availabilityData}
                value={bookingData.time}
                onNext={(time) => {
                  updateBookingData({ time })
                  goNext()
                }}
                onBack={goBack}
              />
            )
          }
          // Sunday but regular menu: skip to party size (handled in step 4)
          goToStep(4)
          return null
        }
        return (
          <WizardStep2bMenuSelection
            partySize={bookingData.partySize}
            onNext={(menuSelections) => {
              updateBookingData({ menuSelections: menuSelections as any })
              goNext()
            }}
            onBack={goBack}
          />
        )
      
      case 4:
        // Party size or Time depending on flow
        if (isSunday) {
          // Sunday: show party size
          return (
            <WizardStep3PartySize
              value={bookingData.partySize}
              onNext={(size) => {
                updateBookingData({ partySize: size })
                if (isSundayRoast) {
                  // Go back to menu selection with correct party size
                  goToStep(3)
                } else {
                  goNext() // Go to time
                }
              }}
              onBack={goBack}
            />
          )
        }
        // Regular day: show details & requirements
        return (
          <WizardStep5DetailsAndRequirements
            firstName={bookingData.firstName}
            lastName={bookingData.lastName}
            phone={bookingData.phone}
            email={bookingData.email}
            marketingOptIn={bookingData.marketingOptIn}
            specialRequirements={bookingData.specialRequirements}
            onNext={(details) => {
              updateBookingData(details)
              goNext()
            }}
            onBack={goBack}
          />
        )
      
      case 5:
        // Time or Confirm depending on flow
        if (isSunday) {
          // Sunday: show time selection
          return (
            <WizardStep4Time
              date={bookingData.date}
              partySize={bookingData.partySize}
              availabilityData={availabilityData}
              value={bookingData.time}
              onNext={(time) => {
                updateBookingData({ time })
                goNext()
              }}
              onBack={goBack}
            />
          )
        }
        // Regular day: show confirmation
        return (
          <WizardStep6Confirm
            bookingData={bookingData}
            isSubmitting={isSubmitting}
            onConfirm={handleSubmit}
            onBack={goBack}
            onEdit={(step: number) => goToStep(step)}
          />
        )
      
      case 6:
        // Details & Requirements or Confirm
        if (isSunday) {
          // Sunday: show details & requirements
          return (
            <WizardStep5DetailsAndRequirements
              firstName={bookingData.firstName}
              lastName={bookingData.lastName}
              phone={bookingData.phone}
              email={bookingData.email}
              marketingOptIn={bookingData.marketingOptIn}
              specialRequirements={bookingData.specialRequirements}
              onNext={(details) => {
                updateBookingData(details)
                goNext()
              }}
              onBack={goBack}
            />
          )
        }
        // This shouldn't happen for regular days
        return null
      
      case 7:
        // Confirmation (Sunday flow)
        return (
          <WizardStep6Confirm
            bookingData={bookingData}
            isSubmitting={isSubmitting}
            onConfirm={handleSubmit}
            onBack={goBack}
            onEdit={(step: number) => goToStep(step)}
          />
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-anchor-cream">
      {/* Progress Indicator */}
      <WizardProgress
        currentStep={adjustedStep}
        totalSteps={totalSteps}
        isSunday={isSunday}
      />
      
      {/* Wizard Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderStep()}
        </div>
        
        {/* Help Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Need help? Call us at{' '}
            <a href="tel:+441753682707" className="text-anchor-green font-medium hover:underline">
              01753 682707
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}