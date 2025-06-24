'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LoadingState } from '@/components/ui/LoadingState'

interface WeatherData {
  temp: number
  feels_like: number
  description: string
  icon: string
  humidity: number
  wind_speed: number
}

interface WeatherProps {
  variant?: 'compact' | 'full' | 'mini'
  className?: string
  apiEndpoint?: string
  refreshInterval?: number
  location?: string
  unit?: 'celsius' | 'fahrenheit'
  showFeelsLike?: boolean
  showHumidity?: boolean
  showWind?: boolean
  theme?: {
    background?: string
    text?: string
    tempColor?: string
    labelColor?: string
  }
  fallbackMessage?: string
}

const defaultTheme = {
  background: 'bg-white',
  text: 'text-gray-900',
  tempColor: 'text-anchor-green',
  labelColor: 'text-gray-600'
}

export function Weather({ 
  variant = 'compact',
  className,
  apiEndpoint = '/api/weather',
  refreshInterval = 30 * 60 * 1000, // 30 minutes
  location = 'Stanwell Moor',
  unit = 'celsius',
  showFeelsLike = true,
  showHumidity = true,
  showWind = true,
  theme = defaultTheme,
  fallbackMessage = 'Weather unavailable'
}: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const mergedTheme = { ...defaultTheme, ...theme }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchWeather() {
      try {
        const response = await fetch(apiEndpoint)
        
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
    
    if (refreshInterval > 0) {
      const interval = setInterval(fetchWeather, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [mounted, apiEndpoint, refreshInterval])

  const formatTemp = (temp: number) => {
    if (unit === 'fahrenheit') {
      return `${Math.round(temp * 9/5 + 32)}°F`
    }
    return `${temp}°C`
  }

  if (loading) {
    if (variant === 'mini') {
      return <LoadingState variant="skeleton" className="h-4 w-16" />
    }
    if (variant === 'compact') {
      return <LoadingState variant="skeleton" className="h-6 w-24" />
    }
    return (
      <div className={cn('rounded-lg shadow-sm p-4', mergedTheme.background, className)}>
        <LoadingState variant="skeleton" className="h-32" />
      </div>
    )
  }

  if (error || !weather) {
    if (variant === 'mini' || variant === 'compact') {
      return <div className={cn('text-sm opacity-70', className)}>{fallbackMessage}</div>
    }
    return (
      <div className={cn('rounded-lg shadow-sm p-4', mergedTheme.background, className)}>
        <div className={cn('text-center', mergedTheme.labelColor)}>
          <p className="text-sm">{fallbackMessage}</p>
        </div>
      </div>
    )
  }

  // Mini variant - temperature only
  if (variant === 'mini') {
    return (
      <span className={cn('font-medium', mergedTheme.text, className)}>
        {formatTemp(weather.temp)}
      </span>
    )
  }

  // Compact variant - for header
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Image 
          src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
          alt={weather.description}
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <span className={cn('font-medium', mergedTheme.text)}>
          {formatTemp(weather.temp)}
        </span>
        <span className={cn('opacity-90 hidden sm:inline capitalize', mergedTheme.text)}>
          {weather.description}
        </span>
      </div>
    )
  }

  // Full variant - for detailed display
  return (
    <div className={cn('rounded-lg shadow-sm p-4', mergedTheme.background, className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={cn('font-semibold text-lg', mergedTheme.text)}>
          Local Weather
        </h3>
        <span className={cn('text-sm', mergedTheme.labelColor)}>
          {location}
        </span>
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
          <div className={cn('text-3xl font-bold', mergedTheme.tempColor)}>
            {formatTemp(weather.temp)}
          </div>
          <div className={cn('text-sm capitalize', mergedTheme.labelColor)}>
            {weather.description}
          </div>
        </div>
        
        <div className={cn('text-sm', mergedTheme.labelColor)}>
          {showFeelsLike && (
            <div>Feels like: {formatTemp(weather.feels_like)}</div>
          )}
          {showHumidity && (
            <div>Humidity: {weather.humidity}%</div>
          )}
          {showWind && (
            <div>Wind: {weather.wind_speed} km/h</div>
          )}
        </div>
      </div>
    </div>
  )
}