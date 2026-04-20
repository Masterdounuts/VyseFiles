#!/usr/bin/env bash
# cron-failure-healer.sh – no external Python/jq dependencies

CHAT_ID="8742211590"
# Old and new script‑path prefixes
OLD_PREFIX="/root/.openclaw/scripts/"
NEW_PREFIX="/root/.openclaw/workspace/scripts/"

# Get list of failing job IDs (same as before)
mapfile -t ids < <(openclaw cron list | grep " error " | awk '{print $1}')

for id in "${ids[@]}"; do
  # Grab the full JSON definition for the job
  json=$(openclaw cron edit "$id" 2>/dev/null)
  [[ -z "$json" ]] && continue

  # ---------- payload.message ----------
  # Pull the raw message string (may be empty)
  msg=$(printf '%s' "$json" |
        sed -n 's/.*"message"[[:space:]]*:[[:space:]]*"\([^\"]*\)".*/\1/p')

  # If the message contains the old path, replace it
  if [[ "$msg" == *"$OLD_PREFIX"* ]]; then
    newmsg=${msg//$OLD_PREFIX/$NEW_PREFIX}
    openclaw cron edit "$id" --message "$newmsg"
  fi

  # ---------- delivery.channel & delivery.to ----------
  # Extract delivery info (channel and to) from the JSON. Fields are nested under "delivery".
  channel=$(printf '%s' "$json" |
    sed -n 's/.*"delivery"[^{]*{[^}]*"channel"[[:space:]]*:[[:space:]]*"\([^\"]*\)".*/\1/p')
  to=$(printf '%s' "$json" |
    sed -n 's/.*"delivery"[^{]*{[^}]*"to"[[:space:]]*:[[:space:]]*"\([^\"]*\)".*/\1/p')

  # If Telegram delivery but no target, set it
  if [[ "$channel" == "telegram" && -z "$to" ]]; then
    openclaw cron edit "$id" --to "$CHAT_ID"
  fi
done
echo "Cron failure healer run completed"
