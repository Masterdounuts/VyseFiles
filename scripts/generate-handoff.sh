#!/bin/bash
# Auto-generate HANDOFF.md from current state
WORKSPACE="/home/openclaw/.openclaw/workspace"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
TODAY=$(date -u +"%Y-%m-%d")
SESSION_KEY=$(cat $WORKSPACE/.session_key 2>/dev/null || echo "unknown")

# Find most recent memory file
RECENT_MEM=$(ls -t $WORKSPACE/memory/2026-04-*.md 2>/dev/null | head -1)

cat > "$WORKSPACE/HANDOFF.md" << MD
# HANDOFF.md - Session Handoff

**Generated:** $TIMESTAMP
**Session:** $SESSION_KEY

## Current Status
$(cat $WORKSPACE/active.md 2>/dev/null | head -15)

## Pending Tasks
$(cat $WORKSPACE/PENDING.md 2>/dev/null)

## Recent Decisions
$(grep -h "^### 20" $WORKSPACE/memory/2026-04-*.md 2>/dev/null | tail -5)

## Recent Memory
$(tail -15 "$RECENT_MEM" 2>/dev/null)

## Context
~$(cat $WORKSPACE/.context 2>/dev/null || echo "unknown")%
MD

echo "HANDOFF.md generated: $TIMESTAMP"