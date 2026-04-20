# Stock Subagent

Automated price monitoring for David's portfolio.

## Files

- `config.yaml` - Settings (check interval, alert channel)
- `state.json` - Portfolio positions, price targets, alert history

## How It Works

1. Cron runs `stock-agent.sh` every 30 minutes
2. Script fetches current prices via web search
3. Compares against buy/sell targets in `state.json`
4. Alerts David when price hits any target

## Targets

**GGB:**
- Sell: $0.30, $0.40, $0.50
- Buy: $0.15, $0.10, $0.00

**AMC:**
- Sell: $1.80, $2.00, $2.20
- Buy: $1.50, $1.40, $1.30

**TSLA:**
- Sell: $8.00+ (Stock Reward value)
- Buy: N/A (holding)

## Adding Stocks

Edit `state.json` to add new stocks:

```json
"NEWTICKER": {
  "shares": 10,
  "avg_cost": 5.00,
  "notes": "..."
}
```

Then add targets in the `targets` section.

## Logs

- `$WORKSPACE/logs/stock-agent.log` - Agent execution log
- `$WORKSPACE/logs/alerts.log` - Alert history