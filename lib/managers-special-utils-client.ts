/**
 * Client-safe utility functions for manager's special
 * This file can be imported in client components
 */

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