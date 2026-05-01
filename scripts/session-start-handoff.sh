#!/bin/bash
# Session Start Handoff - AUTO-RECOVERY SYSTEM
# Runs automatically on session start

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

echo "=== Vyse Session Start - Auto Recovery ==="
echo "Time: $TIMESTAMP"

# Get timestamps
HANDOFF_TIME=$(stat -c %Y "$HANDOFF_FILE" 2>/dev/null)
ACTIVE_TIME=$(stat -c %Y "$ACTIVE_FILE" 2>/dev/null)

# Always load HANDOFF if it's NEWER than active
if [ "$HANDOFF_TIME" -gt "$ACTIVE_TIME" ]; then
    echo "✅ HANDOFF is NEWER - loading previous session"
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
    echo "✅ Active.md is current - continuing session"
fi

# Always run memory-recall to surface important memories
echo ""
echo "=== Memory Recall (Top 5) ==="
bash "$WORKSPACE/scripts/memory-recall.sh" 2>/dev/null | head -8
