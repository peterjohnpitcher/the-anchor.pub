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


export function Weather({ variant = 'compact' }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchWeather() {
      try {
        const response = await fetch('/api/weather')
        
        if (!response.ok) {
          throw new Error('Weather data unavailable')
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setWeather(data)
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
  }, [mounted])

  if (loading) {
    if (variant === 'compact') {
      return (
        <div className="animate-pulse">
          <div className="h-6 bg-white/30 rounded w-24"></div>
        </div>
      )
    }
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="h-32"></div>
      </div>
    )
  }

  if (error || !weather) {
    console.error('Weather component error:', error)
    // Show a minimal fallback instead of hiding completely
    if (variant === 'compact') {
      return <div className="text-sm opacity-70">Weather unavailable</div>
    }
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-center text-gray-500">
          <p className="text-sm">Weather data unavailable</p>
        </div>
      </div>
    )
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