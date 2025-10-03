import { NextResponse } from 'next/server'
import { anchorAPI } from '@/lib/api'
import { logError } from '@/lib/error-handling'

export async function GET() {
  try {
    const rates = await anchorAPI.getParkingRates()
    return NextResponse.json({
      success: true,
      data: rates
    })
  } catch (error: any) {
    logError('api/parking/rates', error)

    const status = error?.status || 500
    const code = error?.code || 'INTERNAL_ERROR'
    const message =
      code === 'FORBIDDEN'
        ? 'Parking rates are unavailable right now. Please try again later.'
        : 'We could not load parking rates. Please refresh the page or contact us.'

    return NextResponse.json({
      success: false,
      error: {
        code,
        message
      }
    }, { status })
  }
}
