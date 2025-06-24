import { NextResponse } from 'next/server'

// Stanwell Moor coordinates
const LATITUDE = 51.4546
const LONGITUDE = -0.5156

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'current'
  
  try {
    // TODO: Replace with actual OpenWeatherMap API call
    // You'll need to:
    // 1. Sign up at https://openweathermap.org/api
    // 2. Get a free API key
    // 3. Replace the mock data below with:
    // const API_KEY = process.env.OPENWEATHER_API_KEY
    // For current: /weather endpoint
    // For forecast: /forecast endpoint (5 day forecast with 3-hour intervals)
    
    if (type === 'forecast') {
      // Generate 5-day forecast mock data
      const forecast = []
      const conditions = ['clear sky', 'partly cloudy', 'cloudy', 'light rain', 'overcast']
      const icons = ['01d', '02d', '03d', '09d', '04d']
      
      for (let i = 0; i < 5; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        const conditionIndex = Math.floor(Math.random() * conditions.length)
        
        forecast.push({
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-GB', { weekday: 'short' }),
          temp_max: Math.round(10 + Math.random() * 8), // 10-18°C
          temp_min: Math.round(4 + Math.random() * 6), // 4-10°C
          description: conditions[conditionIndex],
          icon: icons[conditionIndex]
        })
      }
      
      return NextResponse.json({ forecast })
    }
    
    // Current weather (existing logic)
    const hour = new Date().getHours()
    const isNight = hour < 6 || hour > 20
    
    const mockWeather = {
      temp: Math.round(8 + Math.random() * 6), // 8-14°C typical UK temp
      feels_like: Math.round(6 + Math.random() * 6), // Slightly cooler feel
      description: isNight ? 'clear sky' : 'partly cloudy',
      icon: isNight ? '01n' : '02d',
      humidity: Math.round(65 + Math.random() * 20), // 65-85% humidity
      wind_speed: Math.round(10 + Math.random() * 15) // 10-25 km/h wind
    }
    
    return NextResponse.json(mockWeather)
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json({ error: 'Unable to load weather' }, { status: 500 })
  }
}