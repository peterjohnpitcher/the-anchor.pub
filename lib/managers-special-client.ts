'use client'

export async function getCurrentPromotionClient() {
  try {
    const response = await fetch('/api/managers-special')
    if (!response.ok) return null
    const data = await response.json()
    return data.active ? data : null
  } catch (error) {
    console.error('Error fetching current promotion:', error)
    return null
  }
}