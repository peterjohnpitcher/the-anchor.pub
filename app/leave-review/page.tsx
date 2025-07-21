import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Leave a Review - The Anchor Stanwell Moor',
  description: 'Share your experience at The Anchor pub. Leave us a review on Google to help others discover our traditional British pub near Heathrow.',
  robots: 'noindex, follow'
}

export default function LeaveReviewPage() {
  // Redirect to Google Reviews page
  redirect('https://g.page/theanchorpubsm/review?share')
  
  // This won't render due to redirect, but included for completeness
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Google Reviews...</h1>
        <p className="text-gray-600">
          You're being redirected to leave a review for The Anchor on Google.
        </p>
      </div>
    </div>
  )
}