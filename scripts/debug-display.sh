#!/bin/bash
# Debug Display - Shows skill status for every reply
# Usage: ./debug-display.sh [skill1,skill2,...]

SKILLS=${1:-"system"}
WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

# Get content progress
if [ -f "$WORKSPACE/scripts/xp-gain.sh" ]; then
    result=$(bash "$WORKSPACE/scripts/xp-gain.sh" "$SKILLS" 2>/dev/null)
    if [ -n "$result" ]; then
        level=$(echo "$result" | grep "^Level:" | cut -d: -f2 | xargs)
        weight=$(echo "$result" | grep "^Content Weight:" | cut -d: -f2 | xargs)
        need=$(echo "$result" | grep "^Need for next:" | cut -d: -f2 | xargs)
        
        echo "[skill:$SKILLS]"
        echo "L$level | Content: $weight/$need to next"
    fi
else
    echo "[skill:$SKILLS]"
fi
