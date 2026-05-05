# Trading Strategy Library

*Strategies for maximizing profits while managing risk - Built May 2026*

---

## Core Philosophy

- **Goal:** Maximize daily profits
- **Risk:** Accept small losses, let winners run
- **Account:** Cash (unlimited day trades)
- **Capital:** $51 (small - need high-turnover strategies)

---

## Strategy 1: Momentum Trading

**When to use:** Stock moving fast with volume, strong directional movement

### How to Identify
- [ ] Price moved >5% today
- [ ] Volume >2x average
- [ ] News catalyst (earnings, FDA, contract)
- [ ] Price breaking through recent high

### Entry Rules
- Enter on pullback to support (don't chase)
- Wait for consolidation (15-30 min)
- Confirm with volume

### Exit Rules
- **Take profit:** +5% (take partial), +12% (take more), +20% (let run)
- **Stop loss:** -7% (hard stop)
- **Trail stop:** After +10%, move stop to breakeven

### Example
WGS at $35.94 → If momentum strong → target $40 (+11%)

---

## Strategy 2: Scalping

**When to use:** Small price movements, low volatility, quick flips

### How to Identify
- [ ] Low volatility day
- [ ] Stock trading in tight range
- [ ] Small cap, cheap stock
- [ ] Quick news catalyst

### Entry Rules
- Buy at bottom of range
- Sell at top of range
- Set limit orders at range boundaries

### Exit Rules
- **Take profit:** +1-3%
- **Stop loss:** -2% (tighter for scalps)
- Move fast - same day exit

### Example
Stock bouncing $0.50-0.55 → Buy at $0.50, sell at $0.52 (+4%)

---

## Strategy 3: Swing Trading

**When to use:** Good setup, holding for days/weeks

### How to Identify
- [ ] Strong 52-week data (not dying)
- [ ] Price far from 52W high
- [ ] Bull case identified
- [ ] Good analytics rating

### Entry Rules
- Enter on confirmed breakout or support bounce
- Position for multi-day hold

### Exit Rules
- **Take profit:** +12% standard, +20% if strong
- **Stop loss:** -7% (hold through small dips)
- **Time-based:** Exit after 5 days if no movement

### Example
NVDA bought at $198 → Hold for swing toward $222 (+12%)

---

## Strategy 4: Breakout Trading

**When to use:** Stock breaking resistance, high momentum

### How to Identify
- [ ] Price approaching 52-week high
- [ ] Consolidating before breakout
- [ ] Volume increasing
- [ ] Tight ranges before explosion

### Entry Rules
- Enter when price breaks above consolidation with volume
- Use market order (don't miss the move)
- Enter early in day for best execution

### Exit Rules
- **Take profit:** First target = breakout point + 10%
- **Stop loss:** -7% OR just below breakout point (whichever tighter)
- **Scale out:** Sell half at first target, let rest run

### Example
Stock at $50 (52W high at $55) → Breakout above $51 → Target $60

---

## Strategy Selection Matrix

| Condition | Strategy |
|-----------|----------|
| Big mover today + volume | Momentum |
| Quiet market / range bound | Scalp |
| Good thesis / holding | Swing |
| Breaking resistance | Breakout |

---

## Daily Checklist (Before Trading)

1. Check Big Movers → Any opportunities?
2. Check our watchlist → Any breakout setups?
3. Check our positions → Time to exit?
4. Check cash → Ready to deploy?

---

## Risk Management Summary

| Strategy | Max Risk | Target Win | Hold Time |
|----------|----------|------------|-----------|
| Momentum | -7% | +15%+ | Hours |
| Scalp | -2% | +1-3% | Minutes-Hours |
| Swing | -7% | +12-20% | Days |
| Breakout | -7% | +20%+ | Hours-Days |

---


## Position Sizing Rules (CRITICAL)

### Capital Allocation
| Total Capital | Max Per Position | Max Positions |
|--------------|------------------|---------------|
| $0-100 | 20% ($20 max) | 5 |
| $100-500 | 20% ($100 max) | 5 |
| $500+ | 25% | 5 |

### Diversification Requirements
1. **No single position >20%** of total capital (we broke this with WGS)
2. **Spread across sectors** - Don't put all in one sector
3. **Mix strategies** - Not all momentum or all swing
4. **Keep cash buffer** - Always have 10-20% in cash for opportunities

### Current Violation (WGS)
- WGS: $35.94 on $51 total = **70% of portfolio** ❌
- Should have been max: ~$10 (20%)

### Correct Sizing Example (with $51)
| Position | Amount | % of Capital |
|----------|--------|--------------|
| NVDA | $10.00 | 20% |
| WGS | $10.00 | 20% |
| Cash | $31.28 | 60% |

### Position Size Formula
```
max_position_size = min(total_capital × 0.20, cash_available) × 0.25 (if using margin)
```
For cash account: `position_size = total_capital × 0.20` (strict 20%)

### When CONFIDENT (90-100% deployed)
- Win ratio >60% on last 10 trades
- Strong thesis with research backing
- Clear catalyst (news, breakout, momentum)
- Risk/reward ratio >2:1

### When NOT CONFIDENT (50% deployed)
- Win ratio <50%
- Unclear thesis
- Market uncertain
- New strategy being tested

### Win/Loss Confidence Tracker
Track last 10 trades:
- Win ratio = wins / total trades
- If >60% wins → confident → deploy more
- If <50% wins → cautious → deploy less

---

## Key Rules

1. **Research first** → Only trade researched stocks
2. **One strategy at a time** → Don't mix signals
3. **Take partial profits** → Don't lose it all
4. **Stop fast** → -7% = accept and move on
5. **Let winners run** → Don't exit early on big moves

---

## Strategy 5: Crypto Momentum (24/7 Trading)

**When to use:** Crypto moving with volume, 24/7 opportunity

### How to Identify
- [ ] Price moved >10% in 24h
- [ ] Volume spike on news
- [ ] Breaking recent high
- [ ] BTC/ETH moving (altcoins follow)

### Entry Rules
- Enter on pullback after momentum确认
- Use smaller position (more volatile)

### Exit Rules
- **Take profit:** +15% (standard), +30% (strong momentum)
- **Stop loss:** -5% (tighter - more volatile)
- **Trail:** After +20%, move stop to breakeven

### Why Crypto Helps Us
- Trade 24/7 → Even when stock market closed
- High volatility → Bigger gains per trade
- DOGE already free → Pure profit potential
- Instant settlement → Faster re-investment

---

## Daily Routine (When to Check)

### Morning Check (9 AM ET)
- [ ] Check Big Movers for opportunities
- [ ] Check watchlist for breakout setups
- [ ] Check open positions → time to exit?
- [ ] Check cash → ready to deploy?

### Mid-Day Check (12 PM ET)
- [ ] Review morning positions
- [ ] Look for new momentum setups
- [ ] Check for news catalysts

### Afternoon Check (4 PM ET)
- [ ] Check close positions
- [ ] Prepare for after-hours
- [ ] Review day trades

### Evening/Overnight (8 PM ET)
- [ ] Check 24-hour market opportunities
- [ ] Check crypto (24/7)
- [ ] Prepare for next day

### Key Check Times
| Time (ET) | What | Why |
|-----------|------|-----|
| 9 AM | Big Movers + positions | Market open opportunities |
| 12 PM | Mid-day momentum | New setups emerge |
| 4 PM | Close review | End of day decisions |
| 8 PM | 24-hour + crypto | Overnight opportunities |

---

## Entry Rules Summary

Before entering ANY trade:
1. [ ] Have a thesis (why this stock?)
2. [ ] Identify strategy (momentum/scalp/swing/breakout)
3. [ ] Check entry point (pullback vs breakout)
4. [ ] Set stop loss (-7%, crypto -5%)
5. [ ] Set target (+12%, crypto +15%)
6. [ ] Position size ≤20% of capital

---

## Exit Rules Summary

Exit when:
1. **Stop hit** → -7% → Accept loss, move on
2. **Target hit** → +12% → Take partial, let rest run
3. **New info** → Thesis changed → Exit
4. **Time expiry** → Held 5+ days, no movement → Exit
5. **Better opportunity** → Move capital to better trade

---

## News Sources

| Source | What For | Access |
|--------|----------|--------|
| Robinhood Big Movers | Today's movers | App |
| Robinhood Watchlist | Watched stocks | App |
| web_search | Breaking news | Browser |
| Stock on 24-hour list | Extended hours | App |
| Crypto (24/7) | Crypto catalysts | App |

---

## Volatility Indicators

| Indicator | What It Means | Action |
|-----------|---------------|--------|
| Volume >2x avg | Strong interest | Look for entry |
| Price >5% today | Momentum | Use momentum strategy |
| Breaking 52W high | Breakout | Use breakout strategy |
| News catalyst | Driver identified | Research thesis |
| Tight range | Building pressure | Wait for breakout |

---

## Strategy 6: 24-Hour Trading (News Reaction)

**When to use:** Breaking news overnight, pre-market moves, after-hours opportunities

### How to Identify
- [ ] Major news after market close (earnings, FDA, deals)
- [ ] Pre-market gap analysis
- [ ] Overnight sentiment from crypto/Asia markets
- [ ] Stock on 24 Hour Market list

### Entry Rules
- Check 24 Hour Market list for availability
- Use limit orders (market not available)
- Set limit within price bands
- Aim for entry before market open

### Exit Rules
- **Take profit:** +8-12% (similar to regular)
- **Stop loss:** -7% (same as regular trading)
- **Monitor overnight** → Adjust before market opens

### Why It Helps Us
- **React to news same day** → Don't wait for market open
- **More trading windows** → 24/5 opportunity
- **Pre-market advantage** → Get position before open

### Best Times for 24-Hour
- Sunday 8 PM ET → Week starts
- Early morning (12-6 AM ET) → Quiet, less competition
- After big news events → Reaction trades

---

*To be updated as we learn which strategies work best*