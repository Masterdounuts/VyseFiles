#!/bin/bash
# vyse-dump-context.sh - One-click context dump for Control UI
# Writes result to state/last-dump.json

WORKSPACE="/root/.openclaw/workspace"
SCRIPT_DIR="$WORKSPACE/scripts"
STATE_DIR="$WORKSPACE/state"
DUMP_FILE="$STATE_DIR/last-dump.json"

mkdir -p "$STATE_DIR"

# Run the checkpoint script with force
# Using auto-checkpoint-new.sh (the newer version)
SCRIPT_NAME="auto-checkpoint-new.sh"
CHECKPOINT_SCRIPT="$SCRIPT_DIR/$SCRIPT_NAME"

if [ ! -f "$CHECKPOINT_SCRIPT" ]; then
    echo "Error: checkpoint script not found at $CHECKPOINT_SCRIPT"
    exit 1
fi

# Execute checkpoint
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%MZ")
OUTPUT=$("$CHECKPOINT_SCRIPT" force 2>&1)
EXIT_CODE=$?

# Determine the files that were updated (resume-point.md, HANDOFF.md)
RESUME_FILE="$WORKSPACE/memory/resume-point.md"
HANDOFF_FILE="$WORKSPACE/HANDOFF.md"

# Build JSON result
if [ $EXIT_CODE -eq 0 ]; then
    # Determine the most recent checkpoint file (we can use the resume-point)
    if [ -f "$RESUME_FILE" ]; then
        RESUME_PATH="$RESUME_FILE"
    else
        RESUME_PATH=""
    fi
    if [ -f "$HANDOFF_FILE" ]; then
        HANDOFF_PATH="$HANDOFF_FILE"
    else
        HANDOFF_PATH=""
    fi

    # Create JSON
    RESULT_JSON=$(cat <<EOF
{
  "success": true,
  "timestamp": "$TIMESTAMP",
  "message": "Context dumped successfully",
  "files": {
    "resume_point": "$RESUME_PATH",
    "handoff": "$HANDOFF_PATH"
  }
}
EOF
)
else
    RESULT_JSON=$(cat <<EOF
{
  "success": false,
  "timestamp": "$TIMESTAMP",
  "message": "Dump failed: $OUTPUT",
  "files": {}
}
EOF
)
fi

echo "$RESULT_JSON" > "$DUMP_FILE"
echo "Dump result written to $DUMP_FILE"

# Also output for stdout (in case UI reads)
cat "$DUMP_FILE"