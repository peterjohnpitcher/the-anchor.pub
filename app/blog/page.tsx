import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/markdown'
import { Button, Container, Section, Card, CardBody, Badge, Grid, GridItem } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { Metadata } from 'next'
import { getTwitterMetadata } from '@/lib/twitter-metadata'

export const metadata: Metadata = {
  title: 'Blog | The Anchor Stanwell Moor | News & Updates',
  description: 'Latest news, events, and stories from The Anchor pub in Stanwell Moor. Stay updated with our community pub near Heathrow.',
  keywords: 'the anchor blog, stanwell moor news, pub events heathrow, local community news',
  openGraph: {
    title: 'The Anchor Blog - News & Updates',
    description: 'Latest news and stories from your favourite local pub',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'The Anchor Blog - News & Updates',
    description: 'Latest news and stories from your favourite local pub',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg']
  })
}

// Configuration
const POSTS_PER_PAGE = 12

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const allPosts = await getAllBlogPosts()
  
  // Calculate pagination
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  
  // Get posts for current page
  const posts = allPosts.slice(startIndex, endIndex)
  const featuredPost = currentPage === 1 ? (allPosts.find(post => post.featured) || posts[0]) : null
  const otherPosts = featuredPost ? posts.filter(post => post.slug !== featuredPost.slug) : posts
  
  // Get all unique tags with counts
  const tagCounts = new Map<string, number>()
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  
  // Sort tags by count (most popular first)
  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
  
  // Tag display names
  const tagNames: Record<string, string> = {
    'food': 'Food & Dining',
    'drinks': 'Drinks & Bar',
    'events': 'Events',
    'community': 'Community',
    'sports': 'Sports',
    'special-offers': 'Special Offers',
    'quiz-night': 'Quiz Nights',
    'drag-shows': 'Drag Shows',
    'tasting-events': 'Tastings',
    'sunday-roast': 'Sunday Roast',
    'christmas': 'Christmas',
    'heathrow-area': 'Near Heathrow',
    'dog-friendly': 'Dog Friendly',
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="relative min-h-[50vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <Container className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              The Anchor Blog
            </h1>
            
            {/* Status Bar */}
            <div className="flex justify-center mb-6">
              <StatusBar 
                theme={{
                  background: 'bg-white/10 backdrop-blur-md',
                  border: 'border-2 border-white/20',
                  text: 'text-white',
                  accentText: 'text-white/60'
                }}
              />
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              News, events, and stories from your local pub
            </p>
            
            {currentPage > 1 && (
              <p className="text-lg text-white/80">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Tag Cloud - Only on first page */}
      {currentPage === 1 && (
        <div className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-anchor-green mb-8 text-center">
                Browse by Topic
              </h2>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {sortedTags.slice(0, 12).map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="group relative px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-anchor-green transition-colors">
                      {tagNames[tag] || tag.replace(/-/g, ' ')}
                    </span>
                    <span className="ml-2 text-sm sm:text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
              {sortedTags.length > 12 && (
                <div className="text-center">
                  <Link 
                    href="/blog/tags"
                    className="inline-flex items-center text-anchor-gold hover:text-anchor-gold-light font-semibold transition-colours"
                  >
                    View all {sortedTags.length} topics
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Featured Post (only on first page) */}
      {featuredPost && currentPage === 1 && (
        <div className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-anchor-green mb-8">Featured Story</h2>
              <Card variant="elevated" className="bg-gray-50 hover:shadow-xl transition-shadow">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={`/content/blog/${featuredPost.slug}/${featuredPost.hero}`}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map(tag => (
                          <Link key={tag} href={`/blog/tag/${tag}`}>
                            <Badge 
                              variant="default"
                              size="sm"
                              className="bg-anchor-gold/20 text-anchor-green hover:bg-anchor-gold hover:text-white transition-colours"
                            >
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-anchor-green mb-4">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {featuredPost.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span>{featuredPost.author}</span>
                          <span className="mx-2">•</span>
                          <time>{new Date(featuredPost.date).toLocaleDateString('en-GB')}</time>
                        </div>
                        <span className="text-anchor-gold font-semibold">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          </Container>
        </div>
      )}

      {/* Other Posts */}
      <div className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-anchor-green mb-8">
              {currentPage === 1 ? 'Latest Stories' : 'All Stories'}
            </h2>
            
            {otherPosts.length > 0 ? (
              <>
                <Grid cols={3} gap="lg" className="mb-12">
                  {otherPosts.map(post => (
                    <Card key={post.slug} variant="default" className="hover:shadow-lg transition-shadow">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48">
                          <Image
                            src={`/content/blog/${post.slug}/${post.hero}`}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map(tag => (
                              <Link key={tag} href={`/blog/tag/${tag}`}>
                                <Badge 
                                  variant="default"
                                  size="sm"
                                  className="bg-gray-100 text-gray-600 hover:bg-anchor-gold hover:text-white transition-colours"
                                >
                                  {tag}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                          <h3 className="text-lg font-bold text-anchor-green mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="text-sm text-gray-600">
                            <time>{new Date(post.date).toLocaleDateString('en-GB')}</time>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {/* Previous button */}
                    {currentPage > 1 && (
                      <Link href={`/blog?page=${currentPage - 1}`}>
                        <Button variant="outline" size="sm">
                          ← Previous
                        </Button>
                      </Link>
                    )}

                    {/* Page numbers */}
                    <div className="flex gap-2">
                      {/* First page */}
                      {currentPage > 3 && (
                        <>
                          <Link href="/blog">
                            <Button variant="outline" size="sm">
                              1
                            </Button>
                          </Link>
                          {currentPage > 4 && <span className="px-2 py-2">...</span>}
                        </>
                      )}

                      {/* Current page and neighbours */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          const distance = Math.abs(page - currentPage)
                          return distance <= 2
                        })
                        .map(page => (
                          <Link
                            key={page}
                            href={page === 1 ? '/blog' : `/blog?page=${page}`}
                          >
                            <Button 
                              variant={page === currentPage ? 'primary' : 'outline'}
                              size="sm"
                            >
                              {page}
                            </Button>
                          </Link>
                        ))}

                      {/* Last page */}
                      {currentPage < totalPages - 2 && (
                        <>
                          {currentPage < totalPages - 3 && <span className="px-2 py-2">...</span>}
                          <Link href={`/blog?page=${totalPages}`}>
                            <Button variant="outline" size="sm">
                              {totalPages}
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Next button */}
                    {currentPage < totalPages && (
                      <Link href={`/blog?page=${currentPage + 1}`}>
                        <Button variant="outline" size="sm">
                          Next →
                        </Button>
                      </Link>
                    )}
                  </div>
                )}

                {/* Results info */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of {totalPosts} posts
                </p>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No blog posts yet. Cheque back soon!</p>
                <Link href="/">
                  <Button variant="primary">
                    Back to Home
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-anchor-green text-white py-16 sm:py-20 lg:py-24">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-8">
            Stay Connected
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on our latest news and events. Visit us for the full experience!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/whats-on">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                View Upcoming Events
              </Button>
            </Link>
            <Link href="/find-us">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                Visit Us Today
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}