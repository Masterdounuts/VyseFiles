#!/usr/bin/env bash
# Context-Monitor – alerts when session context exceeds threshold
# Simple version using openclaw status

THRESHOLD=80

# Get just the first context percentage match
STATUS=$(openclaw status 2>&1)
CONTEXT=$(echo "$STATUS" | grep -oE '[0-9]+%' | head -1 | tr -d '%')

# Fallback to 0 if empty
CONTEXT=${CONTEXT:-0}

# Only alert if over threshold
if [ "$CONTEXT" -gt "$THRESHOLD" ] 2>/dev/null; then
    echo "ALERT: Context at ${CONTEXT}%"
fi