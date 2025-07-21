'use client'

import { StatusBar } from './StatusBar'
import { HeaderReviewBadge } from './reviews'

export function HeaderStatusSection() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <StatusBar variant="navigation" className="text-xs sm:text-sm" />
      <HeaderReviewBadge variant="light" className="hidden sm:inline-flex" />
    </div>
  )
}