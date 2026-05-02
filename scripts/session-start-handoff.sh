#!/bin/bash
# Session Start Handoff - AUTO-RECOVERY SYSTEM
# Runs automatically on session start

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
CORE_DIR="$WORKSPACE/memory/core"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

echo "=== Vyse Session Start - Auto Recovery ==="
echo "Time: $TIMESTAMP"

# ============================================
# STEP 1: LOAD CRITICAL MEMORY (CORE) FIRST
# ============================================
echo ""
echo "=== Loading Core Memory ==="

# Load user.md - David's info
if [ -f "$CORE_DIR/user.md" ]; then
    USER_INFO=$(cat "$CORE_DIR/user.md")
    echo "✅ Loaded: user.md"
else
    echo "⚠️  Missing: user.md"
fi

# Load goals.md - The mission
if [ -f "$CORE_DIR/goals.md" ]; then
    GOALS_INFO=$(cat "$CORE_DIR/goals.md")
    echo "✅ Loaded: goals.md"
else
    echo "⚠️  Missing: goals.md"
fi

# Load contacts.md - Important people
if [ -f "$CORE_DIR/contacts.md" ]; then
    CONTACTS_INFO=$(cat "$CORE_DIR/contacts.md")
    echo "✅ Loaded: contacts.md"
else
    echo "⚠️  Missing: contacts.md"
fi

echo ""
echo "=== Core Memory Loaded ==="

# ============================================
# STEP 2: Load HANDOFF if newer than active
# ============================================

# Get timestamps
HANDOFF_TIME=$(stat -c %Y "$HANDOFF_FILE" 2>/dev/null)
ACTIVE_TIME=$(stat -c %Y "$ACTIVE_FILE" 2>/dev/null)

# Always load HANDOFF if it's NEWER than active
if [ "$HANDOFF_TIME" -gt "$ACTIVE_TIME" ]; then
    echo "✅ HANDOFF is NEWER - loading previous session"
    {
        echo "# Active Session - $TIMESTAMP (RECOVERED)"
        echo ""
        echo "## Core Memory:"
        echo "- User: David (PT timezone)"
        echo "- Goal: Help David → loved ones after"
        echo ""
        echo "## Loaded from Previous Session:"
        echo ""
        cat "$HANDOFF_FILE"
        echo ""
        echo "---"
        echo "*Auto-recovered at session start: $TIMESTAMP*"
    } > "$ACTIVE_FILE"
else
    echo "✅ Active.md is current - continuing session"
fi

# ============================================
# STEP 3: Memory recall for important info
# ============================================

# Always run memory-recall to surface important memories
echo ""
echo "=== Memory Recall (Top 5) ==="
bash "$WORKSPACE/scripts/memory-recall.sh" 2>/dev/null | head -8

echo ""
echo "=== Session Ready ==="