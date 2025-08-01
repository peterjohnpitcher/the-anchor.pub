import { NextResponse } from 'next/server'
import { logError } from '@/lib/error-handling'

// The Anchor pub, Stanwell Moor coordinates
const LATITUDE = 51.462482
const LONGITUDE = -0.502187
const API_KEY = process.env.OPENWEATHER_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'current'
  
  try {
    if (!API_KEY) {
      const error = new Error('Weather API configuration error: Missing API key')
      logError('weather-api-config', error)
      throw error
    }

    if (type === 'forecast') {
      // Fetch 5-day forecast from OpenWeatherMap
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`
      const forecastResponse = await fetch(forecastUrl)
      
      if (!forecastResponse.ok) {
        const error = new Error(`Weather forecast API error: ${forecastResponse.status} ${forecastResponse.statusText}`)
        logError('weather-api-forecast', error, {
          status: forecastResponse.status,
          statusText: forecastResponse.statusText
        })
        throw error
      }
      
      const forecastData = await forecastResponse.json()
      
      // Group forecast by day and get daily summary
      const dailyForecasts = new Map()
      
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000)
        const dateStr = date.toISOString().split('T')[0]
        
        if (!dailyForecasts.has(dateStr)) {
          dailyForecasts.set(dateStr, {
            date: dateStr,
            day: date.toLocaleDateString('en-GB', { weekday: 'short' }),
            temp_max: item.main.temp_max,
            temp_min: item.main.temp_min,
            description: item.weather[0].description,
            icon: item.weather[0].icon.replace('n', 'd') // Use day icon
          })
        } else {
          const existing = dailyForecasts.get(dateStr)
          existing.temp_max = Math.max(existing.temp_max, item.main.temp_max)
          existing.temp_min = Math.min(existing.temp_min, item.main.temp_min)
        }
      })
      
      // Convert to array and take first 5 days
      const forecast = Array.from(dailyForecasts.values()).slice(0, 5)
      
      return NextResponse.json({ forecast })
    }
    
    // Current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`
    const weatherResponse = await fetch(weatherUrl)
    
    if (!weatherResponse.ok) {
      const error = new Error(`Weather current API error: ${weatherResponse.status} ${weatherResponse.statusText}`)
      logError('weather-api-current', error, {
        status: weatherResponse.status,
        statusText: weatherResponse.statusText
      })
      throw error
    }
    
    const weatherData = await weatherResponse.json()
    
    const currentWeather = {
      temp: Math.round(weatherData.main.temp),
      feels_like: Math.round(weatherData.main.feels_like),
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      wind_speed: Math.round(weatherData.wind.speed * 3.6) // Convert m/s to km/h
    }
    
    return NextResponse.json(currentWeather)
  } catch (error) {
    logError('weather-api', error, { type })
    return NextResponse.json({ error: 'Unable to load weather' }, { status: 500 })
  }
}