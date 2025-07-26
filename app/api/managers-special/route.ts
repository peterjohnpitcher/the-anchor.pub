import { NextResponse } from 'next/server'
import { getCurrentPromotion, getPromotionImage } from '@/lib/managers-special-utils'

export async function GET() {
  try {
    const currentPromotion = getCurrentPromotion()
    
    if (!currentPromotion) {
      return NextResponse.json({ 
        active: false,
        message: 'No active promotion' 
      }, { status: 404 })
    }
    
    // Get the image for this promotion
    const imagePath = getPromotionImage(currentPromotion.imageFolder)
    
    return NextResponse.json({
      active: true,
      promotion: currentPromotion,
      image: imagePath
    })
  } catch (error) {
    console.error('Error in managers-special API:', error)
    return NextResponse.json({ 
      error: 'Failed to load promotion' 
    }, { status: 500 })
  }
}