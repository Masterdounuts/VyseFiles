#!/bin/bash
# Auto-checkpoint script - SAVES actual session data to memory
# Usage: ./auto-checkpoint-new.sh [force]
#
# CRITICAL: This saves actual work to memory to prevent data loss!
# - Saves active.md content to memory/2026-MM-DD-active.md
# - Runs every 20 min via cron

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
MEMORY_DIR="$WORKSPACE/memory"
ACTIVE_FILE="$WORKSPACE/active.md"
LOG_FILE="$WORKSPACE/logs/checkpoint.log"

# Get today's date for memory file
TODAY=$(date -u +"%Y-%m-%d")
MEMORY_FILE="$MEMORY_DIR/${TODAY}-active.md"

# Ensure directories exist
mkdir -p "$MEMORY_DIR" "$WORKSPACE/logs"

# Check if we've already checkpointed recently (skip if < 10 min)
if [ "$1" != "force" ] && [ -f "$MEMORY_FILE" ]; then
    LAST_UPDATE=$(stat -c %Y "$MEMORY_FILE" 2>/dev/null || stat -f %m "$MEMORY_FILE" 2>/dev/null)
    NOW=$(date +%s)
    ELAPSED=$((NOW - LAST_UPDATE))
    
    if [ "$ELAPSED" -lt 600 ]; then
        echo "$(date -u +"%Y-%m-%d %H:%M UTC") Skip: ${ELAPSED}s ago" >> "$LOG_FILE"
        exit 0
    fi
fi

# Perform checkpoint - SAVE ACTUAL CONTENT
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Create or update the memory file with current session state
{
    echo "# Session Checkpoint - $TIMESTAMP"
    echo ""
    echo "## Last Active File Content:"
    if [ -f "$ACTIVE_FILE" ]; then
        cat "$ACTIVE_FILE"
    else
        echo "(No active.md found)"
    fi
    echo ""
    echo "## Current Session Info:"
    echo "- Last checkpoint: $TIMESTAMP"
    echo "- Previous checkpoint file: $MEMORY_FILE"
    echo ""
} > "$MEMORY_FILE"

echo "$(date -u +"%Y-%m-%d %H:%M UTC") Checkpoint SAVED to $MEMORY_FILE" >> "$LOG_FILE"
exit 0