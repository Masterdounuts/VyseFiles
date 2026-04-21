#!/bin/bash
# Check Pending Volatile Opportunities
# Run by main agent to review and approve alerts
# Sends Telegram alert to David if opportunity is good

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
PENDING="$AGENT_DIR/pending-opportunities.json"
LOG="$AGENT_DIR/trading.log"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [CONFER] $1" | tee -a "$LOG"
}

# === SEND TELEGRAM ===
send_tg() {
    local msg="$1"
    local token=$(jq -r '.telegram.bot_token // empty' "$WORKSPACE/config.json" 2>/dev/null)
    local chat_id=$(jq -r '.telegram.chat_id // empty' "$WORKSPACE/config.json" 2>/dev/null)
    
    if [ -n "$token" ] && [ -n "$chat_id" ]; then
        curl -s -X POST "https://api.telegram.org/bot${token}/sendMessage" \
            -d "chat_id=${chat_id}" \
            -d "text=${msg}" \
            -d "parse_mode=Markdown" > /dev/null 2>&1
        log "TG alert sent"
    else
        log "TG not configured - would alert: $msg"
    fi
}

log "=== Checking Pending Opportunities ==="

# Check if pending file has content
if [ ! -s "$PENDING" ] || [ "$(cat "$PENDING")" = "[]" ]; then
    log "No pending opportunities"
    exit 0
fi

# Parse pending opportunities and send alerts
count=$(jq 'length' "$PENDING")
log "Found $count pending opportunity(ies)"

# Get each pending opportunity and evaluate
for i in $(seq 0 $((count - 1))); do
    symbol=$(jq -r ".[$i].symbol" "$PENDING")
    price=$(jq -r ".[$i].price" "$PENDING")
    direction=$(jq -r ".[$i].direction" "$PENDING")
    change=$(jq -r ".[$i].change" "$PENDING")
    shares=$(jq -r ".[$i].shares // \"?\"" "$PENDING")
    est_value=$(jq -r ".[$i].est_value // \"?\"" "$PENDING")
    
    log "Reviewing: $symbol $direction ${change}% @ \$$price"
    
    # Build alert message for David
    local emoji
    if [ "$direction" = "UP" ]; then
        emoji="🚀"
    else
        emoji="⚠️"
    fi
    
    local tg_msg="🦜 *VOLATILE ALERT* $emoji

*Symbol:* $symbol
*Price:* \$$price
*Move:* $change% $direction
*Suggested:* $shares shares (~$$est_value)

Reply with 'BUY $symbol' to confirm or 'SKIP' to ignore."
    
    send_tg "$tg_msg"
    log "Alert sent for $symbol"
done

log "=== Review Complete ==="
exit 0