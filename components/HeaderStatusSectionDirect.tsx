'use client'

import { StatusBarSimple } from './StatusBarSimple'
import { HeaderReviewBadge } from './reviews'

export function HeaderStatusSectionDirect() {
  return (
    <div className="flex flex-nowrap items-center gap-x-2 sm:gap-x-3 gap-y-1">
      <StatusBarSimple variant="navigation" />
      <HeaderReviewBadge variant="light" />
    </div>
  )
}