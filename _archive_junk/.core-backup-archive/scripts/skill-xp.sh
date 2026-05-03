#!/bin/bash
# Show skill XP status
# Usage: ./skill-xp.sh [skill]

SKILL=${1:-all}
TRACKING="/home/openclaw/.openclaw/workspace-vyse/kb/xp-tracking.md"

if [ "$SKILL" = "all" ]; then
  echo "=== All Skills XP ==="
  tail -30 "$TRACKING"
else
  echo "=== $SKILL XP ==="
  grep "$SKILL" "$TRACKING" | tail -10
fi
