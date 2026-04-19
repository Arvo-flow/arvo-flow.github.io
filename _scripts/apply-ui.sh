#!/bin/bash
set -e
cd "$(git rev-parse --show-toplevel)"
echo "Decoding bundle..."
cat _patches/changes.bundle.b64 | base64 -d > /tmp/changes.bundle
echo "Verifying bundle..."
git bundle verify /tmp/changes.bundle
echo "Fetching from bundle..."
git fetch /tmp/changes.bundle HEAD
echo "Cherry-picking UI changes..."
git config user.name "Arvo Flow CI"
git config user.email "arvoflow@gmail.com"
git cherry-pick FETCH_HEAD --no-edit
echo "Cleaning up transport files..."
rm -rf _patches _scripts
rm -f .github/workflows/apply-bundle.yml .github/workflows/apply-ui-patch.yml
git add -A
git commit -m "Clean up patch transport artifacts"
echo ""
echo "Done! UI redesign applied. Now run:"
echo "  npm run build && npm run deploy"
