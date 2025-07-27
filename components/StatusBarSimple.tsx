'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function StatusBarSimple({ variant = 'default' }: { variant?: 'default' | 'navigation' }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/business/hours')
      .then(res => res.json())
      .then(result => {
        console.log('StatusBarSimple received:', result)
        setData(result)
        setLoading(false)
      })
      .catch(err => {
        console.error('StatusBarSimple error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className={cn(
        variant === 'navigation' ? 'text-sm text-white' : 'inline-flex items-center gap-2 bg-anchor-green text-white px-4 py-2 rounded-full'
      )}>
        Loading...
      </div>
    )
  }

  if (!data?.success || !data?.data) {
    return null
  }

  const { currentStatus } = data.data
  const isOpen = currentStatus.isOpen
  const kitchenOpen = currentStatus.kitchenOpen

  if (variant === 'navigation') {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className={cn('inline-block w-2 h-2 rounded-full', isOpen ? 'bg-green-400' : 'bg-red-400')} />
        <span className="text-white">
          Bar • {isOpen ? 'Open' : 'Closed'}
          {currentStatus.closesIn && ` • Closes in ${currentStatus.closesIn}`}
          {currentStatus.opensIn && ` • Opens in ${currentStatus.opensIn}`}
        </span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 bg-anchor-green text-white px-4 py-2 rounded-full border-2 border-anchor-gold">
      <span className={cn('inline-block w-2 h-2 rounded-full', isOpen ? 'bg-green-400' : 'bg-red-400')} />
      <span>
        {isOpen ? 'Open Now' : 'Closed'}
        {kitchenOpen !== undefined && ` • Kitchen ${kitchenOpen ? 'Open' : 'Closed'}`}
      </span>
    </div>
  )
}