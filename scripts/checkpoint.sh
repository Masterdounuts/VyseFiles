#!/bin/bash
# Vyse Pre-Compaction Checkpoint Script
# Run manually or add to external cron: */5 * * * * /root/.openclaw/workspace/scripts/checkpoint.sh

WORKSPACE="/root/.openclaw/workspace"
TIMESTAMP=$(date +%Y-%m-%d_%H%M)

# Check context level - if >50%, save checkpoint
CONTEXT=$(curl -s http://localhost:8080/status 2>/dev/null | grep -oP 'Context: \K[0-9]+' || echo "0")

echo "[$TIMESTAMP] Context: $CONTEXT%"

if [ "$CONTEXT" -gt 50 ]; then
    echo "[$TIMESTAMP] Context >50%, creating checkpoint..."
    
    # Save todo state
    cp "$WORKSPACE/TODO.md" "$WORKSPACE/memory/pre-compact-TODO-$TIMESTAMP.md"
    
    # Save current session summary
    echo "# Pre-Compaction Checkpoint - $TIMESTAMP" > "$WORKSPACE/memory/compact-$TIMESTAMP.md"
    echo "Context: $CONTEXT%" >> "$WORKSPACE/memory/compact-$TIMESTAMP.md"
    echo "Last user message: Checkpoint auto-save" >> "$WORKSPACE/memory/compact-$TIMESTAMP.md"
    echo "Files preserved: TODO.md" >> "$WORKSPACE/memory/compact-$TIMESTAMP.md"
    
    echo "[$TIMESTAMP] Checkpoint saved to memory/compact-$TIMESTAMP.md"
else
    echo "[$TIMESTAMP] Context OK, no checkpoint needed"
fi
