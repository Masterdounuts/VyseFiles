#!/bin/bash
# Check Pending Volatile Opportunities
# Run by main agent to review and approve alerts

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
PENDING="$AGENT_DIR/pending-opportunities.json"
LOG="$AGENT_DIR/trading.log"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [CONFER] $1" | tee -a "$LOG"
}

log "=== Checking Pending Opportunities ==="

# Check if pending file has content
if [ ! -s "$PENDING" ] || [ "$(cat "$PENDING")" = "[]" ]; then
    log "No pending opportunities"
    exit 0
fi

# Check each pending opportunity
# Format: {"timestamp": "...", "symbol": "...", "price": "...", "direction": "...", "change": "...", "type": "VOLATILE_OPPORTUNITY", "status": "PENDING_REVIEW"}

log "Found pending opportunities - outputting for main agent review"
cat "$PENDING"

exit 0