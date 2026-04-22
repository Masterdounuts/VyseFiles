# Volatility Detector

*Monitors for >3% price moves in watchlist stocks*

## Watchlist
- BBAI
- LCID
- QS
- MARA
- SOFI

## How It Works
1. Subagent runs every 30 min (price monitor)
2. Compares current price to last check
3. If move >3% → writes to `pending-opportunities.json`
4. Main agent reviews pending every 15 min
5. If good setup → Telegram alert to David

## Position Sizing
- Max $10 per play (volatile = high risk)
- Min $5 for strong setups
- Max 3 volatile positions at once

---

*Related: [[kb/stocks/hub-portfolio|Portfolio]] | [[kb/stocks/agent/subagent.md|Subagent]]