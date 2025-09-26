/**
 * Client-safe utility functions for manager's special
 * This file can be imported in client components
 */

/**
 * Client-safe function to get current promotion from API
 * Supports optional preview/time-travel parameters for QA
 */
type PromotionQuery = {
  preview?: string | null
  token?: string | null
  date?: string | null
}

export async function getCurrentPromotionClient(params: PromotionQuery = {}) {
  try {
    const searchParams = new URLSearchParams()
    if (params.preview) searchParams.set('preview', params.preview)
    if (params.token) searchParams.set('token', params.token)
    if (params.date) searchParams.set('date', params.date)

    const query = searchParams.toString()
    const url = query ? `/api/managers-special?${query}` : '/api/managers-special'

    const response = await fetch(url)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching current promotion:', error)
    return null
  }
}
