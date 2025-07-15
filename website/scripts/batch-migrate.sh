#!/bin/bash

# Batch Migration Script
# Migrates blog posts in smaller batches to avoid timeouts

echo "🚀 Starting batch migration..."

# List of all blog post URLs from the sitemap
urls=(
  "https://www.the-anchor.pub/post/experience-the-magic-at-the-anchor-s-christmas-market"
  "https://www.the-anchor.pub/post/buy-one-get-one-half-price-on-all-dine-in-pizza-every-tuesday"
  "https://www.the-anchor.pub/post/day-of-the-dead-anchor-pub-events"
  "https://www.the-anchor.pub/post/have-you-tried-kraken-rum"
  "https://www.the-anchor.pub/post/world-salami-day-pizza-offerings"
  "https://www.the-anchor.pub/post/random-acts-of-kindness-day-the-anchor"
  "https://www.the-anchor.pub/post/2020-quiz-league"
  "https://www.the-anchor.pub/post/charity-walk-for-holly-fathers-mission"
  "https://www.the-anchor.pub/post/drag-cabaret-nikki-manfadge-the-anchor"
  "https://www.the-anchor.pub/post/remembrance-day-anchor-staines"
  "https://www.the-anchor.pub/post/winter-closing-hours"
  "https://www.the-anchor.pub/post/curry-club-september-2019"
  "https://www.the-anchor.pub/post/bombay-sapphire-july-special"
  "https://www.the-anchor.pub/post/the-anchor-wins-best-bar-none-commendation"
  "https://www.the-anchor.pub/post/the-anchor-pub-near-heathrow-airport"
  "https://www.the-anchor.pub/post/the-anchor-on-trip-advisor"
  "https://www.the-anchor.pub/post/sunday-lunch-menu-revealed"
  "https://www.the-anchor.pub/post/friday-night-is-happy-hour"
  "https://www.the-anchor.pub/post/pimms-pub-garden-summer"
  "https://www.the-anchor.pub/post/kraken-rum-offer-stanwell-moor"
  "https://www.the-anchor.pub/post/rum-tasting-night-stanwell-moor"
  "https://www.the-anchor.pub/post/the-botanist-gin-july-2025-managers-special-stanwell-moor"
  "https://www.the-anchor.pub/post/discover-unique-events-at-the-anchor"
  "https://www.the-anchor.pub/post/bombay-sapphire-the-anchor-pub"
  "https://www.the-anchor.pub/post/spring-tasting-night-celebration"
  "https://www.the-anchor.pub/post/rum-tasting-night-june-success"
  "https://www.the-anchor.pub/post/prices-frozen-until-autumn-the-anchor-pub"
  "https://www.the-anchor.pub/post/opihr-gin-the-anchor"
  "https://www.the-anchor.pub/post/spring-tasting-night"
  # Add more URLs as needed
)

# Check if already migrated
total=${#urls[@]}
migrated=0
skipped=0

echo "📊 Processing ${total} URLs..."

for url in "${urls[@]}"; do
  # Extract slug from URL
  slug=$(echo "$url" | sed 's/.*\/post\///' | sed 's/[^a-z0-9-]/-/g' | cut -c1-50)
  
  # Check if already migrated
  if [ -f "content/blog/${slug}/index.md" ] || [ -f "content/blog/${slug:0:50}/index.md" ]; then
    echo "⏩ Skipping (already migrated): ${url##*/}"
    ((skipped++))
  else
    echo "📝 Migrating: ${url##*/}"
    node scripts/migrate-blog-improved.js "$url"
    ((migrated++))
    
    # Add delay between migrations
    sleep 2
  fi
done

echo ""
echo "✅ Batch migration complete!"
echo "📊 Summary:"
echo "   Total URLs: ${total}"
echo "   Migrated: ${migrated}"
echo "   Skipped: ${skipped}"
echo ""
echo "Run 'node scripts/check-migration-status.js' to see all migrated posts."