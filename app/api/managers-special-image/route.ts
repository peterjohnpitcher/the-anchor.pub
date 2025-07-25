import { NextResponse } from 'next/server'
import { getCurrentPromotion, getPromotionImage } from '@/lib/managers-special-utils'

export async function GET() {
  try {
    const currentPromotion = getCurrentPromotion()
    
    if (!currentPromotion) {
      return NextResponse.json({ 
        found: false,
        image: null 
      })
    }
    
    const imagePath = getPromotionImage(currentPromotion.imageFolder)
    
    if (!imagePath) {
      return NextResponse.json({ 
        found: false,
        image: null 
      })
    }
    
    return NextResponse.json({
      found: true,
      image: imagePath
    })
  } catch (error) {
    console.error('Error in managers-special-image API:', error)
    return NextResponse.json({ 
      found: false,
      image: null 
    }, { status: 500 })
  }
}