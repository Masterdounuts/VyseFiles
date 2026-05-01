#!/bin/bash
# Auto-Checkpoint - GOAL-AWARE CONTINUITY
# Saves session work WITH goal filter and XP tracking
# GOAL: "Help David during life, then help loved ones after"

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
MEMORY_DIR="$WORKSPACE/memory"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
LOG_FILE="$WORKSPACE/logs/checkpoint.log"

TODAY=$(date -u +"%Y-%m-%d")
MEMORY_FILE="$MEMORY_DIR/${TODAY}-active.md"

mkdir -p "$MEMORY_DIR" "$WORKSPACE/logs"

# Goal check - is this session work goal-aligned?
echo "🎯 Goal-Aware Checkpoint..."
echo "   Ultimate Goal: Help David during life → loved ones after"

# Check if active work is goal-aligned
if grep -qi "goal\|david\|help\|learning\|system\|skill\|memory\|project\|crew\|work\|session" "$ACTIVE_FILE" 2>/dev/null; then
    echo "   ✅ Goal-aligned work detected"
    GOAL_CHECK="PASS"
else
    echo "   ⚠️  Work may not align with goal"
    GOAL_CHECK="CHECK"
fi

# Perform checkpoint with goal awareness
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Save to memory file
{
    echo "# Checkpoint - $TIMESTAMP [Goal: $GOAL_CHECK]"
    echo ""
    echo "## Active.md (last 20 lines):"
    tail -20 "$ACTIVE_FILE" 2>/dev/null || echo "(empty)"
    echo ""
    echo "## Session: $TIMESTAMP | Goal: $GOAL_CHECK"
} > "$MEMORY_FILE"

# Update HANDOFF (cross-session continuity) - IMPORTANT
{
    echo "# Session Handoff - $TIMESTAMP"
    echo "*Auto-generated from active.md - GOAL-AWARE*"
    echo ""
    echo "🎯 **ULTIMATE GOAL:** Help David during life → loved ones after"
    echo ""
    echo "---"
    tail -30 "$ACTIVE_FILE" 2>/dev/null
} > "$HANDOFF_FILE"

echo "   ✅ HANDOFF.md updated (cross-session ready)"
echo "   ✅ Memory saved: $MEMORY_FILE"
echo "   ✅ Checkpoint complete: $TIMESTAMP"

# Log
echo "$TIMESTAMP Checkpoint [Goal: $GOAL_CHECK] - HANDOFF updated" >> "$LOG_FILE"
exit 0
