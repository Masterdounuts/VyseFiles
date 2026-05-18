#!/bin/bash
# Recurrence Detector - Auto-check for recurring mistakes
# Runs every heartbeat (30 min)

WORKSPACE="$HOME/.openclaw/workspace-vyse"
STATE_DIR="$HOME/.openclaw/skill-state/recurrence-detector"
THRESHOLD=3
DAYS_BACK=7

mkdir -p "$STATE_DIR"

# Query errors from Notion (last 7 days)
echo "Checking for recurring patterns..."
ERRORS=$(node "$WORKSPACE/composio-notion.cjs" query errors 7 2>/dev/null)

if [ -z "$ERRORS" ] || [ "$ERRORS" = "[]" ]; then
    echo "No errors found in last 7 days"
    exit 0
fi

# Extract patterns from errors
# Format: each line is "timestamp: error_message"
echo "$ERRORS" | while read line; do
    # Simple keyword extraction
    echo "$line" | grep -oE "forgot|wrong|stale|same|again|recurring" || true
done | sort | uniq -c | sort -rn | while read count keyword; do
    if [ "$count" -ge "$THRESHOLD" ]; then
        echo "⚠️ PATTERN DETECTED: $keyword (x$count)"
        echo "$keyword:count=$count" >> "$STATE_DIR/detected.txt"
    fi
done

# If patterns detected, trigger auto-fix
if [ -s "$STATE_DIR/detected.txt" ]; then
    echo "Triggering auto-fix for recurring patterns..."
    # Log that we're auto-fixing
    node "$WORKSPACE/composio-notion.cjs" log-knowledge "recurrence-detector" --insight="Auto-fix triggered for patterns: $(cat $STATE_DIR/detected.txt)"
fi

echo "Recurrence check complete"