'use client'

import { StatusBarWrapper } from './StatusBarWrapper'
import { HeaderReviewBadge } from './reviews'

export function HeaderStatusSection() {
  return (
    <div className="flex flex-nowrap items-center gap-x-2 sm:gap-x-3 gap-y-1">
      <StatusBarWrapper variant="navigation" />
      <HeaderReviewBadge variant="light" />
    </div>
  )
}