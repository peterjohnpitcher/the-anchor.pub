import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { anchorAPI, ParkingBookingDetails } from '@/lib/api'
import { Section, Container, Button } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'

interface PageProps {
  params: { id: string }
  searchParams: { payment?: string }
}

const formatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeStyle: 'short'
})

function getStatusBadge(booking: ParkingBookingDetails) {
  const status = booking.status
  if (status === 'confirmed' || status === 'completed') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
        <Icon name="check" className="h-4 w-4" />
        Payment confirmed
      </span>
    )
  }

  if (status === 'pending_payment') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
        <Icon name="clock" className="h-4 w-4" />
        Payment pending
      </span>
    )
  }

  if (status === 'cancelled') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
        <Icon name="close" className="h-4 w-4" />
        Booking cancelled
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-800">
      {status.replace(/_/g, ' ')}
    </span>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Parking booking ${params.id} | The Anchor Heathrow Parking`,
    robots: 'noindex, nofollow'
  }
}

export default async function ParkingBookingStatusPage({ params, searchParams }: PageProps) {
  let booking: ParkingBookingDetails | null = null

  try {
    booking = await anchorAPI.getParkingBooking(params.id)
  } catch (error: any) {
    if (error?.status === 404) {
      notFound()
    }
    throw error
  }

  if (!booking) {
    notFound()
  }

  const paymentMessage = searchParams.payment === 'success'
    ? 'Payment captured successfully. Keep this page handy for your reference.'
    : searchParams.payment === 'failed'
      ? 'PayPal could not confirm your payment. Please try again or call 01753 682707.'
      : null

  return (
    <Section className="min-h-screen bg-gray-50 py-16">
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-anchor-green">Parking booking reference</p>
              <h1 className="mt-1 text-3xl font-bold text-anchor-charcoal">{booking.reference}</h1>
              <div className="mt-3">{getStatusBadge(booking)}</div>
            </div>

            {paymentMessage && (
              <div className={`rounded-xl border p-4 text-sm ${searchParams.payment === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
                {paymentMessage}
              </div>
            )}

            <div className="grid gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-anchor-charcoal">Stay details</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li><strong>Arrival:</strong> {formatter.format(new Date(booking.start_at))}</li>
                  <li><strong>Departure:</strong> {formatter.format(new Date(booking.end_at))}</li>
                  <li><strong>Parking duration:</strong> {Math.round((new Date(booking.end_at).getTime() - new Date(booking.start_at).getTime()) / (1000 * 60 * 60))} hours</li>
                  <li><strong>Vehicle:</strong> {booking.vehicle_registration} {booking.vehicle_make && `· ${booking.vehicle_make}`} {booking.vehicle_model && `· ${booking.vehicle_model}`}</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-anchor-charcoal">Contact</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li><strong>Name:</strong> {booking.customer_first_name} {booking.customer_last_name}</li>
                  <li><strong>Mobile:</strong> {booking.customer_mobile}</li>
                  {booking.customer_email && <li><strong>Email:</strong> {booking.customer_email}</li>}
                  <li><strong>Amount due:</strong> £{booking.calculated_price.toFixed(2)} {booking.payment_status === 'paid' ? '(paid)' : '(pending)'}</li>
                  <li><strong>Payment deadline:</strong> {formatter.format(new Date(booking.payment_due_at))}</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-anchor-cream px-6 py-4 text-sm text-gray-700">
              <p>
                Need to adjust flight dates or extend your Heathrow parking stay? Email <a href="mailto:parking@the-anchor.pub" className="font-semibold text-anchor-green">parking@the-anchor.pub</a> or call <a href="tel:+441753682707" className="font-semibold text-anchor-green">01753 682707</a> with your reference {booking.reference}.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/heathrow-parking">
                <Button variant="secondary">Back to Heathrow parking page</Button>
              </Link>
              {booking.status !== 'confirmed' && booking.status !== 'completed' && (
                <Link href={`/parking/bookings/${booking.id}`} prefetch={false}>
                  <Button variant="primary">Refresh status</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
