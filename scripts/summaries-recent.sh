#!/bin/bash
# Show recent session summaries
# Usage: summaries-recent.sh [count]

MEMORY_DIR="/home/openclaw/.openclaw/workspace-vyse/memory"
COUNT="${1:-7}"

echo "=== Recent Session Summaries ==="
echo ""

for file in $(ls -t "$MEMORY_DIR/daily/"*-summary.md 2>/dev/null | head -$COUNT); do
    echo "--- $(basename $file .md) ---"
    grep -A5 "## Summary" "$file" | head -3
    echo ""
done
