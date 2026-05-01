#!/usr/bin/env bash
# Context-Monitor – alerts when session context exceeds threshold
# FIXED: Uses openclaw status CLI (parsed from text output)

THRESHOLD=80

# Get context percentage from CLI text output
CONTEXT=$(openclaw status 2>/dev/null | grep -oE 'Context: [0-9]+k/[0-9]+k \([0-9]+%\)' | grep -oE '[0-9]+%' | tr -d '%') || CONTEXT=0

if [ "$CONTEXT" -gt $THRESHOLD ]; then
  # Send Telegram alert
  TELEGRAM_BOT_TOKEN=$(grep -A2 '"telegram"' /root/.openclaw/openclaw.json | grep '"botToken"' | sed 's/.*"botToken"[[:space:]]*:[[:space:]]*"\([^\"]*\)".*/\1/')
  CHAT_ID="8742211590"
  MSG="⚠️ Context usage $CONTEXT% exceeds $THRESHOLD% – creating hand-off summary."
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=$CHAT_ID" -d "text=$MSG"
  # Run hand-off summary script
  /home/openclaw/.openclaw/workspace-vyse/scripts/hand-off-summary.sh
fi