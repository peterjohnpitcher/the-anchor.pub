# Blog Migration Scripts

This directory contains scripts to migrate blog posts from the old website (www.the-anchor.pub) to the new website structure.

## Overview

The migration process extracts blog posts from the old website, including:
- Title and metadata
- SEO information (meta tags, structured data)
- Publication date and author
- Images (hero images)
- Basic content structure

## Scripts

### 1. Find Blog URLs (`find-blog-urls.js`)

Discovers all blog post URLs from the old website.

```bash
node scripts/find-blog-urls.js
```

This script:
- Checks the sitemap.xml for blog post URLs
- Searches common pages for blog links
- Saves all found URLs to `blog-urls.txt`

### 2. Migrate Specific Post (`migrate-specific-post.js`)

Migrates a single blog post by URL.

```bash
node scripts/migrate-specific-post.js https://www.the-anchor.pub/post/example-post
```

This script:
- Fetches the post content
- Extracts metadata from structured data and meta tags
- Creates a properly formatted markdown file
- Downloads the hero image (if available)
- Creates the correct directory structure

### 3. Migrate All Posts (`migrate-all-posts.sh`)

Automated script that finds and migrates all blog posts.

```bash
./scripts/migrate-all-posts.sh
```

This script:
- Runs the URL finder
- Migrates each post sequentially
- Adds delays between requests to avoid overwhelming the server
- Provides progress updates

## Migration Process

### Automatic Migration (Recommended)

1. Run the complete migration:
   ```bash
   ./scripts/migrate-all-posts.sh
   ```

2. Review the migrated content:
   ```bash
   ls -la content/blog/
   ```

3. Check for any missing images or content

4. Build and test:
   ```bash
   npm run build
   ```

### Manual Migration (Single Post)

1. Find the URL of the post you want to migrate

2. Run the migration:
   ```bash
   node scripts/migrate-specific-post.js [POST-URL]
   ```

3. Check the migrated content:
   ```bash
   cat content/blog/[post-slug]/index.md
   ```

## What Gets Migrated

### Metadata
- **Title**: From structured data, meta tags, or page title
- **Description**: From structured data or meta description
- **Date**: Publication date from structured data or meta tags
- **Author**: From structured data or defaults to "The Anchor Team"
- **Keywords**: From meta keywords tag
- **Tags**: Automatically determined based on content

### Images
- **Hero Image**: Downloaded from og:image or structured data
- If download fails, a text file with the image URL is created

### Content Structure
- Basic markdown structure is created
- Full content extraction requires manual review
- Links to original post are preserved

## Post-Migration Tasks

After running the migration, you should:

1. **Review Content**: Check each migrated post for completeness
2. **Add Missing Content**: The scripts extract metadata but may not get full article text
3. **Fix Images**: 
   - Check for `image-url.txt` files
   - Download missing images manually
   - Ensure all images are properly named
4. **Update Tags**: Review and adjust auto-generated tags
5. **Set Featured Posts**: Mark important posts as featured
6. **SEO Review**: Ensure descriptions and keywords are optimal

## Troubleshooting

### No Posts Found
- Check if the website structure has changed
- Verify the sitemap URL is correct
- Try running the specific post migrator with a known URL

### Images Not Downloading
- Check the image URLs in `image-url.txt`
- Download manually and save as `hero.jpg`
- Some images may be behind authentication

### Content Missing
- The scripts focus on metadata extraction
- Full content may need manual copying
- Check the original post for complete content

## Manual Content Addition

If the automatic migration doesn't capture all content:

1. Visit the original post
2. Copy the main article content
3. Edit the migrated markdown file
4. Format using markdown syntax
5. Add any additional images

## Example Migrated Post Structure

```
content/blog/
└── example-post-slug/
    ├── index.md          # The blog post content
    ├── hero.jpg          # Main image
    └── image-url.txt     # (Only if image download failed)
```

## Notes

- The scripts are respectful to the server (includes delays)
- Original URLs are preserved in the markdown files
- Migration notes are added as HTML comments
- All posts are initially set as non-featured
- Tags are auto-generated based on content keywords

For any issues or improvements, please update these scripts and documentation.