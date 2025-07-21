import { GoogleReviews } from './GoogleReviews'

interface ReviewSectionProps {
  title?: string
  subtitle?: string
  layout?: 'grid' | 'carousel' | 'badge' | 'list'
  filter?: {
    minRating?: number
    keywords?: string[]
    limit?: number
  }
  background?: "white" | "gray" | "cream"
  className?: string
}

export function ReviewSection({
  title = "Customer Reviews",
  subtitle,
  layout = "carousel",
  filter,
  background = "gray",
  className = ""
}: ReviewSectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    cream: "bg-anchor-cream"
  }

  return (
    <section className={`section-spacing ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <GoogleReviews 
            layout={layout}
            filter={filter}
            showTitle={false}
          />
        </div>
      </div>
    </section>
  )
}