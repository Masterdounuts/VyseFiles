#!/bin/bash
# Content Progress Tracker - REPLACED XP
# Level is now purely content-based
# This script shows skill progress without XP

SKILL=${1:-system}
WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

get_content_progress() {
    local skill=$1
    local file="$WORKSPACE/skills/$skill/SKILL.md"
    
    if [ ! -f "$file" ]; then
        echo "Skill not found"
        return
    fi
    
    local lines=$(wc -l < "$file")
    local sections=$(grep -c "^## " "$file" 2>/dev/null || echo 0)
    local subsections=$(grep -c "^### " "$file" 2>/dev/null || echo 0)
    
    local level=$((sections + subsections + lines / 100))
    level=$((level > 1 ? level : 1))
    
    local content_weight=$((sections + subsections))
    local next_level=$((level + 1))
    local need_for_next=$((content_weight + 1))
    local to_next=$((need_for_next - content_weight))
    
    echo "Level: $level"
    echo "Content Weight: $content_weight"
    echo "Need for next: $need_for_next"
    echo "To next level: $to_next content units"
}

get_content_progress "$SKILL"
