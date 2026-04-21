[[INDEX.md|Home]] • [[kb/stocks/rules|Trading Rules]]

# Day Trading Protocol for David

## Concept
Trade small capital actively to compound gains.
- Small gains + frequent trades = growth
- David executes; I monitor/research

## Capital (Apr 21, 2026)
- **GGB:** 4.99 shares @ $4.17 (now $4.28 = $21.36 value)
- **Cash:** $31.32
- **Total:** $52.68
- **Unrealized:** +$0.55 (+2.64%)
- **Goal:** Compound to $70/day eventual (reinvest 100%)

## Strategy
- Focus on GGB for now (solid setup, near 52W high)
- No active AMC position - dropped from monitoring

## Rules (GGB)
1. Set target prices (buy support, sell resistance)
2. Take 1-3% gains
3. No chasing; wait for pullback
4. Stop-loss max 5%
5. Reinvest immediately

## GGB Levels (Apr 20)
- **Buy:** $4.10, $3.90
- **Sell:** $4.45, $4.60, $4.75 (scale: 50% at $4.45, 50% at $4.60)
- **52-wk range:** $2.48-$4.66
- **Analyst Target:** $4.81 (Itau BBA upgrade Apr 1)

## Volatile Opportunity System (New!)

**Position Sizing:**
- **Max $10 per volatile play** (small position to limit risk)
- **Min $5** if opportunity is strong
- **Max 3 volatile positions** at once

**How it works:**
1. Subagent monitors GGB + watchlist every 30 min via cron
2. Watchlist stocks: BBAI, LCID, QS, MARA, SOFI
3. If price moves >3% since last check → writes to `pending-opportunities.json`
4. Main agent reviews pending opportunities every 15 min
5. If I think it's a good opportunity → Telegram alert to David with position size
6. David decides whether to act

**Why small positions?**
- Small gains + frequent trades = compound growth
- Don't lose too much in one stock
- Volatile = high risk, keep exposure low

---

## Stock Subagent (V3 - Active)

**Scripts:**
- `stock-trading-subagent.sh` - Price monitor + volatility detector
- `check-pending-opportunities.sh` - Main agent reviews pending
- `clear-pending.sh` - Clears queue after review

**Files:**
- State: `kb/stocks/agent/state.json`
- Pending: `kb/stocks/agent/pending-opportunities.json`
- Logs: `kb/stocks/agent/trading.log`, `alerts.log`

**Cron Jobs:**
| Job | Frequency | Purpose |
|-----|-----------|---------|
| Stock Price Monitor | */30 min | Run subagent, check GGB targets |
| Volatile Opportunity Review | */15 min | Main agent reviews pending |

**Capabilities:**
- ✅ Live prices via Alpha Vantage (API key: VSJ5QVVM11QT0LHP)
- ✅ Auto-alerts on buy/sell target hits
- ✅ Volatile opportunity detection (>3% move)
- ✅ Conferral system (I review → Telegram alert)

---

## Execution Workflow (Official)
1. **I analyze** → Recommend stock + position size + entry/sell targets
2. **You execute** → Place order, send screenshot
3. **I update** → Log to trades.json, state.json, memory

**Screenshot must show:** Symbol, quantity, price, total

## Daily Routine
1. Check market prices
2. Monitor GGB for targets
3. Review any volatile opportunities
4. **Recommend trades** with entry/sell/stop targets
5. Wait for your execution screenshot
6. Update all tracking files
7. Reinvest gains

## My Role
- Monitor GGB prices
- Alert on target hits (auto)
- Evaluate volatile opportunities (conferral)
- Track portfolio
- Log trades

## David's Role
- Execute trades
- Watch charts
- Make final decisions

---
*Keep it lean, act fast.*