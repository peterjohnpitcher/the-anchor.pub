'use client'

import { StatusBar } from './StatusBar'

export function HeaderStatusSectionDirect() {
  return (
    <div className="flex w-full max-w-full justify-center sm:justify-end">
      <StatusBar
        variant="navigation"
        className="w-auto"
        showKitchen
      />
    </div>
  )
}
