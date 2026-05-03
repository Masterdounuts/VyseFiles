#!/bin/bash
# Debug Display - Shows skill status for every reply
# Usage: ./debug-display.sh [skill1,skill2,...]
# Outputs formatted line for inclusion in replies

SKILLS=${1:-"system"}
TRACKING="/home/openclaw/.openclaw/workspace-vyse/kb/xp-tracking.md"
TODAY=$(date +%Y-%m-%d)

echo "---"
echo "**Skills used:** $SKILLS"
echo "**XP:** (call xp-gain.sh to track)"
echo "**Level ups:** none"
echo "**Max level:** none"
echo "---"
echo "Format:"
echo "Skills used: $SKILLS"
echo "XP: +N or no change"
echo "Level ups: skill → NEW LEVEL"
echo "Max level: skill → NEW MAX"
