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

# === MARKET HOURS CHECK ===
# Only run 30 min before market open (9:00 AM ET) through close (4:00 PM ET)
is_trading_window() {
    local hour_utc minute_utc
    hour_utc=$(date -u +'%H')
    minute_utc=$(date -u +'%M')
    
    # ET = UTC-4 (DST) - safe during market hours
    local hour_et=$((10#$hour_utc - 4))
    local minute_et=$((10#$minute_utc))
    
    [ $hour_et -lt 0 ] && hour_et=$((hour_et + 24))
    
    local day_of_week=$(date -u +'%u')
    
    # Weekday check
    [ "$day_of_week" -lt 1 ] || [ "$day_of_week" -gt 5 ] && return 1
    
    local et_minutes=$((hour_et * 60 + minute_et))
    local window_open=$((9 * 60))      # 9:00 AM ET (30 min before open)
    local market_close=$((16 * 60))    # 4:00 PM ET
    
    # Run 9:00 AM - 4:00 PM ET
    [ $et_minutes -ge $window_open ] && [ $et_minutes -lt $market_close ]
}

# === SEND TELEGRAM ===
send_tg() {
    local msg="$1"
    send_tg "$msg"
    log "TG alert suppressed (disabled) for message: $msg"
}

log "=== Checking Pending Opportunities ==="

# Only process during trading window (9:00 AM - 4:00 PM ET)
if ! is_trading_window; then
    log "Outside trading window (9AM-4PM ET) - skipping review"
    exit 0
fi

log "In trading window - checking pending opportunities"

# Check if pending file has content
if [ ! -s "$PENDING" ] || [ "$(cat "$PENDING")" = "[]" ]; then
    log "No pending opportunities"
    exit 0
fi

# Check if there are any pending opportunities
count=$(jq 'length' "$PENDING")
log "Found $count pending opportunity(ies)"

# Exit silently if nothing pending (no alert needed)
if [ "$count" -eq 0 ]; then
    log "No pending opportunities to review"
    exit 0
fi

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