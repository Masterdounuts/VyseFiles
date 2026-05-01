#!/bin/bash
# Context-Aware Save - Simple pre-overflow save
# Runs every 5 min via cron
# Purpose: Save session before context overflow

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
LOG_DIR="$WORKSPACE/logs"

# Create logs dir if missing
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Quick check - is context likely high?
# We can't easily check from here without blocking
# So we'll just do a quick save to HANDOFF

# Update HANDOFF with current active state
{
    echo "# Session Handoff - $TIMESTAMP"
    echo "*Auto-save from context-aware-save*"
    echo ""
    echo "🎯 **ULTIMATE GOAL:** Help David during life → loved ones after"
    echo ""
    echo "---"
    # Only first 50 lines to keep it fast
    head -50 "$ACTIVE_FILE" 2>/dev/null || echo "(active.md not found)"
} > "$HANDOFF_FILE"

echo "✅ Context-aware save: $TIMESTAMP"
exit 0
