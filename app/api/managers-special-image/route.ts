import { NextResponse } from 'next/server'
import { getManagersSpecialImage } from '@/lib/managers-special-image'

export async function GET() {
  const imagePath = getManagersSpecialImage()
  
  return NextResponse.json({
    image: imagePath,
    found: imagePath !== null
  })
}