import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

const DEFAULT_BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

export function OptimizedImage({ 
  alt, 
  priority = false, 
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 75,
  ...props 
}: OptimizedImageProps & { quality?: number }) {
  const seoAlt = alt || 'The Anchor Stanwell Moor'
  
  return (
    <Image
      alt={seoAlt}
      priority={priority}
      loading={priority ? 'eager' : loading}
      quality={quality}
      placeholder={props.blurDataURL ? "blur" : "empty"}
      blurDataURL={props.blurDataURL || DEFAULT_BLUR_DATA_URL}
      sizes={sizes}
      {...props}
    />
  )
}

export function BackgroundImage({ 
  src, 
  alt, 
  className = '',
  children,
  priority = false,
  quality = 75 
}: {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
  priority?: boolean
  quality?: number
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        quality={quality}
        priority={priority}
        sizes="100vw"
      />
      {children}
    </div>
  )
}