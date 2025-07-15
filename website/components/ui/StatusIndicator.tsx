import { cn } from '@/lib/utils'

interface StatusIndicatorProps {
  status: 'open' | 'closed' | 'busy' | 'quiet'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showPulse?: boolean
}

const statusColors = {
  open: 'bg-green-400',
  closed: 'bg-red-400',
  busy: 'bg-yellow-400',
  quiet: 'bg-blue-400'
}

const sizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3'
}

export function StatusIndicator({ 
  status, 
  size = 'md', 
  className,
  showPulse = false 
}: StatusIndicatorProps) {
  return (
    <span className="relative inline-flex">
      <span 
        className={cn(
          'inline-block rounded-full',
          statusColors[status],
          sizes[size],
          className
        )} 
      />
      {showPulse && status === 'open' && (
        <span 
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
            statusColors[status]
          )}
        />
      )}
    </span>
  )
}