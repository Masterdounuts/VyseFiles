#!/bin/bash
# Auto-checkpoint script - lightweight timestamp update for resume-point.md
# Usage: ./auto-checkpoint.sh [force]
# 
# Logic:
# - Check if checkpoint happened within last 5 min (skip if yes)
# - Check gateway context %
# - If >70% or forced, update timestamp in resume-point.md

WORKSPACE="/root/.openclaw/workspace"
RESUME_FILE="$WORKSPACE/memory/resume-point.md"
GATEWAY_URL="${OPENCLAW_URL:-http://localhost:18789}"

# Check if we've already checkpointed recently (within last 5 min)
if [ -f "$RESUME_FILE" ]; then
    LAST_UPDATE=$(stat -c %Y "$RESUME_FILE" 2>/dev/null || stat -f %m "$RESUME_FILE" 2>/dev/null)
    NOW=$(date +%s)
    ELAPSED=$((NOW - LAST_UPDATE))
    
    if [ "$ELAPSED" -lt 300 ] && [ "$1" != "force" ]; then
        echo "Skip: checkpoint already done ${ELAPSED}s ago"
        exit 0
    fi
fi

# Check context percentage
CONTEXT_PCT=0
STATUS_RESPONSE=$(curl -s -w "\n%{http_code}" "$GATEWAY_URL/api/session/status" 2>/dev/null)
HTTP_CODE=$(echo "$STATUS_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "200" ]; then
    CONTEXT_PCT=$(echo "$STATUS_RESPONSE" | grep -o '"context":[0-9]*' | grep -o '[0-9]*' | head -1)
fi

# Auto-update timestamp if context > 70% or forced
if [ "$CONTEXT_PCT" -gt 70 ] || [ "$1" = "force" ]; then
    TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
    
    # Simple timestamp update using awk (safer than sed)
    awk -v ts="$TIMESTAMP" '{gsub(/^Last updated:.*/, "Last updated: " ts); print}' "$RESUME_FILE" > "$RESUME_FILE.tmp" && mv "$RESUME_FILE.tmp" "$RESUME_FILE"
    
    echo "Checkpoint updated (context: ${CONTEXT_PCT}%)"
    exit 0
fi

echo "No checkpoint needed (context: ${CONTEXT_PCT}%)"
exit 0