# TODO.md - Persistent Task List

*Read on every wake-up FIRST. This file survives compactions.*
*Last updated: 2026-04-16 01:32 UTC*

---

## 🚨 CRITICAL STATUS

### Stocks (Always keep current)
- GGB: 6 shares @ ~$4.28 = ~$25.68 (active trading)
- TSLA: Stock Reward ~$6 (LOCKED - unlock date ~Apr 16, TODAY!)

### API Credits
- Status: CHECK session_status

---

## Current Focus
- Foundational systems + compaction handling
- Next: Check TSLA unlock status

---

## Active Tasks
- [ ] Check TSLA unlock on Robinhood (should be today)
- [ ] If unlocked: sell TSLA, reallocate to GGB or new pick
- [ ] Continue GGB monitoring
- [ ] Refine compaction response system

---

## Waiting On
- Backup channel setup (Signal/WhatsApp) - ask David

---

## Context From Recent Sessions
- 2026-04-16: Compaction system verified working
- 2026-04-16: File cleanup done (removed stale files)
- 2026-04-16: Context monitor cron job added

---

## Done ✅
- [2026-04-16] TODO.md continuity system created
- [2026-04-16] Session Compaction Protocol in AGENTS.md
- [2026-04-16] Cleanup: removed empty files
- [2026-04-16] First compaction test - TODO.md survived
- [2026-04-16] Context monitor cron job added (30min checks)
- [2026-04-16] SOUL.md updated with TODO-first priority
- [2026-04-16] Interrupt Protocol added to SOUL.md + TODO.md

---

## 🚨 INTERRUPT PROTOCOL (Run on ANY wake)

After any break (compaction, reset, crash, timeout, new session):
1. Read TODO.md → resume Active Tasks
2. Check memory/resume-point.md → pick up work in progress
3. Check memory/YYYY-MM-DD.md → get recent session context
4. Check timestamp → if TODO.md >24h old, warn user
5. If mid-task: checkpoint to memory/resume-point.md before continuing
6. Only then greet user or start new work

---

## 📋 TEMPLATE (Copy when updating)

```
### Stocks
- TICKER: X shares @ $Y = $Z

### API Credits
- Status: OK / LOW / CRITICAL

### Trade Log
- [YYYY-MM-DD] TICKER: ACTION @ $PRICE
```

---

*Wake-up protocol: Read TODO.md → Check critical status → Resume tasks*
*Entries under 10 words. Update before deep work or compaction.*