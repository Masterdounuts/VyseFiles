#!/bin/bash
# Check session context % and trigger checkpoint + handoff if >80%

GATEWAY_URL="${OPENCLAW_URL:-http://localhost:18789}"
STATUS=$(curl -s -w "\n%{http_code}" "$GATEWAY_URL/api/session/status")
HTTP_CODE=$(echo "$STATUS" | tail -n1)
if [ "$HTTP_CODE" != "200" ]; then
  echo "Gateway health check failed (code $HTTP_CODE)"
  exit 1
fi
# Extract context percentage (e.g., "context":85)
CONTEXT=$(echo "$STATUS" | grep -o '"context":[-0-9]*' | grep -o '[0-9]*' | head -1)
if [ -z "$CONTEXT" ]; then
  echo "Could not parse context"
  exit 1
fi
if [ "$CONTEXT" -gt 80 ]; then
  echo "Context $CONTEXT% > 80% – forcing checkpoint and handoff"
  /root/.openclaw/workspace/scripts/auto-checkpoint.sh force
  # Create handoff summary
  HANDOFF="/root/.openclaw/workspace/memory/handoff_summary_$(date -u +%Y-%m-%d).md"
  echo "# Handoff Summary $(date -u)" > "$HANDOFF"
  echo "\n## Recent Decisions" >> "$HANDOFF"
  grep -i "decision" /root/.openclaw/workspace/memory/resume-point.md >> "$HANDOFF" || true
  echo "\n## Current Status" >> "$HANDOFF"
  cat /root/.openclaw/workspace/memory/resume-point.md >> "$HANDOFF"
  echo "Handoff summary written to $HANDOFF"
else
  echo "Context $CONTEXT% – no action needed"
fi