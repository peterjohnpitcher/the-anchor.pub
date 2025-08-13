#\!/bin/bash

echo "Applying priority labels to issues..."

# P0 Critical
gh issue edit 62 --add-label "P0-Critical"
gh issue edit 64 --add-label "P0-Critical"

# P1 High  
gh issue edit 63 --add-label "P1-High"
gh issue edit 61 --add-label "P1-High"

# P2 Medium
gh issue edit 59 --add-label "P2-Medium"

# P3 Low
gh issue edit 52 --add-label "P3-Low"
gh issue edit 27 --add-label "P3-Low"
gh issue edit 5 --add-label "P3-Low"

echo "Labels applied successfully."
