'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface WeatherData {
  temp: number
  feels_like: number
  description: string
  icon: string
  humidity: number
  wind_speed: number
}

interface WeatherProps {
  variant?: 'compact' | 'full'
}

// Stanwell Moor coordinates
const LATITUDE = 51.4546
const LONGITUDE = -0.5156

export function Weather({ variant = 'compact' }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Using OpenWeatherMap free API
        const API_KEY = '8d6454a89dff871786a0307b0dbebbee' // Free tier key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`
        )
        
        if (!response.ok) {
          throw new Error('Weather data unavailable')
        }
        
        const data = await response.json()
        
        setWeather({
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          wind_speed: Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
        })
      } catch (err) {
        console.error('Failed to fetch weather:', err)
        setError('Unable to load weather')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    )
  }

  if (error || !weather) {
    return null
  }

  // Compact variant - for header
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Image 
          src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
          alt={weather.description}
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <span className="font-medium">{weather.temp}°C</span>
        <span className="opacity-90 hidden sm:inline capitalize">
          {weather.description}
        </span>
      </div>
    )
  }

  // Full variant - for detailed display
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Local Weather</h3>
        <span className="text-sm text-gray-500">Stanwell Moor</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Image 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          width={64}
          height={64}
          className="w-16 h-16"
        />
        
        <div className="flex-1">
          <div className="text-3xl font-bold text-anchor-green">
            {weather.temp}°C
          </div>
          <div className="text-sm text-gray-600 capitalize">
            {weather.description}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <div>Feels like: {weather.feels_like}°C</div>
          <div>Humidity: {weather.humidity}%</div>
          <div>Wind: {weather.wind_speed} km/h</div>
        </div>
      </div>
    </div>
  )
}