#!/bin/bash
# Auto-Checkpoint - Brain-style periodic save
# Runs every 20 min via cron
# Purpose: Save session state for recovery
# FIXED: Pull from core memory sources, not accumulated active.md

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
CORE_DIR="$WORKSPACE/memory/core"
RON_MEMORY="$WORKSPACE/memory/ron-memory.md"
LOG_DIR="$WORKSPACE/logs"

mkdir -p "$LOG_DIR"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

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

echo "✅ Brain-style checkpoint: $TIMESTAMP"
exit 0