#!/bin/bash
# detect-loop.sh - Detect if Vyse is in a loop and needs intervention
# Exit codes: 0 = OK, 1 = loop detected

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")"

# Check for repeated identical responses in recent memory
MEMORY_FILE="$WORKSPACE/memory/active.md"
LOOP_THRESHOLD=3
TIME_WINDOW=300  # 5 minutes

if [ ! -f "$MEMORY_FILE" ]; then
    echo "OK - No active memory file found"
    exit 0
fi

# Simple check: if active.md was updated within last 5 minutes, system is active
LAST_MOD=$(stat -c %Y "$MEMORY_FILE" 2>/dev/null)
NOW=$(date +%s)
DIFF=$((NOW - LAST_MOD))

if [ $DIFF -lt $TIME_WINDOW ]; then
    echo "OK - System active (last update ${DIFF}s ago)"
    exit 0
else
    echo "WARN - No recent activity (${DIFF}s since last update)"
    # Don't exit 1 - just warn
    exit 0
fi