import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogPosts, distributeImages } from '@/lib/markdown'
import { Button } from '@/components/ui'
import { Metadata } from 'next'
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker'
import { BlogShareButtons } from '@/components/BlogShareButtons'
import { InternalLinkingSection, commonLinkGroups } from '@/components/seo/InternalLinkingSection'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | The Anchor Blog',
    }
  }

  return {
    title: `${post.title} | The Anchor Blog`,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.hero ? [`/content/blog/${post.slug}/${post.hero}`] : ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  // Get all posts for navigation
  const allPosts = await getAllBlogPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Distribute images throughout content only if images array has items
  const contentWithImages = post.images && post.images.length > 0 
    ? distributeImages(post.htmlContent || '', post.images, post.slug)
    : post.htmlContent || ''

  // Article structured data for better SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "The Anchor",
      "logo": {
        "@type": "ImageObject",
        "url": "https://the-anchor.pub/images/branding/the-anchor-pub-logo-white-transparent.png"
      }
    },
    "image": post.hero 
      ? `https://the-anchor.pub/content/blog/${post.slug}/${post.hero}` 
      : "https://the-anchor.pub/images/hero/the-anchor-pub-interior-atmosphere.jpg",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://the-anchor.pub/blog/${post.slug}`
    },
    "keywords": post.keywords.join(", "),
    "articleSection": post.tags[0] || "News",
    "wordCount": post.htmlContent ? post.htmlContent.split(' ').length : 500
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://the-anchor.pub"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://the-anchor.pub/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://the-anchor.pub/blog/${post.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <ScrollDepthTracker />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end mt-20">
        <div className="absolute inset-0">
          <Image
            src={post.hero ? `/content/blog/${post.slug}/${post.hero}` : '/images/hero/the-anchor-pub-interior-atmosphere.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/blog/tag/${tag}`}
                  className="text-sm bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <span>{post.author}</span>
              <span>•</span>
              <time>{new Date(post.date).toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-anchor-green">Home</Link>
            <span className="text-gray-600">/</span>
            <Link href="/blog" className="text-gray-600 hover:text-anchor-green">Blog</Link>
            <span className="text-gray-600">/</span>
            <span className="text-anchor-green font-semibold">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <article className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="
                prose prose-lg lg:prose-xl max-w-none
                
                /* Headings */
                prose-headings:font-serif
                prose-headings:text-anchor-green
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
                
                /* Paragraphs */
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-p:mb-6
                
                /* Links */
                prose-a:text-anchor-gold prose-a:font-semibold
                prose-a:no-underline hover:prose-a:underline
                prose-a:transition-colours hover:prose-a:text-anchor-gold-light
                
                /* Strong/Bold */
                prose-strong:text-anchor-green prose-strong:font-bold
                
                /* Lists */
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                
                /* Images */
                prose-img:rounded-lg prose-img:shadow-lg
                prose-img:my-8 prose-img:w-full
                prose-figure:my-8
                
                /* Blockquotes */
                prose-blockquote:border-l-4 prose-blockquote:border-anchor-gold
                prose-blockquote:pl-6 prose-blockquote:italic
                prose-blockquote:text-gray-600 prose-blockquote:my-8
                
                /* Code */
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1
                prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                
                /* Tables */
                prose-table:my-8
                prose-th:bg-anchor-green prose-th:text-white
                prose-th:font-semibold prose-th:px-6 prose-th:py-3
                prose-td:border prose-td:border-gray-300
                prose-td:px-6 prose-td:py-3
                
                /* HR */
                prose-hr:border-gray-300 prose-hr:my-12
              "
              dangerouslySetInnerHTML={{ __html: contentWithImages }}
            />
          </div>
        </div>
      </article>

      {/* Share Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-4">Enjoyed this article? Share it with your friends!</p>
            <BlogShareButtons postTitle={post.title} postSlug={post.slug} />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group">
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-2">← Previous Post</p>
                    <h3 className="text-lg font-bold text-anchor-green group-hover:text-anchor-gold transition-colours">
                      {prevPost.title}
                    </h3>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group md:text-right">
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-2">Next Post →</p>
                    <h3 className="text-lg font-bold text-anchor-green group-hover:text-anchor-gold transition-colours">
                      {nextPost.title}
                    </h3>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking for Better SEO */}
      <InternalLinkingSection 
        links={commonLinkGroups.events}
        className="section-spacing-md"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Visit The Anchor Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience everything we write about firsthand. Join us for great food, drinks, and atmosphere!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-us">
              <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-anchor-green">
                Get Directions
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-anchor-green">
                More Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": `https://the-anchor.pub/content/blog/${post.slug}/${post.hero}`,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Anchor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://the-anchor.pub/images/branding/the-anchor-pub-logo-black-transparent.png"
              }
            },
            "keywords": post.keywords.join(", ")
          })
        }}
      />
    </>
  )
}