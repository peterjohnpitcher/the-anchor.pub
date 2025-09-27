import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import {
  Button,
  Section,
  Container,
  Card,
  CardBody,
  Grid,
  GridItem
} from '@/components/ui'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { PhoneButton } from '@/components/PhoneButton'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { EventSchema } from '@/components/EventSchema'
import EventBooking from '@/components/EventBooking'
import {
  getUpcomingEvents,
  formatEventDate,
  formatEventTime,
  formatDoorTime,
  type Event
} from '@/lib/api'
import { staticEvents } from '@/lib/static-events'

export const metadata: Metadata = {
  title: 'Cash Bingo Near Heathrow | Friday Jackpot Night at The Anchor',
  description:
    'Play cash bingo near Heathrow: £10 cash-only books, £160 snowball, jackpot to £300+, Chip Shop Fridays menu and reserved seating at The Anchor Stanwell Moor. Book your book now.',
  keywords:
    'cash bingo, cash bingo games, play bingo for cash, cash bingo near heathrow, bingo games for money, pub bingo night, bingo night stanwell moor'
}

function getBingoEvents(events: Event[]) {
  return events
    .filter(event => (event.name || '').toLowerCase().includes('bingo'))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

const WHY_LOVE_IT = [
  {
    icon: '💷',
    title: 'Cash-first bingo night',
    body: 'Ten lively games with £10 cash books, instant prizes, a £160 snowball chase and a jackpot that rolls to £300+ when the room sells out.'
  },
  {
    icon: '🎙️',
    title: 'Classic calls with Anchor humour',
    body: 'Traditional bingo calls mixed with Anchor in-jokes – Two Little Ducks gets a crowd quack, 59 earns a toast. Friendly hosts keep the pace spot on.'
  },
  {
    icon: '🍟',
    title: 'Chip Shop Fridays fuel',
    body: 'Arrive from 6 pm for Chip Shop Fridays plates, pitchers and cocktails. The kitchen serves through 9 pm so you can feast between games.'
  },
  {
    icon: '📣',
    title: 'Perfect Friday social',
    body: 'Doors & book sales from 6 pm, eyes down at 7 pm, finale by 9:30 pm. Ideal for Heathrow crews, locals, work mates and birthday nights.'
  },
  {
    icon: '🔁',
    title: 'Snowball loyalty perks',
    body: 'Attend three in a row to unlock the £160 snowball on Game 9. We track regulars on the Snowball Register so loyalty really does pay.'
  }
]

const FAQS = [
  {
    question: 'When does cash bingo start and finish?',
    answer:
      'Book sales and seating open at 6 pm. We run ten games from 7 pm to around 9:30 pm with two 10-minute breaks for food, drinks and extra book sales.'
  },
  {
    question: 'How much is it to play and how do I pay?',
    answer:
      'Each book is £10 and payment is cash-only (same for £1 daubers). Prizes are paid out in cash on the night, so bring notes or hit the ATM before you arrive.'
  },
  {
    question: 'Do I need to book in advance?',
    answer:
      'Yes—seats fill fast. Pop your mobile number into the booking form above or call 01753 682707 and we’ll reserve a table. Walk-ins are welcome while capacity lasts.'
  },
  {
    question: 'Is there an age limit for bingo night?',
    answer:
      'Cash bingo is primarily an over-18 event but supervised children are welcome. Keep phones on silent and little ones seated with their grown-ups during games.'
  },
  {
    question: 'What are the prizes and how does the snowball work?',
    answer:
      'Games include drinks, chocolate bars, quiz tickets, £10 cash, a snowball worth £160 if Game 9 full house lands within 54 calls, plus a jackpot pot fed by every £10 book sold.'
  },
  {
    question: 'Do you serve food and drinks?',
    answer:
      'Absolutely. Chip Shop Fridays menu and full bar service run 6 pm–9 pm. Order before the first game or during the breaks—everything is delivered straight to your table.'
  },
  {
    question: 'Can we host a private cash bingo fundraiser?',
    answer:
      'Yes. From corporate socials to charity nights we can supply callers, books and prize structure. Email manager@the-anchor.pub or call 01753 682707 to build a bespoke package.'
  },
  {
    question: 'Where can I see the latest dates?',
    answer:
      'Check the Upcoming Bingo Dates below or visit our What’s On page. Bonus specials and extra Fridays are announced there first, so it’s the best place to keep tabs on the next cash bingo night.'
  }
]

function PrizeCard({ title, reward, copy }: { title: string; reward: string; copy: string }) {
  return (
    <Card className="h-full bg-white/90 border border-amber-100 shadow-sm">
      <CardBody>
        <h3 className="text-lg font-semibold text-anchor-charcoal mb-2">{title}</h3>
        <p className="text-2xl font-bold text-anchor-gold mb-3">{reward}</p>
        <p className="text-sm text-gray-700">{copy}</p>
      </CardBody>
    </Card>
  )
}

function BingoEventCards({ events }: { events: Event[] }) {
  if (!events.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <p className="text-lg font-semibold text-anchor-green mb-2">New cash bingo dates are loading soon</p>
        <p className="text-gray-600">
          We’re finalising the next jackpot night. Call 01753 682707 and we’ll text you as soon as books go on sale.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {events.map((event, index) => {
        const doorTime = formatDoorTime(event.doorTime)
        const startTime = formatEventTime(event.startDate)
        const eventUrl = event.url || `/events/${event.slug || event.id}`
        const imageSrc = event.heroImageUrl || event.image?.[0] || null

        return (
          <Card key={event.id} className="overflow-hidden border border-anchor-sand shadow-lg">
            <div className="bg-anchor-green text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-white/70">Monthly cash bingo</p>
                <Link href={eventUrl} className="block text-xl font-bold text-white hover:text-anchor-gold transition">
                  {event.name}
                </Link>
                <p className="text-sm text-white/80 line-clamp-1">{formatEventDate(event.startDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-white">{startTime}</p>
                <p className="text-xs text-white/70">Doors {doorTime ?? '6:00pm'} • £10 cash book</p>
              </div>
            </div>
            <CardBody className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
              {imageSrc && (
                <Link href={eventUrl} className="w-full lg:w-48">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={imageSrc}
                      alt={`${event.name} cash bingo night at The Anchor`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 192px"
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                </Link>
              )}

              <div className="flex-1 space-y-4">
                {event.description && (
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-anchor-sand/40 text-anchor-green font-semibold">
                    💷 £160 snowball (within 54 calls)
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">
                    🎉 Jackpot grows with every book sold
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Cash-only books, ten games, two breaks for food & drinks, loyalty register for snowball eligibility.
                </p>
              </div>

              <div className="w-full lg:w-64 space-y-3">
                <EventBooking event={event} className="w-full" />
              </div>
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}

export default async function CashBingoPage() {
  const events = getBingoEvents(await getUpcomingEvents(20))
  const nextEvent = events[0]
  const nextEventDate = nextEvent ? formatEventDate(nextEvent.startDate) : 'Next date announced soon'
  const nextEventTime = nextEvent ? formatEventTime(nextEvent.startDate) : '7:00 pm start'
  const doorTime = nextEvent ? formatDoorTime(nextEvent.doorTime) ?? '6:00 pm' : '6:00 pm'

  const heroDescription = nextEvent
    ? `Doors ${doorTime}. Books are £10 cash-only and eyes down at ${nextEventTime}. Reserve online or call 01753 682707 to lock in your table.`
    : 'Doors 6:00 pm. Books are £10 cash-only and games begin at 7:00 pm. Reserve online or call 01753 682707 to lock in your table.'

  return (
    <>
      <HeroWrapper
        route="/cash-bingo"
        title="Cash Bingo Fridays at The Anchor"
        description="Play bingo for cash near Heathrow with £10 books, £160 snowball and jackpots that keep climbing."
        size="medium"
        showStatusBar
        tags={[
          { label: '💷 £10 cash-only books', variant: 'default' },
          { label: '🎯 £160 snowball chase', variant: 'primary' },
          { label: '🍟 Chip Shop Fridays menu', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
            >
              <Link href="#bingo-dates">📅 See upcoming bingo dates</Link>
            </Button>
            <PhoneButton
              phone="01753 682707"
              source="cash_bingo_hero"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              📞 Call to reserve: 01753 682707
            </PhoneButton>
          </div>
        }
      />

      <Section spacing="sm" background="white">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Cash Bingo Night – Stanwell Moor & Heathrow
          </PageTitle>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Searching for cash bingo games near Heathrow? Every few weeks we turn The Anchor into a buzzing bingo hall with cash prizes, Chip Shop Fridays plates and a friendly crowd of locals, cabin crew and Stanwell Moor neighbours. {heroDescription}
          </p>
        </Container>
      </Section>

      <Section spacing="md" background="gray">
        <Container>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-stretch">
            <Card className="bg-white shadow-lg border border-anchor-sand">
              <CardBody className="space-y-4">
                <p className="text-sm uppercase tracking-wide text-anchor-gold font-semibold">Next cash bingo night</p>
                <h2 className="text-3xl font-bold text-anchor-charcoal">{nextEvent ? nextEvent.name : 'Next cash bingo announced soon'}</h2>
                <p className="text-anchor-green font-semibold">{nextEvent ? `${nextEventDate} · ${nextEventTime}` : 'Check back for the next date'}</p>
                <p className="text-gray-700 whitespace-pre-line">
                  £10 cash book includes all ten games, two breaks and eligibility for instant prizes, £160 snowball (within 54 calls) and the rolling jackpot.
                </p>
                <div className="space-y-3">
                  {nextEvent ? (
                    <EventBooking event={nextEvent} className="w-full" />
                  ) : (
                    <Button
                      size="lg"
                      asChild
                      className="w-full bg-anchor-green text-white hover:bg-anchor-green-dark"
                    >
                      <Link href="tel:+441753682707">📞 Call 01753 682707</Link>
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
            <Card className="bg-anchor-cream border border-amber-100 shadow-sm">
              <CardBody className="space-y-4">
                <h3 className="text-2xl font-bold text-anchor-charcoal">Run of play</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>6:00 pm</strong> · Doors open, buy books & daubers (cash only).</li>
                  <li><strong>7:00 pm</strong> · Welcome, rules and Games 1–3 (aim for 6 minutes per game).</li>
                  <li><strong>7:45 pm</strong> · 10-minute break – grab drinks, snacks, extra books.</li>
                  <li><strong>8:00 pm</strong> · Games 4–6 – listen for colour-coded calls to stay on track.</li>
                  <li><strong>8:40 pm</strong> · Second break – last kitchen orders at 9 pm.</li>
                  <li><strong>8:55 pm</strong> · Games 7–10 – snowball on Game 9, jackpot on Game 10.</li>
                  <li><strong>9:30 pm</strong> · Prizes, photos and next cash bingo announcement.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Caller’s decision is final. Phones silent during games. Tied wins split the pot evenly.
                </p>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Section>
      <Section spacing="md" background="white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-charcoal mb-8 text-center">
              Why everyone loves cash bingo at The Anchor
            </h2>
            <Grid cols={WHY_LOVE_IT.length > 3 ? 3 : 2} gap="md">
              {WHY_LOVE_IT.map(feature => (
                <GridItem key={feature.title}>
                  <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
                    <CardBody className="space-y-3">
                      <div className="text-4xl">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-anchor-charcoal">{feature.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{feature.body}</p>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="gray">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-charcoal text-center mb-6">Prizes & jackpot ladder</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PrizeCard title="Games 1–8" reward="Drinks & treats" copy="Free drinks, chocolate bars, quiz tickets and food vouchers keep every round exciting." />
              <PrizeCard title="Game 9 Snowball" reward="£160 bonus" copy="Full house within 54 calls and eligible regulars split the snowball. Rolls to £180 if it survives." />
              <PrizeCard title="Game 10 Jackpot" reward="£10 per book sold" copy="Every cash book feeds the finale. Expect £260+ when the bar is full." />
              <PrizeCard title="Spot prizes" reward="Surprise cash-ups" copy="Cheeky lucky squares, best bingo call energy and loyalty perks mean extra £10 notes appear throughout the night." />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-charcoal text-center mb-6">Game-by-game schedule</h2>
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-anchor-green text-white">
                  <tr>
                    <th className="px-4 py-3">Game</th>
                    <th className="px-4 py-3">Pattern</th>
                    <th className="px-4 py-3">Prizes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white/80">
                    <td className="px-4 py-3 font-semibold">Game 1 – Orange</td>
                    <td className="px-4 py-3">Two lines</td>
                    <td className="px-4 py-3">Chocolate bar</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">Game 2 – Grey</td>
                    <td className="px-4 py-3">One line / Two lines</td>
                    <td className="px-4 py-3">Free drink / Bottle of Prosecco</td>
                  </tr>
                  <tr className="bg-white/80">
                    <td className="px-4 py-3 font-semibold">Game 3 – Blue</td>
                    <td className="px-4 py-3">Full house</td>
                    <td className="px-4 py-3">£10 drink voucher</td>
                  </tr>
                  <tr className="bg-anchor-sand/20">
                    <td className="px-4 py-3 font-semibold" colSpan={3}>10-minute break · push bar & Chip Shop Fridays specials</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">Game 4 – Peach</td>
                    <td className="px-4 py-3">Two lines</td>
                    <td className="px-4 py-3">Free drink</td>
                  </tr>
                  <tr className="bg-white/80">
                    <td className="px-4 py-3 font-semibold">Game 5 – Yellow</td>
                    <td className="px-4 py-3">One line / Full house</td>
                    <td className="px-4 py-3">Chocolate bar / £10 cash</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">Game 6 – Red</td>
                    <td className="px-4 py-3">Full house</td>
                    <td className="px-4 py-3">£10 food voucher</td>
                  </tr>
                  <tr className="bg-anchor-sand/20">
                    <td className="px-4 py-3 font-semibold" colSpan={3}>10-minute break · announce kitchen last orders (9 pm)</td>
                  </tr>
                  <tr className="bg-white/80">
                    <td className="px-4 py-3 font-semibold">Game 7 – Lilac</td>
                    <td className="px-4 py-3">One line</td>
                    <td className="px-4 py-3">Chocolate bar</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">Game 8 – Brown</td>
                    <td className="px-4 py-3">One line / Two lines</td>
                    <td className="px-4 py-3">Free drink / 4 tickets to quiz night</td>
                  </tr>
                  <tr className="bg-white/80">
                    <td className="px-4 py-3 font-semibold">Game 9 – Pink (Snowball)</td>
                    <td className="px-4 py-3">Full house within 54 calls</td>
                    <td className="px-4 py-3">£10 cash + £160 snowball bonus</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">Game 10 – Green (Jackpot)</td>
                    <td className="px-4 py-3">Full house</td>
                    <td className="px-4 py-3">Cash pot: £10 per book sold (est. £260+)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-charcoal text-center mb-6">Tips for playing bingo for cash</h2>
            <p className="text-gray-700 text-center max-w-3xl mx-auto mb-6">
              Looking to “play bingo for cash” like a pro? These quick-fire tips from our regulars help you stay sharp and give the snowball your best shot.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="h-full bg-white border border-gray-100 shadow-sm">
                <CardBody className="space-y-3">
                  <h3 className="text-xl font-semibold text-anchor-charcoal">Bring the right kit</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Cash-only entry, so bring notes and coins for books and daubers. Pack spare daubers or lucky charms—confidence helps when the jackpot numbers fall.
                  </p>
                </CardBody>
              </Card>
              <Card className="h-full bg-white border border-gray-100 shadow-sm">
                <CardBody className="space-y-3">
                  <h3 className="text-xl font-semibold text-anchor-charcoal">Arrive early for the good seats</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Doors open at 6 pm. Turn up early, claim a clear sightline to the caller, order Chip Shop Fridays plates and review the snowball rules before Game 1.
                  </p>
                </CardBody>
              </Card>
              <Card className="h-full bg-white border border-gray-100 shadow-sm">
                <CardBody className="space-y-3">
                  <h3 className="text-xl font-semibold text-anchor-charcoal">Keep your focus between calls</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Use the breaks to stretch, order drinks and catch up. During games keep conversations low, phones away and eyes on the card so you never miss the money ball.
                  </p>
                </CardBody>
              </Card>
              <Card className="h-full bg-white border border-gray-100 shadow-sm">
                <CardBody className="space-y-3">
                  <h3 className="text-xl font-semibold text-anchor-charcoal">Build your snowball streak</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Attend each monthly cash bingo night and we tick you off on the Snowball Register. Three consecutive visits unlock the £160 bonus when it hits in 54 calls or fewer.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="white" id="bingo-dates">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-charcoal text-center mb-6">Upcoming cash bingo dates</h2>
            <p className="text-gray-700 text-center mb-8">
              We’ve listed confirmed bingo nights below. For the very latest schedule—including bonus specials—visit our <Link href="/whats-on" className="text-anchor-gold hover:text-anchor-gold-light font-semibold">What’s On page</Link> or call 01753 682707.
            </p>
            <BingoEventCards events={events} />
          </div>
        </Container>
      </Section>

      <FAQAccordionWithSchema faqs={FAQS} className="bg-white" />

      <Section spacing="md" background="white">
        <Container>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-anchor-green to-anchor-green/80 rounded-2xl p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to shout “Bingo”?</h2>
            <p className="text-lg mb-6">
              Book your £10 cash book today or call the bar team and we’ll keep seats for your crew.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneButton
                phone="01753 682707"
                source="cash_bingo_cta_bottom"
                size="lg"
                className="w-full sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
              >
                📞 Call us on 01753 682707
              </PhoneButton>
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="#bingo-dates">📅 Upcoming bingo dates</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" background="gray">
        <Container>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h2 className="text-2xl font-bold text-anchor-charcoal mb-3">Find us</h2>
              <p className="text-gray-700 mb-4">
                The Anchor · Horton Road, Stanwell Moor, TW19 6AQ · Free on-site parking · 7 minutes from Heathrow T5 · 10 minutes from Staines.
              </p>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li><strong>Driving:</strong> Use postcode TW19 6AQ. Plenty of free parking right outside.</li>
                <li><strong>Public transport:</strong> 441 & 555 buses stop on Horton Road. Uber and Bolt know us well.</li>
                <li><strong>Accessibility:</strong> Step-free entrance, accessible loos and flexible seating for players.</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  href="https://maps.app.goo.gl/YNbjTDF9g7uCcbYF6"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-anchor-green px-4 py-2 text-anchor-green font-semibold hover:bg-anchor-green hover:text-white transition"
                >
                  📍 Get directions
                </Link>
                <Link
                  href="https://wa.me/441753682707"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-anchor-gold px-4 py-2 text-anchor-gold font-semibold hover:bg-anchor-gold hover:text-anchor-green transition"
                >
                  💬 WhatsApp the team
                </Link>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <iframe
                title="Map to The Anchor Pub"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.226815508708!2d-0.487349023408861!3d51.465454371740584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487672926f5099cf%3A0x9e8922e968bcf5e3!2sThe%20Anchor%20Stanwell%20Moor!5e0!3m2!1sen!2suk!4v1698499999999!5m2!1sen!2suk"
                className="w-full h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Container>
      </Section>

      <EventSchema event={staticEvents.bingoNight} />
      {events.map(event => (
        <EventSchema key={`event-schema-${event.id}`} event={event} />
      ))}
    </>
  )
}
