#!/usr/bin/env python3
"""
Smart Image Renaming for The Anchor Pub
Handles all image types with SEO-optimized names
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

# Configuration
SOURCE_DIR = "/Users/peterpitcher/Cursor/the-anchor.pub/assets/images/events"
DEST_BASE = "/Users/peterpitcher/Cursor/the-anchor.pub/assets/images/seo-optimized"

# Create destination structure
CATEGORIES = {
    "drag-shows": "Drag Shows & LGBTQ+ Events",
    "tequila-tasting": "Tequila & Spirits Events", 
    "bingo": "Cash Bingo Nights",
    "british-celebrations": "British & Patriotic Events",
    "karaoke": "Karaoke Nights",
    "quiz-nights": "Quiz Nights",
    "general-events": "General Events",
    "venue-atmosphere": "Venue & Atmosphere"
}

for cat in CATEGORIES:
    os.makedirs(os.path.join(DEST_BASE, cat), exist_ok=True)

class ImageRenamer:
    def __init__(self):
        self.counters = {cat: 1 for cat in CATEGORIES}
        self.processed = []
        
    def get_nikki_name(self, number):
        """Generate varied names for Nikki Manfadge drag show images"""
        templates = [
            "the-anchor-stanwell-moor-drag-show-nikki-manfadge-performance-{:03d}",
            "the-anchor-heathrow-drag-queen-entertainment-nikki-sparkles-{:03d}",
            "the-anchor-pub-lgbtq-friendly-drag-cabaret-stanwell-moor-{:03d}",
            "the-anchor-drag-bingo-nikki-manfadge-near-heathrow-{:03d}",
            "the-anchor-stanwell-moor-pride-friendly-pub-drag-show-{:03d}",
            "the-anchor-pub-drag-entertainment-saturday-night-heathrow-{:03d}",
            "the-anchor-inclusive-pub-drag-performance-stanwell-moor-{:03d}",
            "the-anchor-near-me-drag-queen-show-nikki-manfadge-{:03d}"
        ]
        # Rotate through templates to avoid too many similar names
        template = templates[(number - 1) % len(templates)]
        return template.format(number) + ".jpg"
    
    def get_tequila_name(self, number):
        """Generate varied names for tequila tasting images"""
        templates = [
            "the-anchor-stanwell-moor-tequila-tasting-event-setup-{:03d}",
            "the-anchor-heathrow-premium-tequila-selection-night-{:03d}",
            "the-anchor-pub-spirits-tasting-experience-stanwell-moor-{:03d}",
            "the-anchor-tequila-masterclass-near-heathrow-airport-{:03d}",
            "the-anchor-stanwell-moor-agave-spirits-tasting-event-{:03d}",
            "the-anchor-pub-tequila-night-premium-brands-surrey-{:03d}",
            "the-anchor-mexican-spirits-tasting-stanwell-moor-pub-{:03d}",
            "the-anchor-near-me-tequila-education-experience-{:03d}"
        ]
        template = templates[(number - 1) % len(templates)]
        return template.format(number) + ".jpg"
    
    def categorize_uuid_image(self, filename):
        """Attempt to categorize UUID-named images based on patterns"""
        # Map specific known UUIDs to categories
        known_mappings = {
            "C6DF23AC-98EF-46CE-978C-343D8EF5A2C8": ("bingo", "the-anchor-stanwell-moor-monthly-cash-bingo-winner-celebration.jpg"),
            # Add more specific mappings as identified
        }
        
        uuid_part = filename.split('_')[0].split('.')[0]
        if uuid_part in known_mappings:
            return known_mappings[uuid_part]
        
        # Default categorization for unknown UUIDs
        # These would need manual review
        return "general-events", None
    
    def process_image(self, filename):
        """Process a single image file"""
        source_path = os.path.join(SOURCE_DIR, filename)
        
        # Skip non-image files
        if not filename.lower().endswith(('.jpeg', '.jpg', '.heic', '.png')):
            return
        
        # Determine category and new name
        category = None
        new_name = None
        
        # Nikki Manfadge series
        if filename.startswith("Nikki Manfadge"):
            match = re.match(r"Nikki Manfadge - (\d+)\.", filename)
            if match:
                number = int(match.group(1))
                category = "drag-shows"
                new_name = self.get_nikki_name(number)
        
        # Tequila Tasting series
        elif filename.startswith("Tequila Tasting Night"):
            match = re.match(r"Tequila Tasting Night - (\d+)\.", filename)
            if match:
                number = int(match.group(1))
                category = "tequila-tasting"
                new_name = self.get_tequila_name(number)
        
        # UUID-style names
        elif re.match(r"[A-F0-9]{8}-[A-F0-9]{4}", filename.upper()):
            category, new_name = self.categorize_uuid_image(filename)
            if not new_name:
                new_name = f"the-anchor-pub-event-stanwell-moor-{self.counters[category]:03d}.jpg"
                self.counters[category] += 1
        
        # Default handling
        else:
            category = "general-events"
            new_name = f"the-anchor-stanwell-moor-pub-event-{self.counters[category]:03d}.jpg"
            self.counters[category] += 1
        
        # Copy file with new name
        if category and new_name:
            dest_path = os.path.join(DEST_BASE, category, new_name)
            
            # Ensure unique filenames
            if os.path.exists(dest_path):
                base, ext = os.path.splitext(new_name)
                counter = 2
                while os.path.exists(dest_path):
                    new_name = f"{base}-v{counter}{ext}"
                    dest_path = os.path.join(DEST_BASE, category, new_name)
                    counter += 1
            
            print(f"Processing: {filename} -> {category}/{new_name}")
            shutil.copy2(source_path, dest_path)
            
            self.processed.append({
                "original": filename,
                "category": category,
                "new_name": new_name
            })
    
    def generate_report(self):
        """Generate a report of all renamed images"""
        report_path = os.path.join(DEST_BASE, "renaming-report.txt")
        with open(report_path, "w") as f:
            f.write("IMAGE RENAMING REPORT\n")
            f.write(f"Generated: {datetime.now()}\n")
            f.write("=" * 80 + "\n\n")
            
            for cat in CATEGORIES:
                cat_images = [p for p in self.processed if p["category"] == cat]
                if cat_images:
                    f.write(f"\n{CATEGORIES[cat]} ({len(cat_images)} images)\n")
                    f.write("-" * 40 + "\n")
                    for img in cat_images[:10]:  # Show first 10 as examples
                        f.write(f"  {img['new_name']}\n")
                    if len(cat_images) > 10:
                        f.write(f"  ... and {len(cat_images) - 10} more\n")
            
            f.write(f"\n\nTotal images processed: {len(self.processed)}\n")
        
        print(f"\nReport saved to: {report_path}")

def main():
    """Main execution"""
    renamer = ImageRenamer()
    
    # Get all files in source directory
    files = os.listdir(SOURCE_DIR)
    total = len([f for f in files if f.lower().endswith(('.jpeg', '.jpg', '.heic', '.png'))])
    
    print(f"Found {total} images to process\n")
    
    # Process each file
    for filename in sorted(files):
        renamer.process_image(filename)
    
    # Generate report
    renamer.generate_report()
    
    print(f"\n✅ Successfully processed {len(renamer.processed)} images!")
    print(f"📁 Check {DEST_BASE} for your SEO-optimized images")
    print("\n🎯 Next steps:")
    print("1. Review the categorized images")
    print("2. Select the best from each category")
    print("3. Square crop to 1:1 ratio")
    print("4. Run image optimization")

if __name__ == "__main__":
    main()