import { NextResponse } from 'next/server'

const API_KEY = 'bcf9b880cc9fe4615bd68090e88c6407d4ee7506'
const API_URL = 'https://management.orangejelly.co.uk/api/business/hours'

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      // No cache - always fetch fresh data
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch business hours')
    }

    const data = await response.json()
    
    // Apply timezone fix for BST
    // The external API incorrectly uses UTC instead of Europe/London for status calculation
    const now = new Date()
    const dayName = now.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()
    const currentHours = data.regularHours[dayName]
    
    if (currentHours && !currentHours.is_closed) {
      const currentTime = now.getHours() + now.getMinutes() / 60
      const [openHour, openMin] = currentHours.opens.split(':').map(Number)
      const [closeHour, closeMin] = currentHours.closes.split(':').map(Number)
      
      const openTime = openHour + openMin / 60
      let closeTime = closeHour + closeMin / 60
      
      // Handle closing after midnight
      if (closeTime < openTime) {
        if (currentTime < closeTime) {
          // We're in the early hours after midnight, still "yesterday's" opening
          data.currentStatus.isOpen = true
        } else {
          // Normal day hours
          data.currentStatus.isOpen = currentTime >= openTime
        }
      } else {
        // Normal hours (close before midnight)
        data.currentStatus.isOpen = currentTime >= openTime && currentTime < closeTime
      }
      
      // Recalculate opens/closes in
      if (data.currentStatus.isOpen) {
        // Calculate closes in
        const minutesUntilClose = closeTime < openTime && currentTime < closeTime 
          ? (closeTime - currentTime) * 60
          : (closeTime - currentTime) * 60
        
        if (minutesUntilClose > 60) {
          const hours = Math.floor(minutesUntilClose / 60)
          const mins = Math.round(minutesUntilClose % 60)
          data.currentStatus.closesIn = `in ${hours}h ${mins}m`
        } else {
          data.currentStatus.closesIn = `in ${Math.round(minutesUntilClose)}m`
        }
      } else if (currentTime < openTime) {
        // Calculate opens in
        const minutesUntilOpen = (openTime - currentTime) * 60
        
        if (minutesUntilOpen > 60) {
          const hours = Math.floor(minutesUntilOpen / 60)
          const mins = Math.round(minutesUntilOpen % 60)
          data.currentStatus.opensIn = `in ${hours}h ${mins}m`
        } else {
          data.currentStatus.opensIn = `in ${Math.round(minutesUntilOpen)}m`
        }
      }
      
      // Check kitchen status
      if (currentHours.kitchen && data.currentStatus.isOpen) {
        const [kitchenOpenHour, kitchenOpenMin] = currentHours.kitchen.opens.split(':').map(Number)
        const [kitchenCloseHour, kitchenCloseMin] = currentHours.kitchen.closes.split(':').map(Number)
        
        const kitchenOpenTime = kitchenOpenHour + kitchenOpenMin / 60
        const kitchenCloseTime = kitchenCloseHour + kitchenCloseMin / 60
        
        data.currentStatus.kitchenOpen = currentTime >= kitchenOpenTime && currentTime < kitchenCloseTime
      }
    }
    
    // Add timestamp for debugging
    return NextResponse.json({
      ...data,
      fetchedAt: new Date().toISOString(),
      localTime: now.toString(),
      timezoneFix: 'Applied BST fix server-side'
    })
  } catch (error) {
    console.error('Business hours API error:', error)
    return NextResponse.json({ error: 'Unable to load business hours' }, { status: 500 })
  }
}