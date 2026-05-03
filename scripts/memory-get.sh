#!/bin/bash
# Vyse Memory Get - OUR work only

MEMORY_FILE="/home/openclaw/.openclaw/workspace-vyse/memory/ron-memory.md"

if [ $# -lt 1 ]; then
    echo "Usage: memory-get <category:subject:attribute>"
    echo "Example: memory-get project:skies:status"
    exit 1
fi

KEY="$1"
FULL_KEY="vyse:$KEY"

# Search for key - get the line
RESULT=$(grep "| $FULL_KEY |" "$MEMORY_FILE" | head -1)

if [ -z "$RESULT" ]; then
    echo "Key '$KEY' not found"
    exit 1
fi

# Extract value (between first and second | after the key)
# Format: | vyse:key | VALUE | TIMESTAMP |
VALUE=$(echo "$RESULT" | awk -F'|' '{gsub(/^[[:space:]]+|[|[:space:]]+$/, "", $3); print $3}')
echo "$VALUE"
