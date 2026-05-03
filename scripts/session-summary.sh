#!/bin/bash
# Session Summary - Quick day summary
# Usage: session-summary.sh "<summary text>"

MEMORY_DIR="/home/openclaw/.openclaw/workspace-vyse/memory"
TODAY=$(date +%Y-%m-%d)
SUMMARY_FILE="$MEMORY_DIR/daily/${TODAY}-summary.md"

if [ -z "$1" ]; then
    echo "Usage: session-summary.sh \"What we worked on today\""
    echo ""
    # Show existing summaries
    echo "Recent summaries:"
    ls "$MEMORY_DIR/daily/"*-summary.md 2>/dev/null | tail -5
    exit 1
fi

SUMMARY="$1"
TIMESTAMP=$(date +"%H:%M")

# Create or update today's summary
echo "# Session Summary - $TODAY

**Last update:** $TIMESTAMP

## Summary
$SUMMARY

---
*Auto-generated from session*" > "$SUMMARY_FILE"

echo "✅ Saved: $SUMMARY_FILE"

# Also update the main ron-memory with latest summary
MEMORY_FILE="$MEMORY_DIR/ron-memory.md"
echo "| vyse:session:$TODAY | $SUMMARY | $TIMESTAMP |" >> "$MEMORY_FILE"

echo ""
echo "Done!"
