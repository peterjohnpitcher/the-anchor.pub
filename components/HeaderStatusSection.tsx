'use client'

import { StatusBar } from './StatusBar'
import { HeaderReviewBadge } from './reviews'

export function HeaderStatusSection() {
  return (
    <div className="flex items-center gap-4">
      <StatusBar variant="navigation" />
      <HeaderReviewBadge variant="light" />
    </div>
  )
}