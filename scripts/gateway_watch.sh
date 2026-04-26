#!/usr/bin/env bash
# Health‑check the gateway; restart if unhealthy and alert via Telegram.

status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health || echo "000")
if [ "$status" != "200" ]; then
  echo "Gateway unhealthy (code $status) – restarting…"
  pkill -f "openclaw gateway" 2>/dev/null; openclaw gateway run &
  # Notify Telegram (requires bot token env var TG_BOT)
  if [ -n "$TG_BOT" ]; then
    curl -s -X POST "https://api.telegram.org/bot${TG_BOT}/sendMessage" -d "chat_id=8742211590&text=Gateway restarted due to health check failure."
  fi
else
  echo "Gateway healthy."
fi
