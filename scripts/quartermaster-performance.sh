#!/bin/bash
# Quartermaster Performance Tracker
# Tracks win rate, avg gain/loss, and adjusts strategy

WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/stocks/agent"
TRADES="$AGENT_DIR/trades.json"
LEARNINGS="$AGENT_DIR/learnings.json"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [PERF] $1"
}

# === CALC ===
calc() { awk "BEGIN { printf \"%.2f\", ($1) }"; }

# === TRACK PERFORMANCE ===
track_performance() {
    local symbol="$1"
    local shares="$2"
    local entry="$3"
    local exit="$4"
    local reason="$5"  # "TARGET" or "STOP_LOSS"
    
    local pnl=$(calc "($exit - $entry) * $shares")
    local pnl_pct=$(calc "($exit - $entry) / $entry * 100")
    
    log "Tracking: $symbol $shares@$entry → $exit | P/L: \$$pnl ($pnl_pct%)"
    
    # Update trades.json - move from open_positions to closed trades
    local tmp=$(mktemp)
    node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('$TRADES'));
    
    // Remove from open_positions
    if (data.open_positions && data.open_positions['$symbol']) {
        delete data.open_positions['$symbol'];
    }
    
    // Add to trades
    data.trades.push({
        symbol: '$symbol',
        action: 'SELL',
        shares: $shares,
        entry: $entry,
        exit: $exit,
        pnl: '$pnl',
        pnl_pct: '$pnl_pct',
        date: '$(date +%Y-%m-%d)',
        reason: '$reason'
    });
    
    data.last_updated = new Date().toISOString();
    fs.writeFileSync('$TRADES', JSON.stringify(data, null, 2));
    " 2>/dev/null
    
    # Update learnings.json performance metrics
    update_performance_metrics "$pnl" "$pnl_pct"
    
    # Add lesson
    add_lesson "$symbol" "$entry" "$exit" "$pnl" "$pnl_pct" "$reason"
}

# === UPDATE PERFORMANCE METRICS ===
update_performance_metrics() {
    local pnl="$1"
    local pnl_pct="$2"
    
    local is_win=$( [ "$(echo "$pnl > 0" | bc)" = "1" ] && echo "true" || echo "false" )
    
    node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('$LEARNINGS'));
    
    if (!data.performance) data.performance = {
        total_trades: 0, wins: 0, losses: 0, 
        win_rate: 0, avg_gain_percent: 0, avg_loss_percent: 0,
        total_pnl: 0, best_trade: 0, worst_trade: 0
    };
    
    const p = data.performance;
    p.total_trades++;
    p.total_pnl = (parseFloat(p.total_pnl || 0) + $pnl).toFixed(2);
    
    if ($pnl > 0) {
        p.wins++;
        p.avg_gain_percent = ((parseFloat(p.avg_gain_percent || 0) * (p.wins - 1)) + $pnl_pct) / p.wins;
        p.best_trade = Math.max(parseFloat(p.best_trade || 0), $pnl_pct);
    } else {
        p.losses++;
        p.avg_loss_percent = ((parseFloat(p.avg_loss_percent || 0) * (p.losses - 1)) + $pnl_pct) / p.losses;
        p.worst_trade = Math.min(parseFloat(p.worst_trade || 0), $pnl_pct);
    }
    
    p.win_rate = ((p.wins / p.total_trades) * 100).toFixed(1);
    p.avg_gain_percent = parseFloat(p.avg_gain_percent || 0).toFixed(1);
    p.avg_loss_percent = parseFloat(p.avg_loss_percent || 0).toFixed(1);
    
    data.last_updated = new Date().toISOString();
    fs.writeFileSync('$LEARNINGS', JSON.stringify(data, null, 2));
    " 2>/dev/null
    
    log "Updated performance metrics"
}

# === ADD LESSON ===
add_lesson() {
    local symbol="$1"
    local entry="$2"
    local exit="$3"
    local pnl="$4"
    local pnl_pct="$5"
    local reason="$6"
    
    local lesson_type=$( [ "$reason" = "TARGET" ] && echo "SELL_TARGET_HIT" || echo "STOP_LOSS_TRIGGERED" )
    
    node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('$LEARNINGS'));
    
    data.lessons.push({
        timestamp: new Date().toISOString(),
        symbol: '$symbol',
        type: '$lesson_type',
        entry: $entry,
        exit: $exit,
        pnl: '$pnl',
        pnl_pct: '$pnl_pct',
        reason: '$reason',
        notes: '$reason hit - recording for pattern learning'
    });
    
    data.last_updated = new Date().toISOString();
    fs.writeFileSync('$LEARNINGS', JSON.stringify(data, null, 2));
    " 2>/dev/null
}

# === GET PERFORMANCE REPORT ===
get_report() {
    node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('$LEARNINGS'));
    const p = data.performance || {};
    
    console.log('=== QUARTERMASTER PERFORMANCE ===');
    console.log('Total Trades:', p.total_trades || 0);
    console.log('Win Rate:', (p.win_rate || 0) + '%');
    console.log('Wins:', p.wins || 0, '| Losses:', p.losses || 0);
    console.log('Avg Gain:', (p.avg_gain_percent || 0) + '%');
    console.log('Avg Loss:', (p.avg_loss_percent || 0) + '%');
    console.log('Total P/L:', '\$' + (p.total_pnl || 0));
    console.log('Best Trade:', (p.best_trade || 0) + '%');
    console.log('Worst Trade:', (p.worst_trade || 0) + '%');
    "
}

# === MAIN ===
case "$1" in
    track)
        track_performance "$2" "$3" "$4" "$5" "$6"
        ;;
    report)
        get_report
        ;;
    *)
        echo "Usage: $0 {track <symbol> <shares> <entry> <exit> <reason>|report}"
        echo "  track: Log a completed trade"
        echo "  report: Show performance summary"
        ;;
esac