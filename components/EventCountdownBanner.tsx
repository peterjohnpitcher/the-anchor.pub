'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { type Event } from '@/lib/api'
import { trackFormStart } from '@/lib/gtm-events'

const BANNER_STORAGE_KEY = 'event_banner_dismissed_until'
const DISMISS_DURATION_MS = 1000 * 60 * 60 * 24 // 24 hours
const MAX_LEAD_DAYS = 7
const HIDDEN_PATH_PREFIXES = ['/events']

interface BannerState {
  event: Event
  eventDate: Date
  daysUntil: number
  hoursUntil: number
}

const getWeekday = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date)

const getFormattedDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(date)

const computeTiming = (dateString: string) => {
  const eventDate = new Date(dateString)
  if (Number.isNaN(eventDate.getTime())) return null

  const now = new Date()
  const diffMs = eventDate.getTime() - now.getTime()
  if (diffMs <= 0) return null

  const hoursUntil = diffMs / (1000 * 60 * 60)
  const daysUntil = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  return { eventDate, daysUntil, hoursUntil }
}

const hasRecentDismissal = () => {
  if (typeof window === 'undefined') return false
  try {
    const stored = window.localStorage.getItem(BANNER_STORAGE_KEY)
    if (!stored) return false
    const expiry = Number(stored)
    if (Number.isNaN(expiry)) return false
    return Date.now() < expiry
  } catch (error) {
    console.warn('Unable to read dismissal state', error)
    return false
  }
}

const markDismissal = () => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      BANNER_STORAGE_KEY,
      String(Date.now() + DISMISS_DURATION_MS)
    )
  } catch (error) {
    console.warn('Unable to persist dismissal state', error)
  }
}

const shouldSuppressPath = (pathname: string | null) => {
  if (!pathname) return false
  return HIDDEN_PATH_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

const getSeatsCopy = (remaining: number | null | undefined) => {
  if (typeof remaining !== 'number') return 'Seats available now'
  if (remaining <= 0) return 'Almost fully booked'
  if (remaining === 1) return 'Only 1 seat left'
  if (remaining <= 5) return `Only ${remaining} seats left`
  if (remaining <= 12) return `${remaining} seats remaining`
  return 'Plenty of seats available'
}

type BannerTone = 'dark' | 'light' | 'alert' | 'muted'

const getUrgencyCopy = (event: Event, daysUntil: number, hoursUntil: number) => {
  const remaining = event.remainingAttendeeCapacity
  const seatsText = getSeatsCopy(remaining)
  const eventDate = new Date(event.startDate)

  if (hoursUntil <= 24) {
    return {
      title: `Happening ${hoursUntil <= 12 ? 'tonight' : 'tomorrow'}: ${event.name}`,
      message: `${seatsText}. Starts ${getFormattedDate(eventDate)} at ${eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}.`,
      tone: 'alert' as BannerTone,
      backgroundClass: 'bg-red-600 text-white'
    }
  }

  if (daysUntil <= 2) {
    return {
      title: `${event.name} is almost here`,
      message: `${seatsText}. Join us this ${getWeekday(eventDate)} at ${eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}.`,
      tone: 'light' as BannerTone,
      backgroundClass: 'bg-anchor-gold text-anchor-charcoal'
    }
  }

  if (daysUntil <= 4) {
    return {
      title: `${event.name} this ${getWeekday(eventDate)}`,
      message: `${seatsText}. Secure your spot before we fill up.`,
      tone: 'dark' as BannerTone,
      backgroundClass: 'bg-anchor-green text-white'
    }
  }

  return {
    title: `${event.name} next ${getWeekday(eventDate)}`,
    message: `${seatsText}. Early bookings get the best tables.`,
    tone: 'muted' as BannerTone,
    backgroundClass: 'bg-anchor-green/95 text-white'
  }
}

export function EventCountdownBanner() {
  const pathname = usePathname()
  const [banner, setBanner] = useState<BannerState | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (shouldSuppressPath(pathname)) {
      setBanner(null)
      return
    }
    if (hasRecentDismissal()) {
      setDismissed(true)
      setBanner(null)
      return
    }

    setDismissed(false)

    let cancelled = false

    async function fetchEvents() {
      try {
        const response = await fetch('/api/events?limit=5')
        if (!response.ok) return

        const payload = await response.json()
        if (payload?.success === false) return

        const eventsData = payload?.data || payload
        const events: Event[] = eventsData?.events || eventsData || []

        let selected: BannerState | null = null

        for (const event of events) {
          const timing = computeTiming(event.startDate)
          if (!timing) continue
          if (timing.daysUntil > MAX_LEAD_DAYS) continue

          const seats = event.remainingAttendeeCapacity
          if (typeof seats === 'number' && seats <= 0) continue

          selected = {
            event,
            eventDate: timing.eventDate,
            daysUntil: timing.daysUntil,
            hoursUntil: timing.hoursUntil
          }
          break
        }

        if (!cancelled) {
          setBanner(selected)
        }
      } catch (error) {
        console.warn('Unable to load upcoming events for banner', error)
      }
    }

    fetchEvents()

    return () => {
      cancelled = true
    }
  }, [pathname])

  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    if (!banner) return

    const updateCountdown = () => {
      const now = new Date()
      const diff = banner.eventDate.getTime() - now.getTime()
      if (diff <= 0) {
        setCountdown('Starting soon')
        return
      }

      const totalMinutes = Math.floor(diff / (1000 * 60))
      const days = Math.floor(totalMinutes / (60 * 24))
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
      const minutes = totalMinutes % 60

      if (days > 0) {
        setCountdown(`${days}d ${hours}h`)
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m`)
      } else {
        setCountdown(`${minutes}m`)
      }
    }

    updateCountdown()
    const timer = window.setInterval(updateCountdown, 60000)
    return () => window.clearInterval(timer)
  }, [banner])

  const content = useMemo(() => {
    if (!banner) return null
    const { event, daysUntil, hoursUntil } = banner
    return getUrgencyCopy(event, daysUntil, hoursUntil)
  }, [banner])

  if (dismissed || !banner || !content) {
    return null
  }

  const { event, eventDate } = banner
  const bookingLink = `/events/${event.slug || event.id}`

  const handleDismiss = () => {
    setDismissed(true)
    markDismissal()
  }

  const handleCtaClick = () => {
    trackFormStart('event_banner_cta')
  }

  const imageSrc = event.heroImageUrl || event.thumbnailImageUrl || event.posterImageUrl || event.image?.[0]
  const weekday = getWeekday(eventDate)
  const timeString = eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[45] px-4 pointer-events-none sm:left-6 sm:right-auto sm:px-0">
      <div className="pointer-events-auto relative mx-auto w-full max-w-4xl rounded-2xl bg-anchor-green text-white px-4 py-4 shadow-xl backdrop-blur-lg sm:mx-0 sm:w-80 sm:px-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/30 flex-shrink-0">
            {imageSrc ? (
              <Image src={imageSrc} alt={`${event.name} poster`} fill className="object-cover" sizes="40px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/10 text-lg">🎉</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white">Next Event</p>
            <p className="truncate text-sm sm:text-base font-semibold">{event.name}</p>
            <p className="text-[12px] text-white/80">{weekday} · {timeString}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-white/80 leading-snug">{content.message}</p>
        <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold">{countdown}</span>
          <span>{weekday} · {timeString}</span>
        </div>
        <div className="mt-3">
          <Link
            href={bookingLink}
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center rounded-full bg-white text-anchor-charcoal px-4 py-2 text-sm font-semibold transition hover:bg-anchor-gold hover:text-white"
          >
            Reserve seats
          </Link>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:text-white"
          aria-label="Dismiss event reminder"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 8.586 3.707 2.293 2.293 3.707 8.586 10l-6.293 6.293 1.414 1.414L10 11.414l6.293 6.293 1.414-1.414L11.414 10l6.293-6.293-1.414-1.414L10 8.586Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
