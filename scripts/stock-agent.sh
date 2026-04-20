#!/bin/bash
# Stock Subagent - Price Monitoring & Alert Script
# Run via cron: */30 * * * * /home/openclaw/.openclaw/workspace/scripts/stock-agent.sh

set -e

WORKSPACE="/home/openclaw/.openclaw/workspace"
CONFIG="$WORKSPACE/kb/stocks/agent/config.yaml"
STATE="$WORKSPACE/kb/stocks/agent/state.json"
LOG="$WORKSPACE/logs/stock-agent.log"

mkdir -p "$WORKSPACE/logs"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [STOCK-AGENT] $1" | tee -a "$LOG"
}

# Load config
INTERVAL=$(grep "check_interval_minutes:" "$CONFIG" | awk '{print $2}')
ALERT_CHANNEL=$(grep "alert_channel:" "$CONFIG" | awk '{print $2}')
ALERT_TARGET=$(grep "alert_target:" "$CONFIG" | awk '{print $2}')

log "Starting price check..."

# Get list of stocks to check
STOCKS=$(grep -E '^\s+"[A-Z]+":' "$STATE" | grep -v "last_price" | sed 's/.*"\([A-Z]*\)":.*/\1/' | grep -v "^$")

send_alert() {
    local symbol="$1"
    local type="$2"
    local price="$3"
    local action="$4"
    
    local msg="🦜 $symbol $type: \$$price - $action"
    
    # Use OpenClaw message tool via a one-off cron delivery or direct
    log "ALERT: $msg"
    
    # Store alert in state
    local timestamp=$(date -u +'%Y-%m-%d %H:%M UTC')
    local alert_id=$(date +%s)
    
    # Append to alerts_sent (simplified - just log for now)
    echo "$timestamp: $msg" >> "$WORKSPACE/logs/alerts.log"
}

check_price() {
    local symbol="$1"
    
    # Use web_search to get price (quick)
    local result=$(cd "$WORKSPACE" && web_search --query "$symbol stock price" 2>/dev/null | head -c 500 || echo "")
    
    # Extract price - look for $XX.XX pattern
    local price=$(echo "$result" | grep -oE '\$[0-9]+\.[0-9]{2}' | head -1 | tr -d '$')
    
    if [ -z "$price" ]; then
        log "Could not fetch price for $symbol"
        return 1
    fi
    
    echo "$price"
}

# Main loop
for stock in GGB AMC TSLA; do
    log "Checking $stock..."
    
    price=$(check_price "$stock")
    if [ -z "$price" ]; then
        continue
    fi
    
    log "$stock: \$$price"
    
    # Get current last_price from state
    last_price=$(grep -A2 "\"$stock\"" "$STATE" | grep "last_price" | awk -F': ' '{print $2}' | tr -d ',')
    
    # Check sell targets
    sell_targets=$(grep -A10 "\"$stock\"" "$STATE" | grep -A5 '"sell":' | grep -E '[0-9]' | tr -d '[]", ' | tr ',' '\n')
    for target in $sell_targets; do
        if (( $(echo "$price >= $target" | bc -l) )); then
            send_alert "$stock" "SELL HIT" "$price" "Price at or above \$$target target"
        fi
    done
    
    # Check buy targets
    buy_targets=$(grep -A10 "\"$stock\"" "$STATE" | grep -A5 '"buy":' | grep -E '[0-9]' | tr -d '[]", ' | tr ',' '\n')
    for target in $buy_targets; do
        if (( $(echo "$price <= $target" | bc -l) )); then
            send_alert "$stock" "BUY ZONE" "$price" "Price at or below \$$target buy target"
        fi
    done
    
    # Update last_price in state (sed replacement)
    sed -i "s/\"$stock\": {/\"$stock\": {\n      \"last_price\": $price,/" "$STATE" 2>/dev/null || true
done

log "Price check complete"

# Update last_check timestamp
sed -i "s/\"last_check\": null/\"last_check\": \"$(date -u +'%Y-%m-%d %H:%M UTC')\"/" "$STATE" 2>/dev/null || true

exit 0