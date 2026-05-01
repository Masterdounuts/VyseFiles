#!/bin/bash
# Auto-update my status file - called from workflow
WORKSPACE="/root/.openclaw/workspace"
STATUS_FILE="$WORKSPACE/.vyse-status.md"

# Read current context level
CONTEXT_PCT=$(curl -s http://127.0.0.1:18789/api/session/status 2>/dev/null | grep -o '"context":[0-9]*' | grep -o '[0-9]*' | head -1)
CONTEXT_PCT=${CONTEXT_PCT:-0}

# Check heartbeat
ALIVE_FILE="$WORKSPACE/.vyse-alive"
if [ -f "$ALIVE_FILE" ]; then
    LAST_ALIVE=$(cat "$ALIVE_FILE")
    NOW=$(date +%s)
    ALIVE_SEC=$((NOW - LAST_ALIVE))
    if [ "$ALIVE_SEC" -lt 120 ]; then
        HEARTBEAT="🟢 OK (${ALIVE_SEC}s ago)"
    else
        HEARTBEAT="⚠️ STALE (${ALIVE_SEC}s ago)"
    fi
else
    HEARTBEAT="❌ MISSING"
fi

# Read active work if exists
ACTIVE_TASK="None"
if [ -f "$WORKSPACE/active.md" ]; then
    ACTIVE_TASK=$(head -5 "$WORKSPACE/active.md" | grep -v "^#" | head -1)
    ACTIVE_TASK="${ACTIVE_TASK:0:60}"
fi

# Write status
cat > "$STATUS_FILE" << EOF
# Vyse Status (Auto-Updated)

**Last Updated:** $(date -u +%Y-%m-%dT%H:%M:%SZ)
**Heartbeat:** $HEARTBEAT
**Context:** ${CONTEXT_PCT}%
**Working on:** $ACTIVE_TASK

✅ Autonomous status - updates every action
EOF

# Also update lightweight JSON for Control UI
JSON_FILE="$WORKSPACE/state/control-ui.json"
if [ -f "$JSON_FILE" ]; then
    # Read pending tasks from PENDING. md if exists
    PENDING_TASKS=$(cat "$WORKSPACE/PENDING.md" 2>/dev/null | grep -E '^\- \[ \]' | head -5 | sed 's/- \[ \] //' | tr '\n' ',' | sed 's/,$//')
    if [ -z "$PENDING_TASKS" ]; then
        PENDING_TASKS="[]"
    else
        PENDING_TASKS="[\"$(echo "$PENDING_TASKS" | sed 's/,/\",\"/g' | sed 's/ /\\ /g' )\"]"
    fi
    
    # Determine status
    if [ "$ACTIVE_TASK" != "None" ]; then
        STATUS="WORKING"
    else
        STATUS="IDLE"
    fi
    
    # Update JSON using jq if available
    if command -v jq &> /dev/null; then
        jq --arg status "$STATUS" --arg task "$ACTIVE_TASK" --arg context "${CONTEXT_PCT}%" --argjson pending "$PENDING_TASKS" '.vyse.status=$status | .vyse.current_task=$task | .vyse.context_pct=$context | .vyse.pending=$pending | .vyse.last_updated=now | .vyse.last_updated |= strftime("%Y-%m-%dT%H:%M:%SZ")' "$JSON_FILE" > "${JSON_FILE}.tmp" && mv "${JSON_FILE}.tmp" "$JSON_FILE"
    else
        # Fallback: just update timestamp
        sed -i "s/\"last_updated\": \"[^\"]*\"/\"last_updated\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"/" "$JSON_FILE"
    fi
fi

echo "Status updated: context ${CONTEXT_PCT}%, heartbeat $HEARTBEAT"