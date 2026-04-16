#!/usr/bin/env bash
# Arvo Flow — apply & deploy bootstrap.
# Run from the repo root inside your Codespace:  bash _patches/apply.sh
set -euo pipefail

EXPECTED_MD5="5707179407c0d07c79504ac3a4d2f5ad"  # md5(all-patches.tar.gz)
CHUNK_DIR="_patches/chunks"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "[1/7] Reassembling tarball from 7 chunks…"
cat "$CHUNK_DIR"/chunk_00.txt "$CHUNK_DIR"/chunk_01.txt "$CHUNK_DIR"/chunk_02.txt \
    "$CHUNK_DIR"/chunk_03.txt "$CHUNK_DIR"/chunk_04.txt "$CHUNK_DIR"/chunk_05.txt \
    "$CHUNK_DIR"/chunk_06.txt > "$WORK/all.b64"

base64 -d "$WORK/all.b64" > "$WORK/all-patches.tar.gz"
ACTUAL_MD5=$(md5sum "$WORK/all-patches.tar.gz" | awk '{print $1}')
echo "     md5 actual:   $ACTUAL_MD5"
echo "     md5 expected: $EXPECTED_MD5"
if [ "$ACTUAL_MD5" != "$EXPECTED_MD5" ]; then
  echo "     ERROR: md5 mismatch — chunks corrupted. Aborting."
  exit 1
fi

echo "[2/7] Extracting patches…"
tar xzf "$WORK/all-patches.tar.gz" -C "$WORK"
ls "$WORK"/*.patch

echo "[3/7] Checking git tree is clean…"
if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: working tree not clean. Commit or stash first."
  exit 1
fi

echo "[4/7] Applying patches via git am…"
git am "$WORK"/0001-*.patch "$WORK"/0002-*.patch "$WORK"/0003-*.patch

echo "[5/7] Removing chunks + this script from tree…"
git rm -rf "$CHUNK_DIR" _patches/apply.sh 2>/dev/null || true
git commit -m "Clean up patch transport artifacts" 2>/dev/null || true

echo "[6/7] Pushing branch…"
git push -u origin "$(git branch --show-current)"

echo "[7/7] Installing deps + deploying to gh-pages…"
if [ ! -d node_modules ]; then npm install; fi
npm run deploy

echo
echo "✓ Done. Live at https://arvo-flow.github.io/ (wait ~30s for gh-pages cache)."
echo "  3 new commits on $(git branch --show-current)."
