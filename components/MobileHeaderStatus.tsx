'use client'

import { StatusBar } from './StatusBar'
import { HeaderReviewBadge } from './reviews'

interface MobileHeaderStatusProps {
  showStatus?: boolean
  showReviews?: boolean
}

export function MobileHeaderStatus({ 
  showStatus = true, 
  showReviews = true 
}: MobileHeaderStatusProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {showStatus && (
        <StatusBar 
          variant="navigation" 
          className="text-xs"
        />
      )}
      {showReviews && (
        <HeaderReviewBadge 
          variant="light" 
          className="text-xs hidden sm:inline-flex"
        />
      )}
    </div>
  )
}