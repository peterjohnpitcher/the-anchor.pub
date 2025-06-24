'use client'

import { useEffect, useState } from 'react'

export function OpeningStatus() {
  const [status, setStatus] = useState<{
    isOpen: boolean
    message: string
    kitchenOpen: boolean
  }>({ isOpen: false, message: '🔴 Checking hours...', kitchenOpen: false })

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      const minutes = now.getMinutes()
      const time = hour + minutes / 60

      let isOpen = false
      let kitchenOpen = false
      let message = ''

      // Opening hours logic
      switch (day) {
        case 0: // Sunday
          isOpen = time >= 12 && time < 22
          kitchenOpen = time >= 12 && time < 17
          if (isOpen) {
            message = kitchenOpen ? '🟢 Open Now - Kitchen serving until 5pm' : '🟢 Open Now - Kitchen closed'
          } else if (time < 12) {
            message = '🔴 Opens at 12pm'
          } else {
            message = '🔴 Closed - Opens tomorrow 4pm'
          }
          break
        
        case 1: // Monday
          isOpen = time >= 16 && time < 22
          kitchenOpen = false
          if (isOpen) {
            message = '🟢 Open Now - Kitchen closed Mondays'
          } else if (time < 16) {
            message = '🔴 Opens at 4pm'
          } else {
            message = '🔴 Closed - Opens tomorrow 4pm'
          }
          break
        
        case 2: case 3: case 4: // Tue-Thu
          isOpen = time >= 16 && time < 22
          kitchenOpen = time >= 18 && time < 21
          if (isOpen) {
            message = kitchenOpen ? '🟢 Open Now - Kitchen serving until 9pm' : '🟢 Open Now - Kitchen opens 6pm'
          } else if (time < 16) {
            message = '🔴 Opens at 4pm'
          } else {
            message = '🔴 Closed - Opens tomorrow 4pm'
          }
          break
        
        case 5: // Friday
          isOpen = time >= 16 && time < 24
          kitchenOpen = time >= 18 && time < 21
          if (isOpen) {
            message = kitchenOpen ? '🟢 Open Now - Kitchen serving until 9pm' : '🟢 Open Now'
          } else if (time < 16) {
            message = '🔴 Opens at 4pm'
          } else {
            message = '🔴 Closed - Opens tomorrow 12pm'
          }
          break
        
        case 6: // Saturday
          isOpen = time >= 12 && time < 24
          kitchenOpen = time >= 13 && time < 19
          if (isOpen) {
            message = kitchenOpen ? '🟢 Open Now - Kitchen serving until 7pm' : '🟢 Open Now'
          } else if (time < 12) {
            message = '🔴 Opens at 12pm'
          } else {
            message = '🔴 Closed - Opens tomorrow 12pm'
          }
          break
      }

      setStatus({ isOpen, message, kitchenOpen })
    }

    checkStatus()
    const interval = setInterval(checkStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full border-2 border-anchor-gold/20 px-6 py-3 shadow-sm min-h-[44px] flex items-center">
      <p className="text-base font-medium text-anchor-green">{status.message}</p>
    </div>
  )
}