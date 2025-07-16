# SEO Best Practices for The Anchor Website

This document outlines the SEO standards and best practices for The Anchor pub website to ensure consistency and maximum search visibility.

## 📋 Table of Contents
- [Page Title Structure](#page-title-structure)
- [Meta Descriptions](#meta-descriptions)
- [URL Structure](#url-structure)
- [Keyword Strategy](#keyword-strategy)
- [Content Structure](#content-structure)
- [Image Optimization](#image-optimization)
- [Schema Markup](#schema-markup)
- [Internal Linking](#internal-linking)
- [Technical SEO](#technical-seo)

## Page Title Structure

### Format Pattern
```
[Primary Keyword/Topic] | [Secondary Context] | The Anchor [Location]
```

### Examples by Page Type

#### Homepage
```
The Anchor Stanwell Moor | Traditional British Pub Near Heathrow
```

#### Service Pages
```
Food Menu | Fresh British Pub Food | The Anchor Stanwell Moor
Sunday Roast | Traditional Carvery Near Heathrow | The Anchor
Drinks Menu | Craft Beers & Cocktails | The Anchor Stanwell Moor
```

#### Event Pages
```
What's On | Events & Entertainment | The Anchor Stanwell Moor
Drag Shows | Saturday Night Entertainment | The Anchor Stanwell Moor
[Event Name] | [Date] at The Anchor Stanwell Moor
```

#### Location Pages
```
Pub Near Heathrow Terminal [X] | [X] Minutes Away | The Anchor
Staines Pub | Local Dining & Events | The Anchor Stanwell Moor
```

#### Blog Posts
```
[Topic/Headline] | The Anchor Blog
```

### Title Length Guidelines
- **Optimal**: 50-60 characters
- **Maximum**: 70 characters (to avoid truncation in search results)
- Always include "The Anchor" for brand recognition
- Include location terms when relevant (Stanwell Moor, Heathrow, Staines)

## Meta Descriptions

### Format Guidelines
- **Length**: 150-160 characters (optimal), max 165
- Include primary keyword naturally
- Add a call-to-action when appropriate
- Mention unique selling points (USPs)
- Include location for local SEO

### Template Examples

#### Service Pages
```
[Service description] at The Anchor pub in Stanwell Moor. [USP/Feature]. Just [X] minutes from Heathrow Terminal [X]. [CTA].
```

#### Event Pages
```
[Event type] at The Anchor pub near Heathrow Airport. [Key details - day/time]. [Special feature]. Book now: 01753 682707.
```

#### Blog Posts
```
[Topic summary]. [Key insight or benefit]. [Location context if relevant]. Read more at The Anchor blog.
```

### Real Examples
```
"Traditional Sunday roast at The Anchor pub in Stanwell Moor. Fresh local ingredients, vegetarian options available. Just 7 minutes from Heathrow Terminal 5. Book your table: 01753 682707."
```

## URL Structure

### Guidelines
- Use lowercase only
- Use hyphens (-) to separate words
- Keep URLs short and descriptive
- Avoid unnecessary words (and, the, of)
- Include primary keyword when possible

### URL Patterns

#### Main Pages
```
/food-menu
/drinks
/whats-on
/find-us
/book-event
```

#### Location Pages
```
/near-heathrow
/near-heathrow/terminal-[number]
/staines-pub
```

#### Blog Posts
```
/blog/[short-descriptive-slug]
```

### Blog URL Best Practices
- Maximum 4-5 words in slug
- Focus on primary keyword
- Remove dates unless event-specific
- Examples:
  - ✅ `/blog/drag-shows-saturday`
  - ❌ `/blog/amazing-drag-shows-every-saturday-night-at-the-anchor`

## Keyword Strategy

### Primary Keywords (High Priority)
- "pub near Heathrow"
- "Stanwell Moor pub"
- "pub near Terminal 5"
- "Staines pub"
- "British pub near airport"

### Secondary Keywords
- "Sunday roast near Heathrow"
- "drag shows Stanwell Moor"
- "pizza BOGOF Tuesday"
- "beer garden Heathrow"
- "pub food near Terminal 5"

### Long-tail Keywords
- "traditional British pub 7 minutes from Heathrow"
- "family friendly pub Stanwell Moor"
- "where to eat near Heathrow Terminal 5"
- "pub with parking near airport"
- "dog friendly pub Staines area"

### Keyword Placement
1. **Title tag** - Primary keyword near beginning
2. **H1** - Include primary keyword naturally
3. **First paragraph** - Primary and secondary keywords
4. **Subheadings (H2/H3)** - Variations and related terms
5. **Image alt text** - Descriptive with keywords
6. **Meta description** - Natural inclusion

## Content Structure

### Page Layout
```markdown
# H1 - One per page, includes primary keyword

Introduction paragraph with primary keyword in first 100 words.

## H2 - Major sections with related keywords

Content with natural keyword density (1-2%).

### H3 - Subsections for detailed topics

- Bullet points for easy scanning
- Include semantic variations
- Address user intent

## H2 - Another major section

[Continue pattern...]
```

### Content Guidelines
- **Minimum word count**: 300 words for service pages, 800+ for blog posts
- **Keyword density**: 1-2% for primary keyword
- **Readability**: Target 8th-grade reading level
- **Original content**: No duplicate content across pages
- **Regular updates**: Keep content fresh and current

## Image Optimization

### File Naming
```
Pattern: [descriptor]-[location]-[business].jpg
Examples:
- sunday-roast-stanwell-moor-anchor.jpg
- beer-garden-heathrow-pub.jpg
- drag-show-saturday-anchor.jpg
```

### Alt Text Format
```
Pattern: [Descriptive text] at The Anchor [location context]
Examples:
- "Traditional Sunday roast with Yorkshire pudding at The Anchor Stanwell Moor"
- "Drag performer on stage at The Anchor pub near Heathrow"
- "Beer garden with plane spotting views at The Anchor"
```

### Image Guidelines
- **File size**: Under 200KB for web images
- **Dimensions**: 1200x630px for hero images
- **Format**: WebP preferred, JPEG fallback
- **Lazy loading**: Implement for below-fold images

## Schema Markup

### Required Schema Types

#### LocalBusiness
```json
{
  "@type": ["Restaurant", "BarOrPub"],
  "name": "The Anchor",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ"
  }
}
```

#### Events
- Use Event schema for all events
- Include performer, offers, and location
- Add eventStatus and eventAttendanceMode

#### FAQPage
- Implement on relevant pages
- Structure questions based on common queries
- Include local intent questions

#### BreadcrumbList
- Implement on all pages
- Show clear navigation path
- Help search engines understand site structure

## Internal Linking

### Best Practices
- Link to related content naturally
- Use descriptive anchor text (not "click here")
- Create topic clusters (events, food, location)
- Maintain consistent navigation
- Add contextual links in content

### Anchor Text Examples
- ✅ "View our Sunday roast menu"
- ✅ "Book a table for drag show Saturday"
- ❌ "Click here"
- ❌ "Read more"

### Link Structure
- Homepage → Category pages → Individual pages
- Cross-link between related topics
- Link from blog posts to relevant service pages

## Technical SEO

### Performance Requirements
- **Page Speed**: <3 seconds load time
- **Core Web Vitals**:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

### Mobile Optimization
- Responsive design (mobile-first)
- Touch-friendly navigation (44px minimum)
- Readable font sizes (16px minimum)
- Proper viewport configuration

### Crawlability
- XML sitemap updated automatically
- Robots.txt properly configured
- No crawl errors in Search Console
- Proper 301 redirects for changed URLs

### Security & Trust
- HTTPS everywhere
- SSL certificate valid
- Contact information visible
- Privacy policy and terms accessible

## Local SEO Specifics

### NAP Consistency
Ensure Name, Address, Phone are identical across:
- Website
- Google Business Profile
- Social media
- Local directories

### Local Content
- Mention nearby landmarks (Heathrow, Staines)
- Include "near me" optimized content
- Create location-specific pages
- Add local event content

### Google Business Profile
- Complete all fields
- Regular posts about events
- Respond to reviews
- Upload fresh photos weekly
- Accurate hours and holiday schedules

## Content Calendar & Maintenance

### Regular Updates
- **Weekly**: Event listings, special offers
- **Monthly**: Blog posts, menu updates
- **Quarterly**: Page content refresh
- **Annually**: Full SEO audit

### Monitoring
- Track rankings for primary keywords
- Monitor organic traffic trends
- Check for crawl errors
- Review Core Web Vitals
- Analyze user behavior metrics

## Quick Checklist for New Pages

- [ ] Title tag follows format (50-60 chars)
- [ ] Meta description written (150-160 chars)
- [ ] URL is clean and keyword-optimized
- [ ] H1 tag includes primary keyword
- [ ] First paragraph contains target keywords
- [ ] Images have descriptive file names
- [ ] Alt text added to all images
- [ ] Schema markup implemented
- [ ] Internal links added (3-5 per page)
- [ ] Mobile-friendly design verified
- [ ] Page speed under 3 seconds
- [ ] Content minimum 300 words
- [ ] Call-to-action included

## Examples of Optimized Pages

### Food Menu Page
```
Title: Food Menu | Fresh British Pub Food | The Anchor Stanwell Moor
Meta: Delicious British pub food at The Anchor Stanwell Moor. Stone-baked pizzas, traditional mains, Sunday roasts. 7 minutes from Heathrow Terminal 5.
URL: /food-menu
H1: Our Food Menu - Fresh, Local, Delicious
```

### Event Listing
```
Title: Drag Shows | Saturday Night Entertainment | The Anchor Stanwell Moor
Meta: Spectacular drag shows every Saturday at The Anchor pub. Nikki Manfadge performs at 9pm. Free entry, near Heathrow. Book your table: 01753 682707.
URL: /whats-on/drag-shows
H1: Saturday Drag Shows at The Anchor
```

### Blog Post
```
Title: Best Sunday Roast Near Heathrow Airport | The Anchor Blog
Meta: Discover why The Anchor's Sunday roast is rated best near Heathrow. Fresh ingredients, generous portions, vegetarian options. Book now: 01753 682707.
URL: /blog/best-sunday-roast-heathrow
H1: Why Our Sunday Roast is the Best Near Heathrow
```

## Notes for Implementation

1. **Consistency is key** - Maintain these patterns across all pages
2. **User intent first** - Write for humans, optimize for search engines
3. **Local focus** - Always emphasize proximity to Heathrow and local area
4. **Regular reviews** - SEO is ongoing, not one-time
5. **Track everything** - Measure impact of changes

This guide should be reviewed and updated quarterly to reflect:
- Algorithm changes
- New keyword opportunities
- Competitive landscape shifts
- Business priority changes

Last updated: January 2025