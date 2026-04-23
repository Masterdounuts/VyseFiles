#!/bin/bash
# Stock Trading Subagent - Autonomous Price Monitoring & Alerts
# Reads from markdown files (positions/*.md, config.md)
# Includes: volatility detection, target alerts, stop-loss, market hours filter

# Add jq (in /tmp) to PATH - system paths first
export PATH="/usr/local/bin:/usr/bin:/bin:/tmp:$PATH"

# Alpha Vantage API key
export ALPHA_VANTAGE_KEY="VSJ5QVVM11QT0LHP"

# === CALC: bc replacement using awk ===
calc() {
    # Usage: calc "expression" (e.g., calc "(5-3)/3*100")
    awk "BEGIN { printf \"%.2f\", ($1) }"
}

calc_int() {
    awk "BEGIN { printf \"%.0f\", ($1) }"
}

calc_bool() {
    awk "BEGIN { if (($1)) print 1; else print 0 }"
}

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
# STATE="$AGENT_DIR/state.json"  # DEPRECATED - using markdown now
LOG="$AGENT_DIR/trading.log"
ALERTS="$AGENT_DIR/alerts.log"
PENDING="$AGENT_DIR/pending-opportunities.json"
LAST_PRICE_FILE="$AGENT_DIR/last-prices.txt"
ALERT_HISTORY="$AGENT_DIR/alert-history.json"
LEARNINGS="$AGENT_DIR/learnings.json"

# Source markdown reader
source "$WORKSPACE/scripts/stock-data-reader.sh"

mkdir -p "$AGENT_DIR"

# Load research database
source "$WORKSPACE/scripts/stock-research.sh"

# Initialize files if missing
[ ! -f "$PENDING" ] && echo "[]" > "$PENDING"
[ ! -f "$ALERT_HISTORY" ] && echo "[]" > "$ALERT_HISTORY"
[ ! -f "$LAST_PRICE_FILE" ] && touch "$LAST_PRICE_FILE"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [TRADER] $1" | tee -a "$LOG"
}

# === LEARN FROM TARGET HIT/MISS ===
learn() {
    local symbol=$1
    local event_type=$2  # BUY_TARGET, SELL_TARGET, STOP_LOSS, VOLATILE_ALERT
    local price=$3
    local target=$4
    
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    local lesson_entry="{\"timestamp\":\"$timestamp\",\"symbol\":\"$symbol\",\"type\":\"$event_type\",\"price\":\"$price\",\"target\":\"$target\"}"
    
    # Add to learnings.json
    local tmp=$(mktemp)
    if [ -s "$LEARNINGS" ] && [ "$(cat $LEARNINGS)" != "" ]; then
        # Check if lessons array exists
        if jq -e '.lessons' "$LEARNINGS" > /dev/null 2>&1; then
            # Append to existing lessons
            node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('$LEARNINGS', 'utf8'));
d.lessons = d.lessons || [];
d.lessons.push($lesson_entry);
# Keep only last 50 lessons
if (d.lessons.length > 50) d.lessons = d.lessons.slice(-50);
fs.writeFileSync('$LEARNINGS', JSON.stringify(d, null, 2));
" 2>/dev/null
        else
            # Add lessons array
            jq --argjson entry "$lesson_entry" '.lessons = [$entry]' "$LEARNINGS" > "$tmp" && mv "$tmp" "$LEARNINGS"
        fi
    else
        echo "{\"lessons\":[$lesson_entry]}" > "$LEARNINGS"
    fi
    
    log "LEARNED: $symbol $event_type at \$$price (target: \$$target)"
    
    # Auto-adjust: if pattern shows targets missed repeatedly, suggest adjustment
    if [ "$event_type" = "SELL_TARGET" ] || [ "$event_type" = "BUY_TARGET" ]; then
        local target_key=$(echo "$event_type" | tr '[:upper:]' '[:lower:]')
        log "Pattern logged for $symbol - future runs will reference this"
    fi
}

# === UPDATE STATE.JSON ===
update_state() {
    local timestamp=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    jq --arg ts "$timestamp" '.last_check = $ts' "$STATE" > "${STATE}.tmp" && mv "${STATE}.tmp" "$STATE"
}

# === MARKET HOURS CHECK (simplified UTC-based) ===
# Returns 0 if in market hours (Mon-Fri 9:30 AM - 4:00 PM ET)
# ET = UTC-4 (DST) or UTC-5 (Standard). Use UTC-4 as safe default during market hours.
is_market_open() {
    local hour_utc minute_utc
    hour_utc=$(date -u +'%H')
    minute_utc=$(date -u +'%M')
    
    # Convert to ET (approximate - works during market hours Apr-Oct)
    local hour_et=$((10#$hour_utc - 4))
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
    
    # Check time (9:00 - 16:00 ET) - includes 30 min pre-market
    local et_minutes=$((hour_et * 60 + minute_et))
    local market_open=$((9 * 60))       # 9:00 AM (30 min before open)
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

# === GET PRICE AND VOLUME (Yahoo Finance via Node.js) ===
get_stock_data() {
    local symbol=$1
    local retries=2
    local delay=2
    
    # Use Yahoo Finance scraper (no rate limits!)
    for i in $(seq 1 $retries); do
        local result=$(node "$WORKSPACE/scripts/get-stock-price.js" "$symbol" 2>/dev/null)
        
        # Parse JSON result
        local price=$(echo "$result" | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); console.log(d[0]?.price || '')")
        local volume=$(echo "$result" | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); console.log(d[0]?.volume?.replace(/,/g,'') || '')")
        
        if [ -n "$price" ] && [ "$price" != "null" ] && [ "$price" != "" ]; then
            # Volume might have commas, strip them
            volume=$(echo "$volume" | tr -d ',')
            echo "${price}:${volume:-0}"
            return 0
        fi
        
        log "Attempt $i: Failed to get price/volume for $symbol. Retrying..."
        [ $i -lt $retries ] && sleep $delay
    done
    
    log "ERROR: Could not fetch price/volume for $symbol after $retries attempts."
    echo ""
    return 1
}

# === GET PRICE (Yahoo Finance via Node.js) ===
get_price() {
    local symbol=$1
    local retries=2
    local delay=2
    
    # Use Yahoo Finance scraper (no rate limits!)
    for i in $(seq 1 $retries); do
        local result=$(node "$WORKSPACE/scripts/get-stock-price.js" "$symbol" 2>/dev/null)
        local price=$(echo "$result" | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); console.log(d[0]?.price || '')")
        
        if [ -n "$price" ] && [ "$price" != "null" ] && [ "$price" != "" ]; then
            echo "$price"
            return 0
        fi
        
        log "Attempt $i: Failed to get price for $symbol. Retrying..."
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

# === CHECK LIQUIDITY AND VOLATILITY ===
check_liquidity_and_volatility() {
    local symbol=$1
    local current=$2
    local volume=$3
    
    # Read thresholds from config.md, with defaults
    local min_volume_threshold=$(get_config "min_volume") # Default 100k shares
    local volatility_threshold=$(get_config "volatility_threshold") # Default 3%
    
    # Defaults if empty
    [ -z "$min_volume_threshold" ] && min_volume_threshold=100000
    [ -z "$volatility_threshold" ] && volatility_threshold=3
    
    # 1. Check Volume - skip if 0 (API rate limited)
    if [ -z "$volume" ] || [ "$volume" = "0" ]; then
        log "$symbol: No volume data (rate limited) - skipping volatility check."
        return 1
    fi
    
    if [ $(calc_bool "$volume < $min_volume_threshold") -eq 1 ]; then
        log "$symbol: Low volume ($volume) - below threshold ($min_volume_threshold). Skipping."
        return 1
    fi
    
    # 2. Get Last Price for volatility calculation
    local last=$(get_last_price "$symbol")
    if [ -z "$last" ] || [ "$last" = "null" ]; then
        log "$symbol: No previous price - skipping volatility check."
        return 1
    fi
    
    # 3. Calculate % change
    local change=$(calc "(($current - $last) / $last) * 100")
    local abs_change=$(echo "$change" | tr -d '-')
    
    log "$symbol: Volume OK ($volume). Change: $change% (last: \$$last, current: \$$current)"
    
    # 4. Check Volatility
    if [ $(calc_bool "$abs_change > $volatility_threshold") -eq 1 ]; then
        log "LIQUID AND VOLATILE: $symbol moved $change%"
        return 0 # Liquid and Volatile
    fi
    
    return 1 # Liquid but not volatile
}

# === CHECK STOP LOSS ===
check_stop_loss() {
    local symbol=$1
    local current=$2
    local avg_cost=$3
    
    # Calculate stop loss threshold from position config
    local stop_pct=$(get_stop_loss_pct "$symbol")
    [ -z "$stop_pct" ] && stop_pct=5
    local stop_threshold=$(calc "$avg_cost * (1 - $stop_pct/100)")
    
    if [ $(calc_bool "$current < $stop_threshold") -eq 1 ]; then
        log "STOP LOSS TRIGGERED: $symbol at \$$current (avg: \$$avg_cost, stop: \$$stop_threshold)"
        return 0
    fi
    
    return 1
}

# === CHECK TARGETS (from positions/*.md) ===
check_targets() {
    local symbol=$1
    local current=$2
    
    log "Checking $symbol targets: \$$current"
    
    # Get buy targets from markdown
    local buy_targets=$(get_buy_targets "$symbol")
    for target in $buy_targets; do
        if [ $(calc_bool "$current <= $target") -eq 1 ]; then
            if ! alert_already_sent "$symbol" "BUY" "$target"; then
                alert "$symbol" "BUY ZONE" "$current" "$target" "AUTO"
                record_alert "$symbol" "BUY" "$target" "$current"
                queue_alert "$symbol" "BUY_TARGET" "$current" "$target" "Price hit buy zone"
                learn "$symbol" "BUY_TARGET" "$current" "$target"
            fi
        fi
    done
    
    # Get sell targets from markdown
    local sell_targets=$(get_sell_targets "$symbol")
    for target in $sell_targets; do
        if [ $(calc_bool "$current >= $target") -eq 1 ]; then
            if ! alert_already_sent "$symbol" "SELL" "$target"; then
                alert "$symbol" "SELL TARGET" "$current" "$target" "AUTO"
                record_alert "$symbol" "SELL" "$target" "$current"
                queue_alert "$symbol" "SELL_TARGET" "$current" "$target" "Price hit sell target"
                learn "$symbol" "SELL_TARGET" "$current" "$target"
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
    
    # Calculate suggested shares (use min $5, max $10 for volatile) from config
    local max_invest=$(get_config "volatile_max")
    local min_invest=$(get_config "volatile_min")
    [ -z "$max_invest" ] && max_invest=10
    [ -z "$min_invest" ] && min_invest=5
    local shares=$(calc_int "$max_invest / $price")
    local est_value=$(calc "$shares * $price")
    if [ $(calc_bool "$est_value < $min_invest") -eq 1 ]; then
        shares=$(calc_int "$min_invest / $price")
        est_value=$(calc "$shares * $price")
    fi
    shares=$(printf "%.0f" "$shares" 2>/dev/null || echo "1")
    log "Calculated: $shares shares @ \$$price = \$$est_value"
    
    # Read existing array, append new item, write back
    local tmp=$(mktemp)
    local new_item="{\"timestamp\":\"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\",\"symbol\":\"$symbol\",\"price\":\"$price\",\"direction\":\"$direction\",\"change\":\"$change%\",\"shares\":\"$shares\",\"est_value\":\"$est_value\",\"type\":\"VOLATILE_OPPORTUNITY\",\"status\":\"PENDING_REVIEW\"}"
    
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
    send_telegram "$message"
    send_telegram "$message"
}

# === ROUTE ALL ALERTS THROUGH MAIN AGENT ===
# No direct Telegram - everything goes to pending for me to review

# === QUEUE ALERT FOR MAIN AGENT REVIEW ===
queue_alert() {
    local symbol=$1
    local alert_type=$2
    local price=$3
    local target=$4
    local details=$5
    
    local tmp=$(mktemp)
    local new_item="{\"timestamp\":\"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\",\"symbol\":\"$symbol\",\"price\":\"$price\",\"type\":\"$alert_type\",\"target\":\"$target\",\"details\":\"$details\",\"status\":\"PENDING_REVIEW\"}"
    
    if [ -s "$PENDING" ] && [ "$(cat "$PENDING")" != "[]" ]; then
        sed 's/\]$/,\n  /' "$PENDING" > "$tmp"
        echo "$new_item" >> "$tmp"
        echo "]" >> "$tmp"
    else
        echo "[$new_item]" > "$tmp"
    fi
    
    cat "$tmp" > "$PENDING"
    rm "$tmp"
    log "Queued $alert_type alert for $symbol - awaiting main agent review"
}

# === MAIN ===
log "=== Stock Trading Subagent Starting ==="

# Show learning summary
if [ -f "$LEARNINGS" ]; then
    lesson_count=$(/tmp/jq ".lessons | length" "$LEARNINGS" 2>/dev/null || echo "0")
    if [ "$lesson_count" -gt 0 ] 2>/dev/null; then
        log "Brain: $lesson_count lessons logged (auto-learning active)"
    fi
fi

# Only run during trading window: 9:00 AM - 4:00 PM ET
if ! is_market_open; then
    log "Outside trading window (9AM-4PM ET) - skipping run"
    log "=== Scan Complete (closed) ==="
    exit 0
fi

log "Market status: OPEN (trading window)"

# Clean up stale pending opportunities (older than 1 hour)
if [ -s "$PENDING" ] && [ "$(cat "$PENDING")" != "[]" ]; then
    one_hour_ago=$(date -u -d '1 hour ago' +'%Y-%m-%dT%H:%M')
    cleaned=$(node -e "const fs=require('fs'); const d=JSON.parse(fs.readFileSync('$PENDING')); const f=d.filter(i=>i.timestamp>'$one_hour_ago'); console.log(JSON.stringify(f));" 2>/dev/null)
    if [ -n "$cleaned" ]; then
        echo "$cleaned" > "$PENDING"
        log "Cleaned stale pending opportunities"
    fi
fi

# Read stocks from positions/*.md
stocks=$(get_positions)

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
        
        # Get avg_cost from position file
        avg_cost=$(get_position_avg_cost "$stock")
        
        # Check stop-loss first - queue for main agent review
        if [ "$avg_cost" != "0" ] && [ "$avg_cost" != "null" ]; then
            if check_stop_loss "$stock" "$price" "$avg_cost"; then
                alert "$stock" "STOP LOSS" "price" "$avg_cost" "CRITICAL"
                record_alert "$stock" "STOP_LOSS" "$avg_cost" "$price"
                queue_alert "$stock" "STOP_LOSS" "$price" "$avg_cost" "5% stop loss triggered"
                learn "$stock" "STOP_LOSS" "$price" "$avg_cost"
            fi
        fi
        
        # Get current price and volume for liquidity/volatility check
        stock_data=$(get_stock_data "$stock")
        if [ -n "$stock_data" ]; then
            current_price=$(echo "$stock_data" | cut -d':' -f1)
            current_volume=$(echo "$stock_data" | cut -d':' -f2)
            
            log "$stock price: \$$current_price, Volume: $current_volume"

            # Check liquidity & volatility FIRST (before targets)
            if [ "$(jq -r '.volatile_check_enabled // true' "$STATE")" = "true" ] && check_liquidity_and_volatility "$stock" "$current_price" "$current_volume"; then
                last=$(get_last_price "$stock")
                change=$(calc "(($current_price - $last) / $last) * 100")
                if [ $(calc_bool "$change > 0") -eq 1 ]; then
                    direction="UP"
                else
                    direction="DOWN"
                fi
                confer_volatile_opportunity "$stock" "$current_price" "$direction" "$change"
            fi
            
            # Then check targets (auto-alert)
            check_targets "$stock" "$current_price"

            # Save price for next run
            save_price "$stock" "$current_price"
        else
            log "ERROR: Could not fetch price/volume data for $stock. Using Stooq fallback price: \$$price"
            current_price=$price # Use the price fetched by get_price if get_stock_data fails
            # Check targets with fallback price
            check_targets "$stock" "$current_price"
            save_price "$stock" "$current_price"
        fi
    else
        log "ERROR: Could not fetch price for $stock (Stooq fallback failed)"
    fi
done

# === SCAN VOLATILE WATCHLIST (stocks we don't own) ===
# Only alert on UP moves - we're buyers, not short sellers
log "Scanning volatile watchlist..."
watchlist=$(jq -r '.volatile_watchlist | join(" ")' "$STATE" 2>/dev/null)

if [ -n "$watchlist" ] && [ "$watchlist" != "null" ]; then
    log "Watchlist: $watchlist"
    
    for symbol in $watchlist; do
        log "Watchlist scan: $symbol"
        
        # Show research info
        research=$(get_stock_info "$symbol" 2>/dev/null)
        if [ -n "$research" ] && [ "$research" != "Unknown" ]; then
            log "$research"
        fi
        
        price=$(get_price "$symbol")
        
        if [ -n "$price" ] && [ "$price" != "null" ]; then
            log "$symbol price: \$$price"
            
            # Fetch price and volume, then check liquidity & volatility
            stock_data=$(get_stock_data "$symbol")
            if [ -n "$stock_data" ]; then
                price=$(echo "$stock_data" | cut -d':' -f1)
                volume=$(echo "$stock_data" | cut -d':' -f2)
                log "$symbol price: \$$price, Volume: $volume"
                
                # Check liquidity & volatility - for watchlist, only confer on UP moves (we want to buy)
                if [ "$(jq -r '.volatile_check_enabled // true' "$STATE")" = "true" ] && check_liquidity_and_volatility "$symbol" "$price" "$volume"; then
                    last=$(get_last_price "$symbol")
                    change=$(calc "(($price - $last) / $last) * 100")
                    if [ $(calc_bool "$change > 0") -eq 1 ]; then
                        direction="UP"
                        confer_volatile_opportunity "$symbol" "$price" "$direction" "$change"
                        log "Volatile opportunity queued: $symbol $direction $change%"
                    else
                        log "Skipping DOWN move for watchlist: $symbol $change%"
                    fi
                fi
                
                # Save price for next run
                save_price "$symbol" "$price"
            else
                log "ERROR: Could not fetch price/volume for $symbol"
            fi
        else
            log "ERROR: Could not fetch price for $symbol (Stooq fallback failed)"

            # If Stooq fails, still try to save the price from get_price if it was fetched
            if [ -n "$price" ] && [ "$price" != "null" ]; then
                 save_price "$symbol" "$price"
            fi
        fi
    done
fi

log "=== Scan Complete ==="
exit 0
