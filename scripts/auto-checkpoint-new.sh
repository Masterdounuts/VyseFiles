#!/bin/bash
# Auto-Checkpoint - Periodic context save
# Runs every 20 min via cron
# Purpose: Save session state for recovery

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
LOG_DIR="$WORKSPACE/logs"

# Create logs dir if missing
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Save current active state to HANDOFF for recovery
{
    echo "# Session Handoff - $TIMESTAMP"
    echo "*Auto-checkpoint save*"
    echo ""
    echo "🎯 **ULTIMATE GOAL:** Help David during life → loved ones after"
    echo ""
    echo "---"
    # First 50 lines of active for quick recovery
    head -50 "$ACTIVE_FILE" 2>/dev/null || echo "(active.md not found)"
    echo ""
    echo "---"
    echo "*Checkpoint saved at $TIMESTAMP*"
} > "$HANDOFF_FILE"

echo "✅ Auto-checkpoint: $TIMESTAMP"
exit 0