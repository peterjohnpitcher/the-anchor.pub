#!/usr/bin/env python3
"""
Image Renaming Script for The Anchor Pub
Renames images with SEO-optimized filenames
"""

import os
import shutil
from pathlib import Path
import re

# Base directory for images
BASE_DIR = "/Users/peterpitcher/Cursor/the-anchor.pub/assets/images/events"
OUTPUT_DIR = "/Users/peterpitcher/Cursor/the-anchor.pub/assets/images/renamed"

# Create output directories
os.makedirs(OUTPUT_DIR, exist_ok=True)
for subdir in ["drag-shows", "tequila-tasting", "bingo", "british-celebrations", "karaoke", "general"]:
    os.makedirs(os.path.join(OUTPUT_DIR, subdir), exist_ok=True)

# Mapping of image patterns to SEO-friendly names
RENAME_MAPPINGS = {
    # Nikki Manfadge Drag Shows
    r"Nikki Manfadge - (\d+)\.jpeg": {
        "category": "drag-shows",
        "base_name": "the-anchor-stanwell-moor-drag-show-nikki-manfadge-heathrow-{:03d}.jpg",
        "variants": [
            "the-anchor-pub-drag-entertainment-nikki-manfadge-stanwell-moor-{:03d}.jpg",
            "the-anchor-heathrow-drag-queen-show-nikki-manfadge-{:03d}.jpg",
            "the-anchor-stanwell-moor-lgbtq-friendly-pub-drag-show-{:03d}.jpg",
            "the-anchor-pub-near-heathrow-drag-bingo-nikki-manfadge-{:03d}.jpg",
            "the-anchor-drag-cabaret-entertainment-stanwell-moor-{:03d}.jpg"
        ]
    },
    
    # Tequila Tasting Events
    r"Tequila Tasting Night - (\d+)\.jpeg": {
        "category": "tequila-tasting",
        "base_name": "the-anchor-stanwell-moor-tequila-tasting-event-heathrow-{:03d}.jpg",
        "variants": [
            "the-anchor-pub-tequila-night-spirits-tasting-stanwell-moor-{:03d}.jpg",
            "the-anchor-heathrow-tequila-event-premium-spirits-{:03d}.jpg",
            "the-anchor-stanwell-moor-tequila-masterclass-pub-{:03d}.jpg",
            "the-anchor-pub-near-me-tequila-tasting-experience-{:03d}.jpg"
        ]
    },
    
    # Cash Bingo
    r"C6DF23AC-98EF-46CE-978C-343D8EF5A2C8\.jpeg": {
        "category": "bingo",
        "base_name": "the-anchor-stanwell-moor-cash-bingo-winner-monthly-event.jpg"
    },
    
    # British Celebrations (Union Jack decorations)
    "british_celebration": {
        "category": "british-celebrations", 
        "patterns": [
            "the-anchor-stanwell-moor-jubilee-celebration-british-pub-{:03d}.jpg",
            "the-anchor-heathrow-british-pub-union-jack-party-{:03d}.jpg",
            "the-anchor-pub-patriotic-event-stanwell-moor-village-{:03d}.jpg",
            "the-anchor-traditional-british-pub-celebration-heathrow-{:03d}.jpg"
        ]
    }
}

def get_seo_name(filename, index=1):
    """Generate SEO-friendly filename based on content type"""
    
    # Check for specific patterns
    for pattern, config in RENAME_MAPPINGS.items():
        if pattern == "british_celebration":
            continue
            
        match = re.match(pattern, filename)
        if match:
            if "variants" in config and index <= len(config["variants"]):
                # Use variants for different images to avoid duplicate names
                variant_index = (int(match.group(1)) - 1) % len(config["variants"])
                return config["category"], config["variants"][variant_index].format(int(match.group(1)))
            else:
                return config["category"], config["base_name"].format(int(match.group(1)))
    
    # For UUID-style names, categorize based on visual inspection results
    if re.match(r"[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}", filename.upper()):
        # These need manual categorization based on content
        # For now, put in general category
        return "general", f"the-anchor-pub-event-stanwell-moor-{index:03d}.jpg"
    
    return "general", filename

def main():
    """Main renaming function"""
    
    # Counter for general images
    general_counter = 1
    
    # Process all images
    for filename in os.listdir(BASE_DIR):
        if filename.lower().endswith(('.jpeg', '.jpg', '.heic')):
            source_path = os.path.join(BASE_DIR, filename)
            
            # Get SEO-friendly name
            category, new_name = get_seo_name(filename, general_counter)
            
            # Create destination path
            dest_path = os.path.join(OUTPUT_DIR, category, new_name)
            
            # Copy file with new name
            print(f"Renaming: {filename} -> {category}/{new_name}")
            shutil.copy2(source_path, dest_path)
            
            if category == "general":
                general_counter += 1

    print("\nRenaming complete! Check the 'renamed' directory for your SEO-optimized images.")
    print("\nNext steps:")
    print("1. Review the renamed images")
    print("2. Select the best 10-20 from each category")
    print("3. Square crop to 1:1 ratio")
    print("4. Optimize file sizes")
    print("5. Generate WebP versions")

if __name__ == "__main__":
    main()