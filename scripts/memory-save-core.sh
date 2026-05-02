#!/bin/bash
# Memory Save Core - Auto-save important info to OUR memory
# GUARD: Only saves if it's actually about OUR work

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
CORE_DIR="$WORKSPACE/memory/core"

CONTENT="$*"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")

if [ -z "$CONTENT" ]; then
    echo "Usage: memory-save-core.sh <content>"
    echo "GUARD: Only saves if content relates to our work"
    exit 1
fi

# GUARD: Check if content relates to OUR work
# If it's about: skills, memory, projects, decisions, learnings -> SAVE
# If it's generic -> SKIP

GUARD_CHECK=$(echo "$CONTENT" | tr '[:upper:]' '[:lower:]')

# Keywords that mean it's about OUR work
OUR_WORK_KEYWORDS="skill|memory|script|github|project|decision|drill|learning|level|progress|system|vyse|david|game|arcadia"

# If doesn't match our work keywords -> skip
if ! echo "$GUARD_CHECK" | grep -qE "$OUR_WORK_KEYWORDS"; then
    echo "⏭️  GUARD: Skipped (not about our work)"
    exit 0
fi

# Detect where to save
detect_type() {
    local text="$1"
    text_lower=$(echo "$text" | tr '[:upper:]' '[:lower:]')
    
    if echo "$text_lower" | grep -qE "skill|learning|drill|level|progress"; then
        echo "skills"
    elif echo "$text_lower" | grep -qE "memory|recall|compact"; then
        echo "memory"
    elif echo "$text_lower" | grep -qE "script|system|github"; then
        echo "system"
    elif echo "$text_lower" | grep -qE "project|game|arcadia"; then
        echo "projects"
    else
        echo "general"
    fi
}

TYPE=$(detect_type "$CONTENT")
ENTRY="- $TIMESTAMP: $CONTENT"

case "$TYPE" in
    skills)
        FILE="$WORKSPACE/memory/daily/$(date +%Y-%m-%d).md"
        echo "$ENTRY" >> "$FILE"
        echo "✅ Saved (skills): $CONTENT"
        ;;
    memory)
        FILE="$WORKSPACE/memory/core/user.md"
        echo "$ENTRY" >> "$FILE"
        echo "✅ Saved (memory): $CONTENT"
        ;;
    system)
        FILE="$WORKSPACE/memory/core/user.md"
        echo "$ENTRY" >> "$FILE"
        echo "✅ Saved (system): $CONTENT"
        ;;
    projects)
        FILE="$WORKSPACE/memory/daily/$(date +%Y-%m-%d).md"
        echo "$ENTRY" >> "$FILE"
        echo "✅ Saved (projects): $CONTENT"
        ;;
    general)
        FILE="$WORKSPACE/memory/daily/$(date +%Y-%m-%d).md"
        echo "$ENTRY" >> "$FILE"
        echo "✅ Saved (general): $CONTENT"
        ;;
esac

echo "Done!"