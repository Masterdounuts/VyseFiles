#!/usr/bin/env bash
# Abort large prompts if token usage >60%. Earlier save = safer recovery.
# Uses openclaw status to get token %. Targets the main session specifically.

# Get usage from status output - find the main session (agent:main:main)
# Extract token percentage
usage=$(openclaw status 2>/dev/null | grep 'agent:main:main' | grep -oP '\d+k/\d+k \(\d+%\)' | grep -oP '\d+(?=%\))')

if [ -z "$usage" ]; then
  # Fallback: just get first session usage
  usage=$(openclaw status 2>/dev/null | grep -oP '\d+k/\d+k \(\d+%\)' | head -1 | grep -oP '\d+(?=%\))')
fi

if [ -z "$usage" ]; then
  echo "Could not determine usage; assuming OK."
  exit 0
fi

echo "Context usage: ${usage}%"

# Compare as integers (usage is already a whole number).
if [ "$usage" -gt 60 ]; then
  echo "Context usage high ($usage%). Signaling need for compaction."
  # CRITICAL: Save to memory BEFORE compaction
  /usr/bin/bash /root/.openclaw/workspace/scripts/pre-compact-save.sh 2>/dev/null || true
  exit 1
else
  echo "Context OK ($usage%)."
  exit 0
fi