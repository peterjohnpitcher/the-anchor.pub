import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/markdown'

// This API route helps trigger indexing by:
// 1. Pinging Google/Bing with sitemaps
// 2. Generating fresh sitemap data
// 3. Creating internal activity

export async function GET() {
  try {
    const results = {
      sitemapPings: [] as Array<{
        service: string
        sitemap: string
        status?: number
        ok?: boolean
        error?: string
      }>,
      urlCount: 0,
      timestamp: new Date().toISOString()
    }

    // Ping Google with sitemaps
    const sitemaps = [
      'https://the-anchor.pub/sitemap.xml',
      'https://the-anchor.pub/sitemap-priority.xml'
    ]

    for (const sitemap of sitemaps) {
      try {
        const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`
        const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`
        
        // Ping Google
        const googleResponse = await fetch(googlePingUrl)
        results.sitemapPings.push({
          service: 'Google',
          sitemap,
          status: googleResponse.status,
          ok: googleResponse.ok
        })

        // Ping Bing
        const bingResponse = await fetch(bingPingUrl)
        results.sitemapPings.push({
          service: 'Bing', 
          sitemap,
          status: bingResponse.status,
          ok: bingResponse.ok
        })
      } catch (error) {
        results.sitemapPings.push({
          service: 'Error',
          sitemap,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Get all URLs that should be indexed
    const blogPosts = await getAllBlogPosts()
    const staticUrls = [
      '/',
      '/blog',
      '/drinks',
      '/drinks/managers-special',
      '/find-us',
      '/beer-garden',
      '/book-event',
      '/sunday-lunch',
      '/whats-on',
      '/whats-on/drag-shows',
      '/near-heathrow',
      '/near-heathrow/terminal-2',
      '/near-heathrow/terminal-3', 
      '/near-heathrow/terminal-4',
      '/near-heathrow/terminal-5',
      '/staines-pub',
      '/food-menu',
      '/food/pizza',
      '/pizza-tuesday',
      '/christmas-parties',
      '/corporate-events',
      '/private-party-venue',
      '/function-room-hire',
      '/ashford-pub',
      '/bedfont-pub',
      '/egham-pub',
      '/feltham-pub',
      '/heathrow-hotels-pub',
      '/m25-junction-14-pub',
      '/stanwell-pub',
      '/windsor-pub'
    ]

    // Count total URLs
    results.urlCount = staticUrls.length + blogPosts.length

    // Create a response that includes important URLs
    // This helps when Google crawls this API endpoint
    const priorityUrls = [
      ...staticUrls.slice(0, 10),
      ...blogPosts.slice(0, 5).map(post => `/blog/${post.slug}`)
    ].map(url => `https://the-anchor.pub${url}`)

    return NextResponse.json({
      success: true,
      message: 'Indexing triggered successfully',
      results,
      totalUrls: results.urlCount,
      priorityUrls,
      sitemaps,
      lastUpdated: new Date().toISOString(),
      instructions: {
        manual: 'Visit https://the-anchor.pub/api/trigger-indexing weekly',
        cron: 'Set up a weekly cron job to hit this endpoint',
        searchConsole: 'Submit priority URLs manually in Google Search Console'
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Also support POST for webhook triggers
export async function POST() {
  return GET()
}