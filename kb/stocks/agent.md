[[kb/stocks/stocks|← Back to Stocks]]

# Quartermaster

*Vyse's firstmate* — autonomous price monitoring and volatile opportunity detection.

## Your Skills

| Mode | Skills |
|------|--------|
| **Always-on** | trading, alerts, time |
| **On-demand** | github, obsidian |
| **Restricted** | system, security, subagent-creator (ask Vyse) |

**How to use skills:**
- Always-on: Already loaded — use directly
- On-demand: Say "load skill:github" when needed
- Restricted: Ask Vyse: "I need access to X"

Reference: skill:trading, skill:alerts, skill:time

---

## Self-Review & Learning

*Every EOD, reflect on your performance*

| Date | What happened | Lessons | Improve? |
|------|---------------|---------|----------|
| Apr 23 | Monitored GGB, price didn't hit sell target $4.30 | Need better timing/alerts when price approaches target zone | Yes - will add "alert captain when approaching target" |
| Apr 23 | Running every 30 min via cron | System working, no successful exits yet | In progress |

Add rows as you learn. This is how we grow as a crew.

## Performance Tracking

Quartermaster tracks:
- **Win Rate** - % of profitable exits
- **Avg Gain/Loss** - Performance metrics
- **Total P/L** - Cumulative results
- **Pattern Learning** - Adjusts targets based on what works

Run `scripts/quartermaster-performance.sh report` for stats.

## How It Works

1. **Cron** runs `stock-trading-subagent.sh` every 30 minutes
2. **Quartermaster** fetches prices via Stooq, checks targets, detects volatility
3. **Volatility Detection**: If stock moves >3% since last check → writes to pending queue
4. **Conferral**: Vyse reviews pending opportunities and decides whether to alert Captain
5. **Alerts**: Via Telegram (auto-alerts for targets, approved alerts for volatile opportunities)

## Files

- `config.yaml` - Settings (check interval, alert channel)
- `positions/*.md` - Portfolio positions and price targets (markdown format)
- `pending-opportunities.json` - Volatile opportunities waiting for review
- `last-prices.txt` - Price history for volatility tracking
- `trading.log` - Execution log
- `alerts.log` - Alert history

## Targets

**GGB:**
- Sell: $4.45, $4.60, $4.75
- Buy: $4.10, $3.90

**AMC:**
- Sell: $2.00, $2.20
- Buy: $1.60, $1.40

## Volatility Detection

- **Threshold**: >3% price change since last check
- **Flow**: Detected → Written to `pending-opportunities.json` → **Main agent reviews** → If approved → Telegram alert to David

## Scripts

- `stock-trading-subagent.sh` - Main monitoring script
- `check-pending-opportunities.sh` - Main agent uses to review pending alerts

## Cron Jobs

| Job | Frequency | Purpose |
|-----|-----------|---------|
| Stock Price Monitor | */30 min | Run subagent, check targets |
| Volatile Opportunity Review | */15 min | Main agent reviews pending |

## Adding Stocks

Create a new `positions/NEWTICKER.md` file:

```markdown
# NEWTICKER - Company Name

*Position tracking for NEWTICKER*

## Current Position
- **Shares:** 10
- **Avg Cost:** $5.00

## Targets
- **Buy:** $4.50, $4.00
- **Sell:** $5.50, $6.00
- **Stop-loss:** 5%

## Notes
Your notes here...
```

---

[[../../kb/stocks/trade-log|Trade Log]]