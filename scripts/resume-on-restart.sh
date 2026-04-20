#!/bin/bash
# resume-on-restart.sh - Run on wake to recover session context
# Called by Auto-Resume-On-Wake cron job or on session init

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")"

echo "=== Vyse Resume Check $(date) ==="

# 1. Load HANDOFF.md - critical context
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
if [ -f "$HANDOFF_FILE" ]; then
    HANDOFF_TS=$(stat -c %Y "$HANDOFF_FILE" 2>/dev/null || stat -f %m "$HANDOFF_FILE" 2>/dev/null)
    NOW_TS=$(date +%s)
    AGE_SEC=$((NOW_TS - HANDOFF_TS))
    AGE_MIN=$((AGE_SEC / 60))
    
    echo ""
    echo "--- HANDOFF.md (age: ${AGE_MIN}min) ---"
    cat "$HANDOFF_FILE"
    echo ""
    
    # Mark stale if >60 min
    if [ $AGE_MIN -gt 60 ]; then
        echo "[WARNING] HANDOFF.md is stale (>60min old)"
    fi
else
    echo "[WARNING] No HANDOFF.md found"
fi

# 2. Load active.md - current task
ACTIVE_FILE="$WORKSPACE/active.md"
if [ -f "$ACTIVE_FILE" ]; then
    ACTIVE_TS=$(stat -c %Y "$ACTIVE_FILE" 2>/dev/null || stat -f %m "$ACTIVE_FILE" 2>/dev/null)
    NOW_TS=$(date +%s)
    AGE_SEC=$((NOW_TS - ACTIVE_TS))
    AGE_MIN=$((AGE_SEC / 60))
    
    echo ""
    echo "--- active.md (age: ${AGE_MIN}min) ---"
    cat "$ACTIVE_FILE"
    echo ""
    
    if [ $AGE_MIN -gt 60 ]; then
        echo "[WARNING] active.md is stale (>60min old)"
    fi
else
    echo "[INFO] No active.md found"
fi

# 3. Load PENDING.md - queued tasks
PENDING_FILE="$WORKSPACE/PENDING.md"
if [ -f "$PENDING_FILE" ]; then
    echo ""
    echo "--- PENDING.md ---"
    cat "$PENDING_FILE"
    echo ""
else
    echo "[INFO] No PENDING.md found"
fi

echo "=== Resume check complete ==="
exit 0