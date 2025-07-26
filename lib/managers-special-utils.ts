import fs from 'fs'
import path from 'path'

interface Promotion {
  id: string
  startDate: string
  endDate: string
  imageFolder: string
  active: boolean
  spirit: any
  promotion: any
}

interface PromotionsData {
  promotions: Promotion[]
}

/**
 * Gets the current date in UK timezone
 */
function getUKDate(): Date {
  const now = new Date()
  const ukTimeString = now.toLocaleString('en-GB', { timeZone: 'Europe/London' })
  // Parse UK date string (DD/MM/YYYY, HH:MM:SS)
  const [datePart, timePart] = ukTimeString.split(', ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hours, minutes, seconds] = timePart.split(':').map(Number)
  
  return new Date(year, month - 1, day, hours, minutes, seconds)
}

/**
 * Checks if a date is within a promotion period
 */
function isDateInRange(currentDate: Date, startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  // Set time to start and end of day for comparison
  start.setHours(0, 0, 0, 0)
  end.setHours(23, 59, 59, 999)
  
  const current = new Date(currentDate)
  current.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds())
  
  return current >= start && current <= end
}

/**
 * Gets the currently active promotion based on UK date/time
 */
export function getCurrentPromotion(): Promotion | null {
  try {
    const promotionsPath = path.join(process.cwd(), 'content', 'managers-special-promotions.json')
    const data = fs.readFileSync(promotionsPath, 'utf8')
    const promotionsData: PromotionsData = JSON.parse(data)
    
    const ukDate = getUKDate()
    
    // Find active promotion for current date
    const activePromotion = promotionsData.promotions.find(promo => 
      promo.active && isDateInRange(ukDate, promo.startDate, promo.endDate)
    )
    
    return activePromotion || null
  } catch (error) {
    console.error('Error loading promotions:', error)
    return null
  }
}

/**
 * Gets the image for a specific promotion
 */
export function getPromotionImage(imageFolder: string): string | null {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'managers-special', imageFolder)
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      console.warn(`Manager's special images directory does not exist: ${imageFolder}`)
      return null
    }
    
    // Get all files in the directory
    const files = fs.readdirSync(imagesDir)
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })
    
    // Return the first image found
    if (imageFiles.length > 0) {
      return `/images/managers-special/${imageFolder}/${encodeURIComponent(imageFiles[0])}`
    }
    
    return null
  } catch (error) {
    console.error('Error finding promotion image:', error)
    return null
  }
}

/**
 * Client-safe function to get current promotion from API
 */
export async function getCurrentPromotionClient() {
  try {
    const response = await fetch('/api/managers-special')
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching current promotion:', error)
    return null
  }
}