#!/usr/bin/env bash
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health)
if [ "$STATUS" = "200" ]; then
  echo "Gateway healthy"
else
  echo "Gateway DOWN - Status: $STATUS"
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=8742211590" -d "text=⚠️ Gateway is DOWN! Status: $STATUS"
fi
