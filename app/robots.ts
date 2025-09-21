import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/_serverless/',
          '/_partials/',
          '/_api/',
          '/_scripts/',
          '/images/page-headers/home/optimized/',
          '/leave-review',
          '/subscribe',
          '/leave-a-review',
          '/subscribe-for-digital-flyers'
        ]
      }
    ],
    sitemap: 'https://www.the-anchor.pub/sitemap.xml',
  }
}
