import type { Metadata } from 'next'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { PhoneLink } from '@/components/PhoneLink'
import { EmailLink } from '@/components/EmailLink'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookie Policy | The Anchor',
  description: 'Learn how The Anchor collects, uses, and protects your personal information and data.',
  openGraph: {
    title: 'Privacy Policy & Cookie Policy | The Anchor',
    description: 'Learn how The Anchor collects, uses, and protects your personal information and data.',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeroWrapper
        route="/privacy-policy"
        title="Privacy & Cookie Policy"
        description="Your privacy matters to us"
        size="small"
      />
      
      <Section spacing="lg" container containerSize="md">
        <div className="max-w-4xl mx-auto">
          <PageTitle className="text-center text-anchor-green mb-8" seo={{ structured: true, speakable: true }}>
            Privacy Policy - The Anchor
          </PageTitle>
          <div className="prose prose-lg">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <h2>1. Introduction</h2>
          <p>
            The Anchor ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or visit our establishment.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Name and contact details when making bookings</li>
            <li>Email address when signing up for our newsletter</li>
            <li>Feedback and correspondence sent to us</li>
            <li>Information provided when participating in events or promotions</li>
          </ul>

          <h3>Information Automatically Collected</h3>
          <ul>
            <li>IP address and browser information</li>
            <li>Device and connection information</li>
            <li>Page views and site navigation patterns</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your bookings and reservations</li>
            <li>Send you updates about events and promotions (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Cookie Policy</h2>
          <p>
            We use cookies and similar tracking technologies to improve your browsing experience on our website. Cookies are small data files stored on your device.
          </p>

          <h3>Types of Cookies We Use</h3>
          
          <h4>Necessary Cookies</h4>
          <p>
            These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
          </p>

          <h4>Analytics Cookies</h4>
          <p>
            We use analytics cookies to understand how visitors interact with our website. These cookies help us improve our website's performance and user experience. We use Google Analytics to collect anonymized information about website usage.
          </p>

          <h4>Marketing Cookies</h4>
          <p>
            Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user. We may use these cookies to measure the effectiveness of our advertising campaigns.
          </p>

          <h4>Preference Cookies</h4>
          <p>
            These cookies enable the website to remember choices you make (such as your language preference) and provide enhanced, more personalized features.
          </p>

          <h3>Managing Cookies</h3>
          <p>
            You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and parts of our website may no longer be fully accessible.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We use the following third-party services that may collect data:
          </p>
          <ul>
            <li><strong>Google Analytics</strong> - Website analytics</li>
            <li><strong>Google Maps</strong> - Location services</li>
            <li><strong>Social Media Platforms</strong> - When you interact with our social media content</li>
            <li><strong>Booking Systems</strong> - For table reservations</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under UK data protection law, you have rights including:</p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to erasure of your data</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <address className="not-italic">
            <strong>The Anchor</strong><br />
            Horton Road<br />
            Stanwell Moor<br />
            Surrey<br />
            TW19 6AQ<br />
            <br />
            Email: <EmailLink email="manager@the-anchor.pub" source="privacy_policy" /><br />
            Phone: <PhoneLink phone="01753 682707" source="privacy_policy" />
          </address>

          <h2>11. Complaints</h2>
          <p>
            If you're not satisfied with our response to your privacy concerns, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
          </p>
          <p>
            <a href="https://ico.org.uk/concerns" target="_blank" rel="noopener noreferrer" className="text-anchor-gold hover:underline">
              ico.org.uk/concerns
            </a>
          </p>
          </div>
        </div>
      </Section>
    </>
  )
}
