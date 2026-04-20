[[index|Home]] • [[memory/[[memory/trading_rules]]|Trading Rules]]


# Day Trading Protocol for David

## Concept
Trade small capital actively to compound gains.
- Small gains + frequent trades = growth
- David executes; I monitor/research

## Capital (Apr 16, 2026)
- **GGB:** 4.98 shares @ $4.17 (now ~$21.66 value)
- **AMC:** 8 shares @ $1.64 (now ~$13.20 value)
- **TSLA:** 0.016567 shares @ $351.30 (now ~$6.53) - HOLD until $8+
- **Cash:** ~$24
- **Total:** ~$65

## Strategy
**TSLA Unlock (Apr 16):**
- ✅ Decision: HOLD until market value reaches $8+ (Stock Reward)
- **Reallocation after sell:** 70% GGB / 30% AMC

## Rules (GGB)
1. Set target prices (buy support, sell resistance)
2. Take 1-3% gains
3. No chasing; wait for pullback
4. Stop-loss max 5%
5. Reinvest immediately

## Levels (Apr 16)
- **Buy:** $4.15, $4.10, $4.00
- **Sell:** $4.30, $4.40, $4.50
- **52-wk range:** $2.47-$4.66

## Volatile Picks (for small positions)
- **AMC:** ~$1.65, earnings Apr 18, high volatility
- **NOK:** $3.92, earnings Apr 19, 5G news
- **DT:** $7.18, earnings Apr 23, mobile growth

---
## Stock Subagent (Automated)

**Status:** Active ✅
- Cron: Every 30 minutes
- Script: `scripts/stock-agent.sh`
- Config: `kb/stocks/agent/config.yaml`
- State: `kb/stocks/agent/state.json`

**How it works:**
1. Checks prices against buy/sell targets
2. Alerts David when price hits any target
3. Logs all alerts to `logs/alerts.log`

**Adding stocks:** Edit `kb/stocks/agent/state.json`

---
## Daily Routine
1. Check market open prices
2. Set alerts for targets
3. Monitor opportunities
4. David executes trades
5. Log every trade
6. Reinvest gains

## My Role
- Monitor prices (CNBC)
- Research setups
- Alert on opportunities
- Track portfolio
- Log trades

## David's Role
- Execute trades
- Watch charts
- Make final decisions

---
## Session Compaction Protocol
- **FIXED (Apr 16):** config patch reserveTokens=25000 — prevents crashes
- Trigger at 60-70% context
- Check session_status
- Run compaction when needed
- **Rule:** Config first, then behavior. Never add overhead "just in case."

---
*Keep it lean, act fast.*
