#!/bin/bash
# Skill Growth Guard System
# Prevents vanity metrics and ensures genuine growth
# VERSION: 1.0 - Starts as warnings, promotes to enforcement after testing

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
GUARD_LOG="$WORKSPACE/kb/guard-audit.log"
GUARD_CONFIG="$WORKSPACE/kb/guard-config.json"

# Default: warnings only (not enforcement)
GUARD_ENABLED=${GUARD_ENABLED:-false}
MODE=${MODE:-"WARN"}  # WARN or ENFORCE

mkdir -p "$(dirname "$GUARD_LOG")"

log_guard() {
    local guard=$1
    local status=$2
    local skill=$3
    local message=$4
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] [$guard] [$status] $skill: $message" >> "$GUARD_LOG"
}

# ============ GUARD 1: Content Uniqueness ============
# Warn if new content is too similar to existing content

guard_content_uniqueness() {
    local skill=$1
    local file="$WORKSPACE/skills/$skill/SKILL.md"
    
    [ ! -f "$file" ] && return
    
    # Get all paragraphs (text between blank lines)
    local paragraphs=$(awk 'BEGIN{RS="\n\n";ORS="\n---\n"}1' "$file" 2>/dev/null)
    local count=0
    local duplicates=0
    
    # Check for similar paragraphs (simple hash-based)
    while IFS= read -r para; do
        [ ${#para} -lt 50 ] && continue  # Skip short paras
        hash=$(echo "$para" | tr -d ' \n' | md5sum | cut -d' ' -f1)
        if grep -q "$hash" "$WORKSPACE/kb/content-hashes.txt" 2>/dev/null; then
            duplicates=$((duplicates + 1))
        else
            echo "$hash" >> "$WORKSPACE/kb/content-hashes.txt"
        fi
        count=$((count + 1))
    done <<< "$paragraphs"
    
    local ratio=0
    [ $count -gt 0 ] && ratio=$((duplicates * 100 / count))
    
    if [ $ratio -gt 30 ]; then
        local msg="High duplicate content: $ratio% ($duplicates/$count paragraphs)"
        log_guard "UNIQUENESS" "WARN" "$skill" "$msg"
        echo "⚠️ GUARD: $msg"
        return 1
    fi
    
    log_guard "UNIQUENESS" "PASS" "$skill" "$ratio% duplicates (OK)"
    return 0
}

# ============ GUARD 2: Level-Content Ratio ============
# Warn if level doesn't match actual content weight

guard_level_content_ratio() {
    local skill=$1
    local file="$WORKSPACE/skills/$skill/SKILL.md"
    
    [ ! -f "$file" ] && return
    
    # Calculate content-based level
    local lines=$(wc -l < "$file")
    local sections=$(grep -c "^## " "$file" 2>/dev/null || echo 0)
    local subsections=$(grep -c "^### " "$file" 2>/dev/null || echo 0)
    
    local content_level=$((sections + subsections + lines / 100))
    local content_max=$((7 + subsections / 2 + sections))
    
    # Get current level
    local current=$(grep "Current Status:" "$file" | head -1 | sed 's/.*Level \([0-9]*\).*/\1/')
    local max=$(grep "Max Level:" "$file" | head -1 | grep -oE '[0-9]+' | head -1)
    
    # Allow some variance (±2 levels)
    local diff=$((current - content_level))
    diff=${diff#-}  # absolute value
    
    if [ $diff -gt 3 ]; then
        local msg="Level mismatch: file L$current vs content L$content_level (diff: $diff)"
        log_guard "LEVEL-RATIO" "WARN" "$skill" "$msg"
        echo "⚠️ GUARD: $msg"
        return 1
    fi
    
    log_guard "LEVEL-RATIO" "PASS" "$skill" "L$current vs L$content_level (diff: $diff, OK)"
    return 0
}

# ============ GUARD 3: Discovery Uniqueness ============
# Warn if discoveries are templates, not unique insights

guard_discovery_uniqueness() {
    local skill=$1
    local file="$WORKSPACE/skills/$skill/SKILL.md"
    
    [ ! -f "$file" ] && return
    
    # Count discovery sections
    local discoveries=$(grep -c "^## Discovery\|^## Chain Drill Discovery" "$file" 2>/dev/null || echo 0)
    [ $discoveries -eq 0 ] && return 0
    
    # Check for template content
    local template_count=0
    if grep -qi "drill without\|empty growth\|vanity metric\|template\|same text" "$file" 2>/dev/null; then
        template_count=$(grep -ci "drill without\|empty growth\|vanity metric" "$file")
    fi
    
    if [ $template_count -gt 3 ]; then
        local msg="Too many template discoveries: $template_count template-like lines"
        log_guard "DISCOVERY" "WARN" "$skill" "$msg"
        echo "⚠️ GUARD: $msg"
        return 1
    fi
    
    log_guard "DISCOVERY" "PASS" "$skill" "$discoveries discoveries, $template_count templates (OK)"
    return 0
}

# ============ MASTER GUARD CHECK ============
# Run all guards on a skill

guard_skill() {
    local skill=$1
    local result=0
    
    echo "=== Guard Check: $skill ==="
    
    guard_content_uniqueness "$skill" || result=1
    guard_level_content_ratio "$skill" || result=1
    guard_discovery_uniqueness "$skill" || result=1
    
    if [ $result -eq 0 ]; then
        echo "✅ $skill: All guards passed"
    else
        echo "⚠️ $skill: Warnings detected"
    fi
    
    return $result
}

# Run on all skills
guard_all() {
    echo "========================================"
    echo "GUARD SYSTEM - $MODE MODE"
    echo "========================================"
    echo ""
    
    local failed=0
    local passed=0
    
    for skill_dir in $WORKSPACE/skills/*/; do
        skill=$(basename "$skill_dir")
        guard_skill "$skill"
        [ $? -eq 0 ] && passed=$((passed+1)) || failed=$((failed+1))
    done
    
    echo ""
    echo "========================================"
    echo "GUARD RESULTS: $passed passed, $failed warned"
    echo "Log: $GUARD_LOG"
    echo "========================================"
}

# Run on specific skill
if [ -n "$1" ]; then
    guard_skill "$1"
else
    guard_all
fi
