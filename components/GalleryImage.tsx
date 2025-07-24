'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface GalleryImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

// Better placeholder for gallery images
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f5e6d3" offset="20%" />
      <stop stop-color="#faf8f3" offset="50%" />
      <stop stop-color="#f5e6d3" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f5e6d3" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export function GalleryImage({ 
  src, 
  alt, 
  caption,
  width = 400,
  height = 400,
  className = '',
  priority = false
}: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={cn(
        "relative aspect-square rounded-lg overflow-hidden group cursor-pointer card-warm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={caption ? `${alt}. ${caption}` : alt}
    >
      <div className={cn(
        "absolute inset-0 bg-anchor-sand/20 transition-opacity duration-300",
        isLoaded ? "opacity-0" : "opacity-100"
      )} />
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={cn(
          "object-cover transition-all duration-300",
          isHovered && "scale-105",
          !isLoaded && "opacity-0"
        )}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        quality={75}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
        onLoad={() => setIsLoaded(true)}
      />
      
      {caption && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        >
          <div className="absolute bottom-0 p-6">
            <p className="text-white font-semibold text-lg">{caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}