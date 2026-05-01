#!/bin/bash
# Auto-track XP in background - called by cron or automation
# Usage: ./auto-xp-track.sh <skill> <amount> <reason>

SKILL=$1
GAIN=${2:-5}
REASON=${3:-Auto-tracked action}

TRACKING="/home/openclaw/.openclaw/workspace-vyse/kb/xp-tracking.md"
DATE=$(date +%Y-%m-%d)

echo "| $SKILL | +$GAIN | $DATE: $REASON |" >> "$TRACKING"
echo "XP tracked: $SKILL +$GAIN"
