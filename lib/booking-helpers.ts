import { AvailabilityData, DayAvailability, TimeSlot } from '@/components/features/BookingWizard/types'

// Cache availability data for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000
let availabilityCache: {
  data: AvailabilityData | null
  timestamp: number
} = {
  data: null,
  timestamp: 0
}

/**
 * Pre-load availability for the next 30 days
 * This runs server-side to avoid async loading issues for AI agents
 */
export async function getAvailabilityForNext30Days(): Promise<AvailabilityData> {
  // Check cache
  if (availabilityCache.data && Date.now() - availabilityCache.timestamp < CACHE_DURATION) {
    return availabilityCache.data
  }
  
  const days: DayAvailability[] = []
  const blockedDates: string[] = []
  const sundayRoastDates: string[] = []
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Generate dates for next 30 days
  const dates: string[] = []
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    dates.push(date.toISOString().split('T')[0])
  }
  
  // Fetch business hours first to understand kitchen/venue schedules
  try {
    const businessHoursResponse = await fetch(
      `${process.env.ANCHOR_API_KEY ? 'https://management.orangejelly.co.uk/api' : 'http://localhost:3000/api'}/business/hours`,
      {
        headers: {
          'X-API-Key': process.env.ANCHOR_API_KEY || ''
        }
      }
    )
    
    if (businessHoursResponse.ok) {
      const hoursData = await businessHoursResponse.json()
      const businessHours = hoursData.data || hoursData
      
      // Process each date
      for (const dateStr of dates) {
        const date = new Date(dateStr + 'T12:00:00')
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
        const dayHours = businessHours.regularHours[dayOfWeek]
        const isSunday = date.getDay() === 0
        
        // Check if venue is closed
        const isClosed = !dayHours || dayHours.is_closed
        
        // Check if kitchen is closed
        const isKitchenClosed = !dayHours?.kitchen || 
          dayHours.kitchen === null ||
          ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed)
        
        // Check for special hours
        let specialNote: string | undefined
        if (businessHours.specialHours) {
          const special = businessHours.specialHours.find((sh: any) => 
            sh.date === dateStr
          )
          if (special) {
            specialNote = special.note || special.reason
          }
        }
        
        // Generate time slots if venue is open
        const times: TimeSlot[] = []
        if (!isClosed && dayHours.opens && dayHours.closes) {
          const openTime = parseTime(dayHours.opens)
          const closeTime = parseTime(dayHours.closes)
          
          // Generate 30-minute slots
          let currentTime = openTime
          while (currentTime < (closeTime || 24)) {
            const hours = Math.floor(currentTime)
            const minutes = (currentTime % 1) * 60
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            
            // Skip times when kitchen is closed for food bookings
            const isKitchenTime = dayHours.kitchen && 
              'opens' in dayHours.kitchen && 
              'closes' in dayHours.kitchen
            
            let available = true
            if (isKitchenTime) {
              const kitchenOpen = parseTime(dayHours.kitchen.opens)
              const kitchenClose = parseTime(dayHours.kitchen.closes)
              available = currentTime >= kitchenOpen && currentTime < kitchenClose
            }
            
            times.push({
              time: timeStr,
              available,
              busy: false,
              remaining: available ? 10 : 0
            })
            
            currentTime += 0.5 // Add 30 minutes
          }
        }
        
        // Add to appropriate lists
        if (isClosed) {
          blockedDates.push(dateStr)
        }
        
        if (isSunday && !isClosed && !isKitchenClosed) {
          sundayRoastDates.push(dateStr)
        }
        
        days.push({
          date: dateStr,
          isClosed,
          isKitchenClosed,
          times,
          specialNote
        })
      }
    }
  } catch (error) {
    console.error('Failed to fetch business hours for availability:', error)
    
    // Fallback: generate basic availability
    for (const dateStr of dates) {
      const date = new Date(dateStr + 'T12:00:00')
      const isSunday = date.getDay() === 0
      const dayOfWeek = date.getDay()
      
      // Basic hours based on day of week
      const times: TimeSlot[] = []
      if (dayOfWeek !== 1) { // Not Monday (usually closed)
        for (let hour = 12; hour <= 21; hour++) {
          for (let min = 0; min < 60; min += 30) {
            if (hour === 21 && min === 30) break
            
            const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
            times.push({
              time: timeStr,
              available: true,
              busy: false,
              remaining: 10
            })
          }
        }
      }
      
      days.push({
        date: dateStr,
        isClosed: dayOfWeek === 1,
        isKitchenClosed: dayOfWeek === 1,
        times
      })
      
      if (dayOfWeek === 1) {
        blockedDates.push(dateStr)
      }
      
      if (isSunday && dayOfWeek !== 1) {
        sundayRoastDates.push(dateStr)
      }
    }
  }
  
  const availabilityData: AvailabilityData = {
    days,
    blockedDates,
    sundayRoastDates
  }
  
  // Update cache
  availabilityCache = {
    data: availabilityData,
    timestamp: Date.now()
  }
  
  return availabilityData
}

/**
 * Parse time string to decimal hours
 */
function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours + minutes / 60
}

/**
 * Check if a date is available for booking
 */
export function isDateAvailable(date: string, availabilityData: AvailabilityData): boolean {
  return !availabilityData.blockedDates.includes(date)
}

/**
 * Get available times for a specific date
 */
export function getTimesForDate(date: string, availabilityData: AvailabilityData): TimeSlot[] {
  const dayData = availabilityData.days.find(d => d.date === date)
  return dayData?.times || []
}

/**
 * Check if a date is a Sunday with roast available
 */
export function isSundayRoastDate(date: string, availabilityData: AvailabilityData): boolean {
  return availabilityData.sundayRoastDates.includes(date)
}