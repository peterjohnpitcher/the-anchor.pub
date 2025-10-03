import { NextResponse } from 'next/server'
import { anchorAPI } from '@/lib/api'
import { logError } from '@/lib/error-handling'

type RouteContext = {
  params: {
    id: string
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const bookingId = context?.params?.id

  if (!bookingId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'MISSING_ID',
        message: 'Booking ID is required.'
      }
    }, { status: 400 })
  }

  try {
    const booking = await anchorAPI.getParkingBooking(bookingId)

    return NextResponse.json({
      success: true,
      data: booking
    })
  } catch (error: any) {
    logError('api/parking/bookings/[id]', error, { bookingId })

    const status = error?.status || 500
    const code = error?.code || (status === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR')

    const message =
      status === 404
        ? 'We could not find that parking booking. Please check the reference or contact us.'
        : 'We could not retrieve the parking booking details right now. Please try again shortly.'

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
