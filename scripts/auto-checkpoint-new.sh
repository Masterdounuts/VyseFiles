#!/bin/bash
# Auto-checkpoint script - structured handoff update
# Usage: ./auto-checkpoint-new.sh [force]
#
# Logic:
# - Check if checkpoint happened within last 10 min (skip if yes)
# - Update resume-point.md, HANDOFF.md, and AGENTS.md with current state
# - Runs every 20 min via cron

WORKSPACE="/home/openclaw/.openclaw/workspace"
RESUME_FILE="$WORKSPACE/memory/resume-point.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
AGENTS_FILE="$WORKSPACE/AGENTS.md"
HEARTBEAT_FILE="$WORKSPACE/HEARTBEAT.md"
LOG_FILE="$WORKSPACE/logs/checkpoint.log"

# Ensure directories exist
mkdir -p "$WORKSPACE/logs"

# Check if we've already checkpointed recently
if [ "$1" != "force" ] && [ -f "$AGENTS_FILE" ]; then
    LAST_UPDATE=$(stat -c %Y "$AGENTS_FILE" 2>/dev/null || stat -f %m "$AGENTS_FILE" 2>/dev/null)
    NOW=$(date +%s)
    ELAPSED=$((NOW - LAST_UPDATE))
    
    # Skip if less than 10 min since last checkpoint
    if [ "$ELAPSED" -lt 600 ]; then
        echo "$(date -u +"%Y-%m-%d %H:%M UTC") Skip: ${ELAPSED}s ago" >> "$LOG_FILE"
        exit 0
    fi
fi

# Perform checkpoint
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Update resume-point.md timestamp if it exists
if [ -f "$RESUME_FILE" ]; then
    sed -i "s/Last updated:.*/Last updated: $TIMESTAMP/" "$RESUME_FILE"
fi

# Update HANDOFF.md timestamp only (preserve lean content!)
if [ -f "$HANDOFF_FILE" ]; then
    sed -i "s/\*\*Last Updated:\*\*.*/**Last Updated:** $TIMESTAMP/" "$HANDOFF_FILE" 2>/dev/null || true
    # If no timestamp line exists, add it
    grep -q "Last Updated:" "$HANDOFF_FILE" || echo "**Last Updated:** $TIMESTAMP" >> "$HANDOFF_FILE"
    echo "Updated HANDOFF.md timestamp at $TIMESTAMP"
fi

# Update HEARTBEAT.md trading session state (this persists across sessions!)
if [ -f "$HEARTBEAT_FILE" ]; then
    sed -i "s/\*\*Last Updated:\*\*.*/\*\*Last Updated:\*\* $TIMESTAMP/" "$HEARTBEAT_FILE"
    echo "Updated HEARTBEAT.md at $TIMESTAMP"
fi

echo "$(date -u +"%Y-%m-%d %H:%M UTC") Checkpoint saved" >> "$LOG_FILE"
exit 0