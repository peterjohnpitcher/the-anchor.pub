import { cn } from '@/lib/utils'

interface SpeakableContentProps {
  children: React.ReactNode
  selector?: string
  priority?: 'high' | 'medium' | 'low'
  className?: string
}

export function SpeakableContent({ 
  children, 
  selector,
  priority = 'high',
  className 
}: SpeakableContentProps) {
  return (
    <div 
      className={cn(
        'speakable-content',
        `speakable-${priority}`,
        selector && selector,
        className
      )}
      data-speakable-selector={selector}
    >
      {children}
    </div>
  )
}