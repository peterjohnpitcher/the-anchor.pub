# SEO Indexing Solution - Discovered but Not Indexed

## Critical Issue
Google has discovered 200+ valuable content pages but hasn't crawled them. This includes:
- Main navigation pages (/blog, /drinks, /find-us)
- All blog posts
- All tag pages
- Location pages

## Immediate Actions Required

### 1. Manual URL Submission (Do Today)
Submit these priority URLs manually in Google Search Console:
1. https://www.the-anchor.pub/blog
2. https://www.the-anchor.pub/drinks
3. https://www.the-anchor.pub/find-us
4. https://www.the-anchor.pub/beer-garden
5. https://www.the-anchor.pub/book-event
6. https://www.the-anchor.pub/sunday-lunch
7. https://www.the-anchor.pub/whats-on
8. https://www.the-anchor.pub/whats-on/drag-shows
9. https://www.the-anchor.pub/near-heathrow
10. https://www.the-anchor.pub/staines-pub

### 2. Actions Implemented

#### Created Priority Sitemap
- Added `/sitemap-priority.xml` with critical pages
- Updated robots.txt to include both sitemaps
- Focuses Google on most important content first

#### Enhanced Internal Linking
Created `InternalLinkingSection` component to add to all pages:
```tsx
import { InternalLinkingSection, commonLinkGroups } from '@/components/seo/InternalLinkingSection'

// Add to bottom of pages:
<InternalLinkingSection links={commonLinkGroups.mainPages} />
```

### 3. Additional Steps Needed

#### Add Article Structured Data to Blog Posts
In `/app/blog/[slug]/page.tsx`, add after line 60:
```tsx
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
      "url": "https://www.the-anchor.pub/images/branding/the-anchor-pub-logo-white-transparent.png"
    }
  },
  "image": post.hero ? `https://www.the-anchor.pub/content/blog/${post.slug}/${post.hero}` : "https://www.the-anchor.pub/images/hero/the-anchor-pub-interior-atmosphere.jpg",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.the-anchor.pub/blog/${post.slug}`
  }
}

// Add before the return statement:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
/>
```

#### Homepage Internal Links
Add a section on homepage showcasing latest blog posts and key pages.

#### Blog Index Enhancement
The /blog page needs:
- Meta description
- Structured data
- Better internal linking to posts

### 4. Common Causes & Solutions

#### Why Pages Aren't Being Indexed:
1. **Low Internal Link Value** - Pages not linked from high-value pages
2. **Thin Content** - Some tag pages may have too few posts
3. **Duplicate Content** - Similar content across pages
4. **Crawl Budget** - Google allocating limited resources

#### Solutions:
1. **Strengthen Internal Linking**
   - Add footer links to key pages
   - Create hub pages linking to related content
   - Add "Popular Posts" sidebar to blog

2. **Content Enhancement**
   - Add unique intro text to category/tag pages
   - Ensure minimum 300 words on key pages
   - Add FAQs to service pages

3. **Technical Optimization**
   - Reduce page load time
   - Fix any crawl errors
   - Ensure mobile responsiveness

### 5. Monitoring Progress

Check weekly in Search Console:
- Coverage > Discovered - currently not indexed
- URL Inspection tool for submitted pages
- Performance report for new impressions

Expected timeline:
- Week 1-2: Priority pages crawled and indexed
- Week 3-4: Blog posts begin indexing
- Week 5-6: Tag pages and secondary content

### 6. Long-term Strategy

1. **Content Velocity**: Publish new blog posts weekly to signal freshness
2. **Link Building**: Get local business directories to link to key pages
3. **Social Signals**: Share new content on social media
4. **User Engagement**: Improve time on site and reduce bounce rate

### 7. Warning Signs

If pages still not indexed after 4 weeks:
- Check for `noindex` tags
- Verify no soft 404 errors
- Ensure content is unique
- Check page load speed
- Verify mobile usability

## Next Steps

1. Submit priority URLs manually (TODAY)
2. Deploy the code changes
3. Monitor Search Console daily
4. Add internal links to all pages
5. Create fresh blog content weekly

This is a critical SEO issue that's preventing your content from appearing in search results. The "discovered but not indexed" status means Google knows about these pages but hasn't deemed them worthy of indexing yet. The above actions will signal to Google that these pages are important and should be crawled.