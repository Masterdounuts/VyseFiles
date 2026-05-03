#!/bin/bash
# vyse-metrics.sh - Control UI-style metrics for terminal
# Usage: ./vyse-metrics.sh

WORKSPACE="/root/.openclaw/workspace"
cd "$WORKSPACE"

echo "=== Vyse Metrics ==="
echo ""

# Session status (using openclaw status)
echo "📊 Session:"
openclaw status 2>&1 | head -5
echo ""

# Gateway
echo "🌐 Gateway:"
openclaw gateway status 2>&1 | head -3
echo ""

# Memory age
echo "💾 Memory:"
LATEST=$(ls -t memory/2026-*.md 2>/dev/null | head -1)
if [ -n "$LATEST" ]; then
    AGE=$(($(date +%s) - $(stat -c %Y "$LATEST")) )
    echo "  Latest: $(basename $LATEST) ($(($AGE/3600))h old)"
else
    echo "  No memory files"
fi

echo "=================="