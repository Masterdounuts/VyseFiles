# Robinhood Platform Knowledge

*Research collected May 2026 - For trading with David*

---

## Platform Overview

- **Type:** Mobile-first (iOS/Android) + Web (Robinhood Legend)
- **Tradable:** Stocks, ETFs, Options, Crypto, Futures
- **Account Types:** Individual, Joint, Retirement, Margin

---

## Key Features for Our Trading

### 1. Finding Stocks

| Feature | How It Works | Use Case |
|---------|--------------|----------|
| **Big Movers** | Top movers cards show largest % gainers/losers after market close | Finding volatility |
| **Watchlists** | Custom lists to track stocks | Monitoring candidates |
| **Search** | Symbol search + company info | Quick lookup |
| **Market Segments** | Category browsing (tech, healthcare, etc.) | Sector scanning |

### 2. Stock Analysis (What's Available)

- **Analyst Ratings:** Robinhood shows consensus Buy/Hold/Sell (from Wall Street analysts)
- **Price Targets:** Shows analyst price targets
- **Statistics:** 52-week high/low, market cap, volume
- **News:** Latest news feed for each stock

### 3. Order Types

| Order Type | Description | Our Use |
|------------|-------------|---------|
| **Market** | Buy/sell immediately at current price | Quick entry |
| **Limit** | Buy/sell at specific price or better | Entry control |
| **Stop Loss** | Triggers market order when price hits stop price | Exit protection |
| **Trailing Stop** | Stop price moves with stock (trails by $ or %) | Dynamic exit |
| **Stop-Limit** | Triggers limit order at stop price | Controlled exit |

### 4. Trading Rules on Robinhood

- **Fractional Shares:** Yes - can buy partial shares
- **Market Hours:** Pre-market (7-9:30 AM ET), After-hours (4-8 PM ET)
- **Options:** Available (need approval)
- **Crypto:** Available 24/7
- **Margin:** Available (Gold members)

---

## David's Workflow (Documented)

1. **Open Robinhood** → Find "Big Movers" section
2. **Scan for volatility** → Look at biggest gainers
3. **Check analytics** → If high "Buy" rating → research further
4. **Verify 52-week data** → Is it alive or dying?
5. **Check price vs 52W high** → Calculate upside potential
6. **Afford?** → Can I buy?
7. **Execute** → Market or limit order
8. **Set stop loss** → -7% from entry

---

## What I Can Help With

| Task | How I Help |
|------|-------------|
| Find stock info | `web_search` or `scripts/get-stock-price.js` |
| Verify 52W data | Fetch with price script |
| Calculate position | Size based on capital rules |
| Set stop/target | Math: entry × 0.93 / 1.12 |
| Track P/L | Update positions.md |
| Alert on moves | Cron job (future) |

---

## References

- Robinhood Help: robinhood.com/us/en/support/articles/
- Robinhood Legend: Browser-based desktop platform
- Stop Loss: trailing stop order available

---

## Cash Account Rules (IMPORTANT)

| Feature | Cash Account | Margin Account |
|---------|--------------|----------------|
| **PDT Restrictions** | ❌ None | ✅ Apply if <$25K |
| **Day Trades** | Unlimited | 3 per 5 days if <$25K |
| **Unsettled Funds** | Can't use proceeds until T+1 | Can use with margin |

### What This Means for Us

- **We have a CASH account** → No Pattern Day Trader (PDT) restrictions!
- Can day trade as much as we want
- **Downside:** Can't trade on unsettled funds (must wait T+1 for funds to clear)
- This is why there's $6.28 buying power - some funds may be settling

### Key Rules

1. **T+1 settlement:** Stock sales take 1 day to settle before proceeds usable
2. **No margin calls:** Cash account = can't go negative
3. **Unlimited day trades:** Biggest advantage of cash account

---

## Crypto Trading on Robinhood

| Feature | Details |
|---------|----------|
| **Available Coins** | 45+ (BTC, ETH, DOGE, SOL, etc.) |
| **Trading Hours** | 24/7 (365 days) |
| **Commissions** | $0 (zero-commission) |
| **Staking** | ETH, SOL available |
| **Market** | $51B+ in customer assets |

### Advantages for Our Trading

- **24/7 trading** → Can trade even when market closed
- **High volatility** → More profit potential per trade
- **No PDT rules** → Already have with cash, but crypto has no settlement
- **DOGE already owned** → Free position to start with

### Crypto Trading Rules

1. **Instant settlement** → Can immediately re-trade proceeds (unlike stocks T+1)
2. **Volatility is higher** → Larger gains AND larger losses
3. **Stop losses work** → Can set to protect position
4. **No limit orders sometimes** → Market orders more common

### Crypto Strategy Notes

- **Target larger moves:** +10-30% is common
- **Stop tighter:** -5% instead of -7% due to higher volatility
- **Monitor 24/7:** Can check any time
- **News drives movement:** Major announcements = big moves

---

*To be updated as we learn more about the platform*