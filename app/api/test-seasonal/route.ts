import { NextRequest, NextResponse } from 'next/server'
import { getSeasonalHomepageImage, getSeasonalGreeting, getSeasonalAltText } from '@/lib/seasonal-utils'

// Mark as dynamic to prevent caching during testing
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const dateParam = searchParams.get('date')
  
  // Validate and parse the date parameter
  const date = dateParam && !Number.isNaN(Date.parse(dateParam))
    ? new Date(dateParam)
    : new Date()
  
  const seasonalImage = getSeasonalHomepageImage(date)
  const greeting = getSeasonalGreeting(seasonalImage.season)
  const altText = getSeasonalAltText(seasonalImage.season)
  
  return NextResponse.json({
    date: date.toISOString(),
    dateLocal: date.toLocaleString('en-GB', { timeZone: 'Europe/London' }),
    season: seasonalImage.season,
    imagePath: seasonalImage.src,
    fallbackPath: seasonalImage.fallback,
    greeting,
    altText,
    testUrls: {
      winter: '/api/test-seasonal?date=2025-01-15',
      spring: '/api/test-seasonal?date=2025-04-15',
      summer: '/api/test-seasonal?date=2025-07-15',
      autumn: '/api/test-seasonal?date=2025-09-15',
      halloween: '/api/test-seasonal?date=2025-10-25',
      autumn_after_halloween: '/api/test-seasonal?date=2025-11-05',
      christmas: '/api/test-seasonal?date=2025-12-15'
    },
    currentEnv: {
      forceOverride: process.env.NEXT_PUBLIC_FORCE_SEASON || null,
      nodeEnv: process.env.NODE_ENV
    }
  })
}