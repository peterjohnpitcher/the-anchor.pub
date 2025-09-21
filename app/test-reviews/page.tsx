import { GoogleReviews, ReviewSection } from '@/components/reviews'
import { Section, SectionHeader } from '@/components/ui'

export default function TestReviewsPage() {
  return (
    <Section spacing="lg" container containerSize="lg" className="space-y-16">
      <SectionHeader
        title="Google Reviews Integration Test"
        subtitle="Testing different layouts and configurations"
      />

      {/* Test 1: Badge Layout */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Badge Layout</h2>
        <GoogleReviews 
          layout="badge"
          showTitle={false}
        />
      </div>

      {/* Test 2: Carousel Layout */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Carousel Layout</h2>
        <GoogleReviews 
          layout="carousel"
          showTitle={true}
        />
      </div>

      {/* Test 3: Grid Layout */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Grid Layout (3 reviews)</h2>
        <GoogleReviews 
          layout="grid"
          filter={{ limit: 3 }}
          showTitle={false}
        />
      </div>

      {/* Test 4: List Layout with Filters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">List Layout (4-5 star reviews only)</h2>
        <GoogleReviews 
          layout="list"
          filter={{ minRating: 4, limit: 5 }}
          showTitle={false}
        />
      </div>

      {/* Test 5: Review Section Component */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Review Section Component</h2>
        <ReviewSection
          title="Customer Reviews"
          subtitle="What people are saying about The Anchor"
          background="gray"
          layout="carousel"
        />
      </div>

      {/* Test 6: Filtered Reviews by Keyword */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reviews Mentioning "Food"</h2>
        <GoogleReviews 
          layout="grid"
          filter={{ keywords: ['food'], limit: 6 }}
          title="Food Reviews"
        />
      </div>

      {/* Environment Variable Check */}
      <div className="p-6 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Environment Variable Status:</h3>
        <p>GOOGLE_PLACES_API_KEY: {process.env.GOOGLE_PLACES_API_KEY ? '✅ SET' : '❌ NOT SET'}</p>
        <p>GOOGLE_PLACE_ID: {process.env.GOOGLE_PLACE_ID || '❌ NOT SET - Using mock data'}</p>
        <p className="mt-4 text-sm text-gray-600">
          To see actual Google reviews, you need to:
        </p>
        <ol className="list-decimal list-inside text-sm text-gray-600 mt-2">
          <li>Find your Google Place ID using the instructions in scripts/find-place-id.js</li>
          <li>Add it to your .env.local file as GOOGLE_PLACE_ID</li>
          <li>Restart the development server</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500">
          Note: Google Places API only returns the 5 most recent reviews. For all reviews, 
          you'll need to use the Google My Business API.
        </p>
      </div>
    </Section>
  )
}
