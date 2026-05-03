# Stock Trading Subagent Assessment

[[kb/stocks/stocks|← Back to Stocks]]

**Date:** 2026-04-21
**Analyst:** Vyse

## Current Strengths ✅

- Clean code, well-structured
- Stop-loss protection (5%)
- Dynamic targets from positions/*.md
- Volatility detection (>3% threshold)
- Telegram integration for alerts
- Extended hours detection

## Critical Gaps ❌

| Gap | Impact | Example |
|-----|--------|---------|
| **1. Data source is basic** | Stooq is free but slow, no volume | Can't distinguish fake pump from real move |
| **2. No trend confirmation** | Could be catching a falling knife | Buying a stock up 3% on dying momentum |
| **3. No take-profit logic** | HODLing instead of locking gains | GGB hits $4.45, we'd alert but no auto-sell |
| **4. Static position sizing** | $5-10 always, regardless of setup quality | Missing best setups get same size as risky ones |
| **5. No volume analysis** | Volume spikes confirm moves | Could miss breakout setups |
| **6. No news/earnings awareness** | Big moves come from catalysts | Could buy right before a dump |
| **7. No trailing stop** | Protects gains? | If GGB runs to $5, no way to lock 50% gains |

## Recommended Improvements (Priority Order)

### 1. Trailing Stop (High Priority)
Lock gains automatically. Example: If GGB rises 7% from basis, set stop at break-even.

### 2. Take-Profit Tiers
Scale out at different targets:
- 50% at 4.45 (+6.7%)
- 50% at 4.60 (+10.3%)

### 3. Volume Filter
Only alert on volatile moves WITH volume confirmation.

### 4. Trend Confirmation
Check 50-day MA before suggesting buys — only buy above MA.

---

## Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Price monitoring | ✅ Done | Stooq API |
| Stop-loss | ✅ Done | 5% threshold, Telegram alert |
| Buy/Sell targets | ✅ Done | Dynamic from positions/*.md |
| Volatility detection | ✅ Done | >3% triggers conferral |
| Trailing stop | 🔲 Not done | Needs implementation |
| Take-profit tiers | 🔲 Not done | Needs implementation |
| Volume filter | 🔲 Not done | Needs better data source |
| Trend confirmation | 🔲 Not done | Needs historical data |

---

*Last updated: 2026-04-21 05:59 UTC*