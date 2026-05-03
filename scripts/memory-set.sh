#!/bin/bash
# Vyse Memory Set - OUR work only
# Uses structure: vyse:<category>:<subject>:<attribute>

MEMORY_FILE="/home/openclaw/.openclaw/workspace-vyse/memory/ron-memory.md"

if [ $# -lt 2 ]; then
    echo "Usage: memory-set <category:subject:attribute> <value>"
    echo "Example: memory-set project:skies:status active"
    exit 1
fi

KEY="$1"
VALUE="$2"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")

# Expanded guard - includes ALL vital categories for me working
OUR_KEYWORDS="vyse|skill|memory|script|project|decision|system|github|level|drill|chain|guard|tier|content|identity|soul|agents|user|heartbeat|boot|recovery|principle|framework|file|accountability|workspace|primary_brain|second_brain"

if ! echo "$KEY" | grep -qE "$OUR_KEYWORDS"; then
    echo "⏭️  GUARD: Only saves OUR work"
    exit 0
fi

# Build full key
FULL_KEY="vyse:$KEY"

# Check if key exists, update or append
if grep -q "| $FULL_KEY |" "$MEMORY_FILE" 2>/dev/null; then
    sed -i "s/| $FULL_KEY |.*|.*|/| $FULL_KEY | $VALUE | $TIMESTAMP |/" "$MEMORY_FILE"
    echo "✅ Updated: $FULL_KEY = $VALUE"
else
    echo "| $FULL_KEY | $VALUE | $TIMESTAMP |" >> "$MEMORY_FILE"
    echo "✅ Saved: $FULL_KEY = $VALUE"
fi
