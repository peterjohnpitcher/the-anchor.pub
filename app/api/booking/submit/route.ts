import { NextResponse } from 'next/server'
import { anchorAPI } from '@/lib/api'
import type { TableBookingRequest } from '@/lib/api'

/**
 * Booking submission endpoint for the wizard
 * Handles both JavaScript and non-JavaScript submissions
 */
export async function POST(request: Request) {
  try {
    let bookingData: any
    
    // Check content type to handle both JSON and form data
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      // JavaScript submission
      const jsonData = await request.json()
      // Map camelCase from frontend to snake_case for API
      bookingData = {
        date: jsonData.date,
        time: jsonData.time,
        partySize: jsonData.partySize,
        bookingType: jsonData.bookingType || 'regular',
        firstName: jsonData.firstName,
        lastName: jsonData.lastName,
        phone: jsonData.phone,
        email: jsonData.email,
        specialRequirements: jsonData.specialRequirements,
        marketingOptIn: jsonData.marketingOptIn,
        menuSelections: jsonData.menuSelections // THIS WAS MISSING!
      }
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      // Non-JavaScript form submission
      const formData = await request.formData()
      bookingData = {
        date: formData.get('date'),
        time: formData.get('time'),
        partySize: parseInt(formData.get('party_size') as string || '2'),
        bookingType: formData.get('booking_type') || 'regular',
        firstName: formData.get('first_name'),
        lastName: formData.get('last_name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        dietaryRequirements: formData.getAll('dietary_requirements'),
        allergies: formData.get('allergies'),
        occasion: formData.get('occasion'),
        specialRequirements: formData.get('special_requirements')
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid content type'
      }, { status: 400 })
    }
    
    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.firstName || 
        !bookingData.lastName || !bookingData.phone) {
      // For non-JS submissions, redirect back with error
      if (!contentType?.includes('application/json')) {
        return NextResponse.redirect(
          new URL(`/book-table?error=missing_fields`, request.url)
        )
      }
      
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }
    
    // Check if booking is for Monday (kitchen closed)
    const bookingDate = new Date(bookingData.date + 'T12:00:00')
    if (bookingDate.getDay() === 1) { // Monday
      return NextResponse.json({
        success: false,
        error: 'Kitchen is closed on Mondays. Bar service only - please call 01753 682707 for drinks-only reservations.'
      }, { status: 400 })
    }
    
    // Determine booking type and handle menu selections
    let bookingType = 'regular'
    let specialRequirements = bookingData.specialRequirements || ''
    let menuSelections = undefined
    
    // Check if this is a Sunday booking
    const isSundayBooking = bookingDate.getDay() === 0
    
    // Handle Sunday roast bookings
    if (bookingData.bookingType === 'sunday_roast' && bookingData.menuSelections && bookingData.menuSelections.length > 0) {
      // Use the proper API booking type for Sunday lunch with menu selections
      bookingType = 'sunday_lunch'
      menuSelections = bookingData.menuSelections
      console.log('🔍 SUNDAY LUNCH BOOKING DETECTED')
      console.log('🔍 Menu selections:', JSON.stringify(menuSelections, null, 2))
      console.log('🔍 Booking type will be:', bookingType)
      
      // API v2: Server enriches menu data automatically, no need for workarounds
      console.log('🔍 Menu selections being sent to API (v2 simplified):')
      menuSelections.forEach((s: any) => {
        console.log(`   - ${s.guest_name}: menu_item_id="${s.menu_item_id}", quantity=${s.quantity}`)
      })
    }
    
    // Create booking request
    const bookingRequest: any = {
      booking_type: bookingType,
      date: bookingData.date,
      time: bookingData.time,
      party_size: bookingData.partySize,
      customer: {
        first_name: bookingData.firstName,
        last_name: bookingData.lastName,
        mobile_number: bookingData.phone,
        email: bookingData.email || undefined,
        sms_opt_in: bookingData.marketingOptIn || false
      },
      duration_minutes: 120,
      special_requirements: specialRequirements,
      source: 'website_wizard',
      marketing_opt_in: bookingData.marketingOptIn || false
    }
    
    // Add menu selections if available
    if (menuSelections) {
      bookingRequest.menu_selections = menuSelections
    }
    
    // Generate idempotency key to prevent duplicate bookings
    const idempotencyKey = `${bookingData.date}-${bookingData.time}-${bookingData.phone}-${Date.now()}`
    
    // Submit to API
    console.log('🔍 FINAL REQUEST to API:')
    console.log('🔍 Booking type:', bookingRequest.booking_type)
    console.log('🔍 Menu selections count:', menuSelections?.length || 0)
    console.log('🔍 Idempotency Key:', idempotencyKey)
    if (menuSelections && menuSelections.length > 0) {
      console.log('🔍 Full menu_selections:', JSON.stringify(bookingRequest.menu_selections, null, 2))
    }
    
    const booking = await anchorAPI.createTableBooking(bookingRequest, idempotencyKey)
    
    console.log('🔍 API RESPONSE ANALYSIS:')
    console.log('🔍 Status:', booking.status)
    console.log('🔍 Payment Required:', booking.payment_required)
    console.log('🔍 Payment Details:', JSON.stringify(booking.payment_details, null, 2))
    console.log('🔍 Full Response:', JSON.stringify(booking, null, 2))
    
    // Check if payment is required (Sunday lunch bookings should return this from API)
    if (booking.payment_required && booking.payment_details) {
      console.log('Payment required - redirecting to PayPal')
      // Return payment details for redirect
      return NextResponse.json({
        success: true,
        reference: booking.booking_reference || booking.booking_id,
        payment_required: true,
        payment_details: booking.payment_details,
        booking: {
          reference: booking.booking_reference || booking.booking_id,
          status: booking.status || 'pending_payment',
          date: booking.confirmation_details?.date || bookingData.date,
          time: booking.confirmation_details?.time || bookingData.time,
          party_size: booking.confirmation_details?.party_size || bookingData.partySize,
          customer_name: `${bookingData.firstName} ${bookingData.lastName}`
        }
      })
    }
    
    // Log warning if Sunday lunch booking didn't require payment
    if (bookingType === 'sunday_lunch' && !booking.payment_required) {
      console.warn('WARNING: Sunday lunch booking did not return payment_required from API')
      console.warn('This suggests the API is not configured correctly for Sunday lunch payments')
    }
    
    // Handle response based on request type
    if (!contentType?.includes('application/json')) {
      // Non-JS: Redirect to confirmation page
      return NextResponse.redirect(
        new URL(`/booking-confirmation?ref=${booking.booking_reference}`, request.url)
      )
    }
    
    // JS: Return JSON response (regular booking confirmed)
    return NextResponse.json({
      success: true,
      reference: booking.booking_reference,
      booking: {
        reference: booking.booking_reference,
        status: booking.status,
        date: booking.confirmation_details?.date || bookingData.date,
        time: booking.confirmation_details?.time || bookingData.time,
        party_size: booking.confirmation_details?.party_size || bookingData.partySize,
        customer_name: `${bookingData.firstName} ${bookingData.lastName}`
      }
    })
    
  } catch (error: any) {
    console.error('Booking submission error:', error)
    console.error('Error details:', error.response?.data || error)
    
    // Check if it's a non-JS submission
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.redirect(
        new URL(`/book-table?error=submission_failed`, request.url)
      )
    }
    
    // Handle API v2 error format with correlation_id
    const errorResponse = error.response?.data?.error || error.response?.data || {}
    const errorMessage = errorResponse.message || error.message || 'Failed to create booking'
    const correlationId = errorResponse.correlation_id
    
    // Log correlation ID for debugging
    if (correlationId) {
      console.error('🔍 Error Correlation ID:', correlationId)
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      correlation_id: correlationId,
      details: errorResponse.details || error.response?.data
    }, { status: error.response?.status || 500 })
  }
}