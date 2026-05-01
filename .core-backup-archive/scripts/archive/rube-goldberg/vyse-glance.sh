#!/bin/bash
# vyse-glance.sh - One-line status for quick checks
# Usage: ./vyse-glance.sh

openclaw status 2>/dev/null | grep -E "context|cost|model" | head -3 | sed 's/^/  /'
echo "---"
echo "Gateway: $(openclaw gateway status 2>/dev/null | grep -i 'status' | head -1)"
echo "Memory:  $(ls -t memory/2026-*.md 2>/dev/null | head -1 | xargs -I{} basename {} 2>/dev/null || echo 'none')"