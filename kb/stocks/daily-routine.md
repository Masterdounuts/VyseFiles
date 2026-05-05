# Daily Trading Routine

*Day-to-day workflow for Vyse + David - Built May 2026*

---

## Overview

| Phase | Time (PT) | What | Output |
|-------|-----------|------|--------|
| **Morning** | 9 AM | Market open check | Opportunities identified |
| **Mid-Day** | 12 PM | Position review | Exit/hold decisions |
| **Afternoon** | 4 PM | End-of-day review | Prepare tomorrow |
| **Evening** | 8 PM | Overnight prep | 24-hour + crypto |

---

## Morning Routine (9 AM PT)

### Step 1: Check Market Status
```bash
node scripts/expand-finnhub.js status
```
→ Is market open? What's the session?

### Step 2: Check Breaking News
```bash
node scripts/get-stock-news.js
```
→ Find catalysts (earnings, FDA, contracts, M&A)
→ Flag 3-5 stocks with strongest news

### Step 3: Quick Quote Scan
For each news stock:
```bash
node scripts/expand-finnhub.js quote SYMBOL
```
→ Get current price, change %, high/low

### Step 4: Research Candidates
For top 1-2:
```bash
node scripts/expand-finnhub.js profile SYMBOL
node scripts/get-stock-price.js SYMBOL
```
→ Verify: Market cap, 52W data, volume

### Step 5: Recommend to David
→ "Here's today's opportunity: [SYMBOL]"
→ Entry price, stop loss, target
→ Position size (≤20% of capital)

---

## Mid-Day Routine (12 PM PT)

### Step 1: Check Open Positions
```bash
node scripts/get-stock-price.js NVDA WGS
```
→ Current P/L for each

### Step 2: Check for Exit Signals
- Stop hit? → Exit
- Target hit? → Take partial
- Thesis changed? → Exit
- Better opportunity? → Move capital

### Step 3: New Opportunities?
→ Any new news since morning?
→ Check momentum

### Step 4: Report to David
→ "NVDA: +2% - holding"
→ "WGS: -5% - still safe"
→ "New opportunity: [SYMBOL]"

---

## Afternoon Routine (4 PM PT)

### Step 1: Final Position Check
```bash
node scripts/get-stock-price.js [open positions]
```
→ End of day P/L

### Step 2: Prepare After-Hours
→ Which positions might move overnight?
→ Set up 24-hour orders if needed

### Step 3: End of Day Report
→ Summary: What's open, what's closed
→ Tomorrow's watchlist

---

## Evening Routine (8 PM PT)

### Step 1: Overnight News Check
```bash
node scripts/get-stock-news.js
```
→ Any breaking news for tomorrow?

### Step 2: 24-Hour Market Prep
→ Check 24-hour market stocks
→ Set limit orders for tomorrow

### Step 3: Crypto Check (24/7)
→ Crypto doesn't sleep
→ Check if any positions moving

### Step 4: Next Day Prep
→ Top 3 candidates for tomorrow
→ Research thesis ready
→ Cash ready to deploy

---

## Trade Execution Protocol

### When I Find an Opportunity:

1. **Analyze** → Quote + Profile + 52W
2. **Calculate** → Entry, Stop, Target
3. **Recommend** → Send to David:
   ```
   BUY [SYMBOL]
   Entry: $XX.XX
   Stop: $XX.XX (-7%)
   Target: $XX.XX (+12%)
   Size: $XX (20% of capital)
   Thesis: [why]
   ```

4. **David Executes** → Robinhood

5. **I Log** → Update positions.md + win-loss-tracker.md

---

## End of Day Summary (Auto-Generated)

Each day, I generate:

| Metric | Value |
|--------|-------|
| New opportunities found | X |
| Trades executed | X |
| Open positions | X |
| Daily P/L | $X |
| Win ratio | X% |

---

## Weekly Review

Every week (Sunday night):
- Review all trades
- Update win/loss ratio
- Adjust confidence level
- Refine strategies

---

*This routine maximizes daily profit opportunities using Finnhub + Yahoo Finance APIs*