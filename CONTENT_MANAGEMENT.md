# Content Management Guide

This guide explains how to manage blog posts and menu content.

## Blog System

### Creating a New Blog Post

1. Create a new folder in `/content/blog/` with a URL-friendly name (e.g., `my-new-post`)
2. Inside the folder, create an `index.md` file with the following structure:

```markdown
---
title: "Your Blog Post Title"
description: "A brief description for SEO and previews"
date: "2024-01-20"
author: "Author Name"
keywords:
  - keyword one
  - keyword two
  - keyword three
tags:
  - news
  - events
  - community
featured: true  # Set to true to feature on homepage
hero: "hero.jpg"  # Main hero image filename
images:
  - "image1.jpg"
  - "image2.jpg"
  - "image3.jpg"
---

# Your Blog Content

Write your blog content here using markdown...
```

3. Add images to the same folder:
   - `hero.jpg` - The main hero image (required)
   - Additional images listed in the `images` array will be automatically distributed throughout the content

### Blog Post Guidelines

- **Title**: Keep it engaging and SEO-friendly
- **Description**: 150-160 characters for optimal SEO
- **Keywords**: 3-5 relevant keywords
- **Tags**: Use existing tags when possible for consistency
- **Images**: 
  - Hero image should be at least 1200x630px for social sharing
  - Additional images will be automatically placed throughout the content
  - Use descriptive filenames (e.g., `anchor-pub-garden-view.jpg`)

## Menu Management

Menus are managed via JSON files for better structure and to preserve the beautiful card-based layout.

### Updating Food Menu

Edit `/content/menu/food.json`:

```json
{
  "title": "Food Menu",
  "description": "Traditional British pub food at The Anchor",
  "lastUpdated": "2024-01-20",
  "kitchenHours": {
    "Tuesday to Friday": "6pm-9pm",
    "Saturday": "1pm-7pm",
    "Sunday": "12pm-5pm"
  },
  "specialOffers": [
    {
      "title": "🍕 TUESDAY & WEDNESDAY SPECIAL 🍕",
      "description": "Buy One Get One FREE",
      "highlight": "On ALL Stone-Baked Pizzas"
    }
  ],
  "categories": [
    {
      "id": "mains",
      "title": "Mains",
      "emoji": "🍽️",
      "sections": [
        {
          "title": "Traditional Favourites",
          "style": "grid",  // "grid" for cards, "list" for simple lists
          "items": [
            {
              "name": "Fish & Chips",
              "price": "£14.99",
              "description": "Beer-battered fish with chips",
              "vegetarian": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Updating Drinks Menu

Edit `/content/menu/drinks.json`:

```json
{
  "title": "Drinks Menu",
  "description": "Real ales and premium spirits",
  "lastUpdated": "2024-01-20",
  "categories": [
    {
      "id": "cocktails",
      "title": "Cocktails",
      "emoji": "🍹",
      "sections": [
        {
          "title": "",
          "style": "grid",
          "items": [
            {
              "name": "Espresso Martini",
              "price": "",
              "description": "Vodka, coffee liqueur, fresh espresso"
            }
          ]
        }
      ]
    }
  ]
}
```

### Menu Structure Explained

- **categories**: Main menu sections (e.g., Starters, Mains, Desserts)
  - **id**: Unique identifier for the category
  - **title**: Display name
  - **emoji**: Optional emoji for visual appeal
  - **description**: Optional description for the category
  
- **sections**: Sub-sections within a category
  - **title**: Section heading (leave empty to skip)
  - **style**: 
    - `"grid"` - Beautiful card layout with descriptions
    - `"list"` - Simple list format for items without descriptions
  - **items**: Array of menu items

- **items**: Individual menu items
  - **name**: Item name
  - **price**: Price (use "£9.99 / £12.99" for size options)
  - **description**: Item description (optional for list style)
  - **vegetarian**: Set to `true` to add (V) indicator

### Special Offers

Add special offers that appear prominently:

```json
"specialOffers": [
  {
    "title": "🍕 Pizza Special",
    "description": "Buy One Get One FREE",
    "highlight": "Tuesday & Wednesday only"
  }
]
```

## File Structure

```
/content/
├── blog/
│   ├── example-post/
│   │   ├── index.md      # Blog post content and metadata
│   │   ├── hero.jpg      # Hero image
│   │   ├── image1.jpg    # Additional images
│   │   └── image2.jpg
│   └── another-post/
│       └── index.md
└── menu/
    ├── food.json         # Food menu data
    └── drinks.json       # Drinks menu data
```

## Best Practices

1. **Always test locally** before deploying changes
2. **Validate JSON** - Use a JSON validator to cheque syntax
3. **Optimise images** before uploading (use tools like TinyPNG)
4. **Keep URLs consistent** - once published, avoid changing folder names
5. **Update lastUpdated** when making menu changes
6. **Use consistent formatting** across all content

## Troubleshooting

- **Menu not updating?** Cheque JSON syntax is valid
- **Images not showing?** Ensure filenames match exactly (case-sensitive)
- **Blog post not appearing?** Cheque the date isn't in the future
- **Layout broken?** Verify the `style` property is either "grid" or "list"