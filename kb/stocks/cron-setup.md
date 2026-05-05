# Cron Automation Setup

*Trading cron jobs for automated daily checks*

---

## Proposed Cron Jobs (PT Times, Weekdays Only)

| Time (PT) | Time (UTC) | Job Name | Cron Expression |
|-----------|------------|----------|-----------------|
| 6:30 AM | 1:30 PM | Morning Check | `30 13 * * 1-5` |
| 9:00 AM | 4:00 PM | Mid-Morning | `0 16 * * 1-5` |
| 12:00 PM | 7:00 PM | Mid-Day | `0 19 * * 1-5` |
| 8:00 PM | 3:00 AM (+1) | Evening | `0 3 * * 1-5` |

---

## Cron Job Actions

### Morning Check (6:30 AM PT)
- Fetch breaking news
- Check open positions
- Report opportunities

### Mid-Morning (9 AM PT)
- Position updates
- Any new opportunities?

### Mid-Day (12 PM PT)
- Exit/hold decisions
- Stop check

### Evening (8 PM PT)
- Overnight news
- 24-hour prep
- Next day prep

---

## Status

**Current:** Cron tool has configuration issues
**Workaround:** Run manual checks until resolved

---

## Current Cron Status

**Issue:** Cron tool has pairing issues with gateway (add/list/remove fail with "pairing required")

**Workaround:** Jobs written directly to `/home/openclaw/.openclaw/cron/jobs.json`

**Jobs configured:**
- vyse-morning-check (6:30 AM PT, weekdays)
- vyse-midday-check (12 PM PT, weekdays)
- vyse-evening-check (8 PM PT, weekdays)

**✅ FIXED:** Gateway restart resolved cron issues

**Finnhub Integration:**
- Primary price source: Finnhub (most accurate available)
- Alert trigger: Significant moves → ping David for Robinhood check
- Scripts: `scripts/expand-finnhub.js quote SYMBOL`

## New Trading Jobs to Add

### 1. Morning Check (6:30 AM PT)
```json
{
  "name": "vyse-morning-check",
  "schedule": {"kind": "cron", "expr": "30 13 * * 1-5", "tz": "America/Los_Angeles"},
  "payload": {"kind": "systemEvent", "text": "Run: node scripts/get-stock-news.js && node scripts/get-stock-price.js NVDA WGS"},
  "sessionTarget": "main"
}
```

### 2. Mid-Day Check (12 PM PT)
```json
{
  "name": "vyse-midday-check",
  "schedule": {"kind": "cron", "expr": "0 19 * * 1-5", "tz": "America/Los_Angeles"},
  "payload": {"kind": "systemEvent", "text": "Check positions: node scripts/get-stock-price.js NVDA WGS"},
  "sessionTarget": "main"
}
```

### 3. Evening Check (8 PM PT)
```json
{
  "name": "vyse-evening-check",
  "schedule": {"kind": "cron", "expr": "0 3 * * 1-5", "tz": "America/Los_Angeles"},
  "payload": {"kind": "systemEvent", "text": "Run evening check: node scripts/get-stock-news.js"},
  "sessionTarget": "main"
}
```

---

## Manual Workaround

Run checks manually:
```bash
# Morning
node scripts/get-stock-news.js
node scripts/get-stock-price.js NVDA WGS

# Mid-day
node scripts/get-stock-price.js NVDA WGS

# Evening
node scripts/get-stock-news.js
```

---

*Cron automation pending fix*