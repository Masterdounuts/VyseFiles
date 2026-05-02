#!/bin/bash
# Track XP and output for display
# GOAL: "Help David during his life, then help loved ones after"
# VERSION: 2.0 - Full auto system with health, streaks, history

SKILL=$1
GAIN=${2:-5}
REASON=${3:-}

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
TRACKING="$WORKSPACE/kb/xp-tracking.md"
HISTORY="$WORKSPACE/kb/level-history"
STREAKS="$WORKSPACE/kb/streaks.json"
LOG="$WORKSPACE/kb/xp-debug.log"

mkdir -p "$HISTORY"

# ============ FUNCTIONS ============

# Logging for debugging
log_debug() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> "$LOG"
}

# Function to get skill level info
get_level_info() {
    local s=$1
    local file="$WORKSPACE/skills/$s/SKILL.md"
    if [ -f "$file" ]; then
        local level=$(grep "Current Status:" "$file" | head -1 | sed 's/.*Level \([0-9]*\).*/\1/')
        local max=$(grep "Max Level:" "$file" | head -1 | grep -oE '[0-9]+' | head -1)
        max=${max:-7}
        local xp_line=$(grep "XP:" "$file" | head -1)
        local xp_current=$(echo "$xp_line" | grep -oE '[0-9]+' | head -1)
        local xp_next=$(echo "$xp_line" | grep -oE '[0-9]+' | head -2 | tail -1)
        if [ -z "$xp_next" ]; then
            xp_next=$xp_current
        fi
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
# CONTENT-BASED: level is recalculated from actual content weight
auto_level_up() {
    local s=$1
    local file="$WORKSPACE/skills/$s/SKILL.md"
    if [ ! -f "$file" ]; then
        return
    fi
    
    # FIRST: Recalculate level from content weight
    local lines=$(wc -l < "$file")
    local sections=$(grep -c "^## " "$file" 2>/dev/null || echo 0)
    local subsections=$(grep -c "^### " "$file" 2>/dev/null || echo 0)
    
    local content_level=$((sections + subsections + lines / 100))
    content_level=$((content_level > 1 ? content_level : 1))
    
    local content_max=$((7 + subsections / 2 + sections))
    content_max=$((content_max > 7 ? content_max : 7))
    
    # Get current recorded level
    local info=$(get_level_info "$s")
    local current_level=$(echo "$info" | cut -d'|' -f1)
    local max_level=$(echo "$info" | cut -d'|' -f2)
    
    # If content-based level differs from recorded, update it
    if [ "$content_level" != "$current_level" ]; then
        sed -i "s/Current Status: Level $current_level/Current Status: Level $content_level/" "$file"
        echo "📐 CONTENT-BASED: $s adjusted to L$content_level (was L$current_level)"
    fi
    
    if [ "$content_max" != "$max_level" ]; then
        sed -i "s/Max Level: $max_level/Max Level: $content_max/" "$file"
        echo "📐 CONTENT-MAX: $s max adjusted to $content_max (was $max_level)"
    fi
    
    # Now check XP-based threshold (for legacy compatibility)
    local xp_current=$(echo "$info" | cut -d'|' -f3)
    local xp_next=$(echo "$info" | cut -d'|' -f4)
    
    if [ "$current_level" -ge "$max_level" ]; then
        # Check if skill has dynamic max (can expand)
        if grep -q "grows with discoveries\|Dynamic Max\|expanded from" "$file" 2>/dev/null; then
            # DISABLED: Dynamic max expansion (tier system now used)
# Expand max level!
            # DISABLED new_max=$((max_level + 1)) # Tier system handles max
            sed -i "s/\*\*Max Level:\*\* $max_level /\*\*Max Level:\*\* $new_max /" "$file"
            log_debug "DYNAMIC MAX EXPANDED: $s from $max_level to $new_max"
            echo "🚀 DYNAMIC MAX! $s expanded: $max_level → $new_max"
        fi
        return
    fi
    
    if [ "$xp_current" -ge "$xp_next" ] && [ "$xp_next" -gt 0 ]; then
        local new_level=$((current_level + 1))
        local next_threshold=$((xp_next + 50))
        
        # Milestone
        local milestone=""
        case $new_level in
            5) milestone=" ⭐⭐⭐⭐⭐";;
            6) milestone=" 🌟🌟🌟🌟";;
            7) milestone=" 🌟🌟🌟";;
            8) milestone=" 🌟🌟";;
            9) milestone=" 🌟";;
            10) milestone=" 👑👑👑👑👑";;
        esac
        
        # Update file
        sed -i "0,/Current Status: Level $current_level/{s/Current Status: Level $current_level/Current Status: Level $new_level/}" "$file"
        local overflow=$((xp_current - xp_next))
        sed -i "0,/XP: $xp_current\/$xp_next/{s/XP: $xp_current\/$xp_next/XP: $overflow\/$next_threshold/}" "$file"
        
        # Log to history
        echo "{\"skill\":\"$s\",\"from\":$current_level,\"to\":$new_level,\"xp\":$xp_current,\"time\":\"$(date -Iseconds)\"}" >> "$HISTORY/level-ups.jsonl"
        
        log_debug "LEVEL UP: $s $current_level → $new_level"
        
        echo "🎉 LEVEL UP! $s: $current_level → $new_level$milestone"
    fi
}

# Skill health check
skill_health_check() {
    local issues=""
    local checked=0
    local healthy=0
    
    for skill_dir in $WORKSPACE/skills/*/; do
        local skill=$(basename "$skill_dir")
        local file="$skill_dir/SKILL.md"
        checked=$((checked + 1))
        
        # Check if file exists and has valid data
        if [ ! -f "$file" ]; then
            issues+="$skill: MISSING FILE | "
            continue
        fi
        
        # Check for required fields
        if ! grep -q "Current Status:" "$file"; then
            issues+="$skill: NO STATUS | "
            continue
        fi
        if ! grep -q "XP:" "$file"; then
            issues+="$skill: NO XP | "
            continue
        fi
        if ! grep -q "Max Level:" "$file"; then
            issues+="$skill: NO MAX | "
            continue
        fi
        
        healthy=$((healthy + 1))
    done
    
    if [ -n "$issues" ]; then
        echo "⚠️ **SKILL HEALTH:** $healthy/$checked OK | Issues: $issues"
    else
        echo "✅ **SKILL HEALTH:** $healthy/$checked All skills healthy"
    fi
}

# Streak tracking
update_streak() {
    local today=$(date +"%Y-%m-%d")
    local last_date=""
    
    if [ -f "$STREAKS" ]; then
        last_date=$(grep -o '"last_date":"[^"]*"' "$STREAKS" | cut -d'"' -f4)
    fi
    
    local current_streak=0
    if [ -f "$STREAKS" ]; then
        current_streak=$(grep -o '"streak":[0-9]*' "$STREAKS" | cut -d':' -f2)
    fi
    
    if [ "$last_date" = "$today" ]; then
        # Already logged today
        echo "Streak maintained: $current_streak days"
        return
    fi
    
    local yesterday=$(date -d "yesterday" +"%Y-%m-%d")
    if [ "$last_date" = "$yesterday" ]; then
        current_streak=$((current_streak + 1))
    else
        current_streak=1
    fi
    
    echo "{\"last_date\":\"$today\",\"streak\":$current_streak}" > "$STREAKS"
    echo "🔥 Streak: $current_streak days!"
}

# Daily XP bonus
daily_bonus() {
    local today=$(date +"%Y-%m-%d")
    local bonus_file="$WORKSPACE/kb/daily-bonus.json"
    local last_bonus=""
    
    if [ -f "$bonus_file" ]; then
        last_bonus=$(grep -o '"date":"[^"]*"' "$bonus_file" | cut -d'"' -f4)
    fi
    
    if [ "$last_bonus" = "$today" ]; then
        return
    fi
    
    # Grant bonus XP to all skills
    echo "🎁 **DAILY BONUS:** +5 XP to all skills!"
    echo "{\"date\":\"$today\"}" > "$bonus_file"
}

# Find skills near level-up
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

# Get leaderboard
get_leaderboard() {
    echo "🏆 **SKILL LEADERBOARD:**"
    for skill_dir in $WORKSPACE/skills/*/; do
        local skill=$(basename "$skill_dir")
        local info=$(get_level_info "$skill")
        local level=$(echo "$info" | cut -d'|' -f1)
        local max=$(echo "$info" | cut -d'|' -f2)
        local xp=$(echo "$info" | cut -d'|' -f3)
        echo "$level|$max|$xp|$skill"
    done | sort -t'|' -k1,1nr -k3,3nr | head -5 | while IFS='|' read -r level max xp name; do
        echo "   $name: L$level/$max ($xp XP)"
    done
}

# ============ MAIN ============

log_debug "xp-gain called: skill=$SKILL gain=$GAIN reason=$REASON"

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

TIMESTAMP=$(date +"%H:%M")
DATE=$(date +"%Y-%m-%d")

# Track the XP
echo "| $SKILL | +$GAIN | $REASON |" >> "$TRACKING"

# Cross-pollination (data-driven connections)
case $SKILL in
  learning) echo "| pattern-recognition | +3 | Cross-pollination |" >> "$TRACKING";;
  memory) echo "| learning | +3 | Cross-pollination |" >> "$TRACKING";;
  accountability) echo "| vyse-core | +3 | Cross-pollination |" >> "$TRACKING";;
  system) echo "| workflow | +3 | Cross-pollination |" >> "$TRACKING"
         echo "| security | +3 | Cross-pollination |" >> "$TRACKING";;
  workflow) echo "| control-ui | +3 | Cross-pollination |" >> "$TRACKING"
           echo "| time | +3 | Cross-pollination |" >> "$TRACKING";;
  pattern-recognition) echo "| learning | +3 | Cross-pollination |" >> "$TRACKING"
                     echo "| system | +3 | Cross-pollination |" >> "$TRACKING";;
  control-ui) echo "| system | +3 | Cross-pollination |" >> "$TRACKING"
             echo "| skill-creator | +3 | Cross-pollination |" >> "$TRACKING";;
  skill-creator) echo "| pattern-recognition | +3 | Cross-pollination |" >> "$TRACKING"
                echo "| learning | +3 | Cross-pollination |" >> "$TRACKING";;
  knowledge) echo "| memory | +3 | Cross-pollination |" >> "$TRACKING";;
  security) echo "| system | +3 | Cross-pollination |" >> "$TRACKING";;
  time) echo "| workflow | +3 | Cross-pollination |" >> "$TRACKING";;
  
  # Default: any skill gains pattern-recognition (core skill)
  *) echo "| pattern-recognition | +3 | Cross-pollination |" >> "$TRACKING";;
esac
echo "| pattern-recognition | +3 | Core skill |" >> "$TRACKING"

# Update streak
STREAK_MSG=$(update_streak)

# Check for daily bonus
DAILY_MSG=$(daily_bonus)

# Auto level-up check
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

# Health check
HEALTH_MSG=$(skill_health_check)

# ============ OUTPUT ============
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
if [ -n "$STREAK_MSG" ]; then
    echo "$STREAK_MSG"
fi
if [ -n "$DAILY_MSG" ]; then
    echo "$DAILY_MSG"
fi
echo ""
echo "$HEALTH_MSG"
echo ""
get_leaderboard
echo ""
echo "📈 **XP GAINS:** $SKILL +$GAIN | pattern-recognition +3"
echo "🔍 **DISCOVERIES:** $REASON"
echo "🎯 **GOAL:** Help David during life → loved ones after ✓"
echo ""
echo "[skill:$SKILL] [skill:pattern-recognition] 🦜"

log_debug "xp-gain completed successfully"
# Skill recommendation function
get_recommendation() {
    local skill=$1
    local file="$WORKSPACE/skills/$skill/SKILL.md"
    
    if [ ! -f "$file" ]; then
        return
    fi
    
    local lines=$(wc -l < "$file")
    local sections=$(grep -c '^## ' "$file")
    
    if [ "$lines" -lt 50 ]; then
        echo "💡 Tip: Add more content to $skill (only $lines lines)"
    elif [ "$sections" -lt 5 ]; then
        echo "💡 Tip: $skill needs more sections ($sections found)"
    fi
}

# ============ TIER SYSTEM (RuneScape-style) ============
# Level 1 = starting, Max = mastery
# Tiers: Critical(150), Primary(100), Supporting(75)

get_tier_max() {
    local skill=$1
    case $skill in
        control-ui|skill-creator|workflow|learning|pattern-recognition|system)
            echo 150 ;;
        github|exec|web|messaging|projects|self-healing|shipwright|system-admin|knowledge|memory)
            echo 100 ;;
        *)
            echo 75 ;;
    esac
}
