import { cn } from '@/lib/utils'

interface JourneyTimeProps {
  minutes: number
  from?: string
  to?: string
  mode?: 'car' | 'walk' | 'transit' | 'taxi'
  className?: string
  showIcon?: boolean
}

const modeIcons = {
  car: '🚗',
  walk: '🚶',
  transit: '🚂',
  taxi: '🚕'
}

const modeLabels = {
  car: 'drive',
  walk: 'walk',
  transit: 'transit',
  taxi: 'taxi'
}

/**
 * JourneyTime component for displaying travel times
 * Formats minutes into human-readable text with optional transport mode
 */
export function JourneyTime({
  minutes,
  from,
  to,
  mode = 'car',
  className,
  showIcon = true
}: JourneyTimeProps) {
  const formatTime = (mins: number): string => {
    if (mins < 60) {
      return `${mins} min${mins !== 1 ? 's' : ''}`
    }
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    
    if (remainingMins === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`
    }
    
    return `${hours}h ${remainingMins}m`
  }

  const timeText = formatTime(minutes)
  const modeText = modeLabels[mode]
  
  let fullText = timeText
  if (from && to) {
    fullText = `${timeText} ${modeText} from ${from} to ${to}`
  } else if (from) {
    fullText = `${timeText} ${modeText} from ${from}`
  } else if (to) {
    fullText = `${timeText} ${modeText} to ${to}`
  } else {
    fullText = `${timeText} ${modeText}`
  }

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {showIcon && (
        <span aria-hidden="true">{modeIcons[mode]}</span>
      )}
      <span>{timeText}</span>
      <span className="sr-only">{fullText}</span>
    </span>
  )
}