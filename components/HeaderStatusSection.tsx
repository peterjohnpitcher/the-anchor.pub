'use client'

import { StatusBar } from './StatusBar'
import { HeaderReviewBadge } from './reviews'

export function HeaderStatusSection() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <StatusBar variant="navigation" />
      <HeaderReviewBadge variant="light" />
    </div>
  )
}