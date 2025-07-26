# Manager's Special Promotion System

## Overview
The Manager's Special system automatically rotates monthly promotions based on date ranges. No manual updates required - just add new promotions to the data file.

## How It Works

1. **Date-Based Selection**: The system checks the current UK date/time and selects the active promotion
2. **Automatic Transitions**: Promotions switch at midnight UK time (BST/GMT aware)
3. **No Active Promotion**: If no promotion matches the current date, the Manager's Special section is hidden

## File Structure

```
/content/
  managers-special-promotions.json    # All promotion data
  
/public/images/managers-special/
  july-2025/                         # July promotion images
  august-2025/                       # August promotion images
  september-2025/                    # Future promotions...
  
/lib/
  managers-special-utils.ts          # Server-side utilities
  managers-special-client.ts         # Client-side fetch
```

## Adding New Promotions

### 1. Add Promotion Data
Edit `/content/managers-special-promotions.json`:

```json
{
  "id": "unique-id",
  "startDate": "2025-09-01",
  "endDate": "2025-09-30",
  "imageFolder": "september-2025",
  "active": true,
  "spirit": {
    "name": "Spirit Name",
    "category": "Category",
    "originalPrice": "£X.XX",
    "specialPrice": "£X.XX",
    // ... all spirit details
  },
  "promotion": {
    "headline": "Manager's Special - September",
    "subheadline": "Tagline",
    // ... all promotion details
  }
}
```

### 2. Add Promotion Image
1. Create folder: `/public/images/managers-special/september-2025/`
2. Drop the square image in the folder (any filename works)
3. System automatically detects and uses the first image found

## Key Features

### Timezone Handling
- Uses UK local time (Europe/London)
- Handles BST/GMT transitions automatically
- Promotions change at midnight UK time

### Dynamic Content
- Page metadata updates automatically
- SEO tags reflect current promotion
- All components fetch latest data

### Image Management
- One image per promotion folder
- Any filename accepted (.jpg, .png, .webp, .gif)
- Automatic detection - no configuration needed

## Testing

### Check Current Promotion
```bash
node test-promotion.js
```

### Preview Different Dates
Temporarily modify system date or adjust date ranges in the JSON file

## Components Using the System

1. **Manager's Special Page** (`/drinks/managers-special`)
   - Dynamic metadata
   - Full promotion details
   - 404 if no active promotion

2. **ManagersSpecial Component**
   - Homepage/drinks page widget
   - Fetches via API
   - Hidden if no active promotion

3. **MenuRenderer**
   - Special highlight for manager's special items
   - Links to dedicated page

## API Endpoints

### `/api/managers-special`
Returns current promotion data:
```json
{
  "active": true,
  "promotion": { ... },
  "image": "/images/managers-special/august-2025/image.jpg"
}
```

### `/api/managers-special-image`
Returns just the image path for the current promotion

## Maintenance

### Monthly Tasks
1. Add next month's promotion to JSON
2. Create image folder
3. Add promotion image
4. Test with `node test-promotion.js`

### No Promotion Period
If you need to pause promotions, simply don't add a promotion for that date range. The system will hide all Manager's Special content automatically.

## Troubleshooting

### Promotion Not Showing
1. Check date ranges in JSON
2. Verify `active: true`
3. Check UK time vs promotion dates
4. Run test script

### Image Not Loading
1. Check folder name matches `imageFolder` in JSON
2. Verify image file exists
3. Check file permissions
4. Look for console errors