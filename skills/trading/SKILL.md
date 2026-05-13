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

## 🎯 STOP VS ENTRY (CRITICAL)

*This is the foundation of sniper trading*

### The Difference

| | Stop | Entry |
|---|------|-------|
| **What** | Price level where we were WRONG | Price where ALL 5 checks passed |
| **Use** | Feedback indicator | Decision point |
| **Action** | REFLECT on why analysis failed | This is where we decide to buy |
| **Meaning** | "My analysis failed" | "My data says this will work" |

### The Mindset

```
STOP = "I was wrong about this trade"
      → Fix the strategy/analysis
      → Don't just "manage the loss"
      
ENTRY = "All 5 checks passed"
       → This is my sniper shot
       → I expect to hit target
```

### If We Hit The Stop

| Old Way | New Way |
|---------|---------|
| "Cut loss and move on" | "Why did my analysis fail?" |
| Hope for recovery | Check: Did I run all 5 checks? |
| Emotionally attached | Cold data reflection |

**Stop = Strategy feedback, not exit signal.**

---

## ✅ THE 5 ENTRY CHECKS (MUST ALL PASS)

*For EVERY trade, ALL of these must be true:*

### 1. BIG TRADER CHECK (MUST PASS)
```
Run: node scripts/big-trader-detector.js SYMBOL

✅ PASS if:
   - Big trader P/L is + (they'll pump to exit)
   - OR Big trader P/L is < -3% (panic motivation)

❌ FAIL if:
   - Big trader P/L is between 0% and -3% (stuck)
   - No clear big trader activity
```

### 2. TIMELINE CHECK (MUST PASS)
```
✅ PASS if:
   - Timeline to target < trade type max
   - Crypto: < 24 hours
   - Intraday: < same day
   - Day-to-Day: < 2 days

❌ FAIL if:
   - Timeline unclear or too long
```

### 3. SUPPORT CHECK (MUST PASS)
```
✅ PASS if:
   - Support tested 3+ times
   - Clear bounce history

❌ FAIL if:
   - Support never tested
   - First time at level
```

### 4. ACCUMULATION CHECK (MUST PASS)
```
✅ PASS if:
   - High volume + small candle = absorbing
   - Big traders loading up

❌ FAIL if:
   - Distribution (big traders selling)
   - Low volume moves
```

### 5. CAPITAL ADEQUACY (MUST PASS)
```
✅ PASS if:
   - Crypto: Min $5 position (cover fees)
   - Stocks: Can afford at least 1 share
```

---

**ALL 5 MUST PASS = ENTER**
**ANY 1 FAILS = DON'T ENTER**

---

## 🎯 STOCK ANALYSIS PRIORITY (CRITICAL)

*For stocks - crypto works differently*

### Priority Order (MUST FOLLOW)

**1. BIG TRADER DETECTION (FIRST)**
- Run: `node scripts/big-trader-detector.js SYMBOL`
- Find their entries (where they absorbed positions)
- Find their P/L (are they in profit or loss?)
- Find their targets (where price is heading)
- Find their supports (accumulation zones)
- Find their stops (recent lows)
- **KEY INSIGHT:** High volume + small candle = they're absorbing (building position)
- **KEY INSIGHT:** Small volume + big candle = manipulation (pump/dump)

**2. THEN check:**
- 52-week rule (<80%)
- RSI (oversold = fear maximized)
- Support history (how many times bounced?)

### Why Priority Matters
- Big traders move price with LOW volume
- Retail moves price with HIGH volume
- Finding their positions = predicting the move
- Everything else is secondary validation

### The Big Trader Detector Script

```bash
node scripts/big-trader-detector.js MARA
node scripts/big-trader-detector.js RIVN
node scripts/big-trader-detector.js AMC
```

**Output shows:**
- Absorbing vs Distributing count
- Their avg entry price
- Their P/L (profit/loss)
- Support level
- Target level
- Trade setup (Entry, Stop, Target, R/R)
- Time estimate (how long to recover from support)

---

## ⏱️ INTRADAY ENTRY RULE (CRITICAL)

*For intraday trades - wait for the dust to settle*

### The Rule
1. **Wait 30 minutes** after market open (6:30 AM PT → 7:00 AM PT)
2. **Watch for support** - buy near big trader accumulation zones
3. **NEVER buy gap-ups** - wait for pullback to support

### Why This Works
- First 30 min = wild swings, retail overreaction
- After 30 min = true price action emerges
- Buying near support = tight stop, high R/R

### The Pattern to Avoid
```
❌ GAP-UP SPIKE: Buy at open → immediate dump
✅ SUPPORT BOUNCE: Wait for pullback → buy at support
```

---

## ⏱️ TIMELINE REQUIREMENT (CRITICAL)

*Every trade MUST have a timeline estimate BEFORE entering*

### Timeline by Trade Type

| Trade Type | Max Timeline | Example |
|------------|---------------|----------|
| **Mini (Crypto)** | 24 hours | 30 min - 24 hours |
| **Intraday** | Same day | 6:30 AM - 12:30 PM PT |
| **Day-to-Day** | 1-2 days | Enter at close, exit next day |
| **Piggybank** | Weeks+ | Long-term hold |

### How to Calculate Timeline

1. **Find support** - Recent lows (where price bounced)
2. **Find target** - Recent highs / big trader targets
3. **Analyze historical bounces** - Get hourly data, find similar bounces
4. **Calculate average time** - How long did previous bounces take?
5. **Verify** - Does timeline match trade type?

### The Timeline Test

**Before entering ANY trade:**
- Calculate expected timeline to profit
- If timeline doesn't match trade type → NOT A GOOD CANDIDATE

| Trade Type | Timeline Must Be... | Pass/Fail |
|------------|---------------------|-----------|
| Crypto | ≤24 hours | Must pass |
| Intraday | Same day | Must pass |
| Day-to-Day | 1-2 days | Must pass |
| Piggybank | Weeks+ | Must pass |

### Example: AMC
```
Support: $1.35 | Target: $1.61
Historical bounces: 8-18 hours avg
Timeline: 8-18 hours
→ Fits Day-to-Day (1-2 days) → PASS ✅
```

### Example: WLFI (Previously Failed)
```
Support: $0.065 | Target: $0.07587
Timeline: Days to weeks (no clear bounce pattern)
→ Does NOT fit Crypto (≤24 hours) → FAIL ❌
→ But we hold because: big traders in profit (+5%)
```

---

### NO TIMELINE = NO TRADE

*Every candidate must pass the timeline test before entering.*

---

## 🧠 HUMAN BEHAVIOR FRAMEWORK

*Every market is controlled by humans. Humans have predictable behaviors.*

### The Cycle
```
FOMO → FEAR → PANIC → EXHAUSTION → RECOVERY
(buy)   (sell) (sell more) (done)   (bounce)
```

### How to Read It

| Phase | Price | Volume | Signal |
|-------|-------|--------|--------|
| **FOMO** | Rising | HIGH | Top forming |
| **FEAR** | Falling | HIGH | Keep falling |
| **PANIC** | Falling fast | VERY HIGH | Don't catch knife |
| **EXHAUSTION** | Flat/Low | LOW | Bottom forming 🟢 |
| **RECOVERY** | Rising | INCREASING | Bounce starting |

### Key Insight
- **Volume tells the truth** - High volume = emotion (FOMO or panic)
- **Low volume = exhaustion** - No more sellers = potential bottom
- **Self-preservation** - Traders protect gains, cut losses

### Applying to Positions

| Position | Phase | Signal |
|----------|-------|--------|
| AMC | FEAR → EXHAUSTION | 🟢 Bottom forming (RSI oversold) |
| DOGE | CONSOLIDATION | 🟡 Wait for volume |
| WLFI | EXHAUSTION | 🟢 Near support |

---

## ⏱️ TIME ESTIMATION

*How long to reach target from support*

### Method
1. Get hourly data for last 30 days
2. Find bounces from support (similar price)
3. Calculate average recovery time
4. Project to current target

### Example: AMC
```
Support: $1.35 (held 6x today)
Current: $1.38
Target:  $1.61

Historical bounces: 2-18 hours
Average: ~9 hours

→ Estimated time to target: 8-18 hours
```

### Why Time Matters
- Big traders underwater = faster pump (they want out)
- Support holding multiple times = strong bounce
- Use time to set expectations, not guarantees

---

## 📊 POSITION ANALYSIS FRAMEWORK

*For evaluating current positions*

### The Check List

For every position, know:
1. **Support level** - Where price bounced before
2. **Times at support** - More = stronger
3. **Big trader P/L** - Underwater = may pump to exit
4. **Our entry vs their entry** - Near = good
5. **Timeline to target** - From historical bounces

### Example: AMC Analysis
```
Support: $1.35 | Held: 6 times today
Big traders: -10.1% (underwater)
Their entry: $1.52 | Our entry: $1.44
Timeline: 8-18 hours
→ VERDICT: Hold - they may pump to exit
```

### Example: WLFI Analysis
```
Support: $0.065 | Held: multiple times
Big traders: +5.0% (in profit)
All moves: Absorbing (building)
Timeline: Days to weeks (less defined)
→ VERDICT: Hold - big traders in profit
```

### Position Audit Questions

| Question | Why It Matters |
|----------|----------------|
| How many times hit support? | More = stronger defense |
| What's big trader P/L? | Underwater = pump motivation |
| How far to target? | Reward vs risk |
| What's the timeline? | Does it match trade type? |

---

## 📋 POSITION AUDIT CHECKLIST

*Run before deciding to hold/sell*

```
Current price: ____
Support level: ____
Times at support: ____
Big trader P/L: ____
Timeline to target: ____
→ HOLD / SELL / MOVE STOP
```

---

## 🎯 HOW TO FIND NEW CANDIDATES

### Step 1: Check Human Behavior Phase

| Phase | RSI | Volume | Price | Action |
|-------|-----|--------|-------|--------|
| FOMO | >70 | HIGH | Rising | SELL (top) |
| FEAR | <40 | HIGH | Falling | WAIT |
| PANIC | <30 | V.HIGH | Crashing | DON'T BUY |
| EXHAUSTION | <30 | LOW | Flat | BUY 🟢 |
| RECOVERY | >50 | Rising | Bounce | BUY EARLY 🟢 |

### Step 2: Scan by Trading Mode

**MINI (Crypto - $1, 15-30 min)**
- Use 5-min data
- Look for: VOLUME SPIKE + price moving
- Exit: 15-30 min

**INTRADAY (Stocks, same day)**
- Enter: 6:30-9:30 AM PT
- Need: Accumulation (price ↓ + volume ↑)
- Exit: By 12:30 PM PT

**DAY-TO-DAY (Swing)**
- Buy at close, sell next close
- 52-week rule: below 80% of range
- Target +12%, Stop -7%

### Step 3: Volume Analysis (The Truth)

| Volume | Price | Signal |
|--------|-------|--------|
| HIGH | Rising | FOMO (sell) |
| HIGH | Falling | PANIC (wait) |
| LOW | Flat | EXHAUSTION (buy) |
| INCREASING | Rising | RECOVERY (confirm)

### Script for Analysis
```bash
node scripts/indicators.js SYMBOL  # RSI shows fear level
node scripts/mini-scanner.js       # Crypto setups
node scripts/intraday-scanner.js   # Stock setups
```

---

## 📚 CASE STUDIES - Our Positions

### Our Positions Analyzed (May 12)

| Position | Entry | Range % | Verdict | Why |
|----------|-------|---------|---------|-----|
| AMC | $1.44 | 80%+ | ❌ BAD | FOMO bought, broke 52-week rule |
| DOGE | $0.112 | 70% | 🟡 MEDIOCRE | No clear signal |
| WLFI | $0.069 | 44% | ✅ GOOD | Bought at bottom of range |

### What We Learned

**✅ WLFI = GOOD**
- Bought at 44% of range (near bottom)
- Waited for EXHAUSTION phase
- Correct human behavior

**❌ AMC = BAD**
- Bought at 80%+ of range (expensive)
- FOMO bought the peak
- Ignored 52-week rule
- Wrong human behavior phase

**🟡 DOGE = MEDIOCRE**
- No clear signal
- Crypto was consolidating

### Rules to Remember

1. **NEVER buy above 80% of 52-week range**
2. **Wait for EXHAUSTION (low volume + flat)** to buy
3. **FOMO buying = usually wrong time**
4. **Best entries = near bottom of range**

---

## 🚨 CRITICAL: Pre-Market Strategy (MOST IMPORTANT)

### What Works (Based on May 11 Data)
| Strategy | Result |
|----------|--------|
| Pre-market big movers (>3%) | ✅ KEPT RUNNING (+10% all day) |
| Bottom-fishing / accumulation | ❌ FAILED (kept dropping) |

---

## 🎯 CORE STRATEGY - What We're Actually Doing

### The Real Edge:
- **Big traders manipulate PRICE but NOT volume**
- Find stocks **pushed DOWN** with **volume UP** = smart money buying
- Ride the bounce back up

### Scanner Priority (v6):
| Priority | Signal | Meaning |
|----------|--------|---------|
| **1st** | ACCUMULATION | Price 📉 + Volume 📈 = Smart money buying ✅ |
| **2nd** | V3_BOTTOM | Price 📉 + Near 52W low = Potential bounce |
| **3rd** | MOMENTUM | Stocks already running (chase carefully) |

### The Filter:
- **NEVER** buy above 80% of 52-week range
- Look for bottom 40% of range (room to run)

---

## ⏰ Trading Timeframes - Three Types

### 1. MINI TRADING (Crypto/Weekend)
| Rule | Detail |
|------|--------|
| **When** | Any time, especially weekends when market closed |
| **Min Profit** | 10% of position OR $0.10 minimum (whichever higher) |
| **Reinvest** | Profit goes straight back into mini trading |
| **Settlement** | Instant (but spread fee to withdraw profits) |
| **Examples** | DOGE, WLFI, crypto plays |

> **⚠️ Robinhood Crypto Fee:** 0.85% (under $50K volume)
> - Target = Entry × 1.10 (10% profit accounts for fee)
> - See `kb/stocks/crypto-profits.md` for full profit rules

### 2. INTRADAY TRADING (US Stocks - Same Day)
| Rule | Detail |
|------|--------|
| **When** | 6:30am - 12:30pm PT (market 9:30am-1pm ET) |
| **Premarket** | Check 15min/30min view for same-day accumulation |
| **Enter** | 6:30am at market open |
| **Exit** | By 12:30pm (latest, market closes 1pm PT) |
| **Settlement** | T+1 - profit available NEXT day |
| **Same day** | Profit in same trading day |

### 3. DAY-TO-DAY TRADING (Swing)
| Rule | Detail |
|------|--------|
| **When** | Missed intraday entry OR setup needs more time |
| **Enter** | Anytime today |
| **Exit** | Tomorrow or when target hit |
| **Settlement** | T+1 - profit available next day |
| **Profit** | 1-2 days to realize (T+1 settlement) |

---


## 🎯 CORE STRATEGY - What We're Actually Doing

### The Pattern
1. **QS** pre-market +9.7% → ended +9.95%
2. **MARA** pre-market +4.3% → ended +6.18%
3. **LCID** pre-market -6% → ended -6%
4. **RIVN** pre-market down → stayed down

### Action Plan (Every Day)

#### Mini Trading (Anytime)
1. **Run:** `node scripts/mini-scanner.js`
2. Check crypto prices
3. **Profit target:** 10% of position OR $0.10 minimum (whichever higher)
   - Dynamic: Scales with portfolio size
   - Example: $1 position → $0.10 min profit | $10 position → $1.00 min profit
4. Exit when profit target hit → reinvest to mini
5. **Track profits:** Use `kb/stocks/crypto-profits.md` for logging wins
6. **Redistribute:** When profit captured, check if position still valid → find new if not

#### Intraday (Morning)
1. **6:00 AM PT** - Run `node scripts/intraday-scanner.js`
2. **6:10 AM PT** - Analyze accumulation signals
3. **6:15 AM PT** - Check premarket (15min/30min view) for same-day entries
4. **6:30 AM PT** - ENTER at market open
5. **12:30 PM PT** - EXIT same day → profit available next day (T+1 settlement)

#### Day-to-Day (Missed Morning)
1. **After 12:30pm** - Run `node scripts/daytoday-scanner.js`
2. Find accumulation for tomorrow's bounce
3. **Next Day** - Exit at target or end of day

### 📅 Today's Watch (2026-05-12)
- **AMC** - 17 shares @ $1.44, exit at 12:30pm PT
- **Strategy**: Buy at close, sell next day
- **Targets**: +12% ($1.61) / -7% ($1.34)

---

## ⚠️ CRITICAL: WAKE-UP PROTOCOL

### Every Morning:
1. **READ** `memory/HANDOFF.md` first
2. **RUN** scanner: `node scripts/premarket-scanner.js`
3. **CHECK** positions from HANDOFF.md
4. **UPDATE** HANDOFF.md with results
5. **ALERT** David of opportunities

### Scripts Location:
```
~/.openclaw/workspace-vyse/scripts/
├── premarket-scanner.js  (6am PT)
├── intraday-scanner.js   (6:30am PT) 
├── daytoday-scanner.js   (after 12:30pm)
└── mini-scanner.js       (crypto anytime)
```

### Cron Jobs:
- `premarket-scan` - runs 6am PT weekdays
- Check: `openclaw cron list`

### What NOT to Do
- ❌ Don't chase stocks down (accumulation plays)
- ❌ Don't enter after 7am (missed the move)

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
| **3. VOLUME** | Check institutional activity | `volume-check.js` |
| **4. LEVELS** | Find support/resistance | `swing-levels.js` |
| **5. CATALYST** | Search for news/event | `web_search` |
| **6. FUNDAMENTALS** | Check P/E, debt, earnings | `web_fetch` (CNBC) |
| **7. CHART** | Visual confirmation of SMC steps | Browser → TradingView |
| **8. RECOMMEND** | Only if all 6 SMC steps complete | Present to David |

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

### 🎯 Big Trader Detection (CRITICAL)

*From David - the key to finding manipulation*

**The Insight:**
- HIGH volume + small price move = Retail (many participants)
- **LOW volume + BIG price move = BIG TRADER manipulating**

**How to Detect:**
1. Find sudden price moves (>$0.10 in 5 min)
2. Check if volume is LOW (<30% of average)
3. That's a big trader - they're absorbing or shorting

**What It Means:**
| Pattern | Meaning | Trade |
|---------|---------|------|
| Price DOWN + LOW vol | Big shorting | They're pushing down = will push UP later |
| Price UP + LOW vol | Big absorbing | They're holding = will dump later |

**The Strategy:**
1. Find their manipulation (low vol + big move)
2. Find their stops (recent lows, round numbers)
3. Enter slightly above their stop
4. Ride the wave when they push back

**How to Find Their Stops:**
- Recent lows
- Round numbers ($10, $15, $20)
- 52-week lows
- Enter $0.10 above = catch the ride up

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

### ACCUMULATION vs DISTRIBUTION (Key SMC Concepts)

| Phase | Price | Volume | Meaning |
|-------|-------|--------|---------|
| **ACCUMULATION** | ↓ Down | ↑ UP | Smart money buying (not panic) |
| **ACCUMULATION** | Bouncing | High | Institutions loading |
| **DISTRIBUTION** | ↑ Up | ↑ UP | Smart money selling |
| **DISTRIBUTION** | Crashing | High | Institutions dumping |

**Critical: Price down + Volume UP = ACCUMULATION** (smart money buying, not selling)

**Pattern to find:**
1. Price drops with high volume = accumulation zone
2. Look for FVG created on drop
3. Wait for price to return to FVG = ENTRY
4. Take profit +12%

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

## INTEGRATED WORKFLOW - SMC + Tools + Learning

**The foundation is SMC (Smart Money Concepts). Tools enhance and confirm.**

### Phase 1: SMC Strategy (Required Foundation)
| Step | What | Script |
|------|------|--------|
| 1. SCAN | Find candidates with volume + pattern | `smc-scan.js` |
| 2. FILTER | Get price + 52W range | `get-stock-price.js` |
| 3. VOLUME | Check institutional activity | `volume-check.js` |
| 4. LEVELS | Find support/resistance | `swing-levels.js` |
| 5. CATALYST | Search news/event | `web_search` |
| 6. FUNDAMENTALS | P/E, debt, earnings | `web_fetch` (CNBC) |
| 7. CHART | Visual confirmation | Browser → TradingView |
| 8. SETUP VALID? | All 6 SMC steps complete | THEN proceed to Phase 2 |

### Phase 2: Tools Confirmation (If SMC says BUY)
| Check | Tool | Command |
|-------|------|---------|
| **Indicators** | `indicators.js` | `node scripts/indicators.js SYMBOL` |
| **Patterns** | `pattern-recognizer.js` | `node scripts/pattern-recognizer.js SYMBOL` |
| **History** | `trade-learner.js` | `node scripts/trade-learner.js stats` |

### Phase 3: Execute + Learn
| Action | Tool | Command |
|--------|------|---------|
| **Enter Trade** | Manual | Based on Phases 1+2 |
| **Record** | `trade-learner.js` | `node scripts/trade-learner.js record SYMBOL <setup> <win|loss> <profit>` |
| **Add Lesson** | `trade-learner.js` | `node scripts/trade-learner.js lesson "<lesson>"` |

### The Complete Workflow

```bash
# === PHASE 1: SMC (Foundation) ===

# 1. Scan for candidates
node scripts/smc-scan.js
node scripts/intraday-scanner.js

# 2. Check specific stock
node scripts/get-stock-price.js SYMBOL
node scripts/volume-check.js SYMBOL

# 3. Verify SMC steps (all must complete)
# - Liquidity taken?
# - CHOCH confirmed?
# - FVG pullback happened?
# - Catalyst exists?

# IF SMC SETUP IS VALID → GO TO PHASE 2

# === PHASE 2: Tools Confirmation ===

# 4. Check indicators
node scripts/indicators.js SYMBOL
# Look for: RSI oversold, MACD bullish, price near lower Bollinger

# 5. Check patterns
node scripts/pattern-recognizer.js SYMBOL
# Look for: Similar historical setups went up

# 6. Check what worked before
node scripts/trade-learner.js stats

# IF ALL CONFIRM → ENTER TRADE

# === PHASE 3: Execute + Learn ===

# 7. Enter trade with stop/target
# 8. Exit trade
# 9. Record outcome
node scripts/trade-learner.js record SYMBOL "accumulation" win 2.89
node scripts/trade-learner.js record SYMBOL "bottom-fish" loss -1.05

# 10. Add lesson if any
node scripts/trade-learner.js lesson "Never chase stocks down"
```

### Tool Commands (Quick Reference)

```bash
# Scanning
node scripts/smc-scan.js              # SMC candidates
node scripts/intraday-scanner.js       # Intraday opportunities
node scripts/premarket-scanner.js     # Pre-market movers

# Analysis
node scripts/get-stock-price.js SYMBOL  # Price + 52W
node scripts/volume-check.js SYMBOL    # Volume analysis
node scripts/indicators.js SYMBOL       # RSI, MACD, Bollinger, etc
node scripts/pattern-recognizer.js SYMBOL # Find similar patterns

# Learning
node scripts/trade-learner.js stats              # Show all stats
node scripts/trade-learner.js record SYM setup W|L profit
node scripts/trade-learner.js lesson "text"       # Add lesson
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

- "stock", "trade", "buy", "sell", "trade"
- "position", "price", "alert", "analysis"
- "stop loss", "target", "chart", "SMC"
- "volume", "catalyst", "entry", "exit"

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
| `scripts/volume-check.js` | Volume analysis (institutional activity) |
| `scripts/swing-levels.js` | Support/resistance levels |

---

## Lessons Learned (From Trading)


| Date | Lesson | Source |
|------|--------|--------|
| 2026-05-11 | "Price low" is NOT a thesis - need specific SMC setup | LCID fail |
| 2026-05-11 | MUST confirm CHOCH before entry - no exceptions | SOFI wait |
| 2026-05-11 | Without chart analysis = guessing, not trading | Analysis fail |
| 2026-05-11 | SMC 6 steps ALL must complete before recommending | Process fix |
| 2026-05-11 | Used tools inconsistently - need workflow discipline | Today's fail |
| 2026-05-11 | Accumulation = price DOWN + volume UP (smart money) | Volume concept |
| 2026-05-11 | Need 8-step workflow: Scan→Price→Volume→Levels→Catalyst→Fundamentals→Chart→Recommend | Skill fix |
| 2026-05-11 | **FOCUS ON PRE-MARKET BIG MOVERS (>3%) - they keep running** | Today's win |
| 202-05-11 | Bottom-fishing/accumulation picks FAILED - don't chase bottoms | LCID/RIVN fail |
| 2026-05-11 | Enter at 6:30am PT (market open) - not after | Timing fix |
| 2026-05-11 | **NEVER buy stocks above 80% of 52-week range - buying at top = losses** | QCOM/MU/RIOT analysis |

---

## References

- github - Persistence
- learning - Self-improvement pattern
- kb/stocks/robinhood-platform.md - Robinhood knowledge
- kb/stocks/trading-strategy.md - Full TradingLab strategy