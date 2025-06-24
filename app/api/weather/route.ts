import { NextResponse } from 'next/server'

// Stanwell Moor coordinates
const LATITUDE = 51.4546
const LONGITUDE = -0.5156

export async function GET() {
  try {
    // TODO: Replace with actual OpenWeatherMap API call
    // You'll need to:
    // 1. Sign up at https://openweathermap.org/api
    // 2. Get a free API key
    // 3. Replace the mock data below with:
    // const API_KEY = process.env.OPENWEATHER_API_KEY
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`
    // )
    
    // Mock weather data based on typical UK weather
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