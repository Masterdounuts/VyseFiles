#!/bin/bash
# Clear pending opportunities after review

WORKSPACE="/home/openclaw/.openclaw/workspace"
PENDING="$WORKSPACE/kb/stocks/agent/pending-opportunities.json"

echo "[]" > "$PENDING"
echo "Cleared pending opportunities"