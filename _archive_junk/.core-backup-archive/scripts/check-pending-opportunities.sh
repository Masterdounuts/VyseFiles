#!/bin/bash
# Check Pending Volatile Opportunities
# Vyse (First Mate) runs this to review Quartermaster's alerts
# Sends Telegram alert to David if opportunity is good

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
PENDING="$AGENT_DIR/pending-opportunities.json"
LOG="$AGENT_DIR/trading.log"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [CONFER] $1" | tee -a "$LOG"
}

# === MARKET HOURS CHECK ===
is_trading_window() {
    local hour_utc minute_utc
    hour_utc=$(date -u +'%H')
    minute_utc=$(date -u +'%M')
    
    local hour_et=$((10#$hour_utc - 4))
    [ $hour_et -lt 0 ] && hour_et=$((hour_et + 24))
    
    local day_of_week=$(date -u +'%u')
    [ "$day_of_week" -lt 1 ] || [ "$day_of_week" -gt 5 ] && return 1
    
    local et_minutes=$((hour_et * 60 + minute_utc))
    [ $et_minutes -ge 540 ] && [ $et_minutes -lt 960 ]  # 9AM-4PM ET
}

# === SEND TELEGRAM (via OpenClaw) ===
send_alert() {
    local msg="$1"
    log "Sending alert to Captain: $msg"
    message action=send target=8742211590 message="$msg"
}

log "=== Vyse Checking Pending Opportunities ==="

if ! is_trading_window; then
    log "Outside trading window (9AM-4PM ET) - skipping review"
    exit 0
fi

if [ ! -s "$PENDING" ] || [ "$(cat "$PENDING" 2>/dev/null)" = "[]" ]; then
    log "No pending opportunities"
    exit 0
fi

count=$(jq 'length' "$PENDING" 2>/dev/null)
[ "$count" -eq 0 ] && exit 0

log "Found $count pending opportunity(ies)"

for i in $(seq 0 $((count - 1))); do
    symbol=$(jq -r ".[$i].symbol" "$PENDING")
    price=$(jq -r ".[$i].price" "$PENDING")
    type=$(jq -r ".[$i].type" "$PENDING")
    direction=$(jq -r ".[$i].direction // \"\"" "$PENDING")
    change=$(jq -r ".[$i].change // \"\"" "$PENDING")
    target=$(jq -r ".[$i].target // \"\"" "$PENDING")
    
    log "Reviewing: $symbol $type @ \$$price"
    
    if [ "$type" = "VOLATILE_OPPORTUNITY" ]; then
        emoji=$( [ "$direction" = "UP" ] && echo "🚀" || echo "⚠️" )
        tg_msg="🦜 *VOLATILE ALERT* $emoji

*Symbol:* $symbol
*Price:* \$$price
*Move:* $change% $direction

Quartermaster detected this opportunity. Want me to:
• 'BUY $symbol' - confirm purchase
• 'SKIP' - ignore this time"
    else
        tg_msg="🦜 *QUARTERMASTER REPORT*

*Symbol:* $symbol
*Price:* \$$price
*Type:* $type
*Target:* $target"
    fi
    
    send_alert "$tg_msg"
done

log "=== Review Complete ==="
exit 0