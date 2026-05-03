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
# STEP 4: Load HANDOFF if newer than active
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
# STEP 5: Inject CORE + HEARTBEAT (after HANDOFF so not wiped)
# ============================================
echo "" >> "$ACTIVE_FILE"
echo "---" >> "$ACTIVE_FILE"
echo "## Core Memory (injected):" >> "$ACTIVE_FILE"

if [ -f "$CORE_DIR/user.md" ]; then
    echo "" >> "$ACTIVE_FILE"
    echo "### User (David):" >> "$ACTIVE_FILE"
    cat "$CORE_DIR/user.md" >> "$ACTIVE_FILE"
fi

if [ -f "$CORE_DIR/goals.md" ]; then
    echo "" >> "$ACTIVE_FILE"
    echo "### Goals:" >> "$ACTIVE_FILE"
    cat "$CORE_DIR/goals.md" >> "$ACTIVE_FILE"
fi

if [ -f "$CORE_DIR/contacts.md" ]; then
    echo "" >> "$ACTIVE_FILE"
    echo "### Contacts:" >> "$ACTIVE_FILE"
    cat "$CORE_DIR/contacts.md" >> "$ACTIVE_FILE"
fi

HEARTBEAT_FILE="$WORKSPACE/HEARTBEAT.md"
if [ -f "$HEARTBEAT_FILE" ]; then
    echo "" >> "$ACTIVE_FILE"
    echo "---" >> "$ACTIVE_FILE"
    echo "## HEARTBEAT:" >> "$ACTIVE_FILE"
    cat "$HEARTBEAT_FILE" >> "$ACTIVE_FILE"
fi

echo "✅ Injected core + HEARTBEAT"

# ============================================
# STEP 5b: APPEND TO MEMORY.MD FOR BOOTSTRAP LOADING
# ============================================
# MEMORY.md is a recognized bootstrap file - append handoff there
MEMORY_FILE="$WORKSPACE/MEMORY.md"
if [ -f "$HANDOFF_FILE" ]; then
    # Only append if not already appended today (check for today's date)
    TODAY=$(date +%Y-%m-%d)
    if ! grep -q "## Session Handoff - $TODAY" "$MEMORY_FILE" 2>/dev/null; then
        echo "" >> "$MEMORY_FILE"
        echo "" >> "$MEMORY_FILE"
        echo "## Session Handoff - $TODAY" >> "$MEMORY_FILE"
        echo "*Auto-inserted by session-start-handoff.sh*" >> "$MEMORY_FILE"
        echo "" >> "$MEMORY_FILE"
        cat "$HANDOFF_FILE" >> "$MEMORY_FILE"
        echo "✅ Appended handoff to MEMORY.md (loads in bootstrap)"
    else
        echo "✅ Today's handoff already in MEMORY.md"
    fi
fi

# ============================================
# STEP 6: Memory recall for important info
# ============================================

echo ""
echo "=== Memory Recall (Top 5) ==="
bash "$WORKSPACE/scripts/memory-recall.sh" 2>/dev/null | head -8

echo ""
echo "=== Session Ready ==="

# ============================================
# STEP 7: Auto-debug - Show skill status
# ============================================
echo ""
echo "=== Debug Status (Auto) ==="
bash "$WORKSPACE/scripts/debug-display.sh" system 2>/dev/null