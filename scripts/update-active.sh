#!/bin/bash
# update-active.sh - Update active.md with current session state
# Call after any significant action: ./update-active.sh "Your task here"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")"
ACTIVE_FILE="$WORKSPACE/active.md"

# Get timestamp
SESSION_TS=$(date -u +"%Y-%m-%d %H:%M UTC")

# Task argument (required)
TASK="${1:-Session active}"

# Update active.md
cat > "$ACTIVE_FILE" << EOF
# Active Session

**Started:** $SESSION_TS

## Current Task
$TASK

## Last Updated
$SESSION_TS (via update-active.sh)

EOF

echo "Updated active.md: $TASK"