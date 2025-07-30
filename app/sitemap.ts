import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://the-anchor.pub'
  
  // Define all static routes
  const staticRoutes = [
    '',
    '/food-menu',
    '/drinks',
    '/drinks/managers-special',
    '/sunday-lunch',
    '/whats-on',
    '/whats-on/drag-shows',
    '/blog',
    '/near-heathrow',
    '/near-heathrow/terminal-2',
    '/near-heathrow/terminal-3',
    '/near-heathrow/terminal-4',
    '/near-heathrow/terminal-5',
    '/find-us',
    '/book-event',
    '/beer-garden',
    '/staines-pub',
    '/food/pizza',
    '/pizza-tuesday',
    '/christmas-parties',
    '/corporate-events',
    '/private-party-venue',
    '/function-room-hire',
    '/leave-review',
    '/sitemap-page',
    '/ashford-pub',
    '/bedfont-pub',
    '/egham-pub',
    '/feltham-pub',
    '/heathrow-hotels-pub',
    '/m25-junction-14-pub',
    '/staines-pub',
    '/stanwell-pub',
    '/windsor-pub',
    '/book-table',
  ]

  // Get all blog posts
  const blogPosts = await getAllBlogPosts()
  
  // Get all unique tags
  const allTags = new Set<string>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag))
  })

  // Map static routes
  const staticSitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : route === '/blog' ? 'daily' : route === '/book-table' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : route === '/book-table' ? 0.95 : route.includes('near-heathrow') ? 0.9 : route === '/blog' ? 0.9 : route.includes('-pub') ? 0.85 : 0.8,
  }))

  // Map blog post routes
  const blogSitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Map tag pages
  const tagSitemap = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticSitemap, ...blogSitemap, ...tagSitemap]
}