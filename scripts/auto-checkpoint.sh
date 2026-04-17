#!/bin/bash
# Auto-checkpoint script - structured handoff update per Long-Chats Guide
# Usage: ./auto-checkpoint.sh [force]
#
# Logic:
# - Check if checkpoint happened within last 2 min (skip if yes)
# - Check gateway context %
# - If >70% or forced, update resume-point.md with structured handoff

WORKSPACE="/home/openclaw/.openclaw/workspace"
RESUME_FILE="$WORKSPACE/memory/resume-point.md"
LOG_FILE="$WORKSPACE/logs/checkpoint.log"
GATEWAY_URL="${OPENCLAW_URL:-http://localhost:18789}"

# Ensure directories exist
mkdir -p "$WORKSPACE/logs"

# Create resume-point.md if missing (robustness fix)
if [ ! -f "$RESUME_FILE" ]; then
    cat > "$RESUME_FILE" << 'EOF'
# Resume Point - Mid-Conversation Checkpoint

*Structured handoff per Long-Chats Guide. Update before context hits 80%.*
*Target: Keep under 200-300 words. Move details to files.*

---
## Structured Handoff

**Goal:**  
[What we're working toward]

**Current Status:**  
[Where we left off - stocks, systems, discussions]

**Decisions Already Made (3-5 bullets):**
- 
- 
- 

**Open Questions (max 3):**
- 
- 
- 

**Constraints:**
[Budget/time/tools/limits]

**Exact Next Action:**
[One specific thing to do now]

**What I'm NOT Assuming (fresh context):**
- [What changed since last session - e.g., prices, credits, decisions]

---

## Quick Recall (DO NOT EDIT - auto-updated)

Last updated: 2026-01-01 00:00 UTC

### Stocks
- GGB: X shares @ $Y
- TSLA: Stock Reward pending

### Infrastructure
- [Status]

### API Credits
- Status: CHECK session_status

---
*Auto-updated by scripts/auto-checkpoint.sh (every 2 min when >70% context)*
EOF
    echo "$(date -u +"%Y-%m-%d %H:%M UTC") Created new resume-point.md" >> "$LOG_FILE"
fi

# Check if we've already checkpointed recently (within last 2 min)
LAST_UPDATE=$(stat -c %Y "$RESUME_FILE" 2>/dev/null || stat -f %m "$RESUME_FILE" 2>/dev/null)
NOW=$(date +%s)
ELAPSED=$((NOW - LAST_UPDATE))

if [ "$ELAPSED" -lt 120 ] && [ "$1" != "force" ]; then
    echo "$(date -u +"%Y-%m-%d %H:%M UTC") Skip: checkpoint ${ELAPSED}s ago (min 120s)" >> "$LOG_FILE"
    exit 0
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

    # Update only the timestamp and quick recall section (lines 30-40)
    # Keep the structured handoff section intact for user to fill
    awk -v ts="$TIMESTAMP" '
    /^Last updated:/ { $0 = "Last updated: " ts }
    { print }
    ' "$RESUME_FILE" > "$RESUME_FILE.tmp" && mv "$RESUME_FILE.tmp" "$RESUME_FILE"

    echo "$(date -u +"%Y-%m-%d %H:%M UTC") Updated: context ${CONTEXT_PCT}%" >> "$LOG_FILE"
    exit 0
fi

echo "$(date -u +"%Y-%m-%d %H:%M UTC") Skip: context ${CONTEXT_PCT}% (need >70%)" >> "$LOG_FILE"
exit 0
