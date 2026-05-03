#!/bin/bash
# Show daily log entries for a specific day
# Usage: memory-daily.sh <YYYY-MM-DD>

MEMORY_DIR="/home/openclaw/.openclaw/workspace-vyse/memory"

if [ -z "$1" ]; then
    echo "Usage: memory-daily.sh <YYYY-MM-DD>"
    echo ""
    echo "Available days:"
    ls "$MEMORY_DIR/daily/" 2>/dev/null | grep -oE '2026-[0-9]{2}-[0-9]{2}'
    ls "$MEMORY_DIR/"*.md 2>/dev/null | grep -oE '2026-[0-9]{2}-[0-9]{2}' | head -5
    exit 1
fi

DAY="$1"

# Check daily folder first
if [ -f "$MEMORY_DIR/daily/${DAY}.md" ]; then
    echo "=== $DAY (daily) ==="
    head -30 "$MEMORY_DIR/daily/${DAY}.md"
elif [ -f "$MEMORY_DIR/${DAY}.md" ]; then
    echo "=== $DAY (root) ==="
    head -30 "$MEMORY_DIR/${DAY}.md"
else
    echo "No log found for $DAY"
    exit 1
fi
