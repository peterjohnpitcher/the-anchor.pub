import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface IconTextProps {
  icon: ReactNode
  text: string | ReactNode
  className?: string
  iconClassName?: string
  textClassName?: string
  spacing?: 'xs' | 'sm' | 'md' | 'lg'
}

const spacingClasses = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4'
}

/**
 * IconText component for displaying an icon with accompanying text
 * Ensures proper accessibility and consistent spacing
 */
export function IconText({
  icon,
  text,
  className,
  iconClassName,
  textClassName,
  spacing = 'sm'
}: IconTextProps) {
  return (
    <span className={cn('inline-flex items-center', spacingClasses[spacing], className)}>
      <span className={cn('flex-shrink-0', iconClassName)} aria-hidden="true">
        {icon}
      </span>
      <span className={textClassName}>{text}</span>
    </span>
  )
}