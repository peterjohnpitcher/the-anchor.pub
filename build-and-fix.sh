#!/bin/bash
cd /Users/peterpitcher/Cursor/the-anchor.pub
echo "Running build..."
npm run build 2>&1 | tee build-output.txt
echo "Build complete. Check build-output.txt for results."