#!/bin/bash
# Session End Handoff - Saves active.md to HANDOFF.md
# GOAL FILTER: Only memories that serve "Help David during life → loved ones after"

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
ACTIVE_FILE="$WORKSPACE/active.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"
MEMORY_FILE="$WORKSPACE/memory/2026-05-01.md"

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

echo "🎯 GOAL FILTER: Checking what serves the goal..."
echo ""

# Check if active.md has goal-serving content
if grep -qi "goal\|david\|help\|survive\|can't die\|learning\|system\|skill\|memory\|workflow" "$ACTIVE_FILE"; then
    echo "✅ Content aligns with goal - saving to handoff"
    
    # Copy active.md to HANDOFF.md with header
    {
        echo "# Session Handoff"
        echo "*Auto-generated from active.md - $TIMESTAMP*"
        echo ""
        echo "🎯 **GOAL:** Help David during life → loved ones after"
        echo ""
        echo "---"
        echo ""
        cat "$ACTIVE_FILE"
    } > "$HANDOFF_FILE"
    
    # Also append to today's memory
    {
        echo ""
        echo "## Handoff - $TIMESTAMP"
        echo "Loaded from active.md (goal-aligned)"
        echo ""
    } >> "$MEMORY_FILE"
    
    echo "Session handoff complete: active.md → HANDOFF.md ($TIMESTAMP)"
else
    echo "⚠️  Content may not align with goal - still saving but flagging"
    {
        echo "# Session Handoff"
        echo "*Auto-generated - $TIMESTAMP - CHECK GOAL ALIGNMENT*"
        echo ""
        cat "$ACTIVE_FILE"
    } > "$HANDOFF_FILE"
fi
