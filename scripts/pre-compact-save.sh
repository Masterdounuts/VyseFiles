#!/bin/bash
# Pre-Compaction Save - Run BEFORE context compaction
# Ensures durable memory survives compaction and session reset

set -e  # Exit on error

WORKSPACE="/home/openclaw/.openclaw/workspace"
DATE=$(date -u +%Y-%m-%d)
MEMORY_FILE="$WORKSPACE/memory/$DATE.md"
LOG_FILE="$WORKSPACE/logs/compact-save.log"

mkdir -p "$WORKSPACE/memory" "$WORKSPACE/logs"

echo "$(date -u +"%Y-%m-%d %H:%M UTC") PRE-COMPACT SAVE TRIGGERED" >> "$LOG_FILE"

# Track errors
ERRORS=0

# 1. Capture session status
STATUS_OUTPUT=$(openclaw status 2>/dev/null | head -30) || { echo "ERROR: openclaw status failed" >> "$LOG_FILE"; ERRORS=$((ERRORS+1)); }
CONTEXT_PCT=$(echo "$STATUS_OUTPUT" | grep -oP '\d+k/\d+k \(\d+%\)' | head -1)

# 2. Read current resume point
RESUME_CONTENT=""
if [ -f "$WORKSPACE/memory/resume-point.md" ]; then
    RESUME_CONTENT=$(cat "$WORKSPACE/memory/resume-point.md") || { echo "ERROR: failed to read resume-point.md" >> "$LOG_FILE"; ERRORS=$((ERRORS+1)); }
fi

# 3. Read active TODOs
TODOS=""
if [ -f "$WORKSPACE/TODO.md" ]; then
    TODOS=$(grep -E '^##|^###|^\- \[ \]|^\- \[x\]' "$WORKSPACE/TODO.md" | head -20) || { echo "ERROR: failed to read TODO.md" >> "$LOG_FILE"; ERRORS=$((ERRORS+1)); }
fi

# 4. Read portfolio state
PORTFOLIO=""
if [ -f "$WORKSPACE/portfolio.md" ]; then
    PORTFOLIO=$(grep -E '^\|.*\|.*\|' "$WORKSPACE/portfolio.md" | head -10) || { echo "ERROR: failed to read portfolio.md" >> "$LOG_FILE"; ERRORS=$((ERRORS+1)); }
fi

# 5. Append to daily memory (merge with existing)
{
    echo ""
    echo "---"
    echo "## Pre-Compaction Save: $(date -u +"%H:%M UTC")"
    echo ""
    echo "### Context: $CONTEXT_PCT"
    echo ""
    echo "### Resume Point"
    echo "$RESUME_CONTENT" | head -25
    echo ""
    echo "### Active TODOs"
    echo "$TODOS"
    echo ""
    echo "### Portfolio"
    echo "$PORTFOLIO"
} >> "$MEMORY_FILE" || { echo "ERROR: failed to write to $MEMORY_FILE" >> "$LOG_FILE"; ERRORS=$((ERRORS+1)); }

echo "$(date -u +"%Y-%m-%d %H:%M UTC") ✓ Saved to $MEMORY_FILE" >> "$LOG_FILE"

# 6. Also update active.md with "just saved" marker
if [ -f "$WORKSPACE/memory/active.md" ]; then
    sed -i "s/Last checkpoint:.*/Last checkpoint: $(date -u +"%Y-%m-%d %H:%M UTC") (pre-compact)/" "$WORKSPACE/memory/active.md" 2>/dev/null || { echo "ERROR: failed to update active.md" >> "$LOG_FILE"; ERRORS=$((ERRORS+1)); }
fi

echo "Pre-compact save complete"
exit $ERRORS
