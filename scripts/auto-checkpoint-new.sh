#!/bin/bash
# Auto-Checkpoint - Brain-style periodic save
# Runs every 20 min via cron
# Purpose: Save session state for recovery
# FIXED: Pull from core memory sources, not accumulated active.md

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
MEMORY_FILE="$WORKSPACE/MEMORY.md"
CORE_DIR="$WORKSPACE/memory/core"
RON_MEMORY="$WORKSPACE/memory/ron-memory.md"
LOG_DIR="$WORKSPACE/logs"

mkdir -p "$LOG_DIR"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
TODAY=$(date +%Y-%m-%d)

# Build handoff from CORE sources (like brain retrieving from long-term memory)
{
    echo "# Session Handoff - $TIMESTAMP"
    echo "*Brain-style checkpoint: core memory only*"
    echo ""
    echo "🎯 **ULTIMATE GOAL:** Help David during life → loved ones after"
    echo ""
    echo "## Core Memory (loads on recovery):"
    echo ""
    
    # Pull from core memory files - the real persistent data
    if [ -f "$CORE_DIR/user.md" ]; then
        echo "### From user.md:"
        head -10 "$CORE_DIR/user.md"
        echo ""
    fi
    
    if [ -f "$CORE_DIR/goals.md" ]; then
        echo "### From goals.md:"
        head -10 "$CORE_DIR/goals.md"
        echo ""
    fi
    
    # Key-value from ron-memory (most recent entries)
    if [ -f "$RON_MEMORY" ]; then
        echo "### Key Memory Entries:"
        tail -20 "$RON_MEMORY"
        echo ""
    fi
    
    echo "---"
    echo "*Checkpoint saved at $TIMESTAMP - Clean handoff, no accumulation*"
} > "$HANDOFF_FILE"

# ALSO append to MEMORY.md so it loads on session start
if ! grep -q "## Session Handoff - $TODAY" "$MEMORY_FILE" 2>/dev/null; then
    echo "" >> "$MEMORY_FILE"
    echo "" >> "$MEMORY_FILE"
    echo "## Session Handoff - $TODAY" >> "$MEMORY_FILE"
    echo "*Auto-inserted by auto-checkpoint*" >> "$MEMORY_FILE"
    echo "" >> "$MEMORY_FILE"
    cat "$HANDOFF_FILE" >> "$MEMORY_FILE"
    echo "✅ Appended handoff to MEMORY.md"
else
    echo "✅ Today's handoff already in MEMORY.md"
fi

echo "✅ Brain-style checkpoint: $TIMESTAMP"
exit 0