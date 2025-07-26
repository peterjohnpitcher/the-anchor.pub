'use client'

import { useEffect } from 'react'
import TableBookingForm from './TableBookingForm'
import { trackTableBookingClick } from '@/lib/gtm-events'

interface TableBookingWithTrackingProps {
  source: string
  className?: string
}

export function TableBookingWithTracking({ source, className }: TableBookingWithTrackingProps) {
  useEffect(() => {
    // Track when booking form is viewed
    if (typeof window !== 'undefined') {
      trackTableBookingClick(`${source}_view`)
    }
  }, [source])

  return (
    <TableBookingForm
      className={className}
      onSuccess={() => {
        // Track successful booking
        if (typeof window !== 'undefined') {
          trackTableBookingClick(`${source}_success`)
        }
      }}
    />
  )
}