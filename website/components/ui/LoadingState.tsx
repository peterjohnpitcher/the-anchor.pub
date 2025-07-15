import { cn } from '@/lib/utils'

interface LoadingStateProps {
  variant?: 'spinner' | 'dots' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingState({ 
  variant = 'spinner', 
  size = 'md',
  className,
  text
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
        {text && <span className="ml-2 text-sm text-gray-600">{text}</span>}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-gray-600',
        sizeClasses[size]
      )}></div>
      {text && <span className="ml-2 text-sm text-gray-600">{text}</span>}
    </div>
  )
}