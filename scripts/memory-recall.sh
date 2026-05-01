#!/bin/bash
# Memory Recall System - Scores and retrieves important memories
# Usage: ./memory-recall.sh [query]

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
MEMORY_DIR="$WORKSPACE/memory"
QUERY="${1:-""}"

echo "=== Memory Recall System ==="
echo "Query: $QUERY"
echo ""

# Scoring criteria for importance
SCORED_FILE="/tmp/memory-scored.txt"
> "$SCORED_FILE"

# Score each memory file
for file in "$MEMORY_DIR"/*.md; do
    if [ -f "$file" ]; then
        SCORE=0
        CONTENT=$(cat "$file")
        
        # Goal-aligned keywords (higher score)
        echo "$CONTENT" | grep -qi "goal\|david\|help\|can't die\|survive\|important\|critical" && SCORE=$((SCORE + 10))
        
        # Learning/fixes (medium score)
        echo "$CONTENT" | grep -qi "fix\|learn\|discover\|pattern\|root cause\|breakthrough" && SCORE=$((SCORE + 5))
        
        # Timestamps (recent = higher)
        if echo "$CONTENT" | grep -q "2026-05-01"; then
            SCORE=$((SCORE + 3))
        fi
        
        # Decisions made
        echo "$CONTENT" | grep -qi "decision\|choose\|commit\|will do" && SCORE=$((SCORE + 5))
        
        # System status
        echo "$CONTENT" | grep -qi "cron\|working\|broken\|error\|fixed" && SCORE=$((SCORE + 3))
        
        # Output scored memories
        if [ $SCORE -gt 0 ]; then
            echo "$SCORE: $file" >> "$SCORED_FILE"
        fi
    fi
done

# Sort by score (highest first)
echo "=== Important Memories (scored) ==="
sort -rn "$SCORED_FILE" | head -10

echo ""
echo "=== Quick Recall (Today's Entries) ==="
if [ -f "$MEMORY_DIR/2026-05-01.md" ]; then
    grep -A2 "^## " "$MEMORY_DIR/2026-05-01.md" | head -20
fi
