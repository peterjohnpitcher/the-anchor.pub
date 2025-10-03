import { NextResponse } from 'next/server'
import { anchorAPI } from '@/lib/api'
import { logError } from '@/lib/error-handling'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start') || undefined
  const end = searchParams.get('end') || undefined
  const granularityParam = searchParams.get('granularity') || undefined
  const granularity = granularityParam === 'hour' ? 'hour' : granularityParam === 'day' ? 'day' : undefined

  try {
    const availability = await anchorAPI.getParkingAvailability({
      start,
      end,
      granularity
    })

    return NextResponse.json({
      success: true,
      data: availability
    })
  } catch (error: any) {
    logError('api/parking/availability', error, { start, end, granularity })

    const status = error?.status || 500
    const code = error?.code || 'INTERNAL_ERROR'
    const message =
      code === 'FORBIDDEN'
        ? 'Parking availability is currently restricted. Please try again shortly.'
        : 'We could not load parking availability. Please refresh or try again later.'

    return NextResponse.json({
      success: false,
      error: {
        code,
        message,
        details: status >= 500 ? undefined : error?.details
      }
    }, { status })
  }
}
