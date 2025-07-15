'use client'

import { StatusBar } from './StatusBar'

export function StatusBarMobile() {
  return (
    <div className="lg:hidden">
      <StatusBar 
        variant="navigation" 
        className="text-xs sm:text-sm"
        theme={{
          text: 'text-white'
        }}
      />
    </div>
  )
}