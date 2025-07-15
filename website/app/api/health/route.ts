import { NextResponse } from 'next/server'

export async function GET() {
  const apiKeyConfigured = !!process.env.ANCHOR_API_KEY
  const apiKeyLength = process.env.ANCHOR_API_KEY?.length || 0
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apiKeyConfigured,
    apiKeyLength,
    apiBaseUrl: 'https://management.orangejelly.co.uk/api',
    version: '1.0.0'
  })
}