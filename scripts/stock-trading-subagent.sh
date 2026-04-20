#!/bin/bash
# Stock Trading Subagent - Autonomous Price Monitoring & Alerts
# Runs every 30 min during market hours
# Now with Volatile Opportunity Detection + Conferral

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
STATE="$AGENT_DIR/state.json"
LOG="$AGENT_DIR/trading.log"
ALERTS="$AGENT_DIR/alerts.log"
PENDING="$AGENT_DIR/pending-opportunities.json"
LAST_PRICE_FILE="$AGENT_DIR/last-prices.txt"

mkdir -p "$AGENT_DIR"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [TRADER] $1" | tee -a "$LOG"
}

# === GET PRICE (Stooq) ===
get_price() {
    local symbol=$1
    local price=$(curl -s "https://stooq.com/q/l/?s=${symbol}.us&f=sd2t2ohlcv&h&e=csv" 2>/dev/null | tail -1 | cut -d',' -f7)
    echo "$price"
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

# === CHECK VOLATILITY ===
# Returns 0 if volatile, 1 if not
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
    
    # Volatile if >3% move
    if (( $(echo "$abs_change > 3" | bc -l 2>/dev/null || echo "0") )); then
        log "VOLATILITY DETECTED: $symbol moved $change%"
        return 0
    fi
    
    return 1
}

# === CHECK TARGETS (Auto-alert) ===
check_targets() {
    local symbol=$1
    local current=$2
    
    log "Checking $symbol targets: \$$current"
    
    # BUY check - auto-alert (not volatile, just hitting buy zone)
    if (( $(echo "$current <= 4.10" | bc -l 2>/dev/null || echo "0") )); then
        alert "$symbol" "BUY ZONE" "$current" "4.10" "AUTO"
    fi
    
    # SELL checks - auto-alert
    if (( $(echo "$current >= 4.45" | bc -l 2>/dev/null || echo "0") )); then
        alert "$symbol" "SELL 1" "$current" "4.45" "AUTO"
    fi
    
    if (( $(echo "$current >= 4.60" | bc -l 2>/dev/null || echo "0") )); then
        alert "$symbol" "SELL 2" "$current" "4.60" "AUTO"
    fi
    
    if (( $(echo "$current >= 4.75" | bc -l 2>/dev/null || echo "0") )); then
        alert "$symbol" "SELL 3" "$current" "4.75" "AUTO"
    fi
}

# === CONFER WITH MAIN AGENT ===
# For volatile opportunities, ask main agent before alerting
confer_volatile_opportunity() {
    local symbol=$1
    local price=$2
    local direction=$3
    local change=$4
    
    log "CONFER: Volatile $symbol $direction - asking main agent"
    
    # Write to pending file for main agent to review
    cat >> "$PENDING" << EOF
{
  "timestamp": "$(date -u +'%Y-%m-%d %H:%M UTC')",
  "symbol": "$symbol",
  "price": "$price",
  "direction": "$direction",
  "change": "$change%",
  "type": "VOLATILE_OPPORTUNITY",
  "status": "PENDING_REVIEW"
}
EOF
    
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

# === MAIN ===
log "=== Stock Trading Subagent Starting ==="

# Monitor stocks
stocks="GGB"

for stock in $stocks; do
    log "Checking $stock..."
    price=$(get_price "$stock")
    
    if [ -n "$price" ] && [ "$price" != "null" ]; then
        log "$stock price: \$$price"
        
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

log "=== Scan Complete ==="
exit 0