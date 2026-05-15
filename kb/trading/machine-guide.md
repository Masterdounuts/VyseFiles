# TRADING MACHINE GUIDE

*How to operate the bulletproof trading machine*

---

## DATA SOURCES (CRITICAL)

| Tool | Use For |
|------|---------|
| **Browser** | ✅ Stock DATA and PRICES - THIS IS OUR CRITICAL TOOL |
| **web_search** | ❌ Never for stock data - News/catalyst only |
| **APIs** | Crypto prices (CoinGecko) |

---

## Purpose

The machine exists to:
1. **Find** stock opportunities
2. **Analyze** them using SMC strategy
3. **Validate** each entry against rules
4. **Output** a standardized recommendation
5. **Learn** from every trade

---

## Workflow

```
1. SCAN     → Find stocks (scanners, pre-market movers)
2. ANALYZE → SMC Check: Trend, Liquidity, Zone, Confirmation
3. VALIDATE → Trading System: Checklist, Rule Validator
4. OUTPUT   → Standard Format (below)
5. EXECUTE  → Enter or skip
6. RECORD   → Trade Learner (learn from result)
```

---

## Standard Output Format

Every recommendation should output this:

| Field | Description |
|-------|-------------|
| **Stock** | Ticker symbol |
| **Type** | Intraday / Day-to-Day / Mini |
| **Setup** | SMC setup (FVG pullback, order block, etc.) |
| **Reason** | Why we chose it |
| **Entry** | Price to enter |
| **Stop** | Stop loss price |
| **Target** | Take profit price |
| **Profit Potential** | % and $ amount |
| **R:R** | Reward to risk ratio |
| **Confidence** | % based on SMC checks passed |
| **Violations** | Any rule breaks |

---

## Commands

### 1. Entry Analysis
```bash
node scripts/trading-system.js check SYMBOL ENTRY STOP TARGET
```

### 2. Rule Validation
```bash
node scripts/trading-system.js validate ENTRY BIGTRADER_PRICE
```

### 3. Position Size
```bash
node scripts/trading-system.js calc ENTRY STOP CAPITAL
```

### 4. Exit Rules
```bash
node scripts/trading-system.js exit intraday|daytoday|mini
```

### 5. Capital Status
```bash
node scripts/trading-system.js capital
```

### 6. Record Trade
```bash
node scripts/trade-learner-v2.js record SYMBOL TYPE SETUP win|loss PROFIT
```

### 7. View Stats
```bash
node scripts/trade-learner-v2.js stats
```

---

## The 7-Point SMC Checklist

Before EVERY entry, verify:

1. **Trend** - HH+HL or LL+LH identified
2. **Liquidity** - Stop sweep occurred
3. **Zone** - At supply or demand zone
4. **Confirmation** - FVG + CHoCH + Volume + Order Block
5. **Entry** - At golden zone (71% Fib)
6. **Risk** - R:R > 2.5:1, ATR stop set
7. **Big Trader** - Entry at or below big trader price

---

## Rules Summary

| Rule | Value |
|------|-------|
| Max Risk | 2% per trade |
| Min R:R | 2.5:1 |
| Intraday Window | 6:30 AM - 12:30 PM PT |
| Stop Loss | -7% |
| Exit Time | 12:30 PM PT max |
| Mini (Crypto) Max Profit | $2 |

---

## Before Every Trade

```bash
# Step 1: Check entry passes SMC
node scripts/trading-system.js check AAPL 150 145 168

# Step 2: Validate against rules
node scripts/trading-system.js validate 150 148

# Step 3: Calculate position size
node scripts/trading-system.js calc 150 145 25

# Step 4: If all pass → Execute and record
node scripts/trade-learner-v2.js record AAPL intraday fvg-pullback win 5.00
```

---

*Updated: 2026-05-13*