#!/bin/bash
# Session Start Handoff - AUTO-RECOVERY SYSTEM
# Runs automatically on session start

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
CORE_DIR="$WORKSPACE/memory/core"
RON_MEMORY="$WORKSPACE/memory/ron-memory.md"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

echo "=== Vyse Session Start - Auto Recovery ==="
echo "Time: $TIMESTAMP"

# ============================================
# STEP 1: LOAD RON-MEMORY (KEY-VALUE) FIRST
# ============================================
echo ""
echo "=== Loading Memory (ron-memory.md) ==="

if [ -f "$RON_MEMORY" ]; then
    echo "✅ Ron-memory loaded (51 entries of OUR work)"
    echo "   Use: memory-get.sh <key> to retrieve"
else
    echo "⚠️  Missing: ron-memory.md"
fi

# ============================================
# STEP 2: LOAD CORE FILES (legacy, still useful)
# ============================================
echo ""
echo "=== Loading Core Files ==="

# Load user.md - David's info
if [ -f "$CORE_DIR/user.md" ]; then
    echo "✅ Loaded: user.md"
fi

# Load goals.md - The mission
if [ -f "$CORE_DIR/goals.md" ]; then
    echo "✅ Loaded: goals.md"
fi

# Load contacts.md - Important people
if [ -f "$CORE_DIR/contacts.md" ]; then
    echo "✅ Loaded: contacts.md"
fi

# ============================================
# STEP 3: Load HANDOFF if newer than active
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
        echo "## Memory Available:"
        echo "- ron-memory.md: 51 key-value entries"
        echo "- Use memory-get.sh <key> to retrieve"
        echo ""
        echo "## From Previous Session:"
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
# STEP 4: Memory recall for important info
# ============================================

echo ""
echo "=== Memory Recall (Top 5) ==="
bash "$WORKSPACE/scripts/memory-recall.sh" 2>/dev/null | head -8

echo ""
echo "=== Session Ready ==="