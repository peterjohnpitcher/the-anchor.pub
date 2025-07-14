import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/markdown'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | The Anchor Stanwell Moor | News & Updates',
  description: 'Latest news, events, and stories from The Anchor pub in Stanwell Moor. Stay updated with our community pub near Heathrow.',
  keywords: 'the anchor blog, stanwell moor news, pub events heathrow, local community news',
  openGraph: {
    title: 'The Anchor Blog - News & Updates',
    description: 'Latest news and stories from your favourite local pub',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  const featuredPost = posts.find(post => post.featured) || posts[0]
  const otherPosts = posts.filter(post => post.slug !== featuredPost?.slug)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
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
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-spacing bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-anchor-green mb-8">Featured Story</h2>
              <article className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={`/content/blog/${featuredPost.slug}/${featuredPost.hero}`}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map(tag => (
                          <span key={tag} className="text-xs bg-anchor-gold/20 text-anchor-green px-3 py-1 rounded-full">
                            {tag}
                          </span>
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
              </article>
            </div>
          </div>
        </section>
      )}

      {/* Other Posts */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-anchor-green mb-8">Latest Stories</h2>
            
            {otherPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map(post => (
                  <article key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={`/content/blog/${post.slug}/${post.hero}`}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
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
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No blog posts yet. Check back soon!</p>
                <CallToAction href="/" variant="primary">
                  Back to Home
                </CallToAction>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Stay Connected
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on our latest news and events. Visit us for the full experience!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="/whats-on"
              variant="white"
              size="lg"
            >
              View Upcoming Events
            </CallToAction>
            <CallToAction 
              href="/find-us"
              variant="white"
              size="lg"
            >
              Visit Us Today
            </CallToAction>
          </div>
        </div>
      </section>
    </>
  )
}