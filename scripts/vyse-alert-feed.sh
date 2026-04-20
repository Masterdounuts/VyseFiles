#!/bin/bash
# vyse-alert-feed.sh - Generate alerts JSON for Control UI
# Writes to state/alerts.json

WORKSPACE="/root/.openclaw/workspace"
STATE_DIR="$WORKSPACE/state"
ALERTS_FILE="$STATE_DIR/alerts.json"
STATUS_FILE="$STATE_DIR/status-cache.json"

mkdir -p "$STATE_DIR"

# Try to get context from cached status file first (updated by cron)
CONTEXT_PCT=0
if [ -f "$STATUS_FILE" ]; then
    CONTEXT_PCT=$(grep -oE '"contextPct":[0-9]+' "$STATUS_FILE" | cut -d: -f2)
fi

# If no cached value, try openclaw status with short timeout
if [ -z "$CONTEXT_PCT" ] || [ "$CONTEXT_PCT" = "0" ]; then
    STATUS_OUTPUT=$(timeout 3 openclaw status 2>&1)
    if echo "$STATUS_OUTPUT" | grep -q 'Context:'; then
        CONTEXT_PCT=$(echo "$STATUS_OUTPUT" | grep 'Context:' | grep -oE '[0-9]+%' | head -1 | tr -d '%')
    fi
fi

# Get cron failures (jobs with "error" status) - this is fast
CRON_ERRORS=0
CRON_OUTPUT=$(timeout 3 openclaw cron list 2>&1)
if echo "$CRON_OUTPUT" | grep -qi 'error'; then
    CRON_ERRORS=$(echo "$CRON_OUTPUT" | grep -ci 'error')
fi

# Build alerts JSON
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%MZ")

# Start JSON array
JSON="["

# Alert for high context
if [ -n "$CONTEXT_PCT" ] && [ "$CONTEXT_PCT" -ge 70 ]; then
    JSON="$JSON{\"timestamp\":\"$TIMESTAMP\",\"level\":\"warn\",\"message\":\"Context high: ${CONTEXT_PCT}%. Consider dumping.\"},"
fi

# Alert for context approaching limit (e.g., > 60%)
if [ -n "$CONTEXT_PCT" ] && [ "$CONTEXT_PCT" -ge 60 ]; then
    JSON="$JSON{\"timestamp\":\"$TIMESTAMP\",\"level\":\"info\",\"message\":\"Context at ${CONTEXT_PCT}%.\"},"
fi

# Alert for cron failures
if [ "$CRON_ERRORS" -gt 0 ]; then
    JSON="$JSON{\"timestamp\":\"$TIMESTAMP\",\"level\":\"error\",\"message\":\"${CRON_ERRORS} cron job(s) failing.\"},"
fi

# Close JSON (remove trailing comma if any)
JSON="${JSON%,}"
JSON="$JSON]"

# If empty array, make it empty
if [ "$JSON" = "[]" ]; then
    JSON="[]"
fi

echo "$JSON" > "$ALERTS_FILE"
echo "Alerts written to $ALERTS_FILE"