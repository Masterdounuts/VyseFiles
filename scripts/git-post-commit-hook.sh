#!/bin/bash
# Post-commit hook - Auto-track XP for work done
# Runs after every commit automatically

XP_SCRIPT="/home/openclaw/.openclaw/workspace-vyse/scripts/xp-gain.sh"
WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

# Get the commit message and changed files
COMMIT_MSG=$(git log -1 --pretty=%B 2>/dev/null | head -1)
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD 2>/dev/null)

echo "📝 Commit: $COMMIT_MSG"

# Auto-detect skill from changed files
if echo "$CHANGED_FILES" | grep -q "^skills/"; then
    SKILL=$(echo "$CHANGED_FILES" | grep "^skills/" | cut -d/ -f2 | sort -u | head -1)
    if [ -n "$SKILL" ]; then
        echo "  → Skill work detected: $SKILL"
        # Add XP for skill work
        cd "$WORKSPACE"
        $XP_SCRIPT "$SKILL" 5 "Auto-tracked from commit: $COMMIT_MSG" >/dev/null 2>&1 || true
    fi
fi

# Auto-detect system improvements
if echo "$CHANGED_FILES" | grep -q "^scripts/"; then
    echo "  → Scripts improved"
    cd "$WORKSPACE"
    $XP_SCRIPT system 3 "Auto-tracked: scripts updated" >/dev/null 2>&1 || true
fi

# Auto-detect memory updates
if echo "$CHANGED_FILES" | grep -q "^memory/"; then
    echo "  → Memory updated"
    cd "$WORKSPACE"
    $XP_SCRIPT memory 2 "Auto-tracked: memory updated" >/dev/null 2>&1 || true
fi

# Pattern-recognition: always get credit for analysis
cd "$WORKSPACE"
$XP_SCRIPT pattern-recognition 1 "Auto: commit analysis" >/dev/null 2>&1 || true

echo "✅ Auto-XP tracking complete"