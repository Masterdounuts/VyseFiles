#!/bin/bash
# Scribe Memory Checkpoint Script
# Run before major operations (cleanup, config changes, etc.)

WORKSPACE="/home/openclaw/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M UTC)

echo "=== Scribe Checkpoint ==="
echo "Time: $TIME"
echo ""

# Get current session info
SESSION_INFO=$(session_status 2>/dev/null | head -5 || echo "session_status unavailable")

# Write to active.md
cat > "$WORKSPACE/memory/active.md" << EOF
# Active Session Checkpoint

**Last Updated:** $DATE $TIME
**Reason:** Pre-cleanup checkpoint

## Session Status
$SESSION_INFO

## What We Were Working On
_Edit this to describe current work before running cleanup_

---

*This file is read on wake-up to recover context after session restart*
EOF

echo "✅ Checkpoint saved to memory/active.md"
echo ""
echo "Now safe to run cleanup. After cleanup, verify session is still running."