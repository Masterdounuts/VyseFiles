#!/bin/bash
# Session Start Handoff - AUTO-RECOVERY SYSTEM
# Runs automatically on session start

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
RECOVERY_FILE="$WORKSPACE/RECOVERY.md"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

echo "=== Vyse Session Start - Auto Recovery ==="
echo "Time: $TIMESTAMP"
echo ""

# Check if this is first start (no active.md or stale)
if [ ! -f "$ACTIVE_FILE" ] || [ $(find "$ACTIVE_FILE" -mmin +60 2>/dev/null) ]; then
    echo "⚠️  No fresh active.md - checking for recovery..."
    
    # Try to load from HANDOFF
    if [ -f "$HANDOFF_FILE" ]; then
        echo "✅ Found HANDOFF.md - loading previous session"
        {
            echo "# Active Session - $TIMESTAMP (RECOVERED)"
            echo ""
            echo "## Loaded from Previous Session:"
            echo ""
            cat "$HANDOFF_FILE"
            echo ""
            echo "---"
            echo "*Auto-recovered at session start: $TIMESTAMP*"
        } > "$ACTIVE_FILE"
    else
        # Check for RECOVERY.md - blank agent scenario
        if [ -f "$RECOVERY_FILE" ]; then
            echo "⚠️  No HANDOFF.md - checking RECOVERY.md"
            echo "   A blank agent can use RECOVERY.md to restore"
        fi
        
        # Start fresh
        {
            echo "# Active Session - $TIMESTAMP"
            echo ""
            echo "**Status:** Fresh session - no previous handoff"
            echo "**Time:** $TIMESTAMP"
        } > "$ACTIVE_FILE"
    fi
else
    echo "✅ Active.md is fresh - continuing session"
fi

# Always run memory-recall to surface important memories
echo ""
echo "=== Memory Recall (Top 5) ==="
bash "$WORKSPACE/scripts/memory-recall.sh" 2>/dev/null | head -8

echo ""
echo "=== Session Ready ==="
echo "Active: $(cat $ACTIVE_FILE | head -3)"
