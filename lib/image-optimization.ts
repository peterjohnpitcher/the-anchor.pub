// Image optimization utilities for better performance

export const imageOptimization = {
  // Quality settings for different image types
  quality: {
    hero: 85,      // Large hero images
    thumbnail: 80, // Small thumbnails
    logo: 90,      // Brand logos
    default: 82    // General images
  },

  // Responsive image sizes
  sizes: {
    hero: {
      mobile: 640,
      tablet: 1024,
      desktop: 1920,
      sizes: "(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
    },
    card: {
      mobile: 256,
      tablet: 384,
      desktop: 512,
      sizes: "(max-width: 640px) 256px, (max-width: 1024px) 384px, 512px"
    },
    thumbnail: {
      mobile: 128,
      tablet: 192,
      desktop: 256,
      sizes: "(max-width: 640px) 128px, (max-width: 1024px) 192px, 256px"
    },
    logo: {
      mobile: 192,
      tablet: 256,
      desktop: 320,
      sizes: "(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
    }
  },

  // Blur data URL generator for better LCP
  getBlurDataURL: (width: number = 10, height: number = 10) => {
    const blurSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f5f5f5"/>
      </svg>
    `
    return `data:image/svg+xml;base64,${Buffer.from(blurSvg).toString('base64')}`
  }
}

// Helper to get optimized image props
export function getOptimizedImageProps(type: keyof typeof imageOptimization.sizes = 'card') {
  const sizeConfig = imageOptimization.sizes[type] || imageOptimization.sizes.card
  const quality = imageOptimization.quality[type as keyof typeof imageOptimization.quality] || imageOptimization.quality.default

  return {
    quality,
    sizes: sizeConfig.sizes,
    placeholder: 'blur' as const,
    blurDataURL: imageOptimization.getBlurDataURL()
  }
}