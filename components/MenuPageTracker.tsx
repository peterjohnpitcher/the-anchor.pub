'use client'

import { useEffect } from 'react'
import { trackMenuView } from '@/lib/gtm-events'
import { analytics } from '@/lib/analytics'

interface MenuPageTrackerProps {
  menuType: 'food' | 'drinks' | 'sunday'
}

export function MenuPageTracker({ menuType }: MenuPageTrackerProps) {
  useEffect(() => {
    // Track menu view for analytics
    trackMenuView(menuType)
    
    // Also track in analytics
    analytics.viewItem('menu_item', `${menuType} menu`)
  }, [menuType])
  
  return null
}