---
name: trading
description: "Professional day/swing trading with risk management. Use when: (1) discussing stocks, (2) analyzing opportunities, (3) checking positions, (4) setting alerts, (5) reviewing trades."
access: public
trigger phrases: "stock, trade, buy, sell, position, price, alert, stop loss, target"
---

# Trading Skill

*Professional trading with continuous learning*
---

## The Workflow (5 Steps) - WITH FINNHUB NEWS

### Step 1: Check News (NEW - PRIMARY)
- **Run Finnhub news:** `node scripts/get-stock-news.js`
- Find breaking catalysts (earnings, FDA, contracts, M&A)
- Flag stocks with strong news drivers
- **If no news → skip to prices**

### Step 2: Research
- **Fetch live prices:** 
  - Stocks: `node scripts/get-stock-price.js SYMBOL` (Yahoo Finance)
  - Crypto: `web_search` for "DOGE price today"
- Check 52-week high/low, volume
- **Flag if:** down >80%, tiny cap, negative earnings

### Step 2: Rationalize
- Process the data
- Make decision: "buy [X] because [reasons]"
- Document the thesis

### Step 3: Verify
- Review logic
- Check: Within budget? Good risk/reward? Rules followed?
- Raise concerns if any

### Step 4: Summarize
- Summarize: decision, price, shares, reasoning
- **Vyse NEVER executes trades** — Captain executes on Robinhood
- If Captain approves → Execute → Log

---

## Risk Management

| Rule | Value |
|------|-------|
| Stop Loss | -7% from entry |
| Take Profit | +12% from entry |
| Max Position | **20% of capital** (diversification) |
| Max Positions | 5 stocks |
| Cash Reserve | **20%** always available |

### Position Sizing
```
shares = min(capital * 0.25, capital - other_positions) / price
```

---

## Current Positions (as of May 5, 2026)

| Symbol | Shares | Entry | Stop | Target | Current | P/L |
|--------|--------|-------|------|--------|----------|-----|
| NVDA | 0.0504 | $198.31 | $184.43 | $222.11 | $196.53 | -0.9% |
| WGS | 1 | $35.94 | $33.42 | $40.25 | $33.58 | -6.6% |

**Capital:** $51.32 | **Cash:** $6.28 | **Profit:** +$6.32 (+14%)

---

## Trade Execution Protocol

1. **I recommend** → Stock + position + entry/sell/stop targets
2. **Captain executes** → Places order, sends confirmation
3. **I log** → trades.json, positions.md, trade-log.md

---

## Learning Loop

After each trade (win or loss), log to `.learnings/`:

### Win Entry
```markdown
## [WIN-YYYYMMDD-001] SYMBOL

**Date**: 2026-05-05
**What worked**: Entry timing, thesis validation
**Could improve**: Exit timing
```

### Loss Entry
```markdown
## [LOSS-YYYYMMDD-001] SYMBOL

**Date**: 2026-05-05
**What went wrong**: 
**Root cause**:
**Prevent next time**:
```

### Review Frequency
- Daily: Check open positions
- Weekly: Review all trades
- Monthly: Analyze win rate, avg return

---

## Research Process - The David Method (Updated)

1. **Check News** → Finnhub news (`node scripts/get-stock-news.js`) → Find catalyst
2. **Scan** → Robinhood "Big Movers" → find volatility (backup if no news)
3. **Filter** → Check analytics (buy/hold/sell) → only research if high buy rating
4. **Verify** → 52-week data → is it dying or alive?
5. **Bull Case** → Price far from 52W high = upside potential
6. **Afford** → Can I afford it? (≤20% of capital)
7. **Decide** → Buy if bull case + affordable

---

## Self-Evaluation Questions

Answer before every trade:

1. **Why this stock?** — Clear thesis
2. **What's the risk?** — Stop loss defined
3. **What's the reward?** — Target set (12% or 52W high nearby)
4. **Is it within rules?** — Position size, max positions
5. **Am I patient?** — Not chasing

---

## Known Weaknesses (From Lessons)


| Weakness | Impact | Mitigation |
|----------|--------|------------|
| Impatience | Miss targets, overtrade | Set hard exits, don't adjust mid-trade |
| Alert lag | Miss intraday moves | Check prices proactively |

## New Learnings (May 5, 2026)


| Lesson | What Happened | Update |
|--------|---------------|--------|
| Position sizing on gambles | WGS was 70% of portfolio | Even educated gambles ≤20% |
| "It's low" isn't a thesis | Bought WGS without specific catalyst | Need "why" not just "low" |
| 52W low warning | WGS near $32.84 (52W low) | Low = could be dying, not bottom |
| Be honest about uncertainty | David called it "educated gamble" | Label gambles as gambles |
| PT timezone | Defaulted to UTC | Always use PT (David's timezone) |

---

## Key Files

| File | Purpose |
|------|---------|
| `kb/stocks/positions.md` | Current positions |
| `kb/stocks/trade-log.md` | Trade history |
| `kb/stocks/lessons_learned/` | Learnings |
| `kb/stocks/prices.json` | Price data |

---

## Trigger Phrases

- "stock", "trade", "buy", "sell"
- "position", "price", "alert"
- "stop loss", "target"

---

## References

- github - Persistence
- learning - Self-improvement pattern
- kb/stocks/robinhood-platform.md - Robinhood app knowledge
- kb/stocks/strategies.md - Trading strategy library
- scripts/get-stock-price.js - Price fetcher (Yahoo Finance)
- scripts/get-stock-news.js - News fetcher (Finnhub API)
- kb/stocks/win-loss-tracker.md - Trade logging