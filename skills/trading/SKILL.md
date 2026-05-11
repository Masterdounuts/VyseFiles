---
name: trading
description: "Professional day/swing trading with risk management. Use when: (1) discussing stocks, (2) analyzing opportunities, (3) checking positions, (4) setting alerts, (5) reviewing trades."
access: public
trigger phrases: "stock, trade, buy, sell, position, price, alert, stop loss, target"
---

# Trading Skill

*Professional trading with continuous learning — Built from TradingLab + SMC*

---

## Core Philosophy

> "I focused less on predicting and more on emotional discipline."
> — $247K month trader

**Emotional discipline > prediction. Follow the plan, not emotions.**

---

## PART 1: SMC (Smart Money Concepts) — Technical Entry

### The 6 Steps (All 6 Must Line Up)

1. **Find Liquidity** — Equal lows, swing lows, support zone
2. **Wait for Sweep** — Price dips below liquidity → rejects (liquidity grab)
3. **Wait for CHOCH** — Break in structure, momentum shift above prior high
4. **Wait for FVG** — Pullback to Fair Value Gap = ENTRY ZONE
5. **Draw Fib** — From liquidity → CHOCH (extensions 0, -1, -2)
6. **Set TP/SL** — TP at -2, SL below liquidity

### Fib Settings (EXTENSIONS ONLY)
- **Use:** 0, -1, -2 (REMOVE standard retracement levels)
- 0 = Entry point (at CHOCH)
- -1 = First target (1x range expansion)
- -2 = Second target (2x range expansion)

### Entry Rules
- **MUST have catalyst BEFORE entry** — 80% win rate vs 0% without
- Wait for confirmation, don't predict
- Multiple confluences = higher conviction

### SMC Checklist (ALL MUST CHECK)
- [ ] Liquidity taken (sweep + rejection)
- [ ] Clear CHOCH (break above prior high)
- [ ] Retrace into FVG
- [ ] Fib drawn (liquidity → CHOCH)
- [ ] TP at -2
- [ ] SL below liquidity

**If all 6 line up = SETUP VALID**

---

## SMC WORKFLOW (Complete Process)

### Step-by-Step: Find → Analyze → Enter

| Step | What To Do | Tool |
|------|------------|------|
| **1. SCAN** | Find candidates with volume + pattern | `smc-scan.js` |
| **2. FILTER** | Get price + 52W range | `get-stock-price.js` |
| **3. CATALYST** | Search for news/event | `web_search` |
| **4. FUNDAMENTALS** | Check P/E, debt, earnings | `web_fetch` (CNBC) |
| **5. CHART** | Confirm SMC 6 steps | Browser → TradingView |
| **6. RECOMMEND** | Only if all 6 steps complete | Present to David |

### NEVER Skip Steps
- ❌ Don't recommend without chart analysis
- ❌ Don't enter before CHOCH + FVG
- ❌ Don't trade without catalyst

### The Rule
**Only present trade when:**
1. Liquidity swept ✅
2. CHOCH confirmed (broke above prior high) ✅
3. FVG pullback happened ✅
4. Catalyst exists ✅

---

## PART 2: Fundamental Filters (Peter Lynch + TradingLab)

### The 6 Rules

| # | Metric | Threshold | Why |
|---|--------|-----------|-----|
| 1 | P/E (trailing) | <25 | Won't overpay |
| 2 | Forward P/E | <15 | GARP — buying future growth at today's price |
| 3 | Debt/Equity | <35% | Over-leveraged = break in downturn |
| 4 | EPS Growth | >15% | Company going somewhere |
| 5 | PEG Ratio | <1.2 | Fair price for growth |
| 6 | Market Cap | >$5B | Proven + stable |

### Quality Signals (Bullish)
- Insider buying at lows (CEO buying = strong signal)
- Revenue growth accelerating
- Price/EPS divergence = accumulation zone
- "Markets in Turmoil" = contrarian buy signal

### Red Flags
- 52W low = WARNING (could be dying, not bottom)
- "It's low" = NOT a thesis — need specific "why"
- High Debt/Equity (>35%) = avoid

---

## PART 3: Market Context

### Trend Indicators
- **200-day MA** = major trend line
  - Break below + retest = bearish
  - Hold above = bullish
- **S&P 500 in uptrend** = favor longs

### Volatility Definitions
| Drop | Term |
|------|------|
| -5% | Pullback (normal) |
| -10% | Healthy correction |
| -15% | Correction |
| -20% | Bear market |
| -30%+ | Crash |

### Historical Stats
- **Bull market avg:** +254%
- **Bear market avg:** -31%
- **S&P 500 avg:** 11% yearly (40-year)
- **Stocks beat housing 4:1 long-term**

---

## PART 4: Volume Analysis (CRITICAL)

### Why Volume Matters
- **Price can be manipulated** — Hedge funds can push price up/down temporarily
- **Volume CANNOT be manipulated** — Shows real conviction, institutional activity
- Volume = the truth behind the price action

### Volume Rules
| Signal | Meaning | Action |
|--------|---------|--------|
| Volume up + price up | Strong trend | Confirmed move |
| Volume down + price up | Weak trend | Reversal likely |
| Small candle + big volume | Reversal | Watch for change |
| Volume spike at key level | Institutional | Entry opportunity |
| Divergence (lower highs + lower volume) | Reversal | Prepare for move |

### Volume Thresholds
| Ratio | Signal |
|-------|--------|
| >2x | Strong institutional buying |
| 1.5-2x | Moderate conviction |
| 1.0-1.5x | Normal activity |
| <1.0x | Weak/no conviction |

### SMC Volume Checklist
- [ ] Volume >1x when entering (confirms move)
- [ ] Volume spike at liquidity grab (institutions taking it)
- [ ] Higher volume on breakout than pullback (sustained)

**No volume = No trade** — Don't enter without confirming volume.

---

### Critical Volume Insight

> Top 3% traders (hedge funds) trade LONG with capital. They push price DOWN to accumulate, then ride UP.

**What this means:**
- **Price down + Volume UP = Likely ACCUMULATION** (not panic selling)
- Don't assume high volume on down = selling
- Smart money takes liquidity, then pushes price up
- Look for the FVG created on the way down — that's where they'll enter

**Pattern:**
1. Price drops (liquidity sweep)
2. High volume on drop = institutions buying
3. FVG created
4. Price returns to FVG = ENTRY
5. **Take profit +12% and exit** — don't ride their long position

---

### Volume + Price Action Strategy (Wyckoff Method)

**The core question:** "Is volume decreasing, increasing, or spiking?"

| Pattern | Meaning | Signal |
|---------|---------|--------|
| Big candle + Big volume | Healthy | ✅ Continue |
| Small candle + Big volume | Absorption (seller absorbing buyers) | ❌ Price will fall |
| Price up + Low volume | No supply (sellers absent) | ✅ Easy push |
| Price up + Volume up | Uptrend | ✅ Bullish |
| Price down + Volume down | Sellers weakening | ✅ Bottom forming |
| Price up + Volume down | Weakness | ❌ Price about to fall |
| Strong downtrend + decreasing volume | Selling exhausted | ✅ Bottom likely |

**Application:**
- Before any entry, ask: What is volume doing vs price?
- If price up + volume down = weakness (don't enter)
- If price down + volume down = bottom forming (look for bounce)
- If price up + volume up = confirmed (OK to enter)

---

### TradingLab Volume Checklist

🔳 **Volume trending up or down?** (volume up = strong trend) (volume down = weak trend)
🔳 **Candle big or small? Volume big or small?** (small candle + lots of volume = potential reversal)
🔳 **Are there any volume spikes at key levels?**
🔳 **Is there divergence?** (If there are lower highs on the volume, a reversal is likely to happen)

**Apply this checklist to every entry before trading.**

---

## PART 5: Position Sizing & Risk

### Rules
| Rule | Value |
|------|-------|
| Max Position | **25%** of capital |
| Max Positions | **1-2 stocks** (Phase 1: $0-200) - concentrate for bigger profits |
| Phase 2 ($200-1000) | 3-4 positions |
| Phase 3 ($1000+) | 5 positions (diversify)
| Stop Loss (SMC) | Below liquidity |
| Stop Loss (fallback) | -7% |
| Take Profit (SMC) | -2 Fib extension OR +20%/$70 whichever first |
| Take Profit (fallback) | +12% |
| Cash Reserve | 20% always |

### Confidence-Based Sizing
- 90-100% confidence = full position
- Less confident = smaller position
- **No catalyst = NO entry**

---

## Exit Strategy (MUST FOLLOW)

1. **Break even** → Exit if price hits entry (no loss)
2. **Take 50% at target** → Lock in half profit
3. **Let remainder ride** → Capture more upside

**Example:**
- Target: +12%
- At +6%: Sell 50% position → risk now ZERO
- Remaining 50% can continue to +12%, +20%, etc.

---

## PART 6: The Workflow

### Step 1: Find Candidates
- Run scanner: `node scripts/smc-scan.js` (finds early-stage setups)
- Or scan manually: find stocks 0-5% bounce, <20% range

### Step 2: Check News (MUST HAVE CATALYST)
- **Run Finnhub news:** `node scripts/get-stock-news.js`
- **Web search** for catalyst
- No news = no trade

### Step 3: Research
- **Fetch price:** `node scripts/get-stock-price.js SYMBOL`
- Check fundamentals (P/E, growth, debt)
- Verify 52W not dying

### Step 4: Chart Analysis (SMC)
- Show chart: Daily for trend, 4hr for entry
- Identify: Liquidity → Sweep → CHOCH → FVG
- Calculate TP/SL

### Step 5: Execute
- Summarize: Stock + price + shares + thesis + catalyst
- Captain executes on Robinhood
- Log position

### Step 6: Monitor
- Set alerts for TP/SL
- Track in positions.md
- Review after exit

---

## Piggybank Rule

**5% of ALL trade profits → QQQ** (rounded down to nearest dollar)
- ONLY deposit if profit ≥ $1
- QQQ = long-term AI/Nasdaq-100 hold
- Separate from SMC trades

---

## Current Positions (May 8, 2026)

| Symbol | Shares | Entry | SL | TP | Current | Notes |
|--------|--------|-------|-----|-----|---------|-------|
| NVDA | 0.05 | $198.31 | $184.43 | $222.11 | ~$215 | David's pick |
| NIO | 1 | $5.94 | $5.47 | $6.65 | ~$5.90 | SMC setup ✅ |

**Capital:** ~$55 | **Buying Power:** ~$38.70

### Capital Tracking Protocol (MUST FOLLOW)

**On EVERY trade (buy or sell):**
1. Get current prices for all positions
2. Calculate: cash + (shares × price) for each
3. Sum total = current capital
4. Update positions.md immediately

**Formula:**
```
Total = Cash + (NVDA_shares × NVDA_price) + (NIO_shares × NIO_price) + ...
Buying Power = Total - Invested_in_positions
```

**If you can't fetch prices, ask Captain for current values.**

**NEVER let capital go more than 24h without recalculation.**

---

## Trade Execution Protocol

1. **I recommend** → Stock + position + entry/sell/stop targets
2. **Captain executes** → Places order on Robinhood
3. **I log** → positions.md, trade-log.md

**Vyse NEVER executes trades — Captain executes**

---

## Stock Types to AVOID

| # | Type | Examples | Why Avoid |
|---|------|----------|----------|
| 1 | **Inverse ETFs** | TZA, SQQQ, DUST, JDST | Move opposite to market, confusing, bleed over time |
| 2 | **Leveraged ETFs** | TNA, UVXY, SVOL | Day-trade only, lose value long-term (USE WITH CAUTION - learn more first) |
| 3 | **ADR** | NIO, BABA, TS | Currency risk, delisting risk, foreign regulation |
| 4 | **Penny Stocks** | <$1 | High manipulation, low liquidity, can go to zero |
| 5 | **Pink Sheet** | OTC markets | Unregulated, fraud risk |
| 6 | **Recent IPO** | <1 year old | No track record, lock-up dumps |
| 7 | **Warrants** | Stock warrants | Complex, high dilution |
| 8 | **Options** | Calls/Puts | Time decay, can go to zero |
| 9 | **Crypto questionables** | Many crypto stocks | Extreme volatility |

**DO NOT INVEST IN TYPES 1-3 AS A RULE.**

---

## Key Learnings (From TradingLab + Real Trades)

| Date | Lesson |
|------|--------|
| 2026-05-08 | Scanner bounce calculation bug: Used 20-day swing low instead of 52W low - ALL candidates were actually already run up |
| 2026-05-08 | GILD lesson: Price down + high volume = accumulation (smart money buying), not distribution |
| 2026-05-08 | Stale scanner data useful for pattern learning - compare yesterday's setups to today's moves |
| 2026-05-07 | Catalyst = 80% win rate, no catalyst = 0% |
| 2026-05-07 | 52W low = warning, not always bottom |
| 2026-05-07 | "It's low" isn't a thesis — need "why" |
| 2026-05-07 | Early stage (0-5% bounce) > late (already bounced) |
| 2026-05-07 | Emotional discipline > prediction |
| 2026-05-07 | Insider buying at lows = strong bullish signal |
| 2026-05-07 | Higher timeframe levels = stronger reactions |
| 2026-05-07 | Don't fight the trend until it breaks |

---

## TRADING TOOLS (When to Use Each)

### Tool Workflow

| Phase | Tool | What It Does |
|-------|------|---------------|
| **1. Find Candidates** | `smc-scan.js` | Scans 215 stocks, finds V1/V2/V3 patterns with volume |
| **2. Get Price** | `get-stock-price.js` | Current price, change, volume, 52W high/low |
| **3. Find Catalyst** | `web_search` | Search for news, earnings, contracts |
| **4. Get Fundamentals** | `web_fetch` (CNBC) | P/E, debt, earnings date, dividend |
| **5. Analyze Chart** | `browser` → TradingView | Full SMC 6-step analysis |

### Tool Commands

```bash
# 1. Find candidates (run first)
node scripts/smc-scan.js

# 2. Get price for specific stock
node scripts/get-stock-price.js SYMBOL

# 3. Get full fundamentals
# Use web_fetch: https://www.cnbc.com/quotes/SYMBOL

# 4. Search for catalyst
web_search: "SYMBOL stock news catalyst May 2026"

# 5. Open TradingView chart
browser → https://www.tradingview.com/chart/?symbol=SYMBOL
```

### When to Use Each

| Situation | Action |
|-----------|--------|
| Need candidates | Run `smc-scan.js` |
| Got a candidate | Run `get-stock-price.js` |
| Need catalyst | Use `web_search` |
| Need P/E, earnings | Use `web_fetch` on CNBC |
| Need chart analysis | Open TradingView with browser |

---

## Scanner Commands

```bash
# SMC Scanner (finds early-stage candidates)
node scripts/smc-scan.js

# Get stock price
node scripts/get-stock-price.js SYMBOL

# Get news
node scripts/get-stock-news.js
```

---

## Trigger Phrases

- "stock", "trade", "buy", "sell"
- "position", "price", "alert"
- "stop loss", "target", "chart"

---

## Key Files

| File | Purpose |
|------|---------|
| `kb/stocks/positions.md` | Current positions |
| `kb/stocks/trade-log.md` | Trade history |
| `kb/stocks/trading-strategy.md` | Full strategy doc |
| `scripts/smc-scan.js` | SMC candidate scanner |
| `scripts/get-stock-price.js` | Price fetcher |
| `scripts/get-stock-news.js` | News fetcher |

---

## Lessons Learned (From Trading)

| Date | Lesson | Source |
|------|--------|--------|
| 2026-05-11 | "Price low" is NOT a thesis - need specific SMC setup | LCID fail |
| 2026-05-11 | MUST confirm CHOCH before entry - no exceptions | SOFI wait |
| 2026-05-11 | Without chart analysis = guessing, not trading | Analysis fail |
| 2026-05-11 | SMC 6 steps ALL must complete before recommending | Process fix |

---

## References

- github - Persistence
- learning - Self-improvement pattern
- kb/stocks/robinhood-platform.md - Robinhood knowledge
- kb/stocks/trading-strategy.md - Full TradingLab strategy