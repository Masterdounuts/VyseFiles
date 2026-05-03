#!/bin/bash
# Debug Display - Shows skill status for every reply
# Content-based leveling: Level = sections + subsections + lines/100
# Tiers: Critical (150), Primary (100), Supporting (75)

SKILLS=${1:-"system"}
WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

get_tier() {
    local level=$1
    if [ $level -ge 150 ]; then
        echo "Critical"
    elif [ $level -ge 100 ]; then
        echo "Primary"
    elif [ $level -ge 75 ]; then
        echo "Supporting"
    else
        echo "Base"
    fi
}

if [ -f "$WORKSPACE/scripts/skill-level.sh" ]; then
    result=$(bash "$WORKSPACE/scripts/skill-level.sh" "$SKILLS" 2>/dev/null)
    if [ -n "$result" ]; then
        level=$(echo "$result" | grep "^Level:" | cut -d: -f2 | xargs)
        weight=$(echo "$result" | grep "^Content Weight:" | cut -d: -f2 | xargs)
        
        tier=$(get_tier $level)
        
        echo "[skill:$SKILLS] Level: $level ($tier) | Content: $weight"
    fi
else
    echo "[skill:$SKILLS] Level: unknown"
fi