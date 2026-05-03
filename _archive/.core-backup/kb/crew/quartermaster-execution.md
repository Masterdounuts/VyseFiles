# Quartermaster Execution Protocol

*Updated 2026-04-27* - Simplified for reliability

---

## Workflow (4 Steps)

### Step 1: Research (Vyse does this)
- Quartermaster asks: "research [stock]"
- Vyse fetches real-time data via Yahoo + UA header
- **ALSO: Check 5-year history** (52W high/low, market cap, year performance)
- Vyse presents: price, change%, volume, key stats, AND history summary
- **If history is bad (down >80%, tiny cap, negative earnings) - flag it**

### Step 2: Rationalize (Quartermaster does this)
- Quartermaster processes the data
- Uses his knowledge + what Vyse provided
- Makes a decision: "I want to buy [X] because [reasons]"

### Step 3: Verify (Vyse does this)
- Vyse reviews the logic
- Checks: Within budget? Good risk/reward? Rules followed?
- If concerns, Vyse raises them

### Step 4: Summarize (Vyse does this)
- Vyse summarizes: decision, price, shares, reasoning
- **Quartermaster NEVER executes trades**
- Captain executes on Robinhood
- If Captain approves → Done
- Captain rejects → Back to Step 1

---

## Today's Actions (April 27, 2026)

### Positions Opened:
- NRXP: 4 shares @ $3.04 (FDA ketamine catalyst)
- LIDR: 5 shares @ $2.14 (NVIDIA partner)
- Total: $22.86

### Risk Rules Set:
- NRXP: Stop $2.58 (-15%), Target $3.65 (+20%)
- LIDR: Stop $1.82 (-15%), Target $2.57 (+20%)

### Capital:
- Invested: $22.86
- Remaining: $2.08 + $27.02 (unsettled tomorrow)

---

*Protocol set by Captain David*