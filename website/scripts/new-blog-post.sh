#!/bin/bash

# Script to create a new blog post with the correct structure
# Usage: ./scripts/new-blog-post.sh "my-blog-post-slug"

if [ -z "$1" ]; then
    echo "Error: Please provide a slug for your blog post"
    echo "Usage: ./scripts/new-blog-post.sh \"my-blog-post-slug\""
    exit 1
fi

SLUG=$1
BLOG_DIR="content/blog/$SLUG"

# Check if directory already exists
if [ -d "$BLOG_DIR" ]; then
    echo "Error: Blog post with slug '$SLUG' already exists"
    exit 1
fi

# Create the blog directory
mkdir -p "$BLOG_DIR"

# Copy the template
cp content/blog/TEMPLATE.md "$BLOG_DIR/index.md"

# Create a placeholder for images
cat > "$BLOG_DIR/images-needed.txt" << EOF
IMAGES NEEDED FOR THIS BLOG POST:

1. hero.jpg
   - Main hero image for the blog post
   - Recommended size: 1200x600px minimum
   - Should be eye-catching and relevant to the post

2. image1.jpg (optional)
   - Additional image
   - Recommended size: 800x600px minimum

3. image2.jpg (optional)
   - Additional image
   - Recommended size: 800x600px minimum

3. image3.jpg (optional)
   - Additional image
   - Recommended size: 800x600px minimum

Note: Add these images to this directory before publishing.
Remember to update the images array in index.md if you use fewer images.
EOF

echo "✅ Blog post created successfully!"
echo ""
echo "📁 Location: $BLOG_DIR/"
echo ""
echo "Next steps:"
echo "1. Edit $BLOG_DIR/index.md with your content"
echo "2. Add your images to $BLOG_DIR/"
echo "3. Update the frontmatter with correct information"
echo "4. Run 'npm run build' to test your blog post"
echo ""
echo "📖 See content/blog/README.md for detailed instructions"