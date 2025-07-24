import { cn } from '@/lib/utils'

interface PageTitleProps {
  children: React.ReactNode
  className?: string
  seo?: {
    structured?: boolean
    speakable?: boolean
  }
}

export function PageTitle({ children, className = '', seo = {} }: PageTitleProps) {
  return (
    <h1 
      className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
        seo.speakable && 'speakable-content',
        className
      )}
      {...(seo.structured && { itemProp: 'name headline' })}
    >
      {children}
    </h1>
  )
}