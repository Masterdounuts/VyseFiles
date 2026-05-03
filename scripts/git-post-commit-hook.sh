#!/bin/bash
# Post-commit hook - Commit-time workflow
# Runs after every commit automatically

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

# Get the commit message and changed files
COMMIT_MSG=$(git log -1 --pretty=%B 2>/dev/null | head -1)
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD 2>/dev/null)

echo "📝 Commit: $COMMIT_MSG"
echo "Changed: $CHANGED_FILES"

# Note: XP tracking removed - using content-based leveling now
# Skills level based on actual content, not arbitrary points

echo "✅ Post-commit complete"