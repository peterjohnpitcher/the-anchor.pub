import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const StatusBar = dynamic(() => import('./business-hours-components').then(mod => mod.ProcessedStatusBar), {
  loading: () => <StatusBarSkeleton />,
  ssr: true
})

function StatusBarSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'navigation' }) {
  if (variant === 'navigation') {
    return (
      <div className="animate-pulse h-5 w-32" role="status" aria-label="Loading content">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  
  return (
    <div className="inline-block bg-anchor-green rounded-full border-2 border-anchor-gold px-6 py-3 shadow-md h-[44px] max-w-[280px] w-full" aria-hidden="true">
      <div className="h-full w-full bg-anchor-green/50 rounded animate-pulse" />
    </div>
  )
}

export function StatusBarWrapper({ variant = 'default' }: { variant?: 'default' | 'compact' | 'navigation' }) {
  return (
    <Suspense fallback={<StatusBarSkeleton variant={variant} />}>
      <div className={variant === 'navigation' ? '' : 'inline-block min-h-[44px]'}>
        <StatusBar variant={variant} refreshInterval={60000} />
      </div>
    </Suspense>
  )
}