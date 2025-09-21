'use client'

import { StatusBar } from './StatusBar'

interface MobileHeaderStatusProps {
  showStatus?: boolean
}

export function MobileHeaderStatus({ 
  showStatus = true
}: MobileHeaderStatusProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {showStatus && (
        <StatusBar 
          variant="navigation" 
          className="text-xs"
        />
      )}
    </div>
  )
}
