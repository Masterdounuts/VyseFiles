#!/bin/bash
# Track XP and output for display
# GOAL: "Help David during his life, then help loved ones after"

SKILL=$1
GAIN=${2:-5}
REASON=${3:-}

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

# Function to get skill level (reads dynamic max)
get_level_info() {
    local s=$1
    local file="$WORKSPACE/skills/$s/SKILL.md"
    if [ -f "$file" ]; then
        # Get current level number
        local level=$(grep "Current Status:" "$file" | head -1 | sed 's/.*Level \([0-9]*\).*/\1/')
        # Get max level (dynamic)
        local max=$(grep "Max Level:" "$file" | head -1 | grep -oE '[0-9]+' | head -1)
        max=${max:-7}
        # Get XP current and next level
        local xp_line=$(grep "XP:" "$file" | head -1)
        local xp_current=$(echo "$xp_line" | grep -oE '[0-9]+' | head -1)
        local xp_next=$(echo "$xp_line" | grep -oE '[0-9]+' | head -2 | tail -1)
        if [ -z "$xp_next" ]; then
            xp_next=$xp_current
        fi
        # If current equals next, at max
        if [ "$xp_current" -eq "$xp_next" ]; then
            local to_next=0
        else
            local to_next=$((xp_next - xp_current))
        fi
        echo "$level|$max|$xp_current|$xp_next|$to_next"
    else
        echo "1|7|0|50|50"
    fi
}

# Function to auto-level up when threshold reached
auto_level_up() {
    local s=$1
    local file="$WORKSPACE/skills/$s/SKILL.md"
    if [ ! -f "$file" ]; then
        return
    fi
    
    local info=$(get_level_info "$s")
    local current_level=$(echo "$info" | cut -d'|' -f1)
    local max_level=$(echo "$info" | cut -d'|' -f2)
    local xp_current=$(echo "$info" | cut -d'|' -f3)
    local xp_next=$(echo "$info" | cut -d'|' -f4)
    
    # Check if at max level
    if [ "$current_level" -ge "$max_level" ]; then
        return
    fi
    
    # Check if XP >= threshold (level up!)
    if [ "$xp_current" -ge "$xp_next" ] && [ "$xp_next" -gt 0 ]; then
        local new_level=$((current_level + 1))
        local next_threshold=$((xp_next + 50))
        
        # Update level in file (only first occurrence - the main one)
        sed -i "0,/Current Status: Level $current_level/{s/Current Status: Level $current_level/Current Status: Level $new_level/}" "$file"
        
        # Update XP (reset to 0, keep overflow)
        local overflow=$((xp_current - xp_next))
        sed -i "0,/XP: $xp_current\/$xp_next/{s/XP: $xp_current\/$xp_next/XP: $overflow\/$next_threshold/}" "$file"
        
        echo "🎉 LEVEL UP! $s: $current_level → $new_level"
    fi
}

# Function to find skills near level-up
find_near_levelup() {
    local near=""
    for skill_dir in $WORKSPACE/skills/*/; do
        local skill=$(basename "$skill_dir")
        local info=$(get_level_info "$skill")
        local to_next=$(echo "$info" | cut -d'|' -f5)
        if [ "$to_next" -le 20 ] && [ "$to_next" -gt 0 ]; then
            near+="$skill($to_next) "
        fi
    done
    echo "$near"
}

if [ -z "$REASON" ]; then
  echo "❌ ERROR: No reason provided. Does this serve the goal?"
  echo "   Usage: xp-gain.sh <skill> <XP> <reason>"
  exit 1
fi

# Test warning
if [[ "$REASON" == *"test"* ]] || [[ "$REASON" == *"Test"* ]]; then
  if [[ "$REASON" != *"goal"* ]] && [[ "$REASON" != *"serve"* ]] && [[ "$REASON" != *"help"* ]]; then
    echo "⚠️  TEST WARNING: Frame as goal-serving"
    echo ""
  fi
fi

TRACKING="$WORKSPACE/kb/xp-tracking.md"
TIMESTAMP=$(date +"%H:%M")

# Track the XP
echo "| $SKILL | +$GAIN | $REASON |" >> "$TRACKING"

# Cross-pollination
case $SKILL in
  learning) echo "| pattern-recognition | +3 | Cross-pollination |" >> "$TRACKING";;
  memory) echo "| learning | +3 | Cross-pollination |" >> "$TRACKING";;
  accountability) echo "| vyse-core | +3 | Cross-pollination |" >> "$TRACKING";;
  system) echo "| workflow | +3 | Cross-pollination |" >> "$TRACKING";;
  workflow) echo "| control-ui | +3 | Cross-pollination |" >> "$TRACKING";;
  pattern-recognition) echo "| learning | +3 | Cross-pollination |" >> "$TRACKING";;
  control-ui) echo "| system | +3 | Cross-pollination |" >> "$TRACKING";;
  skill-creator) echo "| pattern-recognition | +3 | Cross-pollination |" >> "$TRACKING";;
esac

echo "| pattern-recognition | +3 | Core skill |" >> "$TRACKING"

# AUTO LEVEL-UP CHECK
LEVEL_UP_MSG=$(auto_level_up "$SKILL")

# Get level info
SELF_INFO=$(get_level_info "vyse-core")
PATTERN_INFO=$(get_level_info "pattern-recognition")
SKILL_INFO=$(get_level_info "$SKILL")

SELF_LEVEL=$(echo "$SELF_INFO" | cut -d'|' -f1-2 | tr '|' '/')
PATTERN_LEVEL=$(echo "$PATTERN_INFO" | cut -d'|' -f1-2 | tr '|' '/')
SKILL_LEVEL=$(echo "$SKILL_INFO" | cut -d'|' -f1-2 | tr '|' '/')

SKILL_XP=$(echo "$SKILL_INFO" | cut -d'|' -f3)
SKILL_XP_NEXT=$(echo "$SKILL_INFO" | cut -d'|' -f4)
SKILL_TO_NEXT=$(echo "$SKILL_INFO" | cut -d'|' -f5)

# Handle max level case (XP current = XP next means at RON)
if [ "$SKILL_XP" -ge "$SKILL_XP_NEXT" ]; then
    SKILL_PROGRESS="(MAX - RON)"
else
    SKILL_PROGRESS="$SKILL_TO_NEXT to next"
fi

PATTERN_TO_NEXT=$(echo "$PATTERN_INFO" | cut -d'|' -f5)
PATTERN_XP=$(echo "$PATTERN_INFO" | cut -d'|' -f3)
PATTERN_XP_NEXT=$(echo "$PATTERN_INFO" | cut -d'|' -f4)
if [ "$PATTERN_XP" -ge "$PATTERN_XP_NEXT" ]; then
    PATTERN_PROGRESS="(MAX - RON)"
else
    PATTERN_PROGRESS="$PATTERN_TO_NEXT to next"
fi

NEAR_LEVELUP=$(find_near_levelup)

# Full output with ALL improvements
echo "🛠️ **LEVEL UP REPORT:** [$TIMESTAMP]"
if [ -n "$LEVEL_UP_MSG" ]; then
    echo "   $LEVEL_UP_MSG"
fi
echo "   $SKILL: $SKILL_LEVEL | XP: $SKILL_XP | $SKILL_PROGRESS"
echo "   pattern-recognition: $PATTERN_LEVEL | $PATTERN_PROGRESS"
echo "   vyse-core: $SELF_LEVEL"
if [ -n "$NEAR_LEVELUP" ]; then
    echo "   ⚡ Near level-up: $NEAR_LEVELUP"
fi
echo ""
echo "📈 **XP GAINS:** $SKILL +$GAIN | pattern-recognition +3"
echo "🔍 **DISCOVERIES:** $REASON"
echo "🎯 **GOAL:** Help David during life → loved ones after ✓"
echo ""
echo "[skill:$SKILL] [skill:pattern-recognition] 🦜"