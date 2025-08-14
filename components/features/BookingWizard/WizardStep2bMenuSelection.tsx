'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Alert } from '@/components/ui/feedback/Alert'

interface MenuSelection {
  guest_name: string
  menu_item_id: string  // Required for API v2
  quantity: number
  special_requests?: string
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  dietary_info?: string[]
  allergens?: string[]
  is_available: boolean
}

interface MenuData {
  mains: MenuItem[]
  sides: MenuItem[]
}

interface WizardStep2bMenuSelectionProps {
  partySize: number
  date?: string
  onNext: (menuSelections: MenuSelection[]) => void
  onBack: () => void
}

export function WizardStep2bMenuSelection({ 
  partySize,
  date,
  onNext, 
  onBack 
}: WizardStep2bMenuSelectionProps) {
  const [menuData, setMenuData] = useState<MenuData>({ mains: [], sides: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Initialize menu selections for each guest
  const [selections, setSelections] = useState<MenuSelection[]>(
    Array.from({ length: partySize }, (_, i) => ({
      guest_name: `Guest ${i + 1}`,
      menu_item_id: '',
      quantity: 1
    }))
  )
  
  // Fetch menu from API
  useEffect(() => {
    // Don't proceed if no date is provided
    if (!date) {
      console.error('No date provided to menu selection component')
      setError('Please select a date first. Go back to the date selection step.')
      setLoading(false)
      return
    }

    // Validate date format (YYYY-MM-DD)
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateFormatRegex.test(date)) {
      console.error('Invalid date format:', date)
      setError('Invalid date format. Please go back and select a valid date.')
      setLoading(false)
      return
    }

    const fetchMenu = async () => {
      try {
        setLoading(true)
        console.log('Fetching Sunday lunch menu for date:', date)
        const response = await fetch(`/api/menu/sunday-lunch?date=${date}`)
        
        if (!response.ok) {
          throw new Error('Failed to load menu')
        }
        
        const data = await response.json()
        console.log('Menu API Response:', data)
        
        // Check if the API returned an error
        if (data.error) {
          setError(data.error)
          setMenuData({ mains: [], sides: [] })
        } else {
          setMenuData({
            mains: data.mains || [],
            sides: data.sides || []
          })
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err)
        setError('Unable to load menu. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchMenu()
  }, [date])

  const updateSelection = (index: number, field: keyof MenuSelection, value: any) => {
    const newSelections = [...selections]
    newSelections[index] = { ...newSelections[index], [field]: value }
    setSelections(newSelections)
  }

  const handleContinue = () => {
    // Validate all selections
    const allSelected = selections.every(s => s.menu_item_id && s.guest_name)
    if (!allSelected) {
      alert('Please select a main course for each guest')
      return
    }
    onNext(selections)
  }

  // Calculate total price based on selected menu items
  const totalPrice = selections.reduce((sum, s) => {
    const menuItem = menuData.mains.find(m => m.id === s.menu_item_id)
    return sum + (menuItem?.price || 0)
  }, 0)
  const depositAmount = partySize * 5

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-anchor-green mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading menu...</p>
      </div>
    )
  }

  // Show error state
  if (error || menuData.mains.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="alert" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-600 mb-2">Unable to Load Menu</h3>
        <p className="text-red-600 mb-4">{error || 'Menu not available for the selected date'}</p>
        {date && (
          <p className="text-gray-600 text-sm mb-4">
            Selected date: {new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            })}
          </p>
        )}
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-anchor-green text-white rounded-lg hover:bg-anchor-green/90 transition-colors"
        >
          ← Go Back to Previous Step
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-anchor-charcoal mb-2">
          Select Your Sunday Roasts
        </h2>
        <p className="text-gray-600">
          Choose a main course for each guest
        </p>
      </div>

      {/* Menu Selections */}
      <div className="space-y-4">
        {selections.map((selection, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              {/* Guest Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guest {index + 1} Name
                </label>
                <input
                  type="text"
                  value={selection.guest_name}
                  onChange={(e) => updateSelection(index, 'guest_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-anchor-green"
                  placeholder="Enter guest name"
                  required
                />
              </div>

              {/* Main Course Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Course
                </label>
                <select
                  value={selection.menu_item_id}
                  onChange={(e) => updateSelection(index, 'menu_item_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-anchor-green"
                  required
                >
                  <option value="">Select a main course</option>
                  {menuData.mains.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - £{item.price.toFixed(2)}
                    </option>
                  ))}
                </select>
                {/* Show description for selected item */}
                {selection.menu_item_id && (
                  <p className="mt-2 text-sm text-gray-600">
                    {menuData.mains.find(m => m.id === selection.menu_item_id)?.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Included Sides Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="info" className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">Included with every roast:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Yorkshire pudding made fresh to order</li>
              <li>Herb & garlic roast potatoes</li>
              <li>Seasonal vegetables</li>
              <li>Rich gravy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-lg">
            <span className="font-medium">Total Price:</span>
            <span className="font-bold">£{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-amber-700">
            <span>Deposit Required (£5 per person):</span>
            <span className="font-medium">£{depositAmount.toFixed(2)}</span>
          </div>
          <div className="text-sm text-amber-600 mt-2">
            The deposit will be deducted from your final bill on the day
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <Alert variant="info">
        <p className="font-medium">Pre-order Deadline</p>
        <p className="text-sm mt-1">
          Sunday roast orders must be placed by 1pm on Saturday. 
          This ensures we prepare fresh ingredients specifically for your table.
        </p>
      </Alert>

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
          onClick={handleContinue}
          className="bg-anchor-green text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          Continue
          <Icon name="arrowRight" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}