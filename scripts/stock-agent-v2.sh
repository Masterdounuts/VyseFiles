#!/bin/bash
# Stock Subagent V2 - Autonomous Research & Learning
# Runs daily to research, alert, and learn

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
CONFIG="$AGENT_DIR/config.yaml"
STATE="$AGENT_DIR/state.json"
LEARNINGS="$AGENT_DIR/learnings.json"
RESEARCH_LOG="$AGENT_DIR/research.log"
PERF_LOG="$AGENT_DIR/performance.log"

mkdir -p "$AGENT_DIR"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [AGENT] $1" | tee -a "$RESEARCH_LOG"
}

# === RESEARCH MODULE ===
research_stock() {
    local symbol=$1
    log "Researching $symbol..."
    
    # Fetch from finviz
    local data=$(curl -s "https://www.finviz.com/quote.ashx?t=$symbol" 2>/dev/null | grep -oE 'Price:[0-9]+\.[0-9]{2}|P/E:[0-9]+\.[0-9]+|Beta:[0-9]+\.[0-9]+|Volatility:[0-9]+\.[0-9]+%|RSI \(14\):[0-9]+\.[0-9]+' | tr '\n' ',' || echo "")
    
    echo "$data"
}

# === PRICE CHECK ===
get_price() {
    local symbol=$1
    # Quick fetch from finviz
    local price=$(curl -s "https://www.finviz.com/quote.ashx?t=$symbol" 2>/dev/null | grep -oP 'Price:\K[0-9]+\.[0-9]{2}' | head -1)
    echo "$price"
}

# === TARGET EVALUATION ===
evaluate_targets() {
    local symbol=$1
    local current_price=$2
    
    # Get targets from state.json (parsed via grep/jq)
    local buy_targets=$(grep -A5 "\"$symbol\"" "$STATE" | grep '"buy":' | sed 's/.*\[\([0-9., ]*\)\].*/\1/' | tr ',' '\n' | tr -d ' ')
    local sell_targets=$(grep -A5 "\"$symbol\"" "$STATE" | grep '"sell":' | sed 's/.*\[\([0-9., ]*\)\].*/\1/' | tr ',' '\n' | tr -d ' ')
    
    # Check buy zones
    while IFS= read -r target; do
        [ -z "$target" ] && continue
        is_below=$(echo "$current_price <= $target" | bc -l 2>/dev/null || echo "0")
        if [ "$is_below" = "1" ]; then
            log "ALERT: $symbol BUY ZONE - Price \$$current_price at/below \$$target"
            send_alert "$symbol" "BUY" "$current_price" "$target"
        fi
    done <<< "$buy_targets"
    
    # Check sell zones
    while IFS= read -r target; do
        [ -z "$target" ] && continue
        is_above=$(echo "$current_price >= $target" | bc -l 2>/dev/null || echo "0")
        if [ "$is_above" = "1" ]; then
            log "ALERT: $symbol SELL HIT - Price \$$current_price at/above \$$target"
            send_alert "$symbol" "SELL" "$current_price" "$target"
        fi
    done <<< "$sell_targets"
}

# === LEARNING MODULE ===
record_outcome() {
    local symbol=$1
    local type=$2  # buy or sell
    local target=$3
    local outcome=$4  # hit or missed
    
    local timestamp=$(date -u +'%Y-%m-%d %H:%M UTC')
    echo "$timestamp,$symbol,$type,$target,$outcome" >> "$PERF_LOG"
    
    # Update learnings (simplified - adjust target if repeatedly missed)
    if [ "$outcome" = "missed" ]; then
        log "LEARNING: $symbol $type at $target was missed - consider widening zone"
    fi
}

# === ALERT ===
send_alert() {
    local symbol=$1
    local type=$2
    local price=$3
    local target=$4
    
    local msg="🦜 $symbol $type: \$$price → Target \$$target"
    log "ALERT: $msg"
    echo "$(date -u +'%Y-%m-%d %H:%M UTC'): $msg" >> "$AGENT_DIR/alerts.log"
}

# === DAILY RESEARCH SCAN ===
daily_scan() {
    log "=== Daily Research Scan ==="
    
    # Stocks to watch (from state.json)
    local stocks=$(grep -E '^\s+"[A-Z]{3,5}":' "$STATE" | sed 's/.*"\([A-Z]*\)":.*/\1/' | grep -v "^$")
    
    for stock in $stocks; do
        log "Checking $stock..."
        price=$(get_price "$stock")
        
        if [ -n "$price" ]; then
            log "$stock: \$$price"
            evaluate_targets "$stock" "$price"
        else
            log "Could not fetch $stock"
        fi
    done
    
    log "=== Scan Complete ==="
}

# === MAIN ===
log "Stock Agent V2 starting..."
daily_scan
exit 0