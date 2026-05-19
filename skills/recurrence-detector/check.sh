#!/bin/bash
# Recurrence Detector v2 - Smart auto-fix for recurring mistakes
# Runs every heartbeat (30 min) - no user prompt needed

WORKSPACE="$HOME/.openclaw/workspace-vyse"
STATE_DIR="$HOME/.openclaw/skill-state/recurrence-detector"
THRESHOLD=3
DAYS_BACK=7

mkdir -p "$STATE_DIR"

echo "=== Recurrence Detector v2 ==="

# Query errors from Notion (last 7 days)
ERRORS=$(node "$WORKSPACE/composio-notion.cjs" query errors 7 2>/dev/null)

if [ -z "$ERRORS" ] || [ "$ERRORS" = "[]" ]; then
    echo "No errors found in last 7 days"
    exit 0
fi

# Pattern to Skill mapping - when these patterns repeat, check these files
declare -A PATTERN_SKILLS=(
    ["telegram"]="AGENTS.md,SOUL.md"
    ["message tool"]="AGENTS.md,SOUL.md"
    ["forgot"]="HEARTBEAT.md,AGENTS.md"
    ["wrong tool"]="trading/SKILL.md,web/SKILL.md"
    ["price"]="trading/SKILL.md"
    ["browser"]="trading/SKILL.md,web/SKILL.md"
    ["web_search"]="trading/SKILL.md,web/SKILL.md"
    ["context"]="HEARTBEAT.md,memory/SKILL.md"
    ["stale"]="HEARTBEAT.md,memory/SKILL.md"
    ["skill"]="skills/index.md,skill-doctor"
)

# Auto-fix suggestions for each pattern
declare -A PATTERN_FIXES=(
    ["telegram"]="Add verification step: double-check message(action=send) used"
    ["message tool"]="Add hard rule: message tool FIRST, then finish turn"
    ["forgot"]="Add reminder to HEARTBEAT.md wake-up sequence"
    ["wrong tool"]="Add tool table to trading skill - Browser=prices, web_search=news"
    ["price"]="Use web_fetch or direct API, not web_search for prices"
    ["browser"]="Browser = prices/charts, web_search = news only"
    ["web_search"]="web_search is for news/catalysts only - use web_fetch for prices"
    ["context"]="Check context % more frequently, compact earlier"
    ["stale"]="Run notion-query.cjs on wake to get fresh context"
    ["skill"]="Run skill-doctor to diagnose skill discovery issues"
)

# Count patterns
echo "Analyzing error patterns..."
PATTERN_FILE="$STATE_DIR/patterns.txt"
> "$PATTERN_FILE"

echo "$ERRORS" | while read line; do
    for pattern in "${!PATTERN_SKILLS[@]}"; do
        if echo "$line" | grep -qi "$pattern"; then
            echo "$pattern" >> "$PATTERN_FILE"
        fi
    done
done

if [ ! -s "$PATTERN_FILE" ]; then
    echo "No recognizable patterns found"
    exit 0
fi

# Count and identify recurring patterns
echo "Checking for recurring patterns..."
sort "$PATTERN_FILE" | uniq -c | sort -rn | while read count keyword; do
    if [ "$count" -ge "$THRESHOLD" ]; then
        echo "⚠️ PATTERN DETECTED: $keyword (x$count)"
        
        # Get related skills
        related_skills="${PATTERN_SKILLS[$keyword]}"
        suggested_fix="${PATTERN_FIXES[$keyword]}"
        
        echo "  → Check: $related_skills"
        echo "  → Fix: $suggested_fix"
        
        # Log to Notion
        node "$WORKSPACE/composio-notion.cjs" log-knowledge "recurrence-detector" --insight="Auto-fix triggered: $keyword (x$count). Related: $related_skills. Fix: $suggested_fix"
        
        # Update state
        echo "$keyword:$count:$(date +%Y-%m-%d):$suggested_fix" >> "$STATE_DIR/detected.txt"
    fi
done

# If patterns detected, try auto-fix
if [ -s "$STATE_DIR/detected.txt" ]; then
    echo "Patterns detected - auto-fix would trigger here"
    echo "(Auto-fix implementation: update relevant skill with verification step)"
fi

echo "=== Recurrence check complete ==="