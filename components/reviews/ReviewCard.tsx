import { GoogleReview } from '@/lib/google/types'
import { formatReviewDate, getReviewExcerpt } from '@/lib/google/review-utils'

interface ReviewCardProps {
  review: GoogleReview
  variant?: 'vertical' | 'horizontal'
  showFullText?: boolean
  index?: number
}

export function ReviewCard({ 
  review, 
  variant = 'vertical',
  showFullText = false,
  index = 0
}: ReviewCardProps) {
  // Generate Review schema markup
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author_name,
      "url": review.author_url
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.text,
    "datePublished": new Date(review.time * 1000).toISOString(),
    "itemReviewed": {
      "@type": "Restaurant",
      "@id": "https://the-anchor.pub/#business",
      "name": "The Anchor"
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md flex gap-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <div className="flex-shrink-0">
          {review.profile_photo_url ? (
            <img 
              src={review.profile_photo_url} 
              alt={review.author_name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-anchor-green text-white flex items-center justify-center font-bold">
              {review.author_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-anchor-green">{review.author_name}</h3>
            <span className="text-sm text-gray-500">
              {formatReviewDate(review.time)}
            </span>
          </div>
          {renderStars(review.rating)}
          <p className="text-gray-700 mt-2">
            {showFullText ? review.text : getReviewExcerpt(review.text)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md h-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="flex items-center gap-3 mb-3">
        {review.profile_photo_url ? (
          <img 
            src={review.profile_photo_url} 
            alt={review.author_name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-anchor-green text-white flex items-center justify-center font-bold">
            {review.author_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-anchor-green">{review.author_name}</h3>
          <span className="text-sm text-gray-500">
            {formatReviewDate(review.time)}
          </span>
        </div>
      </div>
      
      {renderStars(review.rating)}
      
      <p className="text-gray-700 mt-3 flex-1">
        {showFullText ? review.text : getReviewExcerpt(review.text)}
      </p>
      
      {review.author_url && (
        <a 
          href={review.author_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-anchor-gold hover:text-anchor-green mt-3 inline-block"
        >
          View on Google
        </a>
      )}
    </div>
  )
}