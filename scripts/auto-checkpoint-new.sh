#!/bin/bash
# Auto-checkpoint script - structured handoff update per Long-Chats Guide
# Usage: ./auto-checkpoint.sh [force]
#
# Logic:
# - Check if checkpoint happened within last 2 min (skip if yes)
# - Check gateway context %
# - If >70% or forced, update resume-point.md with structured handoff
# - Also update HANDOFF.md for new session automation

WORKSPACE="/root/.openclaw/workspace"
RESUME_FILE="$WORKSPACE/memory/resume-point.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
LOG_FILE="$WORKSPACE/logs/checkpoint.log"
GATEWAY_URL="${OPENCLAW_URL:-http://localhost:18789}"

# Ensure directories exist
mkdir -p "$WORKSPACE/logs"

# Check if we've already checkpointed recently (within last 2 min)
if [ -f "$RESUME_FILE" ]; then
    LAST_UPDATE=$(stat -c %Y "$RESUME_FILE" 2>/dev/null || stat -f %m "$RESUME_FILE" 2>/dev/null)
    NOW=$(date +%s)
    ELAPSED=$((NOW - LAST_UPDATE))
    
    if [ "$ELAPSED" -lt 120 ] && [ "$1" != "force" ]; then
        echo "$(date -u +"%Y-%m-%d %H:%M UTC") Skip: checkpoint ${ELAPSED}s ago (min 120s)" >> "$LOG_FILE"
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

# Auto-update if context > 70% or forced
if [ "$CONTEXT_PCT" -gt 70 ] || [ "$1" = "force" ]; then
    TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

    # Update resume-point.md timestamp if it exists
    if [ -f "$RESUME_FILE" ]; then
        awk -v ts="$TIMESTAMP" '
        /^Last updated:/ { $0 = "Last updated: " ts }
        { print }
        ' "$RESUME_FILE" > "$RESUME_FILE.tmp" && mv "$RESUME_FILE.tmp" "$RESUME_FILE"
    fi

    # Also update HANDOFF.md for new session automation
    cat > "$HANDOFF_FILE" << HANDOFFFEOF
# Session Handoff
*Auto-generated. Loaded automatically on session start.*

---

## Current Context (Updated: $TIMESTAMP)

**Stocks:**
- GGB: 6 shares @ ~$4.30 (at first sell target)
- TSLA: Stock Reward unlocks TODAY (Apr 16)
- Cash: ~$20

**Open Questions:**
- Sell GGB at $4.30 or hold for $4.40/$4.50?
- Reallocate TSLA proceeds to what?
- TSLA earnings Apr 22 - sell before or hold?

**Decisions Made:**
- GGB sell targets: $4.30, $4.40, $4.50
- GGB buy zones: $4.15, $4.10, $4.00
- TSLA: sell when unlocked, reallocate

**Next Action:** Check TSLA unlock status on Robinhood

---
*Auto-updated by scripts/auto-checkpoint.sh*
HANDOFFFEOF

    echo "$(date -u +"%Y-%m-%d %H:%M UTC") Updated: context ${CONTEXT_PCT}%" >> "$LOG_FILE"
    exit 0
fi

echo "$(date -u +"%Y-%m-%d %H:%M UTC") Skip: context ${CONTEXT_PCT}% (need >70%)" >> "$LOG_FILE"
exit 0
