import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/primitives/Button'
import { Container } from '@/components/ui/layout/Container'
import { Section } from '@/components/ui/layout/Section'
import { BookingDetails } from './BookingDetails'

export const metadata: Metadata = {
  title: 'Booking Confirmed | The Anchor Stanwell Moor',
  description: 'Your table booking at The Anchor has been confirmed.',
  robots: 'noindex, nofollow'
}

export default function BookingConfirmationPage({
  searchParams
}: {
  searchParams: { ref?: string; error?: string }
}) {
  const bookingRef = searchParams.ref
  const error = searchParams.error
  
  if (error) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="error" className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-anchor-charcoal mb-2">
                Booking Failed
              </h1>
              <p className="text-gray-600 mb-6">
                We couldn't complete your booking. Please try again or call us for assistance.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                {error === 'missing_fields' && 'Please fill in all required fields'}
                {error === 'submission_failed' && 'There was an error processing your booking'}
                {!['missing_fields', 'submission_failed'].includes(error) && 'An unexpected error occurred'}
              </p>
            </div>
            
            <div className="space-y-3">
              <Link href="/book-table">
                <Button variant="primary" size="lg" className="w-full">
                  <Icon name="arrowLeft" className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              
              <div className="text-sm text-gray-600">
                <p>Or call us directly:</p>
                <a
                  href="tel:+441753682707"
                  className="text-anchor-green font-semibold hover:underline"
                >
                  01753 682707
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    )
  }
  
  return (
    <Section className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Icon name="check" className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-anchor-charcoal mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600">
              We've received your booking and can't wait to see you
            </p>
          </div>
          
          {/* Booking Reference */}
          {bookingRef && (
            <div className="bg-anchor-cream rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your booking reference:</p>
              <p className="text-2xl font-bold text-anchor-green font-mono">
                {bookingRef}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Please save this reference for your records
              </p>
            </div>
          )}
          
          {/* Booking Details */}
          <BookingDetails bookingRef={bookingRef || ''} />
          
          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Icon name="info" className="w-5 h-5 mr-2" />
              What happens next?
            </h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <Icon name="check" className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>You'll receive a confirmation SMS shortly</span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>If you provided an email, check your inbox</span>
              </li>
              <li className="flex items-start">
                <Icon name="check" className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Tables are held for 15 minutes after booking time</span>
              </li>
            </ul>
          </div>
          
          {/* Important Information */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Good to know:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 20 free parking spaces available</li>
              <li>• Dogs welcome throughout</li>
              <li>• Full menu available (unless Sunday roast booked)</li>
              <li>• Need to cancel? Call us at least 2 hours before</li>
            </ul>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <Link href="/">
              <Button variant="primary" size="lg" className="w-full">
                Back to Homepage
              </Button>
            </Link>
            
            <Link href="/food-menu">
              <Button variant="outline" size="lg" className="w-full">
                View Our Menu
              </Button>
            </Link>
          </div>
          
          {/* Contact */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need to make changes? Call us:
            </p>
            <a
              href="tel:+441753682707"
              className="text-anchor-green font-semibold hover:underline"
            >
              01753 682707
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}