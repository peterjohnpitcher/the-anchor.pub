'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/primitives/Button'
import { Badge } from '@/components/ui/primitives/Badge'
import { Icon } from '@/components/ui/Icon'
import { trackFormStart } from '@/lib/gtm-events'

const STORAGE_KEY = 'global_christmas_lightbox_last'
const SUPPRESS_PATHS = ['/christmas-parties', '/christmas']
const DISPLAY_DELAY_MS = 40000
const SUPPRESSION_WINDOW_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
const CONTACT_PHONE = '01753 682707'
const CONTACT_PHONE_LINK = 'tel:+441753682707'
const TARGET_URL = '/christmas-parties'

const shouldSuppressForPath = (pathname: string | null) => {
  if (!pathname) return false
  return SUPPRESS_PATHS.some(path => pathname.startsWith(path))
}

const markShown = () => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch (error) {
    console.warn('Unable to update Christmas lightbox storage', error)
  }
}

const hasRecentDisplay = () => {
  if (typeof window === 'undefined') return false
  try {
    const lastShown = Number(window.localStorage.getItem(STORAGE_KEY) || 0)
    if (!lastShown) return false
    return Date.now() - lastShown < SUPPRESSION_WINDOW_MS
  } catch (error) {
    console.warn('Unable to read Christmas lightbox storage', error)
    return false
  }
}

export function ChristmasGlobalLightbox() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (shouldSuppressForPath(pathname)) return
    if (hasRecentDisplay()) return

    const isDesktop = window.innerWidth >= 1024
    let timeoutId: number | null = null

    const showLightbox = () => {
      setVisible(true)
      markShown()
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        document.removeEventListener('mouseleave', handleMouseLeave)
        showLightbox()
      }
    }

    if (isDesktop) {
      document.addEventListener('mouseleave', handleMouseLeave)
    } else {
      timeoutId = window.setTimeout(showLightbox, DISPLAY_DELAY_MS)
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [pathname])

  const dismiss = () => {
    setVisible(false)
    markShown()
  }

  const handlePrimary = () => {
    trackFormStart('christmas_global_lightbox_cta')
    setVisible(false)
    markShown()
    if (typeof window !== 'undefined') {
      window.location.href = TARGET_URL
    }
  }

  const handleCall = () => {
    trackFormStart('christmas_global_lightbox_call')
    setVisible(false)
    markShown()
    if (typeof window !== 'undefined') {
      window.location.href = CONTACT_PHONE_LINK
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-600"
          aria-label="Close"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
        <div className="space-y-4 text-left">
          <Badge className="bg-red-100 text-red-700 w-fit">Christmas 2025</Badge>
          <h3 className="text-2xl font-bold text-anchor-charcoal">
            Planning a Christmas get-together or company party near Heathrow?
          </h3>
          <p className="text-sm text-gray-600">
            Reserve your space at our village pub just five minutes from Terminal 5 and ten minutes from Staines. Dinners from £36.95, buffets for 26+, Early-Bird Prosecco and all the festive décor included.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="danger" size="md" onClick={handlePrimary}>
              Plan my Christmas party
            </Button>
            <Button variant="primary" size="md" onClick={handleCall}>
              Call {CONTACT_PHONE}
            </Button>
            <button
              type="button"
              onClick={dismiss}
              className="text-xs text-gray-500 underline decoration-dotted"
            >
              Not right now
            </button>
          </div>
          <p className="text-xs text-gray-400">
            We only show this once a week so you can plan in peace.
          </p>
        </div>
      </div>
    </div>
  )
}
