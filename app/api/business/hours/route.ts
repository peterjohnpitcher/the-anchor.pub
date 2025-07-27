import { NextResponse } from 'next/server'
import { anchorAPI } from '@/lib/api'
import { logError } from '@/lib/error-handling'

export async function GET() {
  try {
    // Use the AnchorAPI class which handles authentication properly
    const response = await anchorAPI.getBusinessHours()
    
    // The API already returns the data in the correct format
    // with currentStatus calculated in UK timezone
    return NextResponse.json({
      success: true,
      data: response,
      fetchedAt: new Date().toISOString()
    })
  } catch (error: any) {
    logError('business-hours-api', error)
    
    // Check if it's an authentication error
    if (error.status === 401) {
      return NextResponse.json(
        { 
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid API key. Please check ANCHOR_API_KEY environment variable.'
          }
        }, 
        { status: 401 }
      )
    }
    
    // Check if it's a rate limit error
    if (error.status === 429) {
      return NextResponse.json(
        { 
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.'
          }
        }, 
        { status: 429 }
      )
    }
    
    // Generic error response
    return NextResponse.json(
      { 
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Unable to load business hours'
        }
      }, 
      { status: error.status || 500 }
    )
  }
}