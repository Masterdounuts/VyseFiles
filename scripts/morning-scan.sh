#!/bin/bash
# Morning Stock Scan - Refresh watchlist with top movers
# Run before market open (9:30 AM ET = 13:30 UTC)

WORKSPACE="/home/openclaw/.openclaw/workspace"
STATE="$WORKSPACE/kb/stocks/agent/state.json"
LOG="$WORKSPACE/kb/stocks/agent/trading.log"
WATCHLIST_TMP="/tmp/new_watchlist.txt"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [MORNING_SCAN] $1" | tee -a "$LOG"
}

log "=== Morning Watchlist Scan ==="

# Fetch top movers from Yahoo Finance
log "Fetching premarket movers..."

# Try Yahoo Finance movers page
Movers=$(curl -s "https://finance.yahoo.com/movers" 2>/dev/null | grep -oP 'symbol.*?>([A-Z]+)</a>' | head -30 | sed 's/.*>\([A-Z]*\)<.*/\1/' | sort -u)

if [ -z "$Movers" ]; then
    # Fallback: try a simpler approach - fetch S&P 500 component page for ideas
    log "Yahoo fetch failed, trying alternative source..."
    # Could add more sources here
    log "No auto-sources available. Manual scan needed."
    exit 1
fi

log "Found candidates: $(echo $Movers | tr '\n' ' ')"

# Filter: remove anything too expensive or too cheap
# Keep stocks between $2 and $50 for our capital
FILTERED=""
for sym in $Movers; do
    # Quick price check via Alpha Vantage (limited)
    # For now, just keep the symbol - price check happens in regular scan
    FILTERED="$FILTERED $sym"
done

# Update state.json with new watchlist
NEW_WATCHLIST=$(echo "$FILTERED" | tr ' ' '\n' | grep -v '^$' | head -5 | tr '\n' ',' | sed 's/,$//')

if [ -n "$NEW_WATCHLIST" ]; then
    log "Updating watchlist to: $NEW_WATCHLIST"
    # Use python to update JSON safely
    python3 -c "
import json
with open('$STATE', 'r') as f:
    data = json.load(f)
data['volatile_watchlist'] = '$NEW_WATCHLIST'.split(',')
with open('$STATE', 'w') as f:
    json.dump(data, f, indent=2)
"
    log "Watchlist updated successfully"
else
    log "No valid candidates found, keeping current watchlist"
fi

log "=== Scan Complete ==="