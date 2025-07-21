'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeaderReviewBadgeProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function HeaderReviewBadge({ 
  variant = 'light',
  className = ''
}: HeaderReviewBadgeProps) {
  const [rating, setRating] = useState<number>(0)
  const [totalReviews, setTotalReviews] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviewData()
  }, [])

  const fetchReviewData = async () => {
    try {
      const response = await fetch('/api/reviews?limit=1')
      const data = await response.json()
      
      if (response.ok) {
        setRating(data.rating)
        setTotalReviews(data.totalReviews)
      }
    } catch (error) {
      console.error('Failed to fetch review data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || rating === 0) {
    return null
  }

  const textColor = variant === 'dark' ? 'text-anchor-charcoal' : 'text-white'
  const starColor = 'text-yellow-400'

  return (
    <Link 
      href="#reviews"
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors ${className}`}
      aria-label={`Rated ${rating} out of 5 stars from ${totalReviews} Google reviews`}
    >
      <div className="flex items-center gap-1">
        <span className={`font-semibold ${textColor}`}>{rating}</span>
        <svg 
          className={`w-4 h-4 ${starColor} fill-current`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <span className={`text-xs sm:text-sm ${textColor} opacity-90`}>
        <span className="hidden sm:inline">Google Reviews </span>({totalReviews})
      </span>
      
      {/* Schema.org markup for header rating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            "@id": "https://the-anchor.pub/#aggregateRating",
            "ratingValue": rating.toString(),
            "reviewCount": totalReviews.toString(),
            "bestRating": "5",
            "worstRating": "1",
            "itemReviewed": {
              "@type": "Restaurant",
              "@id": "https://the-anchor.pub/#business"
            }
          })
        }}
      />
    </Link>
  )
}