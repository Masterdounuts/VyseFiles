#!/usr/bin/env bash
# Gateway health check
code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health)
if [[ "$code" != "200" ]]; then
  # Send Telegram alert (replace <TOKEN> and <CHAT_ID> with actual values)
  curl -s -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" -d chat_id="<CHAT_ID>" -d text="⚠️ Gateway is DOWN! Status: $code"
fi
# Ensure memory-wiki enabled in config
config="/root/.openclaw/workspace/config/openclaw.json"
if [[ -f "$config" ]]; then
  if jq -e '."memory-wiki" == false' "$config" > /dev/null 2>&1; then
    cp "${config}.bak" "$config"
  fi
fi
