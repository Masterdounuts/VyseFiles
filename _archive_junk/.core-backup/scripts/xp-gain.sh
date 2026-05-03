#!/bin/bash
# Track XP and output for display

SKILL=$1
GAIN=${2:-5}
REASON=$3

TRACKING="/home/openclaw/.openclaw/workspace-vyse/kb/xp-tracking.md"

echo "| $SKILL | +$GAIN | $REASON |" >> "$TRACKING"

# Output format for my reply
echo "[skill:$SKILL] XP: +$GAIN | $REASON"
