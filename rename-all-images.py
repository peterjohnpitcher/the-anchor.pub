#!/usr/bin/env python3
"""
Complete Image Renaming Script for The Anchor Pub
Handles all categories: events, food, drinks, venue, garden, logo
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

# Base directories
BASE_DIR = "/Users/peterpitcher/Cursor/the-anchor.pub/assets/images"
OUTPUT_DIR = "/Users/peterpitcher/Cursor/the-anchor.pub/assets/images/seo-renamed"

# Image categories and their SEO focus
CATEGORIES = {
    "events": {
        "drag-shows": "Drag Shows & LGBTQ+ Entertainment",
        "tequila-tasting": "Tequila & Spirits Tasting Events",
        "bingo": "Cash Bingo Nights",
        "british-celebrations": "British & Patriotic Celebrations",
        "karaoke": "Karaoke Entertainment",
        "quiz-nights": "Pub Quiz Events"
    },
    "food": {
        "mains": "Main Dishes & Traditional Pub Food",
        "pizza": "Stone Baked Pizzas",
        "sunday-roast": "Sunday Roast Dinners",
        "burgers": "Gourmet Burgers",
        "desserts": "Desserts & Sweets"
    },
    "drinks": {
        "draught": "Draught Beers & Ales",
        "cocktails": "Cocktails & Mixed Drinks",
        "wine": "Wine Selection",
        "spirits": "Premium Spirits"
    },
    "venue": {
        "interior": "Interior & Atmosphere",
        "bar-area": "Bar & Service Area",
        "seating": "Restaurant & Seating Areas"
    },
    "garden": {
        "beer-garden": "Beer Garden & Outdoor Space",
        "heathrow-views": "Under Heathrow Flight Path"
    },
    "branding": {
        "logos": "The Anchor Logos & Branding"
    }
}

class CompleteImageRenamer:
    def __init__(self):
        self.create_directories()
        self.processed = []
        self.rename_log = []
        
    def create_directories(self):
        """Create all output directories"""
        for main_cat, subcats in CATEGORIES.items():
            for subcat in subcats:
                os.makedirs(os.path.join(OUTPUT_DIR, main_cat, subcat), exist_ok=True)
    
    def process_events_directory(self):
        """Handle all event images"""
        events_dir = os.path.join(BASE_DIR, "events")
        if not os.path.exists(events_dir):
            return
            
        print("\n📸 Processing EVENT images...")
        
        for filename in os.listdir(events_dir):
            if not filename.lower().endswith(('.jpg', '.jpeg', '.heic', '.png')):
                continue
                
            source = os.path.join(events_dir, filename)
            category = None
            new_name = None
            
            # Nikki Manfadge Drag Shows
            if filename.startswith("Nikki Manfadge"):
                match = re.match(r"Nikki Manfadge - (\d+)", filename)
                if match:
                    num = int(match.group(1))
                    category = "drag-shows"
                    templates = [
                        "the-anchor-stanwell-moor-drag-show-nikki-manfadge-{:03d}",
                        "the-anchor-heathrow-lgbtq-friendly-pub-drag-entertainment-{:03d}",
                        "the-anchor-pub-drag-queen-performance-stanwell-moor-{:03d}",
                        "the-anchor-drag-bingo-nikki-manfadge-near-heathrow-{:03d}"
                    ]
                    new_name = templates[num % len(templates)].format(num) + ".jpg"
            
            # Tequila Tasting
            elif filename.startswith("Tequila Tasting"):
                match = re.match(r"Tequila Tasting Night - (\d+)", filename)
                if match:
                    num = int(match.group(1))
                    category = "tequila-tasting"
                    templates = [
                        "the-anchor-stanwell-moor-tequila-tasting-event-{:03d}",
                        "the-anchor-heathrow-premium-spirits-tasting-{:03d}",
                        "the-anchor-pub-tequila-masterclass-stanwell-moor-{:03d}"
                    ]
                    new_name = templates[num % len(templates)].format(num) + ".jpg"
            
            # Cash Bingo Winner
            elif filename == "C6DF23AC-98EF-46CE-978C-343D8EF5A2C8.jpeg":
                category = "bingo"
                new_name = "the-anchor-stanwell-moor-monthly-cash-bingo-winner.jpg"
            
            # UUID files - need categorization
            elif re.match(r"[A-F0-9]{8}-", filename.upper()):
                # Default to quiz-nights for now (would need manual review)
                category = "quiz-nights"
                new_name = f"the-anchor-pub-event-stanwell-moor-{len(self.processed):03d}.jpg"
            
            if category and new_name:
                dest = os.path.join(OUTPUT_DIR, "events", category, new_name)
                shutil.copy2(source, dest)
                self.rename_log.append(f"Events: {filename} -> {category}/{new_name}")
                print(f"  ✓ {category}: {new_name}")
    
    def process_food_directory(self):
        """Handle food images"""
        food_dir = os.path.join(BASE_DIR, "food")
        if not os.path.exists(food_dir):
            return
            
        print("\n🍕 Processing FOOD images...")
        
        food_names = {
            "0249C5BF-AAB7-488C-91BC-75147F150258": ("mains", "the-anchor-stanwell-moor-traditional-british-pie-gravy.jpg"),
            "4F0FE513-072A-46A4-AF1B-0AA865DC9DAC": ("mains", "the-anchor-pub-main-course-hearty-meal-heathrow.jpg"),
            "585F57AF-AC7A-41D7-8459-1C19FE9A69D8": ("pizza", "the-anchor-stone-baked-pizza-stanwell-moor.jpg"),
            "6B2C2E09-CB23-4DFB-8125-B64AF3E8925F": ("burgers", "the-anchor-gourmet-burger-pub-food-heathrow.jpg"),
            "6B7B6E28-3B87-490F-BE03-2FC369E60C25": ("sunday-roast", "the-anchor-sunday-roast-dinner-stanwell-moor.jpg"),
            "C5FACCEA-EF31-4FE8-BDA2-4514ACF326DF": ("mains", "the-anchor-pub-food-traditional-british-cuisine.jpg"),
            "FC602420-61A5-4CD4-81FE-74D2ECFC9501": ("desserts", "the-anchor-dessert-sweet-treats-stanwell-moor.jpg")
        }
        
        for filename in os.listdir(food_dir):
            if not filename.lower().endswith(('.jpg', '.jpeg', '.heic', '.png')):
                continue
                
            source = os.path.join(food_dir, filename)
            base_name = filename.split('_')[0].split('.')[0]
            
            if base_name in food_names:
                category, new_name = food_names[base_name]
            else:
                category = "mains"
                new_name = f"the-anchor-pub-food-stanwell-moor-{len(self.processed):03d}.jpg"
            
            dest = os.path.join(OUTPUT_DIR, "food", category, new_name)
            shutil.copy2(source, dest)
            self.rename_log.append(f"Food: {filename} -> {category}/{new_name}")
            print(f"  ✓ {category}: {new_name}")
    
    def process_venue_directory(self):
        """Handle venue images"""
        venue_dir = os.path.join(BASE_DIR, "venue")
        if not os.path.exists(venue_dir):
            return
            
        print("\n🏠 Processing VENUE images...")
        
        venue_names = [
            "the-anchor-pub-interior-traditional-british-stanwell-moor",
            "the-anchor-bar-area-local-pub-near-heathrow",
            "the-anchor-restaurant-seating-area-stanwell-moor",
            "the-anchor-pub-atmosphere-welcoming-interior-surrey",
            "the-anchor-venue-private-events-space-heathrow"
        ]
        
        for i, filename in enumerate(os.listdir(venue_dir)):
            if not filename.lower().endswith(('.jpg', '.jpeg', '.heic', '.png')):
                continue
                
            source = os.path.join(venue_dir, filename)
            category = "interior"
            new_name = f"{venue_names[i % len(venue_names)]}.jpg"
            
            dest = os.path.join(OUTPUT_DIR, "venue", category, new_name)
            shutil.copy2(source, dest)
            self.rename_log.append(f"Venue: {filename} -> {category}/{new_name}")
            print(f"  ✓ {category}: {new_name}")
    
    def process_garden_directory(self):
        """Handle garden images"""
        garden_dir = os.path.join(BASE_DIR, "garden")
        if not os.path.exists(garden_dir):
            return
            
        print("\n🌻 Processing GARDEN images...")
        
        for filename in os.listdir(garden_dir):
            if not filename.lower().endswith(('.jpg', '.jpeg', '.heic', '.png')):
                continue
                
            source = os.path.join(garden_dir, filename)
            category = "beer-garden"
            new_name = "the-anchor-beer-garden-under-heathrow-flight-path-stanwell-moor.jpg"
            
            dest = os.path.join(OUTPUT_DIR, "garden", category, new_name)
            shutil.copy2(source, dest)
            self.rename_log.append(f"Garden: {filename} -> {category}/{new_name}")
            print(f"  ✓ {category}: {new_name}")
    
    def process_logo_directory(self):
        """Handle logo images"""
        logo_dir = os.path.join(BASE_DIR, "logo")
        if not os.path.exists(logo_dir):
            return
            
        print("\n🎨 Processing LOGO images...")
        
        logo_mapping = {
            "White Logo Transparent.png": "the-anchor-pub-logo-white-transparent.png",
            "Black Logo Transparent.png": "the-anchor-pub-logo-black-transparent.png"
        }
        
        for filename in os.listdir(logo_dir):
            if filename in logo_mapping:
                source = os.path.join(logo_dir, filename)
                category = "logos"
                new_name = logo_mapping[filename]
                
                dest = os.path.join(OUTPUT_DIR, "branding", category, new_name)
                shutil.copy2(source, dest)
                self.rename_log.append(f"Logo: {filename} -> {category}/{new_name}")
                print(f"  ✓ {category}: {new_name}")
    
    def generate_report(self):
        """Generate comprehensive renaming report"""
        report_path = os.path.join(OUTPUT_DIR, "seo-renaming-report.md")
        
        with open(report_path, "w") as f:
            f.write("# SEO Image Renaming Report\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n")
            
            f.write("## Summary\n")
            f.write(f"- Total images processed: {len(self.rename_log)}\n")
            f.write(f"- Output directory: {OUTPUT_DIR}\n\n")
            
            f.write("## Renaming Log\n")
            for entry in self.rename_log:
                f.write(f"- {entry}\n")
            
            f.write("\n## Next Steps\n")
            f.write("1. Review all renamed images\n")
            f.write("2. Select best 10-20 from each event category\n")
            f.write("3. Square crop all selected images to 1:1 ratio\n")
            f.write("4. Optimize file sizes (target: <200KB)\n")
            f.write("5. Generate WebP versions\n")
            f.write("6. Add alt text based on filenames\n")
        
        print(f"\n📄 Report saved to: {report_path}")
    
    def run(self):
        """Execute all renaming operations"""
        print("🚀 Starting SEO Image Renaming Process")
        print("=" * 50)
        
        self.process_events_directory()
        self.process_food_directory()
        self.process_venue_directory()
        self.process_garden_directory()
        self.process_logo_directory()
        
        self.generate_report()
        
        print("\n✅ COMPLETE! All images have been renamed for SEO")
        print(f"📁 Check: {OUTPUT_DIR}")

if __name__ == "__main__":
    renamer = CompleteImageRenamer()
    renamer.run()