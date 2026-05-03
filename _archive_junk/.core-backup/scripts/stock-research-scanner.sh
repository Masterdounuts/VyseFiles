#!/bin/bash
# Stock Research Scanner - Find new opportunities
# Runs daily to scan for volatile/gapping stocks

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
RESEARCH_LOG="$AGENT_DIR/research.log"
OPPORTUNITIES="$AGENT_DIR/research-opportunities.json"

mkdir -p "$AGENT_DIR"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [RESEARCH] $1" | tee -a "$RESEARCH_LOG"
}

in_range() {
    local price=$1
    local min=$2
    local max=$3
    awk -v p="$price" -v min="$min" -v max="$max" 'BEGIN {print (p >= min && p <= max)}'
}

log "=== Research Scanner Starting ==="

# Initialize opportunities file
echo "[" > "$OPPORTUNITIES"
first=true

# === SCAN: Check predefined watchlist prices ===
log "Scanning watchlist..."

# Stocks in various price ranges suitable for small accounts
watchlist="SOFI MARA RIOT NOK DKNG GME LCID RVSNQD BBAI DNA QS"

for symbol in $watchlist; do
    price=$(curl -s "https://stooq.com/q/l/?s=${symbol}.us&f=sd2t2ohlcv&h&e=csv" 2>/dev/null | tail -1 | cut -d',' -f7)
    if [ -n "$price" ] && [ "$price" != "null" ]; then
        # Check if $1-$30 (our range for small account)
        in_range_ok=$(in_range "$price" 1 30)
        if [ "$in_range_ok" = "1" ]; then
            log "FOUND: $symbol \$$price (in range \$1-\$30)"
            
            # Add to opportunities
            if [ "$first" = true ]; then
                first=false
            else
                echo "," >> "$OPPORTUNITIES"
            fi
            cat >> "$OPPORTUNITIES" << EOF
{
  "timestamp": "$(date -u +'%Y-%m-%d %H:%M UTC')",
  "symbol": "$symbol",
  "price": "$price",
  "type": "WATCHLIST_SCAN",
  "status": "NEEDS_REVIEW"
}
EOF
        fi
    fi
done

echo "]" >> "$OPPORTUNITIES"

count=$(grep -c '"symbol"' "$OPPORTUNITIES" 2>/dev/null || echo "0")
log "Research scan complete - Found $count opportunities in range \$1-\$30"

exit 0