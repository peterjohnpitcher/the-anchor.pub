import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({ 
  alt, 
  priority = false, 
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props 
}: OptimizedImageProps) {
  // Ensure alt text is SEO-friendly
  const seoAlt = alt || 'The Anchor pub Stanwell Moor'
  
  return (
    <Image
      alt={seoAlt}
      priority={priority}
      loading={priority ? 'eager' : loading}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      sizes={sizes}
      {...props}
    />
  )
}

// Export a wrapper for background images with optimization
export function BackgroundImage({ 
  src, 
  alt, 
  className = '',
  children 
}: {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        quality={85}
        priority
      />
      {children}
    </div>
  )
}