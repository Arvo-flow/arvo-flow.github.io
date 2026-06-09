#!/bin/bash
set -e
cd "$(git rev-parse --show-toplevel)"
echo "Applying UI redesign patch..."
git apply _patches/ui-redesign.patch
echo "Patch applied successfully!"
git add src/App.js
git commit -m "Add 3-version UI switcher via ?v= URL parameter"
echo "Cleaning up patch files..."
rm -rf _patches _scripts
git add -A
git commit -m "Clean up patch transport artifacts"
echo "Done! Now run: npm run build && npm run deploy"
