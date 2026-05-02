#!/bin/bash
# Memory Find - Quick search across all memory
# Usage: memory-find.sh <search term>

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
QUERY="$1"

if [ -z "$QUERY" ]; then
    echo "Usage: memory-find.sh <search term>"
    echo "Searches: core/, daily/, archive/"
    exit 1
fi

echo "🔍 Searching for: $QUERY"
echo "================================"

# Search each area
echo ""
echo "=== Core Memory ==="
grep -i "$QUERY" "$WORKSPACE/memory/core/"*.md 2>/dev/null | head -5

echo ""
echo "=== Daily Memory ==="
grep -i "$QUERY" "$WORKSPACE/memory/daily/"*.md 2>/dev/null | head -10

echo ""
echo "=== Archive ==="
grep -i "$QUERY" "$WORKSPACE/memory/archive/"*.md 2>/dev/null | head -5

echo ""
echo "Done!"