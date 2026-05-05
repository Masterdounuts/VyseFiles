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

**Found 7 existing jobs - ALL DISABLED:**
- quartermaster-stock-check (old, has errors)
- shipwright-health-check
- scribe-weekly-audit
- context-monitor
- vyse-status-auto-update
- daily-workspace-snapshot
- context-aware-save

**Issue:** Cron tool has connection issues for write operations

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