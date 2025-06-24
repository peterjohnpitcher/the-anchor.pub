import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://the-anchor.pub'
  
  // Define all static routes
  const staticRoutes = [
    '',
    '/food-menu',
    '/drinks',
    '/sunday-lunch',
    '/whats-on',
    '/whats-on/drag-shows',
    '/whats-on/tequila-tasting',
    '/whats-on/quiz-night',
    '/whats-on/live-music',
    '/whats-on/cash-bingo',
    '/near-heathrow',
    '/near-heathrow/terminal-2',
    '/near-heathrow/terminal-3',
    '/near-heathrow/terminal-4',
    '/near-heathrow/terminal-5',
    '/find-us',
    '/book-event',
  ]

  // Map static routes with proper types
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : route.includes('near-heathrow') ? 0.9 : 0.8,
  }))
}