import { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type HeroSize = 'small' | 'medium' | 'large' | 'hero'

interface HeroSectionProps {
  // Content
  title: string | ReactNode
  description?: string | ReactNode
  children?: ReactNode
  
  // Image
  image: {
    src: string
    alt: string
    priority?: boolean
    objectPosition?: string
  }
  
  // Layout
  size?: HeroSize
  alignment?: 'left' | 'center' | 'right'
  overlay?: 'light' | 'medium' | 'dark' | 'gradient'
  
  // Features
  breadcrumbs?: ReactNode
  tags?: ReactNode
  cta?: ReactNode
  
  // Styling
  className?: string
  contentClassName?: string
}

// Standardized height system with consistent mobile/desktop scaling
const heightClasses: Record<HeroSize, string> = {
  small: 'min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh]',
  medium: 'min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh]',
  large: 'min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]',
  hero: 'min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh]'
}

// Standardized padding system
const paddingClasses: Record<HeroSize, string> = {
  small: 'py-12 sm:py-16 md:py-20',
  medium: 'py-16 sm:py-20 md:py-24',
  large: 'py-20 sm:py-24 md:py-32',
  hero: 'py-24 sm:py-32 md:py-40'
}

// Consistent overlay options
const overlayClasses: Record<string, string> = {
  light: 'bg-black/30',
  medium: 'bg-black/50',
  dark: 'bg-black/70',
  gradient: 'bg-gradient-to-b from-black/70 via-black/50 to-black/70'
}

// Text alignment classes
const alignmentClasses: Record<string, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end'
}

export function HeroSection({
  title,
  description,
  children,
  image,
  size = 'medium',
  alignment = 'center',
  overlay = 'gradient',
  breadcrumbs,
  tags,
  cta,
  className,
  contentClassName
}: HeroSectionProps) {
  return (
    <section 
      className={cn(
        'relative overflow-hidden',
        heightClasses[size],
        'mt-20', // Consistent top margin for fixed nav
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority={image.priority !== false}
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectPosition: image.objectPosition || '50% 50%'
          }}
        />
        <div className={cn('absolute inset-0', overlayClasses[overlay])} />
      </div>

      {/* Content Container */}
      <div 
        className={cn(
          'relative z-10 h-full flex flex-col',
          paddingClasses[size]
        )}
      >
        <div className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col',
          alignmentClasses[alignment],
          contentClassName
        )}>
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <div className="mb-4 sm:mb-6">
              {breadcrumbs}
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Tags */}
            {tags && (
              <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 justify-center">
                {tags}
              </div>
            )}

            {/* Title */}
            <h1 className={cn(
              'font-bold text-white mb-4 sm:mb-6',
              size === 'small' && 'text-3xl sm:text-4xl md:text-5xl',
              size === 'medium' && 'text-4xl sm:text-5xl md:text-6xl',
              size === 'large' && 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
              size === 'hero' && 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
            )}>
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className={cn(
                'text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8',
                size === 'small' && 'text-lg sm:text-xl',
                size === 'medium' && 'text-xl sm:text-2xl',
                size === 'large' && 'text-xl sm:text-2xl md:text-3xl',
                size === 'hero' && 'text-2xl sm:text-3xl md:text-4xl'
              )}>
                {description}
              </p>
            )}

            {/* CTA */}
            {cta && (
              <div className="mt-4 sm:mt-6">
                {cta}
              </div>
            )}

            {/* Additional content */}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}