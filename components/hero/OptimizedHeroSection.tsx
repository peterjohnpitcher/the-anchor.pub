import { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type HeroSize = 'small' | 'medium' | 'large' | 'hero'

interface OptimizedHeroSectionProps {
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
    blurDataURL?: string
    // New: Optimised image paths
    optimized?: {
      mobile: string
      tablet: string
      desktop: string
    }
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

export function OptimizedHeroSection({
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
}: OptimizedHeroSectionProps) {
  // Use optimized images if available
  const hasOptimized = image.optimized?.mobile && image.optimized?.tablet && image.optimized?.desktop;
  
  return (
    <section 
      className={cn(
        'relative overflow-hidden',
        heightClasses[size],
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {hasOptimized ? (
          <picture>
            {/* AVIF format (best compression) */}
            <source
              media="(max-width: 640px)"
              srcSet={`${image.optimized!.mobile}.avif`}
              type="image/avif"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={`${image.optimized!.tablet}.avif`}
              type="image/avif"
            />
            <source
              srcSet={`${image.optimized!.desktop}.avif`}
              type="image/avif"
            />
            
            {/* WebP format (good compression, wider support) */}
            <source
              media="(max-width: 640px)"
              srcSet={`${image.optimized!.mobile}.webp`}
              type="image/webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={`${image.optimized!.tablet}.webp`}
              type="image/webp"
            />
            <source
              srcSet={`${image.optimized!.desktop}.webp`}
              type="image/webp"
            />
            
            {/* JPEG fallback */}
            <Image
              src={`${image.optimized!.desktop}.jpg`}
              alt={image.alt}
              fill
              className="object-cover"
              priority={image.priority !== false}
              sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
              quality={82}
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              style={{
                objectPosition: image.objectPosition || '50% 50%'
              }}
            />
          </picture>
        ) : (
          // Fallback to regular image
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={image.priority !== false}
            sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
            quality={82}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="}
            style={{
              objectPosition: image.objectPosition || '50% 50%'
            }}
          />
        )}
      </div>
      
      {/* Overlay */}
      <div className={cn('absolute inset-0', overlayClasses[overlay])} />
      
      {/* Content */}
      <div className={cn(
        'relative z-10 container mx-auto px-4',
        paddingClasses[size],
        'flex flex-col justify-center',
        alignmentClasses[alignment],
        'min-h-[inherit]'
      )}>
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div className="mb-4 animate-fade-up">
            {breadcrumbs}
          </div>
        )}
        
        {/* Main Content */}
        <div className={cn('max-w-4xl', contentClassName)}>
          {/* Title */}
          {title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
          )}
          
          {/* Description */}
          {description && (
            <div className="text-lg sm:text-xl text-white/90 mb-6 animate-fade-up animation-delay-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {description}
            </div>
          )}
          
          {/* Tags */}
          {tags && (
            <div className="mb-6 animate-fade-up animation-delay-200">
              {tags}
            </div>
          )}
          
          {/* Children */}
          {children && (
            <div className="animate-fade-up animation-delay-300">
              {children}
            </div>
          )}
          
          {/* CTA */}
          {cta && (
            <div className="mt-8 animate-fade-up animation-delay-400">
              {cta}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}