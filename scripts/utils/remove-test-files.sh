#!/bin/bash

# Remove test files from components/ui
rm -rf /Users/peterpitcher/Cursor/the-anchor.pub/components/ui/overlays/__tests__
rm -rf /Users/peterpitcher/Cursor/the-anchor.pub/components/ui/primitives/__tests__
rm -rf /Users/peterpitcher/Cursor/the-anchor.pub/components/ui/navigation/__tests__
rm -rf /Users/peterpitcher/Cursor/the-anchor.pub/components/ui/layout/__tests__
rm -rf /Users/peterpitcher/Cursor/the-anchor.pub/components/ui/feedback/__tests__

# Remove jest configuration files
rm -f /Users/peterpitcher/Cursor/the-anchor.pub/jest.config.js
rm -f /Users/peterpitcher/Cursor/the-anchor.pub/jest.setup.js

# Remove test utils
rm -rf /Users/peterpitcher/Cursor/the-anchor.pub/lib/test-utils

echo "Test files removed successfully"