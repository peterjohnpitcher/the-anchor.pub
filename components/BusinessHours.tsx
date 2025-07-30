'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { type BusinessHours } from '@/lib/api'
import { StatusBar } from './StatusBar'
import { FALLBACK_CONTENT, CONTACT_INFO, logError } from '@/lib/error-handling'
import { LoadingState } from '@/components/ui/LoadingState'
import { parseApiDuration } from '@/lib/time-utils'
import { useBusinessHours } from '@/hooks/useBusinessHours'

interface WeatherForecast {
  date: string
  day: string
  temp_max: number
  temp_min: number
  description: string
  icon: string
}

interface BusinessHoursProps {
  variant?: 'compact' | 'full' | 'status' | 'dark' | 'condensed'
  showKitchen?: boolean
  showWeather?: boolean
}

export function BusinessHours({ variant = 'full', showKitchen = true, showWeather = false }: BusinessHoursProps) {
  const [forecast, setForecast] = useState<WeatherForecast[]>([])
  const [weatherLoading, setWeatherLoading] = useState(false)
  
  // Use the useBusinessHours hook instead of manual fetching
  const { hours, loading, error } = useBusinessHours({
    refreshInterval: 5 * 60 * 1000 // 5 minutes
  })

  // Fetch weather data separately if needed
  useEffect(() => {
    async function fetchWeather() {
      if (!showWeather || (variant !== 'dark' && variant !== 'condensed')) {
        return
      }
      
      try {
        setWeatherLoading(true)
        const weatherData = await fetch('/api/weather?type=forecast').then(r => r.json())
        
        if (weatherData && weatherData.forecast) {
          setForecast(weatherData.forecast)
        }
      } catch (err) {
        logError('weather-fetch', err, { variant })
        // Weather is optional, so we don't set an error state
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [showWeather, variant])

  if (loading) {
    if (variant === 'status') {
      return <LoadingState variant="dots" size="sm" className="inline-flex" />
    }
    return <LoadingState variant="skeleton" className="h-20 w-full" />
  }

  if (error || !hours) {
    const errorMessage = error?.message || `We couldn't load our opening hours. We're typically open 4pm-10pm Mon, 12pm-10pm Tue-Thu, 12pm-11pm Fri-Sat, and 12pm-9pm Sun. Call us at ${CONTACT_INFO.phone} for today's hours.`
    
    if (variant === 'status') {
      return (
        <span className="text-sm text-red-600">
          <a href={CONTACT_INFO.phoneLink} className="underline">
            Call for hours
          </a>
        </span>
      )
    }
    // Show fallback hours
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-sm mb-2">{errorMessage}</p>
        <div className="text-sm text-gray-700">
          <p className="font-semibold mb-1">Regular Hours:</p>
          <ul className="space-y-1 text-sm">
            <li>Mon: 4pm-10pm (No kitchen service)</li>
            <li>Tue-Thu: 12pm-10pm</li>
            <li>Fri-Sat: 12pm-11pm</li>
            <li>Sun: 12pm-9pm</li>
          </ul>
          <p className="mt-2">
            <a href={CONTACT_INFO.phoneLink} className="text-anchor-gold hover:text-anchor-gold-light font-semibold underline">
              Call {CONTACT_INFO.phone}
            </a> for today's hours
          </p>
        </div>
      </div>
    )
  }

  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()
  
  // Get upcoming days order starting from today
  const todayIndex = dayOrder.indexOf(today)
  const upcomingDays = [...dayOrder.slice(todayIndex), ...dayOrder.slice(0, todayIndex)]
  
  // Helper function to check if there's a special hour for a specific date
  const getSpecialHoursForDate = (date: Date) => {
    if (!hours.specialHours || hours.specialHours.length === 0) return null
    
    const dateStr = date.toISOString().split('T')[0]
    return hours.specialHours.find(sh => sh.date.startsWith(dateStr))
  }

  // Format time from 24h to 12h
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour % 12 || 12
    return minutes === '00' ? `${displayHour}${ampm}` : `${displayHour}:${minutes}${ampm}`
  }

  // Status variant - just shows open/closed
  if (variant === 'status') {
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm">
          {hours.currentStatus.isOpen ? (
            <>Open now • Closes {parseApiDuration(hours.currentStatus.closesIn) || hours.currentStatus.closesIn}</>
          ) : (
            <>Closed • Opens {parseApiDuration(hours.currentStatus.opensIn) || hours.currentStatus.opensIn}</>
          )}
        </span>
      </div>
    )
  }

  // Compact variant - for header/footer
  if (variant === 'compact') {
    const todayHours = hours.regularHours[today]
    return (
      <div className="text-sm">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="font-medium">
            {hours.currentStatus.isOpen ? 'Open' : 'Closed'}
          </span>
          {todayHours && !todayHours.is_closed && (
            <span className="text-gray-700">
              {formatTime(todayHours.opens)} - {formatTime(todayHours.closes)}
            </span>
          )}
        </div>
        {hours.currentStatus.isOpen && hours.currentStatus.closesIn && (
          <p className="text-sm sm:text-xs text-gray-700 mt-1">Closes in {parseApiDuration(hours.currentStatus.closesIn) || hours.currentStatus.closesIn}</p>
        )}
      </div>
    )
  }

  // Dark variant - for dark backgrounds
  if (variant === 'dark') {
    return (
      <div className="space-y-4">
        {/* Current Status */}
        <div className={`p-4 rounded-lg ${hours.currentStatus.isOpen ? 'bg-green-500/20 border border-green-400/30' : 'bg-red-500/20 border border-red-400/30'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`inline-block w-3 h-3 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="font-semibold text-lg text-white">
                {hours.currentStatus.isOpen ? 'We\'re Open!' : 'We\'re Closed'}
              </span>
            </div>
            {hours.currentStatus.isOpen && hours.currentStatus.closesIn && (
              <span className="text-sm text-gray-600">Closes in {parseApiDuration(hours.currentStatus.closesIn) || hours.currentStatus.closesIn}</span>
            )}
            {!hours.currentStatus.isOpen && hours.currentStatus.opensIn && (
              <span className="text-sm text-gray-600">Opens in {parseApiDuration(hours.currentStatus.opensIn) || hours.currentStatus.opensIn}</span>
            )}
          </div>
          {showKitchen && (
            <p className="text-sm mt-2 text-gray-600">
              Kitchen: {hours.currentStatus.kitchenOpen ? 
                <span className="text-green-400 font-medium">Open for food orders</span> : 
                <span className="text-red-400 font-medium">Closed</span>
              }
            </p>
          )}
        </div>

        {/* Regular Hours with Weather */}
        <div className="space-y-2">
          {upcomingDays.slice(0, 7).map((day, index) => {
            const dayHours = hours.regularHours[day]
            const isToday = day === today
            const dayForecast = forecast[index]
            
            // Calculate the date for this day
            const currentDate = new Date()
            const daysToAdd = index
            const dayDate = new Date(currentDate)
            dayDate.setDate(currentDate.getDate() + daysToAdd)
            
            // Check for special hours
            const specialHours = getSpecialHoursForDate(dayDate)
            const displayHours = specialHours || dayHours
            const hasSpecialHours = !!specialHours
            
            return (
              <div 
                key={day} 
                className={`flex justify-between items-start py-2 px-3 rounded ${
                  isToday ? 'bg-white/10' : ''
                } ${hasSpecialHours ? 'ring-1 ring-yellow-400/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-medium capitalize ${isToday ? 'text-white' : 'text-white'}`}>
                    {day}
                    {isToday && <span className="text-sm sm:text-xs ml-2 text-white">(Today)</span>}
                    {hasSpecialHours && <span className="text-sm sm:text-xs ml-2 text-yellow-400">({specialHours.note || specialHours.reason || 'Special hours'})</span>}
                  </span>
                  {showWeather && dayForecast && (
                    <div className="flex items-center gap-2">
                      <Image 
                        src={`https://openweathermap.org/img/wn/${dayForecast.icon}.png`}
                        alt={dayForecast.description}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        sizes="24px"
                      />
                      <span className="text-sm sm:text-xs text-white/80">
                        {Math.round(dayForecast.temp_max)}°/{Math.round(dayForecast.temp_min)}°C
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right space-y-1">
                  {displayHours.is_closed ? (
                    <span className={hasSpecialHours ? 'text-yellow-400' : 'text-gray-600'}>Closed</span>
                  ) : (
                    <>
                      {/* Bar Hours */}
                      <div>
                        <span className="text-sm text-gray-400 mr-2">Bar:</span>
                        <span className={hasSpecialHours ? 'text-yellow-400' : 'text-white'}>
                          {formatTime(displayHours.opens!)} - {formatTime(displayHours.closes!)}
                        </span>
                      </div>
                      
                      {/* Kitchen Hours */}
                      {showKitchen && !hasSpecialHours && (
                        <div className="text-sm">
                          <span className="text-gray-400 mr-2">Kitchen:</span>
                          {(() => {
                            if (!dayHours.kitchen || dayHours.kitchen === null) {
                              return <span className="text-gray-500">No service</span>
                            } else if ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed === true) {
                              return <span className="text-amber-400">Closed</span>
                            } else if ('opens' in dayHours.kitchen && 'closes' in dayHours.kitchen) {
                              return (
                                <span className="text-white">
                                  {formatTime(dayHours.kitchen.opens)} - {formatTime(dayHours.kitchen.closes)}
                                </span>
                              )
                            } else {
                              return <span className="text-gray-500">No service</span>
                            }
                          })()}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Condensed variant - compact vertical layout
  if (variant === 'condensed') {
    return (
      <div className="space-y-3">
        {/* Status Bar */}
        <div className="flex justify-center">
          <StatusBar showKitchen={showKitchen} />
        </div>

        {/* All Days Vertical List - Compact */}
        <div className="space-y-1">
          {upcomingDays.map((day, index) => {
            const dayHours = hours.regularHours[day]
            const isToday = day === today
            const dayForecast = showWeather ? forecast[index] : null
            
            // Calculate the date for this day
            const currentDate = new Date()
            const daysToAdd = index
            const dayDate = new Date(currentDate)
            dayDate.setDate(currentDate.getDate() + daysToAdd)
            
            // Check for special hours
            const specialHours = getSpecialHoursForDate(dayDate)
            const displayHours = specialHours || dayHours
            const hasSpecialHours = !!specialHours
            
            return (
              <div 
                key={day} 
                className={`flex items-center justify-between px-3 py-1.5 rounded ${
                  isToday ? 'bg-white/10 ring-1 ring-white/30' : 'hover:bg-white/5'
                } ${hasSpecialHours ? 'ring-1 ring-yellow-400/50' : ''}`}
              >
                {/* Left: Day & Weather */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-sm font-medium capitalize w-16 ${isToday ? 'text-white' : 'text-white'}`}>
                    {day.slice(0, 3)}
                    {isToday && <span className="text-sm sm:text-xs"> •</span>}
                  </span>
                  {showWeather && dayForecast && (
                    <div className="flex items-center gap-1">
                      <Image 
                        src={`https://openweathermap.org/img/wn/${dayForecast.icon}.png`}
                        alt={dayForecast.description}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        sizes="20px"
                      />
                      <span className="text-sm sm:text-xs text-white/80">
                        {Math.round(dayForecast.temp_max)}°/{Math.round(dayForecast.temp_min)}°C
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Right: Hours */}
                <div className="text-right text-sm space-y-0.5">
                  {displayHours.is_closed ? (
                    <div>
                      <span className={hasSpecialHours ? 'text-yellow-400' : 'text-white'}>
                        Closed{hasSpecialHours && (specialHours.note || specialHours.reason) ? ` (${specialHours.note || specialHours.reason})` : ''}
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* Bar Hours */}
                      <div>
                        <span className="text-xs text-white/60 mr-1">Bar:</span>
                        <span className={hasSpecialHours ? 'text-yellow-400' : 'text-white'}>
                          {formatTime(displayHours.opens!)} - {formatTime(displayHours.closes!)}
                        </span>
                      </div>
                      
                      {/* Kitchen Hours */}
                      {showKitchen && !hasSpecialHours && (
                        <div className="text-xs">
                          <span className="text-white/60 mr-1">Kitchen:</span>
                          {(() => {
                            if (!dayHours.kitchen || dayHours.kitchen === null) {
                              return <span className="text-white/50">No service</span>
                            } else if ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed === true) {
                              return <span className="text-amber-400">Closed</span>
                            } else if ('opens' in dayHours.kitchen && 'closes' in dayHours.kitchen) {
                              return (
                                <span className="text-white/80">
                                  {formatTime(dayHours.kitchen.opens)} - {formatTime(dayHours.kitchen.closes)}
                                </span>
                              )
                            } else {
                              return <span className="text-white/50">No service</span>
                            }
                          })()}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Full variant - for dedicated sections
  return (
    <div className="space-y-4">
      {/* Schema.org OpeningHoursSpecification */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OpeningHoursSpecification",
            "@id": "https://www.the-anchor.pub/#opening-hours",
            "dayOfWeek": Object.entries(hours.regularHours)
              .filter(([_, h]) => !h.is_closed)
              .map(([day, h]) => day.charAt(0).toUpperCase() + day.slice(1)),
            "opens": hours.regularHours[today]?.opens || "16:00",
            "closes": hours.regularHours[today]?.closes || "22:00",
            "validFrom": new Date().toISOString().split('T')[0],
            "validThrough": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          })
        }}
      />
      {/* Current Status */}
      <div className={`p-4 rounded-lg ${hours.currentStatus.isOpen ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`inline-block w-3 h-3 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-semibold text-lg">
              {hours.currentStatus.isOpen ? 'We\'re Open!' : 'We\'re Closed'}
            </span>
          </div>
          {hours.currentStatus.isOpen && hours.currentStatus.closesIn && (
            <span className="text-sm text-gray-700">Closes in {parseApiDuration(hours.currentStatus.closesIn) || hours.currentStatus.closesIn}</span>
          )}
          {!hours.currentStatus.isOpen && hours.currentStatus.opensIn && (
            <span className="text-sm text-gray-700">Opens in {parseApiDuration(hours.currentStatus.opensIn) || hours.currentStatus.opensIn}</span>
          )}
        </div>
        {showKitchen && (
          <p className="text-sm mt-2 text-gray-700">
            Kitchen: {hours.currentStatus.kitchenOpen ? 
              <span className="text-green-700 font-medium">Open for food orders</span> : 
              <span className="text-red-700 font-medium">Closed</span>
            }
          </p>
        )}
      </div>

      {/* Regular Hours */}
      <div itemProp="openingHours" itemScope itemType="https://schema.org/OpeningHoursSpecification">
        <h3 className="font-bold text-lg mb-3">Opening Hours</h3>
        <div className="space-y-2">
          {dayOrder.map((day, idx) => {
            const dayHours = hours.regularHours[day]
            const isToday = day === today
            
            // Calculate the date for this day
            const currentDate = new Date()
            const dayIndex = dayOrder.indexOf(day)
            const todayIdx = dayOrder.indexOf(today)
            let daysToAdd = dayIndex - todayIdx
            if (daysToAdd < 0) daysToAdd += 7
            
            const dayDate = new Date(currentDate)
            dayDate.setDate(currentDate.getDate() + daysToAdd)
            
            // Check for special hours
            const specialHours = getSpecialHoursForDate(dayDate)
            const displayHours = specialHours || dayHours
            const hasSpecialHours = !!specialHours
            
            return (
              <div 
                key={day} 
                className={`flex justify-between items-start py-2 px-3 rounded ${
                  isToday ? 'bg-anchor-cream' : ''
                } ${hasSpecialHours ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <span className={`font-medium capitalize ${isToday ? 'text-anchor-green' : ''}`} itemProp="dayOfWeek">
                  {day}
                  {isToday && <span className="text-sm sm:text-xs ml-2 text-white">(Today)</span>}
                  {hasSpecialHours && <span className="text-sm sm:text-xs ml-2 text-yellow-600">({specialHours.note || specialHours.reason || 'Special hours'})</span>}
                </span>
                <div className="text-right space-y-1">
                  {displayHours.is_closed ? (
                    <span className={hasSpecialHours ? 'text-yellow-600 font-medium' : 'text-gray-700'}>Closed</span>
                  ) : (
                    <>
                      {/* Bar Hours */}
                      <div>
                        <span className="text-sm text-gray-500 mr-2">Bar:</span>
                        <span className={hasSpecialHours ? 'text-yellow-600 font-medium' : ''}>
                          <time itemProp="opens" content={displayHours.opens}>{formatTime(displayHours.opens!)}</time> - <time itemProp="closes" content={displayHours.closes}>{formatTime(displayHours.closes!)}</time>
                        </span>
                      </div>
                      
                      {/* Kitchen Hours */}
                      {showKitchen && !hasSpecialHours && (
                        <div className="text-sm">
                          <span className="text-gray-500 mr-2">Kitchen:</span>
                          {(() => {
                            if (!dayHours.kitchen || dayHours.kitchen === null) {
                              return <span className="text-gray-500">No service</span>
                            } else if ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed === true) {
                              return <span className="text-amber-600 font-medium">Closed</span>
                            } else if ('opens' in dayHours.kitchen && 'closes' in dayHours.kitchen) {
                              return (
                                <span>
                                  {formatTime(dayHours.kitchen.opens)} - {formatTime(dayHours.kitchen.closes)}
                                </span>
                              )
                            } else {
                              return <span className="text-gray-500">No service</span>
                            }
                          })()}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}