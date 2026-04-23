[[../../INDEX|← Back to KB]]

# Stock Subagent

Automated price monitoring for David's portfolio with **volatile opportunity detection**.

## How It Works

1. **Cron** runs `stock-trading-subagent.sh` every 30 minutes
2. **Subagent** fetches prices via Stooq, checks targets, detects volatility
3. **Volatility Detection**: If stock moves >3% since last check → writes to pending queue
4. **Conferral**: Main agent reviews pending opportunities and decides whether to alert David
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