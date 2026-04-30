#!/usr/bin/env bash
# Context‑Monitor – alerts when session context exceeds threshold and creates a hand‑off summary

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
STATUS_URL="http://localhost:18789/api/session/status"
THRESHOLD=80

# Get context percentage (JSON field "context")
JSON=$(curl -s "$STATUS_URL")
CONTEXT=$(echo "$JSON" | grep -o '"context"[[:space:]]*:[[:space:]]*[0-9]*' | head -1 | awk -F: '{print $2}' | tr -d ' ') || CONTEXT=0

if [ "$CONTEXT" -gt $THRESHOLD ]; then
  # Send Telegram alert
  TELEGRAM_BOT_TOKEN=$(grep -A2 '"telegram"' /root/.openclaw/openclaw.json | grep '"botToken"' | sed 's/.*"botToken"[[:space:]]*:[[:space:]]*"\([^\"]*\)".*/\1/')
  CHAT_ID="8742211590"
  MSG="⚠️ Context usage $CONTEXT% exceeds $THRESHOLD% – creating hand‑off summary."
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=$CHAT_ID" -d "text=$MSG"
  # Run hand‑off summary script
  /home/openclaw/.openclaw/workspace-vyse/scripts/hand-off-summary.sh
fi