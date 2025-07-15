#!/bin/bash

# Complete Blog Migration Script
# This script finds and migrates all blog posts from the old website

echo "🚀 Starting complete blog migration..."
echo ""

# Step 1: Find all blog URLs
echo "📋 Step 1: Finding all blog post URLs..."
node scripts/find-blog-urls.js

# Check if blog-urls.txt was created
if [ ! -f "blog-urls.txt" ]; then
    echo "❌ No blog URLs found. Exiting."
    exit 1
fi

# Count URLs
URL_COUNT=$(wc -l < blog-urls.txt)
echo ""
echo "📊 Found $URL_COUNT blog posts to migrate"
echo ""

# Step 2: Migrate each post
echo "📋 Step 2: Migrating blog posts..."
echo ""

COUNTER=1
while IFS= read -r url; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📝 Migrating post $COUNTER of $URL_COUNT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    node scripts/migrate-specific-post.js "$url"
    
    echo ""
    COUNTER=$((COUNTER + 1))
    
    # Add a small delay to be nice to the server
    sleep 2
done < blog-urls.txt

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Migration complete!"
echo ""
echo "📁 All posts have been migrated to: content/blog/"
echo ""
echo "Next steps:"
echo "1. Review the migrated content in content/blog/"
echo "2. Add missing images where needed"
echo "3. Enhance content with full text if needed"
echo "4. Run 'npm run build' to test"
echo ""