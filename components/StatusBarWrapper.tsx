import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const StatusBar = dynamic(() => import('./StatusBar').then(mod => mod.StatusBar), {
  loading: () => <StatusBarSkeleton />,
  ssr: false
})

function StatusBarSkeleton() {
  return (
    <div className="inline-block bg-anchor-green rounded-full border-2 border-anchor-gold px-6 py-3 shadow-md h-[44px] max-w-[280px] w-full" aria-hidden="true">
      <div className="h-full w-full bg-anchor-green/50 rounded animate-pulse" />
    </div>
  )
}

export function StatusBarWrapper({ variant = 'default' }: { variant?: 'default' | 'compact' | 'navigation' }) {
  return (
    <Suspense fallback={<StatusBarSkeleton />}>
      <div className="inline-block min-h-[44px]">
        <StatusBar variant={variant} refreshInterval={60000} />
      </div>
    </Suspense>
  )
}