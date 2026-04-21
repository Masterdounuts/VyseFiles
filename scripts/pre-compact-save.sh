#!/bin/bash
# Pre-compaction save - CTX-efficient checkpoint
# Run this before context gets too full

WORKSPACE="/home/openclaw/.openclaw/workspace"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
TODAY=$(date -u +"%Y-%m-%d")

# 1. Update active.md with current state (always keep this fresh)
echo "# Active Session

*Current task tracking.*

**Last checkpoint:** $TIMESTAMP

## Current Task
$(cat $WORKSPACE/TODO.md 2>/dev/null | grep -A5 "## Current Focus" | head -8)

## Quick Status
- Portfolio: Check portfolio.md
- Crons: Check cron status
- Memory: See memory/$TODAY.md

---
*Auto-checkpoint*" > "$WORKSPACE/active.md"

# 2. Update resume-point.md (critical for session recovery)
echo "# Resume Point

**Checkpoint:** $TIMESTAMP

## What's Happening
$(tail -20 $WORKSPACE/HANDOFF.md 2>/dev/null | head -15)

## Key Files
- portfolio.md - holdings & targets
- AGENTS.md - trading rules
- TODO.md - task list

## On Wake
1. Read HANDOFF.md
2. Check TODO.md for active tasks
3. Check PENDING.md for queued actions

---
*Updated: $TIMESTAMP*" > "$WORKSPACE/memory/resume-point.md"

# 3. Append critical state to daily memory (only if significant)
if [[ -f "$WORKSPACE/memory/$TODAY.md" ]]; then
    # Check if we already logged in the last hour
    if ! grep -q "$TIMESTAMP" "$WORKSPACE/memory/$TODAY.md" 2>/dev/null; then
        echo "---" >> "$WORKSPACE/memory/$TODAY.md"
        echo "### Checkpoint $TIMESTAMP" >> "$WORKSPACE/memory/$TODAY.md"
        echo "Context checkpoint saved. State: active.md + resume-point.md" >> "$WORKSPACE/memory/$TODAY.md"
    fi
fi

echo "✅ Checkpoint saved: $TIMESTAMP"