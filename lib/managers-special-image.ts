import fs from 'fs'
import path from 'path'

/**
 * Finds the manager's special image dynamically from the managers-special folder
 * Returns the web path to the image or null if no image found
 */
export function getManagersSpecialImage(): string | null {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'managers-special')
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      console.warn('Manager\'s special images directory does not exist')
      return null
    }
    
    // Get all files in the directory
    const files = fs.readdirSync(imagesDir)
    
    // Filter for image files only (ignore README)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })
    
    // Return the first image found
    if (imageFiles.length > 0) {
      // Return the web path (without 'public') with proper URL encoding
      return `/images/managers-special/${encodeURIComponent(imageFiles[0])}`
    }
    
    return null
  } catch (error) {
    console.error('Error finding manager\'s special image:', error)
    return null
  }
}

/**
 * Client-side version that uses a default pattern
 * This is used when we can't access the filesystem (like in client components)
 */
export function getManagersSpecialImagePath(): string {
  // For client-side, we'll need to rely on the JSON data
  // or implement an API endpoint to get the image path
  return '/images/managers-special/current.jpg'
}