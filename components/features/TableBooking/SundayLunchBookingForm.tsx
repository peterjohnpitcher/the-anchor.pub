'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  trackTableBookingView, 
  trackTableBookingStart, 
  trackTableBookingDetailsEntered,
  trackTableBookingSubmit,
  trackTableBookingSuccess,
  trackTableBookingError 
} from '@/lib/gtm-events'
import { Button } from '@/components/ui/primitives/Button'
import { Badge } from '@/components/ui/primitives/Badge'
import { Card, CardBody } from '@/components/ui/layout/Card'
import { Alert } from '@/components/ui/feedback/Alert'
import { Icon } from '@/components/ui/Icon'
import { PhoneLink } from '@/components/PhoneLink'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  dietary_info: string[]
  allergens: string[]
  is_available: boolean
}

interface SideItem extends MenuItem {
  included: boolean
}

interface MenuData {
  menu_date: string
  mains: MenuItem[]
  sides: SideItem[]
  cutoff_time?: string
}

interface MenuSelection {
  guest_name: string
  menu_item_id: string
  item_type: 'starter' | 'main' | 'dessert' | 'side'
  quantity: number
  price_at_booking: number
}

interface SideSelection {
  menu_item_id: string
  quantity: number
  price_at_booking: number
}

interface SundayLunchBookingFormProps {
  className?: string
}

export default function SundayLunchBookingForm({ className }: SundayLunchBookingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [menuLoading, setMenuLoading] = useState(true)
  const [menu, setMenu] = useState<MenuData | null>(null)
  const [menuError, setMenuError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Form state
  const [date, setDate] = useState('')
  const [time, setTime] = useState('13:00')
  const [partySize, setPartySize] = useState(2)
  const [menuSelections, setMenuSelections] = useState<MenuSelection[]>([])
  const [sideSelections, setSideSelections] = useState<SideSelection[]>([])
  
  // Customer info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [specialRequirements, setSpecialRequirements] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [smsOptIn, setSmsOptIn] = useState(true)
  
  // Track form view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackTableBookingView({
        source: 'sunday_lunch_form',
        deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
      })
    }
  }, [])
  
  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setMenuLoading(true)
        const response = await fetch('/api/table-bookings/menu/sunday-lunch')
        const data = await response.json()
        
        if (data) {
          // Handle both data.data and direct data response
          const menuData = data.data || data.menu || data
          
          
          // Simply pass through the menu data as it matches our interface
          const processedMenu: MenuData = {
            menu_date: menuData.menu_date || new Date().toISOString().split('T')[0],
            mains: menuData.mains || [],
            sides: menuData.sides || [],
            cutoff_time: menuData.cutoff_time
          }
          
          setMenu(processedMenu)
        } else {
          setMenuError('Could not load Sunday lunch menu')
        }
      } catch (err) {
        setMenuError('Failed to load menu. Please try again.')
      } finally {
        setMenuLoading(false)
      }
    }
    
    fetchMenu()
  }, [])
  
  // Initialize menu selections when party size changes
  useEffect(() => {
    const newSelections: MenuSelection[] = []
    for (let i = 0; i < partySize; i++) {
      newSelections.push({
        guest_name: `Guest ${i + 1}`,
        menu_item_id: '',
        item_type: 'main',
        quantity: 1,
        price_at_booking: 0
      })
    }
    setMenuSelections(newSelections)
  }, [partySize])
  
  // Initialize side selections when menu loads - only optional extras
  useEffect(() => {
    if (menu && menu.sides) {
      const optionalSides = menu.sides.filter(side => !side.included)
      const newSideSelections: SideSelection[] = optionalSides.map(side => ({
        menu_item_id: side.id,
        quantity: 0,
        price_at_booking: side.price
      }))
      setSideSelections(newSideSelections)
    }
  }, [menu])
  
  // Calculate deposit amount (£5 per person)
  const depositAmount = partySize * 5
  const mainCoursesTotal = menuSelections.reduce((sum, selection) => sum + selection.price_at_booking, 0)
  const sidesTotal = sideSelections.reduce((sum, selection) => sum + (selection.price_at_booking * selection.quantity), 0)
  const totalAmount = mainCoursesTotal + sidesTotal
  
  // Update menu selection
  const updateMenuSelection = (index: number, field: keyof MenuSelection, value: any) => {
    const newSelections = [...menuSelections]
    newSelections[index] = { ...newSelections[index], [field]: value }
    
    // Update price when menu item changes
    if (field === 'menu_item_id' && menu) {
      const selectedMain = menu.mains.find(item => item.id === value)
      if (selectedMain) {
        newSelections[index].price_at_booking = selectedMain.price
        newSelections[index].item_type = 'main'
      }
    }
    
    setMenuSelections(newSelections)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate menu selections
    const invalidSelections = menuSelections.filter(s => !s.menu_item_id || !s.guest_name)
    if (invalidSelections.length > 0) {
      setError('Please select a menu item for each guest')
      return
    }
    
    // Track booking start
    if (typeof window !== 'undefined') {
      trackTableBookingStart({
        source: 'sunday_lunch_form',
        deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
      })
    }
    
    setLoading(true)
    
    try {
      // Track details entered
      if (typeof window !== 'undefined') {
        trackTableBookingDetailsEntered({
          partySize,
          bookingDate: date,
          bookingTime: time,
          source: 'sunday_lunch_form',
          deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
        })
      }
      
      // Combine main course selections with side selections
      const allMenuSelections: MenuSelection[] = [
        ...menuSelections,
        ...sideSelections
          .filter(side => side.quantity > 0)
          .map(side => ({
            guest_name: 'Table',
            menu_item_id: side.menu_item_id,
            item_type: 'side' as const,
            quantity: side.quantity,
            price_at_booking: side.price_at_booking
          }))
      ]
      
      const bookingData = {
        booking_type: 'sunday_lunch' as const,
        date,
        time,
        party_size: partySize,
        customer: {
          first_name: firstName,
          last_name: lastName,
          mobile_number: mobile,
          sms_opt_in: smsOptIn
        },
        special_requirements: specialRequirements,
        dietary_requirements: dietaryRequirements,
        allergies: allergies,
        menu_selections: allMenuSelections,
        source: 'website'
      }
      
      // Track submission
      if (typeof window !== 'undefined') {
        trackTableBookingSubmit({
          partySize,
          bookingDate: date,
          bookingTime: time,
          source: 'sunday_lunch_form',
          deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
        })
      }
      
      const response = await fetch('/api/table-bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking')
      }
      
      // Check if payment is required
      if (data.status === 'pending_payment' && data.payment_details?.payment_url) {
        // Track success (booking created, payment pending)
        if (typeof window !== 'undefined') {
          trackTableBookingSuccess({
            partySize,
            bookingDate: date,
            bookingTime: time,
            bookingReference: data.booking_reference,
            source: 'sunday_lunch_form',
            deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
          })
        }
        
        // Redirect to payment URL
        window.location.href = data.payment_details.payment_url
      } else {
        // Booking confirmed without payment (shouldn't happen for Sunday lunch)
        setSuccess(true)
        if (typeof window !== 'undefined') {
          trackTableBookingSuccess({
            partySize,
            bookingDate: date,
            bookingTime: time,
            bookingReference: data.booking_reference,
            source: 'sunday_lunch_form',
            deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
          })
        }
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create booking. Please try again.'
      setError(errorMessage)
      
      // Track error
      if (typeof window !== 'undefined') {
        trackTableBookingError({
          errorType: 'submission_error',
          errorMessage,
          partySize,
          bookingDate: date,
          bookingTime: time,
          source: 'sunday_lunch_form',
          deviceType: window.innerWidth >= 768 ? 'desktop' : 'mobile'
        })
      }
    } finally {
      setLoading(false)
    }
  }
  
  // Get next Sunday
  const getNextSunday = () => {
    const today = new Date()
    const currentDay = today.getDay()
    const currentHour = today.getHours()
    
    // If it's Saturday after 1pm, skip to the following Sunday
    let daysToAdd = (7 - currentDay) % 7 || 7
    if (currentDay === 6 && currentHour >= 13) {
      daysToAdd = 8 // Skip to next Sunday
    }
    
    const nextSunday = new Date(today)
    nextSunday.setDate(today.getDate() + daysToAdd)
    return nextSunday.toISOString().split('T')[0]
  }
  
  // Get available Sundays (next 8 weeks)
  const getAvailableSundays = () => {
    const sundays = []
    const today = new Date()
    const currentDay = today.getDay()
    const currentHour = today.getHours()
    
    // Check if we need to skip this Sunday due to cutoff time
    let startWeek = 0
    if (currentDay === 6 && currentHour >= 13) {
      startWeek = 1 // Skip this week's Sunday
    }
    
    for (let i = startWeek; i < startWeek + 8; i++) {
      const date = new Date(today)
      const daysToAdd = ((7 - currentDay) % 7 || 7) + (i * 7)
      date.setDate(today.getDate() + daysToAdd)
      sundays.push(date.toISOString().split('T')[0])
    }
    
    return sundays
  }
  
  if (menuLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <span>Loading Sunday lunch menu...</span>
        </div>
      </div>
    )
  }
  
  if (menuError) {
    return (
      <Alert variant="error">
        <Icon name="alert" className="h-4 w-4" />
        <div>
          <p className="font-medium">{menuError}</p>
          <p className="text-sm mt-1">
            Please call us on{' '}
            <PhoneLink
              phone="01753682707"
              source="sunday_lunch_menu_error"
              className="text-red-700 underline"
              showIcon={false}
            >
              01753 682707
            </PhoneLink>
            {' '}to book your Sunday roast.
          </p>
        </div>
      </Alert>
    )
  }
  
  if (success) {
    return (
      <Alert variant="success">
        <Icon name="success" className="h-4 w-4" />
        <div>
          <p className="font-medium">Booking confirmed!</p>
          <p className="text-sm mt-1">
            We've sent a confirmation to your mobile. See you on Sunday!
          </p>
        </div>
      </Alert>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className={`w-full ${className || ''}`}>
      {/* Pre-order reminder */}
      <Alert variant="warning" className="mb-4">
        <Icon name="alert" className="h-4 w-4" />
        <div>
          <p className="font-medium">Pre-order Required by 1pm Saturday</p>
          <p className="text-sm mt-1">
            Sunday roasts must be pre-ordered and a £{depositAmount.toFixed(2)} deposit paid (£5 per person).
            The remaining balance is due on arrival.
          </p>
          {(() => {
            const now = new Date()
            const day = now.getDay()
            const hour = now.getHours()
            if (day === 6 && hour >= 13) {
              return (
                <p className="text-sm mt-1 font-medium">
                  ⚠️ Orders for tomorrow's Sunday lunch are now closed. Please select a later date.
                </p>
              )
            }
            return null
          })()}
        </div>
      </Alert>
      
      {/* Booking details */}
      <Card variant="outlined" className="mb-4 border-0 rounded-none md:border md:rounded-lg">
        <CardBody className="p-0 md:p-6">
          <h3 className="font-semibold mb-4 px-4 pt-4 md:px-0 md:pt-0">Booking Details</h3>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 pb-4 md:pb-0">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date
              </label>
              <select
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border rounded-md px-4 py-3 text-base"
              >
                <option value="">Select Sunday</option>
                {getAvailableSundays().map(sunday => (
                  <option key={sunday} value={sunday}>
                    {new Date(sunday).toLocaleDateString('en-GB', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-2">
                Time
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full border rounded-md px-4 py-3 text-base"
              >
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="party_size" className="block text-sm font-medium mb-2">
                Party Size
              </label>
              <select
                id="party_size"
                value={partySize}
                onChange={(e) => setPartySize(parseInt(e.target.value))}
                required
                className="w-full border rounded-md px-4 py-3 text-base"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(size => (
                  <option key={size} value={size}>
                    {size} {size === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Menu selections */}
      <Card variant="outlined" className="mb-4 border-0 rounded-none md:border md:rounded-lg">
        <CardBody className="p-0 md:p-6">
          <h3 className="font-semibold mb-4 px-4 pt-4 md:px-0 md:pt-0">Menu Selections</h3>
          <p className="text-sm text-muted-foreground mb-4 px-4 md:px-0">
            Please select a main course for each guest. All mains include{' '}
            {menu && menu.sides
              .filter(side => side.included)
              .map(side => side.name.toLowerCase())
              .join(', ')}.
          </p>
          
          {menuSelections.map((selection, index) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-0 md:px-0">
              <div className="space-y-4">
                <div>
                  <label htmlFor={`guest_name_${index}`} className="block text-sm font-medium mb-2">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    id={`guest_name_${index}`}
                    value={selection.guest_name}
                    onChange={(e) => updateMenuSelection(index, 'guest_name', e.target.value)}
                    required
                    className="w-full border rounded-md px-4 py-3 text-base"
                    placeholder={`Guest ${index + 1}`}
                  />
                </div>
                
                <div>
                  <label htmlFor={`menu_item_${index}`} className="block text-sm font-medium mb-2">
                    Main Course Selection
                  </label>
                  <select
                    id={`menu_item_${index}`}
                    value={selection.menu_item_id}
                    onChange={(e) => updateMenuSelection(index, 'menu_item_id', e.target.value)}
                    required
                    className="w-full border rounded-md px-4 py-3 text-base"
                  >
                    <option value="">Select a main course</option>
                    
                    {menu && menu.mains && menu.mains.length > 0 ? (
                      menu.mains
                        .filter(item => item.is_available)
                        .map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))
                    ) : (
                      <option value="" disabled>Loading menu items...</option>
                    )}
                  </select>
                  {selection.menu_item_id && menu && (() => {
                    const selectedMain = menu.mains.find(m => m.id === selection.menu_item_id)
                    if (selectedMain) {
                      return (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">{selectedMain.description}</p>
                          <p className="text-sm font-medium mt-1">£{selectedMain.price.toFixed(2)}</p>
                        </div>
                      )
                    }
                    return null
                  })()}
                </div>
              </div>
            </div>
          ))}
          
          {/* Optional Sides Section */}
          {menu && menu.sides && menu.sides.filter(s => !s.included).length > 0 && (
            <div className="mt-6 pt-6 border-t md:px-0">
              <h4 className="font-semibold mb-4 px-4 md:px-0">Optional Sides</h4>
              <p className="text-sm text-muted-foreground mb-4 px-4 md:px-0">
                Add extra sides for the whole table to share.
              </p>
              
              <div className="space-y-3">
                {menu.sides.filter(side => !side.included).map((side, index) => {
                  const sideSelection = sideSelections.find(s => s.menu_item_id === side.id)
                  return (
                    <div key={side.id} className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-medium">{side.name}</div>
                          <div className="text-sm text-muted-foreground">£{side.price.toFixed(2)} each</div>
                          {side.description && (
                            <p className="text-sm text-muted-foreground mt-1">{side.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <label htmlFor={`side_${side.id}`} className="text-sm">Quantity:</label>
                          <select
                            id={`side_${side.id}`}
                            value={sideSelection?.quantity || 0}
                            onChange={(e) => {
                              const newSideSelections = [...sideSelections]
                              const idx = newSideSelections.findIndex(s => s.menu_item_id === side.id)
                              if (idx >= 0) {
                                newSideSelections[idx].quantity = parseInt(e.target.value)
                                setSideSelections(newSideSelections)
                              }
                            }}
                            className="border rounded-md px-3 py-2 text-base"
                          >
                            {[0, 1, 2, 3, 4, 5].map(qty => (
                              <option key={qty} value={qty}>{qty}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          <div className="mt-6 mx-4 p-4 bg-gray-50 rounded-lg md:mx-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Main Courses:</span>
              <span>£{mainCoursesTotal.toFixed(2)}</span>
            </div>
            {sidesTotal > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Sides:</span>
                <span>£{sidesTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2 pt-2 border-t">
              <span className="font-medium">Total Amount:</span>
              <span className="text-lg font-bold">£{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Deposit Due Now:</span>
              <span className="font-medium">£{depositAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Balance Due on Arrival:</span>
              <span className="font-medium">£{(totalAmount - depositAmount).toFixed(2)}</span>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Customer details */}
      <Card variant="outlined" className="mb-4 border-0 rounded-none md:border md:rounded-lg">
        <CardBody className="p-0 md:p-6">
          <h3 className="font-semibold mb-4 px-4 pt-4 md:px-0 md:pt-0">Your Details</h3>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:px-0">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border rounded-md px-4 py-3 text-base"
              />
            </div>
            
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full border rounded-md px-4 py-3 text-base"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                placeholder="07700900000"
                className="w-full border rounded-md px-4 py-3 text-base"
              />
            </div>
          </div>
          
          <div className="mt-4 md:px-0">
            <label htmlFor="special_requirements" className="block text-sm font-medium mb-2">
              Special Requirements (optional)
            </label>
            <textarea
              id="special_requirements"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              rows={3}
              className="w-full border rounded-md px-4 py-3 text-base"
              placeholder="Any special requests, dietary requirements, or allergies..."
            />
          </div>
          
          <div className="mt-4 px-4 pb-4 md:px-0 md:pb-0 flex items-center">
            <input
              type="checkbox"
              id="sms_opt_in"
              checked={smsOptIn}
              onChange={(e) => setSmsOptIn(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="sms_opt_in" className="text-sm">
              Send me booking confirmations and updates via SMS
            </label>
          </div>
        </CardBody>
      </Card>
      
      {error && (
        <Alert variant="error" className="mb-6">
          <Icon name="alert" className="h-4 w-4" />
          <div>
            <p>{error}</p>
          </div>
        </Alert>
      )}
      
      {/* Submit button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || !date || !time || menuSelections.some(s => !s.menu_item_id)}
          className="w-full md:w-auto"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Icon name="creditCard" className="mr-2" />
              Proceed to Payment (£{depositAmount.toFixed(2)} deposit)
            </>
          )}
        </Button>
        
        <p className="text-sm text-muted-foreground text-center">
          You will be redirected to our secure payment page to complete your booking
        </p>
      </div>
    </form>
  )
}