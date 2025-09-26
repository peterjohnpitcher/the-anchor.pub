'use client'

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
    const data = await response.json()
    return data.active ? data : null
  } catch (error) {
    console.error('Error fetching current promotion:', error)
    return null
  }
}
