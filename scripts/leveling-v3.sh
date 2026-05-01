#!/bin/bash
# LEVELING SYSTEM v3 - Content-Based (Data-Driven)
# GOAL: "Help David during his life, then help loved ones after"
# Principle: Level reflects REAL knowledge in skill files

SKILL=${1:-}
WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
LOG="$WORKSPACE/kb/leveling-debug.log"

log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> "$LOG"
}

# ============ CONTENT-BASED LEVEL CALCULATION ============

get_skill_data() {
    local s=$1
    local file="$WORKSPACE/skills/$s/SKILL.md"
    
    if [ ! -f "$file" ]; then
        echo "0|0|0|0"
        return
    fi
    
    local lines=$(wc -l < "$file")
    local sections=$(grep -c '^## ' "$file")
    local subs=$(grep -c '^### ' "$file")
    local code=$(grep -c '^```' "$file")
    
    # Content weight = sections + subsections + (code blocks / 2) + (lines / 100)
    local weight=$((sections + subs + code/2 + lines/100))
    
    echo "$lines|$sections|$subs|$weight"
}

# Calculate level from content weight
calc_level() {
    local weight=$1
    # 1-7 base levels, then grow with content
    if [ "$weight" -lt 5 ]; then echo 1;
    elif [ "$weight" -lt 8 ]; then echo 2;
    elif [ "$weight" -lt 12 ]; then echo 3;
    elif [ "$weight" -lt 16 ]; then echo 4;
    elif [ "$weight" -lt 20 ]; then echo 5;
    elif [ "$weight" -lt 25 ]; then echo 6;
    else echo 7; fi
}

# Calculate dynamic max from content
calc_max() {
    local lines=$1
    local sections=$2
    local subs=$3
    
    # Max grows with content: 7 + subsections/2 + sections
    local max=$((7 + subs/2 + sections))
    echo "$max"
}

# ============ MAIN REPORT ============

if [ -z "$SKILL" ]; then
    echo "Usage: $0 <skill-name>"
    exit 1
fi

log "=== LEVELING v3 REPORT ==="
log "Skill: $SKILL"

# Get skill content data
data=$(get_skill_data "$SKILL")
lines=$(echo "$data" | cut -d'|' -f1)
sections=$(echo "$data" | cut -d'|' -f2)
subs=$(echo "$data" | cut -d'|' -f3)
weight=$(echo "$data" | cut -d'|' -f4)

# Calculate level and max
level=$(calc_level "$weight")
max=$(calc_max "$lines" "$sections" "$subs")

log "Lines: $lines, Sections: $sections, Subsections: $subs"
log "Weight: $weight → Level: $level, Max: $max"

# ============ OUTPUT ============

echo "📊 **CONTENT-BASED LEVEL:** $SKILL"
echo "   Content: $lines lines, $sections sections, $subs subsections"
echo "   Weight: $weight → Level $level / $max"
echo ""

# Show top skills by content
echo "🏆 **LEADERBOARD (by content):**"
for dir in $WORKSPACE/skills/*/; do
    s=$(basename "$dir")
    d=$(get_skill_data "$s")
    w=$(echo "$d" | cut -d'|' -f4)
    l=$(calc_level "$w")
    m=$(calc_max $(echo "$d" | tr '|' ' '))
    echo "$w|$l|$m|$s"
done | sort -t'|' -k1,1nr | head -5 | while IFS='|' read -r w l m n; do
    echo "   $n: L$l/$m (weight: $w)"
done

log "=== END REPORT ==="