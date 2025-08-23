export interface MenuSelection {
  guest_name: string
  menu_item_id: string
  item_type: 'main'
  quantity: 1
  price_at_booking: number
}

export interface BookingWizardData {
  // Step 1
  date: string
  
  // Step 2 (Sunday only)
  bookingType: 'regular' | 'sunday_lunch'
  
  // Step 2b (Sunday lunch only)
  menuSelections?: MenuSelection[]
  
  // Step 3
  partySize: number
  
  // Step 4
  time: string
  
  // Step 5
  firstName: string
  lastName: string
  phone: string
  email: string
  
  // Step 6
  dietaryRequirements: string[]
  allergies: string
  occasion: string
  specialRequirements: string
  
  // Marketing
  marketingOptIn: boolean
}

export interface TimeSlot {
  time: string
  available: boolean
  busy?: boolean
  remaining?: number
}

export interface DayAvailability {
  date: string
  isClosed: boolean
  isKitchenClosed: boolean
  times: TimeSlot[]
  specialNote?: string
}

export interface AvailabilityData {
  days: DayAvailability[]
  blockedDates: string[]
  sundayRoastDates: string[]
}

export interface WizardStepProps {
  onNext: (data: any) => void
  onBack?: () => void
}

export interface ValidationError {
  field: string
  message: string
}