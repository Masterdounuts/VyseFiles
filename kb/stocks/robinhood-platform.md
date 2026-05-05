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

*To be updated as we learn more about the platform*