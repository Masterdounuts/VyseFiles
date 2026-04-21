#!/bin/bash
# Context monitor - checks session context % and triggers checkpoint
# Run this frequently (e.g., every 5 min)

WORKSPACE="/home/openclaw/.openclaw/workspace"
LOG="$WORKSPACE/memory/context-monitor.log"

# Get session status (OpenClaw internal)
# We can't directly read context % but we can use OpenClaw's status
# For now, create a manual checkpoint trigger based on session age

SESSION_AGE_FILE="$WORKSPACE/.session_start"
NOW=$(date +%s)

# Record session start if not exists
if [[ ! -f "$SESSION_AGE_FILE" ]]; then
    echo "$NOW" > "$SESSION_AGE_FILE"
    exit 0
fi

START=$(cat "$SESSION_AGE_FILE")
ELAPSED=$((NOW - START))

# Context checkpoint triggers:
# - After 15 min: checkpoint (60%ish)
# - After 25 min: force checkpoint (80%ish)
# - After 35 min: CRITICAL - save daily memory

if [[ $ELAPSED -ge 2100 ]] && [[ ! -f "$WORKSPACE/.critical-saved" ]]; then
    # 35+ min - CRITICAL
    echo "$(date -u +%H:%M) UTC - CRITICAL: Context critical, saving daily memory" >> "$LOG"
    bash "$WORKSPACE/scripts/pre-compact-save.sh"
    touch "$WORKSPACE/.critical-saved"
    # Alert to Telegram
    echo "🔴 CTX CRITICAL: Saved checkpoint, session may reset soon"
elif [[ $ELAPSED -ge 1500 ]] && [[ ! -f "$WORKSPACE/.checkpoint-70" ]]; then
    # 25+ min - 70% threshold
    echo "$(date -u +%H:%M) UTC - 70%: Running checkpoint" >> "$LOG"
    bash "$WORKSPACE/scripts/pre-compact-save.sh"
    touch "$WORKSPACE/.checkpoint-70"
elif [[ $ELAPSED -ge 900 ]] && [[ ! -f "$WORKSPACE/.checkpoint-60" ]]; then
    # 15+ min - 60% threshold
    echo "$(date -u +%H:%M) UTC - 60%: Light checkpoint" >> "$LOG"
    bash "$WORKSPACE/scripts/pre-compact-save.sh"
    touch "$WORKSPACE/.checkpoint-60"
fi

echo "✓ Context monitor ran, session age: $((ELAPSED/60)) min"