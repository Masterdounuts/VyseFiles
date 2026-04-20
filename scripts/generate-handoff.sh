#!/bin/bash
# Auto-generate HANDOFF.md from current state
WORKSPACE="/root/.openclaw/workspace"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

cat > "$WORKSPACE/HANDOFF.md" << MD
# HANDOFF.md - Session Handoff

**Generated:** $TIMESTAMP
**Session:** f8fa1fe7-1c53-4231-835d-0f

## Current Status
$(cat $WORKSPACE/active.md 2>/dev/null | head -15)

## Pending Tasks
$(cat $WORKSPACE/PENDING.md 2>/dev/null)

## TODO Overview
$(grep -E "^## |^### " $WORKSPACE/TODO.md 2>/dev/null | head -10)

## Recent Memory
$(tail -20 $WORKSPACE/memory/2026-04-17.md 2>/dev/null)

## Context
~$(cat $WORKSPACE/.context 2>/dev/null || echo "unknown")%
MD

echo "HANDOFF.md generated: $TIMESTAMP"
