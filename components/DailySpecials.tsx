'use client'

import { useEffect, useState } from 'react'
import { CallToAction } from './CallToAction'
import { usePathname } from 'next/navigation'

interface DailySpecialsProps {
  isOpen: boolean
}

export function DailySpecials({ isOpen }: DailySpecialsProps) {
  const [currentDay, setCurrentDay] = useState<number>(0)
  const pathname = usePathname()
  
  useEffect(() => {
    setCurrentDay(new Date().getDay())
  }, [])

  // Don't show specials if closed
  if (!isOpen) return null

  // Tuesday = 2, Wednesday = 3, Friday = 5, Saturday = 6
  const showPizzaOffer = currentDay === 2 // Tuesday only
  const showFishFriday = currentDay === 5 // Friday
  const showSundayBooking = currentDay === 6 // Saturday

  if (!showPizzaOffer && !showFishFriday && !showSundayBooking) return null

  const handlePizzaClick = () => {
    // If we're already on the food-menu page, just scroll to the pizza section
    if (pathname === '/food-menu') {
      const pizzaSection = document.getElementById('pizza')
      if (pizzaSection) {
        const headerOffset = 80 // Height of fixed header
        const elementPosition = pizzaSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    // Otherwise, let the default navigation happen to /food-menu#pizza
  }

  return (
    <section className="section-spacing bg-red-600 text-white">
      <div className="container mx-auto px-4">
        {showPizzaOffer && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-yellow-400 text-red-900 font-bold text-lg md:text-xl px-6 py-3 rounded-full inline-block mb-4">
              🍕 TODAY'S SPECIAL 🍕
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Buy One Get One FREE
            </h2>
            <p className="text-xl mb-6 text-white/90">
              On ALL Stone-Baked Pizzas
            </p>
            <p className="text-lg mb-8">
              Every Tuesday - Dine in & takeaway
            </p>
            <CallToAction 
              href="/food-menu#pizza" 
              variant="yellow" 
              size="lg"
              onClick={handlePizzaClick}
            >
              View Pizza Menu
            </CallToAction>
          </div>
        )}

        {showFishFriday && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-yellow-400 text-red-900 font-bold text-lg md:text-xl px-6 py-3 rounded-full inline-block mb-4">
              🐟 FISH FRIDAY 🐟
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              50% Off Chip Shop Menu
            </h2>
            <p className="text-xl mb-6 text-white/90">
              For Over 65s - Every Friday!
            </p>
            <p className="text-lg mb-8">
              All chip shop menu items including fish & chips, scampi, and sausages
            </p>
            <CallToAction 
              href="/food-menu#mains" 
              variant="yellow" 
              size="lg"
              onClick={() => {
                if (pathname === '/food-menu') {
                  const mainsSection = document.getElementById('mains')
                  if (mainsSection) {
                    const headerOffset = 80 // Height of fixed header
                    const elementPosition = mainsSection.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                }
              }}
            >
              View Fish & Chips
            </CallToAction>
          </div>
        )}

        {showSundayBooking && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-yellow-400 text-red-900 font-bold text-lg md:text-xl px-6 py-3 rounded-full inline-block mb-4">
              🥘 BOOK YOUR SUNDAY ROAST 🥘
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Last Chance to Book Tomorrow's Roast!
            </h2>
            <p className="text-xl mb-6 text-white/90">
              Pre-order required by 1pm today
            </p>
            <p className="text-lg mb-8">
              Don't miss out on our famous Sunday roasts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction href="tel:01753682707" variant="yellow" size="lg">
                📞 Call Now to Book
              </CallToAction>
              <CallToAction href="/sunday-lunch" variant="white" size="lg">
                View Sunday Menu
              </CallToAction>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}