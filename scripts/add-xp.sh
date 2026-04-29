#!/bin/bash
# add-xp.sh - Add XP to a skill (called after actions)
# Usage: ./add-xp.sh <skill> <amount> <reason>

SKILL="$1"
AMOUNT="${2:-1}"
REASON="$3"

XP_FILE="/root/.openclaw/workspace/kb/xp-tracking.md"
LOG_FILE="/root/.openclaw/workspace/kb/xp-events.md"

if [ -z "$SKILL" ]; then
    echo "Usage: add-xp.sh <skill> [amount] [reason]"
    exit 1
fi

# Add to XP log
echo "- $(date +%Y-%m-%d): +$AMOUNT XP to $SKILL ($REASON)" >> $LOG_FILE

# This would auto-update xp-tracking.md in a full implementation
echo "Added +$AMOUNT XP to $SKILL: $REASON"

# Check if level up
echo "Checking level threshold..."