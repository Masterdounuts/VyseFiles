# Stock Data Reader - Reads from markdown files instead of JSON
# Functions to extract data from positions/*.md and config.md

WORKSPACE="/home/openclaw/.openclaw/workspace"
POSITIONS_DIR="$WORKSPACE/kb/stocks/positions"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
CONFIG_FILE="$AGENT_DIR/config.md"

# === GET GLOBAL CONFIG VALUE ===
get_config() {
    local key="$1"
    case "$key" in
        "min_volume")
            grep "Min Volume:" "$CONFIG_FILE" | awk '{print $3}'
            ;;
        "volatility_threshold")
            grep "Volatility Threshold:" "$CONFIG_FILE" | awk '{print $3}' | tr -d '%'
            ;;
        "stop_loss_pct")
            grep "Stop Loss %:" "$CONFIG_FILE" | awk '{print $3}'
            ;;
        "volatile_max")
            grep "Max per volatile play:" "$CONFIG_FILE" | awk '{print $4}' | tr -d '$'
            ;;
        "volatile_min")
            grep "Min per volatile play:" "$CONFIG_FILE" | awk '{print $4}' | tr -d '$'
            ;;
        "volatile_check_enabled")
            grep "Volatile Check:" "$CONFIG_FILE" | awk '{print $3}' | grep -q "enabled" && echo "true" || echo "false"
            ;;
        "volatile_watchlist")
            sed -n '/## Watchlist/,/^##/p' "$CONFIG_FILE" | grep "^- " | sed 's/^- //' | tr '\n' ' '
            ;;
    esac
}

# === GET POSITION DATA FOR A STOCK ===
get_position_shares() {
    local symbol="$1"
    local file="$POSITIONS_DIR/$symbol.md"
    if [ -f "$file" ]; then
        grep "Shares:" "$file" | awk '{print $2}'
    fi
}

get_position_avg_cost() {
    local symbol="$1"
    local file="$POSITIONS_DIR/$symbol.md"
    if [ -f "$file" ]; then
        grep "Avg Cost:" "$file" | awk '{print $3}' | tr -d '$'
    fi
}

get_stop_loss_pct() {
    local symbol="$1"
    local file="$POSITIONS_DIR/$symbol.md"
    if [ -f "$file" ]; then
        grep "Stop-loss:" "$file" | awk '{print $2}' | tr -d '%'
    fi
}

# === GET BUY TARGETS (comma-separated to space-separated) ===
get_buy_targets() {
    local symbol="$1"
    local file="$POSITIONS_DIR/$symbol.md"
    if [ -f "$file" ]; then
        sed -n '/## Targets/,/^##/p' "$file" | grep "Buy:" | sed 's/.*Buy: //' | tr ',' ' '
    fi
}

# === GET SELL TARGETS ===
get_sell_targets() {
    local symbol="$1"
    local file="$POSITIONS_DIR/$symbol.md"
    if [ -f "$file" ]; then
        sed -n '/## Targets/,/^##/p' "$file" | grep "Sell:" | sed 's/.*Sell: //' | tr ',' ' '
    fi
}

# === GET ALL POSITIONS (symbols we own) ===
get_positions() {
    local positions=""
    for f in "$POSITIONS_DIR"/*.md; do
        if [ -f "$f" ]; then
            local symbol=$(basename "$f" .md)
            local shares=$(get_position_shares "$symbol")
            if [ -n "$shares" ] && [ "$shares" != "0" ]; then
                positions="$positions $symbol"
            fi
        fi
    done
    echo "$positions" | sed 's/^ *//'
}

# === GET ALL AVAILABLE STOCKS (positions + watchlist) ===
get_all_stocks() {
    local positions=$(get_positions)
    local watchlist=$(get_config "volatile_watchlist")
    echo "$positions $watchlist" | tr ' ' '\n' | sort -u | tr '\n' ' ' | sed 's/^ *//'
}

# Debug function
debug_stock_data() {
    local symbol="$1"
    echo "=== $symbol ==="
    echo "Shares: $(get_position_shares "$symbol")"
    echo "Avg Cost: $(get_position_avg_cost "$symbol")"
    echo "Stop Loss: $(get_stop_loss_pct "$symbol")%"
    echo "Buy Targets: $(get_buy_targets "$symbol")"
    echo "Sell Targets: $(get_sell_targets "$symbol")"
}