'use client'

import { useEffect, useState } from 'react'

interface SpecialOffer {
  id: string
  title: string
  description: string
  emoji: string
  dayOfWeek: number[]
  sectionId?: string
  showCountdown?: boolean
  countdownDeadline?: { hour: number; minute: number }
}

const specialOffers: SpecialOffer[] = [
  {
    id: 'pizza-bogof',
    title: 'BOGOF Pizza Deal Today!',
    description: 'Buy one get one FREE on all stone-baked pizzas - Dine in & takeaway',
    emoji: '🍕',
    dayOfWeek: [2, 3], // Tuesday & Wednesday
    sectionId: 'pizza'
  },
  {
    id: 'fish-friday',
    title: "Fish Friday - 50% Off for Over 65's",
    description: 'Half price fish & chips for seniors every Friday',
    emoji: '🐟',
    dayOfWeek: [5], // Friday
    sectionId: 'mains'
  },
  {
    id: 'sunday-lunch-deadline',
    title: 'Sunday Lunch - Order Deadline Today!',
    description: 'Pre-order required by 1pm today for tomorrow\'s roast',
    emoji: '🥘',
    dayOfWeek: [6], // Saturday
    showCountdown: true,
    countdownDeadline: { hour: 13, minute: 0 } // 1pm
  }
]

interface SpecialOfferNotificationsProps {
  targetSection?: string
}

export function SpecialOfferNotifications({ targetSection }: SpecialOfferNotificationsProps) {
  const [currentDay, setCurrentDay] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const now = new Date()
    setCurrentDay(now.getDay())
    setCurrentTime(now)

    // Update time every minute for countdown
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const getTimeRemaining = (deadline: { hour: number; minute: number }) => {
    const now = new Date()
    const deadlineTime = new Date(now)
    deadlineTime.setHours(deadline.hour, deadline.minute, 0, 0)

    if (now > deadlineTime) {
      return null // Deadline passed
    }

    const diffMs = deadlineTime.getTime() - now.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    return { hours, minutes }
  }

  const relevantOffers = specialOffers.filter(offer => {
    // Check if it's the right day
    if (!offer.dayOfWeek.includes(currentDay)) return false
    
    // If we have a target section, only show offers for that section
    if (targetSection && offer.sectionId !== targetSection) return false
    
    // If it has a countdown deadline, check if it hasn't passed
    if (offer.showCountdown && offer.countdownDeadline) {
      const timeRemaining = getTimeRemaining(offer.countdownDeadline)
      if (!timeRemaining) return false
    }
    
    return true
  })

  if (relevantOffers.length === 0) return null

  return (
    <div className="space-y-4 mb-6">
      {relevantOffers.map(offer => {
        const timeRemaining = offer.showCountdown && offer.countdownDeadline
          ? getTimeRemaining(offer.countdownDeadline)
          : null

        return (
          <div
            key={offer.id}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4 shadow-lg animate-pulse-subtle"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{offer.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  <p className="text-white/90">{offer.description}</p>
                </div>
              </div>
              
              {timeRemaining && (
                <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                  <p className="text-sm font-semibold">Time Remaining:</p>
                  <p className="text-xl font-bold">
                    {timeRemaining.hours}h {timeRemaining.minutes}m
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}