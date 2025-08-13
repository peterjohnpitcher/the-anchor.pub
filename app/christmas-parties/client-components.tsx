'use client'

import { Button, Badge, Icon } from '@/components/ui'
import { Card } from '@/components/ui/layout/Card'
import { BookTableButton } from '@/components/BookTableButton'
import { trackPhoneCall, trackFormStart } from '@/lib/gtm-events'

export function ContactActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <BookTableButton
        source="christmas_parties_cta"
        size="lg"
        variant="secondary"
        context="christmas_party"
        className="bg-white text-red-600 hover:bg-red-50"
      >
        🎄 Book Your Christmas Party
      </BookTableButton>
      <Button 
        size="lg" 
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={() => {
          trackFormStart('christmas_email_enquiry')
          window.location.href = 'mailto:manager@the-anchor.pub?subject=Christmas Party Enquiry'
        }}
      >
        <Icon name="mail" className="mr-2" />
        Email Your Enquiry
      </Button>
      <Button 
        size="lg" 
        variant="outline"
        className="border-2 border-white text-white hover:bg-white hover:text-red-600"
        onClick={() => {
          trackPhoneCall('christmas_hero')
          window.location.href = 'tel:+441753682707'
        }}
      >
        <Icon name="phone" className="mr-2" />
        Call 01753 682707
      </Button>
    </div>
  )
}

export function PackageCard({ 
  title, 
  subtitle, 
  price, 
  minGuests,
  includes,
  atmosphere,
  availability,
  popular = false 
}: {
  title: string
  subtitle: string
  price: string
  minGuests: string
  includes: string[]
  atmosphere: string
  availability: string
  popular?: boolean
}) {
  return (
    <Card className={`relative h-full ${popular ? 'ring-2 ring-red-600' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-red-600 text-white px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      <div className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-anchor-charcoal">{title}</h3>
          <p className="text-gray-600 text-sm italic">{subtitle}</p>
          <div className="py-3">
            <span className="text-4xl font-bold text-red-600">{price}</span>
            <span className="text-gray-600 text-lg">/person</span>
          </div>
        </div>
        
        <div className="border-t pt-4 space-y-3">
          <div className="space-y-2">
            <p className="font-semibold text-anchor-charcoal">Includes:</p>
            <ul className="space-y-1">
              {includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Icon name="check" className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2 space-y-2 text-sm">
            <p className="text-gray-600">
              <span className="font-semibold">Atmosphere:</span> {atmosphere}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Minimum:</span> {minGuests}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Available:</span> {availability}
            </p>
          </div>
        </div>
        
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          onClick={() => {
            trackFormStart(`christmas_package_${title.toLowerCase().replace(' ', '_')}`)
            window.location.href = `mailto:manager@the-anchor.pub?subject=Christmas Party Enquiry - ${title} Package`
          }}
        >
          Enquire About This Package
        </Button>
      </div>
    </Card>
  )
}