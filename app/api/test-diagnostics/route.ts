import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🔍 TEST DIAGNOSTICS ENDPOINT CALLED')
  
  return NextResponse.json({
    message: 'Diagnostics active',
    timestamp: new Date().toISOString(),
    env_key_set: !!process.env.ANCHOR_API_KEY,
    api_key_prefix: process.env.ANCHOR_API_KEY?.substring(0, 10) + '...'
  })
}