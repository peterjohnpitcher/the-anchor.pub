import type { Metadata } from 'next'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Container } from '@/components/ui/layout/Container'
import { Section } from '@/components/ui/layout/Section'
import { Card, CardBody } from '@/components/ui/layout/Card'
import TableBookingForm from '@/components/features/TableBooking/TableBookingForm'
import SundayLunchBookingForm from '@/components/features/TableBooking/SundayLunchBookingForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/Tabs'
import { Icon } from '@/components/ui/Icon'
import { PhoneLink } from '@/components/PhoneLink'
import { Alert } from '@/components/ui/feedback/Alert'
import { Button } from '@/components/ui/primitives/Button'
import { Badge } from '@/components/ui/primitives/Badge'

export const metadata: Metadata = {
  title: 'Book a Table | The Anchor Stanwell Moor',
  description: 'Book your table at The Anchor, Stanwell Moor. Reserve your spot for our delicious food, Sunday roasts, or special events. Easy online booking with instant confirmation.',
  keywords: 'book table stanwell moor, restaurant booking, pub reservation, sunday lunch booking, the anchor booking',
  openGraph: {
    title: 'Book a Table at The Anchor',
    description: 'Reserve your table for great food and drinks at The Anchor, Stanwell Moor. Online booking available.',
    images: ['/images/anchor-dining-room.jpg']
  }
}

export default function BookTablePage({
  searchParams
}: {
  searchParams: { tab?: string }
}) {
  const defaultTab = searchParams.tab === 'sunday' ? 'sunday' : 'regular'
  
  return (
    <>
      <HeroWrapper
        route="/book-table"
        title="Book a Table"
        description="Reserve your spot for great food and drinks"
        size="small"
      />

      <Section className="section-spacing">
        <Container>
          {/* Quick info cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card variant="outlined">
              <CardBody className="text-center">
                <Icon name="clock" className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Opening Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Mon-Thu: 4pm-10pm<br />
                  Friday: 4pm-12am<br />
                  Saturday: 12pm-12am<br />
                  Sunday: 12pm-10pm
                </p>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardBody className="text-center">
                <Icon name="utensils" className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Kitchen Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday: CLOSED<br />
                  Tue-Fri: 6pm-9pm<br />
                  Saturday: 1pm-7pm<br />
                  Sunday: 12pm-5pm
                </p>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardBody className="text-center">
                <Icon name="phone" className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Call us directly to book
                </p>
                <PhoneLink
                  phone="01753682707"
                  source="booking_page_help"
                  showIcon
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  01753 682707
                </PhoneLink>
              </CardBody>
            </Card>
          </div>

          {/* Booking tabs */}
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="regular">
                  <Icon name="calendar" className="mr-2 h-4 w-4" />
                  Regular Booking
                </TabsTrigger>
                <TabsTrigger value="sunday">
                  <Icon name="utensils" className="mr-2 h-4 w-4" />
                  Sunday Roast
                </TabsTrigger>
              </TabsList>

              <TabsContent value="regular" className="space-y-6">
                <Alert variant="info">
                  <Icon name="info" className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Walk-ins always welcome!</p>
                    <p className="text-sm mt-1">
                      Can't find the time you want? Just pop in - we always try to accommodate walk-ins.
                    </p>
                  </div>
                </Alert>

                <TableBookingForm />

                <div className="text-center text-sm text-muted-foreground">
                  <p>For groups larger than 20, please call us on{' '}
                    <PhoneLink
                      phone="01753682707"
                      source="booking_page_large_group"
                      className="text-primary hover:text-primary-dark underline"
                      showIcon={false}
                    >
                      01753 682707
                    </PhoneLink>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="sunday" className="space-y-6">
                <div className="text-center mb-8">
                  <Badge variant="warning" size="lg" className="mb-4">
                    Pre-Order & Deposit Required
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">Traditional Sunday Roast</h3>
                  <p className="text-muted-foreground mb-4">
                    Enjoy our famous Sunday roasts - freshly prepared and served with all the trimmings
                  </p>
                  <p className="text-sm text-muted-foreground">
                    All Sunday roasts must be pre-ordered and a deposit paid by 1pm Saturday
                  </p>
                </div>

                <SundayLunchBookingForm />

                <Alert variant="info" className="mt-6">
                  <Icon name="info" className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Can't pre-order?</p>
                    <p className="text-sm mt-1">
                      Our regular menu is also available on Sundays without pre-order.
                    </p>
                  </div>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>

          {/* Additional information */}
          <div className="mt-16 border-t pt-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Booking Information</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Icon name="info" className="mr-2 h-5 w-5 text-primary" />
                    Good to Know
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tables are held for 15 minutes</li>
                    <li>• Kitchen hours vary by day</li>
                    <li>• No food service on Mondays</li>
                    <li>• 20 free parking spaces</li>
                    <li>• Dogs welcome throughout</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Icon name="users" className="mr-2 h-5 w-5 text-primary" />
                    Groups & Events
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Private hire: minimum 30 people</li>
                    <li>• Corporate functions: minimum 15 people</li>
                    <li>• £250 deposit required</li>
                    <li>• Buffets, sit-down meals & canapés</li>
                    <li>• Contact us for pricing</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Planning a special event or need a private space?
                </p>
                <Button variant="outline" size="lg" asChild>
                  <a href="/private-party-venue">
                    <Icon name="sparkles" className="mr-2" />
                    Explore Private Hire Options
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}