#!/bin/bash
# resume-on-restart.sh - Run on wake to check for pending work
# Called by Auto-Resume-On-Wake cron job

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")"

echo "=== Vyse Resume Check $(date) ==="

# Check if heartbeat file exists and is recent
ALIVE_FILE="$WORKSPACE/.vyse-alive"
if [ -f "$ALIVE_FILE" ]; then
    LAST_HEARTBEAT=$(cat "$ALIVE_FILE" 2>/dev/null)
    echo "Last heartbeat: $LAST_HEARTBEAT"
else
    echo "No heartbeat file found"
fi

# Check resume-point.md for pending work
RESUME_FILE="$WORKSPACE/resume-point.md"
if [ -f "$RESUME_FILE" ]; then
    echo "Resume point found:"
    grep -A5 "Current Task" "$RESUME_FILE" 2>/dev/null || echo "  (empty)"
else
    echo "No resume point file"
fi

# Check active.md for in-progress work
ACTIVE_FILE="$WORKSPACE/active.md"
if [ -f "$ACTIVE_FILE" ]; then
    echo "Active session:"
    grep "Current Task" "$ACTIVE_FILE" 2>/dev/null || echo "  (none)"
fi

echo "=== Resume check complete ==="
exit 0