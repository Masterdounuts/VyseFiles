# Stock Positions & Trade History

*Quartermaster's complete trading record*

---

## Current Positions (as of May 4, 2026 PT)

| Symbol | Shares | Entry Price | Stop Loss | Target | Current Price | P/L | P/L % |
|--------|--------|-------------|-----------|--------|---------------|-----|-------|
| ~~NRXP~~ | ~~SOLD~~ | ~~$3.04~~ | ~~-~~ | ~~$3.65~~ | ~~$3.07~~ | **+$0.12** | **+1%** |
| LIDR | 5 | $2.14 | $1.82 | $2.57 | $1.98 | -$0.80 | -7.5% |

*Note: David reports LIDR current at $1.98*

---

## Capital Summary (From David)

| Metric | Amount |
|--------|--------|
| David's Investment | $45.00 |
| **Current Total** | **$51.32** |
| Buying Power | $41.42 |
| In LIDR | ~$9.90 |
| **Profit** | **+$6.32** |

---

## Trade History

| Date | Action | Symbol | Shares | Price | P/L | Notes |
|------|--------|--------|--------|-------|-----|-------|
| 2026-05-04 | SELL | NRXP | 4 | $3.07 | +$0.12 | Exited - David manual sale |
| 2026-04-27 | BUY | NRXP | 4 | $3.04 | - | Initial position |
| 2026-04-27 | BUY | LIDR | 5 | $2.14 | - | Initial position |

---

## Trading Rules

- **Stop Loss:** -15% from entry
- **Take Profit:** +20% OR +$0.50/share whichever comes first
- **Max Position:** 25% of capital per stock
- **Max Positions:** 5 stocks at a time

---

## Price Validation Protocol

1. Check `prices.json` → if `manual_override: true` → use David's prices
2. Always verify with web_fetch from public.com after-hours
3. If web prices differ significantly from stored → **flag to David**
4. If David provides different price → update positions.md, set manual_override: true

---

*Last Updated: 2026-05-04 2:13 PM PT*
*Data source: David (capital), web (prices)*