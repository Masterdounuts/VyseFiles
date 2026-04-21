#!/bin/bash
# Stock Trading Subagent - Autonomous Price Monitoring & Alerts
# Reads from state.json - dynamic portfolio & targets
# Includes: volatility detection, target alerts, stop-loss, market hours filter

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
STATE="$AGENT_DIR/state.json"
LOG="$AGENT_DIR/trading.log"
ALERTS="$AGENT_DIR/alerts.log"
PENDING="$AGENT_DIR/pending-opportunities.json"
LAST_PRICE_FILE="$AGENT_DIR/last-prices.txt"
ALERT_HISTORY="$AGENT_DIR/alert-history.json"

mkdir -p "$AGENT_DIR"

# Initialize files if missing
[ ! -f "$PENDING" ] && echo "[]" > "$PENDING"
[ ! -f "$ALERT_HISTORY" ] && echo "[]" > "$ALERT_HISTORY"
[ ! -f "$LAST_PRICE_FILE" ] && touch "$LAST_PRICE_FILE"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [TRADER] $1" | tee -a "$LOG"
}

# === UPDATE STATE.JSON ===
update_state() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    jq --arg ts "$timestamp" '.last_check = $ts' "$STATE" > "${STATE}.tmp" && mv "${STATE}.tmp" "$STATE"
}

# === MARKET HOURS CHECK (with DST support) ===
# Returns 0 if in market hours (Mon-Fri 9:30 AM - 4:00 PM ET)
is_market_open() {
    local hour_utc minute_utc
    hour_utc=$(date -u +'%H')
    minute_utc=$(date -u +'%M')
    
    # Determine DST: US DST = 2nd Sunday March - 1st Sunday November
    local month=$(date -u +'%m')
    local day=$(date -u +'%d')
    local dst_offset=4  # Default DST
    
    if [ "$month" -lt "4" ] || [ "$month" -gt "10" ]; then
        dst_offset=5  # Standard time
    elif [ "$month" -eq "4" ] && [ "$day" -lt "15" ]; then
        dst_offset=5  # Before DST transition
    elif [ "$month" -eq "10" ] && [ "$day" -gt "7" ]; then
        dst_offset=5  # After DST transition
    fi
    
    local hour_et=$((10#$hour_utc - dst_offset))
    local minute_et=$((10#$minute_utc))
    
    # Handle wrap around
    if [ $hour_et -lt 0 ]; then
        hour_et=$((hour_et + 24))
    elif [ $hour_et -ge 24 ]; then
        hour_et=$((hour_et - 24))
    fi
    
    local day_of_week=$(date -u +'%u')  # 1=Monday
    
    # Check if weekday (Mon-Fri = 1-5)
    if [ "$day_of_week" -lt 1 ] || [ "$day_of_week" -gt 5 ]; then
        return 1
    fi
    
    # Check time (9:30 - 16:00 ET)
    local et_minutes=$((hour_et * 60 + minute_et))
    local market_open=$((9 * 60 + 30))  # 9:30 AM
    local market_close=$((16 * 60))     # 4:00 PM
    
    if [ $et_minutes -ge $market_open ] && [ $et_minutes -lt $market_close ]; then
        return 0
    fi
    
    return 1
}

# === EXTENDED HOURS CHECK ===
# Returns 0 if in pre-market (4-9:30 AM) or after-hours (4-8 PM)
is_extended_hours() {
    local hour_utc minute_utc
    hour_utc=$(date -u +'%H')
    minute_utc=$(date -u +'%M')
    
    local month=$(date -u +'%m')
    local day=$(date -u +'%d')
    local dst_offset=4
    
    if [ "$month" -lt "4" ] || [ "$month" -gt "10" ]; then
        dst_offset=5
    elif [ "$month" -eq "4" ] && [ "$day" -lt "15" ]; then
        dst_offset=5
    elif [ "$month" -eq "10" ] && [ "$day" -gt "7" ]; then
        dst_offset=5
    fi
    
    local hour_et=$((10#$hour_utc - dst_offset))
    local minute_et=$((10#$minute_utc))
    
    if [ $hour_et -lt 0 ]; then
        hour_et=$((hour_et + 24))
    elif [ $hour_et -ge 24 ]; then
        hour_et=$((hour_et - 24))
    fi
    
    local et_minutes=$((hour_et * 60 + minute_et))
    local pre_market_open=$((4 * 60))
    local market_open=$((9 * 60 + 30))
    local market_close=$((16 * 60))
    local after_close=$((20 * 60))
    
    if ([ $et_minutes -ge $pre_market_open ] && [ $et_minutes -lt $market_open ]) || \
       [ $et_minutes -ge $market_close ] && [ $et_minutes -lt $after_close ]; then
        return 0
    fi
    return 1
}

# === GET PRICE (Stooq with retry) ===
get_price() {
    local symbol=$1
    local retries=2
    local delay=2
    local price=""
    
    for i in $(seq 1 $retries); do
        price=$(curl -s --max-time 10 "https://stooq.com/q/l/?s=${symbol}.us&f=sd2t2ohlcv&h&e=csv" 2>/dev/null | tail -1 | cut -d',' -f7)
        if [ -n "$price" ] && [ "$price" != "null" ] && [ "$price" != "N/D" ]; then
            echo "$price"
            return 0
        fi
        [ $i -lt $retries ] && sleep $delay
    done
    
    echo ""
    return 1
}

# === GET LAST PRICE ===
get_last_price() {
    local symbol=$1
    grep "^$symbol:" "$LAST_PRICE_FILE" 2>/dev/null | cut -d':' -f2
}

# === SAVE PRICE ===
save_price() {
    local symbol=$1
    local price=$2
    if grep -q "^$symbol:" "$LAST_PRICE_FILE" 2>/dev/null; then
        sed -i "s/^$symbol:.*/$symbol:$price/" "$LAST_PRICE_FILE"
    else
        echo "$symbol:$price" >> "$LAST_PRICE_FILE"
    fi
}

# === CHECK ALERT SENT (prevent duplicates) ===
alert_already_sent() {
    local symbol=$1
    local alert_type=$2
    local target=$3
    
    # Check if this specific alert was already sent today
    local today=$(date -u +'%Y-%m-%d')
    if grep -q "\"$symbol.*$alert_type.*$target.*$today\"" "$ALERT_HISTORY" 2>/dev/null; then
        return 0  # Already sent
    fi
    return 1
}

# === RECORD ALERT SENT ===
record_alert() {
    local symbol=$1
    local alert_type=$2
    local target=$3
    local price=$4
    
    local today=$(date -u +'%Y-%m-%d')
    local entry="{\"symbol\":\"$symbol\",\"type\":\"$alert_type\",\"target\":\"$target\",\"price\":\"$price\",\"date\":\"$today\"}"
    
    # Append to alert history (as JSON array)
    local tmp=$(mktemp)
    if [ -s "$ALERT_HISTORY" ]; then
        # Remove closing bracket, add comma, add new entry, add closing bracket
        sed 's/\]/$/' "$ALERT_HISTORY" > "$tmp"
        sed -i 's/\[$/\[\n/' "$tmp"
        echo "  $entry," >> "$tmp"
        sed -i 's/,\s*\]/\n]/' "$tmp"
        cat "$tmp" > "$ALERT_HISTORY"
        rm "$tmp"
    else
        echo "[$entry]" > "$ALERT_HISTORY"
    fi
}

# === CHECK VOLATILITY ===
check_volatility() {
    local symbol=$1
    local current=$2
    local last=$(get_last_price "$symbol")
    
    if [ -z "$last" ] || [ "$last" = "null" ]; then
        log "No previous price for $symbol - skipping volatility check"
        return 1
    fi
    
    # Calculate % change
    local change=$(echo "scale=2; (($current - $last) / $last) * 100" | bc -l 2>/dev/null)
    local abs_change=$(echo "$change" | tr -d '-')
    
    log "$symbol change: $change% (last: \$$last, current: \$$current)"
    
    # Get threshold from state.json
    local threshold=$(jq -r '.volatility_threshold_percent // 3' "$STATE")
    
    # Volatile if >threshold% move
    if (( $(echo "$abs_change > $threshold" | bc -l 2>/dev/null || echo "0") )); then
        log "VOLATILITY DETECTED: $symbol moved $change%"
        return 0
    fi
    
    return 1
}

# === CHECK STOP LOSS ===
check_stop_loss() {
    local symbol=$1
    local current=$2
    local avg_cost=$3
    
    # Calculate 5% stop loss threshold
    local stop_pct=5
    local stop_threshold=$(echo "scale=2; $avg_cost * (1 - $stop_pct/100)" | bc -l)
    
    if (( $(echo "$current < $stop_threshold" | bc -l 2>/dev/null || echo "0") )); then
        log "STOP LOSS TRIGGERED: $symbol at \$$current (avg: \$$avg_cost, stop: \$$stop_threshold)"
        return 0
    fi
    
    return 1
}

# === CHECK TARGETS (dynamic from state.json) ===
check_targets() {
    local symbol=$1
    local current=$2
    
    log "Checking $symbol targets: \$$current"
    
    # Get buy targets
    local buy_targets=$(jq -r ".targets.$symbol.buy[]" "$STATE" 2>/dev/null)
    for target in $buy_targets; do
        if (( $(echo "$current <= $target" | bc -l 2>/dev/null || echo "0") )); then
            if ! alert_already_sent "$symbol" "BUY" "$target"; then
                alert "$symbol" "BUY ZONE" "$current" "$target" "AUTO"
                record_alert "$symbol" "BUY" "$target" "$current"
            fi
        fi
    done
    
    # Get sell targets
    local sell_targets=$(jq -r ".targets.$symbol.sell[]" "$STATE" 2>/dev/null)
    for target in $sell_targets; do
        if (( $(echo "$current >= $target" | bc -l 2>/dev/null || echo "0") )); then
            if ! alert_already_sent "$symbol" "SELL" "$target"; then
                alert "$symbol" "SELL TARGET" "$current" "$target" "AUTO"
                record_alert "$symbol" "SELL" "$target" "$current"
            fi
        fi
    done
}

# === CONFER WITH MAIN AGENT ===
confer_volatile_opportunity() {
    local symbol=$1
    local price=$2
    local direction=$3
    local change=$4
    
    log "CONFER: Volatile $symbol $direction - asking main agent"
    
    # Read existing array, append new item, write back
    local tmp=$(mktemp)
    local new_item="{\"timestamp\":\"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\",\"symbol\":\"$symbol\",\"price\":\"$price\",\"direction\":\"$direction\",\"change\":\"$change%\",\"type\":\"VOLATILE_OPPORTUNITY\",\"status\":\"PENDING_REVIEW\"}"
    
    if [ -s "$PENDING" ] && [ "$(cat "$PENDING")" != "[]" ]; then
        # Remove trailing ], add comma + new item + ]
        sed 's/\]/$/' "$PENDING" > "$tmp"
        sed -i 's/\[$/\[\n  /' "$tmp"
        echo "$new_item," >> "$tmp"
        sed -i 's/,\s*\]/\n]/' "$tmp"
    else
        echo "[$new_item]" > "$tmp"
    fi
    
    cat "$tmp" > "$PENDING"
    rm "$tmp"
    
    log "Wrote to pending review queue: $PENDING"
}

# === SEND ALERT ===
alert() {
    local symbol=$1
    local zone=$2
    local price=$3
    local target=$4
    local type=$5
    
    local msg="🦜 $symbol $zone: \$$price (target: \$$target)"
    log "ALERT ($type): $msg"
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [$type] $msg" >> "$ALERTS"
}

# === SEND TELEGRAM NOTIFICATION ===
send_telegram() {
    local message="$1"
    local token="$TG_BOT_TOKEN"
    local chat_id="$TG_CHAT_ID"
    
    # Try to get from config if not set
    if [ -z "$token" ]; then
        token=$(jq -r '.telegram.bot_token // empty' "$WORKSPACE/config.json" 2>/dev/null)
    fi
    if [ -z "$chat_id" ]; then
        chat_id=$(jq -r '.telegram.chat_id // empty' "$WORKSPACE/config.json" 2>/dev/null)
    fi
    
    if [ -n "$token" ] && [ -n "$chat_id" ]; then
        curl -s -X POST "https://api.telegram.org/bot${token}/sendMessage" \
            -d "chat_id=${chat_id}" \
            -d "text=${message}" \
            -d "parse_mode=Markdown" > /dev/null 2>&1
        log "TG sent: $message"
    else
        log "TG_NOTIF (no config): $message"
    fi
}

# === MAIN ===
log "=== Stock Trading Subagent Starting ==="

# Check market hours
if ! is_market_open; then
    log "Outside market hours - skipping run"
    log "=== Scan Complete (market closed) ==="
    exit 0
fi

# Read stocks from portfolio in state.json
stocks=$(jq -r '.portfolio | keys | join(" ")' "$STATE")

if [ -z "$stocks" ]; then
    log "No stocks in portfolio - exiting"
    exit 0
fi

log "Monitoring: $stocks"

for stock in $stocks; do
    log "Checking $stock..."
    price=$(get_price "$stock")
    
    if [ -n "$price" ] && [ "$price" != "null" ]; then
        log "$stock price: \$$price"
        
        # Get avg_cost for stop-loss
        avg_cost=$(jq -r ".portfolio.$stock.avg_cost // 0" "$STATE")
        
        # Check stop-loss first
        if [ "$avg_cost" != "0" ] && [ "$avg_cost" != "null" ]; then
            if check_stop_loss "$stock" "$price" "$avg_cost"; then
                alert "$stock" "STOP LOSS" "$price" "$avg_cost" "CRITICAL"
                record_alert "$stock" "STOP_LOSS" "$avg_cost" "$price"
            fi
        fi
        
        # Check volatility FIRST (before targets)
        if check_volatility "$stock" "$price"; then
            last=$(get_last_price "$stock")
            change=$(echo "scale=2; (($price - $last) / $last) * 100" | bc -l)
            if (( $(echo "$change > 0" | bc -l 2>/dev/null || echo "0") )); then
                direction="UP"
            else
                direction="DOWN"
            fi
            confer_volatile_opportunity "$stock" "$price" "$direction" "$change"
        fi
        
        # Then check targets (auto-alert)
        check_targets "$stock" "$price"
        
        # Save price for next run
        save_price "$stock" "$price"
    else
        log "ERROR: Could not fetch price for $stock"
    fi
done

# === SCAN VOLATILE WATCHLIST (stocks we don't own) ===
log "Scanning volatile watchlist..."
watchlist=$(jq -r '.volatile_watchlist | join(" ")' "$STATE" 2>/dev/null)

if [ -n "$watchlist" ] && [ "$watchlist" != "null" ]; then
    log "Watchlist: $watchlist"
    
    for symbol in $watchlist; do
        log "Watchlist scan: $symbol"
        price=$(get_price "$symbol")
        
        if [ -n "$price" ] && [ "$price" != "null" ]; then
            log "$symbol price: \$$price"
            
            # Check volatility - for watchlist, always confer (we don't own it)
            if check_volatility "$symbol" "$price"; then
                last=$(get_last_price "$symbol")
                change=$(echo "scale=2; (($price - $last) / $last) * 100" | bc -l)
                if (( $(echo "$change > 0" | bc -l 2>/dev/null || echo "0") )); then
                    direction="UP"
                else
                    direction="DOWN"
                fi
                confer_volatile_opportunity "$symbol" "$price" "$direction" "$change"
                log "Volatile opportunity queued: $symbol $direction $change%"
            fi
            
            # Save price for next run
            save_price "$symbol" "$price"
        else
            log "ERROR: Could not fetch price for $symbol"
        fi
    done
else
    log "No volatile watchlist configured"
fi

# Update state.json with last check time
update_state

log "=== Scan Complete ==="
exit 0